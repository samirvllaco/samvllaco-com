"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { WORK, WORK_TAGS } from "../lib/work";
import { play } from "../lib/delight";
import { useSeen } from "./Seen";

const TABS = [{ id: "all", label: "All" }, ...WORK_TAGS.filter((t) => WORK.some((w) => w.tags.includes(t))).map((t) => ({ id: t, label: t }))];


function WorkCard({ w, seen }) {
  const vid = w.video;
  const vref = useRef(null);
  const [live, setLive] = useState(false);
  function start() {
    const v = vref.current;
    if (!v) return;
    try { v.currentTime = 0; } catch (e) {}
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
    setLive(true);
  }
  function stop() {
    const v = vref.current;
    setLive(false);
    if (v) v.pause();
  }
  return (
    <Link href={`/work/${w.slug}/`} className="work-card" onMouseEnter={vid ? start : undefined} onMouseLeave={vid ? stop : undefined} onFocus={vid ? start : undefined} onBlur={vid ? stop : undefined}>
      <span className="work-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={w.big} srcSet={`${w.small} ${w.smallW}w, ${w.big} ${w.w}w`} sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 500px" width={w.w} height={w.h} alt={w.alt} loading="lazy" />
        {vid ? (
          <video ref={vref} className={live ? "is-live" : undefined} src={vid} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />
        ) : null}
        {seen ? <span className="work-seen"><svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path d="M5 12.500l4.500 4.500L19 7.500" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>Viewed</span> : null}
        <span className="work-open" aria-hidden="true">View case study <span>→</span></span>
      </span>
      <span className="work-meta">
        <span className="work-title">{w.title}<span className="work-arrow" aria-hidden="true">→</span></span>
        <span className="work-tags">{w.tags.map((t) => <span key={t}>{t}</span>)}</span>
      </span>
    </Link>
  );
}

export default function WorkGrid() {
  const [tab, setTab] = useState("all");
  const [device, setDevice] = useState("all");
  const refs = useRef({});
  const seenList = useSeen();
  const items = WORK.filter((w) => (tab === "all" || w.tags.includes(tab)) && (device === "all" || w.platform === device));

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
      {TABS.length > 2 && WORK.length > 1 ? (
      <div className="work-bar">
      <div className="tags" role="tablist" aria-label="Filter work by category">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { refs.current[t.id] = el; }}
            id={`work-tab-${i}`}
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
      <div className="device-switch" role="group" aria-label="Show desktop or mobile work">
        <button type="button" aria-pressed={device === "desktop"} aria-label="Desktop work" title="Desktop" onClick={() => { setDevice(device === "desktop" ? "all" : "desktop"); play("tab"); }}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>
        </button>
        <button type="button" aria-pressed={device === "mobile"} aria-label="Mobile work" title="Mobile" onClick={() => { setDevice(device === "mobile" ? "all" : "mobile"); play("tab"); }}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.500h2" /></svg>
        </button>
      </div>
      </div>
      ) : null}
      <div id="work-panel" role="tabpanel" aria-labelledby={`work-tab-${TABS.findIndex((t) => t.id === tab)}`} className="work-panel" key={`${tab}-${device}`}>
        {items.length === 0 ? (
          <p className="work-empty">More projects are coming soon.</p>
        ) : (
          <div className={`work-grid${items.length === 1 ? " is-single" : ""}`}>
            {items.map((w) => (
              <WorkCard key={w.slug} w={w} seen={seenList.includes(w.slug)} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
