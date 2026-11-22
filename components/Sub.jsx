// Design subscription sections: how it works, what you can request, why a subscription, the plans.
import Link from "next/link";
import CallIcon from "./CallIcon";
import { PLANS, STEPS, REQUESTS, WHY } from "../lib/plans";

export function HowItWorks() {
  return (
    <section className="sub-sec lite" id="how" aria-labelledby="how-h" data-bg="#0b0b0c">
      <header className="sub-head">
        <h2 id="how-h">How it <span className="t2">works</span></h2>
        <p>A design subscription instead of a project. Three steps, then repeat.</p>
      </header>
      <ol className="sub-steps">
        {STEPS.map((s, i) => (
          <li key={s.t}><i aria-hidden="true">{i + 1}</i><h3>{s.t}</h3><p>{s.d}</p></li>
        ))}
      </ol>
      <div className="sub-req">
        <h3>What you can request</h3>
        <ul>{REQUESTS.map((r) => <li key={r}>{r}</li>)}</ul>
      </div>
    </section>
  );
}

export function WhySub() {
  return (
    <section className="sub-sec lite" aria-labelledby="why-h" data-bg="#0b0b0c">
      <header className="sub-head">
        <h2 id="why-h">Why a <span className="t2">subscription</span></h2>
        <p>Hiring takes months and agencies bill for meetings. This is one designer, one price and work that keeps moving.</p>
      </header>
      <ul className="sub-why">
        {WHY.map((w) => <li key={w.t}><h3>{w.t}</h3><p>{w.d}</p></li>)}
      </ul>
    </section>
  );
}

export function PlanCards() {
  return (
    <ul className="pr-plans pr-two">
      {PLANS.map((p) => (
        <li key={p.k} className={`pr-plan${p.hot ? " is-hot" : ""}`}>
          <p className="pr-k">{p.k}{p.hot ? <span>Most picked</span> : null}</p>
          <p className="pr-price">{p.price}<span>{p.per}</span></p>
          <p className="pr-lead">{p.lead}</p>
          <ul className="pr-items">{p.items.map((t) => <li key={t}>{t}</li>)}</ul>
          <p className="pr-eg"><b>For example</b>{p.eg}</p>
          <Link prefetch={false} className={`hero2-btn ${p.hot ? "hero2-btn-primary" : "hero2-btn-light"}`} href="/book/">{p.hot ? <CallIcon /> : null}Book a call<span className="sr-only"> about the {p.k.toLowerCase()} plan</span></Link>
        </li>
      ))}
    </ul>
  );
}

export function Plans() {
  return (
    <section className="sub-plans" id="plans" aria-labelledby="plans-h" data-bg="#000000">
      <header className="sub-head">
        <h2 id="plans-h">Two plans. <span className="t2">One designer.</span></h2>
        <p>Start with a week, or keep me on every month. You know the price before anything starts.</p>
      </header>
      <PlanCards />
      <p className="sub-note">Not sure which one fits? <Link prefetch={false} href="/book/">Book a call</Link> and I will tell you honestly. Smaller budget? See <Link prefetch={false} href="/pricing/#pr-start-h">the book and reviews</Link>.</p>
    </section>
  );
}
