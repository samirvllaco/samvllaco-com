// Slop Score API on Cloudflare Pages Functions. Routed from functions/api/slop-score/[[path]].js.
// Bindings: SCANNER (service binding to the samvllaco-scanner Worker, which holds Browser Rendering; or BROWSER directly), DB (D1 "slop_score"), CACHE (KV).
// Secrets: ANTHROPIC_API_KEY, TURNSTILE_SECRET_KEY, RESEND_API_KEY (report and follow-up emails), WHOP_API_KEY, WHOP_WEBHOOK_SECRET, ADMIN_TOKEN.
// Variables: TURNSTILE_SITE_KEY, STRIPE_REPORT_LINK ($5 report Payment Link; secret STRIPE_WEBHOOK_SECRET), WHOP_ACCOUNT_ID, WHOP_REPORT_PLAN_ID (optional: WHOP_API_BASE, SLOP_MODEL).
import { SLOP } from "../config.js";
import { checkUrl } from "./url.js";
import { deterministic, finalize } from "./scoring.js";
import { render, ScanError } from "./scan.js";
import { review } from "./ai.js";
import { createCheckout, verifyWebhook, paymentOf } from "./whop.js";
import { SCHEMA } from "./schema.js";
import { view } from "./view.js";
import { ASK, SYSTEM, cleanMessages, sseToText } from "./ask.js";
import { EST, take, settle, hasBudget } from "./budget.js";
import { runDrip, sendReportNow } from "./mail.js";
import { verifyStripe, paidSession } from "./stripe.js";

let schemaReady = false;
// Failed scans are written down (owner, 26 Nov 2026) so the cause is visible later: stage, error code, a short detail and
// the scanned site's host. No IPs, no emails. Query in D1: SELECT * FROM scan_errors ORDER BY created_at DESC LIMIT 20.
async function logFail(env, stage, code, detail, url) {
  try {
    let host = ""; try { host = new URL(url).host; } catch { /* bad url */ }
    await ensureSchema(env);
    await env.DB.prepare("INSERT INTO scan_errors (id, stage, code, detail, host, created_at) VALUES (?, ?, ?, ?, ?, ?)").bind(newId(), stage, code, String(detail || "").slice(0, 160), host, new Date().toISOString()).run();
  } catch { /* logging never breaks a scan */ }
}
async function ensureSchema(env) { if (schemaReady || !env.DB) return; await env.DB.exec(SCHEMA); schemaReady = true; }

const json = (data, status = 200, extra = {}) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", "cache-control": "no-store", ...extra } });
// App errors use 4xx: Cloudflare replaces a 502 or 503 body from a Function with its own "error code" page.
const fail = (code, status = 400) => json({ error: code }, status);
const ID_CHARS = "23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const newId = (n = 10) => [...crypto.getRandomValues(new Uint8Array(n))].map((b) => ID_CHARS[b % ID_CHARS.length]).join("");
const sha = async (s) => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)))].map((b) => b.toString(16).padStart(2, "0")).join("");
const ipOf = (req) => req.headers.get("cf-connecting-ip") || "0.0.0.0";
const EVENT_TYPES = ["unlock_click", "review_click", "sprint_click", "share_click", "eaa_click", "book_click", "email_unlock"];
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,255}\.[a-z]{2,24}$/i;

export const ready = (env) => Boolean((env.BROWSER || env.SCANNER) && env.DB && env.CACHE && env.ANTHROPIC_API_KEY && env.TURNSTILE_SECRET_KEY && env.TURNSTILE_SITE_KEY);
const payments = (env) => Boolean(env.WHOP_API_KEY && env.WHOP_ACCOUNT_ID && env.WHOP_REPORT_PLAN_ID && env.DB);
const payLink = (env) => (env.STRIPE_REPORT_LINK && env.STRIPE_WEBHOOK_SECRET && env.DB ? env.STRIPE_REPORT_LINK : null);

// Returns null when the visitor passed, or Turnstile's error codes (safe to show: they name no secret).
async function turnstile(env, token, ip) {
  if (!env.TURNSTILE_SECRET_KEY) return ["missing-secret"];
  if (!token) return ["missing-input-response"];
  const f = new FormData();
  f.append("secret", env.TURNSTILE_SECRET_KEY);
  f.append("response", token);
  if (ip) f.append("remoteip", ip);
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: f });
  const j = await r.json().catch(() => ({}));
  if (j.success) return null;
  const codes = (j["error-codes"] || ["unknown"]).slice(0, 4);
  console.error(JSON.stringify({ turnstile: codes }));
  return codes;
}
const tsFail = (codes) => json({ error: "turnstile", codes }, 403);

