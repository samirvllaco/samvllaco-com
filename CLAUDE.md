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
- Never hide the main headline, intro text or LCP image with `opacity: 0` or a delayed entrance animation. Above-the-fold entrance motion stays at 0.5s or less with delays of 0.12s or less.
- Anything that appears later (popups, widgets) shows after the first scroll, so it never becomes the LCP.
- Server-render the same first frame the client will show. No layout jump on hydration.
- Continuous motion near the top (drifts, carousels) starts after the first interaction or 5 seconds.
- Fonts are self-hosted in `public/fonts` with `font-display: swap`. No Google Fonts links.
- CSS stays in its own cached file. Do not turn on `experimental.inlineCss`: it was tested and was slower.

**Layout and accessibility**
- No layout shift: reserve space for images, iframes and anything injected later.
- Text that is visible must keep 4.5:1 contrast at all times, including during animations. Animate text in and out with `transform` inside a clipping box, not with opacity.
- Accessible names must contain the visible text. Prefer visible text plus `sr-only` extras over `aria-label`.
- Touch targets at least 24px, 44px for main controls.

**Caching**
- `public/_headers` sets long caching for `/_next/static`, `/fonts`, `/hero`, `/work/*` image folders. New image folders get a rule there too. Never long-cache HTML.
