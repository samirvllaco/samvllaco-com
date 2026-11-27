"use client";
import { useEffect, useRef } from "react";

// About portrait (owner, 27 Nov 2026: a front-facing photo, "mix of 1 and 3": a spec lens and ASCII on hover).
// The cursor is a round lens: inside it the photo turns into ASCII made of design words, with a designer's redline
// on top (grid, centre axis, eye line, the pupils measured in image pixels). Outside the lens, the layer under the
// cursor gets a blue outline and its name, like hovering a layer in Figma. Phones get one scan when the photo comes
// into view, and a tap runs it again. Nothing loads or draws until the first hover or the first scan.
const WORDS = "FIGMA 4PT GRID 44PX SPACING TYPE CONTRAST FLOW PROTOTYPE HANDOFF UX UI ";
const SRC = 1254;
// Layers in image percent: [name, x0, y0, x1, y1], first match wins.
const LAYERS = [
  ["eyes", 36, 34, 64, 43], ["nose", 45, 41, 56, 51], ["smile", 40, 53, 60, 61], ["ear", 26.5, 35, 33, 50], ["ear", 66.5, 35, 71.5, 50],
  ["hair", 28, 5, 72, 26], ["beard", 32, 49, 68, 74], ["tee", 0, 69, 100, 100], ["head", 26, 4, 73, 74],
];
const EYE_Y = 39.5, PUP_L = 42.3, PUP_R = 59.4;

