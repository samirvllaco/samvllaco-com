"use client";
import { useEffect, useRef } from "react";
import { geoOrthographic, geoPath, geoInterpolate, geoDistance } from "d3-geo";
import WORLD from "../lib/world.json";

// Solid dark globe with grey land and country borders. Client countries are gold, with thick gold routes
// from Tirana and a flag pin on each. It turns by itself and can be dragged or swiped.
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
    const proj = geoOrthographic().clipAngle(90).precision(0.4);
    const path = geoPath(proj, ctx);
    let w = 0, h = 0, raf = 0, on = false, R = 100;
    let rot = [-10, -28], target = 0, lastAuto = performance.now(), held = null, idleAt = 0;
    const flags = {};
    ["eu", "us", "ca", "ae", "au", "al"].forEach((c) => { const im = new Image(); im.src = `/flags/${c}.svg`; im.onload = () => { flags[c] = im; }; });

    function size() {
      const r = cv.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height; cv.width = Math.round(w * d); cv.height = Math.round(h * d); ctx.setTransform(d, 0, 0, d, 0, 0);
      R = Math.min(w * 0.4, h * 0.36);
      proj.scale(R).translate([w / 2, h * 0.52]);
    }
    const visible = (lon, lat) => geoDistance([lon, lat], [-rot[0], -rot[1]]) < Math.PI / 2 - 0.05;
    function pin(r, big, t) {
      if (!visible(r.lon, r.lat)) return;
      const [bx, by] = proj([r.lon, r.lat]);
      const cx = w / 2, cy = h * 0.52, dx = bx - cx, dy = by - cy, k = big ? 0.2 : 0.13;
      const tx = bx + dx * k, ty = by + dy * k - (big ? 16 : 10);
      const fw = big ? 40 : 28, fh = fw * 0.72, bob = Math.sin(t * 1.6 + r.lon) * 1.2;
      ctx.strokeStyle = "rgba(255,255,255,.9)"; ctx.lineWidth = 2; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(tx, ty + bob); ctx.stroke();
      ctx.fillStyle = "#f5c542"; ctx.beginPath(); ctx.arc(bx, by, big ? 5 : 3.5, 0, 7); ctx.fill();
      const x = tx - fw / 2, y = ty - fh + bob;
      ctx.save(); ctx.shadowColor = "rgba(0,0,0,.6)"; ctx.shadowBlur = 12; ctx.shadowOffsetY = 5;
      ctx.beginPath(); ctx.roundRect(x - 2, y - 2, fw + 4, fh + 4, 7); ctx.fillStyle = "#fff"; ctx.fill(); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, fw, fh, 5); ctx.clip();
      if (flags[r.flag]) ctx.drawImage(flags[r.flag], x, y, fw, fh);
      const g = ctx.createLinearGradient(x, y, x + fw, y + fh);
      g.addColorStop(0, "rgba(255,255,255,.35)"); g.addColorStop(0.5, "rgba(255,255,255,0)"); g.addColorStop(1, "rgba(0,0,0,.25)");
      ctx.fillStyle = g; ctx.fillRect(x, y, fw, fh); ctx.restore();
    }
    function draw(now) {
      const t = now / 1000;
      if (!held && now > idleAt && !reduce) {
        if (now - lastAuto > 4200) { target = (target + 1) % REGIONS.length; lastAuto = now; }
        const g = REGIONS[target], want = [-(g.lon + HOME.lon) / 2 - (Math.abs(g.lon - HOME.lon) > 150 ? 0 : 0), -Math.max(-20, Math.min(40, (g.lat + HOME.lat) / 2)) + 4];
        let d0 = ((want[0] - rot[0] + 540) % 360) - 180;
        rot = [rot[0] + d0 * 0.035, rot[1] + (want[1] - rot[1]) * 0.035];
      }
      proj.rotate(rot);
      const cx = w / 2, cy = h * 0.52;
      ctx.clearRect(0, 0, w, h);
      const halo = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.25);
      halo.addColorStop(0, "rgba(255,255,255,.1)"); halo.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, R * 1.25, 0, 7); ctx.fill();
      const ball = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.45, R * 0.05, cx, cy, R);
      ball.addColorStop(0, "#2b2b2c"); ball.addColorStop(0.6, "#171718"); ball.addColorStop(1, "#0c0c0d");
      ctx.beginPath(); path(SPHERE); ctx.fillStyle = ball; ctx.fill();
      // land with a soft drop for a raised look
      ctx.save(); ctx.shadowColor = "rgba(0,0,0,.55)"; ctx.shadowBlur = 6; ctx.shadowOffsetX = 2; ctx.shadowOffsetY = 3;
      ctx.beginPath(); path(WORLD.land); ctx.fillStyle = "#6b6b66"; ctx.fill(); ctx.restore();
      ctx.beginPath(); GOLD.forEach((f) => path(f)); ctx.fillStyle = "#e3bd3f"; ctx.fill();
      ctx.beginPath(); path(WORLD.borders); ctx.strokeStyle = "rgba(20,20,20,.55)"; ctx.lineWidth = 0.7; ctx.stroke();
      // shading toward the edge
      const limb = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.3, R * 0.4, cx, cy, R);
      limb.addColorStop(0, "rgba(0,0,0,0)"); limb.addColorStop(1, "rgba(0,0,0,.62)");
      ctx.beginPath(); path(SPHERE); ctx.fillStyle = limb; ctx.fill();
      // thick gold routes from Tirana
      REGIONS.forEach((r, i) => {
        const line = { type: "LineString", coordinates: Array.from({ length: 41 }, (_, k) => geoInterpolate([HOME.lon, HOME.lat], [r.lon, r.lat])(k / 40)) };
        ctx.beginPath(); path(line);
        ctx.strokeStyle = i === target ? "#f5c542" : "rgba(245,197,66,.4)"; ctx.lineWidth = i === target ? 3.5 : 2; ctx.lineCap = "round"; ctx.stroke();
        if (visible(r.lon, r.lat)) { const [x, y] = proj([r.lon, r.lat]); const p = (t * 0.7 + i * 0.2) % 1; ctx.strokeStyle = `rgba(245,197,66,${1 - p})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 6 + p * 16, 0, 7); ctx.stroke(); }
      });
      [...REGIONS.map((r, i) => ({ r, big: i === target })), { r: HOME, big: false }].forEach(({ r, big }) => pin(r, big, t));
      if (on) raf = requestAnimationFrame(draw);
    }
    const down = (e) => { held = { x: e.clientX, y: e.clientY, r: rot.slice() }; cv.setPointerCapture?.(e.pointerId); cv.classList.add("is-held"); };
    const move = (e) => { if (!held) return; rot = [held.r[0] + (e.clientX - held.x) * (90 / R) * 0.6, Math.max(-70, Math.min(70, held.r[1] - (e.clientY - held.y) * (90 / R) * 0.6))]; };
    const up = () => { if (!held) return; held = null; idleAt = performance.now() + 3500; lastAuto = idleAt; cv.classList.remove("is-held"); };
    cv.addEventListener("pointerdown", down); cv.addEventListener("pointermove", move); cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
    size(); draw(performance.now());
    const ro = new ResizeObserver(() => { size(); if (!on) draw(performance.now()); }); ro.observe(cv);
    const io = new IntersectionObserver(([en]) => { on = en.isIntersecting; cancelAnimationFrame(raf); if (on) raf = requestAnimationFrame(draw); }); io.observe(cv);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); cv.removeEventListener("pointerdown", down); cv.removeEventListener("pointermove", move); cv.removeEventListener("pointerup", up); cv.removeEventListener("pointercancel", up); };
  }, []);
  return <canvas ref={ref} className="bx-globe" role="img" aria-label="Globe showing client countries. Drag to turn it." />;
}
