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
// 4) "using GSAP scroll, animate, snap, smoother animation here, and effects on the right": on these screens GSAP takes
//    over from the CSS scroll timeline (.hw-gs): the rail eases to the step you are on, numbers turn blue as they are
//    reached, the screen on the right wipes up over the last one while it settles from a slight zoom and its caption
//    rises in (and wipes down going back), and when you stop scrolling inside the section the page glides to the
//    nearest step.
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
    const cards = stage ? [...stage.children] : [];
    const rail = { v: 0 };
    const paintRail = () => list && list.style.setProperty("--railp", rail.v.toFixed(4));
    // Rail: down to the foot of the step you are on (the last step fills it).
    const railTo = (i) => {
      if (!list) return;
      const t = i < 0 ? 0 : i >= steps.length - 1 ? 1 : (steps[i].offsetTop + steps[i].offsetHeight) / list.offsetHeight;
      if (g) g.to(rail, { v: t, duration: 0.8, ease: "expo.out", overwrite: "auto", onUpdate: paintRail }); else { rail.v = t; paintRail(); }
    };
    // Right side: the screen for the step wipes in over the last one.
    let shown = -1;
    const show = (i) => {
      const k = Math.max(0, i);
      if (!g || !cards.length || k === shown) return;
      const from = shown, fwd = k > from;
      shown = k;
      cards.forEach((c, n) => { c.style.zIndex = n === k ? 2 : n === from ? 1 : 0; });
      const inc = cards[k], out = from >= 0 ? cards[from] : null;
      if (from < 0) { cards.forEach((c, n) => g.set(c, { clipPath: n === k ? "inset(0% 0 0% 0 round 8px)" : "inset(100% 0 0% 0 round 8px)" })); return; }
      const img = inc.querySelector("img"), cap = inc.querySelectorAll(".hw-tt, .hw-td");
      g.fromTo(inc, { clipPath: fwd ? "inset(100% 0 0% 0 round 8px)" : "inset(0% 0 100% 0 round 8px)" }, { clipPath: "inset(0% 0 0% 0 round 8px)", duration: 0.85, ease: "expo.inOut", overwrite: "auto" });
      if (img) g.fromTo(img, { scale: 1.1, y: fwd ? 24 : -24 }, { scale: 1, y: 0, duration: 1.1, ease: "expo.out", overwrite: "auto" });
      if (cap.length) g.fromTo(cap, { y: 14 }, { y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06, delay: 0.35, overwrite: "auto" });
      if (out) {
        const oi = out.querySelector("img");
        g.to(out, { scale: 0.96, duration: 0.85, ease: "expo.inOut", overwrite: "auto", onComplete: () => { g.set(out, { scale: 1, clipPath: "inset(100% 0 0% 0 round 8px)" }); } });
        if (oi) g.to(oi, { y: fwd ? -30 : 30, duration: 0.85, ease: "expo.inOut", overwrite: "auto", onComplete: () => g.set(oi, { y: 0 }) });
      }
    };
    const takeOver = (on) => {
      hw.classList.toggle("hw-gs", on);
      if (!on) { cards.forEach((c) => { c.style.removeProperty("clip-path"); c.style.removeProperty("z-index"); c.style.removeProperty("scale"); c.style.removeProperty("transform"); }); shown = -1; }
    };

    const centre = () => {
      if (!mq.matches || !side || !list || !go || !stage) { hw.style.removeProperty("--hw-top"); return; }
      const s = side.getBoundingClientRect(), a = list.getBoundingClientRect(), b = go.getBoundingClientRect();
      const top = 112 + (a.top - s.top) + ((b.bottom - a.top) - stage.offsetHeight) / 2;
      hw.style.setProperty("--hw-top", `${Math.max(96, Math.round(top))}px`);
    };
    // One grey box behind the whole current row (number, title and line), gliding from step to step (owner, 28 Nov
    // 2026: "highlight the whole thing, the row, not only the title, smooth with GSAP"). It sweeps in from the left the
    // first time and fades out above the first step.
    let hl = list && list.querySelector(".hw-hl");
    if (list && !hl) { hl = document.createElement("span"); hl.className = "hw-hl"; hl.setAttribute("aria-hidden", "true"); list.prepend(hl); }
    const place = (i, first) => {
      if (!hl || !g) return;
      if (i < 0) { g.to(hl, { opacity: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" }); return; }
      const li = steps[i], y = li.offsetTop, h = li.offsetHeight;
      if (first) {
        g.set(hl, { y, height: h });
        g.fromTo(hl, { opacity: 1, clipPath: "inset(0 100% 0 0 round 6px)" }, { clipPath: "inset(0 0% 0 0 round 6px)", duration: 0.6, ease: "expo.out", overwrite: "auto" });
      } else g.to(hl, { y, height: h, opacity: 1, clipPath: "inset(0 0% 0 0 round 6px)", duration: 0.6, ease: "expo.inOut", overwrite: "auto" });
    };
    const set = (i) => {
      if (i === cur) return;
      const was = cur;
      cur = i;
      steps.forEach((li, k) => {
        li.classList.toggle("is-on", k <= i);
        li.classList.toggle("is-cur", k === i);
        if (!g) return;
        g.to(li.querySelectorAll(":scope > b, :scope > span:not(.hw-n)"), { x: k === i ? 4 : 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
      });
      place(i, was < 0);
      railTo(i);
      show(i);
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
      takeOver(mq.matches && !!g);
      if (!mq.matches) { set(-1); light(false); steps.forEach((li) => li.classList.remove("is-on", "is-cur")); return; }
      const r = hw.getBoundingClientRect(), vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
      let i = -1;
      AT.forEach((t, k) => { if (p >= t && r.top <= vh * 0.5) i = k; });
      set(i);
      light(p >= 0.92);
    };
    // Snap: when scrolling stops inside the section, glide to the middle of the nearest step's stretch.
    const MID = AT.map((t, k) => (t + (AT[k + 1] ?? 1)) / 2);
    let idle = 0, snapping = 0;
    const snap = () => {
      if (!mq.matches || Date.now() < snapping) return;
      const r = hw.getBoundingClientRect(), vh = window.innerHeight, span = r.height - vh;
      if (span <= 0) return;
      const p = -r.top / span;
      if (p <= 0.01 || p >= 0.99) return;
      let best = MID[0];
      for (const m of MID) if (Math.abs(m - p) < Math.abs(best - p)) best = m;
      const y = Math.round(window.scrollY + r.top + best * span);
      if (Math.abs(y - window.scrollY) < 8) return;
      snapping = Date.now() + 1100;
      if (window.__smooth && window.__smooth.scrollTo) window.__smooth.scrollTo(y, { duration: 0.9, easing: (x) => 1 - Math.pow(1 - x, 3) });
      else window.scrollTo({ top: y, behavior: "smooth" });
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
      clearTimeout(idle);
      if (Date.now() >= snapping) idle = setTimeout(snap, 180);
    };
    const resize = () => { centre(); on(); };
    loadGsap().then((gs) => { g = gs; cur = -2; update(); });
    centre();
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", resize);
    const ro = "ResizeObserver" in window ? new ResizeObserver(centre) : null;
    if (ro && side) ro.observe(side);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", resize); cancelAnimationFrame(raf); clearTimeout(idle); ro?.disconnect(); takeOver(false); };
  }, []);
  return null;
}
