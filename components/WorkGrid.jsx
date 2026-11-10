"use client";
import { useRef, useState } from "react";
import { WORK } from "../lib/work";

const TABS = [
  { id: "all", label: "All" },
  { id: "desktop", label: "Desktop" },
  { id: "mobile", label: "Mobile" },
];

export default function WorkGrid() {
  const [tab, setTab] = useState("all");
  const refs = useRef({});
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
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div id="work-panel" role="tabpanel" aria-labelledby={`work-tab-${tab}`} className="work-panel" key={tab}>
        {items.length === 0 ? (
          <p className="work-empty">Mobile projects are coming soon.</p>
        ) : (
          <div className="work-grid">
            {items.map((w, i) => (
              <div key={w.slug} className="work-card" role="group" aria-label={w.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.big} srcSet={`${w.small} ${w.smallW}w, ${w.big} ${w.w}w`} sizes="(max-width: 900px) 50vw, 220px" width={w.w} height={w.h} alt={w.alt} loading="lazy" />
                <span className="work-meta">
                  <span className="work-title">{w.title}</span>
                  <span className="work-sub">{w.sub}</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
