_A SaaS dashboard redesign rarely needs a rebuild. In most products the data and the code are fine, and what has to change is what the first screen shows, in what order and in which words. That is two to six weeks of design work, done screen by screen while the product stays live._

Teams usually come to me after a year of adding things. Every customer request became a card, every card got a filter, and now new users open the dashboard and ask support where their numbers are. Here is how I decide whether a dashboard needs a redesign, what the work looks like, and how to do it without stopping the roadmap.

## Five signs your dashboard needs a redesign

1. **Support answers questions the dashboard already answers.** The number is on screen and people still cannot find it.
2. **Customers export to a spreadsheet** to see what they came for.
3. **Every card is the same size.** Nothing says what matters most.
4. **New features have nowhere to go,** so they land in a new tab that few people open.
5. **Demos start with an apology.** Sales says "ignore this part" on the first screen.

One of these is normal. Three or more and the layout is costing you renewals.

## Redesign or rebuild?

Redesign when the data is right and the screen is wrong. That covers hierarchy, layout, chart choice, table behavior, empty states and wording. Your developers change components and styles; the API stays.

Rebuild only when the product cannot return the data people need fast enough, or the front end is so tangled that changing a card takes a week. That is an engineering decision, and a redesign usually comes first because it shows what the rebuild has to support.

## How I run a dashboard redesign

- **Week 1: find the questions.** I read support tickets, watch three to five session recordings or customer calls, and list the questions people open the dashboard to answer. The top three decide the first screen.
- **Week 2: the first screen.** One headline number, one trend, one table, laid out with your real data, including the ugly cases: long names, zeros, a customer with 10,000 rows.
- **Weeks 3 and 4: the rest.** Detail pages, filters, empty, loading and error states, the phone width, and the components your developers need.
- **Handoff.** Figma files, a short written spec per screen and a rules file your AI tool or developers follow, so the next feature fits.

A single dashboard with a few detail pages fits in two to four weeks. A product with several dashboards takes up to six.

## Ship it without a big launch

A dashboard people use every day should not change overnight.

- **Start with the screen that hurts most,** usually the home dashboard.
- **Ship behind a switch** and let customers try the new view and go back.
- **Keep the numbers identical** between old and new. If a total differs, people stop trusting both.
- **Measure one thing:** support tickets about finding data, or how long it takes a new user to reach their first report.

## What a dashboard redesign costs

My projects start at $5,000 at one fixed price, agreed in writing before work starts. If you would rather test the fit first, a trial week on one screen is $2,500 and you keep what I make. [What dashboard design costs](/writing/dashboard-design-cost/) breaks the ranges down by size.

If you only want to know what is wrong, [ask for a free audit](/free-audit/) and I will send a Loom of what I would change first.

## Questions people ask

### How long does a SaaS dashboard redesign take?

Two to four weeks for one dashboard and its detail pages, up to six for a product with several. Development time comes on top and depends on your team.

### Will a redesign upset existing customers?

Not if you ship it screen by screen with a way back. People object to losing something they rely on, so I keep every number they use and change where it sits.

### Can you redesign a dashboard built with an AI tool?

Yes. I redesign what is there and write the rules into a file the tool reads, so new screens keep the same look. [How to fix the design of an AI-built app](/writing/how-to-fix-ai-built-app-design/) explains the routes.

### Do I need new charts?

Usually fewer. Most redesigns remove chart types. A line for trends, bars for comparison and a table for detail cover almost every dashboard.

## Where to go next

I've designed more than 10,000 screens since 2013. See [the marketing dashboard case study](/work/marketing-dashboard/) for a redesign from start to finish, read the [9 dashboard UX mistakes](/writing/dashboard-ux-mistakes/) to check your own, or see how [dashboard design](/services/dashboard-design/) works with me.
