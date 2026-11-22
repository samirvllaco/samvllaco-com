"use client";
import { useState } from "react";

// Rough estimate from Sam's real rates: $1,000 per design sprint week (lib/plans.js).
const TYPES = { site: ["Marketing website", 5], app: ["Web or mobile app", 3], landing: ["Landing page", 0] };
export default function CostCalc() {
  const [type, setType] = useState("site");
  const [pages, setPages] = useState(5);
  const [brand, setBrand] = useState(false);
  const [build, setBuild] = useState(false);
  const label = type === "app" ? "Screens" : "Pages";
  const count = type === "landing" ? 1 : pages;
  const days = type === "landing" ? 3 : type === "app" ? count * 0.6 + 2 : count * 0.8 + 1;
  const total = days + (brand ? 4 : 0) + (build ? days * 0.8 : 0);
  const weeks = Math.max(1, Math.ceil(total / 5));
  const low = weeks * 1000, high = Math.round(weeks * 1000 * 1.3 / 100) * 100;
  const f = (n) => "$" + n.toLocaleString("en-US");
  return (
    <div className="tl-box cc2">
      <div className="cc2-in">
        <fieldset><legend>What are you building?</legend>
          <div className="cc2-seg">{Object.entries(TYPES).map(([k, [l]]) => <button type="button" key={k} aria-pressed={type === k} onClick={() => setType(k)}>{l}</button>)}</div>
        </fieldset>
        {type !== "landing" ? (
          <label className="cc2-range"><span>{label}: <b>{pages}</b></span><input type="range" min="1" max={type === "app" ? 40 : 20} value={pages} onChange={(e) => setPages(+e.target.value)} /></label>
        ) : null}
        <label className="cc2-chk"><input type="checkbox" checked={brand} onChange={(e) => setBrand(e.target.checked)} /> Logo and brand identity</label>
        <label className="cc2-chk"><input type="checkbox" checked={build} onChange={(e) => setBuild(e.target.checked)} /> Build it too (front end)</label>
      </div>
      <div className="cc2-out" aria-live="polite">
        <p className="cc2-k">Estimated cost</p>
        <p className="cc2-price">{f(low)}<span> to {f(high)}</span></p>
        <p className="cc2-w">About {weeks} {weeks === 1 ? "week" : "weeks"} of design sprints at $1,000 a week</p>
        <p className="cc2-n">A rough guide, not a quote. You get a fixed price in writing after a short call.</p>
      </div>
    </div>
  );
}
