import CalFrame from "../../components/CalFrame";
import { BookAlt } from "../../components/BookBand";
import Link from "next/link";
import PageHead from "../../components/PageHead";
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

const STEPS = [
  { t: "30 minutes", d: "Pick a slot and tell me what you are building and roughly what you want to spend, so I come prepared." },
  { t: "With me, not a sales rep", d: "I take every call myself and I am the one who designs your product." },
  { t: "One clear next step", d: "We check the fit and agree on one next step: scope, audit, sprint or monthly plan." },
];

export default function Book() {
  return (
    <div className="wrap page pg svc">
      <div className="book-split">
      <div className="book-side">
      <PageHead crumb="Contact" href="/book/" a="Tell me" b="what you are building" lede="You've been staring at your product for months. Give me 30 minutes and I'll show you what fresh eyes see. Bring the thing that worries you most. You leave with a scope, a timeline and one clear next step." />
      <aside className="book-qr" aria-label="Book from your phone">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/cal-qr.svg?v=1" width="112" height="112" alt="QR code that opens the booking calendar" />
        <p><b>On your phone anyway?</b><span>Scan it and book in a minute, from the couch.</span></p>
      </aside>
      </div>
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
