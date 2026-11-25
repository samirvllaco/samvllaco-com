_You prompted v0, it built the app, and it looks like every other v0 app. That is not your prompt. It is the starter._

Open ten apps built with v0 and you will see the same thing ten times. It looks clean. It also looks like nobody chose it.

## Why every v0 app looks the same

v0 says it plainly in its own docs: new v0 chats start with a Next.js app that uses shadcn/ui and Tailwind CSS.

That starter is good. shadcn/ui is a well-built component set and Tailwind keeps the code tidy. The problem is that it is everyone's starter. The defaults are the design, and the defaults are shared by every project on the platform. Unless you tell v0 otherwise, it reaches for them every time.

So the fix is not a cleverer prompt for each screen. It is deciding your own defaults once and making v0 use them.

## 1. Pick one accent color and name it

The default look is black, white and gray, sometimes with a purple or blue gradient the model adds on its own. Choose one accent and give v0 the exact value.

```
v0, set the color system for this app. One accent color: #2563EB. Use it only for the primary button, links, the active nav item and focus rings. Everything else uses a neutral scale: #0A0A0A for text, #525252 for secondary text, #E5E5E5 for borders, #FAFAFA for the page background, #FFFFFF for cards. No gradients. No second accent color. Define these as CSS variables in globals.css and use the variables everywhere. Replace every hard-coded color in the app with a variable and list the files you changed.
```

Swap #2563EB for your brand color. Then check your text contrast with the [contrast checker](/tools/contrast-checker/), because a light accent on white fails more often than people expect.

## 2. Change the type

Type is the fastest way to stop looking like a template.

```
v0, replace the font in this app. Use Geist for all UI text, loaded with next/font. Use exactly these sizes and no others: 12, 14, 16, 20, 24, 32, 48. Body text is 16px with a 24px line height. Headings use weight 600, never 700 or higher. Secondary text is 14px in the secondary text color. Remove any other font size from the app and list what you replaced.
```

If you already have a brand font, name that one. The point is one family, seven sizes and no exceptions.

## 3. Put spacing on one scale

Generated layouts drift. 12px here, 18px there, 22px below. Your eye reads it as cheap before it reads a single word.

```
v0, audit every margin, padding and gap in this app. Replace each value with the nearest one from this scale: 4, 8, 16, 24, 32, 48, 64. Do not use any value between them. Use 16px inside cards, 24px between cards, 48px between page sections on mobile and 64px on desktop. List every file you changed with the old value next to the new one.
```

## 4. Decide your corners and shadows

The shadcn default is a medium radius on everything with a soft shadow. Pick your own and apply it everywhere.

```
v0, set one corner style for this app. Buttons and inputs: 8px radius. Cards and dialogs: 12px radius. Nothing else gets a different radius. Remove all box shadows from cards and use a 1px border in the border color in their place. Keep one shadow only, on dialogs and dropdown menus: 0 8px 24px rgba(0,0,0,0.12). Apply this across every component.
```

Sharper corners read as serious. Rounder corners read as friendly. Either is fine. Three different radii on one screen is not.

## 5. Build the screens v0 skipped

v0 builds the happy path. The empty screen, the loading state and the error message usually do not exist until you ask.

```
v0, go through every screen in this app and add the states it is missing. EMPTY: one line saying what will appear here, one line saying why it matters, and one button labelled with a verb and an object. Never "No data available". LOADING: a skeleton in the shape of the loaded layout, with fixed heights so nothing shifts. ERROR: say what happened, then how to fix it. "Couldn't save. Check your connection and try again." No error codes in the message. Then add a 404 page with one sentence and one button back to the home screen. Use the existing color and spacing variables.
```

## 6. Rewrite the copy

"Welcome to your dashboard." "Get started." "Unlock the power of." Generated copy is as recognisable as generated layout.

```
v0, rewrite every heading, button and label in this app. Headings say what the screen is for in 8 words or fewer. Every button is a verb and an object: "Create invoice", not "Get started" or "Submit". Remove these words everywhere: seamless, powerful, unlock, elevate, effortless, welcome. No exclamation marks. Do not change any layout or logic, only text. List each string you changed, old next to new.
```

## Save your rules so you stop repeating them

Six prompts fix one project. An Instruction keeps the next one from needing them.

v0 lets you save reusable prompts called Instructions. From the docs, on 20 Nov 2026:

1. Click the **+** button in the prompt bar.
2. From **Instructions**, select **New Instruction**.
3. Add a **Title**, for example "My design rules".
4. Add the **Rule** content. Paste the block below.
5. Click **Add**.

The Instruction is saved to your account and available across all your chats and projects. To use it, click **+**, check it, and send your prompt. It stays applied until you uncheck it.

```
DESIGN RULES. Follow these in everything you build.
Color: one accent, #2563EB, for primary buttons, links, active nav and focus rings only. Neutrals for everything else. No gradients.
Type: one font family. Sizes 12, 14, 16, 20, 24, 32, 48 only. Headings weight 600.
Spacing: 4, 8, 16, 24, 32, 48, 64 only.
Corners: 8px on buttons and inputs, 12px on cards and dialogs.
Shadows: none on cards, a 1px border in their place.
States: every screen has empty, loading and error states.
Copy: buttons are a verb and an object. No filler words. No exclamation marks.
Before you write code, list which of these rules the request touches.
```

If you have a real design system, with your own components and tokens in a repository, v0 has a stronger option. Design Systems 2.0 lets you import it once from the Design Systems page. v0 reads your sources, builds a starter app from them and saves it as a skill, so new chats begin from your system and not from the shared one. For a solo founder with no component library yet, the Instruction above is the right size.

## Six prompts in, and then

These six cover what people notice in the first five seconds. They are six of [the 25 fixes](/writing/ai-slop-ui-fixes/) I wrote up, and [the full set of 27 copy-paste prompts](/fix-ai-slop-ui/) is in the book. To see where your app stands first, the [AI slop UI score](/tools/ai-slop-ui-score/) is free.

And if you would rather hand it over, [I fix the design of AI-built apps](/services/ai-app-design-fix/).

## Questions people ask

### Why does my v0 app look like every other v0 app?

Because every new v0 chat starts from the same Next.js starter with shadcn/ui and Tailwind CSS. The defaults are shared, so the look is shared until you set your own colors, type, spacing and corners.

### How do I give v0 design rules it follows every time?

Save them as an Instruction. Click the + button in the prompt bar, choose Instructions, then New Instruction, paste your rules and click Add. Check the Instruction before you send a prompt and it stays applied until you uncheck it.

### Can v0 use my own design system?

Yes. Design Systems 2.0 imports your components and tokens from a repository, Figma frames or docs, and saves them as a skill that new chats can start from.

### Should I stop using shadcn/ui?

No. The components are solid. Keep them and change the tokens: color, type, spacing, radius and shadow. That is where the generic look comes from.

### Do these prompts work in Lovable or Cursor?

The rules do. The wording and where you save them differ, so there is a separate guide for each tool.
