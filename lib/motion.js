"use client";
import { useEffect, useState } from "react";
import { loadGsap } from "./gsapLoad";

// One place for the motion plumbing (owner, 28 Nov 2026: "how can we further use GSAP", then "do all"):
// - onLive / useLive: the first interaction (HeaderScroll adds html.is-live). One shared watcher instead of a copy in
//   every component.
// - reduced / finePointer: the two media checks every animation asks.
// - watch / useInView: one IntersectionObserver per setting, shared by every component that asks for it.
// - loadPlugins: GSAP plus ScrollTrigger, Flip or SplitText from /vendor, loaded on demand and registered once.
// - loop: frame callbacks on the one GSAP clock (gsap.ticker), so canvas loops share a single frame.

export const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const finePointer = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const liveSubs = new Set();
let liveMo = null;
export function onLive(cb) {
  if (typeof document === "undefined") return () => {};
  const h = document.documentElement;
  if (h.classList.contains("is-live")) { cb(); return () => {}; }
  liveSubs.add(cb);
  if (!liveMo) {
    liveMo = new MutationObserver(() => {
      if (!h.classList.contains("is-live")) return;
      liveMo.disconnect(); liveMo = null;
      const list = [...liveSubs]; liveSubs.clear(); list.forEach((f) => f());
    });
    liveMo.observe(h, { attributes: true, attributeFilter: ["class"] });
  }
  return () => liveSubs.delete(cb);
}

// true once the visitor has interacted. With motion = true it stays false for reduced motion, so loops never start.
export function useLive(motion = true) {
  const [live, setLive] = useState(false);
  useEffect(() => (motion && reduced() ? undefined : onLive(() => setLive(true))), [motion]);
  return live;
}

const observers = new Map();
export function watch(el, cb, { threshold = 0, rootMargin = "0px" } = {}) {
  if (!el || typeof IntersectionObserver === "undefined") return () => {};
  const key = `${threshold}|${rootMargin}`;
  let o = observers.get(key);
  if (!o) {
    const subs = new Map();
    const io = new IntersectionObserver((es) => es.forEach((e) => { const s = subs.get(e.target); if (s) s.forEach((f) => f(e.isIntersecting, e)); }), { threshold, rootMargin });
    o = { io, subs };
    observers.set(key, o);
  }
  let s = o.subs.get(el);
  if (!s) { s = new Set(); o.subs.set(el, s); o.io.observe(el); }
  s.add(cb);
  return () => { s.delete(cb); if (!s.size) { o.subs.delete(el); o.io.unobserve(el); } };
}

// [on screen now, seen at least once]
export function useInView(ref, opts) {
  const [st, setSt] = useState([false, false]);
  const t = opts && opts.threshold, m = opts && opts.rootMargin;
  useEffect(() => watch(ref.current, (on) => setSt((p) => (p[0] === on ? p : [on, p[1] || on])), { threshold: t, rootMargin: m }), [ref, t, m]);
  return st;
}

const FILES = { ScrollTrigger: "scrolltrigger", Flip: "flip", SplitText: "splittext" };
const plugins = {};
const script = (name) => {
  if (!plugins[name]) {
    plugins[name] = window[name] ? Promise.resolve(window[name]) : new Promise((res) => {
      const sc = document.createElement("script");
      sc.src = `/vendor/${FILES[name]}-3.15.1.min.js`;
      sc.async = true;
      sc.onload = () => res(window[name] || null);
      sc.onerror = () => res(null);
      document.head.appendChild(sc);
    });
  }
  return plugins[name];
};
// Resolves with gsap once every plugin named is registered, or null if any of them cannot load.
export async function loadPlugins(...names) {
  const g = await loadGsap();
  if (!g) return null;
  const list = await Promise.all(names.map(script));
  if (list.some((p) => !p)) return null;
  g.registerPlugin(...list);
  return g;
}

// fn(now, deltaMs) on the shared GSAP clock, now being performance.now() like a requestAnimationFrame time. Returns a
// stop function. Falls back to requestAnimationFrame.
export function loop(fn) {
  let stop = false, raf = 0, g = null, prev = 0;
  const tick = () => { if (stop) return; const now = performance.now(); fn(now, prev ? now - prev : 0); prev = now; };
  const rafTick = (now) => { if (stop) return; raf = requestAnimationFrame(rafTick); fn(now, prev ? now - prev : 0); prev = now; };
  if (window.gsap) { g = window.gsap; g.ticker.add(tick); }
  else loadGsap().then((x) => { if (stop) return; if (x) { g = x; g.ticker.add(tick); } else raf = requestAnimationFrame(rafTick); });
  return () => { stop = true; if (g) g.ticker.remove(tick); if (raf) cancelAnimationFrame(raf); };
}
