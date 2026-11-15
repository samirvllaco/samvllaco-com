# Spacing audit (15 Nov 2026)

Every margin, padding and gap value from 1 to 64 px was moved to the nearest step of the scale 4, 8, 16, 24, 32, 48, 64 (ties go to the larger step, the sign of negative margins is kept, 0 stays 0). Nothing else changed.

| File | Old | New | Times |
|---|---|---|---|
| app/globals.css | 1px | 4px | 4 |
| app/globals.css | -1px | -4px | 1 |
| app/globals.css | 2px | 4px | 51 |
| app/globals.css | -2px | -4px | 4 |
| app/globals.css | 3px | 4px | 14 |
| app/globals.css | 5px | 4px | 17 |
| app/globals.css | -5px | -4px | 2 |
| app/globals.css | 6px | 8px | 92 |
| app/globals.css | -6px | -8px | 12 |
| app/globals.css | 7px | 8px | 20 |
| app/globals.css | -7px | -8px | 2 |
| app/globals.css | 9px | 8px | 6 |
| app/globals.css | -9px | -8px | 2 |
| app/globals.css | 10px | 8px | 116 |
| app/globals.css | -10px | -8px | 9 |
| app/globals.css | 11px | 8px | 2 |
| app/globals.css | 12px | 16px | 134 |
| app/globals.css | -12px | -16px | 3 |
| app/globals.css | 13px | 16px | 2 |
| app/globals.css | 14px | 16px | 85 |
| app/globals.css | 15px | 16px | 2 |
| app/globals.css | 18px | 16px | 38 |
| app/globals.css | 20px | 24px | 85 |
| app/globals.css | -20px | -24px | 1 |
| app/globals.css | 22px | 24px | 29 |
| app/globals.css | 26px | 24px | 2 |
| app/globals.css | 28px | 32px | 72 |
| app/globals.css | 30px | 32px | 2 |
| app/globals.css | -30px | -32px | 1 |
| app/globals.css | 34px | 32px | 4 |
| app/globals.css | 36px | 32px | 27 |
| app/globals.css | 40px | 48px | 47 |
| app/globals.css | 44px | 48px | 6 |
| app/globals.css | 46px | 48px | 2 |
| app/globals.css | 52px | 48px | 4 |
| app/globals.css | 54px | 48px | 1 |
| app/globals.css | 56px | 64px | 29 |
| app/global-error.jsx | 20px (margin) | 24px | 1 |
| app/global-error.jsx | 20px (padding) | 24px | 1 |

## Kept as they are

Values above 64px (section rhythm, header clearance for anchor links, and formula constants such as `min(100vw, 960px)`). Squashing them to 64 would halve the space between sections and hide anchor targets under the header. Owner decision pending: cap at 64, or add 96 and 128 as section steps.

| Value | Times |
|---|---|
| 72px | 17 |
| 76px | 1 |
| 80px | 7 |
| 84px | 1 |
| 88px | 17 |
| 96px | 9 |
| 112px | 3 |
| 120px | 2 |
| 128px | 4 |
| 130px | 2 |
| 136px | 8 |
| 200px | 1 |
| 960px | 1 |

Font-relative and viewport units (`em` x36, `vw` x108) are not pixel values and were left as they are; the px parts of the same `clamp()` were snapped.