async function bump(env, key, ttl) {
  const n = Number((await env.CACHE.get(key)) || 0) + 1;
  await env.CACHE.put(key, String(n), { expirationTtl: ttl });
  return n;
}
// Only finished scans count toward a visitor's limit; tries are capped separately so failing scans can't run forever.
async function limited(env, ip) {
  const now = new Date(), hour = now.toISOString().slice(0, 13), day = now.toISOString().slice(0, 10);
  const [h, d, g, t] = await Promise.all([env.CACHE.get(`sc:h:${ip}:${hour}`), env.CACHE.get(`sc:d:${ip}:${day}`), env.CACHE.get(`cap:${day}`), env.CACHE.get(`sc:t:${ip}:${day}`)]);
  if (Number(g || 0) >= SLOP.dailyCap) return "cap";
  if (Number(t || 0) >= SLOP.triesPerDay) return "rate_day";
  if (Number(d || 0) >= SLOP.perDay) return "rate_day";
  if (Number(h || 0) >= SLOP.perHour) return "rate_hour";
  return null;
}
async function count(env, ip) {
  const now = new Date(), hour = now.toISOString().slice(0, 13), day = now.toISOString().slice(0, 10);
  await Promise.all([bump(env, `sc:h:${ip}:${hour}`, 3700), bump(env, `sc:d:${ip}:${day}`, 90000), bump(env, `cap:${day}`, 90000)]);
}

let stage = ""; // last step a scan reached, reported with "server" errors so failures can be traced

// A scan answers with JSON for anything decided up front (bad URL, limits, a cached report). A real scan streams
// NDJSON so the page can show the visitor's site while the review runs: {t:"shot"} after the page renders,
// {t:"step"} as it moves on, then {t:"done", report} or {t:"error", error}.
async function scan(ctx) {
  const { request, env } = ctx;
  stage = "start";
  if (!ready(env)) return fail("setup", 409);
  const body = await request.json().catch(() => ({}));
  const ip = ipOf(request);
  const owner = admin(request, env); // Sam testing with ADMIN_TOKEN: no captcha, no visitor limits (the $ guard still applies)
  if (!owner) { const bad = await turnstile(env, body.token, ip); if (bad) return tsFail(bad); }
  const u = checkUrl(body.url);
  if (!u.ok) return fail(u.reason);
  const hash = await sha(u.url);
  const cached = await env.CACHE.get(`u2:${hash}`);
  if (cached) {
    const r = await env.DB.prepare("SELECT * FROM reports WHERE id = ?").bind(cached).first();
    if (r) return json(view(r));
  }
  const lim = owner ? null : await limited(env, ip);
  if (lim) return fail(lim, 429);
  if (!(await take(env, EST.scan))) return fail("cap", 429); // free credit guard
  await bump(env, `sc:t:${ip}:${new Date().toISOString().slice(0, 10)}`, 90000);
  const streaming = body.stream === true;
  if (!streaming) {
    const out = await run(env, u, hash, ip, owner, () => {});
    return out.error ? json(out, 422) : json(out);
  }
  const { readable, writable } = new TransformStream();
  const w = writable.getWriter(), enc = new TextEncoder();
  const send = (o) => w.write(enc.encode(`${JSON.stringify(o)}\n`)).catch(() => {});
  const job = (async () => {
    try {
      const out = await run(env, u, hash, ip, owner, send);
      await send(out.error ? { t: "error", ...out } : { t: "done", report: out });
    } catch (e) {
      console.error(JSON.stringify({ path: "scan", stage, err: String(e && e.message).slice(0, 120) }));
      await logFail(env, stage, "server", e && e.message, u.url);
      await send({ t: "error", error: "server", stage });
    }
    await w.close().catch(() => {});
  })();
  if (ctx.waitUntil) ctx.waitUntil(job);
  return new Response(readable, { headers: { "content-type": "application/x-ndjson; charset=utf-8", "cache-control": "no-store", "x-accel-buffering": "no" } });
}

