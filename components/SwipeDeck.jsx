"use client";
import { useRef, useState } from "react";
import Link from "next/link";

const ICON = {
  desktop: <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>,
  mobile: <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2.500" width="10" height="19" rx="2.500" /><path d="M11 18.500h2" /></svg>,
};

// A stack of project cards you throw left or right, like a card game. The switch picks desktop or mobile work.
export default function SwipeDeck({ items }) {
  const [device, setDevice] = useState("desktop");
  const [n, setN] = useState(0);
  const [drag, setDrag] = useState({ x: 0, y: 0, on: false });
  const [out, setOut] = useState(null);
  const start = useRef(null);
  const moved = useRef(false);
  const list = items.filter((i) => i.platform === device);
  const at = (k) => list[(n + k) % list.length];

  const fling = (dir) => {
    if (out) return;
    setOut({ dir, x: drag.x, y: drag.y });
    setTimeout(() => { setN((v) => v + 1); setOut(null); setDrag({ x: 0, y: 0, on: false }); }, 320);
  };
  const down = (e) => { if (out) return; start.current = { x: e.clientX, y: e.clientY }; moved.current = false; e.currentTarget.setPointerCapture?.(e.pointerId); setDrag({ x: 0, y: 0, on: true }); };
  const move = (e) => { if (!start.current) return; const x = e.clientX - start.current.x, y = e.clientY - start.current.y; if (Math.abs(x) > 6) moved.current = true; setDrag({ x, y: y * 0.35, on: true }); };
  const up = () => { if (!start.current) return; start.current = null; if (Math.abs(drag.x) > 80) fling(drag.x > 0 ? 1 : -1); else setDrag({ x: 0, y: 0, on: false }); };
  const pick = (d) => { setDevice(d); setN(0); setDrag({ x: 0, y: 0, on: false }); };

  const top = at(0);
  const tx = out ? out.dir * 520 : drag.x, ty = out ? out.y : drag.y;
  const pull = Math.min(1, Math.abs(tx) / 120);
  return (
    <div className="sd">
      <div className="sd-top">
        <p className="sd-count" aria-live="polite"><b>{(n % list.length) + 1}</b> / {list.length}</p>
        <div className="device-switch sd-switch" role="group" aria-label="Swipe desktop or mobile work">
          {["desktop", "mobile"].map((d) => (
            <button key={d} type="button" aria-pressed={device === d} aria-label={`${d === "desktop" ? "Desktop" : "Mobile"} work`} title={d === "desktop" ? "Desktop" : "Mobile"} onClick={() => pick(d)}>{ICON[d]}</button>
          ))}
        </div>
      </div>
      <div className="sd-stack">
        {[2, 1].map((k) => list.length > k ? (
          // eslint-disable-next-line @next/next/no-img-element
          <div key={`${device}-${n + k}`} className="sd-card sd-under" style={{ transform: `translateY(${(k - pull * (k === 1 ? 1 : 0.5)) * 12}px) scale(${1 - (k - pull * (k === 1 ? 1 : 0.5)) * 0.05})`, opacity: k === 2 ? 0.5 + pull * 0.3 : 0.85 + pull * 0.15 }} aria-hidden="true"><img className="sd-l" src={at(k).small} alt="" draggable="false" /><img className="sd-d" src={at(k).dark} alt="" draggable="false" /></div>
        ) : null)}
        <Link key={`${device}-${n}`} href={`/work/${top.slug}/`} className={`sd-card sd-topcard${drag.on ? " is-drag" : ""}${out ? " is-out" : ""}`} draggable="false"
          style={{ transform: `translate(${tx}px, ${ty}px) rotate(${tx / 18}deg)`, opacity: out ? 0 : 1 }}
          onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onClick={(e) => { if (moved.current) e.preventDefault(); }}
          onKeyDown={(e) => { if (e.key === "ArrowRight") fling(1); if (e.key === "ArrowLeft") fling(-1); }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sd-l" src={top.small} alt="" draggable="false" />
          <img className="sd-d" src={top.dark} alt={top.alt} draggable="false" />
          <span className="sd-stamp" style={{ opacity: pull }}>{tx > 0 ? "Next ↗" : "↖ Next"}</span>
          <span className="sd-name"><b>{top.title}</b><i>{top.tags[0]}</i></span>
        </Link>
      </div>
      <div className="sd-foot">
        <button type="button" className="sd-btn" aria-label="Previous direction, next project" onClick={() => fling(-1)}><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg></button>
        <p className="sd-hint">Swipe the cards. Tap one to open the case study.</p>
        <button type="button" className="sd-btn" aria-label="Next project" onClick={() => fling(1)}><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
      </div>
    </div>
  );
}
