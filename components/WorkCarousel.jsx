"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Home work section (owner, 27 Nov 2026: "dont add filters in homepage just show carousel and view all, show work best
// screens"): one row of case study cards that scrolls sideways (swipe, trackpad or the arrows), each card a staged
// product shot, the title, one line and a link to the case study. Filters stay on /work/.
const Arrow = ({ d }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

export default function WorkCarousel({ items }) {
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const read = () => { raf = 0; const max = el.scrollWidth - el.clientWidth - 2; setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max }); };
    const on = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    el.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { el.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const go = (dir) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || "20") : el.clientWidth;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: calm ? "auto" : "smooth" });
  };

  return (
    <div className="wc">
      <div className="wc-nav">
        <button type="button" className="sd-btn" aria-label="Previous projects" onClick={() => go(-1)} disabled={edge.start}><Arrow d="M19 12H5M11 6l-6 6 6 6" /></button>
        <button type="button" className="sd-btn" aria-label="Next projects" onClick={() => go(1)} disabled={edge.end}><Arrow d="M5 12h14M13 6l6 6-6 6" /></button>
      </div>
      <ul className="wc-track" ref={track} tabIndex={0} aria-label="Case studies, scroll sideways for more">
        {items.map((w) => (
          <li key={w.slug} className="wc-card">
            <Link prefetch={false} href={`/work/${w.slug}/`} className="wc-link">
              <span className="wc-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.small} width="800" height="600" alt={w.alt} loading="lazy" decoding="async" />
              </span>
              <span className="wc-body">
                <span className="wc-t">{w.title}</span>
                <span className="wc-s">{w.sub}</span>
                <span className="wc-go">See the case study <Arrow d="M5 12h14M13 6l6 6-6 6" /></span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
