"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { loadPlugins, onLive, reduced } from "../lib/motion";

// Section titles rise line by line out of a mask as they scroll in (owner, 28 Nov 2026, GSAP "do all"): SplitText cuts
// each h2 into lines inside clipping boxes and ScrollTrigger lifts them once. Only titles below the screen at the first
// interaction take part, so nothing on screen ever hides, and the words move only by transform inside the clip (they
// keep 4.5:1 the whole way). Lines re-split on resize and once the fonts are in. Off for reduced motion.
const SKIP = ".site-footer, .ask-panel, dialog, [data-no-reveal], .sx-bar-pay";
const done = new WeakSet();

export default function HeadReveal() {
  const path = usePathname();
  useEffect(() => {
    if (reduced()) return;
    let gone = false;
    const made = [];
    const off = onLive(() => {
      const hs = [...document.querySelectorAll("main h2")].filter((h) => !h.closest(SKIP) && h.getBoundingClientRect().top > innerHeight);
      if (!hs.length) return;
      loadPlugins("ScrollTrigger", "SplitText").then((g) => {
        if (!g || gone) return;
        const ST = window.SplitText;
        hs.forEach((h) => {
          if (h.getBoundingClientRect().top <= innerHeight) return;
          made.push(ST.create(h, {
            type: "lines", mask: "lines", autoSplit: true,
            // A title that already rose stays put when the lines are cut again (resize, fonts).
            onSplit: (self) => (done.has(h) ? undefined : g.from(self.lines, { yPercent: 105, duration: 0.9, ease: "power4.out", stagger: 0.08, onStart: () => done.add(h), scrollTrigger: { trigger: h, start: "top 90%", once: true } })),
          }));
        });
      });
    });
    return () => { gone = true; off(); made.forEach((s) => s.revert()); };
  }, [path]);
  return null;
}
