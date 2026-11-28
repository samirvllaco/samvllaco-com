"use client";
import { useEffect } from "react";
import { loadGsap } from "../lib/gsapLoad";

// Case study motion (owner, 28 Nov 2026: "use GSAP animation on single work as well to reveal work and show them in
// creative layouts"). The screens sit in an editorial rhythm (CSS: one wide, then a pair with the second set lower, then
// a pair the other way round). Each screen opens from a soft inset clip and settles from a slight zoom as it scrolls in,
// its caption rises a few pixels (transform only, the words keep their contrast), and the lower screen of each pair
// drifts a little slower than the page. Only screens below the first screen start hidden, so the first frame never
// changes; reduced motion and no JS show everything still.
export default function CaseMotion() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const media = [...document.querySelectorAll(".case .case-shot > :first-child, .case .case-fig")];
    if (!media.length) return;
    let gone = false, io = null, raf = 0;
    const offs = [];
    loadGsap().then((g) => {
      if (!g || gone) return;
      const vh = innerHeight;
      const wait = media.filter((m) => m.getBoundingClientRect().top > vh * 0.92);
      wait.forEach((m) => {
        g.set(m, { clipPath: "inset(10% 7% 10% 7% round 6px)", scale: 1.06, y: 48, transformOrigin: "50% 60%" });
        const cap = m.parentElement && m.parentElement.querySelector(":scope > figcaption");
        if (cap) g.set(cap, { y: 16 });
      });
      let last = 0;
      io = new IntersectionObserver((es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const now = performance.now();
          const delay = now - last < 120 ? 0.12 : 0; // two screens in one row open one after the other
          last = now;
          g.to(e.target, { clipPath: "inset(0% 0% 0% 0% round 6px)", scale: 1, y: 0, duration: 1.2, delay, ease: "expo.out", clearProps: "clipPath,scale,transformOrigin" });
          const cap = e.target.parentElement && e.target.parentElement.querySelector(":scope > figcaption");
          if (cap) g.to(cap, { y: 0, duration: 0.9, delay: delay + 0.15, ease: "power3.out" });
        });
      }, { rootMargin: "0px 0px -12% 0px" });
      wait.forEach((m) => io.observe(m));

      // Drift: the lower screen of each pair moves a little slower than the page (wide screens only).
      const wide = matchMedia("(min-width: 900px)");
      const drift = [...document.querySelectorAll(".case-shots > .case-shot.is-low")];
      if (drift.length) {
        const qs = drift.map((d) => g.quickTo(d, "y", { duration: 0.8, ease: "power3.out" }));
        const tick = () => {
          raf = 0;
          if (!wide.matches) { qs.forEach((q) => q(0)); return; }
          drift.forEach((d, i) => {
            const r = d.getBoundingClientRect();
            if (r.bottom < -200 || r.top > innerHeight + 200) return;
            const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; // -1 .. 1 around the middle of the screen
            qs[i](Math.max(-1, Math.min(1, p)) * 40);
          });
        };
        const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
        addEventListener("scroll", on, { passive: true });
        addEventListener("resize", on);
        on();
        offs.push(() => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); });
      }
    });
    return () => { gone = true; if (io) io.disconnect(); offs.forEach((f) => f()); };
  }, []);
  return null;
}
