_A DESIGN.md is one file of design rules that your AI coding tool reads before it touches the UI. Write it once, with exact values, and every screen it builds follows the same spacing, type, color and states._

Without one, Claude Code, Cursor, Lovable and v0 each pick values on the fly. That is why the second screen never quite matches the first. Below is what goes in the file, a free template you can copy, three filled examples, and where each tool expects to find it.

## What is a DESIGN.md file?

DESIGN.md is a plain Markdown file in the root of your project that describes your design system in words and numbers: the spacing scale, the type sizes, the colors, the corner radius, the components and the states every screen needs. It is not a framework or a package. It is a brief your AI tool reads every time, the same way a new designer would read your style guide on day one.

The name is a convention, not a standard. What makes it work is that the rules are specific. "Use generous spacing" changes nothing. "Spacing: only 4, 8, 12, 16, 24, 32, 48, 64" changes every screen.

## Why AI-built apps need one

A language model picks the most likely value for each element, one element at a time. Most likely means average, and average across thousands of screens means 13px here, 17px there and a third shade of gray below. Each choice is fine on its own. Together they look generated.

A DESIGN.md takes the choice away. When the rules say there are seven text sizes, the tool stops inventing an eighth.

## What goes in a DESIGN.md

Keep it under 150 lines. Every line should be a rule a tool can check. Eight sections cover almost every product:

1. **Product.** One sentence on who uses it and the one job it does. Tools make better layout choices when they know the job.
2. **Spacing.** One scale, and where each step is used.
3. **Type.** One family, the sizes, the weights and the line heights.
4. **Color.** Named tokens with hex values, and what each is for.
5. **Shape.** Corner radius per element, borders and the one shadow you allow.
6. **Components.** Buttons, inputs, cards, tables and modals, each with its states.
7. **States.** Empty, loading, error and success, with the words to use.
8. **Copy.** How labels, buttons and errors are written.

## The free DESIGN.md template

Copy this into a file called DESIGN.md in the root of your project and change the values in angle brackets. Everything else can stay. Or fill in five questions in the free [DESIGN.md generator](/tools/design-md-generator/) and copy a file with your values already in it.

```markdown
# DESIGN.md

Read this before any UI work. If a request would break a rule here, say which rule and ask first.

## Product
<One sentence: who uses this app and the one job it does for them.>

## Spacing
- Scale: 4, 8, 12, 16, 24, 32, 48, 64. No other values.
- Inside cards and inputs: 16. Between cards: 24. Between page sections: 48 on mobile, 64 on desktop.
- A heading and its paragraph sit 8 apart. The next group starts 24 below.

## Type
- Family: Inter for everything. <Your brand font.>
- Sizes: 12, 14, 16, 20, 24, 32, 48. No other sizes.
- Body 16/24. Secondary text 14/20. Page title 32/40.
- Weights: 400 for text, 600 for headings and buttons. Nothing heavier.

## Color
- --accent #2563EB: primary buttons, links, the active nav item and focus rings only. <Your brand color.>
- --text #0F172A, --text-2 #475569, --border #E2E8F0, --bg #FFFFFF, --surface #F8FAFC.
- --danger #DC2626, --success #16A34A: only for errors and confirmations.
- No gradients. No second accent. Text keeps 4.5:1 contrast on its background.

## Shape
- Radius: 8 for buttons and inputs, 12 for cards and dialogs. Nothing else.
- Cards: 1px --border, no shadow. One shadow only, on menus and dialogs: 0 8px 24px rgba(0,0,0,.12).

## Components
- Buttons: one primary per screen, filled --accent. Secondary: white with a 1px border. Height 40, padding 0 16.
- Every button has default, hover, focus (2px --accent ring, 2px offset), disabled and loading states.
- Inputs: visible label above, 40 high, error message under the field in --danger.
- Tables: numbers right-aligned with tabular figures, header row sticky, 48 row height.

## States
- Empty: one line saying what will appear here, one line on why it matters, one button with a verb and an object.
- Loading: a skeleton in the shape of the real layout. Nothing moves when the data arrives.
- Error: what happened, then how to fix it. No error codes in the message.
- Success: say what happened and what is next.

## Copy
- Buttons are a verb and an object: "Create invoice", never "Submit" or "Get started".
- Sentence case everywhere. No exclamation marks.

## Before you finish a task
List every rule from this file that the change touches, and confirm each one holds.
```

The last section matters more than it looks. Asking the tool to check its own work against the file catches most drift before you see it.

## Three DESIGN.md examples

The template is the base. These are the parts that change by product type. Paste the one that matches yours under the template's Product line.

### DESIGN.md for a SaaS dashboard

```markdown
## Dashboard rules
- The first screen answers one question: <the decision a user makes here>.
- One headline number per dashboard, the largest text on the page (32/40, weight 600), with its change against last period beside it.
- One trend chart and one table on the first screen. Everything else goes below the fold or into a detail page.
- Charts: --accent for the main series, --text-2 for comparison. No more than 3 series. Every chart has a date range the user can change.
- Tables: 10,000 rows must still work. Sticky header, sortable columns, a filter bar above, pagination of 50.
- New accounts see an empty state with one action that brings in their first data, never an empty chart.
```

