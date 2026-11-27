"use client";
import { useState } from "react";

// Rough estimate (owner, 27 Nov 2026: projects start at $5,000, lib/plans.js). About $2,500 a week of design, with a $5,000 floor.
import { PROJECT_FROM } from "../../lib/plans";
const WEEK = 2500;
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
  const low = Math.max(PROJECT_FROM, weeks * WEEK), high = Math.max(Math.round(low * 1.4 / 500) * 500, low + 2500);
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
        <p className="cc2-w">About {weeks} {weeks === 1 ? "week" : "weeks"} of design work</p>
        <p className="cc2-n">A rough guide, not a quote. Projects start at $5,000 and you get a fixed price in writing first.</p>
      </div>
    </div>
  );
}
