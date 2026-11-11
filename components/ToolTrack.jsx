"use client";
import { useEffect, useRef } from "react";

// Keeps the tools row drifting left to right, and lets you swipe, drag or scroll it by hand.
export default function ToolTrack({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, held = false, resume = 0, last = performance.now(), pos = 0, drag = null, on = true;
    const half = () => el.scrollWidth / 2;
    const wrap = () => { const h = half(); if (el.scrollLeft <= 1) el.scrollLeft += h; else if (el.scrollLeft >= h + 1) el.scrollLeft -= h; };
    el.scrollLeft = half(); pos = el.scrollLeft;
    const step = (now) => {
      const dt = Math.min(50, now - last); last = now;
      if (!held && now > resume && on && !reduce) { pos = el.scrollLeft - dt * 0.035; el.scrollLeft = pos; }
      wrap();
      raf = requestAnimationFrame(step);
    };
    const hold = () => { held = true; };
    const free = () => { held = false; resume = performance.now() + 1400; drag = null; el.classList.remove("is-drag"); };
    const down = (e) => { if (e.pointerType === "mouse") { drag = { x: e.clientX, s: el.scrollLeft }; el.classList.add("is-drag"); } hold(); };
    const move = (e) => { if (drag) { el.scrollLeft = drag.s - (e.clientX - drag.x); wrap(); } };
    const wheel = () => { resume = performance.now() + 1400; };
    el.addEventListener("pointerdown", down); window.addEventListener("pointermove", move); window.addEventListener("pointerup", free); window.addEventListener("pointercancel", free);
    el.addEventListener("touchstart", hold, { passive: true }); el.addEventListener("touchend", free); el.addEventListener("wheel", wheel, { passive: true });
    const io = new IntersectionObserver(([en]) => { on = en.isIntersecting; });
    io.observe(el);
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); io.disconnect(); el.removeEventListener("pointerdown", down); window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", free); window.removeEventListener("pointercancel", free); el.removeEventListener("touchstart", hold); el.removeEventListener("touchend", free); el.removeEventListener("wheel", wheel); };
  }, []);
  return <div className="tb-view tb-swipe" ref={ref}>{children}</div>;
}
