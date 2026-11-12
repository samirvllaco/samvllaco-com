"use client";
import { useEffect, useState } from "react";

const FLAGS = [["us", "USA"], ["ca", "Canada"], ["au", "Australia"], ["ae", "UAE"], ["eu", "Europe"]];
const clock = (tz) => new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz }).format(new Date());
const hourIn = (tz) => { const p = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "numeric", hourCycle: "h23", timeZone: tz }).formatToParts(new Date()); return +p.find((x) => x.type === "hour").value + +p.find((x) => x.type === "minute").value / 60; };

export function WorldFlags() {
  return (
    <ul className="wf-flags" aria-label="Client countries">
      {FLAGS.map(([c, n], i) => (
        <li key={c} style={{ "--i": i }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <span className="wf-flag"><img src={`/flags/${c}.svg`} width="40" height="30" alt="" loading="lazy" /></span>
          {n}
        </li>
      ))}
    </ul>
  );
}

// Three quick facts under the globe. Clocks are live.
export default function WorldFacts() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    const tick = () => { let d = Math.round(hourIn("Europe/Tirane") - hourIn("America/New_York")); if (d < 0) d += 24; setNow({ me: clock("Europe/Tirane"), ny: clock("America/New_York"), d }); };
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);
  return (
    <dl className="wf-facts">
      <div><dt>573</dt><dd>clients worldwide</dd></div>
      <div><dt><span className="wf-live" />{now ? now.me : "Tirana"}</dt><dd>in Tirana{now ? `, ${now.ny} in New York` : ""}</dd></div>
      <div><dt>{now ? `${now.d}h ahead` : "6h ahead"}</dt><dd>of New York. US mornings are my afternoons</dd></div>
    </dl>
  );
}
