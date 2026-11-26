// Slop Score: one config shared by the tool pages (Next) and the API (Cloudflare Pages Functions).
// Prices come from lib/plans.js. Every scoring threshold is a named number here, so tuning never touches code.
import { SLOP_REPORT_PRICE, WEEK_PRICE } from "../lib/plans.js";

export const SLOP = {
  reportPrice: SLOP_REPORT_PRICE, // full AI report, one-time, paid through a Stripe Payment Link
  sprintPrice: WEEK_PRICE,
  model: "claude-sonnet-5-5", // Anthropic model for the design review
  axeVersion: "4.10.2", // axe-core build injected into the scanned page
  perHour: 2, // scans per IP per hour
  perDay: 2, // scans per IP per day (owner: one or two per person)
  triesPerDay: 6, // scan attempts per IP per day, finished or not
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

// Recalibrated 26 Nov 2026 (owner: "it shows sloppy even on good human-built sites"). The overall score is mostly the
// AI's judgment of how generated the page looks (originality, ORIGINALITY_SHARE); the six measured categories make up
// the rest with these weights. See slopscore/CALIBRATION.md.
export const WEIGHTS = { spacing: 10, typography: 10, color: 12, components: 8, copy: 10, accessibility: 10 };

// Lower is better. Upper bound of each band.
export const LABELS = [[20, "Designed"], [40, "A little sloppy"], [60, "Sloppy"], [80, "Very sloppy"], [100, "Pure slop"]];
export const labelFor = (s) => (LABELS.find(([max]) => s <= max) || LABELS[LABELS.length - 1])[1];

export const BUZZWORDS = ["unlock", "elevate", "seamless", "supercharge", "revolutionize", "empower", "next-level", "game-changer", "all-in-one", "effortless", "cutting-edge", "leverage"];

// Version 2 (26 Nov 2026), tuned on linear.app, bolt.new, samvllaco.com and cookingbuddy.ai: bigger free allowances,
// smaller steps and a ceiling per signal, because rich hand-made pages (product UI in the hero, charts, dark themes)
// naturally have more sizes, grays, radii and buttons. Signals that really mark AI output (purple or blue gradients,
// gradient text, buzzwords, emoji headings) keep their weight.
export const T = {
  TYPE_SIZES_FREE: 10, // up to 10 distinct font sizes cost nothing
  TYPE_SIZE_EACH: 4,
  TYPE_SIZE_CAP: 40,
  FAMILIES_FREE: 2, // up to 2 font families cost nothing
  FAMILY_EACH: 15,
  LINE_HEIGHT_MIN: 1.4, // median body line-height below this looks cramped
  LINE_HEIGHT_PENALTY: 10,
  GRAYS_FREE: 8,
  GRAY_EACH: 4,
  GRAY_CAP: 24,
  ACCENTS_FREE: 4, // accent hue groups
  ACCENT_EACH: 4,
  ACCENT_CAP: 20,
  AI_GRADIENT: 30, // purple, blue or pink gradient in the first screen
  GRADIENT_TEXT: 20, // gradient-filled text anywhere
  GRID_SHARE_OK: 0.75, // share of spacing values on the 4px grid
  GRID_POINT: 1, // per percentage point below that
  SPACING_VALUES_FREE: 28,
  SPACING_EACH: 1,
  SPACING_CAP: 20,
  RADII_FREE: 8,
  RADIUS_EACH: 3,
  RADIUS_CAP: 20,
  SHADOWS_FREE: 8,
  SHADOW_EACH: 3,
  SHADOW_CAP: 20,
  BUTTONS_FREE: 2, // filled buttons in the first screen (a nav sign-up plus a hero action is normal)
  BUTTON_EACH: 6,
  BUTTON_CAP: 24,
  NEST_DEPTH: 3, // cards inside cards inside cards
  NEST_PENALTY: 15,
  BUZZ_EACH: 10,
  BUZZ_CAP: 50,
  EMOJI_EACH: 10,
  EMOJI_CAP: 30,
  AXE: { critical: 10, serious: 6, moderate: 3, minor: 1 }, // per rule violated, not per element
  SMALL_TARGET_EACH: 1,
  SMALL_TARGET_CAP: 20,
  NO_ALT_EACH: 2,
  NO_ALT_CAP: 20,
  ADJUST_MAX: 30, // how far the AI review may move a measured category, with evidence
  ORIGINALITY_SHARE: 0.55, // share of the overall score that is the AI's "does this look generated" judgment
  EAA_NUDGE: 50, // show the EAA link from this accessibility score up
};
