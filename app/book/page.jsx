import CalFrame from "../../components/CalFrame";
import { BookAlt } from "../../components/BookBand";
import ContactSwitch from "../../components/ContactSwitch";
import { SITE, BOOKING_URL } from "../../lib/site";

const TITLE = "Start a project with Sam Vllaco";
const DESC = "Book a 30-min call or send me a message. Tell me what you need and your budget. Projects start at $5,000.";

export const metadata = {
  title: "Start a project",
  description: DESC,
  alternates: { canonical: "/book/" },
  openGraph: { title: TITLE, description: DESC, url: "/book/", type: "website", images: [{ url: "/og-book-call-2.jpg", width: 1200, height: 630, alt: "Book a strategy design call. Sam Vllaco holding a laptop." }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og-book-call-2.jpg"], site: SITE.handle, creator: SITE.handle },
};


// Just the calendar, full width (owner, 27 Nov 2026). What people need and their budget are asked in Cal.com's own
// booking form, so every answer lands with the booking ("we use cal.com for now, we can't track it" on the site).
export default function Book() {
  return (
    <div className="wrap page pg svc">
      <h1 className="sr-only">Start a project with Sam Vllaco</h1>
      <div className="book-split is-full">
      {BOOKING_URL ? (
        <section className="book-cal" id="calendar" aria-label="Book a call or send a message">
          <ContactSwitch call={<><CalFrame src={`${BOOKING_URL}?embed=true&theme=dark&layout=month_view&ui.color-scheme=dark`} /><BookAlt /></>} />
        </section>
      ) : null}
      </div>
    </div>
  );
}
