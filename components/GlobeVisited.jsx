"use client";
import { useEffect, useRef } from "react";
import LAND from "../lib/land-dots.json";
import { PLACES } from "../lib/site";

const RAD = Math.PI / 180;
const FOCUS = { lat: 44, lon: 14 };

export default function GlobeVisited() {
  const box = useRef(null);
  const canvas = useRef(null);
  const labels = useRef([]);

  useEffect(() => {
    const el = box.current;
    const cv = canvas.current;
    const ctx = cv.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, R = 0, raf = 0, t0 = performance.now();
    const drag = { on: false, x: 0, y: 0, dLon: 0, dLat: 0 };

    const resize = () => {
      const r = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height; R = w * 1.05;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    const project = (lat, lon, cLat, cLon) => {
      const p = lat * RAD, l = (lon - cLon) * RAD, p0 = cLat * RAD;
      const cosc = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l);
      const x = R * Math.cos(p) * Math.sin(l);
      const y = R * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l));
      return { x: w / 2 + x, y: h * 0.62 - y, cosc };
    };

    const frame = (now) => {
      const sway = reduce ? 0 : Math.sin((now - t0) / 4000) * 6;
      if (!drag.on) { drag.dLon *= 0.94; drag.dLat *= 0.94; }
      const cLon = FOCUS.lon + sway + drag.dLon;
      const cLat = FOCUS.lat + drag.dLat;

      ctx.clearRect(0, 0, w, h);
      // sphere glow
      const g = ctx.createRadialGradient(w / 2, h * 0.62 - R * 0.2, R * 0.2, w / 2, h * 0.62, R);
      g.addColorStop(0, "rgba(20,40,64,.9)");
      g.addColorStop(1, "rgba(8,16,26,.9)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(w / 2, h * 0.62, R, 0, Math.PI * 2);
      ctx.fill();

      for (const [lat, lon] of LAND) {
        const q = project(lat, lon, cLat, cLon);
        if (q.cosc <= 0.02 || q.x < -4 || q.x > w + 4 || q.y < -4 || q.y > h + 4) continue;
        ctx.globalAlpha = 0.25 + 0.65 * q.cosc;
        ctx.fillStyle = "#e8f2fb";
        ctx.beginPath();
        ctx.arc(q.x, q.y, 1.2 + 0.6 * q.cosc, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      PLACES.forEach((pl, i) => {
        const q = project(pl.lat, pl.lon, cLat, cLon);
        const node = labels.current[i];
        const vis = q.cosc > 0.1;
        if (node) {
          node.style.opacity = vis ? "1" : "0";
          node.style.transform = `translate(${q.x + pl.dx}px, ${q.y + pl.dy}px) rotate(${pl.rot}deg)`;
        }
        if (!vis) return;
        const pulse = reduce ? 0 : (Math.sin((now - t0) / 500 + i) + 1) / 2;
        ctx.fillStyle = "rgba(98,193,253,.25)";
        ctx.beginPath(); ctx.arc(q.x, q.y, 7 + pulse * 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#62c1fd";
        ctx.beginPath(); ctx.arc(q.x, q.y, 4.5, 0, Math.PI * 2); ctx.fill();
        // leader line to label
        ctx.strokeStyle = "rgba(98,193,253,.6)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(q.x + pl.dx + 40, q.y + pl.dy + 24); ctx.stroke();
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const down = (e) => { drag.on = true; drag.x = e.clientX; drag.y = e.clientY; cv.setPointerCapture(e.pointerId); };
    const move = (e) => {
      if (!drag.on) return;
      drag.dLon = Math.max(-35, Math.min(35, drag.dLon - (e.clientX - drag.x) * 0.15));
      drag.dLat = Math.max(-20, Math.min(20, drag.dLat + (e.clientY - drag.y) * 0.1));
      drag.x = e.clientX; drag.y = e.clientY;
    };
    const up = () => { drag.on = false; };
    cv.addEventListener("pointerdown", down);
    cv.addEventListener("pointermove", move);
    cv.addEventListener("pointerup", up);
    cv.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      cv.removeEventListener("pointerdown", down);
      cv.removeEventListener("pointermove", move);
      cv.removeEventListener("pointerup", up);
      cv.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <section className="visited" aria-labelledby="visited-title">
      <div className="globe" ref={box}>
        <canvas ref={canvas} aria-hidden="true" />
        {PLACES.map((pl, i) => (
          <div className="polaroid" key={pl.name} ref={(n) => (labels.current[i] = n)}>
            <span className="polaroid-img" aria-hidden="true">{pl.flag}</span>
            <span className="polaroid-name">{pl.name}</span>
          </div>
        ))}
      </div>
      <div className="visited-copy">
        <p className="visited-now"><span aria-hidden="true">{PLACES[3].flag}</span> Now in</p>
        <h2 id="visited-title">Tirana, Albania</h2>
        <p className="visited-count"><b>{PLACES.length}</b> places in <b>{new Set(PLACES.map((p) => p.country)).size}</b> countries</p>
        <ul className="flags" aria-label="Countries visited">
          {PLACES.map((p) => (
            <li key={p.country} title={p.country}><span aria-hidden="true">{p.flag}</span><span className="sr">{p.country}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
