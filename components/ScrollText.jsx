"use client";
import { useEffect, useRef } from "react";
import { MarkerText, Mark } from "./MarkerText";

// Big text whose words go from dim to full strength as the block scrolls through the screen.
// Optional `mark` ({ p: "exact phrase", type, color }) draws a hand-made marker over that phrase when it comes into view.
export default function ScrollText({ text, className, mark }) {
  const ref = useRef(null);
  const words = text.split(" ");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = [...el.querySelectorAll("span")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { spans.forEach((s) => (s.style.opacity = 1)); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect(), vh = innerHeight;
      const p = Math.max(0, Math.min(1, (vh * 0.86 - r.top) / (r.height + vh * 0.42)));
      const at = p * (spans.length + 4);
      for (let i = 0; i < spans.length; i++) spans[i].style.opacity = (0.7 + 0.3 * Math.max(0, Math.min(1, (at - i) / 4))).toFixed(3);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
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
