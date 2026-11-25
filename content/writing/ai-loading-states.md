_Your AI feature takes fifteen seconds to answer. For fourteen of them, the screen shows a spinner. That is where you lose people._

Most loading patterns were designed for waits under two seconds. A spinner says "something is happening" and that is enough when the something ends almost at once.

AI changed the length of the wait and most products kept the spinner. So the user stares at a circle with no idea whether it will take three seconds or thirty, whether it is working or stuck, and whether they should wait or go and do something else.

## The three limits

Jakob Nielsen's response time limits are over thirty years old and still the best guide there is:

- **About 0.1 second** feels instant. No feedback needed.
- **About 1 second** is the limit for a person's flow of thought to stay unbroken. They notice the delay but stay with the task.
- **About 10 seconds** is the limit for keeping attention. Past that, people want to do something else while they wait.

A model call often lands past the third limit. So the wait is not a gap between two screens any more. It is a screen, and it needs designing.

## 1. Acknowledge at once

The moment someone presses the button, something changes within 0.1 second: the button shows a working state, their request appears in the thread, the input clears. The model can take its time. The interface cannot.

## 2. Stream the answer

If the output is text, show it as it arrives. A response that starts in one second and finishes in fifteen feels faster than one that appears complete after eight, because the person is reading, not waiting. Streaming turns dead time into reading time.

Two rules for streaming. Keep the page from jumping as text arrives: fix the scroll position unless the person is already at the bottom. And hold back actions such as Copy and Apply until the answer is complete, so nobody acts on half a sentence.

## 3. When you cannot stream, show the stages

Some outputs only make sense whole: a chart, a table, an image, a generated file. For those, say what is happening in plain words, and change the message as the work moves on.

```
Reading your 3 files
Finding the numbers that changed
Writing the summary
```

Real stages, in the user's language. Not "Processing" and not "Thinking" for fifteen seconds. If you know there are three steps, show three steps and tick them off.

## 4. Use a skeleton for known shapes

If you know the result will be a card with a title, three lines and a chart, show that shape in gray while it loads, at the real height. The layout does not jump when the content lands, and the person already knows where to look.

## 5. Say how long

People tolerate a wait they can size. "Usually takes about 20 seconds" under the progress message is enough. If you can show real progress, such as page 4 of 12, show it. Never show a progress bar that is not tied to anything real. People notice when it sits at 90% for a minute.

## 6. Let them leave

Past ten seconds, do not hold the screen hostage. Let the person keep working elsewhere in the product and tell them when it is done: a badge, a toast, a row in a list that changes from Running to Ready. For anything over a minute, offer an email or a notification.

This one change turns a long wait from a problem into a background job.

## 7. Always offer stop

A Stop button next to anything that runs longer than a few seconds. People realise they asked the wrong question half a second after asking it. Stopping should keep whatever has arrived so far and keep their prompt, so they can edit it and try again.

## When it takes too long, or fails

Set a time after which the interface speaks up. "This is taking longer than usual. Keep waiting or try again?" is better than an endless animation.

And when it fails, say what happened, keep what they typed, and give one button to retry. Losing a carefully written prompt to an error is the fastest way to make someone stop using the feature.

## The copy

Small words carry the wait. A few I use:

- Under 3 seconds: no text, just the working state on the button.
- 3 to 10 seconds: one line naming the stage. "Reading your document".
- Over 10 seconds: the stage, plus the usual time, plus Stop.
- Over the usual time: "Taking longer than usual", with Keep waiting and Try again.

No jokes, no "Hang tight", no "Working our magic". The person is waiting. Tell them what for.

## Part of a bigger job

The wait is one of four states every AI feature needs: prompt, loading, answer and error. I design all four as part of [AI product UX](/services/ai-product-ux/). For where the feature should sit in the first place, see [AI UX beyond the chat box](/writing/ai-features-beyond-chat/).

## Questions people ask

### How long will users wait for an AI response?

Attention holds for about ten seconds, by Nielsen's response time limits. Past that, people stay only if they can see progress, read a streaming answer or carry on with something else.

### Should AI responses be streamed?

Yes, when the output is text. Streaming lets people start reading within a second, which makes a long response feel shorter than a quicker one that arrives all at once.

### What should an AI loading state say?

The real stage of the work in plain words, such as "Reading your 3 files", and for longer waits the usual time and a Stop button. Avoid a bare spinner or the word "Thinking" for more than a few seconds.

### Is a spinner enough for an AI feature?

Only for waits of a second or two. For longer waits it gives no sense of progress or length, which is when people give up.
