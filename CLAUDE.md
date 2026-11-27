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
- Intro (owner, 27 Nov 2026, like designme.agency): the first page of a session shows Sam's mark for .8 to 1.4s, then fades. It is in the HTML with its own inline boot (`INTRO_BOOT` in `app/layout.jsx`), skipped on later pages, for reduced motion and without JS. It costs a little Speed Index on mobile; keep it that short.
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
The light/dark switch is gone. The site is one look: dark, with white bands (owner, 27 Nov 2026, like grafit.agency): a section with `band-light` paints white edge to edge and swaps the tokens inside it (home: How I work, Fixes, FAQ), including a light `--socket` under the 3D buttons. While a white band sits under the bottom of the screen, `html.on-light` (WidgetLoops) turns the floating Ask pill, book bubble and back-to-top light. Hard-coded dark card colours inside a band need a light override in the "White bands" block of `app/globals.css`.
- A light panel is a section with the `lite` class (tokens swapped at the end of `app/globals.css`). Use tokens inside it; do not use `hero2-btn-light` inside a `lite` panel.
- Old `:root[data-theme="light"]` rules are dead code; do not add new ones.
- Before calling a change done: `npm run build`, `npx serve out -l 4173`, then
  `NODE_PATH=$(npm root -g) node scripts/contrast.cjs` (all pages) or `... scripts/contrast.cjs /page/ /other/`. It must end with 0 failures.

## Offer (owner, 22 Nov 2026)
This site is the main portfolio, as before (the design-subscription home page was rolled back the same day; it may move to its own domain). Pricing keeps two plans: weekly sprint $1,000, monthly $3,000 (`lib/plans.js` is the one source). No hourly rate. No refund terms are published until the owner sets them.
Accessibility and Slop Score offers (owner, 25 Nov 2026): EAA audit $1,500 (5 working days) on `/eaa-audit/`, managed accessibility from $3,000 a month on `/accessibility/`, full Slop Score report $5 (owner, 25 Nov 2026; was $9), paid through a Stripe Payment Link on his Sam Vllaco Stripe account (never the Ocufuse one). Also set in `lib/plans.js`. True claims the owner confirmed for these pages: screen reader testing with VoiceOver and NVDA, web, iOS and Android, designs compliance software, and can code front-end fixes himself.

## Slop Score, Ask Sam's AI and the offer ladder (owner, 25 Nov 2026)
- The offer ladder is `LADDER` in `lib/plans.js` (shown on /pricing/). Prices stay in `lib/plans.js` only.
- Slop Score (/slop-score/) and the "Ask Sam's AI" chat run on Pages Functions bundled from `slopscore/` into `functions/_slop/api.js`. The chat answers only from facts built out of `lib/` (plans, services, work, FAQ). After changing prices, services, work or FAQ, run `node slopscore/build.mjs` and commit the bundle, or the chat keeps the old facts. Tests: `node --test slopscore/test/*.test.js`.
- Both stay off until the Cloudflare keys and bindings are set (see `slopscore/src/api.js` header). The chat pill only shows when `/api/ask/status` says ready.
- Limits and spend (owner, 25 Nov 2026: "don't want to pay anything extra"): 2 finished scans per person a day (6 tries), 20 chat messages per person a day; `slopscore/src/budget.js` books every Anthropic call in D1 and stops at $180 total and $7 a day of the $200 free credit (no card on file). Never raise these without the owner.
- Paid unlock (owner, 25 Nov 2026): free = score, 7 category bands and the top 3 fixes; the rest is blurred behind the $5 unlock. `STRIPE_REPORT_LINK` (Payment Link, success URL `https://samvllaco.com/slop-score/r/?paid=1`) carries the report id as `client_reference_id`; the `checkout.session.completed` webhook at `/api/slop-score/stripe-webhook` (`STRIPE_WEBHOOK_SECRET`) unlocks the report and emails the full report. No Stripe secret key on the site.
- Email flow (owner, 25 Nov 2026; amended the same day): a free email sends the score and top 3 fixes (it no longer unlocks the report); the report email goes out at once and, with the opt-in box ticked, 3 follow-ups (book day 2, $49/$99 review day 5, sprint day 9) with one-click unsubscribe (`slopscore/src/mail.js`). Sending needs the `RESEND_API_KEY` secret (Resend free plan, capped at 90 a day in code); with `BREVO_API_KEY` (Brevo free plan on its own account, capped at 280 a day) Brevo sends when Resend is full or down (owner, 27 Nov 2026); Pages has no cron, so due emails go out on site traffic every 10 minutes at most. Owner test calls: `Authorization: Bearer <ADMIN_TOKEN>` skips the captcha and visitor limits.
- The chat facts (`facts()` in `slopscore/src/ask.js`) are built from the whole site at bundle time: plans, ladder, services, work and deep case studies, process, real reviews (`lib/testimonials.js`), free tools, articles and FAQs; cached for an hour. New site data a visitor might ask about goes in there too.
- App errors return 4xx: Cloudflare replaces a 5xx body from a Function with its own "error code" page.
- Pages Functions cannot bind Browser Rendering, so page renders run in a separate Worker, `samvllaco-scanner` (`scanner/`, deployed by Workers Builds from this repo), reached through the Pages service binding `SCANNER`. `node slopscore/build.mjs` rebuilds both `functions/_slop/api.js` and `scanner/worker.js`; commit both.

