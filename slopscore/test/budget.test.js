import { test } from "node:test";
import assert from "node:assert/strict";
import { costOf, take, settle, spent, BUDGET } from "../src/budget.js";

// Minimal D1 stand-in: one table, the upsert and the select the guard uses.
function fakeDB() {
  const rows = new Map();
  const stmt = (q, args = []) => ({
    bind: (...a) => stmt(q, a),
    run: async () => { rows.set(args[0], (rows.get(args[0]) || 0) + args[1]); },
    all: async () => ({ results: [...rows].filter(([k]) => k === "total" || k === args[0]).map(([k, usd]) => ({ k, usd })) }),
  });
  return { prepare: (q) => stmt(q), batch: async (list) => { for (const s of list) await s.run(); } };
}

test("costOf prices Haiku and Sonnet from usage, unknown models high", () => {
  assert.equal(costOf("claude-haiku-5-5", { input_tokens: 1e6, output_tokens: 1e6 }), 0.6);
  assert.equal(costOf("claude-sonnet-5-5", { input_tokens: 1e6, output_tokens: 1e6, cache_read_input_tokens: 1e6 }), 12.1);
  assert.equal(costOf("claude-sonnet-5-5-20261101", { output_tokens: 1e6 }), 10);
  assert.equal(costOf("mystery", { output_tokens: 1e6 }), 20);
});

test("take books the estimate, settle swaps it for the real cost", async () => {
  const env = { DB: fakeDB() };
  assert.equal(await take(env, 0.15), true);
  await settle(env, 0.15, "claude-sonnet-5-5", { input_tokens: 10000, output_tokens: 2000 });
  const s = await spent(env);
  assert.ok(Math.abs(s.total - 0.04) < 1e-9 && Math.abs(s.day - 0.04) < 1e-9);
});

test("take refuses once the day or the total would pass its limit, and with no DB", async () => {
  const env = { DB: fakeDB(), AI_BUDGET_DAY_USD: "0.2" };
  assert.equal(await take(env, 0.15), true);
  assert.equal(await take(env, 0.15), false);
  assert.equal(await take({ DB: fakeDB(), AI_BUDGET_USD: "0.1" }, 0.15), false);
  assert.equal(await take({}, 0.001), false);
  assert.ok(BUDGET.total < 200);
});
