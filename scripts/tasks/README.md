# Scripts for the scheduled tasks (Sam Vllaco lane)

Python 3 standard library only. Run from the repo root. Each prints its own help with `--help`. They are not part of the site build.

| Script | Used by | What it does |
|---|---|---|
| `find_launches.py` | Weekday UI/UX outreach | Lists Show HN launches from the last 14 days with a founder address that is published on their HN profile or their own site, with the source URL. Takes `--exclude FILE` for people already emailed |
| `lint_email.py` | UI/UX outreach, lead warm-up, Dribbble | Rule check before sending or putting a draft on the board: `--profile sam-uiux`, `sam-audit` or `dribbble`, one file or `--batch items.json` |
| `live_check.py` | Site SEO | Live crawl of samvllaco.com's sitemap: status, noindex, canonical, h1, title and description length, duplicates, broken internal links, robots.txt |
