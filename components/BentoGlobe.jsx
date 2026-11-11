"use client";
import { useEffect, useRef } from "react";
import DOTS from "../lib/globe-dots.json";

// Dotted globe for the bento grid. It turns slowly and stops on each client region in turn.
const HOME = { lat: 41.3, lon: 19.8 };
const REGIONS = [
  { name: "Europe", lat: 50, lon: 9 },
  { name: "USA", lat: 39, lon: -98 },
  { name: "Canada", lat: 56, lon: -106 },
  { name: "Australia", lat: -25, lon: 134 },
];
const RAD = Math.PI / 180;

export default function BentoGlobe() {
  const ref = useRef(null);
  const label = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, on = false, t0 = performance.now();
    let lon = REGIONS[0].lon, lat = 18;

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
    function draw(now) {
      const t = (now - t0) / 1000;
      const seg = 4.2, k = Math.floor(t / seg) % REGIONS.length, f = (t % seg) / seg;
      const cur = REGIONS[k], nxt = REGIONS[(k + 1) % REGIONS.length];
      // hold on a region, then ease to the next one
      const m = f < 0.62 ? 0 : (f - 0.62) / 0.38, e = m * m * (3 - 2 * m);
      let dl = ((nxt.lon - cur.lon + 540) % 360) - 180;
      lon = cur.lon + dl * e - 12;
      lat = cur.lat * 0.45 + (nxt.lat - cur.lat) * 0.45 * e + 6;
      if (label.current && label.current.textContent !== cur.name) label.current.textContent = cur.name;

      const R = Math.min(w * 0.5, h * 0.66), cx = w * 0.6, cy = h * 0.66;
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createRadialGradient(cx - R * 0.4, cy - R * 0.5, R * 0.1, cx, cy, R);
      g.addColorStop(0, "rgba(255,255,255,.10)"); g.addColorStop(1, "rgba(255,255,255,.015)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.28)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();

      ctx.fillStyle = "#fff";
      const dr = Math.max(0.8, R / 230);
      for (let i = 0; i < DOTS.length; i++) {
        const q = proj(DOTS[i][0], DOTS[i][1], R, cx, cy);
        if (q.z <= 0.02) continue;
        ctx.globalAlpha = 0.16 + 0.7 * q.z;
        ctx.beginPath(); ctx.arc(q.x, q.y, dr, 0, 7); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // arcs from home to each region, then the pins
      const hp = proj(HOME.lat, HOME.lon, R, cx, cy);
      REGIONS.forEach((r, i) => {
        const q = proj(r.lat, r.lon, R, cx, cy);
        const active = i === k;
        if (hp.z > 0 && q.z > 0) {
          const mx = (hp.x + q.x) / 2, my = (hp.y + q.y) / 2, dx = mx - cx, dy = my - cy, d = Math.hypot(dx, dy) || 1;
          const lift = 1 + Math.hypot(q.x - hp.x, q.y - hp.y) / R * 0.35;
          const qx = cx + dx * lift + (dx / d) * 6, qy = cy + dy * lift + (dy / d) * 6;
          ctx.strokeStyle = active ? "rgba(98,193,253,.95)" : "rgba(98,193,253,.3)";
          ctx.lineWidth = active ? 1.6 : 1;
          ctx.setLineDash([4, 5]); ctx.lineDashOffset = -t * 18;
          ctx.beginPath(); ctx.moveTo(hp.x, hp.y); ctx.quadraticCurveTo(qx, qy, q.x, q.y); ctx.stroke();
          ctx.setLineDash([]);
        }
        if (q.z > 0) {
          const pulse = (t * 0.9 + i * 0.25) % 1;
          ctx.strokeStyle = `rgba(98,193,253,${(1 - pulse) * (active ? 0.9 : 0.45)})`;
          ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(q.x, q.y, 5 + pulse * (active ? 22 : 12), 0, 7); ctx.stroke();
          ctx.fillStyle = active ? "#62c1fd" : "#cfe9fb"; ctx.beginPath(); ctx.arc(q.x, q.y, active ? 6 : 4, 0, 7); ctx.fill();
          ctx.strokeStyle = "#0b0b0f"; ctx.lineWidth = 2; ctx.stroke();
        }
      });
      if (hp.z > 0) { ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(hp.x, hp.y, 4, 0, 7); ctx.fill(); }
      if (on && !reduce) raf = requestAnimationFrame(draw);
    }
    size(); draw(performance.now());
    const ro = new ResizeObserver(() => { size(); draw(performance.now()); });
    ro.observe(cv);
    const io = new IntersectionObserver(([en]) => {
      on = en.isIntersecting;
      cancelAnimationFrame(raf);
      if (on && !reduce) raf = requestAnimationFrame(draw);
    });
    io.observe(cv);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);
  return (
    <div className="bg-globe" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  );
}
