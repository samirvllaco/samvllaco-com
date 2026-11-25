_You built it in Lovable in a weekend. It works. It also looks like the last five Lovable apps you saw. Here are 7 fixes you can make inside Lovable, with the prompts._

You shipped it.

Login works. The dashboard loads. A stranger could sign up tonight.

Then you open someone else's Lovable project and your stomach drops a little. Same soft cards. Same rounded buttons. Same friendly gradient. Swap the logos and nobody could tell which app is yours.

If you searched for why your Lovable app looks generic, that's the feeling. Lovable isn't broken, and neither is your idea. The cause is small. So are the fixes.

## Why Every Lovable App Looks the Same

Lovable runs on an AI model, and a model answers with what it has seen most. Leave a design decision open and you get the most common answer.

Lovable has a name for the result. Its prompt library calls it "the default-UI look."

Two things in Lovable make it more likely.

First, before a build Lovable can show a card of design questions about color palette, typography and layout. Hit **Skip all** and, per the docs, it chooses reasonable defaults.

Second, for dashboards, admin panels and apps that mainly manage records, Lovable skips those questions and builds directly, because those app types have standard defaults. If you built a SaaS product, there's a good chance it's that kind of app.

So nobody chose your colors, fonts or spacing. That's all "generic" means here.

The docs also say you can change the look at any time by describing the change in chat. Their advice is to name a style, like "minimal" or "premium". That helps, but a style word still leaves the numbers to Lovable. Give it the numbers.

Before you start, bookmark the current version in version history so you can go back. Then send one fix at a time and check the preview after each.

## 7 Fixes You Can Make in Lovable Today

### 1. Decide where color is allowed

A default build spreads color everywhere. Pick a neutral base and one accent, then tell Lovable where the accent is allowed.

```
Lovable, restyle the colors across the whole app. Do not change content, layout or features.
- Background: [hex], the lightest neutral. Cards and panels: [hex], one step off the background.
- Text: [hex], near black. Muted text: [hex]. Both at least 4.5 to 1 contrast against what they sit on.
- Border: [hex], one value everywhere.
- Brand accent: [hex], only for primary actions, links and selected states.
- Status colors only for success, warning and error, each with an icon or a word.
- Remove every gradient, glow and colored border not listed here.
Save these as color tokens and replace every raw color with a token.
```

### 2. Choose the fonts yourself

Fonts change the feel of an app faster than anything else. Per Lovable's docs, you can name any Google Font in a prompt and Lovable handles the loading.

```
Lovable, set the typography across the whole app. Do not change content or layout.
- Headings: [heading font]. Body and interface text: [body font]. No third font family.
- Weights: 400, 500 and 600 only.
- Body text and form input text: 16px or more, line height 1.5.
- Headings: line height 1.1 to 1.2, each level clearly larger than the one below it.
```

### 3. Put spacing on one scale

When nobody sets a scale, the gaps come out a little different on every screen. One scale makes the whole app feel planned.

```
Lovable, fix the spacing on every page. Do not change content, colors or features.
- Margin, gap and padding use only 4, 8, 16, 24, 32, 48 or 64px. Move every other value to the nearest one.
- Items that belong together: 8px apart. Different groups: 24px or more apart.
- Padding inside buttons, inputs and cards: 16px. Between cards: 24px. Between major page sections: 64px.
- Page content: 1200px max width, centered. Reading text: 680px max width.
- No card inside a card.
When you finish, list any value you could not move onto the scale.
```

### 4. Keep one filled button per task

Open your busiest screen and count the filled buttons. More than one, and the user has to guess. In the preview toolbar, choose **Select elements** (or press S), click the button that matters and send the prompt below. Hold Cmd or Ctrl to select more than one element. These requests use credits like any build message.

```
Lovable, on this screen the selected button is the only filled primary button.
Change every other button to an outline or plain text style.
Make every button and link at least 44px tall, with 8px or more between them.
Keep the existing colors and labels.
```

### 5. Rewrite the labels by hand

Vague words make a good layout feel generated. Choose **Edit text inline** in the preview toolbar (or press T), click the text, type and send. No prompt needed. Your account includes 100 free inline text edits, and each one comes back 24 hours after you use it.

Every button should say what happens: a verb, then the thing. "Submit" becomes "Create project". "No data" becomes "No projects yet. Create your first one."

### 6. Add the states Lovable left out

A first build shows the screen full of data. Your new users see it empty.

