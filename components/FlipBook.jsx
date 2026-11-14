"use client";
import { useEffect, useRef, useState } from "react";
import { play } from "../lib/delight";

// "Look inside": the sample pages as a real book. Drag or swipe a page to turn it, or use the arrows and arrow keys.
// Wide screens show a two-page spread, phones one page. A soft paper sound plays when sounds are on (header switch).
// The last page is the offer (children).
const FLIP_MS = 640;

export default function FlipBook({ pages, children }) {
  // Items: the cover, the sample pages, then the offer page.
  const items = [{ cover: true }, ...pages.map((src, i) => ({ src, alt: `Sample page ${i + 1} from the book` })), { cta: true }];
  const [two, setTwo] = useState(true);
  const [v, setV] = useState(0); // spread (two pages) or page (one page) on show
  const [turn, setTurn] = useState(null); // { dir: 1 | -1, angle, live: dragging }
  const box = useRef(null);
  const drag = useRef(null);
  const busy = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 760px)");
    const set = () => { setTwo((was) => { if (was !== mq.matches) setV(0); return mq.matches; }); };
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const last = two ? Math.ceil(items.length / 2) - 1 : items.length - 1;
  const left = (n) => (two ? items[2 * n] : null);
  const right = (n) => (two ? items[2 * n + 1] : items[n]);
  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function go(dir) {
    if (busy.current) return;
    const to = v + dir;
    if (to < 0 || to > last) return;
    play("page");
    if (reduce()) { setV(to); return; }
    busy.current = true;
    setTurn({ dir, angle: dir > 0 ? 0 : -180, live: true });
    requestAnimationFrame(() => requestAnimationFrame(() => finish(dir, true)));
  }

  function finish(dir, done) {
    busy.current = true;
    setTurn({ dir, angle: (dir > 0) === done ? -180 : 0, live: false });
    setTimeout(() => {
      if (done) setV((x) => Math.max(0, Math.min(last, x + dir)));
      setTurn(null);
      busy.current = false;
    }, FLIP_MS);
  }

  // Drag: the page follows the finger, then finishes the turn or falls back.
  function down(e) {
    if (busy.current || e.button > 0 || e.target.closest("a, button")) return;
    drag.current = { x: e.clientX, t: performance.now(), dir: 0, w: box.current.offsetWidth / (two ? 2 : 1) };
  }
  function move(e) {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.dir) {
      if (Math.abs(dx) < 8) return;
      d.dir = dx < 0 ? 1 : -1;
      if ((d.dir > 0 && v >= last) || (d.dir < 0 && v <= 0)) { drag.current = null; return; }
      box.current.setPointerCapture?.(e.pointerId);
    }
    const k = Math.max(0, Math.min(1, Math.abs(dx) / d.w));
    setTurn({ dir: d.dir, angle: d.dir > 0 ? -180 * k : -180 + 180 * k, live: true });
  }
  function up(e) {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (!d.dir) { // a tap: right half turns forward, left half back
      const r = box.current.getBoundingClientRect();
      go(e.clientX > r.left + r.width / 2 ? 1 : -1);
      return;
    }
    const dx = e.clientX - d.x;
    const fast = Math.abs(dx) / Math.max(1, performance.now() - d.t) > 0.5;
    const done = Math.abs(dx) / d.w > 0.35 || fast;
    if (done) play("page");
    finish(d.dir, done);
  }

  function key(e) {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  }

  // What lies under the turning page.
  const under = turn ? (turn.dir > 0 ? { l: left(v), r: right(v + 1) } : { l: left(v - 1), r: right(v) }) : { l: left(v), r: right(v) };
  const leaf = turn ? (turn.dir > 0 ? { front: right(v), back: left(v + 1) } : { front: right(v - 1), back: left(v) }) : null;
  const label = two ? `Pages ${2 * v + 1} and ${2 * v + 2} of ${items.length}` : `Page ${v + 1} of ${items.length}`;

  const face = (it) => {
    if (!it) return <div className="fb-blank" />;
    if (it.cta) return <div className="fb-cta">{children}</div>;
    // eslint-disable-next-line @next/next/no-img-element
    if (it.cover) return <img src="/ebook/cover.webp?v=1" width="936" height="1326" alt="Front cover of 27 Copy-Paste Prompts to Fix AI Slop UI" loading="lazy" draggable="false" />;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={it.src} width="936" height="1326" alt={it.alt} loading="lazy" draggable="false" />;
  };

  return (
    <div className={`fb${two ? " is-two" : ""}`}>
      <div className="fb-book" ref={box} tabIndex={0} role="group" aria-roledescription="book" aria-label={`Book preview. ${label}. Use the arrow keys to turn pages.`}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={() => { if (drag.current?.dir) finish(drag.current.dir, false); drag.current = null; }} onKeyDown={key}>
        {two ? <div className="fb-page fb-l">{face(under.l)}</div> : null}
        <div className="fb-page fb-r">{face(under.r)}</div>
        {leaf ? (
          <div className={`fb-leaf${turn.live ? " is-live" : ""}`} style={{ rotate: `y ${turn.angle}deg`, "--k": Math.abs(Math.sin((turn.angle * Math.PI) / 180)) }} aria-hidden="true">
            <div className="fb-face fb-front">{face(leaf.front)}</div>
            <div className="fb-face fb-back">{face(leaf.back)}</div>
          </div>
        ) : null}
        {two ? <i className="fb-spine" aria-hidden="true" /> : null}
      </div>
      <div className="fb-nav">
        <button type="button" className="fb-btn" onClick={() => go(-1)} disabled={v === 0} aria-label="Previous page">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <span className="fb-dots" aria-live="polite">
          <span className="sr-only">{label}</span>
          {Array.from({ length: last + 1 }, (_, i) => <i key={i} className={i === v ? "is-on" : undefined} aria-hidden="true" />)}
        </span>
        <button type="button" className="fb-btn" onClick={() => go(1)} disabled={v === last} aria-label="Next page">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>
      <p className="fb-hint" aria-hidden="true">Drag a page to turn it</p>
    </div>
  );
}
