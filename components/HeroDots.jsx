"use client";
import { useEffect } from "react";

// Hero dot grid that reacts to the pointer: dots near it light up and get pushed aside, then spring back.
// The CSS grid (.hero2::before) paints first; on the first pointer move over the hero this canvas copies it
// dot for dot (same spacing, colour and edge fade) and takes over. Only the area around the pointer is
// redrawn, and the loop stops as soon as every dot is back home.
const RADIUS = 110, PUSH = 28, SPRING = 0.12, DAMP = 0.78;

// Reads the edge fade of .hero2::before ("radial-gradient(46% 80% at 86% 30%, ... 75%)") so the canvas fades the same way.
const fadesOf = (el) => {
  const cs = getComputedStyle(el, "::before");
  const img = cs.webkitMaskImage || cs.maskImage || "none";
  return img.split("radial-gradient(").slice(1).map((g) => {
    const m = g.match(/^(?:ellipse\s+)?([\d.]+)%\s+([\d.]+)%\s+at\s+([\d.]+)%\s+([\d.]+)%/);
    const end = g.match(/([\d.]+)%\)[,\s]*$/);
    return m ? { rx: +m[1] / 100, ry: +m[2] / 100, cx: +m[3] / 100, cy: +m[4] / 100, end: end ? +end[1] / 100 : 1 } : null;
  }).filter(Boolean);
};

