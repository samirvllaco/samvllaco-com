"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { WORK } from "../lib/work";

// "Now showing" panel in the hero. Cycles through projects, pauses on hover or focus.
const ORDER = ["marketing-dashboard", "room-planner", "specialist-matching", "revenue-attribution", "cyber-marketplace"];
const ITEMS = ORDER.map((s) => WORK.find((w) => w.slug === s)).filter(Boolean);
const HOLD = 6000;

export default function HeroShow() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(!!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches));
  }, []);
  useEffect(() => {
    if (paused || still || ITEMS.length < 2) return;
    const id = setTimeout(() => setI((n) => (n + 1) % ITEMS.length), HOLD);
    return () => clearTimeout(id);
  }, [i, paused, still]);

  const w = ITEMS[i];
  return (
    <div className="show" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <Link className="show-media" href={`/work/${w.slug}/`} aria-label={`${w.title} case study`}>
        {ITEMS.map((x, n) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={x.slug} className={n === i ? "on" : ""} src={x.small} width={x.smallW} height={Math.round((x.smallW * x.h) / x.w)} alt="" loading={n === 0 ? "eager" : "lazy"} />
        ))}
      </Link>
      <p className="show-line"><span className="show-label">Now showing</span><b>{w.title}</b></p>
      <p className="show-tags">{w.role}</p>
      <div className="show-foot">
        <div className="show-dots" role="tablist" aria-label="Choose a project" hidden={ITEMS.length < 2}>
          {ITEMS.map((x, n) => (
            <button key={x.slug} type="button" role="tab" aria-selected={n === i} aria-label={x.title} onClick={() => setI(n)}>
              <span className={n === i && !paused && !still ? "run" : n === i ? "full" : ""} style={{ animationDuration: `${HOLD}ms` }} />
            </button>
          ))}
        </div>
        <Link className="show-link" href={`/work/${w.slug}/`}>View case study <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  );
}