// The scan itself: render, measure, review, save. Returns the report view or { error }.
async function run(env, u, hash, ip, owner, send) {
  stage = "render";
  await send({ t: "step", i: 0 });
  let page;
  try { page = await render(env, u.url); } catch (e) { await settle(env, EST.scan, SLOP.model, {}); const code = e instanceof ScanError ? e.code : "load"; await logFail(env, "render", code, e && e.message, u.url); return { error: code }; }
  if (page.shots && page.shots[0]) await send({ t: "shot", img: `data:image/jpeg;base64,${page.shots[0]}`, mobile: page.shots[2] ? `data:image/jpeg;base64,${page.shots[2]}` : null });
  stage = "score";
  await send({ t: "step", i: 1 });
  const id = newId();
  const det = deterministic(page.metrics, page.axe);
  await send({ t: "step", i: 2, axe: page.axe.length });
  stage = "review";
  await send({ t: "step", i: 3 });
  let ai;
  try { ai = await review(env, { shots: page.shots, metrics: page.metrics, det, axe: page.axe, url: u.url }); } catch (e) {
    const err = String(e.message).slice(0, 120);
    console.error(JSON.stringify({ id, err }));
    // Book what the tries really used; a request the API rejected outright used nothing.
    await settle(env, EST.scan, SLOP.model, e.usage || {});
    await logFail(env, "review", "review", err, u.url);
    return { error: "review", detail: owner ? err : undefined };
  }
  stage = "save";
  await settle(env, EST.scan, ai.model, ai.usage);
  const fin = finalize(det, { adjustments: ai.adjustments, originality: ai.originality });
  const oe = fin.categories.find((c) => c.k === "originality");
  if (oe && ai.originality_evidence) oe.evidence = ai.originality_evidence;
  const metrics = { ...page.metrics, copy: undefined, axeOk: page.axeOk, axeRules: page.axe.length, axeElements: page.axe.reduce((s, v) => s + (v.nodes || 0), 0), axeCritical: page.axe.some((v) => v.impact === "critical") };
  await env.DB.prepare("INSERT INTO reports (id, url, url_hash, score, label, verdict, categories, issues, metrics, unlocked, model, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)")
    .bind(id, u.url, hash, fin.score, fin.label, ai.verdict || "", JSON.stringify(fin.categories), JSON.stringify(ai.issues || []), JSON.stringify(metrics), ai.model, new Date().toISOString()).run();
  await env.CACHE.put(`u2:${hash}`, id, { expirationTtl: SLOP.cacheHours * 3600 });
  await count(env, ip); // a finished scan is what counts
  const r = await env.DB.prepare("SELECT * FROM reports WHERE id = ?").bind(id).first();
  return view(r);
}

async function report(env, id) {
  if (!env.DB) return fail("setup", 409);
  if (!/^[A-Za-z0-9]{10}$/.test(id)) return fail("not_found", 404);
  const r = await env.DB.prepare("SELECT * FROM reports WHERE id = ?").bind(id).first();
  return r ? json(view(r)) : fail("not_found", 404);
}

