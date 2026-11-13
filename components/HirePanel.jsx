import CallIcon from "./CallIcon";
import CopyEmailInline from "./HirePanelCopy";

// Two panel "why work with me" section on the home page.
// Left: what AI speeds up and what is designed by hand. Right: photo, industries and the call to action.
// Photo: replace public/sam-panel.webp (falls back to the footer portrait until it exists).
const AUTO = [["system", "Design system upkeep"], ["layers", "Screen variants and states"], ["text", "Copy and clarity checks"], ["ruler", "Consistency rules"], ["access", "Accessibility checks"]];
const HAND = [["flow", "Core user flows"], ["screen", "What goes on the first screen"], ["spark", "Signature interactions"], ["wave", "Onboarding and empty states"], ["cart", "Signup and checkout steps"]];
const FIELDS = ["SaaS", "AI products", "Fintech", "Healthcare", "LegalTech", "Cybersecurity", "E-commerce", "EdTech", "Dashboards", "Marketplaces", "Mobile apps", "Language learning", "Editorial", "Sports", "Marketing sites", "Design systems"];

export default function HirePanel({ photo = "/sam-footer.webp" }) {
  return (
    <section className="hp" aria-labelledby="hp-h" data-bg="#1f1f22">
      <div className="hp-left">
        <h2 id="hp-h">AI does the repetitive half.<br /><em>I do the half your users remember.</em></h2>
        <p className="hp-lede">AI handles the busywork: variants, states, consistency and accessibility checks, all run against rules I set. That buys time for the parts your users actually feel, the first screen, the core flows, onboarding and checkout, which I design by hand so it looks like your product and nobody else's.</p>
        <div className="hp-cols">
          <div>
            <p className="hp-label">Defined once, then automated</p>
            <ul className="hp-ico">{AUTO.map(([i, t]) => <li key={t} data-i={i}>{t}</li>)}</ul>
          </div>
          <div className="hp-hand">
            <p className="hp-label">Designed by hand</p>
            <ul className="hp-ico">{HAND.map(([i, t]) => <li key={t} data-i={i}>{t}</li>)}</ul>
          </div>
        </div>
        <div className="hp-ind">
          <p className="hp-label">Industries I have designed for</p>
          <ul className="hp-fields">{FIELDS.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </div>
      <div className="hp-right">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hp-photo" src={photo} width="1254" height="1254" alt="" loading="lazy" />
        <div className="hp-shade" aria-hidden="true" />
        <div className="hp-body">
          <h3>10 years of product design across industries,<br /><em>with one designer from first call to handover.</em></h3>
          <p>You always work with me. I take the call, design the screens and hand over the files myself.</p>
          <div className="hp-cta">
            <a className="btn btn-primary" href="/book/"><CallIcon />Book a call</a>
            <CopyEmailInline />
          </div>
        </div>
      </div>
    </section>
  );
}
