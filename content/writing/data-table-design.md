_Every table looks fine with ten rows. The design question is what happens at ten thousand._

Tables are the least glamorous screen in a SaaS product and the one people spend the most time in. They are also where demo data lies the most. Ten tidy rows, short names, no blanks. Then a real customer loads 14,000 records with names that wrap to three lines, and the screen you signed off stops working.

## 1. Design with the worst real data

Before drawing anything, get an export from your largest account. The longest name, the emptiest row, the biggest number, the oldest date. If the table holds up with that, it holds up.

## 2. Pick the columns, then cut two

Every column someone once asked for is still there. Most tables read better with five to seven columns on screen. Keep the ones people sort and decide by. Move the rest into a detail panel or a column picker.

## 3. Align by type

Text aligns left. Numbers align right, with the same number of decimals down the column, so the eye can compare size by length. Dates use one format everywhere. Status goes in a short label, not a sentence.

## 4. One line per row

Truncate long text to a single line and show the full value on hover or in the detail view. Wrapped rows make every row a different height, and the table stops being scannable.

## 5. Freeze what gives the row meaning

The header stays fixed when the table scrolls down. The first column, usually the name, stays fixed when it scrolls sideways. Without them, a number in the middle of the screen belongs to nothing.

## 6. Decide how 10,000 rows load

There are three honest options.

- **Pagination.** Simple, fast, easy to build. Good when people look things up. Fifty rows a page is a sensible default.
- **Virtual scrolling.** One long list where only the visible rows are rendered. Good when people scan. Harder to build well.
- **Load more.** Fine for feeds. Poor for tables, because nobody knows how far down they are.

Pick one before the build. Whichever you pick, show the total: "1 to 50 of 14,208".

## 7. Make filtering and search the main way in

Nobody scrolls 10,000 rows. They narrow them. Put search and the two or three most used filters directly above the table. Show each active filter as a chip that can be removed, and show how many rows match. Sorting belongs on the column header, with a visible arrow on the sorted column.

## 8. Design selection and bulk actions

If people act on rows, they act on many. A checkbox per row, a select-all that says whether it means this page or all 14,208, and a bar of actions that appears when something is selected. Destructive actions ask once and say the number: "Delete 37 invoices?"

## 9. Open detail without leaving

A side panel that opens on row click keeps the list in view. People can check a record, close it and keep their place, their filters and their scroll position. Sending them to a new page and back loses all three.

## 10. Design the states

- **Empty, first time.** What will appear here and the one action that fills it.
- **Empty, after filtering.** "No invoices match these filters", with a button to clear them. This is a different screen from the first.
- **Loading.** Skeleton rows at the real row height, so nothing jumps.
- **Error.** What failed and a retry, with the filters kept.
- **A blank cell.** A dash, not a zero. A missing value must never look like a real one.

## On a phone

A ten-column table does not fit and should not try. Show each row as a short card with the two or three fields that matter, and open the rest on tap. Keep search and filters at the top.

## If your table was built with AI

Cursor, Lovable and v0 build the ten-row version by default. Paste this into the tool you built it with:

```
Rebuild this data table to handle 10,000 rows. Header row fixed on vertical scroll and first column fixed on horizontal scroll. Text columns left-aligned, numeric columns right-aligned with consistent decimals. Every cell on one line, truncated with the full value in a title attribute. Pagination at 50 rows with a "1 to 50 of N" count. A search field and filter chips above the table, with a count of matching rows. Sortable column headers with a visible arrow on the sorted column. A checkbox per row, select all for the current page, and a bulk action bar that appears when rows are selected. Row click opens a side panel, not a new page. Add four states: first-time empty, no results after filtering with a clear-filters button, skeleton loading rows at the real row height, and an error with a retry button. Empty cells show a dash. Do not change the data model. List what you changed.
```

## When the table is the product

In most B2B tools the table is where the work happens. If yours is holding people back, that is the kind of screen I [redesign](/services/dashboard-design/). The other eight ways a dashboard loses its users are in [9 dashboard UX mistakes](/writing/dashboard-ux-mistakes/).

## Questions people ask

### How many columns should a data table have?

As many as people sort and decide by, usually five to seven on screen. Put the rest in a detail panel or behind a column picker.

### Should a large table use pagination or infinite scroll?

Pagination when people look up specific records, virtual scrolling when they scan long lists. Avoid a plain load-more button for tables, because people lose track of where they are.

### How should numbers be aligned in a table?

Right-aligned, with the same number of decimals in every row, so larger numbers are visibly longer and columns can be compared at a glance.

### How do you show a table on mobile?

Turn each row into a compact card with the two or three most important fields, and open the full record on tap.
