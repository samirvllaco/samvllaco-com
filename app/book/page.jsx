import Link from "next/link";
import Crumbs from "../../components/Crumbs";
import CallIcon from "../../components/CallIcon";
import { EMAIL, SITE } from "../../lib/site";
import { SERVICES } from "../../lib/services";

const TITLE = "Book a call with Sam Vllaco";
const DESC = "Founder and designer. I turn complex SaaS and AI products into screens people get in seconds. Tell me what you are building.";

export const metadata = {
  title: "Book a call",
  description: DESC,
  alternates: { canonical: "/book/" },
  openGraph: { title: TITLE, description: DESC, url: "/book/", type: "website", images: [{ url: "/og-book.jpg", width: 1200, height: 630, alt: "Book a call. Let's design your product. Sam Vllaco holding a laptop." }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og-book.jpg"], site: SITE.handle, creator: SITE.handle },
};

const STEPS = [
  { t: "Send a short note", d: "What you are building, where it is stuck and a link if you have one." },
  { t: "We talk for 30 minutes", d: "I look at the product with you and say where design will help most." },
  { t: "You get a plan", d: "Scope, timeline and a fixed price. No obligation." },
];

export default function Book() {
  return (
    <div className="wrap page svc">
      <Crumbs items={[{ name: "Book a call", href: "/book/" }]} />
      <header className="case-head">
        <p className="case-eyebrow">Available for new projects</p>
        <h1>Let&rsquo;s design your product</h1>
        <p className="lede">I turn complex SaaS and AI products into screens people get in seconds.</p>
        <div className="btn-row case-cta-row">
          <a className="btn btn-primary" href={`mailto:${EMAIL}?subject=Book%20a%20call`}><CallIcon />Book a call</a>
          <Link className="btn btn-ghost" href="/work/marketing-dashboard/">See a case study</Link>
        </div>
        <p className="book-mail">Or write to <b>{EMAIL}</b></p>
      </header>
      <section className="svc-group" aria-labelledby="book-how">
        <div className="svc-head"><h2 id="book-how">How it works</h2></div>
        <ol className="svc-list book-steps">
          {STEPS.map((s, i) => (
            <li key={s.t}><span className="case-num">{String(i + 1).padStart(2, "0")}</span><h3>{s.t}</h3><p>{s.d}</p></li>
          ))}
        </ol>
      </section>
      <section className="svc-group" aria-labelledby="book-what">
        <div className="svc-head"><h2 id="book-what">What I can help with</h2></div>
        <ul className="svc-list">
          {SERVICES.map((g) => (
            <li key={g.id}><h3><Link href={`/services/#${g.id}`}>{g.title}</Link></h3><p>{g.blurb}</p></li>
          ))}
        </ul>
      </section>
    </div>
  );
}
