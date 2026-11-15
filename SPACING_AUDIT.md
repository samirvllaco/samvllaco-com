# Spacing audit (15 Nov 2026, second pass)

Rule: every margin, padding and gap is a multiple of 4. Values off the grid were moved to the nearest multiple of 4 (ties go up, signs kept). Multiples of 4 (12, 20, 28, 36, 40, 56, 72 and up) stay as they were. Nothing else changed.

| File | Old | New | Times |
|---|---|---|---|
| app/globals.css | 3px | 4px | 14 |
| app/globals.css | 5px | 4px | 17 |
| app/globals.css | -5px | -4px | 2 |
| app/globals.css | 6px | 8px | 92 |
| app/globals.css | -6px | -8px | 12 |
| app/globals.css | 7px | 8px | 20 |
| app/globals.css | -7px | -8px | 2 |
| app/globals.css | 9px | 8px | 6 |
| app/globals.css | -9px | -8px | 2 |
| app/globals.css | 10px | 12px | 116 |
| app/globals.css | -10px | -12px | 9 |
| app/globals.css | 11px | 12px | 2 |
| app/globals.css | 13px | 12px | 2 |
| app/globals.css | 14px | 16px | 85 |
| app/globals.css | 15px | 16px | 2 |
| app/globals.css | 18px | 20px | 38 |
| app/globals.css | 22px | 24px | 29 |
| app/globals.css | 26px | 28px | 2 |
| app/globals.css | 30px | 32px | 2 |
| app/globals.css | -30px | -32px | 1 |
| app/globals.css | 34px | 36px | 4 |
| app/globals.css | 46px | 48px | 2 |
| app/globals.css | 54px | 56px | 1 |
| app/globals.css | 130px | 132px | 2 |

## Kept as optical nudges

| Value | Times |
|---|---|
| 2px | 51 |
| -1px | 1 |
| 1px | 4 |
| -2px | 4 |

`em` and `vw` values scale with text or screen and were left as they are.

## Group spacing (title + paragraph, then the next element 24px below)

Added in `app/globals.css` for: ebook hero buttons, video ticks, What's inside, part bonus, bonus grid and lists, persona header, one-fix ticks, What you get lists, package cards, 404 and building pages, home fix card steps, worldwide flags, FAQ ask card, case study tags.
