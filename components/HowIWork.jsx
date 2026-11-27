import CallIcon from "./CallIcon";

// Home: what Sam does for product teams, said plainly (owner, 25 Nov 2026: audits, UI/UX sprints, fixing gaps,
// improving the product, redesigning from zero or picking up an existing app; "design agency, me style").
// Two starting points, the six services with what each hands over, then the steps every engagement follows.
// Desktop (26 Nov 2026, after grafit.agency): heading, steps and the call button stay pinned on the left while the cards
// scroll on the right, and the steps light up one by one as you scroll (CSS scroll timeline, no JS).
// Server component, no JS. Icons are the shared graphite tile (tg-ico).
const IC = {
  app: "M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM4 9h16M9 13l2 2 4-4",
  zero: "M12 5v14M5 12h14",
  audit: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3M8 11l2 2 4-4",
  sprint: "M13 2 4 14h7l-1 8 9-12h-7z",
  redesign: "M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16zM13.5 6.5l4 4",
  test: "M3 12h4l3-8 4 16 3-8h4",
  ab: "M4 20 8 6l4 14M5.5 15h5M15 6v14M15 6h3a3 3 0 0 1 0 6h-3M15 12h3.5a3.5 3.5 0 0 1 0 7H15",
  doc: "M6 3h9l4 4v14H6zM9 11h7M9 15h7M9 19h4",
};
const Ico = ({ d }) => <i className="tg-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={d} /></svg></i>;

const START = [
  { i: "app", t: "You have an app", d: "I audit it, find the gaps that cost you users and fix them flow by flow, inside your team. Your features stay as they are, so nothing has to be rebuilt or relearned." },
  { i: "zero", t: "You are starting from zero", d: "I take the product from the first user flow to final screens, a design system and a clickable prototype your developers can build from." },
];

const WORK = [
  { i: "audit", t: "UX audits", d: "I review your product screen by screen against Nielsen's 10 usability heuristics and WCAG accessibility rules, and find the gaps.", g: "A written audit: every issue, how serious it is and the fix" },
  { i: "sprint", t: "UI/UX sprints", d: "One clear problem, one focused week. I take it from the brief to final screens and a clickable prototype.", g: "Flows, UI and a prototype in Figma" },
  { i: "redesign", t: "Redesigns", d: "An existing app made clearer and more consistent, or a new product designed from zero on a system your team can keep using.", g: "Final UI and a design system in Figma" },
  { i: "test", t: "Product analysis and UX testing", d: "I read your funnels and analytics, then watch real people use the product to see where they get stuck.", g: "Test findings and drop-off points, ranked by impact" },
  { i: "ab", t: "A/B testing", d: "I design the variants, agree what to measure and read the results with you, so changes rest on numbers.", g: "A test plan, the variants and a results summary" },
  { i: "doc", t: "UX documentation and Figma handoff", d: "User flows, UX specs, guidelines and production-ready Figma, so your team can build without guessing.", g: "Docs and organized Figma files that are yours" },
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
    <section className="hw" id="how" aria-labelledby="hw-h" data-bg="#171719">
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
        <ul className="hw-start">
          {START.map((s) => (
            <li key={s.t}>
              <Ico d={IC[s.i]} />
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ul>
        <ul className="hw-terms" aria-label="Ways to work together">
          <li>Fixed-scope audits</li>
          <li>Weekly sprints</li>
          <li>Monthly, inside your team</li>
        </ul>

        {/* tabIndex: on phones this row scrolls sideways, so keyboard users can focus it and use the arrow keys. */}
        <ul className="hw-grid" aria-label="Services" tabIndex={0}>
          {WORK.map((w) => (
            <li key={w.t}>
              <Ico d={IC[w.i]} />
              <h3>{w.t}</h3>
              <p>{w.d}</p>
              <p className="hw-get"><b>You get</b>{w.g}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
