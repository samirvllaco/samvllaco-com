// Slop Score API on Cloudflare Pages Functions. Routed from functions/api/slop-score/[[path]].js.
// Bindings: SCANNER (service binding to the samvllaco-scanner Worker, which holds Browser Rendering; or BROWSER directly), DB (D1 "slop_score"), CACHE (KV).
// Secrets: ANTHROPIC_API_KEY, TURNSTILE_SECRET_KEY, WHOP_API_KEY, WHOP_WEBHOOK_SECRET, ADMIN_TOKEN.
// Variables: TURNSTILE_SITE_KEY, WHOP_ACCOUNT_ID, WHOP_REPORT_PLAN_ID (optional: WHOP_API_BASE, SLOP_MODEL).
import { SLOP } from "../config.js";
import { checkUrl } from "./url.js";
import { deterministic, finalize } from "./scoring.js";
import { render, ScanError } from "./scan.js";
import { review } from "./ai.js";
import { createCheckout, verifyWebhook, paymentOf } from "./whop.js";
import { SCHEMA } from "./schema.js";
import { view } from "./view.js";
import { ASK, SYSTEM, cleanMessages, sseToText } from "./ask.js";

let schemaReady = false;
async function ensureSchema(env) { if (schemaReady || !env.DB) return; await env.DB.exec(SCHEMA); schemaReady = true; }

const json = (data, status = 200, extra = {}) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", "cache-control": "no-store", ...extra } });
const fail = (code, status = 400) => json({ error: code }, status);
const ID_CHARS = "23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const newId = (n = 10) => [...crypto.getRandomValues(new Uint8Array(n))].map((b) => ID_CHARS[b % ID_CHARS.length]).join("");
const sha = async (s) => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)))].map((b) => b.toString(16).padStart(2, "0")).join("");
const ipOf = (req) => req.headers.get("cf-connecting-ip") || "0.0.0.0";
const EVENT_TYPES = ["unlock_click", "review_click", "sprint_click", "share_click", "eaa_click", "book_click"];
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,255}\.[a-z]{2,24}$/i;

export const ready = (env) => Boolean((env.BROWSER || env.SCANNER) && env.DB && env.CACHE && env.ANTHROPIC_API_KEY && env.TURNSTILE_SECRET_KEY && env.TURNSTILE_SITE_KEY);
const payments = (env) => Boolean(env.WHOP_API_KEY && env.WHOP_ACCOUNT_ID && env.WHOP_REPORT_PLAN_ID && env.DB);

async function turnstile(env, token, ip) {
  if (!env.TURNSTILE_SECRET_KEY || !token) return false;
  const f = new FormData();
  f.append("secret", env.TURNSTILE_SECRET_KEY);
  f.append("response", token);
  if (ip) f.append("remoteip", ip);
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: f });
  return Boolean((await r.json()).success);
}

async function bump(env, key, ttl) {
  const n = Number((await env.CACHE.get(key)) || 0) + 1;
  await env.CACHE.put(key, String(n), { expirationTtl: ttl });
  return n;
}
async function limited(env, ip) {
  const now = new Date(), hour = now.toISOString().slice(0, 13), day = now.toISOString().slice(0, 10);
  const [h, d, g] = await Promise.all([env.CACHE.get(`rl:h:${ip}:${hour}`), env.CACHE.get(`rl:d:${ip}:${day}`), env.CACHE.get(`cap:${day}`)]);
  if (Number(g || 0) >= SLOP.dailyCap) return "cap";
  if (Number(h || 0) >= SLOP.perHour) return "rate_hour";
  if (Number(d || 0) >= SLOP.perDay) return "rate_day";
  return null;
}
async function count(env, ip) {
  const now = new Date(), hour = now.toISOString().slice(0, 13), day = now.toISOString().slice(0, 10);
  await Promise.all([bump(env, `rl:h:${ip}:${hour}`, 3700), bump(env, `rl:d:${ip}:${day}`, 90000), bump(env, `cap:${day}`, 90000)]);
}

