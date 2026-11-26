# Slop Score calibration

Status (26 Nov 2026): version 2. The owner saw well-made human sites score "Sloppy" (linear.app 62, bolt.new 58) while an AI-built-looking site scored better (cookingbuddy.ai 45). Cause: the measured categories count variety (sizes, grays, radii, buttons), and rich hand-made pages have a lot of it, often from a real product UI in the hero.

Version 2:
- The overall score is 55% the AI's "how generated does this look" judgment (`originality`, anchored in the prompt: 0 to 15 hand-made brand, 60 to 85 AI-builder look) and 45% the six measured categories (`WEIGHTS`).
- Bigger free allowances, smaller steps and a ceiling per signal in `T`. The real AI tells (purple or blue gradient, gradient text, buzzwords, emoji headings) keep their weight.
- The AI may move a measured category by up to 30 points with evidence (was 15), for example when a product UI inflates the counts.
- Reports are cached under `u2:` so rescans use the new scoring.
- Offline check on the stored metrics with an anchored judgment: linear.app 15, bolt.new 18 (both Designed), the sloppy fixture 59.

## How to calibrate once the keys are in

1. Scan 10 sites you'd call well designed (for example stripe.com, linear.app, samvllaco.com) and 10 vibe-coded launches.
2. Look at the per-category `evidence` and `metrics` stored in `reports.metrics`.
3. Goal: designed sites land under 30, typical vibe-coded sites between 50 and 80.
4. If a category scores good sites too high, raise its thresholds in `T` (for example more allowed font sizes or grays). Change one number at a time and re-scan.
5. Write what changed here, with the date.

The AI review moves each category by up to 30 points (`T.ADJUST_MAX`) and its originality judgment is 55% of the score (`T.ORIGINALITY_SHARE`).
