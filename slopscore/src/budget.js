// Spend guard for the free Anthropic credit ($200, no card on file).
// Before a model call, an upper-bound estimate is booked in D1; after it, the booking is corrected to the real cost
// from the API's usage numbers. New calls stop once the running total or today's share would pass its limit.
// A call cut off midway keeps its estimate, so the guard can only stop early, never late. No DB means no calls.

// $ per million tokens: input, output, cache write (1-hour writes cost more; priced at that rate to err high), cache read (platform.claude.com pricing, Nov 2026).
const PRICES = {
  "claude-sonnet-5-5": [2, 10, 4, 0.1],
  "claude-haiku-5-5": [0.1, 0.5, 0.2, 0.01],
};
const UNKNOWN = [4, 20, 5, 0.2]; // a model not listed is priced like Opus, so the guard errs high

// USD. The credit is $200; the $20 gap covers calls already running when the limit is reached.
// Override with the AI_BUDGET_USD and AI_BUDGET_DAY_USD variables.
export const BUDGET = { total: 180, day: 7 };
// Booked before a call; the real cost replaces it afterwards.
export const EST = { scan: 0.15, ask: 0.002 };

export function costOf(model, u = {}) {
  const [i, o, w, r] = PRICES[String(model || "").replace(/-\d{8}$/, "")] || UNKNOWN;
  return ((u.input_tokens || 0) * i + (u.output_tokens || 0) * o + (u.cache_creation_input_tokens || 0) * w + (u.cache_read_input_tokens || 0) * r) / 1e6;
}

const limits = (env) => ({ total: Number(env.AI_BUDGET_USD) || BUDGET.total, day: Number(env.AI_BUDGET_DAY_USD) || BUDGET.day });
const dayKey = () => `day:${new Date().toISOString().slice(0, 10)}`;

async function add(env, usd) {
  if (!usd) return;
  const q = "INSERT INTO spend (k, usd) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET usd = usd + excluded.usd";
  await env.DB.batch([env.DB.prepare(q).bind("total", usd), env.DB.prepare(q).bind(dayKey(), usd)]);
}

export async function spent(env) {
  const { results } = await env.DB.prepare("SELECT k, usd FROM spend WHERE k IN ('total', ?)").bind(dayKey()).all();
  const get = (k) => Number((results.find((r) => r.k === k) || {}).usd || 0);
  return { total: get("total"), day: get(dayKey()) };
}

// True while a call of this size still fits both limits (used by the status endpoints, books nothing).
export async function hasBudget(env, est) {
  if (!env.DB) return false;
  const s = await spent(env), l = limits(env);
  return s.total + est <= l.total && s.day + est <= l.day;
}

// Books the estimate and returns true, or returns false when the call would pass a limit.
export async function take(env, est) {
  if (!env.DB) return false;
  const s = await spent(env), l = limits(env);
  if (s.total + est > l.total || s.day + est > l.day) return false;
  await add(env, est);
  return true;
}

// Swaps the booked estimate for the real cost.
export async function settle(env, est, model, usage) {
  if (!env.DB || !usage) return;
  await add(env, costOf(model, usage) - est);
}
