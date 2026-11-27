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

// A tiny stand-in for the CACHE KV binding.
const kv = () => { const m = new Map(); return { get: async (k) => m.get(k) ?? null, put: async (k, v) => void m.set(k, v), m }; };

test("Brevo sends when Resend refuses or is full, and each stays under its daily cap", async () => {
  const quiet = console.error; console.error = () => {};
  try {
    const env = { RESEND_API_KEY: "re_x", BREVO_API_KEY: "xkeysib-x", CACHE: kv() };
    let calls = [];
    const resendFull = async (url, init) => (calls.push({ url, init }), new Response("{}", { status: url.includes("resend") ? 429 : 201 }));
    assert.deepEqual(await send(env, "a@b.co", 0, d, resendFull, () => 1), { ok: true, via: "brevo" });
    assert.equal(calls[1].url, "https://api.brevo.com/v3/smtp/email");
    assert.equal(calls[1].init.headers["api-key"], "xkeysib-x");
    const body = JSON.parse(calls[1].init.body);
    assert.deepEqual(body.to, [{ email: "a@b.co" }]);
    assert.equal(body.sender.name, "Sam Vllaco");
    assert.match(body.headers["List-Unsubscribe"], /unsubscribe/);
    // Resend's 429 marks it full for the day: the next email goes straight to Brevo.
    calls = [];
    const ok = async (url, init) => (calls.push({ url, init }), new Response("{}", { status: 201 }));
    assert.equal((await send(env, "c@d.co", 1, d, ok, () => 1)).via, "brevo");
    assert.equal(calls.length, 1);

    // Caps: Resend 90, then Brevo 280, then nothing.
    const { DAILY_MAX, roomToday } = await import("../src/mail.js");
    assert.deepEqual(DAILY_MAX, { resend: 90, brevo: 280 });
    const fresh = { RESEND_API_KEY: "re_x", BREVO_API_KEY: "xkeysib-x", CACHE: kv() };
    assert.equal(await roomToday(fresh), 370);
    const day = new Date().toISOString().slice(0, 10);
    await fresh.CACHE.put(`mail:${day}:resend`, "90");
    assert.equal((await send(fresh, "e@f.co", 0, d, ok, () => 1)).via, "brevo");
    await fresh.CACHE.put(`mail:${day}:brevo`, "280");
    assert.equal(await roomToday(fresh), 0);
    await assert.rejects(send(fresh, "g@h.co", 0, d, ok), /^Error: quota 429/);
    // About 1 in 20 goes to Brevo first so its key stays in use.
    assert.equal((await send({ RESEND_API_KEY: "re_x", BREVO_API_KEY: "b", CACHE: kv() }, "a@b.co", 0, d, ok, () => 0)).via, "brevo");
    assert.equal((await send({ RESEND_API_KEY: "re_x", BREVO_API_KEY: "b", CACHE: kv() }, "a@b.co", 0, d, ok, () => 0.5)).via, "resend");
    // Resend alone, as before.
    assert.equal((await send({ RESEND_API_KEY: "re_x", CACHE: kv() }, "a@b.co", 0, d, ok)).via, "resend");
  } finally { console.error = quiet; }
});
