// Slop Score: one config shared by the tool pages (Next) and the API (Cloudflare Pages Functions).
// Prices come from lib/plans.js. Every scoring threshold is a named number here, so tuning never touches code.
import { SLOP_REPORT_PRICE, WEEK_PRICE } from "../lib/plans.js";

export const SLOP = {
  reportPrice: SLOP_REPORT_PRICE, // full AI report, one-time, sold on Whop
  sprintPrice: WEEK_PRICE,
  model: "claude-sonnet-5-5", // Anthropic model for the design review
  axeVersion: "4.10.2", // axe-core build injected into the scanned page
  perHour: 2, // scans per IP per hour
  perDay: 2, // scans per IP per day (owner: one or two per person)
  dailyCap: 100, // scans per day for the whole tool; the $ guard in src/budget.js sits on top
  cacheHours: 24, // same URL inside this window returns the last report
  budgetMs: 45000, // whole browser step, hard stop
  gotoMs: 20000, // page load timeout
  idleMs: 5000, // wait for network idle, at most
  freeIssues: 3, // issues shown before unlock
};

// Order here is the order on the result page (worst first is sorted at render time).
export const CATS = [
  { k: "spacing", name: "Spacing and layout", d: "Does spacing follow a scale, or is every gap a new number?" },
  { k: "typography", name: "Typography", d: "A few clear sizes and fonts, or a different size on every line?" },
  { k: "color", name: "Color", d: "Restrained color with one accent, or gradients and grays everywhere?" },
  { k: "components", name: "Components", d: "One clear main button per view, no cards inside cards." },
  { k: "copy", name: "Copy", d: "Specific words about the product, not unlock, elevate and seamless." },
  { k: "accessibility", name: "Accessibility", d: "Contrast, labels, alt text and touch targets people can use." },
  { k: "originality", name: "Originality", d: "A visual idea that belongs to this brand, not a template." },
];

export const WEIGHTS = { spacing: 15, typography: 15, color: 15, components: 15, copy: 10, accessibility: 15, originality: 15 };

// Lower is better. Upper bound of each band.
export const LABELS = [[20, "Designed"], [40, "A little sloppy"], [60, "Sloppy"], [80, "Very sloppy"], [100, "Pure slop"]];
export const labelFor = (s) => (LABELS.find(([max]) => s <= max) || LABELS[LABELS.length - 1])[1];

export const BUZZWORDS = ["unlock", "elevate", "seamless", "supercharge", "revolutionize", "empower", "next-level", "game-changer", "all-in-one", "effortless", "cutting-edge", "leverage"];

// Starting values from the spec. Calibration notes: see slopscore/CALIBRATION.md.
export const T = {
  TYPE_SIZES_FREE: 6, // up to 6 distinct font sizes cost nothing
  TYPE_SIZE_EACH: 8, // each size beyond that
  FAMILIES_FREE: 2, // up to 2 font families cost nothing
  FAMILY_EACH: 20, // each family beyond that
  LINE_HEIGHT_MIN: 1.4, // median body line-height below this looks cramped
  LINE_HEIGHT_PENALTY: 15,
  GRAYS_FREE: 5, // up to 5 distinct grays cost nothing
  GRAY_EACH: 8,
  ACCENTS_FREE: 2, // up to 2 accent hue groups cost nothing
  ACCENT_EACH: 15,
  AI_GRADIENT: 25, // purple, blue or pink gradient in the first screen
  GRADIENT_TEXT: 20, // gradient-filled text anywhere
  GRID_SHARE_OK: 0.9, // 90% of spacing values on the 4px grid is fine
  GRID_POINT: 2, // per percentage point below that
  SPACING_VALUES_FREE: 12,
  SPACING_EACH: 3,
  RADII_FREE: 3,
  RADIUS_EACH: 10,
  SHADOWS_FREE: 3,
  SHADOW_EACH: 10,
  BUTTONS_FREE: 1, // filled buttons in the first screen
  BUTTON_EACH: 25,
  NEST_DEPTH: 2, // cards inside cards from this depth
  NEST_PENALTY: 30,
  BUZZ_EACH: 6,
  BUZZ_CAP: 60,
  EMOJI_EACH: 10,
  EMOJI_CAP: 30,
  AXE: { critical: 12, serious: 8, moderate: 4, minor: 1 }, // per rule violated, not per element
  SMALL_TARGET_EACH: 2,
  SMALL_TARGET_CAP: 30,
  NO_ALT_EACH: 2,
  NO_ALT_CAP: 20,
  EAA_NUDGE: 50, // show the EAA link from this accessibility score up
};
