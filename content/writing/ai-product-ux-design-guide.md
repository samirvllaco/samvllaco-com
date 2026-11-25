_Your model can do something impressive. That is not the same as a feature people use._

## The model is not the product

Most AI features ship the same way. A chat box in the corner, a blinking cursor and the words "Ask me anything". The user has to guess what it can do, type a good question, wait, read a long answer, decide whether to trust it, then copy the result somewhere useful. Five steps of work to save one.

Few people open it twice.

The AI products that get used look different. The AI does a specific job at the moment it is needed, inside the screen the person is already on, and it is obvious how to check the result and change it. That is a design problem, and it is the one I work on.

## Signs your AI feature has a UX problem

- Usage spikes at launch and drops within a month.
- People ask support what the assistant can do.
- The empty prompt box is the first thing users see, and most leave it empty.
- Users copy answers out of your product to edit them somewhere else.
- Nobody can tell a confident answer from a guess.
- The feature waits ten seconds and shows a spinner the whole time.
- When the model gets it wrong, the only option is to ask again.

## How I design an AI feature

**1. The job.** I start with what the person is trying to get done, not with what the model can do. "Reply to forty support tickets before lunch" is a job. "Chat with your data" is a capability looking for one.

**2. Where it sits.** Then I decide where the AI shows up. In the inbox as a drafted reply. Above the table as a summary. Next to the chart as an explanation of the drop. In the form as a suggested value. Chat is one pattern, and it is the right one less often than teams assume.

**3. When it speaks.** Some help should be there before anyone asks. Some should wait for a click. An assistant that interrupts is worse than none, so every proactive moment has to earn its place.

**4. The four states.** Prompt, loading, answer, error. Each one is designed, with real examples from your model, including the bad ones. I ask for the worst outputs you have seen, because the design has to hold when the model is wrong.

**5. Check, edit, undo.** For every piece of AI output I design three things: how the person sees where it came from, how they change it, and how they take it back. This is what makes a feature safe to rely on.

**6. Handover.** Your developers get organized Figma files, components with every state and notes to build from. If you have no front end developer, I can build it too.

## The decisions that make AI feel built in

**Do the first step for them.** A blank prompt is homework. Suggested prompts, a drafted first version or a one-click action give people something to react to. Reacting is easier than writing.

**Say what it can and cannot do.** One honest line under the input beats a help page nobody reads.

**Design the wait.** Jakob Nielsen's response time limits still hold. About 0.1 seconds feels instant. About 1 second keeps a person's train of thought. At about 10 seconds you lose their attention. Model calls often sit past that last line, so the wait needs a design: stream the answer as it forms, show what the system is doing in plain words, and let the person keep working while it runs.

**Show how sure it is, in words.** A percentage means little to most users. "Based on 3 of your documents" or "I could not find this in your data, so this is a general answer" tells them what to do next.

**Show the sources.** If an answer comes from the user's own data, link to the rows, the files or the messages it used. People trust what they can check.

**Make correction cheap.** Edit in place. Regenerate one paragraph, not the whole answer. Accept or reject each suggestion. The product gets better when fixing the AI is faster than doing the task by hand.

**Always offer undo.** Any action the AI takes on someone's behalf can be reversed with one click, and anything it cannot reverse asks first.

**Fail like a product, not like a model.** "Something went wrong" is not an error state. Say what happened, what the person can do, and keep what they typed.

**Do not hide the human path.** Every AI action has a manual way to do the same thing. On the day the model is slow or wrong, the product still works.

## Patterns I use, beyond chat

- **Inline draft.** The reply, the description or the summary appears in the field, ready to edit.
- **Suggestion chips.** Two or three likely next actions, one click each.
- **Summary on top.** A short read above a long table or thread, with links into the detail.
- **Explain this.** A button next to a chart or a number that answers "why did this change?"
- **Fill for me.** A form that completes what it can from context and marks what it guessed.
- **Command bar.** For power users who know what they want and want to type it.
- **Side panel assistant.** Chat, when the task is open-ended, placed where it can see and act on the current screen.

## What to measure after launch

An AI feature is not done when it ships. These five numbers tell you whether the design is working, and I set them up as part of the handover.

1. **Week-four use.** How many of the people who tried it are still using it a month later. Launch-week numbers measure curiosity.
2. **Accept rate.** How often the output is used as it is, used after an edit, or thrown away. A high throw-away rate is a design or a model problem, and the pattern of edits tells you which.
3. **Time to done.** How long the task takes with the feature against without it. If the AI path is slower, people will leave it.
4. **Retries.** How often people ask again for the same thing. Each retry is an answer that missed.
5. **Undo.** How often an AI action is reversed. Some undo is healthy. A lot means the feature acts before people are ready.

If you track only one, track week-four use.

## Work to look at

[Kestrel, a marketing dashboard](/work/marketing-dashboard/). A concept with an AI assistant built into the workflow, not parked in a corner.

[Language player](/work/language-player/). A concept for learning a language by watching shows. Tapping a word pauses the video and gives you the help at the moment you need it, which is the same principle: the assistance lives inside the task.

## If your whole app was built by AI

That is a different job. If you built the product with Cursor, Lovable or v0 and it looks generic, see the [AI-built app design fix](/services/ai-app-design-fix/). This page is for teams putting AI in front of their users.

## Bring the feature nobody opens

[Book a 30-minute call](/book/). Show me the AI feature and its usage. You leave with a scope, a timeline and one next step.

## Questions people ask

### Is an AI feature always a chat box?

No. Chat is one pattern. Often the better design is an AI action inside the screen people already use: a drafted reply, a suggested filter, a summary above the table. The feature should save a step, not add a window.

### My app was built with AI tools and looks generic. Is this the right service?

That is a different job. See the AI-built app design fix, or start with [the 25 fixes](/writing/ai-slop-ui-fixes/) I wrote up.

### Do you need access to our model to design the feature?

I need real outputs, good and bad, and a sense of how long a response takes. I do not need your weights or your prompts, though seeing the system prompt helps me write the interface copy around it.

### How do you design for answers that are wrong?

By assuming some will be. Every output can be checked against its source, edited in place and undone, and the interface says so when the system is unsure.

### Can you design the prompts and the onboarding too?

Yes. Suggested prompts, first-run guidance and the words around the feature are part of the work, because they decide whether people try it.
