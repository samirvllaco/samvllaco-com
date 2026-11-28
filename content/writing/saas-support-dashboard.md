_SaaS support dashboard best practices come down to one rule: show what needs attention now before you show how last month went. Put open tickets at risk first, then response and resolution times, then the reasons people write in._

Support dashboards usually open on a satisfaction score and a chart of tickets over time. Both are fine for a monthly review and useless at nine in the morning, when a support lead needs to know which conversations are about to breach a promise. Below are the practices I use when I design one.

## 1. Decide who it is for

A support dashboard has two readers, and they need different screens.

- **The agent and the team lead** need the live queue: what is open, what is waiting, what is close to its deadline.
- **The head of support and the founders** need the trend: are we answering faster, are tickets growing faster than customers, what do people keep asking?

Put both on one page and neither is served. Build a queue view and a trends view, and make the queue the default.

## 2. Put risk first

The top of the queue view answers "what will go wrong in the next hour?"

- **Tickets close to breaching** their response or resolution target, sorted by time left.
- **Unassigned tickets**, with how long each has waited.
- **Tickets waiting on us** against tickets waiting on the customer. Only the first is your queue.

Each row shows the customer, the subject, the time left and who has it. Time left is a number and a color, never a color alone.

## 3. Show four numbers, not fourteen

1. **First response time.** Use the median. One ticket left over a weekend ruins an average.
2. **Resolution time.** Median again, with the slowest tenth shown separately.
3. **Open tickets.** Now, and the change against the same day last week.
4. **Customer satisfaction.** The score, plus how many people answered. A score from six replies is not a result.

Each has its change against the previous period and a small trend line.

## 4. Compare tickets to customers

Ticket volume going up is not bad news if customers went up faster. Show tickets per 100 active customers next to the raw count. That is the number that tells you whether the product is getting easier or harder to use.

## 5. Make the reasons visible

A table of the top contact reasons, with the count and the change, is the most valuable part of the trends view. It is how support tells the product team what to fix.

- Keep the list to ten reasons with an "Other" row.
- Link each reason to its tickets.
- Mark the ones that grew most this period.

If "Other" is the largest row, the tags need work before the dashboard does.

## 6. Design the quiet states

- **Empty queue.** Say it plainly: no tickets waiting. It is the best screen on the product and it should not look broken.
- **Loading.** A skeleton in the shape of the table, so nothing jumps when rows arrive.
- **Stale data.** Show when the numbers were last updated. A live queue that is ten minutes old is worse than none.

## 7. Keep it readable all day

Agents look at this for eight hours. Use one accent color, body text at 14px or larger, rows at least 44px high and contrast of 4.5 to 1 on all text. Red is for breaches only. If everything is red, nothing is.

## If you are building it with an AI tool

Paste this into Cursor, Claude Code or Lovable:

```
Build a support dashboard with two views, Queue (default) and Trends. Queue: a table of open tickets sorted by time left before the response or resolution target, columns customer, subject, status (waiting on us or waiting on customer), assignee, time left; time left shown as text plus color; unassigned tickets pinned in their own group on top; an empty state that says "No tickets waiting". Trends: four cards (median first response time, median resolution time, open tickets, satisfaction score with number of responses), each with change against the previous period and a sparkline; one line chart of tickets per 100 active customers by week; a table of the top 10 contact reasons with count and change, plus an "Other" row. Show "Updated <time>" on both views. One accent color plus grays, red only for breached targets. Rows 44px high, text 14px or larger.
```

## Questions people ask

### What should a SaaS support dashboard show?

First the live queue: tickets at risk of missing their target, unassigned tickets and what is waiting on your team. Then four numbers: first response time, resolution time, open tickets and satisfaction. Then the top reasons people contact you.

### What are the most important customer support metrics?

First response time, resolution time, open ticket count, customer satisfaction and tickets per 100 active customers. The last one shows whether support load is growing faster than the business.

### Should I use the average or the median for response time?

The median. A few very slow tickets pull an average up and hide what most customers experience. Show the slowest tenth as its own number.

### How is a support dashboard different from a help desk report?

A report looks back over a month for a review meeting. A dashboard is opened during the day to decide what to do next, so it leads with what is open now.

## Where to go next

I've designed more than 10,000 screens since 2013, many of them dashboards people keep open all day. The [SaaS dashboard design guide](/writing/saas-dashboard-design-guide/) covers hierarchy and charts, and [how to design a data table](/writing/data-table-design/) covers the queue. If you want yours designed with you, see [dashboard design](/services/dashboard-design/).
