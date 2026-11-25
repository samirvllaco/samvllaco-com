import { test } from "node:test";
import assert from "node:assert/strict";
import { render, STEPS, send } from "../src/mail.js";

const d = { domain: "example.com", score: 45, label: "Sloppy", report: "https://samvllaco.com/slop-score/r/abcdefghij", fixes: ["One", "Two", "Three"], unsub: "https://samvllaco.com/api/slop-score/unsubscribe?t=x" };

test("every step renders a subject and body with no em dashes", () => {
  for (let i = 0; i < STEPS.length; i++) {
    const { subject, paras } = render(i, d);
    assert.ok(subject.length > 10 && subject.length < 80, subject);
    const all = subject + paras.join(" ");
    assert.ok(!/[—–]/.test(all), `dash in step ${i}`);
  }
  assert.match(render(0, d).paras.join(" "), /45\/100/);
  assert.match(render(0, d).paras.join(" "), /abcdefghij/);
});

test("send is a no-op without RESEND_API_KEY", async () => {
  assert.deepEqual(await send({}, "a@b.co", 0, d), { skipped: true });
});
