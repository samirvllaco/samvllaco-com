import CalFrame from "../../components/CalFrame";
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
  { t: "30 minutes", d: "Pick a slot, tell me what you are building and your rough budget. That way I come prepared." },
  { t: "With me, not a sales rep", d: "I take every call myself and I am the one who designs your product." },
  { t: "One clear next step", d: "We check the fit and agree on one next step: scope, audit, sprint or monthly plan." },
];

export default function Book() {
  return (
    <div className="wrap page pg svc">
      <div className="book-split">
      <PageHead crumb="Contact" href="/book/" a="Tell me" b="what you are building" lede="Book a 30 minute product strategy call with Sam. We map the scope, the timeline and the one next step that moves your product forward." />
      {BOOKING_URL ? (
        <section className="book-cal" id="calendar" aria-label="Pick a time">
          <CalFrame src={`${BOOKING_URL}?embed=true&theme=dark&layout=month_view`} />
        </section>
      ) : null}
      </div>
    </div>
  );
}
