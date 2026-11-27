// Slop Score email flow. A visitor leaves an email to unlock the full report; the report email goes out at once,
// and visitors who ticked the tips box get three short follow-ups (book, designer review, sprint).
// Sending uses two free senders, in order: Resend (RESEND_API_KEY, capped at 90 a day of its 100) and Brevo
// (BREVO_API_KEY, capped at 280 a day of its 300), each counted per UTC day in CACHE. When Resend's share is used up
// or it refuses, Brevo sends. Without any key nothing is sent and rows wait in D1, so the first emails go out as
// soon as a key is added. Every email has a one-click unsubscribe link.
import { EMAIL } from "../../lib/site.js";
import { PERSONAL_REVIEW_URL, REVIEW_URL } from "../../lib/site.js";
import { WEEK_PRICE, usd } from "../../lib/plans.js";

const SITE = "https://samvllaco.com";
const DAY = 86400000;
// Follow-up timing in days after the report email. Step 0 is the report itself.
export const STEPS = [0, 2, 5, 9];

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// One plain layout: reads like a personal email, not a newsletter.
function layout(paras, unsub) {
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#ffffff;color:#1c1c1e;font:16px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif"><div style="max-width:560px">${paras.map((p) => (p.startsWith("<") ? p : `<p style="margin:0 0 16px">${p}</p>`)).join("")}<p style="margin:32px 0 0;font-size:13px;color:#6e6e73">You got this because you checked a site on samvllaco.com. <a href="${unsub}" style="color:#6e6e73">Unsubscribe</a></p></div></body></html>`;
  return html;
}
const text = (paras, unsub) => `${paras.map((p) => p.replace(/<li[^>]*>/g, "- ").replace(/<a [^>]*href="([^"]+)"[^>]*>([^<]*)<\/a>/g, "$2 ($1)").replace(/<[^>]+>/g, "")).join("\n\n")}\n\nUnsubscribe: ${unsub}`;
const link = (href, label) => `<a href="${href}" style="color:#2f6bff">${esc(label)}</a>`;

// d: { domain, score, label, report, fixes: [titles], unsub, unlocked, locked }
export function render(step, d) {
  const sign = "Sam";
  if (step === 0 && !d.unlocked) {
    const list = `<ol style="margin:0 0 16px;padding-left:20px">${d.fixes.map((f) => `<li style="margin:0 0 6px">${esc(f)}</li>`).join("")}</ol>`;
    return {
      subject: `Your Slop Score: ${d.score}/100 for ${d.domain}`,
      paras: [
        "Hi,",
        `Here's your Slop Score for ${esc(d.domain)}: <b>${d.score}/100</b> (${esc(d.label)}). Lower is better.`,
        "The 3 fixes with the biggest impact:",
        list,
        d.locked ? `I found ${d.locked} more issues. ${link(d.report, `Unlock all ${d.fixes.length + d.locked} fixes for $5`)}, each with copy-paste prompts for Lovable, Cursor and Claude Code. I'll email you the full report too.` : `Your report: ${link(d.report, "open it here")}.`,
        "Reply if anything is unclear. I read every reply.",
        sign,
      ],
    };
  }
  if (step === 0) {
    const list = `<ol style="margin:0 0 16px;padding-left:20px">${d.fixes.map((f) => `<li style="margin:0 0 6px">${esc(f)}</li>`).join("")}</ol>`;
    const paras = [
      "Hi,",
      `Thanks for unlocking it. Here's your full Slop Score report for ${esc(d.domain)}. It scored <b>${d.score}/100</b> (${esc(d.label)}). Lower is better.`,
      "The fixes with the biggest impact:",
      list,
      `Every fix has copy-paste prompts for Lovable, Cursor and Claude Code: ${link(d.report, "open your report")}.`,
      `If you want the rules behind these fixes, so the next page you build doesn't need them, that's what my book is for: ${link(`${SITE}/fix-ai-slop-ui/`, "27 copy-paste prompts, $12.99")}.`,
      `Reply if anything in the report is unclear. I read every reply.`,
      sign,
    ];
    return { subject: `Your Slop Score: ${d.score}/100 for ${d.domain}`, paras };
  }
  if (step === 1) {
    return {
      subject: `The fix that moves ${d.domain} the most`,
      paras: [
        "Hi,",
        "Most sites I check lose points in the same place: too many sizes. Font sizes, gaps, corner radii. Every new value is a small decision nobody made on purpose, and together they read as generated.",
        "The quickest win is a scale. Pick 6 text sizes and spacing in 8px steps, then replace every value that isn't on it. It takes an hour and usually drops the score by 10 or more.",
        `My book walks through this and 26 more fixes, each with a prompt you paste into your AI builder: ${link(`${SITE}/fix-ai-slop-ui/`, "see the book")} ($12.99).`,
        `Fixed a few things already? ${link(`${SITE}/slop-score/`, "Check the site again")} and compare.`,
        sign,
      ],
    };
  }
  if (step === 2) {
    return {
      subject: `Want me to look at ${d.domain}?`,
      paras: [
        "Hi,",
        `The report tells you what's off. It can't tell you what to fix first for your users. That part needs a designer.`,
        `I record a Loom going through ${esc(d.domain)} and tell you what I'd change first and why. You get it within 12 hours, and my book is included.`,
        `<ul style="margin:0 0 16px;padding-left:20px"><li style="margin:0 0 6px">${link(PERSONAL_REVIEW_URL, "30-minute review, $49")}</li><li>${link(REVIEW_URL, "Full UI/UX review with branding tips, $99")}</li></ul>`,
        `Paste ${esc(d.domain)} in the order note and I'll start from your report.`,
        sign,
      ],
    };
  }
  return {
    subject: `Should I just fix ${d.domain} for you?`,
    paras: [
      "Hi,",
      "Last email from me about your report.",
      `If you'd rather not fix it yourself, I redesign the problem screens in a one-week sprint for ${usd(WEEK_PRICE)}. You get Figma files and a build-ready handoff, and I work with your developer or AI builder.`,
      `${link(`${SITE}/book/`, "Book a 30-minute call")} and bring your report. If it's not a fit, I'll tell you on the call.`,
      sign,
    ],
  };
}

