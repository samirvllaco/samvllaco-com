---
name: anti-ai-slop-ui
description: Use when building, changing or reviewing any user interface. Stops the generic AI-generated look (purple gradients, glow, random spacing, too many grays, emoji icons, "Get started" buttons, missing states) by holding every screen to one set of exact design rules, then checks the result before finishing.
---

# Anti AI slop UI

By Sam Vllaco, samvllaco.com. Free to use and share.

AI-generated interfaces look generic because each value is picked on the fly. This skill replaces those picks with fixed rules. If the project has a DESIGN.md, its values win over the defaults below. Never invent a value that is not in either.

## Before you write any UI

1. Read DESIGN.md if it exists. If it does not, use the defaults in this file.
2. Say which screen you are building and the one action it exists for.
3. List the states the screen needs: empty, loading, error, success.

## Banned on sight

- Gradients on backgrounds, buttons or text. Glows and neon shadows.
- More than one accent color. Purple or violet as a default accent.
- Emoji used as icons or in headings.
- Spacing values off the scale. Font sizes off the list.
- More than one filled primary button on a screen.
- Buttons labelled "Get started", "Submit", "Click here", "Learn more" or "OK".
- Placeholder text used as a label.
- Hype copy: "revolutionary", "seamless", "unlock", "supercharge", "next-level", "effortless".
- Three identical feature cards with an icon, a title and a vague line, as the default section.
- Centered body text longer than two lines.

## Default rules, used when there is no DESIGN.md

- Spacing: 4, 8, 12, 16, 24, 32, 48, 64. 16 inside cards, 24 between cards, 48 to 64 between sections.
- Type: one family. Sizes 12, 14, 16, 20, 24, 32, 48. Body 16 with 1.5 line height. Weights 400 and 600 only.
- Color: one accent, #2563EB unless the brand says otherwise, for primary actions, links and focus only. Text #0F172A, secondary #475569, borders #E2E8F0, page #FFFFFF, surface #F8FAFC.
- Shape: radius 8 for controls, 12 for cards. Cards get a 1px border, not a shadow.
- Contrast: body text at least 4.5:1, large text and icons at least 3:1.
- Focus: a visible 2px outline in the accent with a 2px offset on every interactive element.
- Targets: at least 24 by 24px, 44 by 44px for main actions.

## Copy

- Buttons are a verb and an object: "Create invoice", "Send report", "Add teammate".
- Errors say what happened and how to fix it: "Couldn't save. Check your connection and try again."
- Empty states say what will appear, why it matters, and offer one action.
- Sentence case everywhere. No exclamation marks.

## States every screen needs

- Empty: never "No data available". One line on what goes here, one button to add the first item.
- Loading: a skeleton in the shape of the real layout, with fixed heights so nothing jumps.
- Error: next to where it happened, in plain words, with a way out.
- Success: confirm what happened and what is next.

## Before you finish

Run this check and fix anything that fails before you say the task is done:

1. Every spacing value is on the scale.
2. Every font size is on the list, and only two weights are used.
3. One accent color, no gradients, no glow.
4. One primary button per screen, labelled with a verb and an object.
5. Every input has a visible label. Every icon button has an accessible name.
6. Every list and table has an empty state. Every async action has loading and error states.
7. Text contrast passes 4.5:1. Focus is visible on every control.

Report which of the seven you checked and what you changed.
