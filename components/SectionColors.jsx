"use client";
import { useEffect } from "react";

// Fades the page background to the color of the section sitting at the 60% line of the screen.
// Works both ways: scrolling back up restores the earlier colors.
// The same sections in light mode.
const LIGHT = { "#111112": "#ffffff", "#000000": "#ffffff", "#1d1d1f": "#f5f5f7", "#1f1f22": "#f5f5f7" };

export default function SectionColors() {
  useEffect(() => {
    const els = [...document.querySelectorAll("[data-bg]")];
    if (!els.length) return;
    const body = document.body;
    const bands = els.filter((el) => el.classList.contains("band-light"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // First color applies instantly (no fade on load), later changes fade.
    body.style.transition = "none";
    let raf = 0;
    let current = "";

    // Bent edge under each white band (owner, 28 Nov 2026: "using gsap, bend the section, then make it straight while
    // the scroll goes away"). Depth comes from the scroll; GSAP (the same vendored file the intro uses, loaded once when
    // a band's foot gets near) eases each band toward it, so the curve settles like a scrub instead of snapping.
    const bend = new Map();
    let gsapAsked = false;
    const deep = () => Math.round(Math.min(96, Math.max(32, window.innerWidth * 0.06)));
    const setBend = (b, px) => {
      let o = bend.get(b);
      if (!o) { o = { v: px, to: null }; bend.set(b, o); b.style.setProperty("--bend", `${px}px`); }
      const g = window.gsap;
      if (g && !o.to) o.to = g.quickTo(o, "v", { duration: 0.6, ease: "power3.out", onUpdate: () => b.style.setProperty("--bend", `${o.v.toFixed(1)}px`) });
      if (o.to) o.to(px);
      else { o.v = px; b.style.setProperty("--bend", `${px}px`); }
    };
    const askGsap = () => {
      if (gsapAsked || window.gsap) return;
      gsapAsked = true;
      const sc = document.createElement("script");
      sc.src = "/vendor/gsap-3.15.1.min.js";
      sc.async = true;
      document.head.appendChild(sc);
    };

    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.6;
      let pick = els[0];
      if (window.scrollY > 8) {
        for (const el of els) {
          if (el.getBoundingClientRect().top <= line) pick = el;
        }
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) pick = els[els.length - 1];
      const light = document.documentElement.dataset.theme === "light";
      // Sections marked data-dark stay dark in light mode too.
      const c = light && !pick.hasAttribute("data-dark") ? (LIGHT[pick.dataset.bg.toLowerCase()] || "#ffffff") : pick.dataset.bg;
      // White bands are dark until they reach the line, then animate to white (owner, 27 Nov 2026).
      for (const b of bands) b.classList.toggle("is-dim", b !== pick);
      if (!reduce) {
        const vh = window.innerHeight;
        for (const b of bands) {
          const foot = b.getBoundingClientRect().bottom;
          if (foot < vh * 2.5) askGsap();
          // Full depth until the foot enters the screen, straight by the time it reaches the 60% line.
          const k = Math.min(1, Math.max(0, (vh - foot) / (vh * 0.4)));
          setBend(b, Math.round(deep() * (1 - k)));
        }
      }
      // Floating bits (Ask pill, book bubble, back to top, the bottom blur) turn light while a lit band covers the screen's foot.
      const lit = bands.includes(pick) && pick.getBoundingClientRect().bottom > window.innerHeight * 0.7;
      document.documentElement.classList.toggle("on-light", lit);
      if (c !== current) {
        current = c;
        body.style.backgroundColor = c;
        document.documentElement.style.setProperty("--sec-bg", c);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    requestAnimationFrame(() => { body.style.transition = reduce ? "none" : "background-color 900ms ease"; });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("sv:theme", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("sv:theme", update);
      if (raf) cancelAnimationFrame(raf);
      body.style.backgroundColor = "";
      body.style.transition = "";
      document.documentElement.style.removeProperty("--sec-bg");
      for (const b of bands) { b.classList.remove("is-dim"); b.style.removeProperty("--bend"); }
      document.documentElement.classList.remove("on-light");
    };
  }, []);
  return null;
}
