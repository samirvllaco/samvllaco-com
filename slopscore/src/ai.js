// One Anthropic Messages API call with a JSON schema (structured outputs), so the review always comes back as JSON.
// Sonnet 5.5 rejects a forced tool_choice, so the schema goes in output_config.format instead.
import { SYSTEM, TOOL } from "./rubric.js";
import { SLOP } from "../config.js";

// No em or en dashes anywhere in what visitors read, even if the model slips one in.
export const undash = (v) => {
  if (typeof v === "string") return v.replace(/\s*[—–]\s*/g, ", ").replace(/,\s*,/g, ",");
  if (Array.isArray(v)) return v.map(undash);
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, undash(x)]));
  return v;
};

// Structured outputs need additionalProperties: false on every object and reject number and length limits,
// so limits move into the description (the code clamps the values anyway).
const LIMITS = ["minimum", "maximum", "exclusiveMinimum", "exclusiveMaximum", "minLength", "maxLength", "minItems", "maxItems", "pattern", "format"];
export const strict = (v) => {
  if (Array.isArray(v)) return v.map(strict);
  if (!v || typeof v !== "object") return v;
  const o = Object.fromEntries(Object.entries(v).filter(([k]) => !LIMITS.includes(k)).map(([k, x]) => [k, k === "properties" ? Object.fromEntries(Object.entries(x).map(([n, y]) => [n, strict(y)])) : strict(x)]));
  const lim = LIMITS.filter((k) => k in v && typeof v[k] !== "object").map((k) => `${k} ${v[k]}`);
  if (lim.length) o.description = `${o.description ? `${o.description} ` : ""}(${lim.join(", ")})`;
  if (o.type === "object") o.additionalProperties = false;
  return o;
};

export async function review(env, { shots, metrics, det, axe, url }) {
  const images = shots.filter(Boolean).map((data) => ({ type: "image", source: { type: "base64", media_type: "image/jpeg", data } }));
  const facts = {
    url,
    measured_scores: det,
    metrics: { ...metrics, copy: undefined },
    accessibility_violations: axe.map((v) => ({ rule: v.id, impact: v.impact, elements: v.nodes, help: v.help })),
    copy_sample: metrics.copy,
  };
  // Up to 3 tries (owner, 26 Nov 2026: scans failed now and then at this step): a busy or failing API (429, 5xx, 529),
  // a dropped connection, or an answer cut off before the JSON closed. Each try has its own time limit.
  // Usage of every try is added up, so the spend guard books what was really used.
  const body = (max) => JSON.stringify({
    model: env.SLOP_MODEL || SLOP.model,
    max_tokens: max,
    system: SYSTEM,
    output_config: { format: { type: "json_schema", schema: strict(TOOL.input_schema) } },
    messages: [{ role: "user", content: [...images, { type: "text", text: `Screenshots in order: desktop first screen, desktop full page (first 3000px), mobile first screen.\n\nPage data (JSON):\n${JSON.stringify(facts)}` }] }],
  });
  const used = { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 };
  const add = (u) => { for (const k of Object.keys(used)) used[k] += Number(u?.[k] || 0); };
  let out, parsed, last = "", max = 8000;
  for (let attempt = 1; attempt <= 3; attempt++) {
    if (attempt > 1) await new Promise((r) => setTimeout(r, 1500 * (attempt - 1)));
    let res;
    try {
      res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
        body: body(max),
        signal: AbortSignal.timeout(100000),
      });
    } catch (e) { last = `anthropic network: ${String(e && e.message).slice(0, 80)}`; continue; }
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      let m = t; try { m = JSON.parse(t).error.message; } catch { /* raw */ }
      last = `anthropic ${res.status}: ${String(m).slice(0, 160)}`;
      if (res.status === 429 || res.status >= 500) continue; // busy or failing: try again
      const err = new Error(last); err.usage = used; throw err; // a rejected request: no point retrying
    }
    out = await res.json();
    add(out.usage);
    const text = (out.content || []).filter((c) => c.type === "text").map((c) => c.text).join("");
    try { parsed = JSON.parse(text); break; } catch {
      last = `anthropic bad json (${out.stop_reason || "?"})`;
      if (out.stop_reason === "max_tokens") max = 12000; // give the answer room to finish next time
    }
  }
  if (!parsed) { const err = new Error(last || "anthropic failed"); err.usage = used; throw err; }
  const r = undash(parsed);
  r.issues = (r.issues || []).slice(0, 15).map((x, i) => ({ ...x, id: x.id || `i${i + 1}` }));
  return { ...r, model: out.model || SLOP.model, usage: used };
}
