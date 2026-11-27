"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { WORK, WORK_TAGS } from "../lib/work";
import { play } from "../lib/delight";
import { useSeen } from "./Seen";
import PhoneApps from "./PhoneApps";
import { PHONE_APPS } from "../lib/phones";
import { INDUSTRIES } from "../lib/industries";

const DARK = ["room-editor", "language-player", "mobile-banking"];
const TABS = [{ id: "all", label: "All" }, ...WORK_TAGS.filter((t) => WORK.some((w) => w.tags.includes(t))).map((t) => ({ id: t, label: t }))];


function Chev() {
  return <svg className="wf-chev" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>;
}

function X() {
  return <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>;
}

function WorkCard({ w, seen, first }) {
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
    <Link prefetch={false} href={`/work/${w.slug}/`} className="work-card" onMouseEnter={vid ? start : undefined} onMouseLeave={vid ? stop : undefined} onFocus={vid ? start : undefined} onBlur={vid ? stop : undefined}>
      <span className="work-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={w.big} srcSet={`${w.small} ${w.smallW}w, ${w.big} ${w.w}w`} sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 500px" width={w.w} height={w.h} alt={w.alt} loading={first ? "eager" : "lazy"} fetchPriority={first ? "high" : undefined} />
        {vid ? (
          <video ref={vref} className={live ? "is-live" : undefined} src={vid} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />
        ) : null}
        {seen ? <span className="work-seen"><svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path d="M5 12.500l4.500 4.500L19 7.500" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>Viewed</span> : null}
        <span className="work-open" aria-hidden="true"><span className="work-open-t">View case study</span><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg></span>
      </span>
      <span className="work-meta">
        <span className="work-title">{w.title}</span>
        <span className="work-tags">{w.tags.map((t) => <span key={t}>{t}</span>)}</span>
      </span>
    </Link>
  );
}

