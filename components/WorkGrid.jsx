"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { WORK } from "../lib/work";
import { play } from "../lib/delight";
import { useSeen, WorkProgress } from "./Seen";

const TABS = [
  { id: "all", label: "All" },
  { id: "desktop", label: "Desktop" },
  { id: "mobile", label: "Mobile" },
];


function WorkCard({ w, seen }) {
  const vref = useRef(null);
  const [live, setLive] = useState(false);
  function start() {
    const v = vref.current;
    if (!v) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.currentTime = 0;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }
  function stop() {
    const v = vref.current;
    if (!v) return;
    v.pause();
    setLive(false);
  }
  const vid = w.video;
  return (
    <Link
      href={`/work/${w.slug}/`}
      className="work-card"
      onMouseEnter={vid ? start : undefined}
      onMouseLeave={vid ? stop : undefined}
      onFocus={vid ? start : undefined}
      onBlur={vid ? stop : undefined}
    >
      <span className="work-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={w.big} srcSet={`${w.small} ${w.smallW}w, ${w.big} ${w.w}w`} sizes="(max-width: 900px) 100vw, 380px" width={w.w} height={w.h} alt={w.alt} loading="lazy" />
        {vid ? (
          <video ref={vref} className={live ? "is-live" : ""} src={vid} muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} onPlaying={() => setLive(true)} />
        ) : null}
        {seen ? <span className="work-seen"><svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path d="M5 12.500l4.500 4.500L19 7.500" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>Viewed</span> : null}
      </span>
      <span className="work-meta">
        <span className="work-title">{w.title}</span>
        <span className="work-sub">{w.sub}</span>
      </span>
    </Link>
  );
}

export default function WorkGrid() {
  const [tab, setTab] = useState("all");
  const refs = useRef({});
  const seenList = useSeen();
  const items = tab === "all" ? WORK : WORK.filter((w) => w.platform === tab);

  function onKey(e, i) {
    let n = null;
    if (e.key === "ArrowRight") n = (i + 1) % TABS.length;
    if (e.key === "ArrowLeft") n = (i + TABS.length - 1) % TABS.length;
    if (n === null) return;
    e.preventDefault();
    setTab(TABS[n].id);
    refs.current[TABS[n].id]?.focus();
  }

  return (
    <>
      <div className="work-bar">
      <div className="seg" role="tablist" aria-label="Filter work by device">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { refs.current[t.id] = el; }}
            id={`work-tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            aria-controls="work-panel"
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => { setTab(t.id); play("tab"); }}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <WorkProgress />
      </div>
      <div id="work-panel" role="tabpanel" aria-labelledby={`work-tab-${tab}`} className="work-panel" key={tab}>
        {items.length === 0 ? (
          <p className="work-empty">Mobile projects are coming soon.</p>
        ) : (
          <div className="work-grid">
            {items.map((w) => (
              <WorkCard key={w.slug} w={w} seen={seenList.includes(w.slug)} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