### DESIGN.md for a landing page

```markdown
## Landing page rules
- One page, one goal: <the one action, for example "Start free trial">. That button is the only primary button on the page.
- Hero: headline under 10 words on what the user gets, one line under it on how, the button, then proof (a number, logos or one quote).
- Sections in this order: problem, how it works in 3 steps, product shot, proof, pricing or next step, FAQ, final call.
- Max content width 1200, text columns 680. Sections 96 apart on desktop.
- No stock photos of people. Show the product.
```

### DESIGN.md for a mobile app

```markdown
## Mobile rules
- Touch targets at least 44 by 44. Primary actions sit in the bottom third of the screen.
- One primary button per screen, full width, 16 from the screen edges.
- Tab bar with 3 to 5 items, icon and label, never icon alone.
- Respect safe areas. Nothing important within 16 of the screen edge.
- Sizes: 13, 15, 17, 20, 28, 34, matching the iOS defaults.
```

## Where each AI tool reads it

The file is the same everywhere. What changes is how you point the tool at it.

**Claude Code.** Put DESIGN.md in the project root, then add one line to CLAUDE.md: `Read DESIGN.md before any UI work.` Claude Code loads CLAUDE.md at the start of every session, so the rule comes with it. [The full Claude Code setup is here](/writing/claude-code-ui-design/).

**Cursor.** Cursor reads rules from the `.cursor/rules` folder. Create a rule that points at DESIGN.md and scope it to your UI files, so it loads whenever Cursor touches a component. [The Cursor rules file, ready to paste](/writing/cursor-rules-for-ui-design/).

**Lovable.** Paste the contents into project instructions (More, then Settings, then Instructions; it used to be called Knowledge), which go with every message. Lovable also reads an AGENTS.md or CLAUDE.md at the top of the project, so a one-line pointer there works too. [More on keeping Lovable on your rules](/writing/lovable-app-looks-generic/).

**v0.** Save the rules as an Instruction, v0's name for a saved, reusable prompt. [The v0 version, with six prompts](/writing/v0-app-looks-generic/).

**Bolt and Replit.** Bolt reads project knowledge, Replit reads replit.md. Paste the same rules in. [Bolt](/writing/bolt-app-looks-generic/) and [Replit](/writing/replit-md-design-rules/) have their own guides.

## Apply it to an app that already exists

A new DESIGN.md does nothing to screens that are already built. Run this once, in whichever tool you use:

```
Read DESIGN.md. Then audit every screen and component in this app against it. List each place that breaks a rule: spacing values not on the scale, font sizes not in the list, colors not in the tokens, radius values other than 8 and 12, buttons without a focus state, and lists or tables with no empty state. Group the list by file. Do not change anything yet.
```

Read the list, then fix it in this order: spacing, color, type, then states. Spacing and color touch every screen, so they make the biggest difference first.

## How to tell it is working

Open three screens side by side. If the gaps between cards are the same, the grays are the same and the buttons look like one family, the file is doing its job. If one screen still drifts, ask the tool which rule it broke. It will usually tell you, and the answer shows you which line in DESIGN.md needs to be more specific.

## Questions people ask

### Is DESIGN.md an official standard?

No. It is a convention that grew out of files like README.md and CLAUDE.md. AI coding tools read any Markdown file you point them at, so the name matters less than where you reference it and how specific the rules are.

### What is the difference between DESIGN.md and CLAUDE.md?

CLAUDE.md is for everything Claude Code should know about the project: commands, code style, structure. DESIGN.md holds only the design rules. Keeping them apart keeps both short, and CLAUDE.md points to DESIGN.md with one line.

### How long should a DESIGN.md be?

Under 150 lines. Long files get skimmed by tools the same way they get skimmed by people. If a rule cannot be checked, cut it.

### Can I generate a DESIGN.md from my existing app?

Yes, but read it before you trust it. Ask your tool to list every spacing value, font size and color the app already uses, then pick the ones to keep. If you let the tool write the rules from what is there, you lock in the drift you wanted to remove.

### Do I need a designer if I have a DESIGN.md?

Not to get consistency. A DESIGN.md gets you an app that looks decided. A designer decides what the product should feel like and which screens it needs. If the rules are right and the app still does not convert, that is a design problem, not a consistency problem.

## Where to go next

I've designed more than 10,000 screens since 2013, and a rules file like this is the first thing I set up on every AI-built app I fix. [The 25 UI fixes for AI-built apps](/writing/ai-slop-ui-fixes/) go further than the template, and [27 copy-paste prompts](/fix-ai-slop-ui/) are in the book. If you would rather hand it over, [I fix AI-built apps without a rebuild](/services/ai-app-design-fix/).
