_AI slop statistics, measured instead of guessed: I scanned the home pages of 100 products launched on Show HN in the last 30 days. Only 9 had the famous purple gradient. 73 had spacing off the grid, 58 had more than one filled button on the first screen and 53 used more than seven font sizes._

Everyone describes AI slop the same way: purple gradients, glow, emoji. I wanted numbers. So I ran the measuring part of my [AI slop checker](/ai-slop-checker/) over 100 fresh launches and counted. The result surprised me: the loud signs are rare, and the quiet ones are almost everywhere.

## The numbers

Out of 100 home pages:

- **73** have less than 80% of their spacing values on a 4px grid
- **58** show more than one filled button on the first screen, and **43** show more than two
- **53** use more than seven font sizes, and **36** use more than ten
- **43** use more than four different corner radius values
- **35** use at least one gradient
- **30** put a card inside a card
- **28** use more than three grays
- **26** use more than three different shadows
- **24** set body text tighter than a 1.5 line height
- **9** have a purple, violet or pink gradient on the first screen
- **8** use at least one of 12 hype words such as "unlock" or "seamless"
- **5** use gradient text
- **3** have an emoji in a heading

## The medians

The typical launch in the sample:

- 8 font sizes on one page. The highest was 26.
- 17 different spacing values. The highest was 67.
- 2 font families
- 2 grays and 2 accent hues
- 3 corner radius values
- 2 filled buttons on the first screen. The highest was 14.

For comparison, the rules I design to are 7 font sizes at most, one spacing scale of about 8 values, one accent color and one filled button per screen.

## What this says about AI slop

**The purple gradient is a meme, not the problem.** Nine sites in a hundred had one. Builders have heard the joke and removed it. The same goes for emoji in headings, at three in a hundred, and hype words, at eight.

**The real tells are structural.** Spacing that follows no scale, a new font size for every block, three buttons competing on the first screen. You cannot point at these the way you can point at a gradient, but they are what makes a page feel generated. People sense it before they can name it.

**Removing the gradient is not a redesign.** A page can drop every cliché and still read as generated, because nobody made the underlying decisions. That is why prompts like "make it look less AI" change the colors and leave the feeling.

**Most products ask for too much at once.** More than half put two or more filled buttons in front of a first-time visitor. One clear action is the cheapest conversion fix on this list.

## Fonts

Inter appeared on 16 of the 100 pages and Geist on 10. Monospace fonts were common too, with JetBrains Mono on 7 and IBM Plex Mono on 5, which fits an audience of developer tools. A default font is not slop on its own. It becomes a tell when everything else is default as well.

## How I measured

- **Sample:** products posted to Show HN in the 30 days before 28 November 2026 with at least two points and their own website. Code hosts, app stores and document links were left out, and each domain counts once. The first 100 home pages that loaded with real content are the sample.
- **Method:** each home page was opened in a desktop browser at 1440 by 900 and measured in the page: computed font sizes, colors, spacing, radius, shadows, gradients, buttons and nesting of visible elements, plus a check of the visible text against 12 hype words. This is the measuring step of [Slop Score](/slop-score/). No AI model judged the pages.
- **A purple gradient** means a gradient on the first screen with a saturated hue between blue-violet and pink.
- **Limits:** home pages only, desktop only, one day. Show HN is not only AI-built products, and I did not check how each one was made. Many are developer tools, which lean plain. A sample of consumer apps would likely show more color. Treat the numbers as a snapshot of new launches, not of the whole web.

I am not naming the sites. The point is the pattern, not the people who shipped.

## Fix the four most common problems

Paste this into Cursor, Claude Code or Lovable:

```
Audit this site and fix four things. 1) Spacing: replace every margin, padding and gap with the nearest value from 4, 8, 12, 16, 24, 32, 48, 64. 2) Type: use at most seven font sizes, 12, 14, 16, 20, 24, 32, 48, and replace every other size with the nearest one. 3) Buttons: keep one filled button on the first screen and turn the others into outline buttons or text links. 4) Radius: use 8px for buttons and inputs and 12px for cards, and nothing else. Do not change layout or copy. List what you changed, with the old value next to the new one.
```

To stop it coming back, save the rules in a [DESIGN.md file](/writing/design-md-template/) or install the free [anti AI slop UI skill](/writing/anti-ai-slop-ui-skill/).

## Questions people ask

### How common is AI slop design?

By the loud definition, purple gradients and emoji, it is rare: under 10% of new launches in this sample. By the structural definition, no spacing scale, too many font sizes and competing buttons, it is the majority: 53 to 73 in 100.

### What is the most common sign of an AI-generated website?

Spacing that follows no scale. 73 of 100 home pages had less than 80% of their spacing values on a 4px grid.

### Can I use these statistics?

Yes. Please link to this page as the source.

### How does my own site compare?

Run it through the free [AI slop checker](/ai-slop-checker/). It measures the same things and adds a design review, a score from 0 to 100 and the top three fixes.

## Where to go next

I've designed more than 10,000 screens since 2013, and these four problems are the first things I fix on AI-built products. [The 25 UI fixes](/writing/ai-slop-ui-fixes/) explain each one, and [27 copy-paste prompts](/fix-ai-slop-ui/) fix them screen by screen.
