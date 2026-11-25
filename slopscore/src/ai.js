// One Anthropic Messages API call with a forced tool, so the review always comes back as structured JSON.
import { SYSTEM, TOOL } from "./rubric.js";
import { SLOP } from "../config.js";

// No em or en dashes anywhere in what visitors read, even if the model slips one in.
export const undash = (v) => {
  if (typeof v === "string") return v.replace(/\s*[—–]\s*/g, ", ").replace(/,\s*,/g, ",");
  if (Array.isArray(v)) return v.map(undash);
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, undash(x)]));
  return v;
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
      tools: [TOOL],
      tool_choice: { type: "tool", name: TOOL.name },
      messages: [{ role: "user", content: [...images, { type: "text", text: `Screenshots in order: desktop first screen, desktop full page (first 3000px), mobile first screen.\n\nPage data (JSON):\n${JSON.stringify(facts)}` }] }],
    }),
  });
  if (!res.ok) throw new Error(`anthropic ${res.status}`);
  const out = await res.json();
  const call = (out.content || []).find((c) => c.type === "tool_use");
  if (!call) throw new Error("anthropic no tool call");
  const r = undash(call.input);
  r.issues = (r.issues || []).slice(0, 15).map((x, i) => ({ ...x, id: x.id || `i${i + 1}` }));
  return { ...r, model: out.model || SLOP.model };
}