export default function AboutPortrait() {
  const box = useRef(null), cv = useRef(null), img = useRef(null);
  useEffect(() => {
    const el = box.current, c = cv.current, im = img.current;
    if (!el || !c || !im) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, dpr = 1, ascii = null, spec = null, raf = 0;
    let mx = -1, my = -1, r = 0, want = 0, scan = -1, scanT = 0;

    function build() {
      const rc = el.getBoundingClientRect();
      W = Math.round(rc.width); H = Math.round(rc.height); dpr = Math.min(2, devicePixelRatio || 1);
      c.width = W * dpr; c.height = H * dpr;
      const cell = 8, cols = Math.floor(W / cell), rows = Math.floor(H / cell);
      const s = document.createElement("canvas"); s.width = cols; s.height = rows;
      const sx = s.getContext("2d", { willReadFrequently: true }); sx.drawImage(im, 0, 0, cols, rows);
      const px = sx.getImageData(0, 0, cols, rows).data;
      ascii = document.createElement("canvas"); ascii.width = W * dpr; ascii.height = H * dpr;
      const a = ascii.getContext("2d"); a.scale(dpr, dpr);
      a.fillStyle = "#0b0b0d"; a.fillRect(0, 0, W, H);
      a.font = `600 ${cell + 1}px ui-monospace, SFMono-Regular, Menlo, monospace`; a.textBaseline = "top";
      let k = 0;
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4, l = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
        const ch = WORDS[k++ % WORDS.length];
        if (l < 0.15 || ch === " ") continue;
        const v = Math.pow((l - 0.15) / 0.85, 0.75);
        a.fillStyle = `rgba(${Math.round(120 + 130 * v)}, ${Math.round(190 + 60 * v)}, 255, ${Math.min(1, 0.18 + 1.1 * v)})`;
        a.fillText(ch, x * cell, y * cell);
      }
      spec = document.createElement("canvas"); spec.width = W * dpr; spec.height = H * dpr;
      const g = spec.getContext("2d"); g.scale(dpr, dpr);
      g.strokeStyle = "rgba(98, 193, 253, .1)"; g.lineWidth = 1;
      for (let x = 0.5; x < W; x += 16) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
      for (let y = 0.5; y < H; y += 16) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
      g.setLineDash([4, 4]); g.strokeStyle = "rgba(98, 193, 253, .8)";
      g.beginPath(); g.moveTo(W / 2, 0); g.lineTo(W / 2, H); g.stroke();
      const ey = H * EYE_Y / 100; g.beginPath(); g.moveTo(0, ey); g.lineTo(W, ey); g.stroke();
      g.setLineDash([]);
      const pl = W * PUP_L / 100, pr = W * PUP_R / 100, my2 = ey - 26;
      g.strokeStyle = "#ff5c8a"; g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(pl, my2); g.lineTo(pr, my2); g.moveTo(pl, my2 - 5); g.lineTo(pl, my2 + 5); g.moveTo(pr, my2 - 5); g.lineTo(pr, my2 + 5); g.stroke();
      for (const p of [pl, pr]) { g.beginPath(); g.arc(p, ey, 6, 0, Math.PI * 2); g.stroke(); }
      pill(g, (pl + pr) / 2, my2 - 14, `${Math.round((PUP_R - PUP_L) / 100 * SRC)} px`, "#ff5c8a", "#ffffff", true);
      pill(g, 12, ey - 22, "eye line", "rgba(98, 193, 253, .9)", "#06121c", false);
      pill(g, W / 2 + 8, 12, "axis", "rgba(98, 193, 253, .9)", "#06121c", false);
    }
    function pill(g, x, y, t, bg, fg, center) {
      g.font = "600 11px Inter, system-ui, sans-serif"; const w = Math.ceil(g.measureText(t).width) + 12;
      const x0 = center ? x - w / 2 : x; g.fillStyle = bg; g.beginPath(); g.roundRect(x0, y, w, 18, 4); g.fill();
      g.fillStyle = fg; g.textBaseline = "middle"; g.fillText(t, x0 + 6, y + 9.5); g.textBaseline = "top";
    }
    function layerAt(x, y) {
      const X = x / W * 100, Y = y / H * 100;
      for (const L of LAYERS) if (X >= L[1] && X <= L[3] && Y >= L[2] && Y <= L[4]) return L;
      return null;
    }
    function draw() {
      raf = 0;
      const g = c.getContext("2d");
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
      if (scan >= 0) {
        const t = Math.min(1, (performance.now() - scanT) / 1700), band = H * 0.24, y = -band + t * (H + band);
        g.save(); g.beginPath(); g.rect(0, y, W, band); g.clip();
        g.drawImage(ascii, 0, 0, W, H); g.drawImage(spec, 0, 0, W, H); g.restore();
        g.fillStyle = "rgba(98, 193, 253, .9)"; g.fillRect(0, y + band - 1.5, W, 1.5);
        if (t < 1) raf = requestAnimationFrame(draw); else scan = -1;
        return;
      }
      r += (want - r) * (reduce ? 1 : 0.22);
      if (mx >= 0 && r > 0.5) {
        const L = layerAt(mx, my);
        if (L) {
          const x0 = W * L[1] / 100, y0 = H * L[2] / 100, x1 = W * L[3] / 100, y1 = H * L[4] / 100;
          g.strokeStyle = "#62c1fd"; g.lineWidth = 1.5; g.strokeRect(x0 + .75, y0 + .75, x1 - x0 - 1.5, y1 - y0 - 1.5);
          pill(g, x0, Math.max(4, y0 - 22), L[0], "#2f6bff", "#ffffff", false);
        }
        g.save(); g.beginPath(); g.arc(mx, my, r, 0, Math.PI * 2); g.clip();
        g.drawImage(ascii, 0, 0, W, H); g.drawImage(spec, 0, 0, W, H); g.restore();
        g.beginPath(); g.arc(mx, my, r, 0, Math.PI * 2); g.strokeStyle = "rgba(98, 193, 253, .95)"; g.lineWidth = 1.5; g.stroke();
        const ix = Math.round(mx / W * SRC), iy = Math.round(my / H * SRC);
        pill(g, mx + r * 0.72, my + r * 0.72, `X ${ix}  Y ${iy}`, "rgba(17, 17, 18, .88)", "#f5f5f7", false);
      }
      if (Math.abs(want - r) > 0.5) raf = requestAnimationFrame(draw);
    }
    const ready = () => { if (!ascii && im.complete && im.naturalWidth) build(); return Boolean(ascii); };
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const move = (e) => { if (e.pointerType === "touch" || !ready()) return; const rc = el.getBoundingClientRect(); mx = e.clientX - rc.left; my = e.clientY - rc.top; want = Math.min(96, W * 0.22); kick(); };
    const leave = () => { want = 0; kick(); };
    const runScan = () => { if (reduce || !ready()) return; scan = 0; scanT = performance.now(); kick(); };
    const onResize = () => { if (ascii) { ascii = null; ready(); kick(); } };
    el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave);
    el.addEventListener("click", (e) => { if (e.pointerType !== "mouse") runScan(); });
    addEventListener("resize", onResize);
    let io = null;
    if (matchMedia("(hover: none)").matches) {
      io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { io.disconnect(); setTimeout(runScan, 300); } }, { threshold: 0.6 });
      io.observe(el);
    }
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); removeEventListener("resize", onResize); if (io) io.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  return (
    <figure className="ap" ref={box}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={img} src="/me/sam-front-840.webp?v=1" srcSet="/me/sam-front-480.webp?v=1 480w, /me/sam-front-840.webp?v=1 840w, /me/sam-front-1254.webp?v=1 1254w" sizes="(max-width: 860px) 100vw, 440px" width="1254" height="1254" alt="Sam Vllaco, front facing, in a black t-shirt" fetchPriority="high" decoding="async" />
      <canvas ref={cv} className="ap-cv" aria-hidden="true" />
      <figcaption className="ap-hint" aria-hidden="true"><span className="ap-fine">Hover to look inside</span><span className="ap-touch">Tap to scan</span></figcaption>
    </figure>
  );
}
