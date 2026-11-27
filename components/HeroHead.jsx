"use client";
import { useEffect, useRef, useState } from "react";

// Hero headline in the clean chip style (owner, 27 Nov 2026: "this looks good, can hero have this, cleaner, better UX,
// and a creative way to show all fields, law, tech etc"). The last chip names who I design for and rolls through the
// industries; the row of industry chips above stays in step, and pointing at one sets the headline to it.
// Words never fade: the rolling chip moves inside a clipping box. It starts only after the first interaction,
// pauses off screen and while someone points at the row, and stays put with reduced motion.
export default function HeroHead({ items }) {
  const [i, setI] = useState(0);
  const [live, setLive] = useState(false);
  const [hold, setHold] = useState(false);
  const [seen, setSeen] = useState(true);
  const root = useRef(null);

  useEffect(() => {
    const h = document.documentElement;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (h.classList.contains("is-live")) { setLive(true); return; }
    const mo = new MutationObserver(() => { if (h.classList.contains("is-live")) { setLive(true); mo.disconnect(); } });
    mo.observe(h, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting));
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!live || hold || !seen) return;
    const t = setTimeout(() => setI((v) => (v + 1) % items.length), 2600);
    return () => clearTimeout(t);
  }, [i, live, hold, seen, items.length]);

  return (
    <div className="hh" ref={root}>
      <ul className="hh-for" aria-label="Who I design for" onMouseLeave={() => setHold(false)}>
        {items.map((x, k) => (
          <li key={x.id}>
            <a className={k === i ? "is-on" : undefined} href={`/for/${x.id}/`} onMouseEnter={() => { setHold(true); setI(k); }} onFocus={() => { setHold(true); setI(k); }} onBlur={() => setHold(false)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d={x.icon} /></svg>{x.short}
            </a>
          </li>
        ))}
      </ul>
      <h1 className="hh-h">
        I design <span className="hh-chip"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5" /></svg>products</span> people love, <span className="hh-nw">for{" "}
          <span className="hh-roll">
            {items.map((x, k) => (
              <span key={x.id} className={`hh-chip hh-opt${k === i ? " is-on" : ""}${k === (i + items.length - 1) % items.length ? " is-out" : ""}`} aria-hidden={k !== i}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d={x.icon} /></svg>{x.say}
              </span>
            ))}
          </span>
        </span>
      </h1>
    </div>
  );
}
