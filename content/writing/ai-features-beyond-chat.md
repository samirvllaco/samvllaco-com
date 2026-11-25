_Every product added a chat box. The AI features people use every day look nothing like chat._

A chat box is the easiest AI feature to build. You wire a text field to a model and ship it. That is why every product has one, and why most of them feel the same: a bubble in the corner, a greeting and "Ask me anything".

The trouble is what chat asks of the user. They have to know what the AI can do, put a request into words, wait, read a block of text, judge whether it is right, and move the result to where they needed it. That is a lot of work for a feature that was meant to save some.

Chat is one pattern. Here are seven others, and when each one fits.

## 1. The inline draft

The AI writes a first version in the field where the person was about to type. A reply in the support inbox. A product description in the listing form. A summary in the ticket.

**Use it when** the output is text that will be sent or saved, and a good first draft saves most of the time.

**Design it so** the draft is clearly marked as a draft, it is editable like any other text, and one click removes it. Never send on the user's behalf without a look.

## 2. Suggestion chips

Two or three likely next steps, shown as buttons. "Summarise this thread." "Find similar customers." "Draft a follow-up."

**Use it when** you can predict what people want at this point on this screen. Which is more often than you would think.

**Design it so** the chips change with context. The same three chips on every screen become wallpaper within a week.

## 3. The summary on top

A short read above something long: a table, a thread, a report, a call recording. Three lines that say what matters, with links into the detail.

**Use it when** people arrive at a dense screen and need to know where to look.

**Design it so** every claim in the summary links to the rows or messages behind it. A summary nobody can check is a summary nobody trusts.

## 4. Explain this

A small button beside a number or a chart. Press it and the product says why the number moved. "Signups fell 18% because the pricing page had 40% fewer visits from search."

**Use it when** your product shows data and users keep asking why.

**Design it so** the explanation appears next to the chart, not in a panel on the other side of the screen, and it names the data it looked at.

## 5. Fill for me

A form that completes what it can from what it already knows, and marks the fields it guessed. Category, tags, due date, assignee.

**Use it when** you have forms with fields people find tedious and the answer can be inferred most of the time.

**Design it so** guessed fields look different from confirmed ones until the person accepts them. A wrong guess that looks like a fact is how bad data gets in.

## 6. The command bar

A keyboard shortcut opens one input. The user types what they want in plain words and the product does it. "Move all overdue invoices to the follow-up list."

**Use it when** you have power users who know the product and want speed.

**Design it so** the bar shows what it is about to do before it does it, and anything it changes can be undone.

## 7. Quiet automation

The AI does something without being asked, and tells you after. Sorted the inbox. Flagged three risky accounts. Matched the payment to the invoice.

**Use it when** the task is routine, the cost of a mistake is small and the action is easy to reverse.

**Design it so** there is a visible record of what was done, an undo, and a way to turn it off. Automation people cannot see feels like the product acting on its own.

## When chat is the right answer

Chat earns its place when the task is open-ended and takes several turns. Exploring a data set with follow-up questions. Planning something with many constraints. Working through a problem where the person does not yet know what to ask.

Even then, three things make it better:

- **Put it in a side panel that can see the current screen,** so "why is this one late?" works without explaining which one.
- **Start with suggested prompts** written for that screen, not a blank box.
- **Let answers act.** A reply that ends with "Apply this filter" or "Create the task" is worth more than one the user has to carry out by hand.

## Four rules that apply to all of them

**Design the wait.** Jakob Nielsen's [response time limits](https://www.nngroup.com/articles/response-times-3-important-limits/) put about 1 second as the point where a person's train of thought breaks, and about 10 seconds as the point where you lose their attention. Model calls often run longer. Stream the answer, say what is happening in plain words, and let the person keep working.

**Say what it used.** "Based on your last 30 days of orders" does more for trust than any confidence score.

**Make fixing it cheap.** Edit in place, regenerate one part, accept or reject each suggestion. If correcting the AI takes longer than doing the task, people will do the task.

**Keep the manual path.** Every AI action has an ordinary way to do the same thing. On the day the model is slow or wrong, the product still works.

## How to choose

Ask one question about the task: does the person know what they want?

- They know, and it is routine: quiet automation or fill for me.
- They know, and it is text: the inline draft.
- They know, and they are fast: the command bar.
- They need a nudge: suggestion chips.
- They are looking at something dense: the summary on top or explain this.
- They do not know yet: chat, in a side panel.

Most products need two or three of these, not all seven. Pick the task where your users lose the most time and start there.

## See it in a product

[Kestrel](/work/marketing-dashboard/) is a marketing dashboard concept with the assistant built into the workflow. The [language player](/work/language-player/) is a concept where help arrives when you tap a word in a subtitle, at the moment you need it and nowhere else.

If you are adding AI to a product and want it to feel built in, [that is the work I do](/services/ai-product-ux/). [Book a 30-minute call](/book/) and bring the feature nobody opens.

## Questions people ask

### Does an AI feature have to be a chatbot?

No. Chat is one pattern among several. Inline drafts, suggestions, summaries and automation often serve the task better because they sit inside the screen the person is already using.

### Why do users ignore AI chat features?

A blank chat box makes the user do the work: guess what it can do, write a request, read a long answer and move the result somewhere useful.

### When is chat the right interface for AI?

When the task is open-ended and needs several turns, such as exploring data or planning with many constraints. It works best in a side panel that can see and act on the current screen.

### How do you make users trust AI output?

Show what it was based on, link to the source, make it easy to edit and always offer undo. Trust comes from being able to check and correct, not from a confidence number.
