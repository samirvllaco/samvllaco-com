import CalFrame from "../../components/CalFrame";
import { BookAlt } from "../../components/BookBand";
import Link from "next/link";
import CallIcon from "../../components/CallIcon";
import { EMAIL, SITE, BOOKING_URL, FORM_ENDPOINT } from "../../lib/site";
import { SERVICES } from "../../lib/services";

const TITLE = "Book a strategy call with Sam Vllaco";
const DESC = "Founder and designer. I turn complex SaaS and AI products into screens people get in seconds. Tell me what you are building.";

export const metadata = {
  title: "Book a strategy call",
  description: DESC,
  alternates: { canonical: "/book/" },
  openGraph: { title: TITLE, description: DESC, url: "/book/", type: "website", images: [{ url: "/og-book-call-2.jpg", width: 1200, height: 630, alt: "Book a strategy design call. Sam Vllaco holding a laptop." }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og-book-call-2.jpg"], site: SITE.handle, creator: SITE.handle },
};


export default function Book() {
  return (
    <div className="wrap page pg svc">
      {/* Only the calendar, full width (owner, 27 Nov 2026: "remove all text, keep the main frame bigger, full width") */}
      <h1 className="sr-only">Book a call with Sam Vllaco</h1>
      <div className="book-split is-full">
      {BOOKING_URL ? (
        <section className="book-cal" id="calendar" aria-label="Pick a time">
          <CalFrame src={`${BOOKING_URL}?embed=true&theme=dark&layout=month_view`} />
          <BookAlt />
        </section>
      ) : null}
      </div>
    </div>
  );
}
