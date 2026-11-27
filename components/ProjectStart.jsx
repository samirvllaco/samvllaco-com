"use client";
import { useEffect, useRef, useState } from "react";
import CalFrame from "./CalFrame";
import { BookAlt } from "./BookBand";
import { BUDGETS, PROJECT_FROM, usd } from "../lib/plans";
import { EMAIL, BOOKING_URL } from "../lib/site";

// Start a project (owner, 27 Nov 2026: "hide pricing, just add a range on contact from 5-10k and upwards"; "start a
// project and see our work are better CTAs, some people feel shy about calls"). Pick what you need and a budget, then
// book a call with it already in the notes, or send it by email instead.
const NEEDS = ["UX audit", "Website redesign", "New website", "Web or mobile app design", "Dashboard design", "Design system", "Landing pages", "Branding", "Conversion and growth", "Accessibility (EAA)", "Other"];

// Services as a dropdown of checkboxes (owner, 27 Nov 2026, after a reference with "3 services selected").
function NeedPicker({ value, onToggle }) {
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  useEffect(() => {
    if (!open) return;
    const off = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === "Escape") { setOpen(false); box.current?.querySelector("button")?.focus(); } };
    document.addEventListener("pointerdown", off); document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", off); document.removeEventListener("keydown", esc); };
  }, [open]);
  const label = value.length === 0 ? "Pick one or more" : value.length === 1 ? value[0] : `${value.length} services selected`;
  return (
    <div className={`ps-pick${open ? " is-open" : ""}`} ref={box}>
      <button type="button" className="ps-pick-btn" aria-expanded={open} aria-controls="ps-pick-list" onClick={() => setOpen((o) => !o)}>
        <span className={value.length ? "" : "ps-ph"}>{label}</span>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div className="ps-pick-list" id="ps-pick-list" role="group" aria-label="Services" hidden={!open}>
        {NEEDS.map((n) => (
          <label key={n} className="ps-opt"><input type="checkbox" checked={value.includes(n)} onChange={() => onToggle(n)} /><span>{n}</span></label>
        ))}
      </div>
    </div>
  );
}
const CAL = `${BOOKING_URL}?embed=true&theme=dark&layout=month_view&ui.color-scheme=dark`;

export default function ProjectStart() {
  const [need, setNeed] = useState([]);
  const [budget, setBudget] = useState("");
  const note = [need.length ? `Need: ${need.join(", ")}` : "", budget ? `Budget: ${budget}` : ""].filter(Boolean).join(". ");
  // The calendar picks up the choices a moment after the last click, so it does not reload on every tap.
  const [src, setSrc] = useState(CAL);
  useEffect(() => {
    const t = setTimeout(() => setSrc(note ? `${CAL}&notes=${encodeURIComponent(note)}` : CAL), 800);
    return () => clearTimeout(t);
  }, [note]);
  const mail = `mailto:${EMAIL}?subject=${encodeURIComponent("New project")}&body=${encodeURIComponent(`${note ? `${note}.\n\n` : ""}About the product:\n\n`)}`;
  const toggle = (n) => setNeed((v) => (v.includes(n) ? v.filter((x) => x !== n) : [...v, n]));
  return (
    <>
      <section className="ps" aria-labelledby="ps-h">
        <header className="ps-head">
          <h1 id="ps-h">Start a project</h1>
          <p>Pick what you need and a budget. Then book a 30-min call, or send it by email if you would rather write.</p>
        </header>
        <fieldset className="ps-set">
          <legend>What do you need?</legend>
          <NeedPicker value={need} onToggle={toggle} />
        </fieldset>
        <fieldset className="ps-set">
          <legend>Budget in USD</legend>
          <div className="ps-chips" role="radiogroup" aria-label="Budget in USD">
            {BUDGETS.map((b) => <button type="button" key={b} className="ps-chip" role="radio" aria-checked={budget === b} onClick={() => setBudget(budget === b ? "" : b)}>{b}</button>)}
          </div>
          <p className="ps-note">Projects start at {usd(PROJECT_FROM)}. You get a fixed price in writing before any work starts.</p>
        </fieldset>
        <div className="ps-go btn-row">
          <a className="hero2-btn hero2-btn-primary" href="#calendar">Pick a time for a call</a>
          <a className="hero2-btn hero2-btn-light" href={mail}>Send it by email</a>
        </div>
        <p className="ps-mail">Or write to <b>{EMAIL}</b></p>
      </section>
      {BOOKING_URL ? (
        <section className="book-cal" id="calendar" aria-label="Pick a time">
          <CalFrame src={src} />
          <BookAlt />
        </section>
      ) : null}
    </>
  );
}
