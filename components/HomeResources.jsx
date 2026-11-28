import CallIcon from "./CallIcon";
import TabSwitch from "./TabSwitch";
import { LADDER } from "../lib/plans";

// Home page: Resources as tabs (owner, 28 Nov 2026: "add resources tab on homepage"). The free audit, the Slop Score,
// the free tools and the ebook, one at a time: a tab row, then a panel with what it is, three plain points, one button
// and a picture of the real thing. Every panel is in the page for search and without JS; only the picked one shows.
// The picture opens from a soft clip when its tab is picked; the words never move or fade. Rendered on the server; the
// small TabSwitch only flips which panel shows, so the home page ships almost no extra code.
const BOOK = (LADDER.find((l) => l.href === "/fix-ai-slop-ui/") || {}).price || "";
const TABS = [
  {
    k: "audit", tab: "Free UX audit", chip: "Free", t: "A free UX audit, recorded by me",
    p: "Send me your product and I record a Loom of what I would fix first. I do every audit myself.",
    pts: ["A personal video from me, not a bot", "What to fix first, in order", "No call needed to get it"],
    cta: "Get a free audit", href: "/free-audit/",
  },
  {
    k: "slop", tab: "Slop Score", chip: "Free", t: "See how AI-generated your site looks",
    p: "Paste your address and in under a minute you get a Slop Score, what drags it down and how to fix it.",
    pts: ["A score from 0 to 100", "7 checks, from spacing to copy", "Your top 3 fixes, free"],
    cta: "Check my site", href: "/slop-score/",
  },
  {
    k: "tools", tab: "Free tools", chip: "Free", t: "Small tools I use on client work",
    p: "Quick checks you can run on your own product today. No sign-up and nothing to install.",
    pts: ["Color contrast checker for WCAG 2.2", "Design cost calculator", "Slop Score for live sites"],
    cta: "See all tools", href: "/tools/",
  },
  {
    k: "book", tab: "The ebook", chip: BOOK, t: "27 Copy-Paste Prompts to Fix AI Slop UI",
    p: "The steps and prompts I use to make AI-built apps look designed, for Lovable, Cursor and Claude Code.",
    pts: ["27 steps, each with a prompt", "A DESIGN.md your AI tools follow", "A private video walkthrough"],
    cta: "See the book", href: "/fix-ai-slop-ui/",
  },
];

function Visual({ k }) {
  if (k === "audit") return (
    <div className="hres-vis hres-loom" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hres-shot" src="/work/wd/ba-before.webp?v=1" width="720" height="540" loading="lazy" decoding="async" alt="" />
      <span className="hres-play"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg></span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hres-face" src="/sam-face-144.webp?v=1" width="72" height="72" loading="lazy" decoding="async" alt="" />
      <span className="hres-bar"><i /></span>
    </div>
  );
  if (k === "slop") return (
    <div className="hres-vis" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hres-shot" src="/tools/thumb/slop-score.webp?v=2" width="800" height="500" loading="lazy" decoding="async" alt="" />
    </div>
  );
  if (k === "tools") return (
    <div className="hres-vis hres-pair" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hres-a" src="/tools/thumb/contrast-checker.webp?v=2" width="800" height="500" loading="lazy" decoding="async" alt="" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hres-b" src="/tools/thumb/design-cost-calculator.webp?v=2" width="800" height="500" loading="lazy" decoding="async" alt="" />
    </div>
  );
  return (
    <div className="hres-vis hres-book" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/ebook/cover-520.webp?v=1" width="520" height="736" loading="lazy" decoding="async" alt="" />
    </div>
  );
}

export default function HomeResources() {
  return (
    <section className="hres" aria-labelledby="hres-h" data-bg="#0e0e10">
      <header className="hres-head">
        <h2 id="hres-h">Resources <span className="t2">to start on your own</span></h2>
        <p>A free audit, free tools and a short book, for when you want to fix things yourself before you hire anyone.</p>
      </header>
      <div className="hres-tabs" role="tablist" aria-label="Resources">
        {TABS.map((x, k) => (
          <button key={x.k} type="button" role="tab" id={`hres-tab-${x.k}`} aria-selected={k === 0} aria-controls={`hres-p-${x.k}`} tabIndex={k === 0 ? 0 : -1} className={k === 0 ? "is-on" : undefined}>
            {x.tab}
          </button>
        ))}
      </div>
      {TABS.map((x, k) => (
        <div key={x.k} className="hres-panel" role="tabpanel" id={`hres-p-${x.k}`} aria-labelledby={`hres-tab-${x.k}`} hidden={k !== 0}>
          <div className="hres-txt">
            <span className={`hres-chip${x.chip === "Free" ? " is-free" : ""}`}>{x.chip}</span>
            <h3>{x.t}</h3>
            <p>{x.p}</p>
            <ul>{x.pts.map((t) => <li key={t}>{t}</li>)}</ul>
            <a className="hero2-btn hero2-btn-primary" href={x.href}>{x.cta}<CallIcon /></a>
          </div>
          <Visual k={x.k} />
        </div>
      ))}
      <TabSwitch list=".hres-tabs" />
    </section>
  );
}
