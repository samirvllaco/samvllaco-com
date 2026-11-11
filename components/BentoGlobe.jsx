"use client";
import { useEffect, useRef } from "react";
import DOTS from "../lib/globe-dots.json";
import LINES from "../lib/globe-lines.json";

// Wireframe globe that rises from the bottom of its card. It turns and stops on each client region.
const HOME = { lat: 41.3, lon: 19.8 };
const REGIONS = [
  { lat: 50, lon: 9, flag: "eu" },       // Europe
  { lat: 39, lon: -98, flag: "us" },     // USA
  { lat: 56, lon: -106, flag: "ca" },    // Canada
  { lat: 24, lon: 54, flag: "ae" },      // UAE
  { lat: -25, lon: 134, flag: "au" },    // Australia
];
const RAD = Math.PI / 180;
// [lat, lon, size, drift in degrees per second]
const CLOUDS = [[48, -140, .2, 1.2], [30, -60, .16, .9], [62, -30, .22, 1.4], [15, 20, .18, 1], [40, 80, .2, 1.3], [-10, -100, .17, .8], [-30, 60, .2, 1.1], [5, 140, .16, 1.2], [70, 120, .2, .9], [-45, -20, .22, 1], [25, -170, .15, 1.3], [55, 40, .14, 1.1]];

