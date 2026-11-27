"use client";
import { useEffect, useRef, useState } from "react";

// A real number that counts up once when its card scrolls into view (owner, 27 Nov 2026: bento animations, done in
// code). The server renders the final value, a hidden copy keeps the width fixed so nothing around it moves, and
// screen readers and reduced motion only ever get the final number.
export default function CountUp({ to, suffix = "", ms = 1400 }) {
  const final = to.toLocaleString("en-US") + suffix;
  const [shown, setShown] = useState(final);
  const me = useRef(null);
  useEffect(() => {
    const el = me.current;
    if (!el || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / ms);
        const v = Math.round(to * (1 - Math.pow(2, -10 * k)));
        setShown((k < 1 ? v : to).toLocaleString("en-US") + suffix);
        if (k < 1) raf = requestAnimationFrame(step);
      };
      setShown("0" + suffix);
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, suffix, ms]);
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
