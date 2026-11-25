import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { verifyWebhook, paymentOf } from "../src/whop.js";

const sign = (key, id, ts, body) => `v1,${createHmac("sha256", key).update(`${id}.${ts}.${body}`).digest("base64")}`;
const body = JSON.stringify({ id: "msg_1", type: "payment.succeeded", data: { id: "pay_1", metadata: { report_id: "AbCdEfGh23" }, user: { email: "A@B.co" } } });
const now = 1795600000000, ts = String(now / 1000);

test("accepts a correctly signed webhook (literal secret)", async () => {
  const h = new Headers({ "webhook-id": "msg_1", "webhook-timestamp": ts, "webhook-signature": sign("ws_secret", "msg_1", ts, body) });
  assert.equal(await verifyWebhook("ws_secret", h, body, now), true);
});

test("accepts the base64 secret form too", async () => {
  const raw = Buffer.from("supersecretkey");
  const h = new Headers({ "webhook-id": "msg_1", "webhook-timestamp": ts, "webhook-signature": sign(raw, "msg_1", ts, body) });
  assert.equal(await verifyWebhook(`whsec_${raw.toString("base64")}`, h, body, now), true);
});

test("rejects bad signatures, old timestamps and edits", async () => {
  const good = sign("ws_secret", "msg_1", ts, body);
  assert.equal(await verifyWebhook("ws_secret", new Headers({ "webhook-id": "msg_1", "webhook-timestamp": ts, "webhook-signature": "v1,AAAA" }), body, now), false);
  assert.equal(await verifyWebhook("ws_secret", new Headers({ "webhook-id": "msg_1", "webhook-timestamp": ts, "webhook-signature": good }), body + " ", now), false);
  assert.equal(await verifyWebhook("ws_secret", new Headers({ "webhook-id": "msg_1", "webhook-timestamp": ts, "webhook-signature": good }), body, now + 10 * 60 * 1000), false);
});

test("reads report id and email from the payment", () => {
  assert.deepEqual(paymentOf(JSON.parse(body)), { id: "pay_1", reportId: "AbCdEfGh23", email: "a@b.co" });
});
