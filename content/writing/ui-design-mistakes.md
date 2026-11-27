_Most apps that look cheap are not badly built. They make the same 25 small design mistakes, and each one has a fix you can apply in minutes._

Here they are in seven groups, each with the exact values to use. Count how many your app makes, then fix them from the top down.

## Spacing and layout

### 1. A new spacing value in every component

13px here, 17px there, 22px below. Nobody notices one of them, everybody notices all of them. Use one scale, 4, 8, 12, 16, 24, 32, 48, 64, and nothing between.

### 2. The same gap everywhere

When every gap is 16px, nothing looks grouped. The space between groups should be at least twice the space inside a group, for example 8px inside and 24px between.

### 3. Everything centered

Centered paragraphs and forms are slow to read because every line starts somewhere new. Left-align text and forms. Center only short headings and empty states.

### 4. Text that runs the full width of the screen

Long lines tire the eye before the end of the line. Cap reading text at 680px, about 70 characters a line.

### 5. Cards inside cards

Three nested borders make a screen look like a box of boxes. Use one level of container and separate what is inside it with spacing or a 1px divider.

## Type

### 6. Too many text sizes

Four sizes cover almost every app screen: 12px for captions, 14px for body and table text, 16px for inputs and lead text, 20px for page titles.

### 7. Too many weights

Use 400 for text and 600 for emphasis. Drop 300, 500, 700 and 800.

### 8. Inputs smaller than 16px on mobile

iPhone Safari zooms into any input set below 16px, and the page jumps. Set every input to 16px on mobile.

### 9. Long labels in capitals

They are harder to read and look like shouting. Use sentence case everywhere. Keep capitals for short overline labels of one or two words, with 0.05em letter spacing.

## Color

### 10. Gray text that fails contrast

Normal text needs 4.5 to 1 against its background. On white, #6B7280 passes at 4.8 to 1 and is the lightest gray to use for text. Check yours with the [contrast checker](/tools/contrast-checker/).

### 11. Nine grays

Five do the job. Text #111827, secondary text #4B5563, helper text #6B7280, borders #E5E7EB, section backgrounds #F9FAFB.

### 12. The accent color on everything

When links, icons, badges and headings are all blue, nothing stands out. Use one accent, only for the primary action and the selected state.

### 13. Color as the only signal

A red border alone does not tell a color-blind user there is an error. Pair color with an icon or a word, as WCAG 1.4.1 requires.

### 14. Gradients and glows by default

Use flat surfaces and a 1px #E5E7EB border. Add a shadow only to things that float, like menus and modals.

## Buttons and forms

### 15. Every button filled

If all buttons look primary, none is. Keep one filled button per screen. Every other button is outlined or a text link.

### 16. Buttons that say Submit or OK

Name the action: a verb plus an object. Create invoice, Send message, Save changes.

### 17. Click targets too small

Make them at least 24 by 24px to pass WCAG 2.2 AA, and 44 by 44px for anything tapped on a phone.

### 18. Placeholder text instead of labels

The label disappears the moment someone types. Put a visible 14px label above every field. Use the placeholder for an example, or leave it empty.

### 19. Errors that only appear after Submit

Check each field when the user leaves it, show the error right under that field, and say how to fix it. "Enter a date after today", not "Invalid input".

## Tables and data

### 20. Numbers aligned left

Columns of amounts become hard to compare. Right-align numbers and use tabular figures with `font-variant-numeric: tabular-nums`.

### 21. Zebra stripes, borders and shadows on one table

Pick one. A 1px divider between rows is enough for most tables.

## States

### 22. No empty state

A new user opens a blank table and thinks the app is broken. Say what will appear here and give one button to add the first item.

### 23. A spinner for every load

Use a skeleton in the shape of the content for pages and lists. Keep spinners for short actions inside a button.

### 24. No focus styles

Keyboard users cannot see where they are. Use a 2px outline in the accent color with a 2px offset, and never remove the outline without replacing it.

## Copy

### 25. Messages written by the system, for the system

"An error occurred" tells the user nothing. Say what happened and what to do next, in the user's words: "We couldn't save your changes. Check your connection and try again."

## Check your app for all 25 at once

Paste this into Cursor, Claude Code or Lovable:

```
Audit this app for these UI problems and list every place each one occurs: spacing values outside 4, 8, 12, 16, 24, 32, 48, 64; more than four text sizes; font weights other than 400 and 600; text below 4.5 to 1 contrast; more than five grays; more than one filled button per screen; buttons labeled Submit or OK; click targets under 24 by 24px; inputs without a visible label; tables with left-aligned numbers; lists and tables with no empty state; elements with the focus outline removed. Do not change anything yet. Group the list by screen.
```

Fix them in the order of this article. Spacing and grays first, because they touch every screen.

## Questions people ask

### What is the most common UI design mistake?

Random spacing. It is on almost every app that looks unfinished, and it is the cheapest to fix: one scale, applied everywhere.

### How do I find UI design mistakes in my own app?

Screenshot your three most used screens and look at them at 50% zoom. Count the spacing values, grays, text sizes and filled buttons on each. Anything above the numbers in this article is a mistake to fix.

### Do these mistakes matter if the app works?

Yes. People judge whether to trust an app before they read a word, and these 25 are what they react to. A working app that looks unfinished loses signups it has already earned.

## Where to go next

I've designed more than 10,000 screens since 2013, and these 25 are the ones I fix first on almost every app. If your app was built with an AI tool, [the 25 fixes for AI-built apps](/writing/ai-slop-ui-fixes/) go further, and [the full set of 27 copy-paste prompts](/fix-ai-slop-ui/) is in the book.

And if you would rather hand it over, [I run a UX audit and fix it](/services/ux-audit/).
