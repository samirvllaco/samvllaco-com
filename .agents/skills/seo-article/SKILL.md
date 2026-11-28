---
name: seo-article
description: Use when adding a new article to samvllaco.com/writing/ or retitling one for a search query. Covers picking the query, writing to the site's voice, the five files every article touches, the cover and share image, internal links, and the checks that must pass before it ships.
---

# Add an SEO article to samvllaco.com

Written 28 Nov 2026 from how the existing 27 articles are built. CLAUDE.md and DESIGN.md still win if anything here disagrees.

## 1. Pick the query first

- One article, one search. The articles that reach page one fastest name one tool and one complaint: "v0 app looks generic" (1st), "bolt app design looks bad" (2nd), "cursor ui looks generic" (2nd a day after its retitle).
- Check demand with Google autocomplete: `https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=<seed>`. A phrase that autocompletes has searches behind it.
- Read page one with personalisation off (`&pws=0&gl=us&hl=en`), one search per target. Go after it when page one is Reddit threads, marketplaces, galleries or thin posts. Never page through `site:` results: it inflates Search Console impressions at fake positions.
- Check no existing article already targets it (`lib/articles.js`), so two pages never compete.

## 2. Write it

- Voice: I, me, my. Never we. No em dashes. Plain words, short sentences.
- Open with an italic lede (`_..._`) that answers the query in two sentences.
- The answer comes first, then the how. Headings that match how people search ("How much does a Lovable designer cost?").
- Copy-paste prompts and files go in fenced code blocks; name the one tool each prompt is for and give exact values.
- End with `## Questions people ask` (3 to 5 `###` questions) and `## Where to go next` (one line of proof, "I've designed more than 10,000 screens since 2013", then 2 or 3 links: an article, the book or a tool, and a service page).
- The markdown reader (`lib/md.js`) supports `##`, `###`, paragraphs, `- ` and `1. ` lists, quotes, fenced code, images and inline `code`, **bold**, _italic_, [links](/path/). No tables, no `####`, no task boxes.
- Facts: check every claim about a tool, a law or a price on its source page before it goes in. Prices only from `lib/plans.js` (projects from $5,000, trial week $2,500, Loom review $49 or $99, EAA audit $1,500). Google's guidance (Oct 2026): fact-check and review all AI-assisted content before publishing; Sam reads every article before it ships.

## 3. The five files

1. `content/writing/<slug>.md`: the article.
2. `lib/articles.js` `POSTS`: title, metaTitle (under 60 characters, the query near the start), description (under 160), category, published, modified, minutes (words / 210), cover, og, related (4 links).
3. `lib/tldr.js` `TLDR`: 3 or 4 plain sentences.
4. `lib/site.js` `ARTICLES`: the card for /writing/ (newest first).
5. `lib/service-guides.js`: add the slug to every service page it supports, so it gets links from the pages Google trusts most.

## 4. Images

`node scripts/cover.cjs '[["<slug>","<chip>","<cover title>"]]'` writes `public/writing/<slug>.png` and `public/og/writing-<slug>.jpg`. Convert the PNG to WebP at quality 80 and delete the PNG.

## 5. Checks before it ships

1. `node slopscore/build.mjs` (the Ask AI chat reads the articles), then `npm run build` (it also rebuilds `llms-full.txt`).
2. `npx serve out -l 4173`, then with `NODE_PATH=$(npm root -g)`: `node scripts/contrast.cjs /writing/<slug>/` and `node scripts/layout.cjs /writing/<slug>/`, both 0.
3. Lighthouse mobile and desktop on the page: Accessibility, Best Practices and SEO 100; performance no lower than the other articles.
4. Look at the page: the lede, every code block, the FAQ and the end mark.
5. After the push: `sh scripts/indexnow.sh`, then Request indexing in Search Console for the new URL.
