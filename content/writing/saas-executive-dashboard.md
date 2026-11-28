_A SaaS executive dashboard is one screen that tells a founder or a board whether the business is growing, keeping its customers and spending sensibly. It needs six numbers, one trend chart and one short list of what changed, and nothing else on the first screen._

Most executive dashboards I am asked to fix have the opposite problem. They show thirty numbers at the same size, so the person opening it on Monday morning still has to ask someone what happened. Below is what goes on the screen, in what order, and how to lay it out.

## What a SaaS executive dashboard is for

An executive dashboard answers one question: is the business healthy this month, and if not, where should I look? It is read in under a minute, usually once a week, often on a phone before a meeting.

That makes it different from an operations dashboard, which a team keeps open all day, and from an analytics tool, where someone explores. If your executive dashboard has filters on every chart, it has become an analytics tool.

## The six numbers to show

Pick the six that match how your company makes money. For most subscription businesses these are:

1. **MRR or ARR.** Recurring revenue right now, with its change against last month.
2. **Net new MRR.** New plus expansion, minus contraction and churned revenue. It shows in one number whether growth is real.
3. **Net revenue retention.** How much revenue last year's customers bring in today. Above 100% means existing customers are growing.
4. **Customer churn.** The share of customers lost in the period.
5. **CAC payback.** How many months of margin it takes to earn back what you spent to win a customer.
6. **Cash runway.** Months of cash left at the current burn.

Each number gets the same three parts: the value, the change against the last period, and a small line showing the last 12 months. A number without its change is trivia.

## What to leave out

- **Anything nobody acts on.** Page views, sign-ups by browser, total registered users.
- **Totals that only go up.** "Customers ever" always looks good and never tells you anything.
- **More than one chart type per row.** A bar, a donut and a gauge side by side read as three different tools.
- **Targets with no owner.** A red number that nobody is responsible for teaches people to ignore red.

These belong on the team dashboards one click away.

## How to lay it out

- **Top row: the headline.** One number, the largest text on the page, usually MRR or ARR. Its change sits beside it.
- **Second row: the other five** as equal cards, in the order above, so the eye reads growth first, then retention, then cost.
- **Third row: one trend chart.** MRR by month, split into new, expansion and churned. This is the chart boards ask for.
- **Last: what changed.** Three to five plain lines: the largest new customer, the largest loss, anything that moved a number by more than a set amount.

One accent color for the main series, one gray for comparison. Green and red only for the change arrows, and never as the only signal: add an arrow or a plus and minus sign so the page still reads for people who cannot tell the two colors apart.

## Make it work on a phone

Executives read this in a taxi. On a narrow screen the cards stack in the same order, the headline stays first, and the trend chart keeps its full width with fewer labels. If a table needs sideways scrolling on a phone, it does not belong on this dashboard.

## If you are building it with an AI tool

AI tools give you twelve equal cards and four chart types by default. Paste this into Cursor, Claude Code or Lovable before you start:

```
Build an executive dashboard with exactly this structure. Row 1: one headline number (MRR) at 48px with its change against last month. Row 2: five equal cards (net new MRR, net revenue retention, customer churn, CAC payback, cash runway), each with value, change and a 12-month sparkline. Row 3: one stacked bar chart of MRR by month split into new, expansion and churned. Row 4: a "What changed" list of at most five lines. Use one accent color and one gray. Green and red only on change indicators, always with an arrow. No donut charts, no gauges, no filters. On screens under 640px stack everything in the same order.
```

## Questions people ask

### What should a SaaS executive dashboard include?

Six numbers: recurring revenue, net new MRR, net revenue retention, customer churn, CAC payback and cash runway. Add one trend chart of MRR by month and a short list of what changed.

### How many metrics should an executive dashboard have?

Five to seven on the first screen. Past that, people stop reading and start asking someone for a summary, which is the job the dashboard was built to do.

### How often should it update?

Daily is enough. Executives read it weekly or monthly, and numbers that move every minute make small changes look like news.

### What is the difference between an executive dashboard and a KPI dashboard?

An executive dashboard is the company on one screen for the people who run it. A KPI dashboard belongs to one team and goes deeper on that team's numbers.

## Where to go next

I've designed more than 10,000 screens since 2013, many of them dashboards. The [SaaS dashboard design guide](/writing/saas-dashboard-design-guide/) covers hierarchy and charts in more depth, and the [9 dashboard UX mistakes](/writing/dashboard-ux-mistakes/) are the ones I fix most. If you want yours designed with you, see [dashboard design](/services/dashboard-design/).