## Type and spacing system (owner, 15 Nov 2026, locked)
Tokens and role rules are the last block of `app/globals.css` ("Type and spacing system"). Use them; never set a one-off heading size.
- Spacing: 4px base, only 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128. Sections use `--space-section` (56px on phones, 96px at 1440; owner, 27 Nov 2026: "more compact", was 64 to 128), gutters `--gutter` (16 to 40px). Intro blocks (eyebrow, title, lede) 12px apart; card grids 20px.
- Widths: content 1280px (`--max`; was 1200 until 26 Nov 2026), prose 760px (`--prose`), hero headline 920px.
- Type roles: display h1 56/60, section title h2 40/48, panel headline 28/36, all three at weight 500 (owner, 27 Nov 2026: "thinner titles and more compact"; were 64/68 and 48/56 at 600), subhead 24/32, card title 20/28, lede 18/28. Tracking -0.03em on display, -0.025em on titles. Nothing on the site heavier than 600.
- One ink, one accent; secondary text is the ink at lower opacity or `--muted`.

## Layout check (owner, 26 Nov 2026: "do full layout check, make sure we follow it strictly")
Inside every section: 12px between eyebrow, title and lede (`--gap-intro`); 40px from the intro to the content, between content groups and from the content to its button (`--gap-content`, 32px on phones; 48 until 27 Nov 2026); 20px between cards and between a card grid and its chips or filters (`--gap-grid`); card padding on the spacing scale (24 for cards, 32 for big panels). Sections sit `--space-section` apart; where sections have padding and a hairline divider, the line sits halfway. Every panel, grid and card row spans the 1280px content box or starts at its left edge; only text, product shots and mockups are centered narrower. The rules live in the last blocks of `app/globals.css` ("Layout system, strict").
Before calling a layout change done, with `npx serve out -l 4173` running: `NODE_PATH=$(npm root -g) node scripts/layout.cjs` (all pages) or `... scripts/layout.cjs /page/`. It must end with 0 layout problems.