// Free email: sends the score and top fixes by email and (with consent) starts the follow-ups. The full report is the $5 unlock.
async function lead(ctx) {
  const { request, env } = ctx;
  if (!env.DB) return fail("setup", 409);
  const b = await request.json().catch(() => ({}));
  if (!EMAIL.test(String(b.email || ""))) return fail("email");
  const ip = ipOf(request);
  if (env.TURNSTILE_SECRET_KEY && !admin(request, env)) { const bad = await turnstile(env, b.token, ip); if (bad) return tsFail(bad); }
  if ((await bump(env, `ld:${ip}:${new Date().toISOString().slice(0, 13)}`, 3700)) > 10) return fail("rate_hour", 429);
  const email = String(b.email).toLowerCase().slice(0, 320), consent = b.consent ? 1 : 0;
  const report = /^[A-Za-z0-9]{10}$/.test(b.id || "") ? await env.DB.prepare("SELECT * FROM reports WHERE id = ?").bind(b.id).first() : null;
  const writes = [env.DB.prepare("INSERT INTO leads (id, email, report_id, url, consent_marketing, created_at) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(newId(), email, report ? report.id : null, String((report && report.url) || b.url || "").slice(0, 2048), consent, new Date().toISOString())];
  if (report) {
    const now = Date.now(), domain = new URL(report.url).hostname.replace(/^www\./, "");
    writes.push(
      env.DB.prepare("INSERT INTO drip (id, email, report_id, domain, score, consent, token, step, next_at, created_ms) VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, ?) ON CONFLICT(email, report_id) DO UPDATE SET consent = MAX(consent, excluded.consent), unsub = 0")
        .bind(newId(), email, report.id, domain, report.score, consent, newId(24), now, now),
    );
  }
  await env.DB.batch(writes);
  if (report && ctx.waitUntil) ctx.waitUntil(runDrip(env).catch(() => {}));
  if (!report) return json({ ok: true });
  return json({ ok: true, emailing: Boolean(env.RESEND_API_KEY) });
}

// Stripe: a paid $5 Payment Link session unlocks its report and emails the full report to the buyer.
async function stripeHook(ctx) {
  const { request, env } = ctx;
  if (!env.DB) return fail("setup", 409);
  const body = await request.text();
  if (!(await verifyStripe(env.STRIPE_WEBHOOK_SECRET, request.headers.get("stripe-signature"), body))) return fail("signature", 401);
  let e; try { e = JSON.parse(body); } catch { return fail("invalid"); }
  const p = paidSession(e);
  if (!p) return json({ ok: true, ignored: e.type });
  const writes = [env.DB.prepare("INSERT OR IGNORE INTO purchases (id, report_id, whop_payment_id, email, created_at) VALUES (?, ?, ?, ?, ?)").bind(newId(), p.reportId, p.id, p.email || null, new Date().toISOString())];
  const report = p.reportId ? await env.DB.prepare("SELECT id, url, score FROM reports WHERE id = ?").bind(p.reportId).first() : null;
  if (report) {
    writes.push(env.DB.prepare("UPDATE reports SET unlocked = 1 WHERE id = ?").bind(report.id));
    if (p.email) {
      const now = Date.now(), domain = new URL(report.url).hostname.replace(/^www\./, "");
      // The full report goes out now; the row then waits for the day-2 follow-up (sent only with consent).
      writes.push(env.DB.prepare("INSERT INTO drip (id, email, report_id, domain, score, consent, token, step, next_at, created_ms) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?) ON CONFLICT(email, report_id) DO UPDATE SET consent = MAX(consent, excluded.consent), unsub = 0")
        .bind(newId(), p.email, report.id, domain, report.score, p.consent ? 1 : 0, newId(24), now + 2 * 86400000, now));
    }
  }
  await env.DB.batch(writes);
  if (report && p.email && ctx.waitUntil) ctx.waitUntil(sendReportNow(env, p.email, report.id).catch((x) => console.error(JSON.stringify({ paidmail: String(x.message).slice(0, 120) }))));
  return json({ ok: true });
}

// One click stops every email to that address. GET from the link, POST from mail apps (List-Unsubscribe-Post).
async function unsubscribe(request, env) {
  const t = new URL(request.url).searchParams.get("t") || "";
  let ok = false;
  if (/^[A-Za-z0-9]{24}$/.test(t)) {
    const row = await env.DB.prepare("SELECT email FROM drip WHERE token = ?").bind(t).first();
    if (row) { await env.DB.prepare("UPDATE drip SET unsub = 1 WHERE email = ?").bind(row.email).run(); ok = true; }
  }
  if (request.method === "POST") return json({ ok });
  const msg = ok ? "You're unsubscribed. You won't get more emails from me about your report." : "That link didn't work. Reply to any of my emails and I'll take you off the list myself.";
  return new Response(`<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>Unsubscribe | Sam Vllaco</title><body style="margin:0;padding:48px 24px;background:#121214;color:#f5f5f7;font:17px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif"><main style="max-width:560px;margin:0 auto"><p>${msg}</p><p><a style="color:#8ab4ff" href="/">Back to samvllaco.com</a></p></main>`, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
}

// Pages has no cron, so due emails go out on site traffic: at most every 10 minutes, after the response is sent.
async function maybeDrip(ctx) {
  const { env } = ctx;
  if (!env.RESEND_API_KEY || !env.DB || !env.CACHE || !ctx.waitUntil) return;
  if (await env.CACHE.get("drip:lock")) return;
  await env.CACHE.put("drip:lock", "1", { expirationTtl: 600 });
  ctx.waitUntil(ensureSchema(env).then(() => runDrip(env)).catch((e) => console.error(JSON.stringify({ drip: String(e.message).slice(0, 120) }))));
}

async function event({ request, env }) {
  if (!env.DB) return json({ ok: false });
  const b = await request.json().catch(() => ({}));
  if (!EVENT_TYPES.includes(b.type)) return fail("type");
  await env.DB.prepare("INSERT INTO events (id, report_id, type, created_at) VALUES (?, ?, ?, ?)").bind(newId(), /^[A-Za-z0-9]{10}$/.test(b.id || "") ? b.id : null, b.type, new Date().toISOString()).run();
  return json({ ok: true });
}

async function checkout({ request, env }) {
  if (!payments(env)) return fail("setup", 409);
  const b = await request.json().catch(() => ({}));
  const r = /^[A-Za-z0-9]{10}$/.test(b.id || "") && (await env.DB.prepare("SELECT id FROM reports WHERE id = ?").bind(b.id).first());
  if (!r) return fail("not_found", 404);
  try { return json({ url: await createCheckout(env, b.id, new URL(request.url).origin) }); } catch { return fail("checkout", 422); }
}

async function webhook({ request, env }) {
  const body = await request.text();
  if (!(await verifyWebhook(env.WHOP_WEBHOOK_SECRET, request.headers, body))) return fail("signature", 401);
  const e = JSON.parse(body);
  if (e.type !== "payment.succeeded") return json({ ok: true, ignored: e.type });
  const p = paymentOf(e);
  await env.DB.prepare("INSERT OR IGNORE INTO purchases (id, report_id, whop_payment_id, email, created_at) VALUES (?, ?, ?, ?, ?)").bind(newId(), p.reportId, p.id, p.email, new Date().toISOString()).run();
  if (p.reportId) await env.DB.prepare("UPDATE reports SET unlocked = 1 WHERE id = ?").bind(p.reportId).run();
  return json({ ok: true });
}

// Fallback when a payment arrived without the report id: match the checkout email to an unused purchase.
async function claim({ request, env }) {
  if (!env.DB) return fail("setup", 409);
  const b = await request.json().catch(() => ({}));
  if (!/^[A-Za-z0-9]{10}$/.test(b.id || "") || !EMAIL.test(String(b.email || ""))) return fail("invalid");
  if (env.TURNSTILE_SECRET_KEY) { const bad = await turnstile(env, b.token, ipOf(request)); if (bad) return tsFail(bad); }
  const email = String(b.email).toLowerCase();
  const p = await env.DB.prepare("SELECT id FROM purchases WHERE email = ? AND (report_id IS NULL OR report_id = ?) ORDER BY created_at DESC LIMIT 1").bind(email, b.id).first();
  if (!p) return fail("no_purchase", 404);
  await env.DB.batch([env.DB.prepare("UPDATE purchases SET report_id = ? WHERE id = ?").bind(b.id, p.id), env.DB.prepare("UPDATE reports SET unlocked = 1 WHERE id = ?").bind(b.id)]);
  return json({ ok: true });
}

function admin(request, env) {
  const want = `Bearer ${env.ADMIN_TOKEN || ""}`, got = request.headers.get("authorization") || "";
  if (!env.ADMIN_TOKEN || got.length !== want.length) return false;
  let d = 0; for (let i = 0; i < want.length; i++) d |= want.charCodeAt(i) ^ got.charCodeAt(i);
  return d === 0;
}
const csv = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

async function leadsCsv(env) {
  const { results } = await env.DB.prepare("SELECT email, url, report_id, consent_marketing, created_at FROM leads ORDER BY created_at DESC").all();
  const rows = ["email,url,report_id,consent_marketing,created_at", ...results.map((r) => [r.email, r.url, r.report_id, r.consent_marketing, r.created_at].map(csv).join(","))];
  return new Response(rows.join("\n"), { headers: { "content-type": "text/csv; charset=utf-8", "cache-control": "no-store" } });
}

async function stats(env) {
  const day = new Date().toISOString().slice(0, 10), week = new Date(Date.now() - 7 * 864e5).toISOString();
  const q = (sql, ...a) => env.DB.prepare(sql).bind(...a).first();
  const [today, last7, purchases, leads] = await Promise.all([
    q("SELECT COUNT(*) n FROM reports WHERE created_at >= ?", day), q("SELECT COUNT(*) n FROM reports WHERE created_at >= ?", week),
    q("SELECT COUNT(*) n FROM purchases WHERE created_at >= ?", week), q("SELECT COUNT(*) n FROM leads WHERE created_at >= ?", week),
  ]);
  const { results } = await env.DB.prepare("SELECT type, COUNT(*) n FROM events WHERE created_at >= ? GROUP BY type").bind(week).all();
  return json({ scans_today: today.n, scans_7d: last7.n, purchases_7d: purchases.n, leads_7d: leads.n, clicks_7d: Object.fromEntries(results.map((r) => [r.type, r.n])) });
}

export async function handleApi(ctx) {
  const { request, env } = ctx;
  const path = new URL(request.url).pathname.replace(/^\/api\/slop-score\/?/, "").replace(/\/$/, "");
  const m = request.method;
  try {
    if (path !== "status") await ensureSchema(env);
    if (path === "status" && m === "GET") await maybeDrip(ctx).catch(() => {});
    if (path === "status" && m === "GET") return json({ ready: ready(env) && (await ensureSchema(env), await hasBudget(env, EST.scan)), siteKey: env.TURNSTILE_SITE_KEY || null, payments: payments(env), payLink: payLink(env), price: SLOP.reportPrice });
    if (path === "scan" && m === "POST") return await scan(ctx);
    if (path.startsWith("report/") && m === "GET") return await report(env, path.slice(7));
    if (path === "lead" && m === "POST") return await lead(ctx);
    if (path === "unsubscribe" && (m === "GET" || m === "POST")) return await unsubscribe(request, env);
    if (path === "event" && m === "POST") return await event(ctx);
    if (path === "checkout" && m === "POST") return await checkout(ctx);
    if (path === "whop-webhook" && m === "POST") return await webhook(ctx);
    if (path === "stripe-webhook" && m === "POST") return await stripeHook(ctx);
    if (path === "claim" && m === "POST") return await claim(ctx);
    if (path.startsWith("admin/")) {
      if (!admin(request, env)) return fail("unauthorized", 401);
      if (!env.DB) return fail("setup", 409);
      if (path === "admin/leads.csv") return await leadsCsv(env);
      if (path === "admin/stats") return await stats(env);
      if (path === "admin/drip") return json({ sent: await runDrip(env, 50) });
    }
    return fail("not_found", 404);
  } catch (e) {
    const err = String(e && e.message).slice(0, 120);
    console.error(JSON.stringify({ path, stage, err }));
    return json({ error: "server", stage: path === "scan" ? stage : undefined, detail: admin(request, env) ? err : undefined }, 422); // Cloudflare swaps 5xx bodies for its own page
  }
}

// "Ask Sam's AI" chat, routed from functions/api/ask/[[path]].js. The site facts are prompt-cached for an hour, so repeat messages read them at a tenth of the input price. Needs CACHE, DB (question log and the spend guard), ANTHROPIC_API_KEY and Turnstile.
export const askReady = (env) => Boolean(env.CACHE && env.DB && env.ANTHROPIC_API_KEY && env.TURNSTILE_SECRET_KEY && env.TURNSTILE_SITE_KEY);

async function askLimited(env, ip) {
  const now = new Date(), hour = now.toISOString().slice(0, 13), day = now.toISOString().slice(0, 10);
  const [h, d, g] = await Promise.all([env.CACHE.get(`ask:h:${ip}:${hour}`), env.CACHE.get(`ask:d:${ip}:${day}`), env.CACHE.get(`ask:cap:${day}`)]);
  if (Number(g || 0) >= ASK.dailyCap) return "cap";
  if (Number(h || 0) >= ASK.perHour || Number(d || 0) >= ASK.perDay) return "rate";
  await Promise.all([bump(env, `ask:h:${ip}:${hour}`, 3700), bump(env, `ask:d:${ip}:${day}`, 90000), bump(env, `ask:cap:${day}`, 90000)]);
  return null;
}

async function ask(ctx) {
  const { request, env } = ctx;
  if (!askReady(env)) return fail("setup", 409);
  const b = await request.json().catch(() => ({}));
  const msgs = cleanMessages(b.messages);
  if (!msgs) return fail("invalid");
  const ip = ipOf(request);
  // One Turnstile pass opens a short session, so every message after the first needs no new challenge.
  let sid = /^[A-Za-z0-9]{16}$/.test(b.sid || "") && (await env.CACHE.get(`ask:s:${b.sid}`)) ? b.sid : "";
  if (!sid) {
    if (!admin(request, env)) { const bad = await turnstile(env, b.token, ip); if (bad) return tsFail(bad); }
    sid = newId(16);
    await env.CACHE.put(`ask:s:${sid}`, "1", { expirationTtl: ASK.sessionHours * 3600 });
  }
  const lim = await askLimited(env, ip);
  if (lim) return fail(lim, 429);
  await ensureSchema(env);
  if (!(await take(env, EST.ask))) return fail("cap", 429); // free credit guard
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: env.ASK_MODEL || ASK.model, max_tokens: ASK.maxTokens, stream: true, system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral", ttl: "1h" } }], messages: msgs }),
  });
  if (!res.ok || !res.body) { console.error(JSON.stringify({ ask: res.status })); await settle(env, EST.ask, ASK.model, {}); return fail("model", 422); }
  const question = msgs[msgs.length - 1].content, page = String(b.page || "").slice(0, 200);
  const log = (answer, meta) => {
    const p = Promise.all([
      env.DB.prepare("INSERT INTO asks (id, session, page, question, answer, created_at) VALUES (?, ?, ?, ?, ?, ?)").bind(newId(), sid, page, question, answer.slice(0, 2000), new Date().toISOString()).run(),
      settle(env, EST.ask, (meta && meta.model) || ASK.model, meta && meta.usage),
    ]).catch(() => {});
    if (ctx.waitUntil) ctx.waitUntil(p);
  };
  return new Response(res.body.pipeThrough(sseToText(log)), { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store", "x-ask-sid": sid } });
}

async function asksCsv(env) {
  const { results } = await env.DB.prepare("SELECT created_at, page, question, answer FROM asks ORDER BY created_at DESC LIMIT 2000").all();
  const rows = ["created_at,page,question,answer", ...results.map((r) => [r.created_at, r.page, r.question, r.answer].map(csv).join(","))];
  return new Response(rows.join("\n"), { headers: { "content-type": "text/csv; charset=utf-8", "cache-control": "no-store" } });
}

export async function handleAsk(ctx) {
  const { request, env } = ctx;
  const path = new URL(request.url).pathname.replace(/^\/api\/ask\/?/, "").replace(/\/$/, "");
  try {
    if (path === "status" && request.method === "GET") await maybeDrip(ctx).catch(() => {});
    if (path === "status" && request.method === "GET") return json({ ready: askReady(env) && (await ensureSchema(env), await hasBudget(env, EST.ask)), siteKey: env.TURNSTILE_SITE_KEY || null });
    if (path === "" && request.method === "POST") return await ask(ctx);
    if (path === "admin/questions.csv") {
      if (!admin(request, env)) return fail("unauthorized", 401);
      if (!env.DB) return fail("setup", 409);
      await ensureSchema(env);
      return await asksCsv(env);
    }
    return fail("not_found", 404);
  } catch (e) {
    console.error(JSON.stringify({ ask: path, err: String(e && e.message).slice(0, 120) }));
    return fail("server", 422);
  }
}

// /slop-score/r/:id serves the static result page with a share title that carries the score.
export async function handleResultPage(ctx) {
  const { request, env, params } = ctx;
  const page = await env.ASSETS.fetch(new Request(new URL("/slop-score/r/", request.url)));
  const id = String(params.id || "");
  if (!env.DB || !/^[A-Za-z0-9]{10}$/.test(id)) return page;
  let r = null;
  try { await ensureSchema(env); r = await env.DB.prepare("SELECT score, url FROM reports WHERE id = ?").bind(id).first(); } catch { return page; }
  if (!r) return page;
  const domain = new URL(r.url).hostname.replace(/^www\./, "");
  const title = `${domain} got a Slop Score of ${r.score}/100`;
  const desc = "Lower is better. See how AI-generated your own site looks, free, in about 30 seconds.";
  const set = (attr) => ({ element(el) { el.setAttribute("content", attr); } });
  return new HTMLRewriter()
    .on("title", { element(el) { el.setInnerContent(`${title} | Sam Vllaco`); } })
    .on('meta[property="og:title"]', set(title)).on('meta[name="twitter:title"]', set(title))
    .on('meta[property="og:description"]', set(desc)).on('meta[name="twitter:description"]', set(desc))
    .transform(page);
}
