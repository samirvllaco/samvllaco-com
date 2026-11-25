import { SLOP, T } from "../config.js";

// What the browser gets. Locked issues never leave the server until the report is unlocked.
export function view(r) {
  const issues = JSON.parse(r.issues || "[]"), categories = JSON.parse(r.categories || "[]"), m = JSON.parse(r.metrics || "{}");
  const unlocked = Boolean(r.unlocked);
  const acc = (categories.find((c) => c.k === "accessibility") || {}).score || 0;
  const a11yIssues = (m.axeElements || 0) + (m.smallTargets || 0) + (m.imagesNoAlt || 0);
  return {
    id: r.id, url: r.url, domain: new URL(r.url).hostname.replace(/^www\./, ""), score: r.score, label: r.label, verdict: r.verdict, categories,
    created_at: r.created_at, unlocked,
    issues: unlocked ? issues : issues.slice(0, SLOP.freeIssues).map(({ prompts, ...x }) => x),
    locked: unlocked ? 0 : Math.max(0, issues.length - SLOP.freeIssues),
    a11y: { score: acc, issues: a11yIssues, nudge: acc >= T.EAA_NUDGE || Boolean(m.axeCritical) },
  };
}