export default function BentoGlobe() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, on = false, lon = 0, lat = 20;
    const t0 = performance.now();
    const flags = {};
    ["eu", "us", "ca", "ae", "au", "al"].forEach((c) => { const im = new Image(); im.src = `/flags/${c}.svg`; im.onload = () => { flags[c] = im; if (!on || reduce) draw(performance.now()); }; });
    // A flag on a pin that stands off the surface, so it reads as 3D.
    function pin(la, lo, code, R, cx, cy, big, t, i) {
      const base = proj(la, lo, R, cx, cy);
      if (base.z <= 0.05) return;
      const tip = proj(la, lo, R * (big ? 1.2 : 1.13), cx, cy);
      const sc = (big ? 1.25 : 0.9) * (0.7 + 0.3 * base.z), fw = 30 * sc, fh = 21 * sc;
      ctx.globalAlpha = Math.min(1, base.z * 3);
      ctx.fillStyle = "rgba(0,0,0,.45)"; ctx.beginPath(); ctx.ellipse(base.x, base.y, 6 * sc, 2.6 * sc, 0, 0, 7); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.85)"; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(base.x, base.y); ctx.lineTo(tip.x, tip.y); ctx.stroke();
      const im = flags[code];
      const bob = Math.sin(t * 1.6 + i) * 1.2;
      const x = tip.x - fw / 2, y = tip.y - fh + bob;
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,.6)"; ctx.shadowBlur = 10 * sc; ctx.shadowOffsetY = 4 * sc;
      ctx.beginPath(); ctx.roundRect(x, y, fw, fh, 4 * sc); ctx.fillStyle = "#222"; ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.beginPath(); ctx.roundRect(x, y, fw, fh, 4 * sc); ctx.clip();
      if (im) ctx.drawImage(im, x, y, fw, fh);
      const g = ctx.createLinearGradient(x, y, x + fw, y + fh);
      g.addColorStop(0, "rgba(255,255,255,.38)"); g.addColorStop(0.45, "rgba(255,255,255,0)"); g.addColorStop(1, "rgba(0,0,0,.28)");
      ctx.fillStyle = g; ctx.fillRect(x, y, fw, fh);
      ctx.restore();
      ctx.strokeStyle = "rgba(255,255,255,.55)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.roundRect(x, y, fw, fh, 4 * sc); ctx.stroke();
      ctx.globalAlpha = 1;
    }

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

      const R = Math.min(w * 0.42, h * 0.62), cx = w / 2, cy = h * 0.3 + R;
      ctx.clearRect(0, 0, w, h);
      // soft white glow, then an icy blue ocean
      const halo = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.22);
      halo.addColorStop(0, "rgba(214,238,255,.55)"); halo.addColorStop(0.35, "rgba(150,205,255,.22)"); halo.addColorStop(1, "rgba(150,205,255,0)");
      ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, R * 1.22, 0, 7); ctx.fill();
      const ball = ctx.createRadialGradient(cx - R * 0.38, cy - R * 0.5, R * 0.05, cx, cy, R * 1.05);
      ball.addColorStop(0, "#d9f0ff"); ball.addColorStop(0.3, "#8ccbff"); ball.addColorStop(0.7, "#3f93ee"); ball.addColorStop(1, "#1b55b8");
      ctx.fillStyle = ball; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();

      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip();
      // land: soft white shapes. Points behind the globe are pushed to the rim so shapes close cleanly.
      ctx.fillStyle = "rgba(255,255,255,.82)"; ctx.strokeStyle = "rgba(255,255,255,.95)"; ctx.lineWidth = 1; ctx.lineJoin = "round";
      for (let i = 0; i < LINES.length; i++) {
        const ring = LINES[i], a0 = ring[0], b0 = ring[ring.length - 1];
        const closed = Math.abs(a0[0] - b0[0]) < 0.6 && Math.abs(a0[1] - b0[1]) < 0.6;
        if (!closed) continue;
        let any = false; ctx.beginPath();
        for (let j = 0; j < ring.length; j++) {
          const q = proj(ring[j][0], ring[j][1], R, cx, cy);
          let x = q.x, y = q.y;
          if (q.z > 0) any = true; else { const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy) || 1; x = cx + (dx / d) * R * 1.01; y = cy + (dy / d) * R * 1.01; }
          if (j) ctx.lineTo(x, y); else ctx.moveTo(x, y);
        }
        if (any) { ctx.closePath(); ctx.fill(); }
      }
      // continents: land points drawn large enough to merge into soft shapes
      ctx.fillStyle = "#f3f9ff";
      const dr = R * 0.021;
      ctx.beginPath();
      for (let i = 0; i < DOTS.length; i++) {
        const q = proj(DOTS[i][0], DOTS[i][1], R, cx, cy);
        if (q.z <= 0.03 || q.y > h + dr) continue;
        ctx.moveTo(q.x + dr, q.y); ctx.arc(q.x, q.y, dr, 0, 7);
      }
      ctx.fill();
      // soft drifting clouds
      for (let i = 0; i < CLOUDS.length; i++) {
        const c = CLOUDS[i], q = proj(c[0], c[1] + t * c[3], R, cx, cy);
        if (q.z <= 0.1) continue;
        const r = R * c[2] * (0.6 + 0.4 * q.z);
        const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, r);
        g.addColorStop(0, `rgba(255,255,255,${0.5 * q.z})`); g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(q.x, q.y, r * 1.5, r * 0.7, 0, 0, 7); ctx.fill();
      }
      // shade toward the far edge, and a white highlight
      const limb = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.3, R * 0.5, cx, cy, R);
      limb.addColorStop(0, "rgba(10,40,110,0)"); limb.addColorStop(1, "rgba(10,40,110,.5)");
      ctx.fillStyle = limb; ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
      const shine = ctx.createRadialGradient(cx - R * 0.42, cy - R * 0.55, 0, cx - R * 0.42, cy - R * 0.55, R * 0.7);
      shine.addColorStop(0, "rgba(255,255,255,.5)"); shine.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = shine; ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
      ctx.restore();
      ctx.strokeStyle = "rgba(255,255,255,.75)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();

      const hp = proj(HOME.lat, HOME.lon, R, cx, cy);
      REGIONS.forEach((r, i) => {
        const q = proj(r.lat, r.lon, R, cx, cy);
        if (q.z <= 0) return;
        const active = i === k, pulse = (t * 0.8 + i * 0.25) % 1;
        if (hp.z > 0) {
          const mx = (hp.x + q.x) / 2, my = (hp.y + q.y) / 2, dx = mx - cx, dy = my - cy;
          const lift = 1 + (Math.hypot(q.x - hp.x, q.y - hp.y) / R) * 0.4;
          ctx.strokeStyle = active ? "rgba(13,60,150,.95)" : "rgba(13,60,150,.35)"; ctx.lineWidth = active ? 2.4 : 1.2; ctx.lineCap = "round";
          ctx.setLineDash(active ? [1, 7] : []); ctx.lineDashOffset = -t * 14;
          ctx.beginPath(); ctx.moveTo(hp.x, hp.y); ctx.quadraticCurveTo(cx + dx * lift, cy + dy * lift, q.x, q.y); ctx.stroke(); ctx.setLineDash([]);
        }
        ctx.strokeStyle = `rgba(13,60,150,${(1 - pulse) * (active ? 0.8 : 0.35)})`; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(q.x, q.y, 5 + pulse * (active ? 22 : 12), 0, 7); ctx.stroke();
        ctx.fillStyle = "#0d3c96"; ctx.beginPath(); ctx.arc(q.x, q.y, active ? 5.5 : 3.5, 0, 7); ctx.fill();
      });
      if (hp.z > 0) { ctx.fillStyle = "#ff5a36"; ctx.beginPath(); ctx.arc(hp.x, hp.y, 4.5, 0, 7); ctx.fill(); }
      // flags, far ones first so near ones sit on top
      const pins = REGIONS.map((r, i) => ({ ...r, i, big: i === k })).concat([{ ...HOME, flag: "al", i: 9, big: false }]);
      pins.map((r) => ({ r, z: proj(r.lat, r.lon, R, cx, cy).z })).sort((a, b) => a.z - b.z).forEach(({ r }) => pin(r.lat, r.lon, r.flag, R, cx, cy, r.big, t, r.i));
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
