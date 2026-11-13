import CallIcon from "./CallIcon";
import CopyEmailInline from "./HirePanelCopy";

// Two panel "why work with me" section on the home page.
// Left: what AI speeds up and what is designed by hand. Right: photo, industries and the call to action.
// Photo: replace public/sam-panel.webp (falls back to the footer portrait until it exists).
const AUTO = [["system", "Design system upkeep"], ["layers", "Screen variants and states"], ["text", "Copy and clarity checks"], ["ruler", "Consistency rules"], ["access", "Accessibility checks"]];
const HAND = [["flow", "Core user flows"], ["screen", "What goes on the first screen"], ["spark", "Signature interactions"], ["wave", "Onboarding and empty states"], ["cart", "Signup and checkout steps"]];
const FIELDS = [
  ["SaaS", "M4 7h16v10H4zM4 11h16"], ["AI products", "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"], ["Fintech", "M3 7h18v10H3zM7 12h.01M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"], ["Healthcare", "M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"],
  ["LegalTech", "M12 4v16M6 20h12M5 8l-2 6a3 3 0 0 0 4 0zM19 8l-2 6a3 3 0 0 0 4 0zM5 8h14"], ["Cybersecurity", "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"], ["E-commerce", "M5 8h14l-1 12H6zM9 8a3 3 0 0 1 6 0"], ["EdTech", "M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5"],
  ["Dashboards", "M4 20V10M10 20V4M16 20v-7M22 20H2"], ["Marketplaces", "M4 9l1-5h14l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6"], ["Mobile apps", "M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2"], ["Language learning", "M4 5h10M9 3v2M6 5c1 4 4 7 7 8M12 5c-1 4-4 7-7 8M14 21l4-9 4 9M15.5 18h5"],
  ["Editorial", "M5 4h11l3 3v13H5zM8 9h8M8 13h8M8 17h5"], ["Sports", "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3.5 9h17M3.5 15h17M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"], ["Marketing sites", "M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01"], ["Design systems", "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM16.5 13a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"],
];

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
          <ul className="hp-fields">{FIELDS.map(([t, d]) => <li key={t}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>{t}</li>)}</ul>
        </div>
      </div>
      <div className="hp-right">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hp-photo" src={photo} width="1254" height="1254" alt="" loading="lazy" />
        <div className="hp-shade" aria-hidden="true" />
        <div className="hp-body">
          <h3>You found the designer,<br /><em>not another agency.</em></h3>
          <p>No account managers and no junior handoffs. For 10 years I've taken every call, designed every screen and handed over the files myself, so what we talk about is what you get.</p>
          <div className="hp-cta">
            <a className="btn btn-primary" href="/book/"><CallIcon />Book a call</a>
            <CopyEmailInline />
          </div>
        </div>
      </div>
    </section>
  );
}
