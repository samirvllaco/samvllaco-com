"use client";
import { useEffect } from "react";
import { loadGsap } from "../lib/gsapLoad";

// How I work, desktop motion (owner, 28 Nov 2026):
// 1) "put emphasis on the text as well, so it's obvious it's highlighting and moving, use GSAP": as the rail reaches a
//    step, its title turns to full ink and a full grey highlight sweeps over it, its line brightens, and it eases 4px in;
//    steps not reached yet stay quieter (still 4.5:1).
// 2) "at the end of the scroll highlight this button with a rich stroke around it": once the last step is lit, a
//    spinning colour ring draws round Start a project and glows once.
// 3) "align this in the middle of the vertical box area": the pinned screen sits centred on the steps and the button.
// Same conditions as the CSS scroll timeline: wide and tall screens, motion allowed.
const AT = [0, 0.2, 0.43, 0.655, 0.88];
export default function HowIWorkMotion() {
  useEffect(() => {
    const hw = document.querySelector(".hw");
    if (!hw) return;
    const mq = window.matchMedia("(min-width: 1100px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)");
    const steps = [...hw.querySelectorAll(".hw-steps li")];
    const go = hw.querySelector(".hw-go");
    const side = hw.querySelector(".hw-side"), list = hw.querySelector(".hw-steps"), stage = hw.querySelector(".hw-stage");
    let g = null, cur = -2, lit = false, raf = 0;

    const centre = () => {
      if (!mq.matches || !side || !list || !go || !stage) { hw.style.removeProperty("--hw-top"); return; }
      const s = side.getBoundingClientRect(), a = list.getBoundingClientRect(), b = go.getBoundingClientRect();
      const top = 112 + (a.top - s.top) + ((b.bottom - a.top) - stage.offsetHeight) / 2;
      hw.style.setProperty("--hw-top", `${Math.max(96, Math.round(top))}px`);
    };
    const set = (i) => {
      if (i === cur) return;
      cur = i;
      steps.forEach((li, k) => {
        li.classList.toggle("is-on", k <= i);
        li.classList.toggle("is-cur", k === i);
        const b = li.querySelector("b");
        if (!g || !b) return;
        g.to(b, { backgroundSize: k === i ? "100% 100%" : "0% 100%", duration: k === i ? 0.6 : 0.35, ease: k === i ? "expo.out" : "power2.out", overwrite: "auto" });
        g.to(li.querySelectorAll(":scope > b, :scope > span:not(.hw-n)"), { x: k === i ? 4 : 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
      });
    };
    const light = (on) => {
      if (on === lit || !go) return;
      lit = on;
      go.classList.toggle("is-lit", on);
      const ring = go.querySelector(".hw-btnw");
      if (g && ring && on) g.fromTo(ring, { "--ring-o": 0, "--ring-s": 0.9 }, { "--ring-o": 1, "--ring-s": 1, duration: 0.7, ease: "expo.out" });
      if (g && ring && !on) g.to(ring, { "--ring-o": 0, duration: 0.3, ease: "power2.out" });
    };
    const update = () => {
      raf = 0;
      if (!mq.matches) { set(-1); light(false); steps.forEach((li) => li.classList.remove("is-on", "is-cur")); return; }
      const r = hw.getBoundingClientRect(), vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
      let i = -1;
      AT.forEach((t, k) => { if (p >= t && r.top <= vh * 0.5) i = k; });
      set(i);
      light(p >= 0.92);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    const resize = () => { centre(); on(); };
    loadGsap().then((gs) => { g = gs; cur = -2; update(); });
    centre();
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", resize);
    const ro = "ResizeObserver" in window ? new ResizeObserver(centre) : null;
    if (ro && side) ro.observe(side);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", resize); cancelAnimationFrame(raf); ro?.disconnect(); };
  }, []);
  return null;
}
