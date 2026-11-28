_AI slop UI is the look every AI-built app ends up with: a purple gradient, glowing buttons, three identical feature cards and a "Get started" button. This is a free skill file that stops it at the source, for Claude Code and any tool that reads a rules file._

I wrote it from the fixes I make most often on AI-built apps. Download it, drop it in your project, and the next screen your tool builds follows rules instead of averages.

[Download SKILL.md](/skills/anti-ai-slop-ui/SKILL.md)

## What AI slop UI looks like

You have seen it even if you have not named it. The same tells show up in apps from Lovable, v0, Bolt, Cursor and Claude Code:

- A purple or violet gradient behind the hero, and a glow on the main button
- Spacing that changes from card to card: 12px here, 18px there, 22px below
- Five or six shades of gray where two would do
- Emoji standing in for icons
- Three feature cards with an icon, a title and a line that could describe any product
- "Get started", "Submit" and "Learn more" on every button
- No empty, loading or error states, because the model only built the happy path

None of these is wrong on its own. Together they tell people the app was generated, and people decide whether to trust an app before they read a word of it.

## Why prompts alone don't fix it

You can ask for "a clean, modern design" in every prompt, and the model will still pick the most likely value for each element. Most likely means average. The fix is to take the choice away: fixed values the tool has to use, a list of things it must not do, and a check it runs before it says it is done.

That is what a skill file is. In Claude Code, a skill is a folder with a SKILL.md inside. Claude reads the short description at the start of each session and loads the full file when a task matches, so the rules come in whenever you build or change UI, without you asking.

## What is in the skill

The file has five parts:

1. **Before you write any UI.** Read DESIGN.md if the project has one, name the screen's one action, and list the states it needs.
2. **Banned on sight.** Gradients, glow, a second accent color, emoji icons, spacing off the scale, more than one primary button, vague button labels, hype copy, the three-card default section.
3. **Default rules.** A spacing scale, seven type sizes, two weights, one accent with exact hex values, corner radius, contrast and focus, for projects with no DESIGN.md yet.
4. **Copy and states.** How buttons, errors and empty states are written, and the four states every screen needs.
5. **Before you finish.** A seven-point check the tool runs on its own work, then reports what it changed.

If your project already has a [DESIGN.md](/writing/design-md-template/), the skill uses your values instead of its defaults.

## How to install it in Claude Code

1. In your project, create the folder `.claude/skills/anti-ai-slop-ui/`.
2. Save [SKILL.md](/skills/anti-ai-slop-ui/SKILL.md) into it.
3. Start a new Claude Code session. Ask it to list the skills it can use; anti-ai-slop-ui should be there.

To use it in every project, put the folder in `~/.claude/skills/` instead.

## How to use it in Cursor, Lovable, v0 and Bolt

The rules work anywhere. Only where you put them changes:

- **Cursor:** paste the file's rules into a project rule in `.cursor/rules`, scoped to your UI files. [Step by step for Cursor](/writing/cursor-rules-for-ui-design/).
- **Lovable:** paste them into project instructions. [More on Lovable](/writing/lovable-app-looks-generic/).
- **v0:** save them as an Instruction. [More on v0](/writing/v0-app-looks-generic/).
- **Bolt:** paste them into project knowledge. [More on Bolt](/writing/bolt-app-looks-generic/).

## Fix the screens you already built

The skill shapes what gets built next. For what is already there, run this once:

```
Use the anti-ai-slop-ui skill. Audit every screen in this app against its "Banned on sight" list and its "Before you finish" check. List each problem by file and screen, most visible first. Do not change anything yet.
```

Then fix the list in this order: color and gradients, spacing, type, buttons, states. The first two change every screen at once.

## Check the result

Run your live site through [Slop Score](/slop-score/), a free AI slop checker. It scores how generated the site looks from 0 to 100 and lists the top fixes. Run it before you install the skill and again after the cleanup, and you will see what moved.

## Questions people ask

### What is AI slop UI?

The generic look of interfaces made by AI tools with no design rules: gradients, glow, uneven spacing, too many grays, emoji icons, vague buttons and missing states. The name comes from "AI slop", used for low-effort AI content in general.

### Is this skill free?

Yes. Download it, change it, share it. Keeping my name in it is appreciated.

### Will it make my app look like everyone else's who uses it?

No. The defaults are deliberately plain so they get out of the way. Add a DESIGN.md with your brand color, font and radius, and the skill follows yours. What it removes is the noise, not the personality.

### Does it work with Codex or other agents?

Any agent that reads Markdown instructions can use the rules. Put them where that agent looks for project instructions, such as AGENTS.md, and point to them in one line.

## Where to go next

I've designed more than 10,000 screens since 2013, and these rules are the first things I fix on AI-built apps. The skill covers the basics; [27 copy-paste prompts](/fix-ai-slop-ui/) go screen by screen, and [the 25 UI fixes article](/writing/ai-slop-ui-fixes/) explains each one. If you want it done for you, [I fix AI-built apps without a rebuild](/services/ai-app-design-fix/).
