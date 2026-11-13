"use client";
import CalFrame from "./CalFrame";
import { usePathname } from "next/navigation";
import { BOOKING_URL } from "../lib/site";

/* Booking calendar shown above the footer on every page except /book, which has its own. */
export default function BookBand() {
  const path = usePathname() || "";
  if (!BOOKING_URL || path.startsWith("/book") || path.startsWith("/ebook")) return null;
  return (
    <section className="wrap book-band" id="book" aria-labelledby="book-band-h">
      <div className="book-band-head">
        <p className="case-eyebrow">Available for new projects</p>
        <h2 id="book-band-h">Tell me <span className="t2">what you are building</span></h2>
        <p>Book a 30-minute call. You leave with a scope, a timeline and one clear next step, whether we work together or not.</p>
      </div>
      <div className="book-cal">
        <CalFrame src={`${BOOKING_URL}?embed=true&theme=dark&layout=month_view`} />
      </div>
    </section>
  );
}
