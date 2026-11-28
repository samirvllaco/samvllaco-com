"use client";
import { useEffect, useRef, useState } from "react";
import HireCard from "./HireCard";
import { loadGsap } from "../lib/gsapLoad";

// Sticky side column on case studies and articles: a table of contents and (case studies) a card to get in touch.
// The contents list has a 4px rail that fills with the reading, like the How I work steps (owner, 28 Nov 2026: "make the
// line thicker and use the same animation"): GSAP eases the fill, read items brighten, the current one turns white and
// its number blue. Articles leave the hire card out (owner, 28 Nov 2026: "hide contact from single blog").
const split = (label) => { const m = label.match(/^(\d+)\.\s+(.*)$/); return m ? [m[1].padStart(2, "0"), m[2]] : [null, label]; };
export default function CaseAside({ items, hire = true }) {
  const [active, setActive] = useState(items[0]?.id);
  const list = useRef(null);

  useEffect(() => {
    const ol = list.current;
    if (!ol || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { ol?.style.setProperty("--p", "1"); return; }
    const v = { p: 0 };
    let q = null, raf = 0;
    const paint = () => ol.style.setProperty("--p", v.p.toFixed(4));
    const update = () => {
      raf = 0;
      const first = document.getElementById(items[0]?.id);
      const top = first ? first.getBoundingClientRect().top + window.scrollY : 0;
      const end = document.documentElement.scrollHeight - window.innerHeight;
      const t = Math.min(1, Math.max(0, (window.scrollY - top + 140) / Math.max(1, end - top + 140)));
      if (q) q(t); else { v.p = t; paint(); }
    };
    loadGsap().then((g) => { if (g) { q = g.quickTo(v, "p", { duration: 0.6, ease: "power3.out", onUpdate: paint }); update(); } });
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [items]);

  useEffect(() => {
    function onScroll() {
      let cur = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= 140) cur = it.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = items[items.length - 1].id;
      setActive(cur);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <aside className="case-aside">
      <nav className="case-toc" aria-label="On this page">
        <p className="case-toc-label">On this page</p>
        <ol ref={list}>
          {items.map((it, i) => {
            const [n, t] = split(it.label);
            const at = items.findIndex((x) => x.id === active);
            return (
              <li key={it.id} className={i < at ? "is-read" : undefined}>
                <a href={`#${it.id}`} aria-current={active === it.id ? "true" : undefined}>{n ? <span className="toc-n">{n}</span> : null}<span className="toc-t">{t}</span></a>
              </li>
            );
          })}
        </ol>
      </nav>
      {hire ? <HireCard /> : null}
    </aside>
  );
}
