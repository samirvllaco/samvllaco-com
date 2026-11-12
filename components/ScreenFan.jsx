"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

// An arc of rounded project screens. Cards overlap, lift on hover and spread a little as the row scrolls into view.
export default function ScreenFan({ items }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => { raf = 0; const r = el.getBoundingClientRect(); const p = Math.max(0, Math.min(1, (innerHeight - r.top) / (innerHeight * 0.75))); el.style.setProperty("--open", (0.55 + 0.45 * p).toFixed(3)); };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  const mid = (items.length - 1) / 2;
  return (
    <ul className="fan" ref={ref} aria-label="Recent projects">
      {items.map((it, i) => (
        <li key={it.slug} style={{ "--k": i - mid, zIndex: 10 - Math.abs(Math.round(i - mid)) }}>
          <Link href={`/work/${it.slug}/`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.src} alt={it.title} loading="lazy" draggable="false" />
            <span className="fan-tag">{it.title} <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
