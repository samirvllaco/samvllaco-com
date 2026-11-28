"use client";
import { useEffect, useRef } from "react";
import { loop } from "../lib/motion";

// Keeps the tools row drifting left to right, and lets you swipe, drag or scroll it by hand.
export default function ToolTrack({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stop = null, held = false, resume = 0, last = performance.now(), pos = 0, drag = null, on = true;
    const half = () => el.scrollWidth / 2;
    const wrap = () => { const h = half(); if (el.scrollLeft <= 1) el.scrollLeft += h; else if (el.scrollLeft >= h + 1) el.scrollLeft -= h; };
    el.scrollLeft = half(); pos = el.scrollLeft;
    const live = () => document.documentElement.classList.contains("is-live");
    // pos keeps the sub-pixel position itself: the browser rounds scrollLeft, so reading it back each frame stalls the drift.
    const step = (now) => {
      const dt = Math.min(50, now - last); last = now;
      if (!held && now > resume && on && !reduce && live()) {
        if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft;
        pos -= dt * 0.04;
        const h = half();
        if (pos <= 1) pos += h; else if (pos >= h + 1) pos -= h;
        el.scrollLeft = pos;
      } else { wrap(); pos = el.scrollLeft; }
    };
    // On the shared GSAP clock (lib/motion.js loop), and only while the row is on screen (owner, 28 Nov 2026, "do all").
    const run = (go) => { if (go && !stop) { last = performance.now(); stop = loop(step); } if (!go && stop) { stop(); stop = null; } };
    const hold = () => { held = true; };
    const free = () => { held = false; resume = performance.now() + 1400; drag = null; el.classList.remove("is-drag"); };
    const down = (e) => { if (e.pointerType === "mouse") { drag = { x: e.clientX, s: el.scrollLeft }; el.classList.add("is-drag"); } hold(); };
    const move = (e) => { if (drag) { el.scrollLeft = drag.s - (e.clientX - drag.x); wrap(); } };
    const wheel = () => { resume = performance.now() + 1400; };
    el.addEventListener("pointerdown", down); window.addEventListener("pointermove", move); window.addEventListener("pointerup", free); window.addEventListener("pointercancel", free);
    el.addEventListener("touchstart", hold, { passive: true }); el.addEventListener("touchend", free); el.addEventListener("wheel", wheel, { passive: true });
    const io = new IntersectionObserver(([en]) => { on = en.isIntersecting; run(on); });
    io.observe(el);
    return () => { run(false); io.disconnect(); el.removeEventListener("pointerdown", down); window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", free); window.removeEventListener("pointercancel", free); el.removeEventListener("touchstart", hold); el.removeEventListener("touchend", free); el.removeEventListener("wheel", wheel); };
  }, []);
  return <div className="tb-view tb-swipe" ref={ref}>{children}</div>;
}
