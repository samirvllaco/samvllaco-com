import CallIcon from "./CallIcon";
import { PROJECT_FROM, TRIAL_WEEK, usd } from "../lib/plans";

// "Pick your designer" (owner, 27 Nov 2026: "add a pick your designer CTA at the bottom so they can call me and start
// working, I need to look like a hireable product and solution"). Sam as a product listing: who, what is included,
// where it starts, and two ways in. Numbers are the site's own (Bento: 10 years, 573 clients, 10,000+ screens).
const INCLUDED = ["UX audits", "UI/UX sprints", "Redesigns", "Design systems", "Front end builds"];
const FOR = ["SaaS", "AI", "Fintech", "Health", "Law firms", "E-commerce"];

export default function PickDesigner() {
  return (
    <section className="pd" aria-labelledby="pd-h">
      <h2 id="pd-h">Pick your designer <span className="t2">and get started</span></h2>
      <div className="pd-card">
        <div className="pd-who">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/me/sam-front-480.webp?v=1" width="480" height="480" alt="Sam Vllaco" loading="lazy" decoding="async" />
          <div className="pd-id">
            <p className="pd-pick"><i aria-hidden="true"><svg viewBox="0 0 24 24" width="12" height="12"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></i>Selected</p>
            <p className="pd-name">Sam Vllaco</p>
            <p className="pd-role">Senior product designer, Tirana. Works in US hours.</p>
            <p className="pd-live"><i aria-hidden="true" />Taking 1 to 2 new projects at a time</p>
          </div>
        </div>
        <dl className="pd-facts">
          <div><dt>10</dt><dd>years designing</dd></div>
          <div><dt>573</dt><dd>clients served</dd></div>
          <div><dt>10,000+</dt><dd>screens designed</dd></div>
        </dl>
        <div className="pd-lists">
          <div><p className="pd-k">Included</p><ul>{INCLUDED.map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div><p className="pd-k">Industries</p><ul>{FOR.map((x) => <li key={x}>{x}</li>)}</ul></div>
        </div>
        <div className="pd-buy">
          <p className="pd-price"><b>From {usd(PROJECT_FROM)}</b><span>or a {usd(TRIAL_WEEK)} trial week first</span></p>
          <div className="btn-row">
            <a className="hero2-btn hero2-btn-primary" href="/book/">Hire Sam<CallIcon /></a>
            <a className="hero2-btn hero2-btn-light" href="/book/#calendar">Book a 30-min call</a>
          </div>
        </div>
      </div>
    </section>
  );
}
