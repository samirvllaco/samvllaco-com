"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// Floating case study navigation, shown after some scrolling:
// one centred bar: previous, all work, top (its border fills as you read), next.
// Left and right arrow keys also move between case studies.
const Arrow = ({ d }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d={d} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function CaseFab({ prev, next }) {
  const [on, setOn] = useState(false);
  const [read, setRead] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      setOn(window.scrollY > 700);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setRead(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable) return;
      if (e.key === "ArrowLeft" && prev) window.location.href = prev.href;
      if (e.key === "ArrowRight" && next) window.location.href = next.href;
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, [prev, next]);
  function top() {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }
  const t = on ? 0 : -1;
  return (
    <nav className={`case-fab${on ? " is-on" : ""}`} aria-label="Case study navigation" aria-hidden={!on}>
      {prev ? <Link prefetch={false} href={prev.href} tabIndex={t} aria-label={`Previous case study: ${prev.title}`} className="case-fab-ic"><Arrow d="M19 12H5M11 6l-6 6 6 6" /><span className="case-fab-tip">{prev.title}</span></Link> : null}
      <Link prefetch={false} href="/work/" tabIndex={t}><Arrow d="M4 6h7v7H4zM13 6h7v7h-7zM4 15h7v3H4zM13 15h7v3h-7z" /> All work</Link>
      <button type="button" onClick={top} tabIndex={t} className="case-fab-top" style={{ "--read": read }} aria-label={`Back to top, ${Math.round(read * 100)}% read`}><Arrow d="M12 19V5M6 11l6-6 6 6" /> Top</button>
      {next ? <Link prefetch={false} href={next.href} tabIndex={t} className="case-fab-next"><span><small>Next</small>{next.title}</span><Arrow d="M5 12h14M13 6l6 6-6 6" /></Link> : null}
    </nav>
  );
}
