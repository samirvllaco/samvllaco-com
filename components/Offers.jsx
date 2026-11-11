import CallIcon from "./CallIcon";

// Home: the three ways to work together, and the process in four steps.
const WAYS = [
  { t: "Fix one flow", d: "One to two weeks.", p: "One flow or one set of screens (onboarding, checkout, a dashboard) redesigned and handed over dev-ready." },
  { t: "Design partner, monthly", d: "Ongoing.", p: "Product design for a team that ships every week. Weekly call, Figma always up to date, questions answered as they come." },
  { t: "New product, start to finish", d: "Four to eight weeks.", p: "Flows, screens, design system and handover, plus two weeks of developer support." },
];
const STEPS = [
  { t: "Call", d: "30 min", p: "You show me the product. I tell you what I would change first." },
  { t: "Scope", d: "2 days", p: "Written scope, fixed price, start date. You say yes or no." },
  { t: "Design", d: "Weekly", p: "A Figma link that is always current and a short written update every week. Changes while we go, not at the end." },
  { t: "Handover", d: "At the end", p: "Dev-ready Figma, components, states and a walkthrough. Two weeks of developer questions included." },
];

export function Offers() {
  return (
    <section className="bx-sec" aria-labelledby="of-h" data-bg="#000000">
      <h2 id="of-h">Three ways to work together</h2>
      <p className="bx-lede">Best fit: SaaS and AI teams of 2 to 30 people with a live product and a backlog of screens.</p>
      <div className="of-grid">
        {WAYS.map((w) => (
          <div className="bx-card of-card" key={w.t}>
            <p className="of-d">{w.d}</p>
            <h3>{w.t}</h3>
            <p>{w.p}</p>
          </div>
        ))}
      </div>
      <div className="of-foot">
        <p>Every project starts with a 30 minute call and a fixed quote. No hourly billing.</p>
        <a className="btn btn-primary" href="/book/"><CallIcon />Schedule a call</a>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="bx-sec" aria-labelledby="pr-h" data-bg="#000000">
      <h2 id="pr-h">No guesswork. No surprises.</h2>
      <p className="bx-lede">Clear milestones, regular updates, and designs your developers can actually use.</p>
      <ol className="of-grid pr-grid">
        {STEPS.map((s, i) => (
          <li className="bx-card of-card" key={s.t}>
            <p className="of-d"><b>{String(i + 1).padStart(2, "0")}</b>{s.d}</p>
            <h3>{s.t}</h3>
            <p>{s.p}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
