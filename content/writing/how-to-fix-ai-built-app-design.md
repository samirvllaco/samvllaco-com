_You shipped a working product without a design team. That part is real, and it was hard._

## Why your app looks like every other AI-built app

The look is a separate problem. Nobody told your AI tool what your product should look like, so it filled the gap with the safest choice it knows. It did that on every screen. Safe means common. Common means the same gradient, the same three feature cards and the same pale grey text as the next app.

Asking again doesn't fix it. "Make it cleaner" has no numbers in it. The tool swaps one common answer for another, and you lose an evening.

This is the job of a [vibe-coded app designer](/services/ai-app-design-fix/). I'm Sam. I've designed products for more than 10 years, and I build my own with the same AI tools you use. They give me the same first drafts they give you. What changes the result is a set of decisions the tool could not guess, written down so it stops guessing.

Nothing gets rebuilt. Your features stay. Your structure stays.

There are three ways to get those decisions into your app. One of them costs $12.99, and further down I'll tell you when that one is all you need.

## What I check first

Before I change anything, I open your app and look for the tells. These are the details that make a visitor think "AI made this" in the first few seconds. There are twelve I look at first.

1. **Color with no job.** I ask what each color on your busiest screen means. When the accent sits on buttons, cards, icons and badges at once, nothing leads. It goes back to a neutral base, one accent and status colors that never change meaning.
2. **Spacing nobody chose.** I measure the gaps. 13px here and 18px there means the numbers were never picked. Everything moves to one scale: 4, 8, 16, 24, 32, 48, 64. Things that belong together sit close. Separate groups sit further apart.
3. **Type without steps.** Five sizes that look nearly alike. Four weights. Body text under 16px. I cut it to one or two families, two or three weights, and size jumps you can see without looking for them.
4. **Boxes in boxes.** A card in a card in a panel, with a badge on every heading. I remove each box that isn't something you act on. Badges stay only where they show real status.
5. **A headline that fits any product.** If your hero could sit on a competitor's site and still make sense, it says nothing. I rewrite it to name the outcome, who it's for and how fast. Under it goes a real screenshot, not a floating shape.
6. **Only the good day is designed.** I empty a list, break a form and load a slow page. A first draft usually covers the case where the data exists and nothing fails. Your new users start on the empty one. So empty, loading, error, success and 404 each get a real screen.
7. **Sample data that is too tidy.** I try a 60-character name, a zero, a single item and 3,000 rows. If the layout breaks, it breaks for me and not for your customer.
8. **Every button is the main button.** One filled button per task. The rest become outline or plain text. Then each button gets all its states: hover, pressed, focus, disabled and loading.
9. **Text you have to squint at.** Pale grey on white fails. Every text color gets checked against 4.5 to 1, and status never depends on color alone.
10. **Parts from different kits.** Two icon sets, five corner sizes, three border colors. It comes down to one icon set, one stroke weight, one border color and a small set of corner sizes.
11. **A desktop screen squeezed onto a phone.** Tap targets under 44px. Input text under 16px. The main action where no thumb reaches. I check it on a real phone, in one hand.
12. **Motion and words on autopilot.** Cards that lift and glow on hover. A button that says "Submit". An error that says "Something went wrong". Motion gets cut to 150 to 250ms and kept for real events. Buttons say what they do. Errors say how to fix the problem.

The full list, with the reason behind each one, is in [the 25 fixes](/writing/ai-slop-ui-fixes/). The keyboard and screen reader side has its own guide: [12 accessibility fixes for AI-built apps](/writing/vibe-coding-accessibility-wcag-22-aa/).

One number, so you know these are not rare. WebAIM scans the home pages of the top one million websites every year. In its February 2026 scan, 83.9% had low contrast text and 51% had form inputs with no label.

## A Cursor UI design prompt to audit your app

Want to test your own app right now? Paste this into Cursor. It only audits. It changes nothing.

```
Audit the UI of this app. Do not change any code yet.
Check every screen against these rules:
- Spacing: every margin, gap and padding is 4, 8, 16, 24, 32, 48 or 64px.
- Type: body text and input text are 16px or more.
- Contrast: all text is at least 4.5 to 1 against its background.
- Touch: every tap target is at least 44px wide and 44px tall.
- Motion: transitions run 150 to 250ms. No hover lift, tilt or glow.
- Buttons: one filled primary button per task.
- States: every list and form has empty, loading, error and success states.
List every break with the file, the current value and the value it should be.
Rank the 10 worst first.
Then stop and wait for my go-ahead before you edit anything.
```

