"use client";
import { useEffect, useRef, useState } from "react";

// "Loading to success" motion, shared by every copy button. The box closes into a round spinner,
// opens into the success pill while the check draws itself, then settles back.
// Springs (stiffness, damping) are the motion study's own: width, label, spinner, done label, fill, check.
const SPR = { w: [300, 22], t: [400, 30], p: [300, 28], d: [220, 20], g: [200, 30], k: [120, 20] };
export const TICK_D = "M5 12.5l4.5 4.5L19 7.5";
export const TICK_LEN = 22;

export default function useCopyMotion({ pad = 28, loadMs = 650, holdMs = 2600, status = "Copied" } = {}) {
  const box = useRef(null), lbl = useRef(null), spin = useRef(null), done = useRef(null), fill = useRef(null), tick = useRef(null);
  const sim = useRef(null);
  const [msg, setMsg] = useState("");

  useEffect(() => () => { const m = sim.current; if (m) { cancelAnimationFrame(m.raf); m.timers.forEach(clearTimeout); } }, []);

  const run = () => {
    const m = sim.current;
    if (m.raf) return;
    m.last = performance.now();
    const all = [m.W, m.T, m.P, m.D, m.G, m.K];
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const frame = (now) => {
      const dt = Math.min((now - m.last) / 1000, 1 / 30); m.last = now;
      m.rot = (m.rot + dt * 360 * 1.4) % 360;
      for (let i = 0; i < 4; i++) all.forEach((s) => { const a = -s.k * (s.x - s.t) - s.c * s.v; s.v += a * (dt / 4); s.x += s.v * (dt / 4); });
      const el = box.current;
      if (el) {
        el.style.minWidth = "0"; el.style.width = m.W.x.toFixed(2) + "px";
        lbl.current.style.opacity = clamp(m.T.x, 0, 1).toFixed(3);
        lbl.current.style.transform = `translateY(${((1 - m.T.x) * 14).toFixed(2)}px)`;
        spin.current.style.opacity = clamp(m.P.x, 0, 1).toFixed(3);
        spin.current.style.transform = `rotate(${m.rot.toFixed(1)}deg) scale(${(0.6 + 0.4 * clamp(m.P.x, 0, 1.2)).toFixed(3)})`;
        done.current.style.opacity = clamp(m.D.x, 0, 1).toFixed(3);
        done.current.style.transform = `translateY(${((1 - m.D.x) * 12).toFixed(2)}px)`;
        fill.current.style.opacity = clamp(m.G.x, 0, 1).toFixed(3);
        tick.current.style.strokeDashoffset = (TICK_LEN * (1 - clamp(m.K.x, 0, 1))).toFixed(2);
      }
      const still = m.state === "idle" && all.every((s) => Math.abs(s.x - s.t) < 0.001 && Math.abs(s.v) < 0.001);
      if (still) { m.raf = 0; if (el) { el.style.width = ""; el.style.minWidth = ""; } return; }
      m.raf = requestAnimationFrame(frame);
    };
    m.raf = requestAnimationFrame(frame);
  };

  const start = () => {
    const el = box.current;
    if (!el) return;
    let m = sim.current;
    if (!m) {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const S = (x, [k, c]) => ({ x, v: 0, t: x, k, c: reduce ? 2 * Math.sqrt(k) : c });
      const w0 = el.offsetWidth;
      m = sim.current = { w0, h: el.offsetHeight, state: "idle", timers: [], raf: 0, last: 0, rot: 0,
        W: S(w0, SPR.w), T: S(1, SPR.t), P: S(0, SPR.p), D: S(0, SPR.d), G: S(0, SPR.g), K: S(0, SPR.k) };
    }
    if (m.state !== "idle") return;
    const later = (ms, f) => m.timers.push(setTimeout(f, ms));
    const doneW = Math.max(m.h, (done.current?.scrollWidth || 0) + pad);
    m.state = "load"; m.T.t = 0; m.W.t = m.h; m.P.t = 1;
    later(loadMs, () => {
      m.state = "done"; m.P.t = 0; m.W.t = doneW; m.G.t = 1; m.D.t = 1;
      later(150, () => { m.K.t = 1; });
      setMsg(status);
    });
    later(loadMs + holdMs - 650, () => {
      m.state = "back"; m.D.t = 0; m.G.t = 0; m.K.t = 0; m.W.t = m.w0;
      later(120, () => { m.T.t = 1; });
      later(900, () => { m.state = "idle"; setMsg(""); });
    });
    run();
  };

  return { refs: { box, lbl, spin, done, fill, tick }, start, msg };
}
