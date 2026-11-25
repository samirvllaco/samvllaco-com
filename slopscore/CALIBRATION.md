# Slop Score calibration

Status (25 Nov 2026): the thresholds in `config.js` (`T`, `WEIGHTS`, `LABELS`) are still the starting values from the spec. They have not been tuned on real sites yet. That needs the live keys (Browser Rendering, Anthropic), because this container can't reach outside sites.

## How to calibrate once the keys are in

1. Scan 10 sites you'd call well designed (for example stripe.com, linear.app, samvllaco.com) and 10 vibe-coded launches.
2. Look at the per-category `evidence` and `metrics` stored in `reports.metrics`.
3. Goal: designed sites land under 30, typical vibe-coded sites between 50 and 80.
4. If a category scores good sites too high, raise its thresholds in `T` (for example more allowed font sizes or grays). Change one number at a time and re-scan.
5. Write what changed here, with the date.

The AI review can only move each category by 15 points (`finalize` in `src/scoring.js`), so the measured checks decide most of the score.