async function scan({ request, env }) {
  if (!ready(env)) return fail("setup", 503);
  const body = await request.json().catch(() => ({}));
  const ip = ipOf(request);
  if (!(await turnstile(env, body.token, ip))) return fail("turnstile", 403);
  const u = checkUrl(body.url);
  if (!u.ok) return fail(u.reason);
  const hash = await sha(u.url);
  const cached = await env.CACHE.get(`u:${hash}`);
  if (cached) {
    const r = await env.DB.prepare("SELECT * FROM reports WHERE id = ?").bind(cached).first();
    if (r) return json(view(r));
  }
  const lim = await limited(env, ip);
  if (lim) return fail(lim, 429);
  await count(env, ip);
  let page;
  try { page = await render(env, u.url); } catch (e) { return fail(e instanceof ScanError ? e.code : "load", 502); }
  const id = newId();
  const det = deterministic(page.metrics, page.axe);
  let ai;
  try { ai = await review(env, { shots: page.shots, metrics: page.metrics, det, axe: page.axe, url: u.url }); } catch (e) { console.error(JSON.stringify({ id, err: String(e.message).slice(0, 80) })); return fail("review", 502); }
  const fin = finalize(det, { adjustments: ai.adjustments, originality: ai.originality });
  const oe = fin.categories.find((c) => c.k === "originality");
  if (oe && ai.originality_evidence) oe.evidence = ai.originality_evidence;
  const metrics = { ...page.metrics, copy: undefined, axeOk: page.axeOk, axeRules: page.axe.length, axeElements: page.axe.reduce((s, v) => s + (v.nodes || 0), 0), axeCritical: page.axe.some((v) => v.impact === "critical") };
  await env.DB.prepare("INSERT INTO reports (id, url, url_hash, score, label, verdict, categories, issues, metrics, unlocked, model, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)")
    .bind(id, u.url, hash, fin.score, fin.label, ai.verdict || "", JSON.stringify(fin.categories), JSON.stringify(ai.issues || []), JSON.stringify(metrics), ai.model, new Date().toISOString()).run();
  await env.CACHE.put(`u:${hash}`, id, { expirationTtl: SLOP.cacheHours * 3600 });
  const r = await env.DB.prepare("SELECT * FROM reports WHERE id = ?").bind(id).first();
  return json(view(r));
}

async function report(env, id) {
  if (!env.DB) return fail("setup", 503);
  if (!/^[A-Za-z0-9]{10}$/.test(id)) return fail("not_found", 404);
  const r = await env.DB.prepare("SELECT * FROM reports WHERE id = ?").bind(id).first();
  return r ? json(view(r)) : fail("not_found", 404);
}

async function lead({ request, env }) {
  if (!env.DB) return fail("setup", 503);
  const b = await request.json().catch(() => ({}));
  if (!EMAIL.test(String(b.email || ""))) return fail("email");
  if (env.TURNSTILE_SECRET_KEY && !(await turnstile(env, b.token, ipOf(request)))) return fail("turnstile", 403);
  await env.DB.prepare("INSERT INTO leads (id, email, report_id, url, consent_marketing, created_at) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(newId(), String(b.email).toLowerCase().slice(0, 320), b.id || null, String(b.url || "").slice(0, 2048), b.consent ? 1 : 0, new Date().toISOString()).run();
  return json({ ok: true });
}

async function event({ request, env }) {
  if (!env.DB) return json({ ok: false });
  const b = await request.json().catch(() => ({}));
  if (!EVENT_TYPES.includes(b.type)) return fail("type");
  await env.DB.prepare("INSERT INTO events (id, report_id, type, created_at) VALUES (?, ?, ?, ?)").bind(newId(), /^[A-Za-z0-9]{10}$/.test(b.id || "") ? b.id : null, b.type, new Date().toISOString()).run();
  return json({ ok: true });
}

async function checkout({ request, env }) {
  if (!payments(env)) return fail("setup", 503);
  const b = await request.json().catch(() => ({}));
  const r = /^[A-Za-z0-9]{10}$/.test(b.id || "") && (await env.DB.prepare("SELECT id FROM reports WHERE id = ?").bind(b.id).first());
  if (!r) return fail("not_found", 404);
  try { return json({ url: await createCheckout(env, b.id, new URL(request.url).origin) }); } catch { return fail("checkout", 502); }
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
  if (!env.DB) return fail("setup", 503);
  const b = await request.json().catch(() => ({}));
  if (!/^[A-Za-z0-9]{10}$/.test(b.id || "") || !EMAIL.test(String(b.email || ""))) return fail("invalid");
  if (env.TURNSTILE_SECRET_KEY && !(await turnstile(env, b.token, ipOf(request)))) return fail("turnstile", 403);
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
    if (path === "status" && m === "GET") return json({ ready: ready(env), siteKey: env.TURNSTILE_SITE_KEY || null, payments: payments(env), price: SLOP.reportPrice });
    if (path === "scan" && m === "POST") return await scan(ctx);
    if (path.startsWith("report/") && m === "GET") return await report(env, path.slice(7));
    if (path === "lead" && m === "POST") return await lead(ctx);
    if (path === "event" && m === "POST") return await event(ctx);
    if (path === "checkout" && m === "POST") return await checkout(ctx);
    if (path === "whop-webhook" && m === "POST") return await webhook(ctx);
    if (path === "claim" && m === "POST") return await claim(ctx);
    if (path.startsWith("admin/")) {
      if (!admin(request, env)) return fail("unauthorized", 401);
      if (!env.DB) return fail("setup", 503);
      if (path === "admin/leads.csv") return await leadsCsv(env);
      if (path === "admin/stats") return await stats(env);
    }
    return fail("not_found", 404);
  } catch (e) {
    console.error(JSON.stringify({ path, err: String(e && e.message).slice(0, 120) }));
    return fail("server", 500);
  }
}

