"use client";
import { useEffect, useRef } from "react";
import DOTS from "../lib/globe-dots.json";
import LINES from "../lib/globe-lines.json";

// Wireframe globe that rises from the bottom of its card. It turns and stops on each client region.
const HOME = { lat: 41.3, lon: 19.8 };
const REGIONS = [
  { lat: 50, lon: 9 },      // Europe
  { lat: 39, lon: -98 },    // USA
  { lat: 56, lon: -106 },   // Canada
  { lat: -25, lon: 134 },   // Australia
];
const RAD = Math.PI / 180;

export default function BentoGlobe() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, on = false, lon = 0, lat = 20;
    const t0 = performance.now();

    function size() {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function proj(la, lo, R, cx, cy) {
      const p = la * RAD, l = (lo - lon) * RAD, c0 = lat * RAD;
      const x = Math.cos(p) * Math.sin(l);
      const y = Math.sin(p) * Math.cos(c0) - Math.cos(p) * Math.cos(l) * Math.sin(c0);
      const z = Math.sin(p) * Math.sin(c0) + Math.cos(p) * Math.cos(l) * Math.cos(c0);
      return { x: cx + x * R, y: cy - y * R, z };
    }
    function path(pts, R, cx, cy) {
      let pen = false;
      ctx.beginPath();
      for (let j = 0; j < pts.length; j++) {
        const q = proj(pts[j][0], pts[j][1], R, cx, cy);
        if (q.z > 0) { if (pen) ctx.lineTo(q.x, q.y); else { ctx.moveTo(q.x, q.y); pen = true; } } else pen = false;
      }
      ctx.stroke();
    }
    function draw(now) {
      const t = (now - t0) / 1000;
      const seg = 4.5, k = Math.floor(t / seg) % REGIONS.length, f = (t % seg) / seg;
      const cur = REGIONS[k], nxt = REGIONS[(k + 1) % REGIONS.length];
      const m = f < 0.6 ? 0 : (f - 0.6) / 0.4, e = m * m * (3 - 2 * m);
      const dl = ((nxt.lon - cur.lon + 540) % 360) - 180;
      lon = cur.lon + dl * e;
      lat = 34 + (cur.lat + (nxt.lat - cur.lat) * e) * 0.35;

      const R = Math.min(w * 0.46, h * 0.95), cx = w / 2, cy = h * 0.28 + R;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#000"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();

      // graticule
      ctx.strokeStyle = "rgba(255,255,255,.16)"; ctx.lineWidth = 1;
      for (let lo = -180; lo < 180; lo += 30) { const pts = []; for (let la = -90; la <= 90; la += 5) pts.push([la, lo]); path(pts, R, cx, cy); }
      for (let la = -60; la <= 60; la += 30) { const pts = []; for (let lo = -180; lo <= 180; lo += 5) pts.push([la, lo]); path(pts, R, cx, cy); }

      ctx.fillStyle = "#fff";
      for (let i = 0; i < DOTS.length; i++) {
        const q = proj(DOTS[i][0], DOTS[i][1], R, cx, cy);
        if (q.z <= 0.02 || q.y > h + 2) continue;
        ctx.globalAlpha = 0.1 + 0.4 * q.z;
        ctx.fillRect(q.x - 0.7, q.y - 0.7, 1.4, 1.4);
      }
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "rgba(255,255,255,.92)"; ctx.lineWidth = 1.1;
      for (let i = 0; i < LINES.length; i++) path(LINES[i], R, cx, cy);
      ctx.strokeStyle = "rgba(255,255,255,.5)"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();

      const hp = proj(HOME.lat, HOME.lon, R, cx, cy);
      REGIONS.forEach((r, i) => {
        const q = proj(r.lat, r.lon, R, cx, cy);
        if (q.z <= 0) return;
        const active = i === k, pulse = (t * 0.8 + i * 0.25) % 1;
        if (hp.z > 0) {
          const mx = (hp.x + q.x) / 2, my = (hp.y + q.y) / 2, dx = mx - cx, dy = my - cy;
          const lift = 1 + (Math.hypot(q.x - hp.x, q.y - hp.y) / R) * 0.4;
          ctx.strokeStyle = active ? "rgba(98,193,253,.95)" : "rgba(98,193,253,.35)"; ctx.lineWidth = active ? 1.6 : 1;
          ctx.setLineDash([4, 5]); ctx.lineDashOffset = -t * 18;
          ctx.beginPath(); ctx.moveTo(hp.x, hp.y); ctx.quadraticCurveTo(cx + dx * lift, cy + dy * lift, q.x, q.y); ctx.stroke(); ctx.setLineDash([]);
        }
        ctx.strokeStyle = `rgba(98,193,253,${(1 - pulse) * (active ? 0.9 : 0.4)})`; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(q.x, q.y, 5 + pulse * (active ? 22 : 12), 0, 7); ctx.stroke();
        ctx.fillStyle = "#62c1fd"; ctx.beginPath(); ctx.arc(q.x, q.y, active ? 5.5 : 3.5, 0, 7); ctx.fill();
      });
      if (hp.z > 0) { ctx.fillStyle = "#ff5a36"; ctx.beginPath(); ctx.arc(hp.x, hp.y, 4.5, 0, 7); ctx.fill(); }
      if (on && !reduce) raf = requestAnimationFrame(draw);
    }
    size(); draw(performance.now());
    const ro = new ResizeObserver(() => { size(); draw(performance.now()); });
    ro.observe(cv);
    const io = new IntersectionObserver(([en]) => { on = en.isIntersecting; cancelAnimationFrame(raf); if (on && !reduce) raf = requestAnimationFrame(draw); });
    io.observe(cv);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);
  return <canvas ref={ref} className="bx-globe" aria-hidden="true" />;
}
