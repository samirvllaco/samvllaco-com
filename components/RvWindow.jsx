"use client";
import { useEffect, useRef } from "react";

// A browser window showing a full page (book page, CookinBuddy before and after). It scrolls by itself, slowly,
// once the visitor has interacted with the site, and hands over for good as soon as they scroll, drag or tap it.
// `frames` (optional) are extra crops of one section that fade in turn over the base image, at `at` (top and height, %).
export default function RvWindow({ src, height, alt, label, frames, at }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, dir = 1, y = 0, max = 0, last = 0, wait = 0, stopped = false, hover = false, seen = false;
    const measure = () => requestAnimationFrame(() => { max = el.scrollHeight - el.clientHeight; });
    const tick = (t) => {
      raf = 0;
      if (stopped || !seen) return;
      const dt = last ? Math.min(48, t - last) : 16; last = t;
      if (!hover && t > wait && document.documentElement.classList.contains("is-live") && max > 0) {
        y += dir * dt * 0.045;
        if (y >= max) { y = max; dir = -1; wait = t + 1600; } else if (y <= 0) { y = 0; dir = 1; wait = t + 1600; }
        el.scrollTop = y;
      }
      raf = requestAnimationFrame(tick);
    };
    const stop = () => { stopped = true; cancelAnimationFrame(raf); };
    const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; if (seen && !raf && !stopped) { last = 0; measure(); raf = requestAnimationFrame(tick); } });
    const on = () => { hover = true; }, off = () => { hover = false; };
    io.observe(el);
    addEventListener("resize", measure);
    el.addEventListener("wheel", stop, { passive: true });
    el.addEventListener("touchstart", stop, { passive: true });
    el.addEventListener("pointerdown", stop);
    el.addEventListener("keydown", stop);
    el.addEventListener("pointerenter", on);
    el.addEventListener("pointerleave", off);
    return () => { stop(); io.disconnect(); removeEventListener("resize", measure); el.removeEventListener("wheel", stop); el.removeEventListener("touchstart", stop); el.removeEventListener("pointerdown", stop); el.removeEventListener("keydown", stop); el.removeEventListener("pointerenter", on); el.removeEventListener("pointerleave", off); };
  }, []);
  return (
    <div className="eb-rv-view" ref={ref} tabIndex={0} role="region" aria-label={label}>
      <div className="eb-rv-page">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width="720" height={height} alt={alt} loading="lazy" decoding="async" />
        {frames ? (
          <div className="eb-rv-steps" style={{ top: `${at[0]}%`, height: `${at[1]}%` }} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {frames.map((f) => <img key={f} src={f} width="720" height="320" alt="" loading="lazy" decoding="async" />)}
          </div>
        ) : null}
      </div>
    </div>
  );
}
