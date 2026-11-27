"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { PHONE_APPS } from "../lib/phones";

// One mobile app per card: its screens in a phone you can swipe or step through, then the app icon, name and one line.
function PhoneApp({ slug, title }) {
  const a = PHONE_APPS[slug];
  const track = useRef(null);
  const [i, setI] = useState(0);
  const n = a.screens.length;
  const raf = useRef(0);
  const onScroll = () => {
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const t = track.current;
      if (t) setI(Math.round(t.scrollLeft / Math.max(1, t.clientWidth)));
    });
  };
  const go = (d) => {
    const t = track.current;
    if (!t) return;
    const next = (i + d + n) % n;
    t.scrollTo({ left: next * t.clientWidth, behavior: "smooth" });
  };
  return (
    <li className="pa">
      <div className="pa-stage" role="group" aria-roledescription="carousel" aria-label={`${a.name} screens`}>
        <span className="pa-tag">{a.tag}</span>
        <span className="pa-dots" aria-hidden="true">{a.screens.map((s, k) => <i key={s.src} className={k === i ? "is-on" : undefined} />)}</span>
        <div className="pa-track" ref={track} onScroll={onScroll} tabIndex={0} aria-label={`${a.name}, screen ${i + 1} of ${n}`}
          onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); go(1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); } }}>
          {a.screens.map((s, k) => (
            <div className="pa-slide" key={s.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} width={s.w} height={s.h} alt={`${a.name} screen ${k + 1}`} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
        <button type="button" className="pa-arrow pa-prev" onClick={() => go(-1)} aria-label="Previous screen"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M19 12H6m5.5-5.5L6 12l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
        <button type="button" className="pa-arrow pa-next" onClick={() => go(1)} aria-label="Next screen"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 12h13m-5.5-5.5L18 12l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
        <span className="pa-count" aria-hidden="true">{i + 1} of {n}</span>
      </div>
      <Link prefetch={false} href={`/work/${slug}/`} className="pa-meta">
        <i className="pa-ico" aria-hidden="true" style={{ background: a.icon.bg, color: a.icon.fg }}>{a.icon.t}</i>
        <span className="pa-txt"><b>{a.name}</b><span>{a.line}</span></span>
        <span className="pa-go">Case study<span aria-hidden="true"> →</span><span className="sr-only">: {title}</span></span>
      </Link>
    </li>
  );
}

export default function PhoneApps({ items }) {
  const list = items.filter((w) => PHONE_APPS[w.slug]);
  return <ul className="pa-grid">{list.map((w) => <PhoneApp key={w.slug} slug={w.slug} title={w.title} />)}</ul>;
}
