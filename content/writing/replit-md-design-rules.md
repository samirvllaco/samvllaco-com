_Replit Agent already keeps a rules file for your project. It just has nothing in it about design._

When you start a project with Replit Agent, it creates a file called replit.md in the root of the project. [Replit's docs](https://docs.replit.com/features/project-setup/replit-dot-md) say Agent reads that file automatically on your requests and uses it to follow your preferred patterns and style.

Open yours. You will find the project overview, the stack and some coding preferences. You will not find a spacing scale, a type scale or a color rule. So every time Agent builds a screen, it decides those again from scratch, and the screens drift apart.

## Add a design section to replit.md

Open replit.md in the file tree and paste this at the end. You can edit the file like any other. Replit's docs say so directly.

```
## Design Rules

Follow these in every UI change.

- Spacing: only 4, 8, 16, 24, 32, 48, 64 pixels. No other values.
- Type: one font family. Sizes 12, 14, 16, 20, 24, 32, 48 only. Body 16px with a 24px line height. Headings weight 600.
- Color: one accent, #2563EB, used only for primary buttons, links, the active nav item and focus rings. Text #0A0A0A, secondary text #525252, borders #E5E5E5, page background #FAFAFA, cards #FFFFFF. No gradients.
- Corners: 8px on buttons and inputs, 12px on cards and dialogs.
- Shadows: none on cards. Use a 1px border. One shadow for dialogs and menus only.
- States: every screen has an empty state, a loading skeleton and an error message that says what happened and how to fix it.
- Copy: every button is a verb and an object, for example "Create invoice". No filler words. No exclamation marks.

Before changing any UI, list which of these rules the request touches.
```

Change the accent color to yours and save the file.

## Three things the docs say that matter here

**The file has to be in the root.** Agent will not pick up a replit.md in a subfolder.

**Keep it short.** There is no strict size limit, but the docs warn that extremely large files may not be fully processed. A design section of ten lines is the right size. A pasted style guide of ten pages is not.

**Agent can edit the file too.** It updates replit.md as it learns about the project. After a long session, open the file and check your design section is still there and still says what you wrote.

## Three prompts to bring the existing screens into line

The section governs new work. These clean up what is already built.

### 1. Spacing, type and color

```
Agent, audit every margin, padding, gap, font size and color in this app against the Design Rules section of replit.md. Replace each value that breaks a rule with the nearest one that follows it. Move all colors into CSS variables defined once. Remove every gradient. Do not change layout or logic. List each file you changed with the old value next to the new one.
```

### 2. The missing states

```
Agent, go through every screen and add the states it is missing, following the Design Rules in replit.md. EMPTY: one line for what will appear here, one line for why it matters, one button with a verb and an object. Never "No data available". LOADING: a skeleton in the shape of the loaded layout with fixed heights. ERROR: what happened, then how to fix it. Add a 404 page with one sentence and one button home.
```

### 3. The words

```
Agent, rewrite every heading, button and label. Headings say what the screen is for in 8 words or fewer. Buttons are a verb and an object. Remove: seamless, powerful, unlock, elevate, effortless, welcome. Change text only. List each string, old next to new.
```

## Take the file with you

A replit.md that works is worth keeping. Replit's own advice is to reuse successful configurations across similar projects, so copy the design section into every new one before the first screen is built. It is much easier to start on a scale than to move onto one later.

## After the cleanup

The rules above come from [the 25 fixes](/writing/ai-slop-ui-fixes/) I wrote up. The full set of [27 copy-paste prompts](/fix-ai-slop-ui/), with a longer DESIGN.md rules file, is in the book.

If you would rather hand it over, [I fix the design of AI-built apps](/services/ai-app-design-fix/).

## Questions people ask

### What is replit.md?

A file in the root of a Replit project that Replit Agent creates and reads automatically. It holds project information, coding patterns and preferences, and you can edit it to change how Agent works.

### Can I put design rules in replit.md?

Yes. Add a section with your spacing scale, type sizes, colors, corner radius and rules for states and copy. Agent includes the file in its context when it handles your requests.

### Why does my Replit Agent app look generic?

Because the default replit.md says nothing about design, so Agent picks spacing, type and color again for each screen. Writing the values down once makes the screens consistent.

### How long should replit.md be?

Short. Replit's docs say there is no strict limit but very large files may not be fully processed. Keep the design section to about ten lines.
