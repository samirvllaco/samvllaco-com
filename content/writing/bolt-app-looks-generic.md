_Bolt built your app in an afternoon. It also made every design decision for you, and it made the same ones it makes for everyone._

You typed what you wanted and Bolt shipped it. Login works, the data saves, it is live on a .bolt.host address. Then you put it next to three other apps built the same way and could not tell which one was yours.

## Why it happens

You never told Bolt what your product looks like, so it filled the gap with its defaults. Asking it to "make it look better" does not help, because better has no values in it. You get a different arrangement of the same defaults.

The fix is to write your design decisions down once, in the one place Bolt reads every time.

## Where Bolt keeps your rules

Bolt has a setting called project knowledge. Its [help center](https://support.bolt.new/settings/project-settings) describes it as background instructions for Bolt to follow in one project, and says Bolt includes it with every prompt you send in that project. That is exactly what a design rule needs: you say it once and it applies to every screen after.

To add it, from Bolt's docs on 20 Nov 2026:

1. Inside your project, click the project name at the top left, then **All project settings**.
2. In the left sidebar, click **Knowledge**.
3. In the **Project instructions** field, add your rules. If the field already has text from the starter template, add yours on a new line.
4. Click **Save prompt**. A "Project prompt updated" message appears.

Bolt uses the change from the next prompt you send.

## The block to paste

```
DESIGN RULES. Follow these in every change you make.
Spacing: only 4, 8, 16, 24, 32, 48, 64 pixels. No other values.
Type: one font family. Sizes 12, 14, 16, 20, 24, 32, 48 only. Body 16px with a 24px line height. Headings weight 600.
Color: one accent, #2563EB, used only for primary buttons, links, the active nav item and focus rings. Text #0A0A0A, secondary text #525252, borders #E5E5E5, page background #FAFAFA, cards #FFFFFF. No gradients.
Corners: 8px on buttons and inputs, 12px on cards and dialogs.
Shadows: none on cards. Use a 1px border. One shadow for dialogs and menus only.
States: every screen has an empty state, a loading skeleton and an error message that says what happened and how to fix it.
Copy: every button is a verb and an object. No filler words. No exclamation marks.
Before you write code, list which of these rules the request touches.
```

Change the accent color to yours. Keep everything else until you have a reason to change it.

## Four prompts to clean up what is already built

The rules apply to new work. These four bring the existing screens into line. Send them one at a time and check the result after each.

### 1. Spacing and type

```
Bolt, audit every margin, padding, gap and font size in this app against the design rules in the project knowledge. Replace each value that is not on the scale with the nearest one that is. Do not change layout or logic. List every file you changed with the old value next to the new one.
```

### 2. Color

```
Bolt, replace every hard-coded color in this app with a CSS variable. Define the variables once from the design rules in the project knowledge. Remove every gradient. The accent color appears only on primary buttons, links, the active nav item and focus rings. List what you changed.
```

### 3. The missing states

```
Bolt, go through every screen and add the states it is missing. EMPTY: one line for what will appear here, one line for why it matters, one button with a verb and an object. Never "No data available". LOADING: a skeleton in the shape of the loaded layout with fixed heights. ERROR: what happened, then how to fix it. "Couldn't save. Check your connection and try again." Add a 404 page with one sentence and one button home.
```

### 4. The words

```
Bolt, rewrite every heading, button and label. Headings say what the screen is for in 8 words or fewer. Buttons are a verb and an object: "Create invoice", not "Get started" or "Submit". Remove: seamless, powerful, unlock, elevate, effortless, welcome. Change text only. List each string, old next to new.
```

## One thing to know

Project knowledge covers one project. A new project starts empty, so keep the block in a note and paste it at the start of each one.

## After the cleanup

These steps cover what people notice in the first five seconds. They come from [the 25 fixes](/writing/ai-slop-ui-fixes/) I wrote up, and the full set of [27 copy-paste prompts is in the book](/fix-ai-slop-ui/). The [AI slop UI score](/tools/ai-slop-ui-score/) is free if you want to see where your app stands first.

If you would rather hand it over, [I fix the design of AI-built apps](/services/ai-app-design-fix/).

## Questions people ask

### Why does my Bolt app look like every other Bolt app?

Because the design was never specified, so Bolt used its defaults. The same defaults are used for every project until you give it your own values for spacing, type, color and corners.

### Where do I put design rules in Bolt?

In project knowledge. Click your project name, then All project settings, then Knowledge, add the rules to the Project instructions field and click Save prompt. Bolt includes them with every prompt in that project.

### Does project knowledge apply to all my Bolt projects?

No. It applies to one project. Paste your rules into each new project.

### Will these prompts break my app?

They ask for changes to style and text only, and each one asks Bolt to list what it changed. Check the list after each prompt and use version history if something moved that should not have.
