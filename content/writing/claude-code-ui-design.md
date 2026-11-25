_You asked Claude Code for a settings page. It built one in a minute. It works._

It also looks like the last five screens it built for you. Same font. Same soft purple. Same row of rounded cards.

So you type "make it look better". You get the same screen with a gradient on it.

Claude Code isn't broken. It's missing your decisions. Here is the setup: one rules file, one line that loads it every session, and three prompts.

## Why Claude Code UI looks generic

Anthropic says it plainly. Its own blog says that when you ask for a landing page without guidance, the result "will almost always conform to Inter fonts, purple gradients on white backgrounds, and minimal animations". The post calls this distributional convergence: safe design choices dominate the web data the model learned from, so without direction that is where the output lands.

The same post has the good news: "Claude is highly steerable with the right prompting."

That's why "make it look better" does nothing. It carries no decision. Anthropic's docs make the same point: "The more specific and concise your instructions, the more consistently Claude follows them."

"24px between cards" is specific. "Clean and modern" is not.

## Step 1: Write a DESIGN.md with exact values

Create a file called DESIGN.md in the root of your project. Keep it short. Every line should be a number or a rule Claude Code can check. Swap the [brackets] for your own.

```
# DESIGN.md
Rules for every screen in [product].

## Spacing
- Allowed values: 4, 8, 16, 24, 32, 48, 64px. Nothing else, except 1px borders.
- Related items sit 8px apart. Separate groups sit 24px or more apart.

## Type
- [font family], weights 400, 500 and 600 only.
- Body and input text: 16px or more, line height 1.5.

## Color
- Accent: [hex]. Only for primary actions, links and selected states.
- Neutrals: [background], [surface], [text], [muted text], [border].
- Text contrast: 4.5 to 1 or more.
- Status is never shown by color alone. Add an icon or a word.

## Layout
- Content max width 1200px, centered. Text max width 680px.
- Tap targets 44px or more.

## Buttons
- One filled primary button per task. Everything else is outline or text.

## States
- Every screen that loads or saves data has four states: empty, loading, error, success.

## Motion
- 150 to 250ms, only for real events. Respect prefers-reduced-motion.
```

These are the same values as [the 25 fixes](/writing/ai-slop-ui-fixes/), which gives the reason behind each one.

## Step 2: Make Claude Code read it every session

Claude Code reads a file called CLAUDE.md at the start of every session. It sits in your project root or in the .claude folder.

The obvious move is to add a sentence like "read DESIGN.md before UI work". That leaves the choice to Claude Code. The docs describe this case for another file, AGENTS.md: when CLAUDE.md only says in words to read it, Claude sees it "only if it decides to open the file".

Use an import. A line with @ and a path loads that file into context together with CLAUDE.md:

```
# CLAUDE.md

@DESIGN.md

## UI work
- Follow DESIGN.md for every UI change. Do not add a new color, radius, shadow or spacing value.
- If my request breaks a rule in DESIGN.md, stop and tell me. Then propose a fix.
- If a skill or plugin suggests a style that conflicts with DESIGN.md, DESIGN.md wins.
- Before you call a UI task done, check your diff against DESIGN.md and show me the result.
```

Three details from the docs:

- The path is relative to the file that holds the import. If both files sit in the project root, `@DESIGN.md` is right.
- In your real CLAUDE.md, write the import as plain text. Imports inside backticks or code blocks are skipped.
- Keep both files short. The docs suggest under 200 lines per CLAUDE.md and say longer files "reduce adherence". An import doesn't save context.

No CLAUDE.md yet? Run `/init` and Claude Code writes a starter one.

One honest limit. The docs say Claude "reads it and tries to follow it, but there's no guarantee of strict compliance". Rules cut the drift. They don't end it. The prompts below catch the rest.

## Step 3 (optional): Add Anthropic's Frontend Design plugin

Yes, there is an official one. It's called Frontend Design, it's marked "Anthropic verified" on Claude's plugin site, and it sits in Anthropic's official marketplace, which Claude Code adds by default. Inside a session, run:

```
/plugin install frontend-design@claude-plugins-official
```

That opens the plugin's details so you can review it and choose a scope.

Its listing says the skill "activates automatically" when you ask Claude to build frontend interfaces. The plugin aims for "bold aesthetic choices" and "high-impact animations", and it picks an aesthetic direction before it writes code. That helps on a landing page from scratch.

## 3 prompts to paste into Claude Code

### Prompt 1: Audit the screens you already have

```
Claude Code, audit the UI in [folder or route] against DESIGN.md. Do not change any files yet.

Flag every:
- spacing value that is not 4, 8, 16, 24, 32, 48 or 64px
- body or input text under 16px
- text contrast under 4.5 to 1
- tap target under 44px
- second filled primary button for the same task
- content wider than 1200px, or text block wider than 680px
- transition outside 150 to 250ms

Give me a table: file and line, the rule it breaks, the current value, the exact fix.
Then wait for me to choose what to fix.
```

