"use client";
import { useEffect, useRef, useState } from "react";
import SIG from "../lib/signature.json";

// A signature drawn as one thin pen line, stroke by stroke, with a soft pen-on-paper sound.
// Sound needs a tap or key press first (browsers block audio until then). Tap the signature to write it again.
export default function FootSig() {
  const root = useRef(null);
  const paths = useRef([]);
  const audio = useRef(null);
  const run = useRef(0);
  const [armed, setArmed] = useState(false);

  function ctx() {
    if (audio.current) return audio.current;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      const c = new AC();
      const len = c.sampleRate * 2;
      const buf = c.createBuffer(1, len, c.sampleRate);
      const d = buf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = last * 0.55 + w * 0.45; d[i] = last; }
      const src = c.createBufferSource(); src.buffer = buf; src.loop = true;
      const hp = c.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 1400;
      const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 3200; bp.Q.value = 0.7;
      const g = c.createGain(); g.gain.value = 0;
      const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 700;
      const lg = c.createGain(); lg.gain.value = 0.9;
      const grain = c.createGain(); grain.gain.value = 1;
      const lfo = c.createOscillator(); lfo.type = "sawtooth"; lfo.frequency.value = 38;
      const lfoAmt = c.createGain(); lfoAmt.gain.value = 0.35;
      lfo.connect(lfoAmt); lfoAmt.connect(grain.gain); lfo.start();
      src.connect(hp); hp.connect(bp); bp.connect(grain); grain.connect(g);
      src.connect(lp); lp.connect(lg); lg.connect(g);
      g.connect(c.destination); src.start();
      audio.current = { c, g, bp, lfo };
    } catch { audio.current = null; }
    return audio.current;
  }

  function reset() {
    paths.current.forEach((p) => { if (!p) return; const L = p.getTotalLength(); p.style.transition = "none"; p.style.strokeDasharray = L; p.style.strokeDashoffset = L; });
  }

  function write(sound) {
    const my = ++run.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const list = paths.current.filter(Boolean);
    if (reduce) { list.forEach((p) => { p.style.strokeDashoffset = 0; }); return; }
    reset();
    const a = sound ? ctx() : null;
    if (a && a.c.state === "suspended") a.c.resume();
    let i = 0;
    const next = () => {
      if (my !== run.current) return;
      if (i >= list.length) { if (a) a.g.gain.setTargetAtTime(0, a.c.currentTime, 0.03); return; }
      const p = list[i++]; const L = p.getTotalLength();
      const dur = Math.max(160, L * 0.5);
      const t0 = performance.now();
      const tick = (t) => {
        if (my !== run.current) return;
        const k = Math.min(1, (t - t0) / dur);
        const e = 0.5 - Math.cos(Math.PI * k) / 2;
        p.style.strokeDashoffset = L * (1 - e);
        if (a) {
          const speed = Math.sin(Math.PI * k);
          const jitter = 0.7 + Math.random() * 0.6;
          a.g.gain.setTargetAtTime(0.09 * speed * jitter + 0.006, a.c.currentTime, 0.012);
          a.lfo.frequency.setTargetAtTime(24 + speed * 40 + Math.random() * 14, a.c.currentTime, 0.02);
          a.bp.frequency.setTargetAtTime(2600 + speed * 1600 + Math.random() * 500, a.c.currentTime, 0.02);
        }
        if (k < 1) requestAnimationFrame(tick);
        else { if (a) a.g.gain.setTargetAtTime(0, a.c.currentTime, 0.02); setTimeout(next, 30 + Math.random() * 50); }
      };
      requestAnimationFrame(tick);
    };
    next();
  }

  useEffect(() => {
    reset();
    let done = false;
    const el = root.current;
    const unlock = () => { setArmed(true); };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    const io = new IntersectionObserver((es) => {
      if (done || !es.some((e) => e.isIntersecting)) return;
      done = true; io.disconnect();
      const unlocked = !!navigator.userActivation?.hasBeenActive;
      setTimeout(() => write(unlocked), 250);
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); run.current++; window.removeEventListener("pointerdown", unlock); window.removeEventListener("keydown", unlock); if (audio.current) audio.current.c.close().catch(() => {}); };
  }, []);

  return (
    <span className="foot-sig-w" ref={root}>
      <svg className="foot-sig-svg" viewBox="-12 -14 1034 228" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="sig-gold" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1010" y2="60">
            <stop offset="0" stopColor="#b98a2a" /><stop offset=".25" stopColor="#f6dd8a" /><stop offset=".5" stopColor="#d4a43a" /><stop offset=".75" stopColor="#fff0b0" /><stop offset="1" stopColor="#b98a2a" />
          </linearGradient>
        </defs>
        {SIG.d.map((d, i) => <path key={i} ref={(el) => (paths.current[i] = el)} d={d} />)}
      </svg>
      <button type="button" className="foot-sig-hit" aria-label="Write the signature again, with sound" onClick={() => write(true)} />
    </span>
  );
}