// The senders, tried in order. max = how many a day this site lets each one send (below its free limit).
const SENDERS = [
  {
    name: "resend", key: "RESEND_API_KEY", max: 90,
    request: (apiKey, m) => ["https://api.resend.com/emails", { authorization: `Bearer ${apiKey}` }, {
      from: `${m.name} <${m.address}>`, to: [m.to], reply_to: m.replyTo, subject: m.subject, html: m.html, text: m.text, headers: m.headers,
    }],
  },
  {
    name: "brevo", key: "BREVO_API_KEY", max: 280,
    request: (apiKey, m) => ["https://api.brevo.com/v3/smtp/email", { "api-key": apiKey, accept: "application/json" }, {
      sender: { name: m.name, email: m.address }, to: [{ email: m.to }], replyTo: { email: m.replyTo },
      subject: m.subject, htmlContent: m.html, textContent: m.text, headers: m.headers,
    }],
  },
];
export const DAILY_MAX = Object.fromEntries(SENDERS.map((x) => [x.name, x.max]));

const senders = (env) => SENDERS.filter((x) => env && env[x.key]);
export const mailReady = (env) => senders(env).length > 0;
const dayKey = (name) => `mail:${new Date().toISOString().slice(0, 10)}:${name}`;
const usedToday = async (env, name) => (env.CACHE ? Number((await env.CACHE.get(dayKey(name))) || 0) : 0);

// How many more emails can go out today across all senders.
export async function roomToday(env) {
  let room = 0;
  for (const x of senders(env)) room += Math.max(0, x.max - (await usedToday(env, x.name)));
  return room;
}

