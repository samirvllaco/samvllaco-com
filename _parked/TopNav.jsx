"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAV, LORDICONS } from "../lib/site";

const PATHS = {
  home: "M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10",
  building: "M12 3l9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 17l9 5 9-5",
  writing: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5ZM14 3v5h5M9 13h6M9 17h6",
  products: "M5 8h14l-1 12H6L5 8ZM9 8a3 3 0 0 1 6 0",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  about: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0",
};

function useSound() {
  const ctx = useRef(null);
  const [on, setOn] = useState(true);
  useEffect(() => {
    try {
      if (window.localStorage.getItem("sound") === "off") setOn(false);
    } catch {}
  }, []);
  const play = (freq = 660, len = 0.06) => {
    if (!on) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx.current = ctx.current || new AC();
      const c = ctx.current;
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = "sine";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.06, c.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + len);
      o.connect(g).connect(c.destination);
      o.start();
      o.stop(c.currentTime + len + 0.02);
    } catch {}
  };
  const toggle = () => {
    const next = !on;
    setOn(next);
    try {
      window.localStorage.setItem("sound", next ? "on" : "off");
    } catch {}
  };
  return { on, play, toggle };
}

function Icon({ name }) {
  const src = LORDICONS[name];
  if (src) return <lord-icon src={src} trigger="hover" style={{ width: 24, height: 24 }} />;
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d={PATHS[name]} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const LEFT = ["building", "writing", "products"];
const RIGHT = ["globe", "about"];

export default function TopNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { on, play, toggle } = useSound();

  useEffect(() => {
    if (!Object.values(LORDICONS).some(Boolean)) return;
    let alive = true;
    Promise.all([import("lottie-web"), import("lord-icon-element")]).then(([lottie, el]) => {
      if (alive) el.defineElement(lottie.default.loadAnimation);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      const k = e.key.toUpperCase();
      if (k === "M") {
        toggle();
        return;
      }
      const hit = NAV.find((n) => n.shortcut === k);
      if (hit) {
        e.preventDefault();
        play(740);
        router.push(hit.href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const item = (key) => {
    const n = NAV.find((x) => x.key === key);
    const current = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
    return (
      <Link
        key={key}
        href={n.href}
        className="dock-btn"
        aria-label={n.label}
        aria-current={current ? "page" : undefined}
        onClick={() => play(660)}
        onMouseEnter={() => play(520, 0.03)}
      >
        <Icon name={key} />
        <span className="dock-tip" aria-hidden="true">{n.label} <kbd>{n.shortcut}</kbd></span>
      </Link>
    );
  };

  const home = NAV.find((x) => x.key === "home");
  return (
    <nav className="dock" aria-label="Main">
      {LEFT.map(item)}
      <Link href="/" className="dock-me" aria-label={home.label} aria-current={pathname === "/" ? "page" : undefined} onClick={() => play(740)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sam.jpg" alt="" width="64" height="64" />
        <span className="dock-tip" aria-hidden="true">Home <kbd>H</kbd></span>
      </Link>
      {RIGHT.map(item)}
      <button type="button" className="dock-btn" onClick={toggle} aria-pressed={on} aria-label={on ? "Sound on, press to mute" : "Sound off, press to unmute"}>
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          {on ? (
            <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          ) : (
            <path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          )}
        </svg>
        <span className="dock-tip" aria-hidden="true">Sound <kbd>M</kbd></span>
      </button>
    </nav>
  );
}
