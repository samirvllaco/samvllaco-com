// Small client-side helpers for the playful layer: saved state, toasts, secrets and sounds.
// Everything is optional. If storage or audio is blocked the site works the same without it.
const K = "sv:";

export function load(key, fallback) {
  try {
    const v = window.localStorage.getItem(K + key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  try {
    window.localStorage.setItem(K + key, JSON.stringify(value));
  } catch {}
  try {
    window.dispatchEvent(new CustomEvent("sv:change", { detail: key }));
  } catch {}
}

export function toast(title, body) {
  window.dispatchEvent(new CustomEvent("sv:toast", { detail: { title, body } }));
}

export const SECRETS = ["konami", "avatar", "console"];

export function unlock(id, title, body) {
  const got = load("secrets", []);
  if (got.includes(id)) return false;
  save("secrets", [...got, id]);
  toast(title, body);
  play("win");
  return true;
}

export function reducedMotion() {
  return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

// Sounds are synthesized, quiet and off until the visitor turns them on.
let ctx = null;
export function soundOn() {
  return load("sound", false) === true;
}

function tone(freq, start, dur, gain, type) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type || "sine";
  o.frequency.setValueAtTime(freq, ctx.currentTime + start);
  g.gain.setValueAtTime(0.0001, ctx.currentTime + start);
  g.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + start + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
  o.connect(g).connect(ctx.destination);
  o.start(ctx.currentTime + start);
  o.stop(ctx.currentTime + start + dur + 0.02);
}

// A paper page turning: a short swoosh of filtered noise that sweeps down, then a soft landing.
function flip() {
  const t = ctx.currentTime;
  const len = Math.floor(ctx.sampleRate * 0.42);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = last * 0.4 + w * 0.6; d[i] = last; }
  const src = ctx.createBufferSource(); src.buffer = buf;
  const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 0.9;
  bp.frequency.setValueAtTime(2600, t); bp.frequency.exponentialRampToValueAtTime(700, t + 0.34);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.07, t + 0.05);
  g.gain.exponentialRampToValueAtTime(0.02, t + 0.22);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
  src.connect(bp).connect(g).connect(ctx.destination);
  src.start(t); src.stop(t + 0.42);
  tone(150, 0.3, 0.08, 0.025, "sine");
}

export function play(kind, force) {
  if (!force && !soundOn()) return;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!ctx) ctx = new AC();
    if (ctx.state === "suspended") ctx.resume();
    if (kind === "tick") tone(720, 0, 0.05, 0.03, "sine");
    else if (kind === "tab") tone(520, 0, 0.07, 0.035, "triangle");
    else if (kind === "on") { tone(523, 0, 0.09, 0.04); tone(784, 0.08, 0.14, 0.04); }
    else if (kind === "page") flip();
    else if (kind === "win") { tone(523, 0, 0.1, 0.045); tone(659, 0.09, 0.1, 0.045); tone(784, 0.18, 0.22, 0.045); }
  } catch {}
}
