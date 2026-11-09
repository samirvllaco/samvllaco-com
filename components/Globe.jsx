"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PLACES, NOW_IN } from "../lib/places";

const RAD = Math.PI / 180;
const HOME = { lat: 36, lon: 16, zoom: 1 };

export default function Globe({ full = false, bg }) {
  const box = useRef(null);
  const cv = useRef(null);
  const pins = useRef([]);
  const st = useRef({ lat: HOME.lat, lon: HOME.lon, zoom: HOME.zoom, vLon: 0, vLat: 0, auto: true, idle: 0, goal: null, dragging: false });
  const data = useRef(null);
  const [sel, setSel] = useState(null);
  const [auto, setAuto] = useState(true);
  const [ready, setReady] = useState(false);

  const flyTo = useCallback((lat, lon, zoom) => {
    st.current.goal = { lat, lon, zoom };
    st.current.auto = false;
    setAuto(false);
  }, []);

  useEffect(() => {
    let alive = true;
    import("../lib/globe-data.json").then((m) => {
      if (!alive) return;
      data.current = m.default || m;
      setReady(true);
    });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const el = box.current, canvas = cv.current, ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const S = st.current;
    if (reduce) { S.auto = false; setAuto(false); }
    let w = 0, h = 0, raf = 0;
    const pointers = new Map();
    let pinch = 0, last = { x: 0, y: 0 }, moved = 0;

    const resize = () => {
      const r = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize); ro.observe(el); resize();

    const proj = (lat, lon, R, cx, cy) => {
      const p = lat * RAD, l = (lon - S.lon) * RAD, p0 = S.lat * RAD;
      const cosc = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l);
      return { x: cx + R * Math.cos(p) * Math.sin(l), y: cy - R * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l)), c: cosc };
    };

    const frame = () => {
      const { dots, lines } = data.current;
      // motion
      if (S.goal) {
        let dl = S.goal.lon - S.lon; dl = ((dl + 540) % 360) - 180;
        S.lon += dl * 0.08; S.lat += (S.goal.lat - S.lat) * 0.08; S.zoom += (S.goal.zoom - S.zoom) * 0.08;
        if (Math.abs(dl) < 0.1 && Math.abs(S.goal.lat - S.lat) < 0.1 && Math.abs(S.goal.zoom - S.zoom) < 0.01) S.goal = null;
      } else if (!S.dragging) {
        S.lon += S.vLon; S.lat += S.vLat; S.vLon *= 0.95; S.vLat *= 0.95;
        if (S.auto) S.lon += 0.12;
      }
      S.lat = Math.max(-80, Math.min(80, S.lat));
      S.lon = ((S.lon + 540) % 360) - 180;

      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.44 * S.zoom;
      ctx.clearRect(0, 0, w, h);
      // atmosphere
      const glow = ctx.createRadialGradient(cx, cy, R * 0.96, cx, cy, R * 1.18);
      glow.addColorStop(0, "rgba(98,193,253,.35)"); glow.addColorStop(1, "rgba(98,193,253,0)");
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, R * 1.18, 0, 7); ctx.fill();
      const sea = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      sea.addColorStop(0, "#16314d"); sea.addColorStop(1, "#08111c");
      ctx.fillStyle = sea; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();

      // land dots
      const dr = Math.max(0.9, 1.05 * Math.sqrt(S.zoom));
      ctx.fillStyle = "#dcebf8";
      for (let i = 0; i < dots.length; i++) {
        const q = proj(dots[i][0], dots[i][1], R, cx, cy);
        if (q.c <= 0) continue;
        if (q.x < -4 || q.x > w + 4 || q.y < -4 || q.y > h + 4) continue;
        ctx.globalAlpha = 0.18 + 0.72 * q.c;
        ctx.fillRect(q.x - dr, q.y - dr, dr * 2, dr * 2);
      }
      // outlines
      ctx.lineWidth = 0.6; ctx.strokeStyle = "#62c1fd";
      for (let i = 0; i < lines.length; i++) {
        const ln = lines[i]; let pen = false;
        ctx.beginPath();
        for (let j = 0; j < ln.length; j++) {
          const q = proj(ln[j][0], ln[j][1], R, cx, cy);
          if (q.c > 0) { ctx.globalAlpha = 0.12 + 0.3 * q.c; if (pen) ctx.lineTo(q.x, q.y); else { ctx.moveTo(q.x, q.y); pen = true; } } else pen = false;
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // pins
      PLACES.forEach((pl, i) => {
        const node = pins.current[i]; if (!node) return;
        const q = proj(pl.lat, pl.lon, R, cx, cy);
        const vis = q.c > 0.12;
        node.style.opacity = vis ? "1" : "0";
        node.style.pointerEvents = vis ? "auto" : "none";
        node.style.zIndex = String(Math.round(q.c * 10));
        node.style.transform = `translate(${q.x}px, ${q.y}px) translate(-50%, -50%) scale(${0.8 + 0.3 * q.c})`;
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const down = (e) => {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      canvas.setPointerCapture(e.pointerId);
      S.dragging = true; S.goal = null; S.auto = false; setAuto(false); S.vLon = S.vLat = 0; moved = 0;
      last = { x: e.clientX, y: e.clientY };
      if (pointers.size === 2) { const [a, b] = [...pointers.values()]; pinch = Math.hypot(a.x - b.x, a.y - b.y); }
    };
    const move = (e) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (pinch) S.zoom = Math.max(0.8, Math.min(5, S.zoom * (d / pinch))); pinch = d; return;
      }
      const dx = e.clientX - last.x, dy = e.clientY - last.y; last = { x: e.clientX, y: e.clientY };
      moved += Math.abs(dx) + Math.abs(dy);
      const k = 0.35 / S.zoom;
      S.lon -= dx * k; S.lat += dy * k; S.vLon = -dx * k; S.vLat = dy * k;
    };
    const up = (e) => { pointers.delete(e.pointerId); pinch = 0; if (!pointers.size) S.dragging = false; };
    const wheel = (e) => { e.preventDefault(); S.goal = null; S.zoom = Math.max(0.8, Math.min(5, S.zoom * Math.exp(-e.deltaY * 0.0015))); };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    canvas.addEventListener("wheel", wheel, { passive: false });
    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      canvas.removeEventListener("pointerdown", down); canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up); canvas.removeEventListener("pointercancel", up);
      canvas.removeEventListener("wheel", wheel);
    };
  }, [ready]);

  const countries = new Set(PLACES.map((p) => p.country)).size;
  const now = PLACES.find((p) => p.name === NOW_IN);
  const place = sel !== null ? PLACES[sel] : null;

  const zoomBy = (f) => { st.current.goal = null; st.current.zoom = Math.max(0.8, Math.min(5, st.current.zoom * f)); };
  const toggleAuto = () => { st.current.auto = !st.current.auto; st.current.goal = null; setAuto(st.current.auto); };
  const reset = () => { st.current.goal = { ...HOME }; setSel(null); };
  const fullscreen = () => { try { box.current.requestFullscreen?.(); } catch {} };

  return (
    <section className={`globe-wrap${full ? " is-full" : ""}`} aria-label="Places I have been" data-bg={bg}>
      <div className="globe-stage" ref={box} data-lenis-prevent>
        <canvas ref={cv} aria-hidden="true" />
        {PLACES.map((pl, i) => (
          <button
            key={pl.name}
            type="button"
            className={`pin${sel === i ? " is-sel" : ""}`}
            ref={(n) => (pins.current[i] = n)}
            aria-label={`${pl.name}, ${pl.country}`}
            onClick={() => { setSel(i); flyTo(pl.lat, pl.lon, Math.max(st.current.zoom, 2)); }}
          >
            {pl.photo ? <img src={pl.photo} alt="" width="48" height="48" /> : <span aria-hidden="true">{pl.flag}</span>}
          </button>
        ))}

        <div className="globe-head">
          <p className="globe-now">
            <span aria-hidden="true">{now?.flag}</span> Now in <b>{now?.name}, {now?.country}</b>
          </p>
          <p className="globe-count"><b>{PLACES.length}</b> places in <b>{countries}</b> countries</p>
        </div>

        <div className="globe-tools">
          <button type="button" onClick={() => zoomBy(1.4)} aria-label="Zoom in">+</button>
          <button type="button" onClick={() => zoomBy(1 / 1.4)} aria-label="Zoom out">&minus;</button>
          <button type="button" onClick={toggleAuto} aria-pressed={auto} aria-label="Auto rotate">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.5-5.8M20 4v4h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" onClick={reset} aria-label="Reset view">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M3 11l9-8 9 8M5 10v10h14V10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" onClick={fullscreen} aria-label="Full screen">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        {place && (
          <aside className="globe-card" aria-live="polite">
            <button type="button" className="globe-close" onClick={() => setSel(null)} aria-label="Close">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
            {place.photo && <img className="globe-photo" src={place.photo} alt={`${place.name}`} />}
            <p className="globe-kind">{place.kind === "experience" ? "Experience" : "Visited"}{place.period ? ` · ${place.period}` : ""}</p>
            <h3>{place.flag} {place.name}, {place.country}</h3>
            {place.title && <p className="globe-title">{place.title}</p>}
            {place.text && <p>{place.text}</p>}
          </aside>
        )}
        {!ready && <p className="globe-loading">Loading globe</p>}
      </div>
      {!full && (
        <p className="globe-more"><Link href="/globe/">Open the full globe</Link></p>
      )}
    </section>
  );
}