// cap: on the home page show two rows first, with a button for the rest (owner, 26 Nov 2026: about one screen per section).
export default function WorkGrid({ cap = false }) {
  const [tab, setTab] = useState("all");
  const [more, setMore] = useState(false);
  const grid = useRef(null);
  const [device, setDevice] = useState("all");
  const [look, setLook] = useState("all");
  // Filters sit behind one toggle so the work starts right under the page title (owner, 27 Nov 2026: "collapsible with
  // toggle", "see work sooner without much scroll").
  const [open, setOpen] = useState(false);
  const refs = useRef({});
  const seenList = useSeen();
  const items = WORK.filter((w) => (tab === "all" || w.tags.includes(tab)) && (device === "all" || w.platform === device) && (look === "all" || (DARK.includes(w.slug) ? "dark" : "light") === look));
  // Filters always show every match; the cap only applies to the unfiltered list.
  const capped = cap && !more && tab === "all" && device === "all" && look === "all";

  function showAll() {
    const shown = grid.current ? [...grid.current.querySelectorAll(".work-card")].filter((a) => a.offsetParent !== null).length : 0;
    setMore(true);
    // Move focus to the first card that just appeared, so keyboard users carry on where they were.
    requestAnimationFrame(() => grid.current?.querySelectorAll(".work-card")[shown]?.focus());
  }

  function onKey(e, i) {
    let n = null;
    if (e.key === "ArrowRight") n = (i + 1) % TABS.length;
    if (e.key === "ArrowLeft") n = (i + TABS.length - 1) % TABS.length;
    if (n === null) return;
    e.preventDefault();
    setTab(TABS[n].id);
    refs.current[TABS[n].id]?.focus();
  }

  const active = (tab !== "all" ? 1 : 0) + (device !== "all" ? 1 : 0) + (look !== "all" ? 1 : 0);
  const ind = INDUSTRIES.find((x) => x.name === tab);
  const pick = (fn) => { fn(); play("tab"); };

  return (
    <>
      {TABS.length > 2 && WORK.length > 1 ? (
      <div className="wf">
        <div className="wf-bar">
          <button type="button" className="wf-toggle" aria-expanded={open} aria-controls="wf-panel" onClick={() => setOpen(!open)}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg>
            Filters{active ? <span className="wf-n">{active}<span className="sr-only"> on</span></span> : null}<Chev />
          </button>
          <div className="wf-state" aria-live="polite">
            <span className="af-count">{items.length} {items.length === 1 ? "project" : "projects"}</span>
            {tab !== "all" ? <button type="button" className="wf-chip" onClick={() => setTab("all")} aria-label={`Remove filter ${tab}`}>{tab}<X /></button> : null}
            {device !== "all" ? <button type="button" className="wf-chip" onClick={() => setDevice("all")} aria-label={`Remove filter ${device}`}>{device === "mobile" ? "Mobile" : "Desktop"}<X /></button> : null}
            {look !== "all" ? <button type="button" className="wf-chip" onClick={() => setLook("all")} aria-label={`Remove filter ${look} designs`}>{look === "dark" ? "Dark designs" : "Light designs"}<X /></button> : null}
            {active > 1 ? <button type="button" className="af-clear" onClick={() => { setTab("all"); setDevice("all"); setLook("all"); }}>Clear all</button> : null}
          </div>
        </div>
        <div id="wf-panel" className={`wf-panel${open ? " is-open" : ""}`} inert={!open}>
          <div className="wf-clip">
            <div className="wf-box">
              <div className="wf-group">
                <p className="wf-k" id="wf-k-type">Industry and type</p>
                <div className="tags" role="tablist" aria-labelledby="wf-k-type">
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
                      onClick={() => pick(() => setTab(tab === t.id ? "all" : t.id))}
                      onKeyDown={(e) => onKey(e, i)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="wf-group">
                <p className="wf-k" id="wf-k-dev">Device</p>
                <div className="device-switch" role="group" aria-labelledby="wf-k-dev">
                  <button type="button" aria-pressed={device === "desktop"} onClick={() => pick(() => setDevice(device === "desktop" ? "all" : "desktop"))}>
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg><span className="sw-l">Desktop</span>
                  </button>
                  <button type="button" aria-pressed={device === "mobile"} onClick={() => pick(() => setDevice(device === "mobile" ? "all" : "mobile"))}>
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.500h2" /></svg><span className="sw-l">Mobile</span>
                  </button>
                </div>
              </div>
              <div className="wf-group">
                <p className="wf-k" id="wf-k-look">Look</p>
                <div className="device-switch" role="group" aria-labelledby="wf-k-look">
                  <button type="button" aria-pressed={look === "light"} onClick={() => pick(() => setLook(look === "light" ? "all" : "light"))}>
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2.500v2M12 19.500v2M2.500 12h2M19.500 12h2M5.300 5.300l1.400 1.400M17.300 17.300l1.400 1.400M5.300 18.700l1.400-1.400M17.300 6.700l1.400-1.400" /></svg><span className="sw-l">Light<span className="sr-only"> designs</span></span>
                  </button>
                  <button type="button" aria-pressed={look === "dark"} onClick={() => pick(() => setLook(look === "dark" ? "all" : "dark"))}>
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.500A8 8 0 0 1 9.500 4a8 8 0 1 0 10.500 10.500z" /></svg><span className="sw-l">Dark<span className="sr-only"> designs</span></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : null}
      <div id="work-panel" role="tabpanel" aria-labelledby={`work-tab-${TABS.findIndex((t) => t.id === tab)}`} className="work-panel" key={`${tab}-${device}-${look}`}>
        {items.length === 0 ? (
          <p className="work-empty">More projects are coming soon.</p>
        ) : device === "mobile" && items.every((w) => PHONE_APPS[w.slug]) ? (
          <PhoneApps items={items} />
        ) : (
          <div ref={grid} className={`work-grid${items.length === 1 ? " is-single" : ""}${capped ? " is-capped" : ""}`}>
            {items.map((w, i) => (
              <WorkCard key={w.slug} w={w} first={i < 2} seen={seenList.includes(w.slug)} />
            ))}
          </div>
        )}
        {ind && items.length ? (
          <p className="wf-more"><Link prefetch={false} href={`/for/${ind.id}/`}>How I design {ind.tail}<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link></p>
        ) : null}
        {capped ? (
          <p className="work-more"><button type="button" className="hero2-btn hero2-btn-light" onClick={showAll}>Show all projects</button></p>
        ) : null}
      </div>
    </>
  );
}
