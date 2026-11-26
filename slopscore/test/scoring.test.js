import { test } from "node:test";
import assert from "node:assert/strict";
import { deterministic, finalize, typography, color, spacing, components, copy, accessibility } from "../src/scoring.js";
import { labelFor } from "../config.js";

const clean = { fontSizes: 5, fontFamilies: 1, bodyLineHeight: 1.6, grays: 3, accentHues: 1, aiGradient: false, gradientText: false, gridShare: 0.95, spacingValues: 10, radii: 2, shadows: 1, filledButtons: 1, cardDepth: 1, buzzwords: [], headingEmoji: 0, smallTargets: 0, imagesNoAlt: 0 };
const sloppy = { fontSizes: 12, fontFamilies: 4, bodyLineHeight: 1.2, grays: 11, accentHues: 5, aiGradient: true, gradientText: true, gridShare: 0.6, spacingValues: 30, radii: 7, shadows: 6, filledButtons: 4, cardDepth: 3, buzzwords: ["unlock", "seamless", "elevate"], headingEmoji: 2, smallTargets: 9, imagesNoAlt: 4 };

test("a clean page scores 0 everywhere", () => {
  assert.deepEqual(deterministic(clean, []), { spacing: 0, typography: 0, color: 0, components: 0, copy: 0, accessibility: 0 });
});

test("each rule adds what the config says", () => {
  assert.equal(typography({ ...clean, fontSizes: 12 }), 8);
  assert.equal(typography({ ...clean, fontSizes: 40 }), 40); // capped
  assert.equal(typography({ ...clean, fontFamilies: 3 }), 15);
  assert.equal(typography({ ...clean, bodyLineHeight: 1.3 }), 10);
  assert.equal(color({ ...clean, grays: 10, aiGradient: true }), 8 + 30);
  assert.equal(spacing({ ...clean, gridShare: 0.65 }), 10);
  assert.equal(components({ ...clean, filledButtons: 4, cardDepth: 3 }), 12 + 15);
  assert.equal(copy({ ...clean, buzzwords: ["a", "b"], headingEmoji: 1 }), 20 + 10);
  assert.equal(accessibility(clean, [{ impact: "critical" }, { impact: "serious" }, { impact: "minor" }]), 17);
});

test("scores are capped at 100", () => {
  const d = deterministic(sloppy, Array.from({ length: 20 }, () => ({ impact: "critical" })));
  for (const v of Object.values(d)) assert.ok(v <= 100 && v >= 0);
  assert.ok(d.color >= 60); // purple gradient + gradient text + many grays
});

test("finalize applies clamped AI adjustments, weights and labels", () => {
  const det = deterministic(clean, []);
  const f = finalize(det, { adjustments: [{ category: "copy", adjust: 40, evidence: "x" }], originality: 10 });
  assert.equal(f.categories.find((c) => c.k === "copy").score, 30); // adjustment clamped to +30
  assert.equal(f.categories.find((c) => c.k === "originality").score, 10);
  assert.equal(f.score, Math.round(0.55 * 10 + 0.45 * ((30 * 10) / 60)));
  assert.equal(f.label, "Designed");
  assert.equal(labelFor(21), "A little sloppy");
  assert.equal(labelFor(100), "Pure slop");
});

test("hand-made rich pages land low, the AI-builder look lands high", () => {
  const linear = { fontSizes: 12, fontFamilies: 2, bodyLineHeight: 1.5, grays: 10, accentHues: 10, aiGradient: false, gradientText: false, spacingValues: 37, gridShare: 0.78, radii: 11, shadows: 12, filledButtons: 6, cardDepth: 4, buzzwords: [], headingEmoji: 0, imagesNoAlt: 0, smallTargets: 16 };
  assert.ok(finalize(deterministic(linear, [{ impact: "serious" }]), { originality: 10 }).score <= 20);
  assert.ok(finalize(deterministic(sloppy, [{ impact: "serious" }]), { originality: 75 }).score > 40); // "Sloppy" or worse
});

import { view } from "../src/view.js";
test("locked reports never send prompts or the hidden issues", () => {
  const issues = Array.from({ length: 10 }, (_, i) => ({ id: `i${i}`, title: `T${i}`, prompts: { lovable: "p", cursor: "p", claude_code: "p" } }));
  const row = { id: "AbCdEfGh23", url: "https://www.site.com/x", score: 52, label: "Sloppy", verdict: "v", categories: JSON.stringify([{ k: "accessibility", score: 55 }]), issues: JSON.stringify(issues), metrics: JSON.stringify({ axeElements: 7, smallTargets: 3, imagesNoAlt: 1 }), unlocked: 0, created_at: "2026-11-25" };
  const v = view(row);
  assert.equal(v.issues.length, 3);
  assert.ok(v.issues.every((x) => !("prompts" in x)));
  assert.equal(v.locked, 7);
  assert.equal(v.domain, "site.com");
  assert.deepEqual(v.a11y, { score: 55, issues: 11, nudge: true });
  const u = view({ ...row, unlocked: 1 });
  assert.equal(u.issues.length, 10);
  assert.ok(u.issues[9].prompts);
});
