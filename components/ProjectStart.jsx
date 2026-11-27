"use client";
import { useEffect, useState } from "react";
import CalFrame from "./CalFrame";
import { BookAlt } from "./BookBand";
import { BUDGETS, PROJECT_FROM, usd } from "../lib/plans";
import { EMAIL, BOOKING_URL } from "../lib/site";

// Start a project (owner, 27 Nov 2026: "hide pricing, just add a range on contact from 5-10k and upwards"; "start a
// project and see our work are better CTAs, some people feel shy about calls"). Pick what you need and a budget, then
// book a call with it already in the notes, or send it by email instead.
const NEEDS = ["UX audit", "Redesign", "New product", "Website", "Design system", "Not sure yet"];
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
          <div className="ps-chips">
            {NEEDS.map((n) => <button type="button" key={n} className="ps-chip" aria-pressed={need.includes(n)} onClick={() => toggle(n)}>{n}</button>)}
          </div>
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
