"use client";
import { useEffect, useRef, useState } from "react";
import { play, toast, unlock, reducedMotion } from "../lib/delight";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

function burst() {
  if (reducedMotion()) return;
  const c = document.createElement("canvas");
  c.className = "dl-burst";
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  document.body.appendChild(c);
  const g = c.getContext("2d");
  const colors = ["#62c1fd", "#f5f5f7", "#e9b84a", "#7c6cf2"];
  const parts = Array.from({ length: 70 }, (_, i) => ({
    x: c.width / 2,
    y: c.height * 0.38,
    vx: Math.cos((i / 70) * Math.PI * 2) * (3 + Math.random() * 6),
    vy: Math.sin((i / 70) * Math.PI * 2) * (3 + Math.random() * 6) - 3,
    s: 3 + Math.random() * 4,
    c: colors[i % colors.length],
  }));
  const t0 = performance.now();
  (function frame(now) {
    const t = (now - t0) / 1400;
    g.clearRect(0, 0, c.width, c.height);
    if (t >= 1) return c.remove();
    g.globalAlpha = 1 - t;
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.22;
      g.fillStyle = p.c;
      g.fillRect(p.x, p.y, p.s, p.s);
    }
    requestAnimationFrame(frame);
  })(t0);
}

// Global playful layer: toasts, quiet click sounds and three hidden secrets.
export default function Delight() {
  const [item, setItem] = useState(null);
  const timer = useRef(null);

  useEffect(() => {
    // Reveal [data-reveal] blocks when they scroll into view. New blocks are picked up too,
    // so sections still appear after moving between pages without a full reload.
    const show = (e) => e.classList.add("is-shown");
    if (!("IntersectionObserver" in window)) { document.querySelectorAll("[data-reveal]").forEach(show); return; }
    const io = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }), { threshold: 0.01, rootMargin: "0px 0px -6% 0px" });
    const seen = new WeakSet();
    const scan = () => document.querySelectorAll("[data-reveal]:not(.is-shown)").forEach((e) => { if (!seen.has(e)) { seen.add(e); io.observe(e); } });
    scan();
    let queued = false;
    const mo = new MutationObserver(() => { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; scan(); }); });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
  useEffect(() => {
    function onToast(e) {
      setItem({ ...e.detail, id: Date.now() });
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setItem(null), 4200);
    }
    window.addEventListener("sv:toast", onToast);

    // Secret 1: the Konami code
    let pos = 0;
    function onKey(e) {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = k === KONAMI[pos] ? pos + 1 : k === KONAMI[0] ? 1 : 0;
      if (pos === KONAMI.length) {
        pos = 0;
        burst();
        if (!unlock("konami", "Secret found: Old school", "You know the code. Two more are hidden.")) {
          toast("Old school", "Still works every time.");
          play("win");
        }
      }
    }
    window.addEventListener("keydown", onKey);

    // Secret 2: tap the logo five times
    let taps = 0;
    let tapTimer = null;
    function onClick(e) {
      const plate = e.target.closest && e.target.closest(".brand-me");
      if (plate) {
        taps += 1;
        clearTimeout(tapTimer);
        tapTimer = setTimeout(() => { taps = 0; }, 2500);
        if (taps >= 5) {
          taps = 0;
          plate.classList.remove("dl-spin");
          void plate.offsetWidth;
          plate.classList.add("dl-spin");
          if (!unlock("avatar", "Secret found: Persistent", "Five taps on the logo. You really wanted my attention.")) play("tick");
        }
        return;
      }
      if (e.target.closest && e.target.closest("a, button")) play("tick");
    }
    document.addEventListener("click", onClick);

    // Secret 3: for people who open the console
    try {
      window.sam = {
        hire() {
          unlock("console", "Secret found: Inspector", "You read the console. We would get along.");
          return "hello@samvllaco.com";
        },
      };
      console.log("%cHi, curious one.", "font: 600 16px system-ui; color: #62c1fd");
      console.log("Looking under the hood? Run sam.hire()");
    } catch {}

    return () => {
      window.removeEventListener("sv:toast", onToast);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="dl-toasts" aria-live="polite" aria-atomic="true">
      {item ? (
        <div className="dl-toast" key={item.id} role="status">
          <span className="dl-toast-title">{item.title}</span>
          {item.body ? <span className="dl-toast-body">{item.body}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
