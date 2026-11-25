// Four quick facts with small line icons that move quietly (owner, 25 Nov 2026, after lp.cosmos.studio).
// Plain SVG and CSS: no JS, paused until the first interaction like all ambient motion, still for reduced motion.
const FACTS = [
  { ico: "globe", t: "Based in Europe", d: "Tirana, working with teams worldwide" },
  { ico: "orbit", t: "One senior designer", d: "You work with me from first call to handover" },
  { ico: "clock", t: "US hours overlap", d: "Calls in US business hours" },
  { ico: "check", t: "About 48 hours", d: "Most requests come back in about two days" },
];

const ICONS = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <ellipse className="fr-m1" cx="12" cy="12" rx="4" ry="9" />
      <ellipse className="fr-m2" cx="12" cy="12" rx="4" ry="9" />
    </>
  ),
  orbit: (
    <g className="fr-spin">
      <circle cx="12" cy="4.5" r="1.6" className="fr-dot" />
      <circle cx="18.5" cy="15.75" r="1.6" className="fr-dot" />
      <circle cx="5.5" cy="15.75" r="1.6" className="fr-dot" />
      <circle cx="12" cy="12" r="1.2" className="fr-dot fr-core" />
    </g>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 12V7.5" className="fr-hour" />
      <path d="M12 12h4.5" className="fr-min" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.7 2.7L16.2 9.5" className="fr-tick" pathLength="1" />
    </>
  ),
};

export default function FactRow() {
  return (
    <ul className="fr-row">
      {FACTS.map((f) => (
        <li key={f.t}>
          <svg className={`fr-ico fr-${f.ico}`} viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">{ICONS[f.ico]}</svg>
          <p><b>{f.t}</b><span>{f.d}</span></p>
        </li>
      ))}
    </ul>
  );
}
