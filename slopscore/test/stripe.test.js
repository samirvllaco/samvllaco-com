import { test } from "node:test";
import assert from "node:assert/strict";
import { verifyStripe, paidSession } from "../src/stripe.js";

const sign = async (secret, t, body) => {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return [...new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${t}.${body}`)))].map((b) => b.toString(16).padStart(2, "0")).join("");
};

test("verifyStripe accepts a fresh valid signature and rejects bad, stale or missing ones", async () => {
  const body = '{"type":"checkout.session.completed"}', t = Math.floor(Date.now() / 1000), sig = await sign("whsec_x", t, body);
  assert.equal(await verifyStripe("whsec_x", `t=${t},v1=${sig}`, body), true);
  assert.equal(await verifyStripe("whsec_y", `t=${t},v1=${sig}`, body), false);
  assert.equal(await verifyStripe("whsec_x", `t=${t - 900},v1=${await sign("whsec_x", t - 900, body)}`, body), false);
  assert.equal(await verifyStripe("whsec_x", "", body), false);
  assert.equal(await verifyStripe("", `t=${t},v1=${sig}`, body), false);
});

test("paidSession reads the report id, email and consent from a paid session only", () => {
  const e = { type: "checkout.session.completed", data: { object: { id: "cs_1", payment_status: "paid", client_reference_id: "AbCdEfGhIj", customer_details: { email: "A@B.co" }, consent: { promotions: "opt_in" } } } };
  assert.deepEqual(paidSession(e), { id: "cs_1", reportId: "AbCdEfGhIj", email: "a@b.co", consent: true });
  assert.equal(paidSession({ ...e, data: { object: { ...e.data.object, payment_status: "unpaid" } } }), null);
  assert.equal(paidSession({ type: "payment_intent.succeeded" }), null);
  assert.equal(paidSession({ ...e, type: "checkout.session.async_payment_succeeded" }).reportId, "AbCdEfGhIj");
  assert.equal(paidSession({ ...e, data: { object: { ...e.data.object, client_reference_id: "../x" } } }).reportId, null);
});
