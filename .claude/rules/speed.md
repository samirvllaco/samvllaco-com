---
paths:
  - "app/**"
  - "components/**"
  - "lib/**"
  - "public/**"
  - "content/**"
  - "next.config.mjs"
---
# Speed standard: Lighthouse targets, images, JS, first paint, layout, caching

Moved here from CLAUDE.md on 28 Nov 2026, word for word. These rules load by themselves when a matching file is opened.

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
- Intro (owner, 27 Nov 2026, like designme.agency; GSAP version the same day: "smoother and more creative, something that fits my site"): the first page of a session shows a designer's canvas: grid rails and a centre line draw in, Sam's square photo opens, a blue selection frame with handles and a "Sam Vllaco" label draws round it like a picked Figma layer, then the screen splits along the line while the photo flies into the header avatar, so the two read as one (owner, 28 Nov 2026, after estheet.com; the header avatar stays hidden until the intro is gone) (about 1.4s). GSAP (`public/vendor/gsap-3.15.1.min.js`) is loaded by `INTRO_BOOT` in `app/layout.jsx` on that first page only; if it is not in within 650ms the CSS version runs. Skipped on later pages, for reduced motion and without JS. Keep it that short.
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

**Layout shift on scroll (CLS fix, 28 Nov 2026: 28% of real loads had poor layout shift)**
- Scrolling is not an input that excuses a shift, so anything that changes size or place in layout while the page scrolls counts against CLS. Move things with transform, clip-path or background only.
- The footer wall's hairline layer keeps its box; ScreenWall moves only its background and clip.
- The booking calendar starts at the height Cal.com settles at (`.book-cal iframe`: 560px wide, `calc(1930px + 62vw)` below 815px) and only grows until the visitor touches it (`CalFrame.jsx`).
- The header keeps its load height (`--head-h`, set by HeaderScroll) while it collapses into pills on wide screens.
- To measure: a script that scrolls the page with `scrollBy` while a `layout-shift` PerformanceObserver logs entries and their sources (see the 28 Nov 2026 commit "CLS").

**Caching**
- `public/_headers` sets long caching for `/_next/static`, `/fonts`, `/hero`, `/work/*` image folders. New image folders get a rule there too. Never long-cache HTML.
