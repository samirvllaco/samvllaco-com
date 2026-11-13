"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

// An arc of rounded project screens that drifts slowly sideways, so more screens pass through than fit at once.
// Cards sit side by side with a small gap (no overlap), lift on hover (which pauses the drift) and spread a little as the row scrolls into view.
export default function ScreenFan({ items }) {
  const ref = useRef(null);
  const n = items.length;
  const mid = 3; // five cards are visible at once; the rest wait off the ends of the arc
  // The same placement the browser computes on start, so the first paint matches the hydrated page exactly.
  const slot = (i) => {
    let k = ((i - mid) % n + n) % n;
    if (k > n / 2) k -= n;
    const a = Math.abs(k);
    return { "--k": k, zIndex: 20 - Math.round(a * 2), opacity: a <= 2 ? 1 : Math.max(0, 1 - (a - 2) * 1.5), visibility: a > 2.7 ? "hidden" : "visible" };
  };
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lis = Array.from(el.children);
    const place = (t) => lis.forEach((li, i) => {
      // k is this card's slot on the arc, measured from the centre. It wraps so cards leave one end and return at the other.
      let k = ((i - t) % n + n) % n;
      if (k > n / 2) k -= n;
      const a = Math.abs(k);
      li.style.setProperty("--k", k.toFixed(4));
      li.style.zIndex = String(20 - Math.round(a * 2));
      li.style.opacity = a <= 2 ? "1" : Math.max(0, 1 - (a - 2) * 1.5).toFixed(3);
      li.style.visibility = a > 2.7 ? "hidden" : "visible";
    });
    place(mid);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, t = mid, last = 0, paused = false, seen = true;
    const io = new IntersectionObserver((en) => { seen = en[0].isIntersecting; }, { threshold: 0 });
    io.observe(el);
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min(64, now - last) : 0; last = now;
      if (paused || !seen) return;
      t += dt / 4200; // one card every 4.2 seconds
      place(t);
    };
    // Start drifting once the visitor interacts or after a few seconds, so the first load settles still.
    let started = false;
    const begin = () => { if (started) return; started = true; raf = requestAnimationFrame(tick); };
    const kick = setTimeout(begin, 5000);
    window.addEventListener("scroll", begin, { once: true, passive: true });
    window.addEventListener("pointermove", begin, { once: true, passive: true });
    const stop = () => { paused = true; }, go = () => { paused = false; };
    el.addEventListener("pointerenter", stop); el.addEventListener("pointerleave", go);
    el.addEventListener("focusin", stop); el.addEventListener("focusout", go);
    const open = () => { const r = el.getBoundingClientRect(); const p = Math.max(0, Math.min(1, (innerHeight - r.top) / (innerHeight * 0.75))); el.style.setProperty("--open", (0.55 + 0.45 * p).toFixed(3)); };
    open();
    window.addEventListener("scroll", open, { passive: true });
    return () => { clearTimeout(kick); window.removeEventListener("scroll", begin); window.removeEventListener("pointermove", begin); cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("scroll", open); el.removeEventListener("pointerenter", stop); el.removeEventListener("pointerleave", go); el.removeEventListener("focusin", stop); el.removeEventListener("focusout", go); };
  }, [n]);
  return (
    <ul className="fan fan-run" ref={ref} aria-label="Recent projects">
      {items.map((it, i) => (
        <li key={it.id} style={slot(i)}>
          <Link prefetch={false} href={`/work/${it.slug}/`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.src} alt={it.title} loading={i < 7 ? "eager" : "lazy"} draggable="false" />
            <span className="fan-tag">{it.title} <em className="fan-at">@ UX/UI</em> <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
