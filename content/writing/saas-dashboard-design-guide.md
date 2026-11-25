_Someone opens it with a question. "Are we up or down this week?" "Which campaign is burning money?" "Who needs a call today?" A good dashboard answers that question before they scroll._

## A dashboard has one job

Most dashboards do not. They show everything the database holds, at the same size, in the order the tables were built. Twelve charts, four tabs, a date picker, and the one number that matters sits third from the left in the second row.

The result is always the same. People export to a spreadsheet to find the answer. Or they stop opening the dashboard and ask someone on the team.

I design dashboards from the question backwards. What does this person need to know, in what order, and what will they do about it. The charts come last.

## Signs yours needs work

- Customers ask support for numbers that are already on the screen.
- The export button is the most used feature.
- New users need a walkthrough to read the home screen.
- Every chart is the same size, so nothing looks more important than anything else.
- The table works with ten rows in the demo and falls apart with ten thousand in production.
- Each release adds a card, and nothing is ever removed.
- It was built by developers one feature at a time, and it shows.

If three of those sound familiar, the problem is not your data or your charting library. It is hierarchy, and hierarchy is a design job.

## How I design a dashboard

**1. The questions.** I start with a list, not a layout. Who opens this screen, how often, and what are the three questions they come with. A founder checking in on Monday and an operator living in it all day need different screens, even on the same data.

**2. Your real data.** I ask for a sample export before I draw anything. The long customer names, the zeros, the nulls, the account with 40,000 rows and the one with none. A dashboard designed on perfect data breaks on day one.

**3. The hierarchy.** One answer at the top, large. Then what changed and why. Then the detail for people who want to dig. I decide what earns the first screen and what moves behind a click, and I show you that as a rough layout before any polish.

**4. The charts and tables.** Each chart is chosen for the question it answers. A trend over time is a line. A comparison between items is a bar. A share of a whole is rarely a pie. A single number that matters is just the number, big, with the change next to it. Tables get the same care: what sorts, what filters, what happens when you select fifty rows.

**5. Every state.** Empty, loading, error, no permission, a filter that returns nothing, a date range with no data. These are the screens your users see in their first week, and they are the ones most dashboards never designed.

**6. Handover.** Your developers get organized Figma files, components with every state and notes to build from. If you have no front end developer, I can build it too.

## The decisions that make a dashboard readable

**What goes first.** The top of the screen is the most expensive space you have. It gets the answer to the main question and nothing else. Not a welcome message, not a banner, not a row of six equal cards.

**Fewer numbers, with context.** "4,218" means nothing alone. "4,218 signups, up 12% on last week" is an answer. Every key number gets a comparison: to last period, to target, or to average.

**The right chart, not the impressive one.** Gauges, radar charts and 3D anything look good in a pitch and read badly in use.

**Tables that survive real data.** Fixed headers, a first column that stays put, numbers right-aligned so they compare down the column, truncation with the full value on hover, and pagination or virtual scrolling decided before the build, not after the first customer complains. Bulk actions and a detail panel, so people do not open fifty rows one at a time.

**Filters people can see.** A date range and two or three filters cover most needs. They sit in one place, show what is active, and reset in one click. A filter panel with fourteen fields is a search form, and it belongs on its own screen.

**Density on purpose.** An analyst wants more on the screen. A founder wants less. I set the density for the person who uses it most, and keep it consistent, so the eye learns where things are.

**Color with meaning.** One accent. Red and green only for bad and good, and never as the only signal. Chart colors chosen to be told apart in both light and dark mode.

**Speed you can feel.** A dashboard that takes four seconds to show a number feels broken even when it is right. Skeletons in the shape of the layout, the top number first, the heavy charts after.

## Seven questions to answer before the call

You do not need a brief. If you can answer these, we can scope the work in 30 minutes.

1. Who opens this dashboard, and how often? Daily operators and monthly visitors need different screens.
2. What are the three questions they open it to answer?
3. What do they do after they have the answer? The next action belongs on the screen.
4. Which numbers are compared against a target, and which against last period?
5. How large is your largest account: rows, users, date range?
6. What do people export today, and what do they do with the export?
7. What does a brand new account see on day one, before any data exists?

Question 6 is the fastest way to find what the dashboard is missing. Whatever people rebuild in a spreadsheet is the screen they wanted.

## Where an AI assistant fits

More dashboards now ship with an assistant. Done well, it answers "why did this drop?" next to the chart that dropped. Done badly, it is a chat bubble in the corner that nobody opens. If that is part of your product, see [AI product UX](/services/ai-product-ux/). I design the two together so the assistant lives inside the workflow.

## Work to look at

[Kestrel, a marketing dashboard](/work/marketing-dashboard/). A concept for tracking marketing and lead performance, with an AI assistant built into the workflow. It shows the approach above on one screen: the key number first, the change next to it, the detail below.

[Eye care web app](/work/eye-care-web-app/). A product where people check their numbers every day and need to see what changed.

## Redesign without a rebuild

You usually do not need to start over. Most of the gain comes from hierarchy, grouping and table design, and those fit the components you already have. I work inside your existing library where I can, and flag the few places where a new component is worth the build time.

## Start with the screen that hurts

[Book a 30-minute call](/book/) and bring your worst screen. You leave with a scope, a timeline and one next step.

## Questions people ask

### What do you need from me to design a dashboard?

The questions people open it to answer, and real sample data, including the long names, the zeros and the empty rows. A dashboard designed on perfect data breaks on day one.

### Can you redesign a dashboard without rebuilding it?

Usually, yes. Most of the gain comes from hierarchy, grouping and table design, and those fit the components you already have.

### Which charting library should we use?

The one your developers already know. I design to what it can render well, and I check the hard cases, long labels, empty series, hundreds of points, before handing over.

### Do you design dashboards for mobile?

Yes. A phone dashboard is not the desktop one squeezed. It shows the top answer and the alerts, and leaves the deep tables for a larger screen.

### Can you add an AI assistant to our dashboard?

Yes. I design where it sits, what it can answer and how people check its work, so it saves a step and does not add a window.
