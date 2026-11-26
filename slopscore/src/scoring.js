// Deterministic Slop Score categories from measured page metrics and axe results. Pure functions, unit tested.
import { T, WEIGHTS, CATS, labelFor } from "../config.js";

const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));
const over = (n, free) => Math.max(0, (n || 0) - free);
const capped = (n, free, each, cap) => Math.min(cap, over(n, free) * each);

export function typography(m) {
  let s = capped(m.fontSizes, T.TYPE_SIZES_FREE, T.TYPE_SIZE_EACH, T.TYPE_SIZE_CAP);
  s += over(m.fontFamilies, T.FAMILIES_FREE) * T.FAMILY_EACH;
  if (m.bodyLineHeight && m.bodyLineHeight < T.LINE_HEIGHT_MIN) s += T.LINE_HEIGHT_PENALTY;
  return clamp(s);
}

export function color(m) {
  let s = capped(m.grays, T.GRAYS_FREE, T.GRAY_EACH, T.GRAY_CAP);
  s += capped(m.accentHues, T.ACCENTS_FREE, T.ACCENT_EACH, T.ACCENT_CAP);
  if (m.aiGradient) s += T.AI_GRADIENT;
  if (m.gradientText) s += T.GRADIENT_TEXT;
  return clamp(s);
}

export function spacing(m) {
  let s = 0;
  const share = m.gridShare ?? 1;
  if (share < T.GRID_SHARE_OK) s += Math.round((T.GRID_SHARE_OK - share) * 100) * T.GRID_POINT;
  s += capped(m.spacingValues, T.SPACING_VALUES_FREE, T.SPACING_EACH, T.SPACING_CAP);
  s += capped(m.radii, T.RADII_FREE, T.RADIUS_EACH, T.RADIUS_CAP);
  s += capped(m.shadows, T.SHADOWS_FREE, T.SHADOW_EACH, T.SHADOW_CAP);
  return clamp(s);
}

export function components(m) {
  let s = capped(m.filledButtons, T.BUTTONS_FREE, T.BUTTON_EACH, T.BUTTON_CAP);
  if ((m.cardDepth || 0) >= T.NEST_DEPTH) s += T.NEST_PENALTY;
  return clamp(s);
}

export function copy(m) {
  const buzz = Math.min(T.BUZZ_CAP, (m.buzzwords || []).length * T.BUZZ_EACH);
  const emoji = Math.min(T.EMOJI_CAP, (m.headingEmoji || 0) * T.EMOJI_EACH);
  return clamp(buzz + emoji);
}

// axe: [{ id, impact, nodes }]. Counted per rule violated, not per element.
export function accessibility(m, axe = []) {
  let s = axe.reduce((sum, v) => sum + (T.AXE[v.impact] || 0), 0);
  s += Math.min(T.SMALL_TARGET_CAP, (m.smallTargets || 0) * T.SMALL_TARGET_EACH);
  s += Math.min(T.NO_ALT_CAP, (m.imagesNoAlt || 0) * T.NO_ALT_EACH);
  return clamp(s);
}

export function deterministic(m, axe) {
  return { spacing: spacing(m), typography: typography(m), color: color(m), components: components(m), copy: copy(m), accessibility: accessibility(m, axe) };
}

// det: deterministic scores, ai: { adjustments: [{ category, adjust, evidence }], originality }.
export function finalize(det, ai = {}) {
  const adj = Object.fromEntries((ai.adjustments || []).map((a) => [a.category, a]));
  const categories = CATS.map(({ k }) => {
    if (k === "originality") return { k, score: clamp(ai.originality ?? 50), evidence: adj.originality?.evidence || "" };
    const a = adj[k] || {};
    const d = Math.max(-T.ADJUST_MAX, Math.min(T.ADJUST_MAX, Math.round(a.adjust || 0)));
    return { k, score: clamp((det[k] || 0) + d), evidence: a.evidence || "" };
  });
  // Overall: mostly the AI's "does this look generated" judgment, the rest from the six measured categories.
  const total = Object.values(WEIGHTS).reduce((x, y) => x + y, 0);
  const rest = categories.reduce((sum, c) => sum + c.score * (WEIGHTS[c.k] || 0), 0) / total;
  const orig = categories.find((c) => c.k === "originality").score;
  const overall = clamp(T.ORIGINALITY_SHARE * orig + (1 - T.ORIGINALITY_SHARE) * rest);
  return { categories, score: overall, label: labelFor(overall) };
}
