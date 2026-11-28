_A customer acquisition dashboard shows how many customers you won, what each one cost and which channels they came from. Build it around one funnel, one cost number and one table by channel, and a marketing lead can decide where next month's budget goes in a minute._

Most acquisition dashboards are a wall of charts copied from an ad platform. They show clicks and impressions in detail and hide the one thing the team needs: which channel brings customers who pay. Here is what to put on the screen and how to arrange it.

## What a customer acquisition dashboard is for

It answers one question: where should the next dollar go? Everything on the page either helps answer that or moves to another screen.

That means it follows people from first visit to paying customer, and it puts cost next to result. A dashboard that stops at sign-ups rewards the channel with the cheapest sign-ups, which is often the one with the worst customers.

## The metrics to show

1. **New customers.** Paying customers won in the period, with the change against the last one.
2. **CAC.** Sales and marketing spend divided by new customers. Show it blended, and by channel in the table.
3. **CAC payback.** Months of margin needed to earn the cost back. This is what makes a high CAC acceptable or not.
4. **Conversion rate by step.** Visit to sign-up, sign-up to activated, activated to paid.
5. **Spend.** Total for the period, against budget.
6. **LTV to CAC.** Lifetime value divided by acquisition cost. Useful once you have enough history to trust the lifetime value.

Leave impressions, click-through rate and cost per click to the ad platforms. They explain a change in CAC; they are not the result.

## How to lay it out

- **Top row: three numbers.** New customers, CAC and CAC payback, each with its change and a 12-week line. New customers is the largest.
- **Second row: the funnel.** Horizontal bars for each step with the count and the rate between steps. People compare bar lengths faster than they read a funnel-shaped graphic.
- **Third row: the channel table.** One row per channel: spend, sign-ups, customers, CAC, payback. Sorted by customers, sortable by any column, numbers right-aligned.
- **Last: the trend.** New customers by week, stacked by channel, so a change in the mix is visible.

One date range control for the whole page, top right. A separate range on each chart is how two people end up arguing over two different numbers.

## The details that make it trustworthy

- **Say how customers are attributed.** One line under the table: first touch, last touch or something else. Without it nobody trusts the channel numbers.
- **Show the period's lag.** Customers who signed up this week have not had time to pay. Mark recent weeks as incomplete so a dip at the right edge is not read as a problem.
- **Give "Unknown" its own row.** Hiding unattributed customers makes every other channel look better than it is.
- **Empty states.** A new channel with spend and no customers shows a dash for CAC, not zero and not infinity.

## If you are building it with an AI tool

Paste this into Cursor, Claude Code or Lovable:

```
Build a customer acquisition dashboard with this structure. One date range control for the whole page, top right. Row 1: three cards (new customers, CAC, CAC payback in months), each with value, change against the previous period and a 12-week sparkline. Row 2: a funnel as horizontal bars (visits, sign-ups, activated, paid) with the count on each bar and the conversion rate between bars. Row 3: a table by channel with columns spend, sign-ups, customers, CAC, payback; sortable; numbers right-aligned with tabular figures; include an "Unknown" row; show a dash where CAC cannot be calculated. Row 4: new customers by week as stacked bars by channel, with the last two weeks marked as incomplete. One accent color plus grays. No pie charts.
```

## Questions people ask

### What metrics belong on a customer acquisition dashboard?

New customers, customer acquisition cost, CAC payback, conversion rate at each funnel step, spend against budget and, once you have the history, the ratio of lifetime value to CAC.

### How do you calculate customer acquisition cost?

Divide what you spent on sales and marketing in a period by the number of new paying customers in that period. Decide once whether salaries and tools are included, and keep it the same every month.

### What is the difference between an acquisition dashboard and a marketing dashboard?

A marketing dashboard reports on activity: campaigns, traffic, leads. An acquisition dashboard reports on the result: paying customers and what they cost.

### Should the dashboard show data by channel or by campaign?

By channel on the first screen, with campaigns one click down. Budget is moved between channels first, and twenty campaign rows bury that decision.

## Where to go next

I've designed more than 10,000 screens since 2013, and a marketing dashboard is one of [the case studies on this site](/work/marketing-dashboard/). The [SaaS dashboard design guide](/writing/saas-dashboard-design-guide/) covers hierarchy and charts, and [how to design a data table](/writing/data-table-design/) covers the channel table. If you want it designed with you, see [dashboard design](/services/dashboard-design/).
