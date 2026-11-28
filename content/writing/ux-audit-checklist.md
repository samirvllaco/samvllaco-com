_A UX audit checklist is the list of things you check on a product to find where people get stuck. This one has 30 checks in six groups, and you can run it yourself on one flow in about two hours._

Most checklists are a hundred lines long and nobody finishes them. This is the short version I use on the first pass of a paid audit. It finds most of the problems on most products. Pick your most important flow, usually sign up to first result, and go through it on a phone and on a laptop.

## Before you start

- Pick **one flow**. Auditing everything at once gives you a list too long to act on.
- Use a **new account**. You have forgotten what an empty product looks like.
- **Record your screen** and talk while you go. The moments you hesitate are the findings.
- Write each issue as **where, what happened, what should happen**.

## 1. First screen (5 checks)

1. Can a stranger say what the product does after five seconds?
2. Is there exactly one primary button?
3. Does the button say what happens next, with a verb and an object?
4. Is there proof near the top: a number, a customer or a review?
5. Does the page work at 390 pixels wide without sideways scrolling?

## 2. Sign up and onboarding (5 checks)

6. How many fields before a new user sees the product? Count them.
7. Can they sign up without confirming an email first?
8. Is every question asked at sign up used right away?
9. Does the first screen after sign up tell them the one thing to do?
10. How many minutes from sign up to the first useful result?

## 3. Navigation and structure (5 checks)

11. Is the current page always marked in the navigation?
12. Do labels use the user's words, not internal names?
13. Can every screen be reached in three clicks or fewer?
14. Does the back button do what people expect?
15. Is search there when a list is longer than about twenty items?

## 4. Forms and actions (5 checks)

16. Does every field have a visible label, not only a placeholder?
17. Do errors appear next to the field, and say how to fix the problem?
18. Is anything destructive confirmed, or better, undoable?
19. Do buttons show a loading state, and is double submit prevented?
20. After a successful action, does the screen say what happened and what is next?

## 5. States (5 checks)

21. Empty: does a new account see what will appear here and one button to add it?
22. Loading: is there a skeleton or spinner within a second?
23. Error: does the product say what went wrong in plain words?
24. No results: does a search or filter with no matches offer a way out?
25. Long content: what happens with a very long name, zero items and ten thousand items?

## 6. Readability and accessibility (5 checks)

26. Does all text have a contrast of at least 4.5 to 1? Test with the free [contrast checker](/tools/contrast-checker/).
27. Is body text 16 pixels or larger?
28. Can you finish the flow with the keyboard alone, with a visible focus ring?
29. Are touch targets at least 44 by 44 pixels on a phone?
30. Is color never the only signal for status?

## How to rank what you find

A list of forty issues does not get fixed. Give each one two scores:

- **Reach:** how many users hit it? Everyone, some, or few.
- **Damage:** does it stop them, slow them or only look wrong?

Fix first what everyone hits and what stops them. On most products that is three to five items, and they are usually in sign up, the first screen after it, or an empty state.

## Run it with an AI tool

If you build with Cursor, Claude Code or Lovable, paste this:

```
Audit the main flow of this app from sign up to the first result. For every screen list: the primary action, whether there is more than one filled button, any field without a visible label, any missing empty, loading or error state, any text under 16px, and any touch target under 44px. Group the findings by screen, mark each one as "stops the user", "slows the user" or "cosmetic", and do not change any code yet.
```

It will not see what a person sees, and it will miss confusion, but it catches the mechanical checks quickly.

## Questions people ask

### What is a UX audit?

A UX audit is a structured review of a product to find where people get confused, slowed down or stuck, with a ranked list of what to fix.

### How long does a UX audit take?

One flow takes about two hours with this checklist. A full audit of a product by a designer takes about a week, because it adds analytics, recordings and redesigned screens.

### What is the difference between a UX audit and usability testing?

In an audit an expert reviews the product against known rules. In usability testing real users try tasks while you watch. An audit is faster; testing finds problems no checklist predicts. Do the audit first, so the test is not spent on the obvious.

### Can I do a UX audit myself?

Yes, for the mechanical checks. It is hard to see your own product as a new user does, which is where an outside reviewer earns the fee.

## Where to go next

I've designed more than 10,000 screens since 2013, and this is the first pass of every audit I run. The [25 UI design mistakes](/writing/ui-design-mistakes/) go deeper on the visual side. If you want it done for you, see [how my UX audit works](/services/ux-audit/), or [ask for a free audit](/free-audit/) and I will send a Loom of what I would change first.
