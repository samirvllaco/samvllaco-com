"use client";
import { useEffect } from "react";
import { loadGsap } from "../lib/gsapLoad";

// About page motion (owner, 28 Nov 2026: "do GSAP 1, 2, 3, 4 all"). One scroll loop, GSAP easing each value:
// 2) the portrait's layers (head, hair, eyes...) draw in one by one while the story scrolls past the pinned photo;
// 3) the year under the photo follows the part being read (owner, 28 Nov 2026: "it says I started designing in 2013
//    and the left shows another year"): "How it started" rolls it back to 2013 in Prizren, the other parts show today
//    with their fact. The number is also a slider (owner: "make the numbers movable and interactive"): drag it sideways
//    or use the arrow keys to scrub from 2013 to today; scrolling to the next part hands it back to the story;
// 4) the moodboard photo opens from a soft clip and settles from a slight zoom as it comes into view.
// (1, the story reading itself, lives in ScrollText.jsx.) Reduced motion shows everything at rest.
const NOW = new Date().getFullYear();
const START = 2013;
// Each story part and the year and fact it is about (only facts the story itself states).
const PART_YEAR = {
  who: [NOW, "Designing for clients since 2015"],
  work: [NOW, "573 clients and 10,000+ screens so far"],
  build: [START, "Logos and posters for friends in Prizren"],
  where: [NOW, "Moved to Tirana in 2026, working with US and EU teams"],
};
// Owner, 28 Nov 2026: started 2013 with logos and posters for friends, first paid project 2015, moved to Tirana 2026.
const PAID = 2015;
const factOf = (y) => (y <= START ? "Logos and posters for friends in Prizren" : y >= NOW ? "Now in Tirana, 573 clients and 10,000+ screens so far" : y < PAID ? "Still designing for friends in Prizren" : y === PAID ? "First paid design project" : `${y - PAID} ${y - PAID === 1 ? "year" : "years"} of client work`);

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
    const v = { lp: 0, y: NOW, m: 0 };
    let base0 = null; // the layers start from nothing at load, wherever the page opens (owner: half a box showed at load)
    let q = null, raf = 0, g = null, fact = PART_YEAR.where[1], part = "", manual = false, tw = null;
    const setFact = (f) => {
      if (!cap || cap.textContent === f) return;
      const sp = document.createElement("span"); sp.textContent = f; cap.replaceChildren(sp);
    };
    const paint = () => {
      if (ap) ap.style.setProperty("--lp", v.lp.toFixed(4));
      if (num) {
        const year = Math.round(v.y);
        if (num.textContent !== String(year)) num.textContent = String(year);
        const f = manual ? factOf(year) : fact;
        setFact(f);
        if (yr) { yr.setAttribute("aria-valuenow", String(year)); yr.setAttribute("aria-valuetext", `${year}: ${f}`); }
      }
      if (pic) pic.style.setProperty("--m", v.m.toFixed(4));
    };
    const rollTo = (y, f) => {
      fact = f;
      if (tw) tw.kill();
      if (g) tw = g.to(v, { y, duration: Math.min(1.4, 0.35 + Math.abs(v.y - y) * 0.08), ease: "power3.inOut", onUpdate: paint });
      else { v.y = y; paint(); }
    };
    // The story part at the reading line decides the year, unless the visitor is scrubbing it.
    const parts = [...document.querySelectorAll(".ab-part")];
    const readPart = () => {
      let cur = parts[0];
      for (const el of parts) if (el.getBoundingClientRect().top < window.innerHeight * 0.5) cur = el;
      const id = cur?.querySelector("[id^='ab-']")?.id.replace(/^ab-/, "") || "";
      if (id === part) return;
      part = id; manual = false;
      const pv = PART_YEAR[id];
      if (pv) rollTo(pv[0], pv[1]);
    };
    const clamp = (x) => Math.min(1, Math.max(0, x));
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const wide = window.matchMedia("(min-width: 861px)").matches;
      const w = wrap.getBoundingClientRect();
      // Desktop: the photo is pinned, so the story's scroll drives the layers and the year. Phones: the photo's own pass.
      const base = wide ? clamp((vh * 0.5 - w.top) / Math.max(1, w.height - vh * 0.4)) : (ap ? clamp((vh * 0.95 - ap.getBoundingClientRect().top) / (vh * 0.8)) : 0);
      if (base0 === null) base0 = base;
      const t = { lp: base0 >= 0.98 ? 1 : clamp((base - base0) / (1 - base0)), m: 0 };
      if (pic) { const r = pic.getBoundingClientRect(); t.m = clamp((vh - r.top) / (vh * 0.6)); }
      if (q) { q.lp(t.lp); q.m(t.m); } else { v.lp = t.lp; v.m = t.m; paint(); }
      readPart();
    };
    loadGsap().then((gs) => {
      if (!gs) return;
      g = gs;
      const mk = (k) => g.quickTo(v, k, { duration: 0.7, ease: "power3.out", onUpdate: paint });
      q = { lp: mk("lp"), m: mk("m") };
      update();
    });
    // Scrub the year: drag sideways (one year per 16px) or use the arrow keys, Home and End.
    const scrub = (y) => { manual = true; if (tw) tw.kill(); v.y = Math.min(NOW, Math.max(START, y)); paint(); };
    let drag = null;
    const down = (e) => { if (!yr) return; drag = { x: e.clientX, y: Math.round(v.y) }; yr.setPointerCapture?.(e.pointerId); yr.classList.add("is-drag"); };
    const move = (e) => { if (drag) scrub(drag.y + Math.round((e.clientX - drag.x) / 16)); };
    const up = () => { drag = null; yr?.classList.remove("is-drag"); };
    const key = (e) => {
      const y = Math.round(v.y), k = e.key;
      const to = k === "ArrowRight" || k === "ArrowUp" ? y + 1 : k === "ArrowLeft" || k === "ArrowDown" ? y - 1 : k === "Home" ? START : k === "End" ? NOW : null;
      if (to === null) return;
      e.preventDefault(); scrub(to);
    };
    if (yr) {
      yr.addEventListener("pointerdown", down); yr.addEventListener("pointermove", move);
      yr.addEventListener("pointerup", up); yr.addEventListener("pointercancel", up); yr.addEventListener("keydown", key);
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf);
      if (yr) { yr.removeEventListener("pointerdown", down); yr.removeEventListener("pointermove", move); yr.removeEventListener("pointerup", up); yr.removeEventListener("pointercancel", up); yr.removeEventListener("keydown", key); }
    };
  }, []);
  return null;
}