function mount(hero) {
  const cv = document.createElement("canvas");
  cv.className = "hero-dots-cv"; cv.setAttribute("aria-hidden", "true");
  hero.prepend(cv);
  const ctx = cv.getContext("2d");
  const color = getComputedStyle(hero).getPropertyValue("--text").trim() || "#f5f5f7";
  let W = 0, H = 0, dpr = 1, step = 22, cols = 0, rows = 0, base = [], ox, oy, vx, vy;
  let active = new Set(), px = -1e4, py = -1e4, raf = 0, box = null;

  const layout = () => {
    W = cv.clientWidth; H = cv.clientHeight;
    dpr = Math.min(devicePixelRatio || 1, 2, Math.sqrt(8e6 / (W * H || 1)));
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    step = parseFloat(getComputedStyle(hero, "::before").backgroundSize) || 22;
    cols = Math.ceil(W / step); rows = Math.ceil(H / step);
    const fades = fadesOf(hero), n = cols * rows;
    base = new Float32Array(n); ox = new Float32Array(n); oy = new Float32Array(n); vx = new Float32Array(n); vy = new Float32Array(n);
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const x = (i + 0.5) / cols, y = (j + 0.5) / rows;
      let a = fades.length ? 0 : 1;
      for (const f of fades) { const d = Math.hypot((x - f.cx) / f.rx, (y - f.cy) / f.ry); const m = Math.max(0, 1 - d / f.end); a = a + m * (1 - a); }
      base[j * cols + i] = 0.11 * a; // ::before: --text at 22% inside a layer at 50% opacity
    }
    active = new Set(); box = null;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H); ctx.fillStyle = color;
    for (let k = 0; k < n; k++) if (base[k] > 0.004) dot(k, 0, 0, base[k], 1.2);
    ctx.globalAlpha = 1;
  };
  const dot = (k, dx, dy, a, r) => {
    ctx.globalAlpha = a; ctx.beginPath();
    ctx.arc((k % cols + 0.5) * step + dx, (((k / cols) | 0) + 0.5) * step + dy, r, 0, 6.2832); ctx.fill();
  };

  const tick = () => {
    raf = 0;
    // Wake the dots around the pointer.
    const i0 = Math.max(0, Math.floor((px - RADIUS) / step)), i1 = Math.min(cols - 1, Math.floor((px + RADIUS) / step));
    const j0 = Math.max(0, Math.floor((py - RADIUS) / step)), j1 = Math.min(rows - 1, Math.floor((py + RADIUS) / step));
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) active.add(j * cols + i);
    // Springs.
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    const glow = new Map();
    for (const k of active) {
      const hx = (k % cols + 0.5) * step, hy = (((k / cols) | 0) + 0.5) * step;
      const d = Math.hypot(hx - px, hy - py), f = Math.max(0, 1 - d / RADIUS);
      const tx = f && d ? ((hx - px) / d) * PUSH * f : 0, ty = f && d ? ((hy - py) / d) * PUSH * f : 0;
      vx[k] = (vx[k] + (tx - ox[k]) * SPRING) * DAMP; vy[k] = (vy[k] + (ty - oy[k]) * SPRING) * DAMP;
      ox[k] += vx[k]; oy[k] += vy[k];
      if (!f && Math.abs(ox[k]) < 0.05 && Math.abs(oy[k]) < 0.05 && Math.abs(vx[k]) < 0.05 && Math.abs(vy[k]) < 0.05) { ox[k] = oy[k] = vx[k] = vy[k] = 0; active.delete(k); }
      else glow.set(k, f);
      x0 = Math.min(x0, hx - 40); x1 = Math.max(x1, hx + 40); y0 = Math.min(y0, hy - 40); y1 = Math.max(y1, hy + 40);
    }
    // Redraw only the area that changed: this frame's dots plus where they were last frame.
    const nb = x1 > x0 ? { x0, y0, x1, y1 } : null, ob = box;
    const r = nb && ob ? { x0: Math.min(nb.x0, ob.x0), y0: Math.min(nb.y0, ob.y0), x1: Math.max(nb.x1, ob.x1), y1: Math.max(nb.y1, ob.y1) } : nb || ob;
    box = nb;
    if (r) {
      ctx.save(); ctx.beginPath(); ctx.rect(r.x0, r.y0, r.x1 - r.x0, r.y1 - r.y0); ctx.clip();
      ctx.clearRect(r.x0, r.y0, r.x1 - r.x0, r.y1 - r.y0); ctx.fillStyle = color;
      const a0 = Math.max(0, Math.floor(r.x0 / step) - 1), a1 = Math.min(cols - 1, Math.ceil(r.x1 / step) + 1);
      const b0 = Math.max(0, Math.floor(r.y0 / step) - 1), b1 = Math.min(rows - 1, Math.ceil(r.y1 / step) + 1);
      for (let j = b0; j <= b1; j++) for (let i = a0; i <= a1; i++) { const k = j * cols + i; if (!glow.has(k) && base[k] > 0.004) dot(k, 0, 0, base[k], 1.2); }
      for (const [k, f] of glow) { const e = f * f; dot(k, ox[k], oy[k], base[k] + (0.55 - base[k]) * e, 1.2 + 0.7 * e); }
      ctx.restore(); ctx.globalAlpha = 1;
    }
    if (active.size) raf = requestAnimationFrame(tick);
  };

  const move = (e) => {
    const b = cv.getBoundingClientRect();
    const x = e.clientX - b.left, y = e.clientY - b.top, inside = x >= 0 && y >= 0 && x <= b.width && y <= b.height;
    if (!inside && px < -1e3) return;
    px = inside ? x : -1e4; py = inside ? y : -1e4;
    if (!raf) raf = requestAnimationFrame(tick);
  };
  const out = () => { px = py = -1e4; if (!raf) raf = requestAnimationFrame(tick); };
  let ro = 0;
  const obs = new ResizeObserver(() => { cancelAnimationFrame(ro); ro = requestAnimationFrame(layout); });

  layout();
  hero.classList.add("dots-cv");
  obs.observe(cv);
  document.addEventListener("pointermove", move, { passive: true });
  document.documentElement.addEventListener("pointerleave", out);
  return { move, stop() { cancelAnimationFrame(raf); cancelAnimationFrame(ro); obs.disconnect(); document.removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", out); hero.classList.remove("dots-cv"); cv.remove(); } };
}

export default function HeroDots() {
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let live = null;
    // The canvas is made only when the pointer first reaches the hero, so first paint stays pure CSS.
    const first = (e) => {
      const hero = e.target.closest?.(".hero2");
      if (!hero) return;
      document.removeEventListener("pointermove", first);
      live = mount(hero); live.move(e);
    };
    document.addEventListener("pointermove", first, { passive: true });
    return () => { document.removeEventListener("pointermove", first); live?.stop(); };
  }, []);
  return null;
}
