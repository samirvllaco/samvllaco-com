# DESIGN.md (samvllaco.com)

Read this before any UI work on the site. If a request would break a rule here, say so and ask before doing it.

## Buttons

Two button styles only. Both are fully rounded pills with the raised "key" look.

- **Primary:** `hero2-btn hero2-btn-primary`. Blue key, white text. One per screen.
- **Secondary:** `hero2-btn hero2-btn-light`. Graphite key with white text in dark mode, paper key with dark text in light mode. Optional leading icon.

Do not use `btn-ghost` (blue text on graphite) for page actions. It is not the secondary button.
Two buttons side by side are the same width.

## Type and copy

- Sans-serif only. No em dashes in copy.
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
