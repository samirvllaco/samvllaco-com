"use client";
import { useEffect } from "react";
import { loadGsap } from "../lib/gsapLoad";

// About page motion (owner, 28 Nov 2026: "do GSAP 1, 2, 3, 4 all"). One scroll loop, GSAP easing each value:
// 2) the portrait's layers (head, hair, eyes...) draw in one by one while the story scrolls past the pinned photo;
// 3) a year rolls from 2013, when Sam started in Prizren, to today, with the real facts from the story beside it;
// 4) the moodboard photo opens from a soft clip and settles from a slight zoom as it comes into view.
// (1, the story reading itself, lives in ScrollText.jsx.) Reduced motion shows everything at rest.
const NOW = new Date().getFullYear();
const FACTS = [
  [2013, "Started designing in Prizren, Kosovo"],
  [2017, "SaaS, AI, fintech and health products"],
  [2021, "573 clients and 10,000+ screens so far"],
  [NOW, "Now in Tirana, working with US and EU teams"],
];

export default function AboutMotion() {
  useEffect(() => {
    const wrap = document.querySelector(".ab-wrap");
    const ap = document.querySelector(".ab-photo .ap");
    const yr = document.querySelector(".ab-year");
    const pic = document.querySelector(".ab-pic");
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (ap) ap.style.setProperty("--lp", "1");
      return;
    }
    const num = yr && yr.querySelector(".ab-year-n");
    const cap = yr && yr.querySelector(".ab-year-t");
    const v = { lp: 0, y: 0, m: 0 };
    let q = null, raf = 0;
    const paint = () => {
      if (ap) ap.style.setProperty("--lp", v.lp.toFixed(4));
      if (num) {
        const year = Math.round(2013 + (NOW - 2013) * v.y);
        if (num.textContent !== String(year)) num.textContent = String(year);
        let f = FACTS[0][1];
        for (const [y, t] of FACTS) if (year >= y) f = t;
        if (cap.textContent !== f) { const sp = document.createElement("span"); sp.textContent = f; cap.replaceChildren(sp); }
      }
      if (pic) pic.style.setProperty("--m", v.m.toFixed(4));
    };
    const clamp = (x) => Math.min(1, Math.max(0, x));
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const wide = window.matchMedia("(min-width: 861px)").matches;
      const w = wrap.getBoundingClientRect();
      // Desktop: the photo is pinned, so the story's scroll drives the layers and the year. Phones: the photo's own pass.
      const base = wide ? clamp((vh * 0.5 - w.top) / Math.max(1, w.height - vh * 0.4)) : (ap ? clamp((vh * 0.95 - ap.getBoundingClientRect().top) / (vh * 0.8)) : 0);
      const t = { lp: base, y: base, m: 0 };
      if (pic) { const r = pic.getBoundingClientRect(); t.m = clamp((vh - r.top) / (vh * 0.6)); }
      if (q) { q.lp(t.lp); q.y(t.y); q.m(t.m); } else { Object.assign(v, t); paint(); }
    };
    loadGsap().then((g) => {
      if (!g) return;
      const mk = (k) => g.quickTo(v, k, { duration: 0.7, ease: "power3.out", onUpdate: paint });
      q = { lp: mk("lp"), y: mk("y"), m: mk("m") };
      update();
    });
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  return null;
}
