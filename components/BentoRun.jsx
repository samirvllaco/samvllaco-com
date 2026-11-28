"use client";
import { useEffect } from "react";
import { orbitAt, orbitTf } from "../lib/orbit";

// Motion for the home bento (owner, 28 Nov 2026: "bento grid like this with our context", after grafit.agency).
// 1) A dithered sphere: square pixels against a 4x4 Bayer matrix, lit from the top left, with bands that turn slowly.
//    The work's parts orbit it as chips; a chip behind the sphere is hidden by its solid disc, never faded, so its
//    words keep their contrast. 2) 576 dots, 573 of them lit, one per client, lighting up with the count.
// The section gets .is-in once in view (the gauge and the line draw in CSS). Loops run only after the first
// interaction (html.is-live) and while on screen; reduced motion keeps the end state.
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const CLIENTS = 573, COLS = 48, ROWS = 12;

export default function BentoRun({ at }) {
  useEffect(() => {
    const sec = at.current?.closest(".bx2");
    if (!sec) return;
    const html = document.documentElement;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const offs = [];

    // In view: the gauge and the line draw (CSS on .is-in).
    const seen = new IntersectionObserver(([e]) => { if (e.isIntersecting) { sec.classList.add("is-in"); seen.disconnect(); } }, { threshold: 0.2 });
    seen.observe(sec);
    offs.push(() => seen.disconnect());

    // Sphere and orbit.
    const stage = sec.querySelector(".bs-stage"), c = stage?.querySelector("canvas");
    if (stage && c) {
      const chips = [...stage.querySelectorAll(".bs-chip")];
      const ctx = c.getContext("2d");
      const L = [-0.55, -0.62, 0.56].map((x, _, v) => x / Math.hypot(...v));
      let size = 0, dpr = 1, cell = 4, rot = 0;
      const fit = () => { dpr = Math.min(2, window.devicePixelRatio || 1); size = c.clientWidth; cell = size < 200 ? 3 : 4; c.width = Math.round(size * dpr); c.height = Math.round(size * dpr); };
      const draw = () => {
        if (!size) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, size, size);
        const R = size / 2 - 1, n = Math.floor(size / cell), h = size / 2;
        ctx.fillStyle = "#0e0e10";
        ctx.beginPath(); ctx.arc(h, h, R, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#d9d9de";
        for (let j = 0; j < n; j++) {
          const ny = ((j + 0.5) * cell - h) / R;
          for (let i = 0; i < n; i++) {
            const nx = ((i + 0.5) * cell - h) / R, q = nx * nx + ny * ny;
            if (q >= 1) continue;
            const nz = Math.sqrt(1 - q);
            const lit = Math.max(0, nx * L[0] + ny * L[1] + nz * L[2]);
            const band = 0.5 + 0.5 * Math.sin((Math.atan2(nx, nz) + rot) * 4) * Math.cos(Math.asin(ny) * 3);
            const v = 0.05 + lit * (0.6 + 0.4 * band) + 0.2 * Math.pow(1 - nz, 3);
            if (v > BAYER[(j % 4) * 4 + (i % 4)]) ctx.fillRect(i * cell + 0.5, j * cell + 0.5, cell - 1, cell - 1);
            else if ((i + j) % 2 === 0) { ctx.fillStyle = "#2c2c31"; ctx.fillRect(i * cell + 1, j * cell + 1, cell - 2, cell - 2); ctx.fillStyle = "#d9d9de"; }
          }
        }
      };
      const place = (a) => chips.forEach((ch, i) => { const p = orbitAt(i, a); ch.style.transform = orbitTf(p); ch.classList.toggle("is-back", !p.front); });
      fit(); draw();
      const ro = new ResizeObserver(() => { fit(); draw(); });
      ro.observe(c);
      let raf = 0, on = false, live = html.classList.contains("is-live"), last = 0, ang = 0, prev = 0;
      const loop = (now) => {
        raf = requestAnimationFrame(loop);
        const dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0;
        prev = now; ang += dt * 0.16; rot += dt * 0.35;
        place(ang);
        if (now - last > 33) { last = now; draw(); }
      };
      const sync = () => {
        const go = on && live && !still;
        if (go && !raf) { prev = 0; raf = requestAnimationFrame(loop); }
        if (!go && raf) { cancelAnimationFrame(raf); raf = 0; }
      };
      const io = new IntersectionObserver(([e]) => { on = e.isIntersecting; sync(); }, { threshold: 0.05 });
      io.observe(stage);
      const mo = new MutationObserver(() => { if (html.classList.contains("is-live")) { live = true; mo.disconnect(); sync(); } });
      if (!live) mo.observe(html, { attributes: true, attributeFilter: ["class"] });
      offs.push(() => { cancelAnimationFrame(raf); io.disconnect(); mo.disconnect(); ro.disconnect(); });
    }

    // Client dots: lit in step with the count (CountUp's curve, 1.4s), once in view.
    const dc = sec.querySelector(".bd-dots");
    if (dc) {
      const ctx = dc.getContext("2d");
      let w = 0, hgt = 0, dpr = 1;
      const fit = () => { dpr = Math.min(2, window.devicePixelRatio || 1); w = dc.clientWidth; hgt = dc.clientHeight; dc.width = Math.round(w * dpr); dc.height = Math.round(hgt * dpr); };
      const paint = (k) => {
        if (!w) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, hgt);
        const sx = w / COLS, sy = hgt / ROWS, r = Math.min(sx, sy) * 0.3;
        for (let n = 0; n < COLS * ROWS; n++) {
          const x = (n % COLS + 0.5) * sx, y = (Math.floor(n / COLS) + 0.5) * sy;
          ctx.fillStyle = n < k ? "#62c1fd" : "rgba(255,255,255,.14)";
          ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
        }
      };
      let k = CLIENTS, raf = 0;
      fit(); paint(k);
      const ro = new ResizeObserver(() => { fit(); paint(k); });
      ro.observe(dc);
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting || still) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t) => { const q = Math.min(1, (t - t0) / 1400); k = q < 1 ? Math.round(CLIENTS * (1 - Math.pow(2, -10 * q))) : CLIENTS; paint(k); if (q < 1) raf = requestAnimationFrame(step); };
        raf = requestAnimationFrame(step);
      }, { threshold: 0.6 });
      io.observe(dc);
      offs.push(() => { io.disconnect(); ro.disconnect(); cancelAnimationFrame(raf); });
    }
    return () => offs.forEach((f) => f());
  }, [at]);
  return null;
}
