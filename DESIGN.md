# DESIGN.md (samvllaco.com)

Read this before any UI work on the site. If a request would break a rule here, say so and ask before doing it.

## Buttons

Two button styles only. Both are fully rounded pills with the raised "key" look.

- **Primary:** `hero2-btn hero2-btn-primary`. Blue key, white text. One per screen.
- **Secondary:** `hero2-btn hero2-btn-light`. Graphite key with white text in dark mode, paper key with dark text in light mode. Optional leading icon.

Do not use `btn-ghost` (blue text on graphite) for page actions. It is not the secondary button.
Two buttons side by side are the same width.

**Hover and states (locked, 13 Nov 2026).** A button looks and behaves the same everywhere: in the header, mega menu, cards, footer and popups.
- Hover: the key lifts slightly brighter (`filter: brightness(1.08)`), same color family. Never a flat grey or `--hl` fill.
- Press: the key sinks (`translateY` 1 to 2px) and the ledge shrinks.
- Focus: 3px blue ring, offset 2px.
- Container link styles (`.head-nav a`, `.mega li a`, `.foot-map a`, `.socials a`) must exclude buttons with `:not(.hero2-btn)`. When adding any new link style for a container, add that exclusion.
- Never use `btn btn-primary` or `btn-ghost` in new markup. Use the two classes above.

## Icons (locked, 14 Nov 2026)

One icon style everywhere: a line glyph (24 grid, 1.8 to 2 stroke, round caps) on the graphite 3D tile used in the Services and Resources menus (radial graphite gradient, top highlight, soft drop shadow, corners about 30% of the size). Sizes 28, 32, 36, 44 px.
- The tile never changes. The glyph color may: white by default, the book orange on the ebook page.
- Classes: `tg-ico` (any size), `pain-ico` (44px cards), `.eb-ico` lists (32px). No outlined colored boxes, emoji or filled colored squares as icon boxes.

## Type and copy

- Body paragraphs are at least 17px (1.0625rem), line height 1.6. Ledes under section titles 17 to 19px. Small grey text only for labels and notes.

- Sans-serif for all titles and body text. No em dashes in copy.
- Script accent (Caveat, class `scr`): only for 2 to 5 words inside a paragraph to direct attention, at most one per paragraph and a few per page. Never in titles, buttons or navigation. Self-hosted in `public/fonts`.
- Titles use the two-tone pattern: first part white, second part gray (`.t2`).

## Surfaces

- No visible strokes on cards. Separate with a slightly lighter or darker gray.
- Soft shadows only. No shadow on hover.
- Images and screens follow the theme: dark frames in dark mode, light frames in light mode.

## Client avatars

- Component: `components/ClientAvatars.jsx`. Data: `lib/clients.js` (names, projects, photos in one file).
- An overlapping stack of 40px circles with a 2px ring in the page background, each overlapping the last by 10px. Up to 5 shown.
- A face appears only for an entry with `verified: true` and a real photo in `public/clients/`. Unverified entries are placeholders and never render.
- With no verified entries the hero shows four neutral person icons. Pass `facesOnly` to render nothing instead.
- Never use generated or stock faces as clients. Do not show a name, project or quote that the client has not agreed to.
- Used in: hero trust row (`.hero-trust`). Add to the book page and reviews with `<ClientAvatars facesOnly />` once entries are verified.

### Illustrative avatars (not clients)

- `PeopleStack` in `components/ClientAvatars.jsx`, photos listed in `ILLUSTRATIVE` in `lib/clients.js`, files in `public/people/`.
- Decorative only: no names, no projects, no quotes.
- Never place it in the hero trust row or beside "Trusted by", star ratings, review counts, client counts, logos or testimonials. Those use `ClientAvatars` with verified entries only.
- Used in: book page, "Is this for you?" section, as a picture of the audience.

## Motion and UX principles

Every interaction on the site follows these 20 rules. Tokens live in `app/globals.css` (`--t-instant` 90ms, `--t-fast` 150ms, `--t-base` 250ms, `--t-slow` 450ms, `--ease-out`, `--spring`, `--ease-wind`, `--ease-snap`). All movement sits behind `prefers-reduced-motion: no-preference` and hover effects behind `(hover: hover)`. Use the individual `translate`, `scale` and `rotate` properties so motion never fights an existing `transform`.

### Animation principles

1. **Squash and stretch.** Pressed keys squash (`scale: .96 .92`) in 90ms and spring back.
2. **Anticipation wind-up.** Icons use `--ease-wind`: a small pull back, then the move.
3. **Staging the focus.** Hovering one card, nav link or step dims its neighbours to 50 to 60 percent.
4. **Pose to pose.** Define the rest pose and the hover pose only. Let the easing do the in-between.
5. **Follow through.** Release and reveal use `--spring`, so things pass the rest point slightly and settle.
6. **Slow in and slow out.** No linear easing. Entering uses `--ease-out`, leaving uses `--ease-in`.
7. **Moving in arcs.** Arrows and icons move on a curve: x and y get different easings.
8. **Secondary action.** One small supporting movement per interaction (price tag nudge, icon rotate).
9. **Snappy timing.** UI feedback is 90 to 250ms. Only reveals and hero moments go longer.
10. **Exaggerated feedback.** Press is clearly visible, never subtle.
11. **Solid drawing in 3D.** Keep one light direction. Hover is a straight lift, with no shadow change.
12. **Overall appeal.** One personality: soft, springy, calm. No bounce on text blocks.

### UX principles

13. **Fitts's law.** Primary actions are big and near the thumb or cursor path.
14. **Bigger hit areas.** Every control is at least 44 by 44px, even when the icon is smaller.
15. **Hick's law.** Few choices at once: six nav items, one primary button per screen.
16. **Miller's law.** Group lists in chunks of seven or fewer (the 27 steps sit in four groups).
17. **Doherty threshold.** Respond within 400ms. Pressed state is immediate; no 300ms tap delay (`touch-action: manipulation`).
18. **Postel's law.** Be liberal in what inputs accept (spaces, case, pasted links), strict in what is shown.
19. **Jakob's law.** Use patterns people know: logo left, primary action right, underlined links.
20. **Frequency of use.** The more often a control is used, the quieter and faster it is (nav 150ms). Rare moments (book offer, reveals) can be richer.
