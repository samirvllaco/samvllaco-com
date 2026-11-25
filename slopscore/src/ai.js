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
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: env.SLOP_MODEL || SLOP.model,
      max_tokens: 8000,
      system: SYSTEM,
      output_config: { format: { type: "json_schema", schema: strict(TOOL.input_schema) } },
      messages: [{ role: "user", content: [...images, { type: "text", text: `Screenshots in order: desktop first screen, desktop full page (first 3000px), mobile first screen.\n\nPage data (JSON):\n${JSON.stringify(facts)}` }] }],
    }),
  });
  if (!res.ok) { const t = await res.text().catch(() => ""); let m = t; try { m = JSON.parse(t).error.message; } catch { /* raw */ } throw new Error(`anthropic ${res.status}: ${String(m).slice(0, 160)}`); }
  const out = await res.json();
  const text = (out.content || []).filter((c) => c.type === "text").map((c) => c.text).join("");
  let parsed;
  try { parsed = JSON.parse(text); } catch { throw new Error(`anthropic bad json (${out.stop_reason || "?"})`); }
  const r = undash(parsed);
  r.issues = (r.issues || []).slice(0, 15).map((x, i) => ({ ...x, id: x.id || `i${i + 1}` }));
  return { ...r, model: out.model || SLOP.model, usage: out.usage };
}
