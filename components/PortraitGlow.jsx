"use client";
import { useEffect, useRef } from "react";

// About portrait on load (owner, 28 Nov 2026, after launch.joinautopilot.com: "add this animation on the profile on
// load, the glitch encapsulating the profile"): when the portrait first comes into view (after the intro), the photo
// glitches for a moment, slices jumping sideways with a cyan and an orange copy, then a stepped, pixelated ring of
// light with colour fringes opens round the photo and dies away. Once per visit of the page; reduced motion skips it.
const PAD = 140, CELL = 6, DUR = 2100, GLITCH = 460;
const ease = (t) => 1 - Math.pow(1 - t, 3);

export default function PortraitGlow({ img }) {
  const cv = useRef(null);
  useEffect(() => {
    const c = cv.current, fig = c && c.parentElement;
    if (!c || !fig || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, done = false, t0 = 0, slices = [], lastCut = 0;
    const W = () => fig.clientWidth, H = () => fig.clientHeight;
    const play = () => {
      if (done) return;
      const ph = img.current;
      if (ph && !ph.complete) { ph.addEventListener("load", play, { once: true }); return; }
      done = true;
      const w = W(), h = H(), CW = w + PAD * 2, CH = h + PAD * 2, dpr = Math.min(2, devicePixelRatio || 1);
      c.width = Math.round(CW * dpr); c.height = Math.round(CH * dpr);
      const g = c.getContext("2d");
      const bw = Math.ceil(CW / CELL), bh = Math.ceil(CH / CELL);
      const buf = document.createElement("canvas"); buf.width = bw; buf.height = bh;
      const bg = buf.getContext("2d"), data = bg.createImageData(bw, bh), px = data.data;
      // Signed distance (in cells) from each cell to the photo's rounded edge: below 0 inside, above 0 outside.
      const x0 = PAD / CELL, y0 = PAD / CELL, rw = w / CELL / 2, rh = h / CELL / 2, cx = x0 + rw, cy = y0 + rh, rr = 8 / CELL;
      const sd = new Float32Array(bw * bh);
      for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++) {
        const qx = Math.abs(x + 0.5 - cx) - (rw - rr), qy = Math.abs(y + 0.5 - cy) - (rh - rr);
        sd[y * bw + x] = Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - rr;
      }
      const photo = img.current;
      const frame = (now) => {
        if (!t0) t0 = now;
        const ms = now - t0, t = Math.min(1, ms / DUR);
        g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, CW, CH);
        // 1) the glitch: bands of the photo shifted sideways, with a cyan and an orange copy
        if (ms < GLITCH && photo && photo.complete) {
          if (now - lastCut > 55) {
            lastCut = now;
            slices = Array.from({ length: 5 }, () => { const sy = Math.random() * h, sh = 4 + Math.random() * h * 0.14; return [sy, sh, (Math.random() - 0.5) * 90]; });
          }
          const nw = photo.naturalWidth, k = nw / w;
          g.save(); g.beginPath(); g.rect(PAD - 60, PAD, w + 120, h); g.clip();
          for (const [sy, sh, dx] of slices) {
            g.globalCompositeOperation = "source-over"; g.globalAlpha = 1;
            g.drawImage(photo, 0, sy * k, nw, sh * k, PAD + dx, PAD + sy, w, sh);
            g.globalCompositeOperation = "screen"; g.globalAlpha = 0.5;
            g.fillStyle = "rgb(0, 200, 255)"; g.fillRect(PAD + dx - 10, PAD + sy, w, Math.max(2, sh * 0.2));
            g.fillStyle = "rgb(255, 120, 30)"; g.fillRect(PAD + dx + 10, PAD + sy + sh * 0.8, w, Math.max(2, sh * 0.2));
          }
          g.globalCompositeOperation = "source-over"; g.globalAlpha = 0.9; g.fillStyle = "#ffffff";
          for (let n = 0; n < 2; n++) g.fillRect(PAD - 20 + Math.random() * 40, PAD + Math.random() * h, w * (0.4 + Math.random() * 0.6), 2);
          g.globalAlpha = 1;
          g.restore(); g.globalCompositeOperation = "source-over";
        }
        // 2) the pixel ring: travels out from the edge, thick and bright, then fades; stepped in 5 levels
        const tr = Math.max(0, (ms - GLITCH * 0.5) / (DUR - GLITCH * 0.5));
        if (tr > 0) {
          const e = ease(tr), s = e * 15, thick = 3 + e * 6, fade = Math.pow(1 - tr, 1.1), bloom = Math.max(0, 1.25 - tr * 2.4);
          for (let i = 0; i < sd.length; i++) {
            const d = sd[i];
            if (d < -3) { px[i * 4 + 3] = 0; continue; }
            const lv = (o) => { const v = Math.max(0, 1 - Math.abs(d - s - o) / thick) * fade + Math.max(0, Math.exp(-Math.abs(d) / 1.6)) * bloom * 0.9; return Math.min(1, Math.floor(v * 5) / 5); };
            const r = lv(1.1), gr = lv(0), b = lv(-1.1), a = Math.max(r, gr, b);
            px[i * 4] = 255 * Math.max(r, gr * 0.9); px[i * 4 + 1] = 255 * Math.max(gr, Math.min(r, b) * 0.8) * 0.96; px[i * 4 + 2] = 255 * Math.max(b, gr);
            px[i * 4 + 3] = 255 * Math.min(1, a * 1.1);
          }
          bg.putImageData(data, 0, 0);
          g.imageSmoothingEnabled = false;
          g.drawImage(buf, 0, 0, bw * CELL, bh * CELL);
        }
        if (t < 1) raf = requestAnimationFrame(frame);
        else { g.clearRect(0, 0, CW, CH); c.width = 0; c.height = 0; }
      };
      raf = requestAnimationFrame(frame);
    };
    // After the intro (no-intro on <html>, or no intro at all), once the photo is well in view.
    let poll = 0;
    const ready = () => document.documentElement.classList.contains("no-intro") || !document.querySelector(".intro");
    const io = new IntersectionObserver((en) => {
      if (!en[0].isIntersecting) return;
      io.disconnect();
      let n = 0;
      const wait = () => { if (ready() || n++ > 40) { setTimeout(play, 150); return; } poll = setTimeout(wait, 100); };
      wait();
    }, { threshold: 0.5 });
    io.observe(fig);
    return () => { io.disconnect(); clearTimeout(poll); cancelAnimationFrame(raf); };
  }, [img]);
  return <canvas ref={cv} className="ap-fx" aria-hidden="true" />;
}