## Feel consistency (owner, 26 Nov 2026: "i want the feel, consistency", not a copy of another site)
One value per job, kept in the last block of `app/globals.css` ("Feel consistency"):
- Bento (owner, 27 Nov 2026, after his Figma widget prototypes): bento cards are glossy widgets at `--r-bento` 16 (lit top, darker foot, inner rim); each stat card runs one loop that says what its number means (owner, 27 Nov 2026: "be smart about content and animation"): 10 years plays the eras Web, Mobile, SaaS, AI along a rail; 573 clients shows the five client regions' flags orbiting Sam with a ping; 10,000+ screens builds a screen block by block and files it onto a pile, paused off screen by `WidgetLoops.jsx` and until the first interaction. Last block of `app/globals.css` ("Bento widgets").
- Radius (owner, 27 Nov 2026: "reduce round corners everywhere, no round buttons", then "less round all"): `--r-card` 8 for cards and panels, `--r-inner` 6 for boxes inside cards, icon tiles and media, `--r-sm` 4 for small parts, breadcrumbs and every button, `--r-bento` 10; chips and circles stay round, buttons never pill. Never a one-off radius. Highlights (`==text==` in FAQs) are a flat gray box over the whole word at `--r-sm`, no half-height marker.
- Surfaces: one page color #171719 (owner, 27 Nov 2026: softer dark, was #000/#0b0b0c/#111112), cards lift above it in three tones (#1c1c1f, #232326, #2c2c2f) and one glass (rgba(28,28,30,.86)) for floating bars. The footer photo stage keeps its near-black (#07070b) because the photo is shot on it. Lines: 8% white for card edges, 12% for dividers, 20% strong.
- Motion: `--ease-out` for everything, `--spring` (one bounce) for pops and presses, durations .15 / .25 / .35 / .5s. Ambient loops stay linear. The scroll reveal keeps its own timing (owner: "keep our scroll animation").
- Smooth scroll: Locomotive Scroll (Lenis inside) on mouse and trackpad only, lerp .2 so the glide is almost unnoticeable (owner, 27 Nov 2026: removed on 26 Nov, back the next day "super subtle"). Keep per-frame paint cheap: no stacks of full-width backdrop blurs on fixed elements (the bottom edge blur is one layer).
- Structure lines (owner, 26 Nov 2026: "use strokes all the way until the end to show structure"): two 12% rails 24px outside the content box run from the top of the page to the end of the footer (1024px and up), and a divider crosses halfway between every two sections, the footer top and the line under the site map included. Dividers run the full width of the screen, edge to edge (owner, 27 Nov 2026). Last block of `app/globals.css` ("Structure lines"). A new section gets its divider automatically when it follows another section; a painted panel or band (`lite`, `book-band`, closing panels) does not.

## Buttons (owner, 13 Nov 2026, locked)
- Only the two button classes in DESIGN.md (Buttons), with the hover and state rules defined there. Hover (owner, 27 Nov 2026, after grafit.agency): the button does not rise; a darker layer wipes in from the left and the icon slides out right and back in from the left (last block of `app/globals.css`, "Button hover wipe"). Check every new or moved button on hover before calling a change done.
- Buttons follow the alignment of the text above them: centered under centered text (owner, 25 Nov 2026; DESIGN.md Buttons). Run `NODE_PATH=$(npm root -g) node scripts/btn-align.cjs` after touching buttons or layout; it must list no rows.
- Buttons side by side are the same width (owner, 14 Nov 2026). Put them alone in one row container: the global rule in `globals.css` sizes every button in a row of only `hero2-btn` buttons to the widest one, and stacks them full width on phones.

## SEO (owner, 13 Nov 2026)
- Google Search Console is verified with the meta tag in `app/layout.jsx` (`verification.google`); do not remove it. Sitemap is submitted there.
- After a deploy that adds or renames pages, run `sh scripts/indexnow.sh` to tell Bing. The key file is `public/<key>.txt`; do not delete it.
- Share images: `node scripts/og.cjs` (with `npx serve out -l 4173` running) rebuilds `public/og/*.jpg`. New case studies need it.

## Git
- Commit messages are plain: no Co-Authored-By, Claude-Session or other trailers (owner, 13 Nov 2026).
