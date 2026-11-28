# CLAUDE.md (samvllaco.com)

Read DESIGN.md before any UI work.

## Where the rules are (split on 28 Nov 2026 so small jobs do not load every design rule)
The detailed rules live in `.claude/rules/`. Each file loads by itself when you open a file it covers (`app/`, `components/`, `lib/`, `public/`, `content/`). Before any change to a page, a component, copy, prices or styles, make sure you have read all five; if they did not load, open them yourself:
- `.claude/rules/speed.md`: Speed standard: Lighthouse targets, images, JS, first paint, layout, caching.
- `.claude/rules/design-system.md`: One theme, type and spacing, layout check, feel consistency, buttons.
- `.claude/rules/offer-and-slop-score.md`: Offer and prices, Slop Score, Ask Sam's AI, the offer ladder.
- `.claude/rules/pages-2026-11-27.md`: Owner decisions of 27 Nov 2026: hero, services menu, industries, articles, home, about, work, reviews.
- `.claude/rules/pages-2026-11-28.md`: Owner decisions of 28 Nov 2026: footers, menus, articles, case studies, Slop Score page, white bands.

New owner rules go into the matching file in `.claude/rules/` (with the date), not into this file. Keep this file short.

## Always
- Every page stays at PageSpeed 95 to 100 (Performance 95+, Accessibility 100, Best Practices 100, SEO 100). How to check and the rules: `.claude/rules/speed.md`.
- Sam speaks as I, me and my, never we, our or us.
- Publish small updates as soon as each one is checked; do not batch.
- `scripts/tasks/` holds scripts for the scheduled tasks. They are not part of the site; a run that only uses them does not need the design rules.

## SEO (owner, 13 Nov 2026)
- Google Search Console is verified with the meta tag in `app/layout.jsx` (`verification.google`); do not remove it. Sitemap is submitted there.
- After a deploy that adds or renames pages, run `sh scripts/indexnow.sh` to tell Bing. The key file is `public/<key>.txt`; do not delete it.
- Share images: `node scripts/og.cjs` (with `npx serve out -l 4173` running) rebuilds `public/og/*.jpg`. New case studies need it.

## Git
- Commit messages are plain: no Co-Authored-By, Claude-Session or other trailers (owner, 13 Nov 2026).
