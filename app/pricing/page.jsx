import Link from "next/link";
import PageHead from "../../components/PageHead";
import CallIcon from "../../components/CallIcon";
import { BOOK_URL, PERSONAL_REVIEW_URL, REVIEW_URL } from "../../lib/site";

export const metadata = {
  title: "Pricing: UI/UX Design Rates",
  description: "UI/UX design pricing from Sam Vllaco: $50 an hour, $1,500 a week design sprint, $5,000 a month retainer, fixed-price projects, plus a $12.99 book and $49 and $99 reviews.",
  alternates: { canonical: "/pricing/" },
};

const PLANS = [
  { k: "Hourly", price: "$50", per: "per hour", lead: "For small fixes and second opinions.", eg: "A pricing page cleanup, a Figma file review, or a few screens tidied before launch.", items: ["Billed in 1-hour blocks", "Work starts within 48 hours", "A Loom walkthrough of what changed"] },
  { k: "Design sprint", price: "$1,500", per: "per week", hot: true, lead: "One focused week on one problem.", eg: "Redesign your onboarding, or take a new feature from flow to final screens.", items: ["A kickoff call, then daily progress", "Flows, UI and a clickable prototype", "Figma files and specs your team can build from", "Add more weeks as you need them"] },
  { k: "Monthly", price: "$5,000", per: "per month", lead: "Your designer on call, every week.", eg: "Ship new features each sprint while your product, site and brand stay consistent.", items: ["Ongoing UI/UX, web and marketing design", "A weekly call and a shared board", "Design system kept up to date", "Pause or cancel any month"] },
];

const START = [
  { name: "The book", price: "$12.99", text: "27 copy-paste prompts that fix AI slop UI. Do it yourself tonight.", href: BOOK_URL },
  { name: "30-min UI/UX review", price: "$49", text: "A Loom of your product, a steps document and the book.", href: PERSONAL_REVIEW_URL },
  { name: "All-inclusive review", price: "$99", text: "A 45 min to 1 hour Loom, scorecard, custom prompts, branding tips and the book.", href: REVIEW_URL },
];

export default function Pricing() {
  return (
    <div className="wrap page pg pr-page">
      <PageHead crumb="Pricing" href="/pricing/" a="Simple pricing." b="No surprises." lede="Pick the way you want to work. Every option comes with the same care, and you know the price before anything starts.">
        <div className="btn-row"><Link prefetch={false} className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Book a call</Link></div>
      </PageHead>

      <ul className="pr-plans">
        {PLANS.map((p) => (
          <li key={p.k} className={`pr-plan${p.hot ? " is-hot dark-island" : ""}`}>
            <p className="pr-k">{p.k}{p.hot ? <span>Most picked</span> : null}</p>
            <p className="pr-price">{p.price}<span>{p.per}</span></p>
            <p className="pr-lead">{p.lead}</p>
            <ul className="pr-items">{p.items.map((t) => <li key={t}>{t}</li>)}</ul>
            <p className="pr-eg"><b>For example</b>{p.eg}</p>
            <Link prefetch={false} className={`hero2-btn ${p.hot ? "hero2-btn-primary" : "hero2-btn-light"}`} href="/book/">Book a call<span className="sr-only"> about the {p.k.toLowerCase()} option</span></Link>
          </li>
        ))}
      </ul>

      <section className="pr-proj" aria-labelledby="pr-proj-h">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pr-proj-pic" src="/me/ai/ai6-224.webp?v=1" width="224" height="224" alt="" loading="lazy" decoding="async" />
        <div>
          <h2 id="pr-proj-h">Fixed-price projects</h2>
          <p>A full website, app or brand, scoped on a call. Projects start at <b>$1,000</b>, and larger product work runs from <b>$5,000 to $25,000</b>. You get a fixed price and a timeline in writing before we start.</p>
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
