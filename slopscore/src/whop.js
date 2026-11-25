// Whop: a checkout that carries the report id, and the payment webhook that unlocks it.
// Webhooks follow the Standard Webhooks scheme: HMAC-SHA256 over "id.timestamp.body", sent as "v1,<base64>".

const API = (env) => (env.WHOP_API_BASE || "https://api.whop.com").replace(/\/$/, "");

export async function createCheckout(env, reportId, origin) {
  const res = await fetch(`${API(env)}/api/v1/checkout_configurations`, {
    method: "POST",
    headers: { authorization: `Bearer ${env.WHOP_API_KEY}`, "content-type": "application/json", "idempotency-key": `slop-${reportId}-${Math.floor(Date.now() / 600000)}` },
    body: JSON.stringify({
      account_id: env.WHOP_ACCOUNT_ID,
      variant_id: env.WHOP_REPORT_PLAN_ID,
      metadata: { report_id: reportId, source: "slop-score" },
      redirect_url: `${origin}/slop-score/r/${reportId}?paid=1`,
    }),
  });
  if (!res.ok) throw new Error(`whop checkout ${res.status}`);
  const j = await res.json();
  if (!j.purchase_url) throw new Error("whop no purchase_url");
  return j.purchase_url;
}

const b64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
const enc = new TextEncoder();
async function hmac(keyBytes, msg) {
  const key = await crypto.subtle.importKey("raw", keyBytes, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64(await crypto.subtle.sign("HMAC", key, enc.encode(msg)));
}
const same = (a, b) => { if (a.length !== b.length) return false; let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i); return d === 0; };

// Whop documents the secret as used literally; the Standard Webhooks default is base64 after a prefix. Accept either.
function keyCandidates(secret) {
  const out = [enc.encode(secret)];
  const tail = secret.replace(/^(whsec|ws)_/, "");
  try { out.push(Uint8Array.from(atob(tail), (c) => c.charCodeAt(0))); } catch { /* not base64 */ }
  return out;
}

export async function verifyWebhook(secret, headers, body, now = Date.now()) {
  const id = headers.get("webhook-id"), ts = headers.get("webhook-timestamp"), sig = headers.get("webhook-signature");
  if (!secret || !id || !ts || !sig) return false;
  if (Math.abs(now / 1000 - Number(ts)) > 300) return false; // 5 minutes
  const given = sig.split(" ").map((s) => s.split(",")[1]).filter(Boolean);
  for (const key of keyCandidates(secret)) {
    const want = await hmac(key, `${id}.${ts}.${body}`);
    if (given.some((g) => same(g, want))) return true;
  }
  return false;
}

// Pull what we need from a payment.succeeded event, whatever its exact shape.
export function paymentOf(event) {
  const d = event?.data || {};
  const meta = d.metadata || d.checkout_configuration?.metadata || {};
  const email = d.user?.email || d.member?.email || d.email || d.customer?.email || null;
  return { id: d.id || event.id, reportId: meta.report_id || null, email: email ? String(email).toLowerCase() : null };
}
