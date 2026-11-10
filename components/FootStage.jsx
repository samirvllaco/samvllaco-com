import CallIcon from "./CallIcon";
import { EMAIL } from "../lib/site";

// Tall footer stage: portrait in the middle, soft 3D objects from a designer's desk floating around it.
// The portrait slot takes any image. Swap /sam.jpg for a cut-out photo when one is ready.
const OBJECTS = [
  { id: "cursor", x: "14%", y: "22%", r: -12, d: 0, svg: (
    <svg viewBox="0 0 80 80" width="84" height="84"><defs><linearGradient id="o-cur" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#b9c2d0" /></linearGradient></defs><path d="M18 10l44 26-19 6 12 22-9 5-12-22-14 14z" fill="#0b0b0d" opacity=".35" transform="translate(4 6)" /><path d="M18 10l44 26-19 6 12 22-9 5-12-22-14 14z" fill="url(#o-cur)" stroke="#6f7887" strokeWidth="2" strokeLinejoin="round" /></svg>
  ) },
  { id: "balls", x: "27%", y: "58%", r: 8, d: 1.2, svg: (
    <svg viewBox="0 0 90 110" width="88" height="108"><defs><radialGradient id="o-b1" cx=".35" cy=".3"><stop offset="0" stopColor="#ff9d8a" /><stop offset="1" stopColor="#d2341f" /></radialGradient><radialGradient id="o-b2" cx=".35" cy=".3"><stop offset="0" stopColor="#c7a6ff" /><stop offset="1" stopColor="#6a3fd6" /></radialGradient><radialGradient id="o-b3" cx=".35" cy=".3"><stop offset="0" stopColor="#8fd4ff" /><stop offset="1" stopColor="#1f6fd6" /></radialGradient><radialGradient id="o-b4" cx=".35" cy=".3"><stop offset="0" stopColor="#8ff0c0" /><stop offset="1" stopColor="#149a5f" /></radialGradient></defs><circle cx="34" cy="24" r="20" fill="url(#o-b1)" /><circle cx="30" cy="58" r="20" fill="url(#o-b2)" /><circle cx="62" cy="50" r="18" fill="url(#o-b3)" /><circle cx="40" cy="90" r="18" fill="url(#o-b4)" /></svg>
  ) },
  { id: "chart", x: "9%", y: "62%", r: -6, d: 2.1, svg: (
    <svg viewBox="0 0 100 90" width="96" height="86"><defs><linearGradient id="o-ch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a996ff" /><stop offset="1" stopColor="#5a3fe0" /></linearGradient></defs><rect x="6" y="8" width="88" height="76" rx="12" fill="#f4f4f8" stroke="#b9b9c6" strokeWidth="2" /><rect x="6" y="74" width="88" height="10" rx="5" fill="#c9c9d6" /><rect x="20" y="46" width="14" height="24" rx="4" fill="url(#o-ch)" /><rect x="43" y="30" width="14" height="40" rx="4" fill="url(#o-ch)" /><rect x="66" y="20" width="14" height="50" rx="4" fill="url(#o-ch)" /></svg>
  ) },
  { id: "cup", x: "76%", y: "18%", r: 10, d: .6, svg: (
    <svg viewBox="0 0 110 90" width="104" height="86"><defs><linearGradient id="o-cup" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#bfc3cc" /></linearGradient><radialGradient id="o-cof" cx=".4" cy=".35"><stop offset="0" stopColor="#c98a5a" /><stop offset="1" stopColor="#5c3317" /></radialGradient></defs><path d="M78 34c18-4 26 6 22 16-3 9-14 13-26 10" fill="none" stroke="url(#o-cup)" strokeWidth="9" strokeLinecap="round" /><path d="M10 26h72c0 34-10 54-36 54S10 60 10 26z" fill="url(#o-cup)" /><ellipse cx="46" cy="26" rx="36" ry="11" fill="#eef0f4" /><ellipse cx="46" cy="27" rx="30" ry="8" fill="url(#o-cof)" /><path d="M36 27c5-4 15-4 20 0-5 3-15 3-20 0z" fill="#f3d9bd" opacity=".85" /></svg>
  ) },
  { id: "pencil", x: "88%", y: "44%", r: 38, d: 1.7, svg: (
    <svg viewBox="0 0 40 130" width="40" height="126"><defs><linearGradient id="o-pen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffc24a" /><stop offset=".5" stopColor="#ffa726" /><stop offset="1" stopColor="#d97a06" /></linearGradient></defs><rect x="8" y="4" width="24" height="16" rx="5" fill="#f08a8a" /><rect x="8" y="18" width="24" height="8" fill="#c9ccd4" /><rect x="8" y="26" width="24" height="70" fill="url(#o-pen)" /><path d="M8 96h24l-12 28z" fill="#f1d3ac" /><path d="M16 114h8l-4 10z" fill="#2a2a2e" /></svg>
  ) },
  { id: "eye", x: "72%", y: "64%", r: -8, d: 2.6, svg: (
    <svg viewBox="0 0 110 80" width="104" height="76"><defs><radialGradient id="o-iris" cx=".4" cy=".35"><stop offset="0" stopColor="#9ad7ff" /><stop offset="1" stopColor="#1c5fd0" /></radialGradient><linearGradient id="o-eye" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#c8ccd6" /></linearGradient></defs><path d="M6 40c18-26 80-26 98 0-18 26-80 26-98 0z" fill="url(#o-eye)" stroke="#8d93a1" strokeWidth="2" /><circle cx="55" cy="40" r="19" fill="url(#o-iris)" /><circle cx="55" cy="40" r="8" fill="#0b0b0d" /><circle cx="49" cy="33" r="4" fill="#fff" opacity=".9" /></svg>
  ) },
  { id: "tools", x: "90%", y: "74%", r: -20, d: 3.2, svg: (
    <svg viewBox="0 0 80 110" width="72" height="100"><defs><linearGradient id="o-t1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#59d6c2" /><stop offset="1" stopColor="#168a7b" /></linearGradient><linearGradient id="o-t2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#e6e8ee" /><stop offset="1" stopColor="#9aa0ad" /></linearGradient></defs><path d="M40 8a16 16 0 0 0-11 27l4 4v10h14V39l4-4A16 16 0 0 0 40 8zm-5 6h10v12H35z" fill="url(#o-t2)" /><rect x="31" y="48" width="18" height="54" rx="9" fill="url(#o-t1)" /></svg>
  ) },
];

export default function FootStage() {
  return (
    <div className="foot-stage">
      <div className="foot-stage-art" aria-hidden="true">
        {OBJECTS.map((o) => (
          <span key={o.id} className="foot-obj" style={{ left: o.x, top: o.y, "--r": `${o.r}deg`, animationDelay: `${-o.d}s` }}>{o.svg}</span>
        ))}
        <span className="foot-me">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sam.jpg" width="400" height="400" alt="" loading="lazy" />
        </span>
      </div>
      <div className="foot-stage-copy">
        <p className="foot-stage-eyebrow">Got a product in mind?</p>
        <p className="foot-stage-title">Let&rsquo;s make it simple to use.</p>
        <a className="btn btn-primary" href={`mailto:${EMAIL}?subject=Schedule%20a%20call`}><CallIcon />Schedule a call</a>
      </div>
    </div>
  );
}
