_Every AI answer arrives in the same confident voice, whether it is right or invented. The interface has to do what the model will not._

A model writes a guess and a fact in the same tone. Same font, same fluent sentences, same lack of hesitation. The user has no signal for which is which, so they do one of two things. They trust everything, and get burned. Or they trust nothing, check everything by hand, and the feature saves them no time.

Both are design failures. The job is to give people enough to decide, quickly, how much weight to put on what they are reading.

## Why a percentage does not work

The obvious answer is a confidence score. "87% confident." It looks precise and helps almost nobody.

- People do not know what to do differently at 87% than at 74%.
- It says how sure, not why, and why is what tells someone where to look.

A score can be useful behind the scenes, to decide which of the patterns below to show. It is rarely the right thing to put on the screen.

## 1. Say what the answer is based on

The single most useful line you can add: "Based on 14 invoices from October" or "From your last 30 days of orders". It tells the person the scope, and they can judge for themselves whether that scope is enough. An answer drawn from three documents and one drawn from three hundred look identical until you say so.

## 2. Link to the source

Every claim that came from the user's data links to the row, the file or the message behind it. One click to check. People do not check every answer, but being able to is what makes them trust the ones they do not check.

When a claim has no source, that is information too. Mark it.

## 3. Separate what it found from what it inferred

"Revenue fell 12% in October" is a lookup. "Probably because of the pricing change" is a guess. Show them differently. Facts stated plainly, with a source. Inferences labelled as such, in words: "Possible cause". A different treatment on screen does more than any disclaimer.

## 4. Use words for uncertainty, and only when it matters

When the system is unsure, say so in a short plain sentence at the point it matters:

- "I could not find this in your data. This is a general answer."
- "Two records conflict. I used the more recent one."
- "This covers January to March only. April is missing."

Each one tells the person what to do next. Compare that with a gray footer on every answer saying "AI can make mistakes". Shown everywhere, it is read nowhere. Save the warning for when there is something to warn about.

## 5. Flag the guesses inside a result

When the AI fills a form or builds a table, some values are certain and some are guessed. Mark the guessed ones, with a different background or a small label, until the person confirms them. They review five flagged fields and not all forty. This is the pattern that saves the most time, because it points the checking at the places that need it.

## 6. Let it say it does not know

An empty answer is better than an invented one. Design the "I do not know" state as carefully as the answer: what it looked for, where it looked, and what the person can try. "I searched your contracts and found no renewal date for Acme. It may be in a document that is not uploaded."

A product that says this when it should is one people believe the rest of the time.

## Make being wrong cheap

None of this makes the model right. It makes the person faster at catching it when it is wrong. So the other half of trust is repair:

- Edit the output in place.
- Regenerate one part without losing the rest.
- Undo anything the AI did, with one click.
- A quick way to say "this was wrong", so the product can learn where it fails.

People forgive an assistant that is wrong sometimes and easy to correct. They do not forgive one that is wrong sometimes and hard to catch.

## How to decide what to show

Match the effort to the stakes.

- **Low stakes, easy to see if it is wrong,** such as a suggested subject line: show the output and an easy edit. Nothing more.
- **Medium stakes,** such as a summary someone will forward: say what it is based on and link the sources.
- **High stakes, hard to check,** such as numbers in a report or anything that triggers an action: sources, flagged guesses, and a confirmation before anything is sent or changed.

## Part of a bigger job

Showing what the AI knows is one piece of making a feature people rely on. The others are where it sits, covered in [AI UX beyond the chat box](/writing/ai-features-beyond-chat/), and what happens while it works, covered in [AI loading states](/writing/ai-loading-states/). If you want all of it designed for your product, that is [AI product UX](/services/ai-product-ux/).

## Questions people ask

### Should an AI product show a confidence score?

Rarely. A percentage does not tell users what to do differently. Saying what the answer is based on and linking to the source helps more.

### How do you get users to trust AI output?

Let them check it and fix it. Show the sources, mark what is inferred, flag guessed values, and make every output easy to edit and undo.

### How should an AI feature show uncertainty?

In a short plain sentence at the point it matters, such as "I could not find this in your data". Avoid a blanket disclaimer on every answer, because people stop reading it.

### What should an AI do when it does not know the answer?

Say so, and say what it looked for and where. A clear "not found" with a next step is more useful than a confident guess.
