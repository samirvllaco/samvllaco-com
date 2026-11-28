_You fixed the dashboard on Tuesday. The spacing was even, there was one clear button, and it finally looked like someone chose it._

On Thursday you asked Cursor for a settings page. The 13px gaps were back. So were three filled buttons in a row and a card inside a card.

Nothing broke. Cursor just never knew about Tuesday.

That's usually what's behind "my Cursor UI looks generic." A better prompt won't fix it. A rules file will: one place for your spacing, type, color and state decisions, which Cursor reads before it writes a screen.

Below: the file, where it goes and three prompts that use it. The Cursor details come from Cursor's own docs, checked on 15 November 2026.

## Why one-off prompts don't hold

A prompt fixes one screen in one chat. Open a new chat and the decision is gone.

Cursor's docs say it plainly: language models don't keep memory between completions. Rules are the answer to that. When a rule applies, its contents go in at the start of the model's context, so your decisions arrive before your prompt does.

Without a rule, every new screen starts from the most common interface there is. That's how screen 12 drifts away from screen 3.

So stop fixing slop one prompt at a time. Write the decisions down once, in the place Cursor looks.

## Where Cursor rules live

The docs list four kinds: project rules, user rules, team rules and AGENTS.md. For design decisions you want a project rule. It sits in your repo and you can scope it to UI files.

The details that matter:

- Project rules live in `.cursor/rules` inside your project.
- Each rule is a `.mdc` file, and you can name it anything. A plain `.md` file in that folder is ignored.
- The file is markdown with a small frontmatter block on top. Three fields decide when the rule applies: `description`, `globs` and `alwaysApply`.
- Keep a rule under 500 lines. If it grows past that, split it into smaller rules.

To create one, add the file by hand or type `/create-rule` in chat.

## The rules file, ready to paste

Save this as `.cursor/rules/design-rules.mdc`. Swap the [brackets] for your own values and change the globs to match your folders.

```
---
globs: src/components/**/*.tsx, src/app/**/*.tsx, src/**/*.css
alwaysApply: false
---

# Design rules

These are decisions, not suggestions. If my request breaks one, stop, tell me which rule and propose a fix.

## Spacing
- Every margin, gap and padding comes from this scale: 4, 8, 16, 24, 32, 48, 64 (px). No other values.
- Related items sit 8px apart. Separate groups sit 24px or more apart.

## Type
- Font families: [heading font] and [body font]. No third family.
- Weights: 400, 500 and 600 only.
- Body text 16px or more, line height 1.5. Input text 16px or more.

## Color
- Brand accent: [hex]. Only for primary actions, links and selected states.
- Neutrals: background [hex], surface [hex], text [hex], muted text [hex], border [hex].
- Status: success [hex], warning [hex], error [hex], info [hex]. Always with an icon or a word, never color alone.
- Text contrast at least 4.5 to 1 against its background. Muted text too.
- Use the existing color tokens. Do not write a new hex value inside a component.

## Layout
- Content max width 1200px, centered. Reading text max width 680px.
- Tap targets at least 44px by 44px.
- No card inside a card.
- Radius: 8px for small elements, 12px for cards and panels. Borders: 1px, one color.

## Buttons
- One filled primary button per task. Every other action is outline or plain text.
- Labels are a verb plus an object, like "Send invoice". Never "Submit" or "OK".
- Every button has hover, pressed, focus, disabled and loading states.

## States
- Every screen that shows data has empty, loading, error and success states.
- Errors say what happened and how to fix it.

## Motion
- 150 to 250ms, only for a real event such as open, close, save or error.
- Respect prefers-reduced-motion.

## Process
- Reuse existing components and tokens before you create new ones.
- After a UI change, list any value you used that is not in this file.
```

It's short on purpose. Cursor's docs warn against copying a whole style guide into a rule. So this file holds only what Cursor can't guess, because the decisions are yours.

## Scope it to your UI files

The frontmatter decides when Cursor includes the rule. The docs describe four cases:

- `alwaysApply: true`: included in every chat.
- `globs` set and `alwaysApply: false`: attached when a matching file is in context.
- `description` only: Agent pulls the rule in when it looks relevant.
- None of the three: used only when you @-mention the rule in chat.

The file above uses the second case, so your design rules stay out of the way while you work on the back end. Patterns are separated by commas. `src/**/*.tsx` matches every `.tsx` file under `src`.

One catch. A glob rule attaches when a matching file is in context, and a new screen may not have one yet. So each prompt below names the rule. The docs say you can @-mention a rule in chat to apply it by hand.

Two other files are worth knowing about:

- **AGENTS.md.** A plain markdown file with no frontmatter. Cursor reads it in your project root and in subfolders, where it applies to files in that folder and below. It's the simpler option when the whole repo is front end.
- **DESIGN.md.** The rules docs don't list DESIGN.md as a file Cursor picks up by itself. If you have one, keep it and add one line to the rule: `Read @DESIGN.md for the reasons behind these rules.` Cursor reads a referenced file when it needs it, and the contents are not placed in the prompt. So exact values go in the rule body.

