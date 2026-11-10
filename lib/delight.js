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
    else if (kind === "win") { tone(523, 0, 0.1, 0.045); tone(659, 0.09, 0.1, 0.045); tone(784, 0.18, 0.22, 0.045); }
  } catch {}
}
