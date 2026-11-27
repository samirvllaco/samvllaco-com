import test from "node:test";
import assert from "node:assert/strict";
import { SYSTEM, cleanMessages, sseToText } from "../src/ask.js";

test("system prompt carries real prices and pages", () => {
  for (const s of ["$5,000", "$2,500", "$5,000 to $10,000", "$12.99", "$1,500", "/book/", "573 clients"]) assert.ok(SYSTEM.includes(s), s);
  for (const s of ["/pricing/", "Monthly plan", "per week"]) assert.ok(!SYSTEM.includes(s), `no ${s}`);
  assert.ok(!SYSTEM.includes("—"));
});

test("messages are trimmed, capped and must end with the visitor", () => {
  assert.equal(cleanMessages([]), null);
  assert.equal(cleanMessages([{ role: "user", content: "  " }]), null);
  assert.equal(cleanMessages([{ role: "user", content: "a" }, { role: "assistant", content: "b" }]), null);
  const m = cleanMessages([{ role: "assistant", content: "hi" }, { role: "system", content: "x".repeat(2000) }]);
  assert.deepEqual(m.map((x) => x.role), ["user"]);
  assert.equal(m[0].content.length, 800);
});

test("stream keeps only answer text and drops em dashes", async () => {
  const ev = (t) => `data: ${JSON.stringify({ type: "content_block_delta", delta: { type: "text_delta", text: t } })}\n\n`;
  const raw = new TextEncoder().encode(`event: message_start\ndata: {"type":"message_start"}\n\n${ev("A — b")}${ev(".")}`);
  const src = new ReadableStream({ start(c) { c.enqueue(raw.slice(0, 50)); c.enqueue(raw.slice(50)); c.close(); } });
  let done = "";
  const out = await new Response(src.pipeThrough(sseToText((t) => (done = t)))).text();
  assert.equal(out, "A, b.");
  assert.equal(done, "A, b.");
});