// "Ask Sam's AI" chat, routed from functions/api/ask/[[path]].js. The site facts are prompt-cached (5 min), so repeat messages read them at a tenth of the input price. Needs CACHE, ANTHROPIC_API_KEY and Turnstile; DB is optional (question log).
export const askReady = (env) => Boolean(env.CACHE && env.ANTHROPIC_API_KEY && env.TURNSTILE_SECRET_KEY && env.TURNSTILE_SITE_KEY);

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
  if (!askReady(env)) return fail("setup", 503);
  const b = await request.json().catch(() => ({}));
  const msgs = cleanMessages(b.messages);
  if (!msgs) return fail("invalid");
  const ip = ipOf(request);
  // One Turnstile pass opens a short session, so every message after the first needs no new challenge.
  let sid = /^[A-Za-z0-9]{16}$/.test(b.sid || "") && (await env.CACHE.get(`ask:s:${b.sid}`)) ? b.sid : "";
  if (!sid) {
    if (!(await turnstile(env, b.token, ip))) return fail("turnstile", 403);
    sid = newId(16);
    await env.CACHE.put(`ask:s:${sid}`, "1", { expirationTtl: ASK.sessionHours * 3600 });
  }
  const lim = await askLimited(env, ip);
  if (lim) return fail(lim, 429);
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: env.ASK_MODEL || ASK.model, max_tokens: ASK.maxTokens, stream: true, system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }], messages: msgs }),
  });
  if (!res.ok || !res.body) { console.error(JSON.stringify({ ask: res.status })); return fail("model", 502); }
  const question = msgs[msgs.length - 1].content, page = String(b.page || "").slice(0, 200);
  const log = (answer) => {
    if (!env.DB) return;
    const p = ensureSchema(env).then(() => env.DB.prepare("INSERT INTO asks (id, session, page, question, answer, created_at) VALUES (?, ?, ?, ?, ?, ?)").bind(newId(), sid, page, question, answer.slice(0, 2000), new Date().toISOString()).run()).catch(() => {});
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
    if (path === "status" && request.method === "GET") return json({ ready: askReady(env), siteKey: env.TURNSTILE_SITE_KEY || null });
    if (path === "" && request.method === "POST") return await ask(ctx);
    if (path === "admin/questions.csv") {
      if (!admin(request, env)) return fail("unauthorized", 401);
      if (!env.DB) return fail("setup", 503);
      await ensureSchema(env);
      return await asksCsv(env);
    }
    return fail("not_found", 404);
  } catch (e) {
    console.error(JSON.stringify({ ask: path, err: String(e && e.message).slice(0, 120) }));
    return fail("server", 500);
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
