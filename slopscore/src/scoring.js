// Deterministic Slop Score categories from measured page metrics and axe results. Pure functions, unit tested.
import { T, WEIGHTS, CATS, labelFor } from "../config.js";

const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));
const over = (n, free) => Math.max(0, (n || 0) - free);

export function typography(m) {
  let s = over(m.fontSizes, T.TYPE_SIZES_FREE) * T.TYPE_SIZE_EACH;
  s += over(m.fontFamilies, T.FAMILIES_FREE) * T.FAMILY_EACH;
  if (m.bodyLineHeight && m.bodyLineHeight < T.LINE_HEIGHT_MIN) s += T.LINE_HEIGHT_PENALTY;
  return clamp(s);
}

export function color(m) {
  let s = over(m.grays, T.GRAYS_FREE) * T.GRAY_EACH;
  s += over(m.accentHues, T.ACCENTS_FREE) * T.ACCENT_EACH;
  if (m.aiGradient) s += T.AI_GRADIENT;
  if (m.gradientText) s += T.GRADIENT_TEXT;
  return clamp(s);
}

export function spacing(m) {
  let s = 0;
  const share = m.gridShare ?? 1;
  if (share < T.GRID_SHARE_OK) s += Math.round((T.GRID_SHARE_OK - share) * 100) * T.GRID_POINT;
  s += over(m.spacingValues, T.SPACING_VALUES_FREE) * T.SPACING_EACH;
  s += over(m.radii, T.RADII_FREE) * T.RADIUS_EACH;
  s += over(m.shadows, T.SHADOWS_FREE) * T.SHADOW_EACH;
  return clamp(s);
}

export function components(m) {
  let s = over(m.filledButtons, T.BUTTONS_FREE) * T.BUTTON_EACH;
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
    const d = Math.max(-15, Math.min(15, Math.round(a.adjust || 0)));
    return { k, score: clamp((det[k] || 0) + d), evidence: a.evidence || "" };
  });
  const total = Object.values(WEIGHTS).reduce((x, y) => x + y, 0);
  const overall = clamp(categories.reduce((sum, c) => sum + c.score * (WEIGHTS[c.k] || 0), 0) / total);
  return { categories, score: overall, label: labelFor(overall) };
}