```
Lovable, add the missing states to [screen name]. Do not change the layout of the filled screen.
- Empty: say what goes here and what to do next, with one button.
- Loading: a skeleton in the shape of the real content.
- Error: name the problem and the next step, with a retry button.
- Success: confirm the action in plain words.
Motion: 150 to 250ms, and only when something changed. No hover lift or glow. Honor prefers-reduced-motion.
```

### 7. Check it at phone size

Above the preview there's a device toggle. Switch to **Mobile view** and tap through the app. Every tap target should be at least 44px, and form text 16px or more. If something is off, choose **Draw annotation** (press D), circle it and tell Lovable what to change. More checks like these are in my [accessibility fixes for AI-built apps](/writing/vibe-coding-accessibility-wcag-22-aa/).

## Where to Store the Rules So Lovable Keeps Following Them

Fix a screen today and next week's prompt can undo it. Save the rules where Lovable reads them every time.

- **Project instructions.** The main place. Open More, then Settings, then Instructions. Lovable used to call this Knowledge. It's a plain text field of up to 10,000 characters, and it's included on every message.
- **Memory.** Lovable also saves design decisions you state in chat, such as colors and typography. You can say "Remember that the accent color is only for primary actions." See what it saved under More, then Settings, then Memory.
- **AGENTS.md.** Prefer a rules file? Lovable reads an AGENTS.md or CLAUDE.md at the top level of your project with every message. On paid plans it may rewrite a rule that no longer matches your code, unless you asked for that rule.
- **Design systems.** On paid plans, a design system is its own project that you connect to your other projects. Lovable then scans every generation for raw colors and one-off values.

Paste this into project instructions and fill in the brackets.

```
DESIGN RULES FOR LOVABLE. Follow them on every change. Last updated: [date].
- Color: one brand accent, [hex], only for primary actions, links and selected states. Neutrals: [background], [surface], [text], [muted text], [border]. No other gradients, glows or colored borders.
- Type: [heading font] and [body font] only. Weights 400, 500, 600. Body text 16px or more.
- Spacing: only 4, 8, 16, 24, 32, 48, 64px.
- Layout: content 1200px max, text 680px max.
- Buttons: one filled primary button per task. Labels: verb plus object.
- Contrast: text at least 4.5 to 1. Status always has an icon or a word, not color alone.
- Touch: tap targets at least 44px.
- Motion: 150 to 250ms, and only when something changed.
- Use the components and tokens that already exist. When a request conflicts with a rule, say so before you build and suggest an alternative.
```

One caveat from Lovable's own docs: in very long conversations, instructions may not always be followed consistently. So keep checking the output against your rules.

## Seven Down, Eighteen to Go

These seven change the most for the least effort inside Lovable. The full list, with the UX law behind each fix, is in [AI Slop UI: 25 UX fixes](/writing/ai-slop-ui-fixes/).

If you want the whole system as prompts, it's in my short book, [27 Copy-Paste Prompts to Fix AI Slop UI](/fix-ai-slop-ui/), along with a DESIGN.md rules file. You can [try two of the prompts for free](/fix-ai-slop-ui/#free) first.

And if you'd rather hand it over, [I also fix the design of AI-built apps](/services/ai-app-design-fix/).

## Questions people ask

### Why does my Lovable app look generic?

Because nobody chose the design. An AI model returns the most common interface unless you tell it otherwise. In Lovable, that happens when you skip the design questions, or when you build a dashboard or admin panel, which Lovable builds directly with standard defaults. Give Lovable exact colors, fonts and spacing values and the look changes.

### Can I change the design of a Lovable app after it is built?

Yes. Lovable's docs say you can change the look at any time by describing the change in chat. You can also pick Select elements in the preview toolbar, click the part you want to change and describe the update.

### Where do I put design rules in Lovable so it keeps following them?

In project instructions: open More, then Settings, then Instructions. This feature was previously called Knowledge. It holds up to 10,000 characters and is included on every message. Lovable also reads an AGENTS.md or CLAUDE.md file at the top level of your project.

### What happened to Visual Edits in Lovable?

The preview toolbar replaced it. It has four modes: Select elements, Edit text inline, Draw annotation and Add a comment. You pick a mode, point at what you want to change and describe the update in plain language.

### Do I need a Lovable design system to make my app look better?

No. Design systems in Lovable are for sharing components and style rules across several projects, and they need a paid plan. For one app, a short set of design rules in project instructions is enough to start.
