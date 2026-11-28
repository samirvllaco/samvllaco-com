_AI slop UI examples are the patterns that make an interface look generated: a purple gradient hero, three identical feature cards, glowing buttons, emoji icons, and under them spacing and type that follow no system. Here are 12 examples, how often I measured each one, and the fix._

People picture AI slop as a purple gradient. When I [measured 100 new product launches](/writing/ai-slop-statistics/), only 9 had one. The examples that are everywhere are the quiet ones, so this list has both kinds: the loud signs first, then the structural ones that survive after you delete the gradient.

## The loud examples

### 1. The purple gradient hero

A violet to pink gradient behind the headline, or on the headline text itself. 9 in 100 launches still have it.

**Fix:** a flat background and one accent color, used for the main button, links and focus only.

### 2. Glow

Neon shadows around buttons and cards, or a blurred color blob in a corner.

**Fix:** remove every glow. Cards get a 1px border. One soft shadow is allowed, on menus and dialogs.

### 3. Emoji as icons

A rocket, a sparkle and a lightning bolt above three feature titles. 3 in 100 put an emoji in a heading.

**Fix:** one line-icon set at one size and stroke, or no icons.

### 4. Gradient text

The headline's key word filled with a gradient. 5 in 100.

**Fix:** one text color. Use weight or size for emphasis.

### 5. Hype copy

"Unlock seamless workflows." "Supercharge your productivity." 8 in 100 use at least one of the 12 hype words I checked.

**Fix:** say what the product does, for whom, and one result with a number.

## The quiet examples

### 6. Spacing with no scale

13px here, 17px there, 22px below. 73 in 100 pages have less than 80% of their spacing on a 4px grid. This is the most common sign of all.

**Fix:** one scale, 4, 8, 12, 16, 24, 32, 48, 64, and nothing between.

### 7. A new font size for every block

53 in 100 use more than seven font sizes. The highest I counted on one page was 26.

**Fix:** seven sizes at most: 12, 14, 16, 20, 24, 32, 48.

### 8. Three filled buttons on the first screen

"Get started", "Book a demo" and "Try free", all in the accent color. 58 in 100 show more than one filled button on the first screen.

**Fix:** one filled button per screen. The others become outline buttons or text links.

### 9. Cards inside cards

A bordered panel holding bordered cards holding bordered rows. 30 in 100.

**Fix:** one level of container. Separate the inner items with space or a hairline.

### 10. Too many corner radius values

4px on inputs, 6px on buttons, 10px on cards, 16px on the modal, fully round on tags. 43 in 100 use more than four values.

**Fix:** two values. 8px for buttons and inputs, 12px for cards and dialogs.

### 11. Five shades of gray

Each written by hand, none of them named. 28 in 100 use more than three grays.

**Fix:** two grays for text and one for borders, saved as tokens.

### 12. Three identical feature cards

An icon, a two-word title and one vague line, three times in a row. It is the default layout of every AI builder, so it says nothing about your product.

**Fix:** replace one row with something only you can show: a real screenshot, a number, a short before and after.

## Why the quiet ones matter more

Builders have heard the joke about the gradient and removed it. The page still reads as generated, because nobody made the decisions underneath. Visitors cannot name uneven spacing, but they sense it in the first second, and they assume the product got the same care as the page.

## Fix the common ones in one pass

Paste this into Cursor, Claude Code or Lovable:

```
Fix these on every page. Remove all gradients, glows and emoji icons. Put every margin, padding and gap on this scale: 4, 8, 12, 16, 24, 32, 48, 64. Use at most seven font sizes: 12, 14, 16, 20, 24, 32, 48. Keep one filled button per screen and make the others outline buttons or text links. Use 8px radius for buttons and inputs and 12px for cards. Remove borders from cards that sit inside other cards. Do not change layout or copy. List what you changed, old value next to new.
```

## Check your own site

The free [AI slop checker](/ai-slop-checker/) measures most of these on your live page and gives a score from 0 to 100 with the top three fixes.

## Questions people ask

### What is an example of AI slop UI?

A landing page with a purple gradient hero, glowing buttons, emoji icons and three identical feature cards is the classic example. The more common one is a page with no gradient at all and spacing, font sizes and buttons that follow no system.

### What does AI slop UI look like?

Generic. Every element is the most common choice for its type, so the page could belong to any product. Up close, the spacing is uneven and several buttons compete for the first click.

### How do I avoid AI slop in my UI?

Set the rules before you prompt: one spacing scale, seven font sizes, one accent color, two corner radius values and one filled button per screen. Save them in a file your AI tool reads on every task.

### Is AI slop only about purple gradients?

No. In my sample of 100 launches only 9 had a purple gradient, while 73 had spacing off the grid and 58 had competing buttons.

## Where to go next

I've designed more than 10,000 screens since 2013, and these are the first things I fix on AI-built products. [The 25 AI slop UI fixes](/writing/ai-slop-ui-fixes/) explain each one, the free [DESIGN.md generator](/tools/design-md-generator/) writes the rules file, and [27 copy-paste prompts](/fix-ai-slop-ui/) fix them screen by screen.
