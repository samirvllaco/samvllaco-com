_MVP UI/UX design is the design of the smallest version of your product that a real user can finish a real task in. That means one core flow, 5 to 8 screens, a small set of components and every state, in 2 to 4 weeks._

Most MVPs fail on design in one of two ways. They design too much, a full product nobody has asked for yet, or they design nothing and ship whatever the framework or the AI tool produced. This is the middle path I use with founders.

## What MVP UI/UX design covers

An MVP proves one thing: that a user will do the one job your product exists for. The design work follows from that.

1. **The core flow.** From arriving to finishing the one job. For an invoicing app: sign up, create an invoice, send it.
2. **The 5 to 8 screens on that flow.** Landing or sign up, the first screen after sign up, the main task, the result, settings at its simplest.
3. **A small component set.** Button, input, select, table or list, card, modal and toast, each with default, hover, focus, disabled and loading states.
4. **Tokens.** One spacing scale, one type scale and a color palette with contrast checked, in a form your developer or AI tool can use directly.
5. **The states.** Empty, loading, error and first run for every screen on the flow.

What it leaves out on purpose: a full design system, a marketing site with ten pages, dark mode, onboarding tours, and settings nobody has asked for. Those come after people use the product.

## UI or UX first?

UX first, always, but it is quicker than founders expect. UX for an MVP is one decision: what is the shortest path from sign up to the first result? Draw it as boxes and arrows before any screen has a color. If the path has more than five steps, cut one.

UI comes second: how those steps look and read. A plain, consistent UI on a short flow beats a polished UI on a long one.

## The MVP design process, week by week

- **Week 1: the flow.** The one job, the path to it, and rough layouts of each screen in gray. Test it on three people who match your user. Watching where they stop is worth more than any opinion.
- **Week 2: the look.** Visual direction on the two screens that matter most, usually the first screen after sign up and the main task. Color, type, spacing and corners are decided here, once.
- **Weeks 3 and 4: the rest.** Remaining screens, the components, every state, the mobile width and the handoff.

A simple MVP fits in two weeks. Four is the upper end for one flow. If a plan needs eight, it is not an MVP any more.

## How much does MVP UI/UX design cost?

It depends on who does it and how many screens are on the flow.

- **Do it yourself with an AI tool.** The cost is your time. It works if you set rules first; without them every screen drifts. A [DESIGN.md file](/writing/design-md-template/) is the cheapest fix.
- **A freelance designer.** A fixed price for the flow. My own projects start at $5,000, and a single trial week on one problem is $2,500.
- **An agency.** More people and more process, at a higher price. Worth it when you need research, brand and build together, not for one flow.

Whoever you ask, get the quote as "these screens, these states, by this date, for this total". [What a product designer costs](/writing/product-designer-cost/) has the full ranges.

## Designing an MVP with Lovable, Cursor or v0

AI tools build the happy path fast and skip the rest. If you are building the MVP yourself:

1. Write your rules before the first prompt: spacing, type sizes, one accent color, corner radius. Use the free [DESIGN.md generator](/tools/design-md-generator/).
2. Prompt one screen at a time, in the order of the flow.
3. Ask for the states by name. Paste this into Cursor, Lovable or Claude Code:

```
For every screen on the main flow, add the states it is missing. EMPTY: one line on what will appear here and one button to add the first item. LOADING: a skeleton in the shape of the real layout. ERROR: what happened and how to fix it, next to where it happened. FIRST RUN: what a brand-new account sees before it has any data. Use the existing spacing and color values. List the screens you changed.
```

4. Check the live result with [Slop Score](/slop-score/) before you show it to anyone.

## Five MVP design mistakes

- **Designing features instead of a flow.** Ten half-finished features lose to one finished job.
- **No empty state.** A new user's first screen is empty by definition. If it says "No data", they leave.
- **Skipping mobile.** Many first visits come from a link opened on a phone.
- **A different look on every screen.** It reads as unfinished, and people do not trust unfinished products with their data.
- **Polishing before testing.** Test the gray version on three people first. Polish what survives.

## Questions people ask

### How many screens should an MVP have?

Five to eight on the core flow. If you count more than ten, you are designing version two.

### Do I need a designer for an MVP?

Not always. If the flow is short and you set design rules before you build, an AI tool can get you to a usable first version. Bring in a designer when people sign up and get stuck, or when the product has to look trustworthy on day one, as with payments, health or legal work.

### What is the difference between a prototype and an MVP?

A prototype is a clickable model you use to test an idea; nothing is saved and nothing really works. An MVP is a working product that does one job for real users.

### Should an MVP have a design system?

No. It needs tokens and about seven components. A full design system pays off when a second team or a second product starts using it.

## Where to go next

I've designed more than 10,000 screens since 2013, many of them first versions. If you are hiring, [how to hire a product designer](/writing/how-to-hire-a-product-designer/) covers what to ask. If you want it designed with you, [see SaaS product design](/services/saas-product-design/) or [ask for a free audit](/free-audit/) of what you have built so far.
