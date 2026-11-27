import CallIcon from "./CallIcon";

// Home: what Sam does for product teams, said plainly (owner, 25 Nov 2026: audits, UI/UX sprints, fixing gaps,
// improving the product, redesigning from zero or picking up an existing app; "design agency, me style").
// The steps every engagement follows on the left, a design tile per service on the right.
// Desktop (26 Nov 2026, after grafit.agency): heading, steps and the call button stay pinned on the left while the cards
// scroll on the right, and the steps light up one by one as you scroll (CSS scroll timeline, no JS).
// Server component, no JS.
// The right column shows the work, not paragraphs (owner, 27 Nov 2026: "too much content, I want the design to do
// the talk"): one real screen per service, a short title and one line.
const WORK = [
  { k: "audit", t: "UX audits", d: "Every gap found, ranked, with the fix", href: "/services/ux-audit/", alt: "An annotated web app screen with numbered UX findings" },
  { k: "sprint", t: "UI/UX sprints", d: "One problem, one week, a clickable prototype", href: "/services/saas-product-design/", alt: "Annotated mobile banking screens from a design sprint" },
  { k: "redesign", t: "Redesigns", d: "Clearer screens on a system that lasts", href: "/services/website-design/", alt: "A law firm homepage before and after the redesign" },
  { k: "test", t: "UX testing", d: "Watch real people, fix where they stall", href: "/services/ux-audit/", alt: "Annotated trip planner screens with the findings from user tests" },
  { k: "ab", t: "A/B testing", d: "Changes that rest on numbers", href: "/services/landing-pages/", alt: "Landing page variants side by side" },
  { k: "doc", t: "Figma handoff", d: "Specs and files your team builds from", href: "/services/design-systems/", alt: "A messages screen with spec notes for developers" },
];

const STEPS = [
  ["Audit", "Data, flows, heuristics and accessibility"],
  ["Prioritise", "The gaps that cost you most, first"],
  ["Design", "Fixes or a full redesign, in Figma"],
  ["Test", "Usability tests and A/B tests"],
  ["Hand over", "Specs, docs and files your team owns"],
];

export default function HowIWork() {
  return (
    <section className="hw band-light" id="how" aria-labelledby="hw-h" data-bg="#171719">
      <i className="band-bg" aria-hidden="true" />
      {/* Desktop: this column stays pinned while the cards on the right scroll past (owner, 26 Nov 2026). */}
      <div className="hw-side">
        <header className="hw-head">
          <h2 id="hw-h">UX audits, sprints and redesigns <span className="t2">for product teams</span></h2>
          <p>I find the gaps in your product&apos;s UI and UX and fix them, whether you have an app already or are starting from zero. You get the process of a design agency, with one senior designer doing every part of it.</p>
        </header>

        <ol className="hw-steps" aria-label="How every engagement runs">
          {STEPS.map(([t, d], i) => (
            <li key={t}><span className="hw-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><b>{t}</b><span>{d}</span></li>
          ))}
        </ol>

        <div className="hw-go">
          <a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Book a 30-min strategy call</a>
          <p>You get a plan and a fixed price after the call.</p>
        </div>
      </div>

      <div className="hw-main">
        <ul className="hw-tiles" aria-label="Services">
          {WORK.map((w) => (
            <li key={w.k}>
              <a href={w.href}>
                <span className="hw-shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/work/hw/${w.k}.webp?v=1`} width="720" height="540" alt={w.alt} loading="lazy" decoding="async" />
                </span>
                <span className="hw-tt">{w.t}</span>
                <span className="hw-td">{w.d}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
