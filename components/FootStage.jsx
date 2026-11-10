"use client";
import { useEffect, useState } from "react";
import { load, save, play } from "../lib/delight";

// Tall footer scene: cut-out portrait in a spotlight with 3D desk objects floating around it.
// The switch in the corner sets the objects to floating, still or hidden.
const OBJECTS = [
  { id: "camera", x: "18%", y: "36%", r: -14, d: 0, svg: (
    <svg viewBox="0 0 130 110" width="128" height="108"><defs><linearGradient id="o-cam" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4a4d57" /><stop offset="1" stopColor="#1b1c21" /></linearGradient><radialGradient id="o-lens" cx=".4" cy=".35"><stop offset="0" stopColor="#8f96a8" /><stop offset=".5" stopColor="#2a2c34" /><stop offset="1" stopColor="#0c0c10" /></radialGradient></defs><rect x="34" y="6" width="34" height="18" rx="5" fill="#2a2c33" /><rect x="8" y="18" width="114" height="84" rx="16" fill="url(#o-cam)" /><rect x="8" y="18" width="114" height="20" rx="10" fill="#5a5e6a" opacity=".5" /><rect x="18" y="30" width="18" height="12" rx="3" fill="#f2c94c" /><circle cx="76" cy="64" r="30" fill="#15161a" /><circle cx="76" cy="64" r="22" fill="url(#o-lens)" /><circle cx="68" cy="56" r="5" fill="#fff" opacity=".5" /></svg>
  ) },
  { id: "dumbbell", x: "33%", y: "18%", r: 24, d: 1.2, svg: (
    <svg viewBox="0 0 140 90" width="132" height="86"><defs><linearGradient id="o-db" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff7a5c" /><stop offset="1" stopColor="#b3261a" /></linearGradient><linearGradient id="o-bar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f0f2f6" /><stop offset="1" stopColor="#8d93a1" /></linearGradient></defs><rect x="44" y="38" width="52" height="14" rx="7" fill="url(#o-bar)" /><rect x="6" y="14" width="18" height="62" rx="9" fill="url(#o-db)" /><rect x="26" y="6" width="20" height="78" rx="10" fill="url(#o-db)" /><rect x="94" y="6" width="20" height="78" rx="10" fill="url(#o-db)" /><rect x="116" y="14" width="18" height="62" rx="9" fill="url(#o-db)" /></svg>
  ) },
  { id: "balls", x: "31%", y: "52%", r: 6, d: 2.1, svg: (
    <svg viewBox="0 0 90 110" width="88" height="108"><defs><radialGradient id="o-b1" cx=".35" cy=".3"><stop offset="0" stopColor="#ff9d8a" /><stop offset="1" stopColor="#d2341f" /></radialGradient><radialGradient id="o-b2" cx=".35" cy=".3"><stop offset="0" stopColor="#c7a6ff" /><stop offset="1" stopColor="#6a3fd6" /></radialGradient><radialGradient id="o-b3" cx=".35" cy=".3"><stop offset="0" stopColor="#8fd4ff" /><stop offset="1" stopColor="#1f6fd6" /></radialGradient><radialGradient id="o-b4" cx=".35" cy=".3"><stop offset="0" stopColor="#8ff0c0" /><stop offset="1" stopColor="#149a5f" /></radialGradient></defs><circle cx="34" cy="24" r="20" fill="url(#o-b1)" /><circle cx="30" cy="58" r="20" fill="url(#o-b2)" /><circle cx="62" cy="50" r="18" fill="url(#o-b3)" /><circle cx="40" cy="90" r="18" fill="url(#o-b4)" /></svg>
  ) },
  { id: "cup", x: "76%", y: "21%", r: 10, d: .6, svg: (
    <svg viewBox="0 0 110 90" width="104" height="86"><defs><linearGradient id="o-cup" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#bfc3cc" /></linearGradient><radialGradient id="o-cof" cx=".4" cy=".35"><stop offset="0" stopColor="#c98a5a" /><stop offset="1" stopColor="#5c3317" /></radialGradient></defs><path d="M78 34c18-4 26 6 22 16-3 9-14 13-26 10" fill="none" stroke="url(#o-cup)" strokeWidth="9" strokeLinecap="round" /><path d="M10 26h72c0 34-10 54-36 54S10 60 10 26z" fill="url(#o-cup)" /><ellipse cx="46" cy="26" rx="36" ry="11" fill="#eef0f4" /><ellipse cx="46" cy="27" rx="30" ry="8" fill="url(#o-cof)" /><path d="M36 27c5-4 15-4 20 0-5 3-15 3-20 0z" fill="#f3d9bd" opacity=".85" /></svg>
  ) },
  { id: "invader", x: "73%", y: "46%", r: 4, d: 1.7, svg: (
    <svg viewBox="0 0 132 106" width="128" height="102"><defs><linearGradient id="o-inv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff9a62" /><stop offset="1" stopColor="#c9521c" /></linearGradient></defs><path d="M24 0h84v12h12v12h12v36h-12v12h-12v12H96V72H84v12H72V72H60v12H48V72H36v12H24V72H12V60H0V24h12V12h12z" fill="#7a2f0e" transform="translate(0 10)" /><path d="M24 0h84v12h12v12h12v36h-12v12h-12v12H96V72H84v12H72V72H60v12H48V72H36v12H24V72H12V60H0V24h12V12h12z" fill="url(#o-inv)" /><rect x="30" y="26" width="16" height="22" fill="#3a1505" /><rect x="86" y="26" width="16" height="22" fill="#3a1505" /></svg>
  ) },
  { id: "pencil", x: "86%", y: "36%", r: 40, d: 2.6, svg: (
    <svg viewBox="0 0 40 130" width="40" height="126"><defs><linearGradient id="o-pen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffc24a" /><stop offset=".5" stopColor="#ffa726" /><stop offset="1" stopColor="#d97a06" /></linearGradient></defs><rect x="8" y="4" width="24" height="16" rx="5" fill="#f08a8a" /><rect x="8" y="18" width="24" height="8" fill="#c9ccd4" /><rect x="8" y="26" width="24" height="70" fill="url(#o-pen)" /><path d="M8 96h24l-12 28z" fill="#f1d3ac" /><path d="M16 114h8l-4 10z" fill="#2a2a2e" /></svg>
  ) },
  { id: "tools", x: "81%", y: "68%", r: -42, d: 3.2, svg: (
    <svg viewBox="0 0 80 110" width="72" height="100"><defs><linearGradient id="o-t1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#59d6c2" /><stop offset="1" stopColor="#168a7b" /></linearGradient><linearGradient id="o-t2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#e6e8ee" /><stop offset="1" stopColor="#9aa0ad" /></linearGradient></defs><path d="M40 8a16 16 0 0 0-11 27l4 4v10h14V39l4-4A16 16 0 0 0 40 8zm-5 6h10v12H35z" fill="url(#o-t2)" /><rect x="31" y="48" width="18" height="54" rx="9" fill="url(#o-t1)" /></svg>
  ) },
];
const LAPTOP = (
  <svg viewBox="0 0 420 300" width="400" height="286"><defs><linearGradient id="o-lid" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b9bcc4" /><stop offset="1" stopColor="#6d7079" /></linearGradient><linearGradient id="o-base" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#8a8d96" /><stop offset="1" stopColor="#c9ccd4" /></linearGradient></defs><path d="M8 20c-2-9 4-16 13-15l228 18c7 1 12 5 15 12l84 190-262 22z" fill="url(#o-lid)" /><path d="M86 247l262-22 62 26c5 2 5 9-1 10L140 294c-6 1-11-1-15-6z" fill="url(#o-base)" /><path d="M150 262l196-18 30 12-196 22z" fill="#5d6069" opacity=".55" /></svg>
);
const MODES = [
  { id: "float", label: "Floating objects" },
  { id: "still", label: "Still objects" },
  { id: "off", label: "Hide objects" },
];

export default function FootStage() {
  const [mode, setMode] = useState("float");
  useEffect(() => { setMode(load("stage", "float")); }, []);
  function pick(m) { setMode(m); save("stage", m); play("tab"); }
  return (
    <div className={`foot-stage is-${mode}`}>
      <div className="foot-stage-art" aria-hidden="true">
        {OBJECTS.map((o) => (
          <span key={o.id} className="foot-obj" style={{ left: o.x, top: o.y, "--r": `${o.r}deg`, animationDelay: `${-o.d}s` }}>{o.svg}</span>
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="foot-me" src="/sam-cutout.webp" width="800" height="776" alt="" loading="lazy" />
        <span className="foot-laptop">{LAPTOP}</span>
      </div>
      <div className="foot-switch" role="group" aria-label="Footer scene">
        {MODES.map((m) => (
          <button key={m.id} type="button" aria-pressed={mode === m.id} aria-label={m.label} title={m.label} onClick={() => pick(m.id)}>
            {m.id === "float" ? (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M3 12h4l2-4 4 8 2-4h6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            ) : m.id === "still" ? (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
