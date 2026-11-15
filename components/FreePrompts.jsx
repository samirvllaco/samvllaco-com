"use client";
import { useEffect, useRef, useState } from "react";

// Two full prompts from the book, free to try. Text copied from PROMPTS.md (prompts 1 and 18).
const P = [
  ["1", "Audit your colors", "Audit the colors on this page. Do not change anything yet. List every color you find as a hex value, with where it is used and how many times. Then group them: backgrounds, surfaces, borders, text, accents, and status colors. Flag every gradient, every color used only once, every pair of colors that do the same job, and every color that carries meaning on its own with no label or icon. Check each text color against its background and list any pair under 4.5 to 1 contrast. Work out the split between neutral, secondary and accent colors and compare it with 60-30-10. Finish with one line: how many colors the page uses now, and how many it needs. Follow these UX laws: 60-30-10 color rule, Von Restorff effect, Contrast minimum (WCAG 1.4.3) and Color is not the only signal (WCAG 1.4.1)."],
  ["18", "Say what it does in ten words", "Rewrite the top of the page. One headline under 10 words that says what this does and who it is for. One sentence under it that says how. One main button that names the first thing the visitor does. Remove any second button. Show a real screenshot of the product. Follow these UX laws: Hick's law, Focal point, Inverted pyramid and Serial position effect."],
];

const COPY_D = "M9 9h11v11H9zM5 15H4V4h11v1";
const TICK_D = "M5 12.5l4.5 4.5L19 7.5";
const TICK_LEN = 22;

// Springs from the "Loading to success" motion study (stiffness, damping), same feel:
// width, label, spinner, done label, success fill, check draw.
const SPR = { w: [300, 22], t: [400, 30], p: [300, 28], d: [220, 20], g: [200, 30], k: [120, 20] };

// Copy button: the pill closes into a round spinner, opens into the warm "Copied" pill while the check
// draws itself, then settles back. One small spring loop that only runs while something moves.
function Copy({ text }) {
  const btn = useRef(null);
  const lbl = useRef(null);
  const spin = useRef(null);
  const done = useRef(null);
  const fill = useRef(null);
  const tick = useRef(null);
  const sim = useRef(null);
  const [msg, setMsg] = useState("");

  useEffect(() => () => { const m = sim.current; if (m) { cancelAnimationFrame(m.raf); m.timers.forEach(clearTimeout); } }, []);

  const start = () => {
    const el = btn.current;
    if (!el) return;
    let m = sim.current;
    if (!m) {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const S = (x, [k, c]) => ({ x, v: 0, t: x, k, c: reduce ? 2 * Math.sqrt(k) : c });
      const w0 = el.offsetWidth;
      m = sim.current = { w0, h: el.offsetHeight, state: "idle", timers: [], raf: 0, last: 0, rot: 0,
        W: S(w0, SPR.w), T: S(1, SPR.t), P: S(0, SPR.p), D: S(0, SPR.d), G: S(0, SPR.g), K: S(0, SPR.k) };
    }
    if (m.state !== "idle") return;
    const later = (ms, f) => m.timers.push(setTimeout(f, ms));
    const doneW = Math.max(m.h, (done.current?.scrollWidth || 0) + 28);
    m.state = "load";
    m.T.t = 0; m.W.t = m.h; m.P.t = 1;
    later(650, () => {
      m.state = "done"; m.P.t = 0; m.W.t = doneW; m.G.t = 1; m.D.t = 1;
      later(150, () => { m.K.t = 1; });
      setMsg("Prompt copied");
    });
    later(2600, () => {
      m.state = "back"; m.D.t = 0; m.G.t = 0; m.K.t = 0; m.W.t = m.w0;
      later(120, () => { m.T.t = 1; });
      later(900, () => { m.state = "idle"; setMsg(""); });
    });
    run();
  };

  const run = () => {
    const m = sim.current;
    if (m.raf) return;
    m.last = performance.now();
    const all = () => [m.W, m.T, m.P, m.D, m.G, m.K];
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const frame = (now) => {
      const dt = Math.min((now - m.last) / 1000, 1 / 30); m.last = now;
      m.rot = (m.rot + dt * 360 * 1.4) % 360;
      for (let i = 0; i < 4; i++) all().forEach((s) => { const a = -s.k * (s.x - s.t) - s.c * s.v; s.v += a * (dt / 4); s.x += s.v * (dt / 4); });
      const el = btn.current;
      if (el) {
        el.style.minWidth = "0"; el.style.width = m.W.x.toFixed(2) + "px";
        lbl.current.style.opacity = clamp(m.T.x, 0, 1).toFixed(3);
        lbl.current.style.transform = `translateY(${((1 - m.T.x) * 14).toFixed(2)}px)`;
        spin.current.style.opacity = clamp(m.P.x, 0, 1).toFixed(3);
        spin.current.style.transform = `rotate(${m.rot.toFixed(1)}deg) scale(${(0.6 + 0.4 * clamp(m.P.x, 0, 1.2)).toFixed(3)})`;
        done.current.style.opacity = clamp(m.D.x, 0, 1).toFixed(3);
        done.current.style.transform = `translateY(${((1 - m.D.x) * 12).toFixed(2)}px)`;
        fill.current.style.opacity = clamp(m.G.x, 0, 1).toFixed(3);
        tick.current.style.strokeDashoffset = (TICK_LEN * (1 - clamp(m.K.x, 0, 1))).toFixed(2);
      }
      const still = m.state === "idle" && all().every((s) => Math.abs(s.x - s.t) < 0.001 && Math.abs(s.v) < 0.001);
      if (still) { m.raf = 0; if (el) { el.style.width = ""; el.style.minWidth = ""; } return; }
      m.raf = requestAnimationFrame(frame);
    };
    m.raf = requestAnimationFrame(frame);
  };

  return (
    <>
      <button ref={btn} type="button" className="fp-copy" onClick={() => { navigator.clipboard?.writeText(text).then(start).catch(() => {}); }}>
        <i ref={fill} className="fp-c-fill" aria-hidden="true" />
        <span ref={lbl} className="fp-c-lbl"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d={COPY_D} /></svg>Copy prompt</span>
        <i ref={spin} className="fp-c-spin" aria-hidden="true" />
        <span ref={done} className="fp-c-done" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18"><path ref={tick} d={TICK_D} style={{ strokeDasharray: TICK_LEN, strokeDashoffset: TICK_LEN }} /></svg>Copied</span>
      </button>
      <span className="sr-only" role="status">{msg}</span>
    </>
  );
}

export default function FreePrompts() {
  return (
    <section className="eb-sec fp" id="free" aria-labelledby="fp-h">
      <div className="fp-box">
      <span className="fp-free">Free</span>
      <h2 id="fp-h">Try 2 prompts <span className="t2">for free, right now</span></h2>
      <p className="eb-why-lede">Two full prompts from the book, exactly as they are inside. Copy one, paste it into Claude, Cursor, Lovable or v0, and <em className="scr">judge the quality yourself.</em></p>
      <div className="fp-list">
        {P.map(([n, t, text]) => (
          <article key={n}>
            <div className="fp-h"><span>Prompt {n}</span><h3>{t}</h3><Copy text={text} /></div>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <p className="fp-more">Liked these? There are 25 more inside, plus DESIGN.md and the private video.</p>
      </div>
    </section>
  );
}