// Sends one email through the first sender with room left that accepts it. Throws "<sender> <status>: ..." when
// none does; a 429 in that message means every sender is full for today.
export async function send(env, to, step, d, fetcher = fetch) {
  const list = senders(env);
  if (!list.length) return { skipped: true };
  const { subject, paras } = render(step, d);
  const from = env.MAIL_FROM || `Sam Vllaco <${EMAIL}>`;
  const [, name = "Sam Vllaco", address = EMAIL] = from.match(/^\s*(.*?)\s*<([^>]+)>\s*$/) || [null, "Sam Vllaco", from];
  const m = {
    name, address, to, replyTo: EMAIL, subject, html: layout(paras, d.unsub), text: text(paras, d.unsub),
    headers: { "List-Unsubscribe": `<${d.unsub}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
  };
  let last = "quota 429: every sender is at its daily cap";
  for (const x of list) {
    const used = await usedToday(env, x.name);
    if (used >= x.max) continue;
    const [url, headers, body] = x.request(env[x.key], m);
    let r;
    try {
      r = await fetcher(url, { method: "POST", headers: { ...headers, "content-type": "application/json" }, body: JSON.stringify(body) });
    } catch (e) {
      last = `${x.name} 0: ${String(e.message).slice(0, 100)}`;
      continue;
    }
    if (r.ok) {
      if (env.CACHE) await env.CACHE.put(dayKey(x.name), String(used + 1), { expirationTtl: 90000 });
      return { ok: true, via: x.name };
    }
    last = `${x.name} ${r.status}: ${(await r.text().catch(() => "")).slice(0, 120)}`;
    // A full sender stays skipped for the rest of the day.
    if (r.status === 429 && env.CACHE) await env.CACHE.put(dayKey(x.name), String(x.max), { expirationTtl: 90000 });
  }
  throw new Error(last);
}

const details = (row, report) => {
  const issues = JSON.parse(report?.issues || "[]");
  return {
    domain: row.domain, score: report?.score ?? row.score, label: report?.label || "",
    report: `${SITE}/slop-score/r/${row.report_id}`,
    fixes: issues.slice(0, report?.unlocked ? 5 : 3).map((x) => x.title).filter(Boolean),
    unlocked: Boolean(report?.unlocked), locked: report?.unlocked ? 0 : Math.max(0, issues.length - 3),
    unsub: `${SITE}/api/slop-score/unsubscribe?t=${row.token}`,
  };
};

// Sends whatever is due: the report email to everyone, follow-ups only with consent. Small batches, safe to run often.
// Each sender stops below its free plan's daily limit (DAILY_MAX), so nothing ever needs a paid plan.
export async function runDrip(env, limit = 15) {
  if (!env.DB || !mailReady(env)) return 0;
  const now = Date.now();
  const room = await roomToday(env);
  if (room <= 0) return 0;
  limit = Math.min(limit, room);
  const { results } = await env.DB.prepare("SELECT * FROM drip WHERE unsub = 0 AND next_at <= ? AND step < ? AND (step = 0 OR consent = 1) ORDER BY next_at LIMIT ?").bind(now, STEPS.length, limit).all();
  let sent = 0;
  for (const row of results) {
    const report = await env.DB.prepare("SELECT score, label, issues, unlocked FROM reports WHERE id = ?").bind(row.report_id).first();
    const step = row.step;
    try {
      await send(env, row.email, step, details(row, report));
      sent++;
    } catch (e) {
      const err = String(e.message).slice(0, 120);
      console.error(JSON.stringify({ drip: row.id, step, err }));
      // Every sender full: try the whole batch again later, no strike against this address.
      if (/^\w+ 429/.test(err)) { await env.DB.prepare("UPDATE drip SET next_at = ? WHERE id = ?").bind(now + 3600000, row.id).run(); break; }
      // Anything else: retry in an hour, give up on this address after 3 failed tries.
      const tries = (row.tries || 0) + 1;
      await env.DB.prepare("UPDATE drip SET tries = ?, next_at = ?, unsub = ? WHERE id = ?").bind(tries, now + 3600000, tries >= 3 ? 1 : 0, row.id).run();
      continue;
    }
    const next = step + 1;
    const at = next < STEPS.length ? row.created_ms + STEPS[next] * DAY : now;
    await env.DB.prepare("UPDATE drip SET step = ?, next_at = ?, tries = 0, last_sent = ? WHERE id = ?").bind(next, Math.max(at, now), now, row.id).run();
  }
  return sent;
}

// The paid report, sent right away (not through the queue). Counts toward the daily cap.
export async function sendReportNow(env, email, reportId) {
  if (!mailReady(env)) return false;
  const row = await env.DB.prepare("SELECT * FROM drip WHERE email = ? AND report_id = ?").bind(email, reportId).first();
  const report = await env.DB.prepare("SELECT score, label, issues, unlocked FROM reports WHERE id = ?").bind(reportId).first();
  if (!row || !report) return false;
  await send(env, email, 0, details(row, report));
  return true;
}
