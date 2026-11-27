"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Hero work window (owner, 27 Nov 2026: "dont copy them, come up with our own better version").
// Sam's desk, not a video player: a design file window with one tab per project, the work on a dotted canvas
// under its frame label, and a status bar with the project's tags and a link to the case study.
// The active tab's top line and a bar along the frame's foot fill while it plays, then the next tab opens;
// a small spinner shows while a clip is still loading.
// First frame is a still image; videos load and the tabs advance only after the first interaction (html.is-live),
// everything pauses off screen, and with reduced motion it stays on the chosen tab.
// The page passes only the fields this needs, so lib/work.js stays out of the bundle.
export default function HeroShow({ items: LIST }) {
  const [i, setI] = useState(0);
  const [live, setLive] = useState(false);
  const [seen, setSeen] = useState(true);
  const [wait, setWait] = useState(false);
  const root = useRef(null);

  useEffect(() => {
    const h = document.documentElement;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (h.classList.contains("is-live")) { setLive(true); return; }
    const mo = new MutationObserver(() => { if (h.classList.contains("is-live")) { setLive(true); mo.disconnect(); } });
    mo.observe(h, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting));
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;
    root.current?.querySelectorAll("video").forEach((v, k) => {
      if (k === i && seen) {
        if (!v.getAttribute("src")) v.setAttribute("src", v.dataset.src);
        // Spinner until the clip actually plays; a cached clip starts at once and never shows it.
        if (v.readyState < 3) setWait(true);
        v.onplaying = () => setWait(false);
        v.onwaiting = () => setWait(true);
        v.play().catch(() => setWait(false));
      } else { v.pause(); v.onplaying = v.onwaiting = null; }
    });
  }, [i, live, seen]);

  const w = LIST[i];
  const next = () => setI((v) => (v + 1) % LIST.length);
  return (
    <div className="hero-show" ref={root} data-live={live ? "" : undefined} data-paused={seen ? undefined : ""}>
      <div className="hs-bar">
        <span className="hs-dots" aria-hidden="true"><i /><i /><i /></span>
        <div className="hs-tabs">
          {LIST.map((x, k) => (
            <button type="button" key={x.slug} className={k === i ? "is-on" : undefined} aria-pressed={k === i} onClick={() => setI(k)}>
              {x.tab}<span className="sr-only">: {x.title}</span>
              <i aria-hidden="true" onAnimationEnd={k === i ? next : undefined} />
            </button>
          ))}
        </div>
      </div>
      <div className="hs-canvas">
        <p className="hs-label"><svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path d="M8 3v18M16 3v18M3 8h18M3 16h18" /></svg>{w.title}</p>
        <Link prefetch={false} className="hs-frame" href={`/work/${w.slug}/`} tabIndex={-1} aria-hidden="true">
          {LIST.map((x, k) => (
            <span className={`hs-slide${k === i ? " is-on" : ""}`} key={x.slug}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={x.small} width={x.smallW} height={Math.round((x.smallW * x.h) / x.w)} alt="" loading={k ? "lazy" : "eager"} fetchPriority={k ? undefined : "high"} decoding="async" />
              {live ? <video muted loop playsInline preload="none" poster={x.small} data-src={x.video} /> : null}
            </span>
          ))}
          <i className="hs-prog" aria-hidden="true" key={`p${i}`} />
          {live && wait ? <span className="hs-spin" aria-hidden="true" /> : null}
        </Link>
      </div>
      <div className="hs-status">
        <p className="hs-tags">{w.tags.map((t) => <span key={t}>{t}</span>)}</p>
        <Link prefetch={false} className="hs-link" href={`/work/${w.slug}/`}>Case study<span className="sr-only">: {w.title}</span><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
      </div>
    </div>
  );
}