Cursor reads an AGENTS.md file in your project root. When you agree with the list, ask it to save those rules there, so the next screen starts from them.

If the list is short, fix it yourself. If it runs long, or you can't tell which items matter, keep reading.

## Three ways to fix it

Start with the cheapest one that solves your problem. Here is how to tell which that is.

### 1. Fix it yourself with the ebook: $12.99

[27 Copy-Paste Prompts to Fix AI Slop UI](/fix-ai-slop-ui/) is 59 pages and 27 steps, one prompt per step. You also get four plain files to drop into your project (DESIGN.md, SCORECARD.md, PROMPTS.md and UX-LAWS.md) and a private 15 to 30 minute video where I fix an AI-built page on screen. The book is updated every week, and each new version is yours.

The quick start takes 30 minutes and covers color, type, spacing and the hero. All 27 steps take about an hour per page.

This is enough when you have one page or a small app, you're happy to run the prompts yourself, and what bothers you is the surface: color, type, spacing, the hero, the cards. For a lot of founders that is the whole problem.

Not sure? [Try two of the prompts for free](/fix-ai-slop-ui/#free) before you pay anything. There is a money-back guarantee on the book too.

### 2. Get a recorded review: $49 or $99

You can fix things. You just don't know what to fix first. That's what a review is for. Both come from [the same page](/fix-ai-slop-ui/#options).

For $49 I record a 20 to 30 minute Loom made only for your product: what holds up, what doesn't and the reason for each. You get a steps document with the fixes in order, and the book is included. If it doesn't help, you get a full refund.

For $99 I go through the whole product: UI, UX and brand, across your website and the key screens of your app. The Loom runs 45 minutes to 1 hour. You get a UI/UX score out of 10, an action plan with the biggest impact first, custom prompts written for your product, branding tips on colors, type and logo use, and the book.

Either way, you have the Loom in under 12 hours.

A review is enough when you have the time and the skill to make the changes and you want a senior designer to point at the right ones. You still do the work.

### 3. Have me fix it: projects start at $5,000

I go through every main screen with the 25 fixes in hand, redesign them on real spacing, type and color rules, and leave a DESIGN.md file for your AI tool to follow. If you want, I build the fixes into your code too.

You get a fixed price and a timeline in writing after the first call. No hourly meter.

Pick this when people already pay for the app or are about to, when the problem runs across many screens, or when your time is better spent on the product than on prompts.

And if only your landing page looks off, don't hire me yet. Start with option 1.

## The four options side by side

- **What you get:** Prompt the AI again: Another version of the same screen; The ebook: 27 prompts in 59 pages, four rules files, a private 15 to 30 minute video, weekly updates; A recorded review: $49: a 20 to 30 minute Loom, a steps document, the book. $99: a 45 minute to 1 hour Loom, a score out of 10, an action plan, custom prompts, branding tips, the book; Hire me: A review of every main screen, redesigned screens, a DESIGN.md file, fixes in your code on request.
- **Who decides what "better" means:** Prompt the AI again: The AI; The ebook: You, with my rules; A recorded review: Me. You apply it; Hire me: Me, with you.
- **Your effort:** Prompt the AI again: Unknown. You stop when you give up or get lucky; The ebook: 30 minutes for the quick start, about an hour per page for all 27 steps; A recorded review: Send your link and notes, then make the fixes yourself; Hire me: A 30-minute call, then feedback as the work is shared.
- **Cost:** Prompt the AI again: Your time; The ebook: $12.99, one-time, money-back guarantee; A recorded review: $49 or $99, one-time; Hire me: From $5,000, fixed price in writing after the first conversation.
- **Best when:** Prompt the AI again: The fix is one small thing you can name exactly; The ebook: The problem is visual and you like doing it yourself; A recorded review: You can do the work but not the diagnosis; Hire me: The app earns money or is about to, and the problem is on many screens.

## What happens when you hire me, step by step

1. **You book a 30-minute call.** Pick a time and tell me what you're building and your rough budget. I read it before we talk. The call is with me, and I'm the one who does the work.
2. **You get the scope in writing.** A fixed price and a timeline, after that first call. I usually start within one to two weeks of it, and I take one or two new projects at a time.
3. **I review every main screen.** Each one is checked against the 25 fixes, so we both know what is wrong and why before anything changes.
4. **I redesign the screens.** Spacing, type, color, states and copy. The structure of your app stays. You watch the work in a shared Figma file as it happens, with short written updates and a call when there is something to decide.
5. **I write your DESIGN.md.** The rules behind the new screens, in one file your AI tool reads. Your next screen starts from your rules and not from the average.
6. **The fixes go into your code, if you want that.** Say so on the call and it becomes part of the scope.
7. **Handover.** You get the files, the components and my notes, organized so anyone can build from them. All of it is yours.

I work in Central European Time and take calls in US business hours. I sign an NDA if you need one.

## What I can show you today

Here is the proof I have, and what each piece is.

**The numbers.** 10+ years of product design. 570+ clients. 10,000+ screens.

**The work.** [The case studies](/work/) show the standard I design to: dashboards, web apps, mobile apps and marketing sites.

**A before and after you can drag.** The book page has four sample products, each shown as a first AI draft and again with the rules applied. They are samples with fictional brands, made for that page. They show the method. They are not client projects.

**What clients say about working with me.** These are reviews of my design work in general, from other kinds of projects. None of them is about this service.

_"We worked with Samir during a critical moment when our business model shifted, and our original designs no longer fit our needs."_

Client review, product redesign in Figma, 2025

_"Working with Samir on my UX/UI Consultation was an absolute pleasure! His expertise and attention to detail resulted in a design that not only met but exceeded my expectations."_

Client review, UI/UX design consultation, 2024

_"I had the absolute pleasure of working with Samir on several projects, and I must say, WOW! He consistently delivers exceptional work."_

Client review, landing page and web app, 2024

**The low-risk start.** The book has a money-back guarantee. The $49 review is refunded in full if it doesn't help. You can find out how I think for $12.99 or $49 before you spend $5,000.

## Is this the right service for you?

It fits when the app works and the complaint is how it looks and reads.

It's the wrong page when the problem is something else:

- People get lost or drop off, and you can't say where. That is a flow problem. Look at the [UX audit](/services/ux-audit/).
- Several people or several AI tools build screens that don't match. You need a [design system](/services/design-systems/), and a DESIGN.md is one part of it.
- You haven't built it yet and want it designed properly from the first flow. See [SaaS product design](/services/saas-product-design/).
- It's a native iOS or Android app and it feels like a website on a phone. See [mobile app design](/services/mobile-app-design/).

Not sure which one you are? Ask me. I'd rather send you to the $12.99 option than sell you a project you don't need.

## Pick your next step

- **Tonight, for free:** copy two prompts from the book and run them on your app.
- **Done for you:** book a 30-minute call. Bring the screen you're least happy with. After the call you get a fixed price and a timeline in writing.

Not sure how much there is to fix? Run the live app through the free [AI slop checker](/ai-slop-checker/) first. I also measured how common each problem is in [AI slop statistics from 100 new launches](/writing/ai-slop-statistics/). If the app was built in Lovable, read [when to hire a Lovable designer](/writing/hire-lovable-designer/).

## Questions people ask

### Can't I just keep prompting until it looks good?

You can, and it sometimes works for one small thing. For a whole app it rarely does, because "better" means nothing to the tool. What works is giving it exact values, the reason for them, and a rules file it reads every time. If you want to keep doing it yourself, that is what the ebook is for. Try the two free prompts first.

### Is the $12.99 ebook enough, or do I need to hire a designer?

Often the ebook is enough. If what bothers you is color, type, spacing and the hero, and you have one page or a small app, start there. Hire me when the problem is on many screens, when people already pay for the product, or when you've tried and can't tell whether the new version is better. In between sits a recorded review from $49: I tell you what to fix and in what order, and you do it.

### Will you work in my code, or only in Figma?

Design happens in Figma first. You get the redesigned screens and a DESIGN.md file, and you or your AI tool can apply them. If you'd rather not do that part, I build the fixes into your code as part of the scope. Tell me on the first call so the price covers it.

### If I keep building with AI after you're done, will it go back to looking generic?

Less, and not never. The DESIGN.md file holds your spacing, type, color and copy rules, and your AI tool reads it before it makes a new screen. Rules cut the drift. They don't end it, so check each new screen against the file. If several people build on the product, a design system is the next step.

### How long does it take to fix the design of an AI-built app?

It depends on the route. The ebook's quick start takes 30 minutes, and all 27 steps take about an hour per page. A recorded review reaches you in under 12 hours. A project with me usually starts within one to two weeks of the first call, and the timeline is fixed in writing before I begin.
