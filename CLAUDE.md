# CLAUDE.md (samvllaco.com)

Read DESIGN.md before any UI work. This file holds the speed rules.

## Speed standard: every page stays at 95 to 100

Target on PageSpeed Insights, mobile and desktop, for every page:
Performance 95+, Accessibility 100, Best Practices 100, SEO 100.
Every new section, component or page must keep this. Check it before calling a change done.

### How to check

1. `npm run build`, then `npx serve out -l 4173`.
2. Run Lighthouse on each page you touched, mobile and desktop:
   `lighthouse http://localhost:4173/<page>/ --form-factor=mobile` (add `--preset=desktop` for desktop).
   The container CPU is slower than PageSpeed, so local mobile scores read 10 to 25 points lower. Compare before and after your change, and fix any drop.
3. Accessibility, Best Practices and SEO must be 100 locally. No exceptions.

### Rules

**Images**
- WebP for every image on the page. JPG only for social share (og) images.
- Size to the display: no more than 2x the largest rendered width. Quality 75 to 80.
- Always set `width` and `height`. `loading="lazy"` below the fold.
- The largest image above the fold (the LCP image) is `loading="eager"` with `fetchPriority="high"`, or preloaded with `preload()` from `react-dom`.
- When an image file changes, bump its `?v=` number.

**JavaScript**
- Keep the home page own JS near 10 kB. Check the build output (`○ /  … First Load JS`).
- Anything decorative or below the fold that needs heavy code or data (maps, canvas, big JSON, libraries) loads lazily: `next/dynamic` with `ssr: false`, mounted when it nears the viewport (see `GlobeLazy.jsx`).
- Floating extras (popups, bubbles, easter eggs, smooth scroll) go in `LazyExtras.jsx`, never directly in the layout.
- Links use `prefetch={false}`.
- No new npm package for something a few lines of code can do.

**First paint**
- The first screen paints complete: no entrance fade or slide on above-the-fold content, and nothing above the fold changes size or position after first paint (inline icons keep their space from frame one). Motion above the fold is limited to opacity/transform pops that do not move other elements.
- Speed Index can never be lower than First Contentful Paint. On PageSpeed mobile (slow 4G emulation) FCP is about 1.5 to 2 s even for a tiny page, so mobile Speed Index under 1 s is not reachable; aim for Speed Index within 1 s of FCP on mobile and under 1.2 s on desktop.
- Anything that appears later (popups, widgets) shows after the first scroll, so it never becomes the LCP.
- Server-render the same first frame the client will show. No layout jump on hydration.
- Ambient motion (CSS loops, cycling icons, rotating badges, marquees, drifts) holds still until the first interaction. `html.is-live` is set by `HeaderScroll` on the first pointer, key, wheel, touch or scroll; CSS animations are paused until then, and JS loops check for `is-live` before ticking.
- No timers that read layout (`getBoundingClientRect`, `offsetWidth`) on an interval. Read layout only on scroll or resize, inside `requestAnimationFrame`.
- The page background on first paint must equal the first `data-bg` section color. No background fade on load.
- Fonts are self-hosted in `public/fonts` with `font-display: swap`. No Google Fonts links.
- CSS stays in its own cached file. Do not turn on `experimental.inlineCss`: it was tested and was slower.

**Layout and accessibility**
- No layout shift: reserve space for images, iframes and anything injected later.
- Text that is visible must keep 4.5:1 contrast at all times, including during animations. Animate text in and out with `transform` inside a clipping box, not with opacity.
- Accessible names must contain the visible text. Prefer visible text plus `sr-only` extras over `aria-label`.
- Touch targets at least 24px, 44px for main controls.

**Caching**
- `public/_headers` sets long caching for `/_next/static`, `/fonts`, `/hero`, `/work/*` image folders. New image folders get a rule there too. Never long-cache HTML.

## One theme (owner, 22 Nov 2026; replaces "Both themes")
The light/dark switch is gone. The site is one look: dark.
- A light panel is a section with the `lite` class (tokens swapped at the end of `app/globals.css`). Use tokens inside it; do not use `hero2-btn-light` inside a `lite` panel.
- Old `:root[data-theme="light"]` rules are dead code; do not add new ones.
- Before calling a change done: `npm run build`, `npx serve out -l 4173`, then
  `NODE_PATH=$(npm root -g) node scripts/contrast.cjs` (all pages) or `... scripts/contrast.cjs /page/ /other/`. It must end with 0 failures.

## Offer (owner, 22 Nov 2026)
This site is the main portfolio, as before (the design-subscription home page was rolled back the same day; it may move to its own domain). Pricing keeps two plans: weekly sprint $1,000, monthly $3,000 (`lib/plans.js` is the one source). No hourly rate. No refund terms are published until the owner sets them.
Accessibility and Slop Score offers (owner, 25 Nov 2026): EAA audit $1,500 (5 working days) on `/eaa-audit/`, managed accessibility from $3,000 a month on `/accessibility/`, full Slop Score report $9. Also set in `lib/plans.js`. True claims the owner confirmed for these pages: screen reader testing with VoiceOver and NVDA, web, iOS and Android, designs compliance software, and can code front-end fixes himself.

## Type and spacing system (owner, 15 Nov 2026, locked)
Tokens and role rules are the last block of `app/globals.css` ("Type and spacing system"). Use them; never set a one-off heading size.
- Spacing: 4px base, only 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128. Sections use `--space-section` (64px on phones, 128px at 1440), gutters `--gutter` (16 to 40px). Intro blocks (eyebrow, title, lede) 12px apart; card grids 20px.
- Widths: content 1200px (`--max`), prose 760px (`--prose`), hero headline 800px.
- Type roles: display h1 56/60, section title h2 42/48, panel headline 28/36, subhead 24/32, card title 20/28, lede 18/28. Tracking -0.027em on display and titles. No heading heavier than 600.
- One ink, one accent; secondary text is the ink at lower opacity or `--muted`.

## Buttons (owner, 13 Nov 2026, locked)
- Only the two button classes in DESIGN.md (Buttons), with the hover and state rules defined there. Check every new or moved button on hover before calling a change done.
- Buttons side by side are the same width (owner, 14 Nov 2026). Put them alone in one row container: the global rule in `globals.css` sizes every button in a row of only `hero2-btn` buttons to the widest one, and stacks them full width on phones.

## SEO (owner, 13 Nov 2026)
- Google Search Console is verified with the meta tag in `app/layout.jsx` (`verification.google`); do not remove it. Sitemap is submitted there.
- After a deploy that adds or renames pages, run `sh scripts/indexnow.sh` to tell Bing. The key file is `public/<key>.txt`; do not delete it.
- Share images: `node scripts/og.cjs` (with `npx serve out -l 4173` running) rebuilds `public/og/*.jpg`. New case studies need it.

## Git
- Commit messages are plain: no Co-Authored-By, Claude-Session or other trailers (owner, 13 Nov 2026).
