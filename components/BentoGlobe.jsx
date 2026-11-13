"use client";
import { useEffect, useRef } from "react";
import { geoOrthographic, geoEquirectangular, geoPath, geoInterpolate, geoDistance } from "d3-geo";
import WORLD from "../lib/world.json";

// Dark globe with land drawn as a field of dots (same look as the reviews card), centred on Tirana, where Sam's photo sits.
// Client countries are tinted blue, with thin routes from Tirana and a flag pin on each. It can be dragged or swiped.
const HOME = { lat: 41.3, lon: 19.8, flag: "al" };
const REGIONS = [
  { lat: 50, lon: 9, flag: "eu" },
  { lat: 39, lon: -98, flag: "us", id: "840" },
  { lat: 56, lon: -106, flag: "ca", id: "124" },
  { lat: 24, lon: 54, flag: "ae", id: "784" },
  { lat: -25, lon: 134, flag: "au", id: "036" },
];
const GOLD_IDS = new Set(REGIONS.map((r) => r.id).filter(Boolean));
const GOLD = WORLD.land.features.filter((f) => GOLD_IDS.has(f.id));
const SPHERE = { type: "Sphere" };

export default function BentoGlobe() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const proj = geoOrthographic().clipAngle(90).precision(0.8);
    const path = geoPath(proj, ctx);
    let w = 0, h = 0, raf = 0, on = false, R = 100, small = false;
    let rot = [-HOME.lon, -(HOME.lat - 36)], target = 0, lastAuto = performance.now(), held = null, idleAt = 0;
    const flags = {};
    ["eu", "us", "ca", "ae", "au"].forEach((c) => { const im = new Image(); im.src = `/flags/${c}.svg`; im.onload = () => { flags[c] = im; }; });
    let face = null; { const im = new Image(); im.src = "/sam-144.webp"; im.onload = () => { face = im; }; }

    // Land as dots: paint land (red) and client countries (blue) onto a small flat map once,
    // then keep the grid points that fall on land. Each frame only projects those points.
    const DOTS = [];
    {
      const MW = 720, MH = 360, m = document.createElement("canvas");
      m.width = MW; m.height = MH;
      const mx = m.getContext("2d", { willReadFrequently: true });
      const flat = geoPath(geoEquirectangular().scale(MW / (2 * Math.PI)).translate([MW / 2, MH / 2]), mx);
      mx.fillStyle = "#f00"; mx.beginPath(); flat(WORLD.land); mx.fill();
      mx.fillStyle = "#00f"; mx.beginPath(); GOLD.forEach((f) => flat(f)); mx.fill();
      const px = mx.getImageData(0, 0, MW, MH).data;
      const STEP = 1.7;
      for (let lat = -58; lat <= 82; lat += STEP) {
        const n = Math.max(1, Math.round((360 * Math.cos((lat * Math.PI) / 180)) / STEP));
        for (let k = 0; k < n; k++) {
          const lon = -180 + (k + 0.5) * (360 / n);
          const o = (Math.min(MH - 1, Math.floor(((90 - lat) / 180) * MH)) * MW + Math.min(MW - 1, Math.floor(((lon + 180) / 360) * MW))) * 4;
          if (px[o + 3] > 120) DOTS.push([lon, lat, px[o + 2] > px[o]]);
        }
      }
    }

    function size() {
      const r = cv.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height; cv.width = Math.round(w * d); cv.height = Math.round(h * d); ctx.setTransform(d, 0, 0, d, 0, 0);
      small = w < 480; R = small ? w * 0.6 : Math.min(w * 0.46, h * 0.5);
      proj.scale(R).translate([w / 2, h * (small ? 0.8 : 0.86)]);
    }
    const visible = (lon, lat) => geoDistance([lon, lat], [-rot[0], -rot[1]]) < Math.PI / 2 - 0.05;
    function pin(r, big, t) {
      if (!visible(r.lon, r.lat)) return;
      const [bx, by] = proj([r.lon, r.lat]);
      const cx = w / 2, cy = h * (small ? 0.84 : 0.95), dx = bx - cx, dy = by - cy, k = big ? 0.2 : 0.13;
      const tx = bx + dx * k, ty = by + dy * k - (big ? 16 : 10);
      const fw = big ? 40 : 28, fh = fw * 0.72, bob = Math.sin(t * 1.6 + r.lon) * 1.2;
      ctx.strokeStyle = "rgba(255,255,255,.9)"; ctx.lineWidth = 2; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(tx, ty + bob); ctx.stroke();
      ctx.fillStyle = "#62c1fd"; ctx.beginPath(); ctx.arc(bx, by, big ? 5 : 3.5, 0, 7); ctx.fill();
      const x = tx - fw / 2, y = ty - fh + bob;
      ctx.save(); ctx.shadowColor = "rgba(0,0,0,.6)"; ctx.shadowBlur = 12; ctx.shadowOffsetY = 5;
      ctx.beginPath(); ctx.roundRect(x - 2, y - 2, fw + 4, fh + 4, 7); ctx.fillStyle = "#fff"; ctx.fill(); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, fw, fh, 5); ctx.clip();
      if (flags[r.flag]) ctx.drawImage(flags[r.flag], x, y, fw, fh);
      const g = ctx.createLinearGradient(x, y, x + fw, y + fh);
      g.addColorStop(0, "rgba(255,255,255,.35)"); g.addColorStop(0.5, "rgba(255,255,255,0)"); g.addColorStop(1, "rgba(0,0,0,.25)");
      ctx.fillStyle = g; ctx.fillRect(x, y, fw, fh); ctx.restore();
    }
    // Sam's photo marks Tirana: a pulsing ring, the avatar with a white edge and an online dot, and a label.
    function me(t) {
      if (!visible(HOME.lon, HOME.lat)) return;
      const [x, y] = proj([HOME.lon, HOME.lat]);
      const r = small ? 17 : 20, p = (t * 0.5) % 1;
      ctx.strokeStyle = `rgba(98,193,253,${0.7 * (1 - p)})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r + 4 + p * 22, 0, 7); ctx.stroke();
      ctx.save(); ctx.shadowColor = "rgba(0,0,0,.55)"; ctx.shadowBlur = 14; ctx.shadowOffsetY = 5;
      ctx.beginPath(); ctx.arc(x, y, r + 3, 0, 7); ctx.fillStyle = "#fff"; ctx.fill(); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip();
      if (face) ctx.drawImage(face, x - r, y - r, r * 2, r * 2); else { ctx.fillStyle = "#62c1fd"; ctx.fillRect(x - r, y - r, r * 2, r * 2); }
      ctx.restore();
      ctx.beginPath(); ctx.arc(x + r * 0.72, y + r * 0.72, 6, 0, 7); ctx.fillStyle = "#fff"; ctx.fill();
      ctx.beginPath(); ctx.arc(x + r * 0.72, y + r * 0.72, 4, 0, 7); ctx.fillStyle = "#34c759"; ctx.fill();
      const label = "Sam, Tirana"; ctx.font = "600 12px ui-sans-serif, system-ui, -apple-system, sans-serif";
      const tw = ctx.measureText(label).width, lx = x - tw / 2 - 9, ly = y + r + 10;
      ctx.beginPath(); ctx.roundRect(lx, ly, tw + 18, 24, 12); ctx.fillStyle = "rgba(20,20,22,.82)"; ctx.fill();
      ctx.fillStyle = "#fff"; ctx.textBaseline = "middle"; ctx.fillText(label, lx + 9, ly + 12.5);
    }
    function draw(now) {
      const t = now / 1000;
      if (!held && now > idleAt && !reduce) {
        if (now - lastAuto > 4200) { target = (target + 1) % REGIONS.length; lastAuto = now; }
        const g = REGIONS[target];
        const lean = Math.max(-16, Math.min(16, ((((g.lon - HOME.lon) + 540) % 360) - 180) * 0.14));
        const want = [-(HOME.lon + lean), -(HOME.lat - 36)];
        let d0 = ((want[0] - rot[0] + 540) % 360) - 180;
        rot = [rot[0] + d0 * 0.03, rot[1] + (want[1] - rot[1]) * 0.03];
      }
      proj.rotate(rot);
      const cx = w / 2, cy = h * (small ? 0.8 : 0.86);
      ctx.clearRect(0, 0, w, h);
      const halo = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.25);
      halo.addColorStop(0, "rgba(255,255,255,.1)"); halo.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, R * 1.25, 0, 7); ctx.fill();
      const ball = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.45, R * 0.05, cx, cy, R);
      ball.addColorStop(0, "#262628"); ball.addColorStop(0.7, "#18181a"); ball.addColorStop(1, "#101012");
      ctx.beginPath(); path(SPHERE); ctx.fillStyle = ball; ctx.fill();
      // land as dots, client countries in blue
      {
        const c = [-rot[0], -rot[1]], dr = Math.max(1, R * 0.0078);
        ctx.fillStyle = "rgba(255,255,255,.5)"; ctx.beginPath();
        const blue = [];
        for (const d of DOTS) {
          if (geoDistance(d, c) > 1.5) continue;
          const q = proj(d);
          if (!q) continue;
          if (d[2]) { blue.push(q); continue; }
          ctx.moveTo(q[0] + dr, q[1]); ctx.arc(q[0], q[1], dr, 0, 6.3);
        }
        ctx.fill();
        ctx.fillStyle = "rgba(98,193,253,.95)"; ctx.beginPath();
        for (const q of blue) { ctx.moveTo(q[0] + dr, q[1]); ctx.arc(q[0], q[1], dr, 0, 6.3); }
        ctx.fill();
      }
      // shading toward the edge
      const limb = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.3, R * 0.4, cx, cy, R);
      limb.addColorStop(0, "rgba(0,0,0,0)"); limb.addColorStop(1, "rgba(0,0,0,.45)");
      ctx.beginPath(); path(SPHERE); ctx.fillStyle = limb; ctx.fill();
      // thick gold routes from Tirana
      REGIONS.forEach((r, i) => {
        const line = { type: "LineString", coordinates: Array.from({ length: 41 }, (_, k) => geoInterpolate([HOME.lon, HOME.lat], [r.lon, r.lat])(k / 40)) };
        ctx.beginPath(); path(line);
        ctx.strokeStyle = i === target ? "rgba(98,193,253,.95)" : "rgba(98,193,253,.28)"; ctx.lineWidth = i === target ? 2.4 : 1.4; ctx.lineCap = "round"; ctx.stroke();
        if (visible(r.lon, r.lat)) { const [x, y] = proj([r.lon, r.lat]); const p = (t * 0.7 + i * 0.2) % 1; ctx.strokeStyle = `rgba(98,193,253,${1 - p})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 6 + p * 16, 0, 7); ctx.stroke(); }
      });
      REGIONS.map((r, i) => ({ r, big: i === target })).forEach(({ r, big }) => pin(r, big, t));
      me(t);
      if (on) raf = requestAnimationFrame(draw);
    }
    const down = (e) => { held = { x: e.clientX, y: e.clientY, r: rot.slice() }; cv.setPointerCapture?.(e.pointerId); cv.classList.add("is-held"); };
    const move = (e) => { if (!held) return; rot = [held.r[0] + (e.clientX - held.x) * (90 / R) * 0.6, Math.max(-60, Math.min(60, held.r[1] - (e.clientY - held.y) * (90 / R) * 0.6))]; };
    const up = () => { if (!held) return; held = null; idleAt = performance.now() + 3500; lastAuto = idleAt; cv.classList.remove("is-held"); };
    cv.addEventListener("pointerdown", down); cv.addEventListener("pointermove", move); cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
    size(); draw(performance.now());
    const ro = new ResizeObserver(() => { size(); if (!on) draw(performance.now()); }); ro.observe(cv);
    const io = new IntersectionObserver(([en]) => { on = en.isIntersecting; cancelAnimationFrame(raf); if (on) raf = requestAnimationFrame(draw); }); io.observe(cv);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); cv.removeEventListener("pointerdown", down); cv.removeEventListener("pointermove", move); cv.removeEventListener("pointerup", up); cv.removeEventListener("pointercancel", up); };
  }, []);
  return <canvas ref={ref} className="bx-globe" role="img" aria-label="Globe showing client countries. Drag to turn it." />;
}
