"use client";
import { useEffect, useRef, useState } from "react";

// A real number that counts up once when its card scrolls into view (owner, 27 Nov 2026: bento animations, done in
// code). The server renders the final value, a hidden copy keeps the width fixed so nothing around it moves, and
// screen readers and reduced motion only ever get the final number.
// curve "inout" follows GSAP power3.inOut, so the Clients count keeps step with its dots zooming out.
export default function CountUp({ to, suffix = "", ms = 1400, curve }) {
  const final = to.toLocaleString("en-US") + suffix;
  const [shown, setShown] = useState(final);
  const me = useRef(null);
  useEffect(() => {
    const el = me.current;
    if (!el || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / ms);
        const e = curve === "inout" ? (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2) : 1 - Math.pow(2, -10 * k);
        const v = Math.round(to * e);
        setShown((k < 1 ? v : to).toLocaleString("en-US") + suffix);
        if (k < 1) raf = requestAnimationFrame(step);
      };
      setShown("0" + suffix);
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      run();
    }, { threshold: 0.6 });
    io.observe(el);
    // A click on a bento cell plays its count again (owner, 28 Nov 2026: "when they click they can rerun the animations").
    el.addEventListener("cu-replay", run);
    return () => { io.disconnect(); cancelAnimationFrame(raf); el.removeEventListener("cu-replay", run); };
  }, [to, suffix, ms, curve]);
  return (
    <b ref={me}>
      <span className="cu">
        <span className="cu-w" aria-hidden="true">{final}</span>
        <span className="cu-v" aria-hidden="true">{shown}</span>
      </span>
      <span className="sr-only">{final}</span>
    </b>
  );
}
