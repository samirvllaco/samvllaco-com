_The most used button on a bad dashboard is Export. Here is why people press it, and how to make them stop._

When someone exports your dashboard to a spreadsheet, they are telling you something. The data is right and the screen is wrong. They could not find the answer, could not compare two things, or could not trust what they saw, so they took the numbers somewhere they could.

## 1. Everything is the same size

Six cards in a row, twelve charts in a grid, all equal. The screen has no opinion about what matters, so the reader has to work it out every visit.

**Fix.** Pick the one question most people open the dashboard to answer. Put that answer at the top left, at least twice the size of anything else. Everything below it is supporting detail.

## 2. Numbers with nothing to compare them to

"Revenue: $48,210." Good? Bad? Nobody knows without a second number.

**Fix.** Every key number gets a comparison next to it: against last period, against target or against average. "$48,210, up 8% on last month" is an answer. Add a small trend line if the direction matters more than the value.

## 3. The wrong chart for the question

Pie charts with nine slices. A gauge for a number that has no maximum. A stacked area chart nobody can read the middle layers of.

**Fix.** Match the chart to the question.

- How has it changed over time? A line.
- Which is bigger? Bars, sorted.
- What share of the whole? One stacked bar, or just the percentages in a list.
- What is the number? The number, large.

If a chart needs a legend with more than five entries, it is trying to answer too many questions.

## 4. Tables designed for ten rows

The demo had ten tidy rows. Production has 14,000, with names that wrap to three lines and a column of numbers aligned left so nothing lines up.

**Fix.** Keep the header fixed while the table scrolls. Keep the first column fixed when it scrolls sideways. Right-align numbers and use the same number of decimals down a column. Truncate long text to one line and show the rest on hover. Decide on pagination or virtual scrolling before you build, and test with your largest real account.

## 5. Filters hidden, or everywhere

Either the filters are tucked in a drawer and people forget one is on, or each chart has its own date picker and nothing agrees.

**Fix.** One filter bar at the top that controls the whole screen. Show every active filter as a chip that can be removed with one click, and add a single reset. If a chart must have its own range, label it on the chart.

## 6. No empty, loading or error states

A new account opens the dashboard and sees empty axes and "No data available". A slow query shows a blank white card. A failed one shows nothing at all, and the user assumes the number is zero.

**Fix.** Design all three for every card. Empty says what will appear and what to do to get it there. Loading is a skeleton in the shape of the chart, so the layout does not jump. Error says what failed and offers a retry. A missing number must never look like a zero.

## 7. Color that means nothing

Eight series in eight bright colors. Red used for a brand accent and also for "bad". Green and red as the only difference between up and down.

**Fix.** One accent color for the thing you want noticed, and grays for the rest. Keep red and green for bad and good only, and pair them with an arrow or a plus and minus sign, because [a color alone is invisible to color-blind users](/writing/vibe-coding-accessibility-wcag-22-aa/). Check text and chart labels with a [contrast checker](/tools/contrast-checker/).

## 8. Showing data, not what to do about it

"Churn: 4.2%." And now what? The dashboard reports and then leaves.

**Fix.** Put the next step beside the number. A churn figure links to the accounts at risk. A failed payments count has a button that opens the list. A dashboard that leads to an action gets opened daily. One that only reports gets opened on the day of the board meeting.

## 9. Adding and never removing

Every release adds a card. Nothing is ever taken away. After two years the home screen is a museum of features someone once asked for.

**Fix.** Look at which cards people click or hover. Anything untouched for a quarter moves to a secondary page or goes. A dashboard is finished when there is nothing left to remove.

## If your dashboard was built with AI

Cursor, Lovable and v0 make these mistakes by default, especially 1, 4 and 6: equal cards, tables that only work with sample data and no states. Paste this into the tool you built it with:

```
Audit this dashboard and fix five things. HIERARCHY: make the single most important metric at least twice the size of the others and place it top left. Every KPI shows a comparison to the previous period with a plus or minus sign and a percentage. TABLES: fixed header, numbers right-aligned with consistent decimals, long text truncated to one line with the full value in a title attribute, and pagination at 50 rows. FILTERS: one filter bar at the top that controls every chart, active filters shown as removable chips, one reset button. STATES: every card has an empty state that says what will appear and how to get it, a skeleton loading state with fixed height, and an error state with a retry button. COLOR: one accent color, gray for all other series, red and green only for negative and positive changes and always with a sign. Do not add new charts. List what you changed per component.
```

It will not make design decisions for you. It will not know which metric matters most, so tell it. But it clears the defaults.

## When to bring in a designer

If you recognised more than three of these, the dashboard needs a rethink more than a patch. [That is what I do](/services/dashboard-design/): I start from the questions your users open the screen with and work back to the layout. You can see the approach in [Kestrel, a marketing dashboard concept](/work/marketing-dashboard/).

[Book a 30-minute call](/book/) and bring your worst screen.

## Questions people ask

### Why do users export dashboards to Excel?

Because the screen does not let them find, compare or trust the number they came for. Exporting is a workaround for missing hierarchy, weak tables or filters they cannot see.

### How many charts should a dashboard have?

As few as answer the main questions. One primary number, two or three supporting charts and one table cover most home screens. Detail belongs one click down.

### What is the most common dashboard design mistake?

Giving everything equal weight. When all cards are the same size, the reader has to decide what matters on every visit.

### Should a dashboard use pie charts?

Rarely. With more than three or four slices people cannot compare the sizes. Sorted bars or a simple list of percentages are easier to read.
