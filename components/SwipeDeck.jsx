"use client";
import { useRef, useState } from "react";
import Link from "next/link";

const ICON = {
  desktop: <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>,
  mobile: <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2.500" width="10" height="19" rx="2.500" /><path d="M11 18.500h2" /></svg>,
};
const STEP = 0.82; // distance between slides, as a share of the stage width
const mod = (a, n) => ((a % n) + n) % n;

// Projects on one row that you swipe sideways. The middle one is in focus, its neighbours wait at the sides.
export default function SwipeDeck({ items }) {
  const [device, setDevice] = useState("desktop");
  const [idx, setIdx] = useState(0);
  const [drag, setDrag] = useState(0);
  const [held, setHeld] = useState(false);
  const stage = useRef(null);
  const start = useRef(null);
  const moved = useRef(false);
  const list = items.filter((i) => i.platform === device);
  const width = () => (stage.current ? stage.current.clientWidth : 600);

  const go = (d) => { setIdx((v) => v + d); setDrag(0); };
  const down = (e) => { start.current = { x: e.clientX, t: performance.now() }; moved.current = false; setHeld(true); };
  const move = (e) => { if (!start.current) return; const x = e.clientX - start.current.x; if (Math.abs(x) > 6) moved.current = true; setDrag(x); };
  const up = (e) => {
    if (!start.current) return;
    const x = e.clientX - start.current.x, v = x / Math.max(1, performance.now() - start.current.t);
    start.current = null; setHeld(false);
    if (x < -70 || v < -0.45) go(1); else if (x > 70 || v > 0.45) go(-1); else setDrag(0);
  };
  const pick = (d) => { setDevice(d); setIdx(0); setDrag(0); };

  const cur = list[mod(idx, list.length)];
  return (
    <div className="sd">
      <div className="sd-top">
        <p className="sd-count" aria-live="polite"><b>{mod(idx, list.length) + 1}</b> / {list.length}</p>
        <div className="device-switch sd-switch" role="group" aria-label="Swipe desktop or mobile work">
          {["desktop", "mobile"].map((d) => (
            <button key={d} type="button" aria-pressed={device === d} aria-label={`${d === "desktop" ? "Desktop" : "Mobile"} work`} title={d === "desktop" ? "Desktop" : "Mobile"} onClick={() => pick(d)}>{ICON[d]}</button>
          ))}
        </div>
      </div>
      <div className={`sd-stage${held ? " is-held" : ""}`} ref={stage} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up} onPointerCancel={up}
        tabIndex={0} role="group" aria-label="Projects. Use the arrow keys to move." onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}>
        {[-2, -1, 0, 1, 2].map((k) => {
          const item = list[mod(idx + k, list.length)];
          const pos = k + drag / (width() * STEP), d = Math.min(1.4, Math.abs(pos));
          return (
            <Link key={`${device}-${idx + k}`} href={`/work/${item.slug}/`} className="sd-slide" draggable="false" tabIndex={k === 0 ? 0 : -1} aria-hidden={k !== 0}
              style={{ transform: `translate3d(${(pos * STEP * 100).toFixed(3)}%, 0, 0) scale(${(1 - 0.2 * Math.min(1, d)).toFixed(4)})`, opacity: Math.max(0, 1 - 0.72 * d), zIndex: 5 - Math.abs(k) }}
              onClick={(e) => { if (moved.current) { e.preventDefault(); return; } if (k !== 0) { e.preventDefault(); go(k); } }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={item.round ? "is-round" : undefined} src={item.cut} alt={k === 0 ? item.alt : ""} draggable="false" loading="lazy" />
            </Link>
          );
        })}
      </div>
      <p className="sd-label" key={`${device}-${idx}`}><b>{cur.title}</b><i>{cur.tags[0]}</i></p>
      <div className="sd-foot">
        <button type="button" className="sd-btn" aria-label="Previous project" onClick={() => go(-1)}><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg></button>
        <Link href="/#work" className="sd-all">See all work <span aria-hidden="true">→</span></Link>
        <button type="button" className="sd-btn" aria-label="Next project" onClick={() => go(1)}><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
      </div>
    </div>
  );
}
