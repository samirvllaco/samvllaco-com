"use client";
import { useEffect, useRef } from "react";
import { loadGsap } from "../lib/gsapLoad";

// "View case study" follows the cursor over a thumbnail (owner, 28 Nov 2026). It jumps to the pointer when it enters,
// then trails it, eased by the vendored GSAP, and stays inside the picture. Mouse and trackpad only: touch and keyboard
// keep the tag in its corner. Also on the home What I do pictures (owner, 28 Nov 2026), where the before and after
// says "Drag to compare" with a left and right arrow.
const clamp = (v, a, b) => Math.min(Math.max(v, a), Math.max(a, b));

export default function FollowTag({ label = "View case study", drag = false }) {
  const me = useRef(null);
  useEffect(() => {
    const tag = me.current;
    const box = tag && tag.parentElement;
    if (!box || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const o = { x: 0, y: 0 };
    let qx = null, qy = null;
    const paint = () => { tag.style.setProperty("--fx", `${o.x.toFixed(1)}px`); tag.style.setProperty("--fy", `${o.y.toFixed(1)}px`); };
    const at = (e) => {
      const r = box.getBoundingClientRect();
      const w = tag.offsetWidth / 2 + 12, h = tag.offsetHeight / 2 + 12;
      return [clamp(e.clientX - r.left, w, r.width - w), clamp(e.clientY - r.top, h, r.height - h)];
    };
    const enter = (e) => {
      [o.x, o.y] = at(e);
      if (qx) { qx.tween.progress(1); qy.tween.progress(1); }
      paint();
      tag.classList.add("is-follow");
      loadGsap().then((g) => {
        if (g && !qx) {
          qx = g.quickTo(o, "x", { duration: 0.45, ease: "power3.out", onUpdate: paint });
          qy = g.quickTo(o, "y", { duration: 0.45, ease: "power3.out", onUpdate: paint });
        }
      });
    };
    const move = (e) => {
      const [x, y] = at(e);
      if (qx) { qx(x); qy(y); } else { o.x = x; o.y = y; paint(); }
    };
    box.addEventListener("pointerenter", enter);
    box.addEventListener("pointermove", move);
    return () => { box.removeEventListener("pointerenter", enter); box.removeEventListener("pointermove", move); };
  }, []);
  return (
    <span ref={me} className="work-open" aria-hidden="true">
      <span className="work-open-t">{label}</span>
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">{drag ? <path d="m9 7-5 5 5 5M15 7l5 5-5 5" /> : <path d="M7 17L17 7M9 7h8v8" />}</svg>
    </span>
  );
}
