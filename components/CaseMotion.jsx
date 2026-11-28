"use client";
import { useEffect } from "react";
import { loadPlugins, reduced } from "../lib/motion";

// Case study motion (owner, 28 Nov 2026: "use GSAP animation on single work as well to reveal work and show them in
// creative layouts"). The screens sit in an editorial rhythm (CSS: one wide, then a pair with the second set lower, then
// a pair the other way round). Each screen opens from a soft inset clip and settles from a slight zoom as it scrolls in,
// its caption rises a few pixels (transform only, the words keep their contrast), and the lower screen of each pair
// drifts a little slower than the page. Only screens below the first screen start hidden, so the first frame never
// changes; reduced motion and no JS show everything still. ScrollTrigger runs it (owner, 28 Nov 2026: "do all"): one
// batch opens the screens that arrive together one after the other, and the drift is scrubbed on wide screens only.
export default function CaseMotion() {
  useEffect(() => {
    if (reduced()) return;
    const media = [...document.querySelectorAll(".case .case-shot > :first-child, .case .case-fig")];
    if (!media.length) return;
    let gone = false, mm = null, batch = [];
    const capOf = (m) => m.parentElement && m.parentElement.querySelector(":scope > figcaption");
    loadPlugins("ScrollTrigger").then((g) => {
      if (!g || gone) return;
      const ST = window.ScrollTrigger;
      const wait = media.filter((m) => m.getBoundingClientRect().top > innerHeight * 0.92);
      wait.forEach((m) => {
        g.set(m, { clipPath: "inset(10% 7% 10% 7% round 6px)", scale: 1.06, y: 48, transformOrigin: "50% 60%" });
        const cap = capOf(m);
        if (cap) g.set(cap, { y: 16 });
      });
      batch = ST.batch(wait, {
        start: "top 88%",
        once: true,
        onEnter: (els) => {
          g.to(els, { clipPath: "inset(0% 0% 0% 0% round 6px)", scale: 1, y: 0, duration: 1.2, stagger: 0.12, ease: "expo.out", clearProps: "clipPath,scale,transformOrigin" });
          const caps = els.map(capOf).filter(Boolean);
          if (caps.length) g.to(caps, { y: 0, duration: 0.9, stagger: 0.12, delay: 0.15, ease: "power3.out" });
        },
      });
      // Drift: the lower screen of each pair moves a little slower than the page (wide screens only).
      mm = g.matchMedia();
      mm.add("(min-width: 900px)", () => {
        document.querySelectorAll(".case-shots > .case-shot.is-low").forEach((d) => {
          g.fromTo(d, { y: 40 }, { y: -40, ease: "none", scrollTrigger: { trigger: d, start: "top bottom", end: "bottom top", scrub: 0.8 } });
        });
      });
    });
    return () => { gone = true; batch.forEach((t) => t.kill()); if (mm) mm.revert(); };
  }, []);
  return null;
}