## 3 Cursor UI design prompts that use the rules file

Swap the [brackets] and paste.

### Prompt 1: audit the screens you already have

```
Cursor, use @design-rules for this whole task.
Audit these screens against it: [list the files or folders].
Do not change any code yet.
CHECK FOR
- spacing values that are not 4, 8, 16, 24, 32, 48 or 64px
- body or input text under 16px
- text contrast under 4.5 to 1
- tap targets under 44px
- more than one filled primary button in the same task
- motion shorter than 150ms or longer than 250ms
- content wider than 1200px or reading text wider than 680px
- missing empty, loading, error or success states
GIVE ME
1. A table: file, line, rule broken, current value, the value it should be.
2. The 5 fixes that change the most, in order.
Then wait for my go-ahead.
```

### Prompt 2: build a new screen

```
Cursor, use @design-rules for this whole task.
Build this screen: [what it is, who uses it, the one thing they came to do].
Before you write code, tell me the layout, the one filled primary button and its label, and the components you will reuse.
Then build it with:
- spacing only from 4, 8, 16, 24, 32, 48, 64px
- body text 16px or more, text contrast 4.5 to 1 or better
- tap targets 44px or more
- content 1200px max, reading text 680px max
- motion 150 to 250ms, only on real events
- empty, loading, error and success states
If my request breaks a rule, stop and tell me which one.
```

### Prompt 3: check before you commit

```
Cursor, use @design-rules.
Check the UI files I changed for this commit: [list them]. Do not edit anything.
For each file, answer pass or fail on:
1. Spacing only from 4, 8, 16, 24, 32, 48, 64px
2. Body and input text 16px or more
3. Text contrast 4.5 to 1 or better
4. Tap targets 44px or more
5. One filled primary button per task
6. Motion 150 to 250ms
7. Content 1200px max, reading text 680px max
8. Empty, loading, error and success states present
For every fail, give the file, the line and the exact fix.
End with one line: SAFE TO COMMIT or FIX FIRST.
```

## How to tell it's working

Four checks.

1. **Cursor sees the rule.** Open Customize, then Rules. The docs say every rule and its status shows there. If yours is missing, check the extension is `.mdc`.
2. **The rule arrives.** Open a component file, start a new chat and ask: "What spacing values can you use in this file?" You want 4, 8, 16, 24, 32, 48, 64 back. If Cursor guesses, check that your glob matches that file.
3. **The audit gets shorter.** Run Prompt 1 on a screen built after you added the rule. The table should be a few rows.
4. **Two chats agree.** Build two small screens in two fresh chats. Padding, radius and buttons should match without you asking.

Two limits. The docs say rules don't affect Cursor Tab, so anything you accept from autocomplete still needs Prompt 3. And check contrast yourself. [The accessibility fixes](/writing/vibe-coding-accessibility-wcag-22-aa/) show how.

Rules cut drift. They don't end it. When Cursor repeats a mistake, add a line to the file.

## Where to go next

This file covers the decisions that repeat on every screen. The reasons behind them, plus hierarchy, copy and dark mode, are in [the 25 AI slop UI fixes](/writing/ai-slop-ui-fixes/).

A fuller DESIGN.md, with the prompts to fill it in, is in [27 Copy-Paste Prompts to Fix AI Slop UI](/fix-ai-slop-ui/). You can [try two prompts free](/fix-ai-slop-ui/#free) first.

Rather have a designer set the rules with you? That's the [AI-built app design fix](/services/ai-app-design-fix/).

To check the result, run your live app through the free [AI slop checker](/ai-slop-checker/). It scores how generated it looks from 0 to 100 and names the top three fixes. To write the rules file in a minute, answer five questions in the free [DESIGN.md generator](/tools/design-md-generator/).

## Questions people ask

### Where do Cursor rules for UI design go?

In your project, inside the `.cursor/rules` folder, as a file with the `.mdc` extension. A plain `.md` file in that folder is ignored. The older `.cursorrules` file in the project root is legacy, and Cursor's help page says it will be deprecated.

### Does Cursor read DESIGN.md automatically?

Cursor's rules docs don't list DESIGN.md among the files it picks up. They list project rules, user rules, team rules and AGENTS.md. To use a DESIGN.md, reference it from a project rule with `@DESIGN.md`, and keep the exact values in the rule body, because a referenced file is read only when Cursor needs it.

### Should I use AGENTS.md or a project rule for design rules?

Use a project rule when you want the rules to apply only to UI files, because it supports file patterns in `globs`. Use AGENTS.md when you want one plain markdown file with no setup. Cursor reads AGENTS.md in the project root and in subfolders.

### How long can a Cursor rules file be?

Cursor's docs say to keep a rule under 500 lines and to split large rules into smaller ones. The design rule in this article is about 50 lines.

### Do Cursor rules apply to Tab autocomplete?

No. Cursor's docs say rules apply to Agent in chat and do not affect Cursor Tab. Check accepted autocompletes with the pre-commit prompt.
