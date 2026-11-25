// Stripe for the $5 full report, with no secret API key on the site: a Stripe Payment Link carries the report id as
// client_reference_id, and the checkout.session.completed webhook (signed with STRIPE_WEBHOOK_SECRET) unlocks it.
// STRIPE_REPORT_LINK is the Payment Link URL (public, plain variable).

const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");

// Checks the Stripe-Signature header: t=timestamp, v1=HMAC-SHA256(secret, `${t}.${body}`), within 5 minutes.
export async function verifyStripe(secret, header, body, now = Date.now()) {
  if (!secret || !header) return false;
  const parts = Object.fromEntries(header.split(",").map((kv) => kv.split("=")).filter((x) => x.length === 2).map(([k, v]) => [k.trim(), v.trim()]));
  const sigs = header.split(",").filter((kv) => kv.trim().startsWith("v1=")).map((kv) => kv.trim().slice(3));
  const t = Number(parts.t);
  if (!t || !sigs.length || Math.abs(now / 1000 - t) > 300) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const want = hex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${t}.${body}`)));
  return sigs.some((s) => s.length === want.length && [...s].reduce((d, c, i) => d | (c.charCodeAt(0) ^ want.charCodeAt(i)), 0) === 0);
}

// The paid session, or null for anything else.
export function paidSession(e) {
  if (!e || e.type !== "checkout.session.completed") return null;
  const s = e.data && e.data.object;
  if (!s || s.payment_status !== "paid") return null;
  return {
    id: s.id,
    reportId: /^[A-Za-z0-9]{10}$/.test(s.client_reference_id || "") ? s.client_reference_id : null,
    email: String((s.customer_details && s.customer_details.email) || s.customer_email || "").toLowerCase().slice(0, 320),
    consent: Boolean(s.consent && s.consent.promotions === "opt_in"),
  };
}