### Prompt 2: Build the four states a screen needs

```
Claude Code, open [screen or component]. Tell me which of these four states exist today: empty, loading, error, success. Then build the missing ones. Follow DESIGN.md.

- Empty: say what goes here and what to do next. One filled primary button with a verb plus object label.
- Loading: a skeleton in the shape of the final layout, so nothing jumps when data arrives.
- Error: say what happened and how to fix it. Keep what the user typed. Offer a retry. Pair the error color with an icon or a word.
- Success: confirm what happened and show the next step. Transitions run 150 to 250ms, with a still version for prefers-reduced-motion.

All four: spacing only from 4, 8, 16, 24, 32, 48, 64px. Text 16px or more at 4.5 to 1 contrast. Tap targets 44px or more. One filled primary button per state.
Let me preview each state with realistic data, including a 60-character name and a value of zero.
```

### Prompt 3: Self-review before it says "done"

```
Claude Code, before you tell me this task is done, review your own diff against DESIGN.md.

Mark each line pass or fail, with the file and value as evidence:
1. Every margin, gap and padding is 4, 8, 16, 24, 32, 48 or 64px.
2. Body and input text is 16px or more.
3. Text contrast is 4.5 to 1 or more.
4. Every tap target is 44px or more.
5. Each task has exactly one filled primary button.
6. Content is 1200px wide at most. Text is 680px wide at most.
7. Motion runs 150 to 250ms and respects prefers-reduced-motion.
8. Anything that loads or saves data has empty, loading, error and success states.

Fix every fail, then run the list again.
If you can run the app, take screenshots at 375px and 1280px wide and check them too.
Show me the final list. Do not call it done while a line still fails.
```

Tired of pasting? Save a prompt as `.claude/skills/design-audit/SKILL.md` and it becomes the command `/design-audit`. The docs suggest a skill for any checklist you keep pasting into chat.

## How to tell it's working

- Run `/context`. CLAUDE.md should be listed under Memory files.
- Start a new session and ask "What is our spacing scale?" You should get 4, 8, 16, 24, 32, 48, 64 back. If Claude Code has to go looking, the import probably isn't loading.
- Ask for something that breaks a rule, like a second filled button. It should stop and tell you.
- Run Prompt 1 again next week. The table should be shorter.

Anthropic's best practices page says: "Give Claude a check it can run: tests, a build, a screenshot to compare." You can paste a screenshot straight into the prompt. With `claude --chrome` and the Claude in Chrome extension, it can open your local app in the browser.

If one rule keeps slipping, the same page says the file is probably too long. Cut lines before you add more.

## Where to go from here

This setup covers the base: spacing, type, color, buttons and states.

The full list is in AI Slop UI: 25 fixes, with the UX law behind each one. If contrast and tap targets were your fails, [the accessibility fixes](/writing/vibe-coding-accessibility-wcag-22-aa/) go deeper. The ebook, [27 Copy-Paste Prompts to Fix AI Slop UI](/fix-ai-slop-ui/), has a fuller DESIGN.md and all the prompts. You can [try two free](/fix-ai-slop-ui/#free) first.

Would you rather hand it to a designer? That's [this service](/services/ai-app-design-fix/).

## Questions people ask

### Why does Claude Code UI look generic?

Anthropic's own blog explains it. Without guidance, the output "will almost always conform to Inter fonts, purple gradients on white backgrounds, and minimal animations", because safe design choices dominate the web data the model learned from. The same post says Claude is "highly steerable with the right prompting". Give it exact values and the output changes.

### Does Claude Code read DESIGN.md automatically?

No. DESIGN.md is not one of the files the Claude Code docs list as loaded at launch. Claude Code reads CLAUDE.md at the start of every session. Add the line @DESIGN.md to CLAUDE.md and the docs say the imported file is loaded into context alongside it. A sentence that only tells Claude to read the file leaves it to Claude to open it.

### Is there an official Claude Code frontend design skill?

Yes. The Frontend Design plugin is marked "Anthropic verified" in Claude's plugin marketplace and sits in the official marketplace, claude-plugins-official. Install it in a session with /plugin install frontend-design@claude-plugins-official, or find it in the Discover tab of /plugin. Its skill activates automatically when you ask Claude to build frontend interfaces.

### Should design rules go in CLAUDE.md, a rules file or a skill?

Per the docs, CLAUDE.md is for facts Claude should hold in every session, so the short rules and the DESIGN.md import go there. A file in .claude/rules/ with a paths field loads only when Claude works with matching files, which suits rules for one part of a codebase. A skill suits a procedure you run on demand, like a design audit, because its body loads only when it is used.

### Will Claude Code always follow DESIGN.md?

No. The docs say Claude reads CLAUDE.md and tries to follow it, "but there's no guarantee of strict compliance, especially for vague or conflicting instructions". Keep the rules short and exact, and make Claude Code review its own diff against DESIGN.md before it finishes.
