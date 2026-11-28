"use client";
import { useEffect, useRef } from "react";
import { MarkerText, Mark } from "./MarkerText";
import { loadPlugins, reduced } from "../lib/motion";

// Big text whose words go from dim to full strength as the block scrolls through the screen.
// Optional `mark` ({ p: "exact phrase", type, color }) draws a hand-made marker over that phrase when it comes into view.
export default function ScrollText({ text, className, mark }) {
  const ref = useRef(null);
  const words = text.split(" ");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = [...el.querySelectorAll("span")];
    if (reduced()) { spans.forEach((s) => (s.style.opacity = 1)); return; }
    let raf = 0, tw = null, gone = false, off = null;
    // The story reads itself (owner, 28 Nov 2026, About GSAP idea 1): words go from dim to full as you scroll and the
    // few being "read" right now turn blue. GSAP eases the reading point so it glides. Dim words keep 4.5:1.
    const o = { at: -4 };
    const paint = () => {
      for (let i = 0; i < spans.length; i++) {
        const k = Math.max(0, Math.min(1, (o.at - i) / 4));
        spans[i].style.opacity = (0.6 + 0.4 * k).toFixed(3);
        spans[i].classList.toggle("is-now", k > 0.12 && k < 0.88);
      }
    };
    // ScrollTrigger scrubs the reading point from the block's top at 86% of the screen to its foot at 44% (owner, 28 Nov
    // 2026: "do all"); without GSAP a scroll listener sets it straight.
    const plain = () => {
      const update = () => {
        raf = 0;
        const r = el.getBoundingClientRect(), vh = innerHeight;
        o.at = Math.max(0, Math.min(1, (vh * 0.86 - r.top) / (r.height + vh * 0.42))) * (spans.length + 4); paint();
      };
      const on = () => { if (!raf) raf = requestAnimationFrame(update); };
      update(); addEventListener("scroll", on, { passive: true }); addEventListener("resize", on);
      return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
    };
    loadPlugins("ScrollTrigger").then((g) => {
      if (gone) return;
      if (!g) { off = plain(); return; }
      tw = g.fromTo(o, { at: 0 }, { at: spans.length + 4, ease: "none", onUpdate: paint, scrollTrigger: { trigger: el, start: "top 86%", end: "bottom 44%", scrub: 0.6 } });
      paint();
    });
    return () => { gone = true; if (tw) { tw.scrollTrigger && tw.scrollTrigger.kill(); tw.kill(); } if (off) off(); };
  }, [text]);
  const w = (list, from, last) => list.map((x, i) => <span key={from + i}>{x}{i < list.length - 1 || !last ? " " : ""}</span>);
  const at = mark ? text.indexOf(mark.p) : -1;
  if (at < 0) return <p ref={ref} className={className}>{w(words, 0, true)}</p>;
  const pre = text.slice(0, at).trim(), post = text.slice(at + mark.p.length);
  const a = pre ? pre.split(" ") : [], b = mark.p.split(" "), c = post.trim() ? post.trim().split(" ") : [];
  const glue = post && !post.startsWith(" ") ? c.shift() : "";
  return (
    <MarkerText>
      <p ref={ref} className={className}>
        {w(a, 0, false)}<Mark type={mark.type} color={mark.color}>{w(b, a.length, true)}</Mark>{glue ? <span>{glue}</span> : null}{c.length ? " " : ""}{w(c, a.length + b.length + 1, true)}
      </p>
    </MarkerText>
  );
}
