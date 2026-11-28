"use client";
import { useEffect } from "react";
import { orbitAt, orbitTf } from "../lib/orbit";
import { onLive, loop as clock, watch } from "../lib/motion";
import { loadGsap } from "../lib/gsapLoad";

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
      // The orbit and the sphere run on the shared GSAP clock (lib/motion.js), only on screen (owner, 28 Nov 2026, "do all").
      let stop = null, on = false, live = html.classList.contains("is-live"), last = 0, ang = 0, prev = 0;
      const loop = (now) => {
        const dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0;
        prev = now; ang += dt * 0.16; rot += dt * 0.35;
        place(ang);
        if (now - last > 33) { last = now; draw(); }
      };
      const sync = () => {
        const go = on && live && !still;
        if (go && !stop) { prev = 0; stop = clock(loop); }
        if (!go && stop) { stop(); stop = null; }
      };
      const io = new IntersectionObserver(([e]) => { on = e.isIntersecting; sync(); }, { threshold: 0.05 });
      io.observe(stage);
      const offLive = onLive(() => { live = true; sync(); });
      offs.push(() => { if (stop) stop(); io.disconnect(); offLive(); ro.disconnect(); });
    }

    // Stat cells (owner, 28 Nov 2026: "improve animation here + alignment + use GSAP to add effects, depth and make it
    // feel super smooth"). With GSAP: a light follows the pointer in each cell; the gauge's needle sweeps from 2013 to
    // today and lights each tick as it passes, with a soft glow and halo under the arc; the client dots light in a wave
    // from left to right with a bright front, and a faint shimmer runs across them now and then; the turnaround line
    // runs a lit head from request to "back to you", where a ring opens. Loops wait for the first interaction and
    // pause off screen; reduced motion and no GSAP show the end state.
    const dc = sec.querySelector(".bd-dots");
    const dot = { w: 0, h: 0, dpr: 1, ctx: dc ? dc.getContext("2d") : null, p: 1, wave: -1 };
    const fitDots = () => { if (!dc) return; dot.dpr = Math.min(2, window.devicePixelRatio || 1); dot.w = dc.clientWidth; dot.h = dc.clientHeight; dc.width = Math.round(dot.w * dot.dpr); dc.height = Math.round(dot.h * dot.dpr); };
    const paintDots = () => {
      const { ctx, w, h, dpr } = dot;
      if (!ctx || !w) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const sx = w / COLS, sy = h / ROWS, r = Math.min(sx, sy) * 0.3, reach = dot.p * 1.15;
      for (let n = 0; n < COLS * ROWS; n++) {
        const c = n % COLS, rw = Math.floor(n / COLS), x = (c + 0.5) * sx, y = (rw + 0.5) * sy;
        const t = (c / COLS) * 0.85 + (rw / ROWS) * 0.15, ahead = reach - t, near = Math.abs(dot.wave - t);
        let fill = "rgba(255,255,255,.14)", rr = r;
        if (n < CLIENTS && ahead > 0) {
          fill = ahead < 0.06 ? "#d8f0ff" : "#62c1fd";
          if (ahead < 0.06) rr = r * (1.6 - ahead * 10);
          else if (near < 0.04) { fill = "#bfe6ff"; rr = r * (1.35 - near * 8); }
        }
        ctx.fillStyle = fill;
        ctx.beginPath(); ctx.arc(x, y, rr, 0, Math.PI * 2); ctx.fill();
      }
    };
    if (dc) {
      fitDots(); paintDots();
      const ro = new ResizeObserver(() => { fitDots(); paintDots(); });
      ro.observe(dc);
      offs.push(() => ro.disconnect());
    }
    if (!still) {
      let gone = false;
      offs.push(() => { gone = true; });
      loadGsap().then((g) => {
        if (!g || gone) return;
        sec.classList.add("gs");
        const tls = [];
        offs.push(() => tls.forEach((t) => t.kill()));
        // A light that follows the pointer inside each stat cell.
        sec.querySelectorAll(".bx2-s").forEach((cell) => {
          const qx = g.quickTo(cell, "--mx", { duration: 0.6, ease: "power3.out" }), qy = g.quickTo(cell, "--my", { duration: 0.6, ease: "power3.out" });
          const mv = (e) => { const r = cell.getBoundingClientRect(); qx(((e.clientX - r.left) / r.width) * 100); qy(((e.clientY - r.top) / r.height) * 100); };
          cell.addEventListener("pointermove", mv);
          offs.push(() => cell.removeEventListener("pointermove", mv));
        });
        // Gauge.
        const gauge = sec.querySelector(".bg-gauge");
        if (gauge) {
          const ticks = [...gauge.querySelectorAll(".bg-ticks line")], glows = [...gauge.querySelectorAll(".bg-ticks-glow line")];
          const needle = gauge.querySelector(".bg-needle"), halo = gauge.querySelector(".bg-halo"), tip = needle.querySelector("circle");
          const DIM = "rgba(255,255,255,0.16)", lit = ticks.map(() => false);
          g.set(ticks, { stroke: DIM }); g.set(glows, { opacity: 0 }); g.set(halo, { opacity: 0 });
          g.set(needle, { rotation: -90, svgOrigin: "110 108" });
          const light = () => {
            const a = g.getProperty(needle, "rotation");
            ticks.forEach((t, k) => {
              const on = a >= (k / 26) * 180 - 90 - 0.5;
              if (on !== lit[k]) { lit[k] = on; g.to(t, { stroke: on ? "#62c1fd" : DIM, duration: 0.25, overwrite: true }); g.to(glows[k], { opacity: on ? 0.55 : 0, duration: 0.35, overwrite: true }); }
            });
          };
          const off = watch(gauge, (on) => {
            if (!on) return; off();
            tls.push(g.timeline()
              .to(needle, { rotation: 90, svgOrigin: "110 108", duration: 1.8, ease: "power3.inOut", onUpdate: light })
              .to(halo, { opacity: 1, duration: 1.2, ease: "power2.out" }, 0.4)
              .fromTo(tip, { scale: 1, transformOrigin: "50% 50%" }, { scale: 1.8, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.out" }, ">-0.1"));
          }, { threshold: 0.5 });
          offs.push(off);
        }
        // Client dots.
        if (dc) {
          dot.p = 0; paintDots();
          let shimmer = null;
          const off = watch(dc, (on) => {
            if (!on) return; off();
            tls.push(g.to(dot, { p: 1, duration: 1.8, ease: "power2.inOut", onUpdate: paintDots, onComplete: () => {
              shimmer = g.timeline({ repeat: -1, repeatDelay: 5, paused: true }).fromTo(dot, { wave: -0.1 }, { wave: 1.15, duration: 1.6, ease: "none", onUpdate: paintDots, onComplete: () => { dot.wave = -1; paintDots(); } });
              tls.push(shimmer);
              onLive(() => { if (!gone) shimmer.play(); });
              const offV = watch(dc, (v) => { if (v) shimmer.play(); else shimmer.pause(); });
              offs.push(offV);
            } }));
          }, { threshold: 0.5 });
          offs.push(off);
        }
        // Turnaround line.
        const track = sec.querySelector(".bt-track");
        if (track) {
          const fill = track.querySelector(".bt-dot"), head = track.querySelector(".bt-head"), end = track.querySelector(".bt-end");
          g.set(fill, { "--k": 0 });
          const tl = g.timeline({ repeat: -1, repeatDelay: 0.8, paused: true })
            .set(fill, { "--k": 0 }).set(head, { x: 0, opacity: 0 }).set(end, { scale: 1, opacity: 0 })
            .to(head, { opacity: 1, duration: 0.25, ease: "none" })
            .to(fill, { "--k": 1, duration: 1.8, ease: "power2.inOut" }, "<")
            .to(head, { x: () => track.clientWidth, duration: 1.8, ease: "power2.inOut" }, "<")
            .to(end, { opacity: 0.9, duration: 0.01 })
            .to(end, { scale: 2.6, opacity: 0, duration: 0.8, ease: "power2.out" })
            .to(head, { opacity: 0, duration: 0.3, ease: "none" }, "<0.3")
            .to(fill, { "--k": 0, duration: 0.5, ease: "power2.in" }, "+=0.9");
          tls.push(tl);
          const ro = new ResizeObserver(() => tl.invalidate());
          ro.observe(track);
          offs.push(() => ro.disconnect());
          let seenT = false, liveT = false;
          const sync = () => { if (seenT && liveT) tl.play(); else tl.pause(); };
          offs.push(onLive(() => { liveT = true; sync(); }));
          offs.push(watch(track, (v) => { seenT = v; sync(); }, { threshold: 0.5 }));
        }
      });
    }
    return () => offs.forEach((f) => f());
  }, [at]);
  return null;
}
