import Link from "next/link";
import PageHead from "../../components/PageHead";
import CallIcon from "../../components/CallIcon";
import { PlanCards } from "../../components/Sub";
import { BOOK_URL, PERSONAL_REVIEW_URL, REVIEW_URL } from "../../lib/site";

export const metadata = {
  title: "Pricing: Design Subscription Plans",
  description: "Design subscription pricing from Sam Vllaco: $1,000 a week for a sprint or $3,000 a month, fixed-price projects, plus a $12.99 book and $49 and $99 reviews.",
  alternates: { canonical: "/pricing/" },
};

const START = [
  { name: "The book", price: "$12.99", text: "27 copy-paste prompts that fix AI slop UI. Do it yourself tonight.", href: BOOK_URL },
  { name: "30-min UI/UX review", price: "$49", text: "A Loom of your product, a steps document and the book.", href: PERSONAL_REVIEW_URL },
  { name: "All-inclusive review", price: "$99", text: "A 45 min to 1 hour Loom, scorecard, custom prompts, branding tips and the book.", href: REVIEW_URL },
];

export default function Pricing() {
  return (
    <div className="wrap page pg pr-page">
      <PageHead crumb="Pricing" href="/pricing/" a="Two plans." b="One fixed price." lede="A week at a time or every month. One senior designer, most requests back in about 48 hours, and you know the price before anything starts.">
        <div className="btn-row"><Link prefetch={false} className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Book a call</Link></div>
      </PageHead>

      <PlanCards />

      <section className="pr-proj" aria-labelledby="pr-proj-h">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pr-proj-pic" src="/me/ai/ai6-224.webp?v=1" width="224" height="224" alt="" loading="lazy" decoding="async" />
        <div>
          <h2 id="pr-proj-h">Fixed-price projects</h2>
          <p>A full website, app or brand, scoped on a call. Projects start at <b>$1,000</b>, and larger product work runs from <b>$5,000 to $25,000</b>. Pick this when you want one finished thing for one price, with a timeline in writing before I start.</p>
        </div>
        <Link prefetch={false} className="hero2-btn hero2-btn-light" href="/book/">Get a quote</Link>
      </section>

      <section className="pr-start" aria-labelledby="pr-start-h">
        <h2 id="pr-start-h">Smaller budget? <span className="t2">Start here.</span></h2>
        <ul>
          {START.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noopener">
                <span className="pr-s-top"><b>{s.name}</b><span>{s.price}</span></span>
                <span className="pr-s-text">{s.text}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
