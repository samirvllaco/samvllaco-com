"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { load, save } from "../lib/delight";
import { WORK } from "../lib/work";

function hello(h) {
  if (h >= 5 && h < 12) return "Good morning";
  if (h >= 12 && h < 18) return "Good afternoon";
  if (h >= 18 && h < 23) return "Good evening";
  return "Up late too";
}

// One line above the name. Greets by the visitor's own time and remembers where they left off.
export default function Greeting() {
  const [s, setS] = useState({ text: "Hello", last: null });
  useEffect(() => {
    const visits = load("visits", 0);
    let first = false;
    try {
      first = !window.sessionStorage.getItem("sv:session");
      window.sessionStorage.setItem("sv:session", "1");
    } catch {}
    if (first) save("visits", visits + 1);
    const returning = visits > 0;
    const last = WORK.find((w) => w.slug === load("last", null)) || null;
    const base = hello(new Date().getHours());
    setS({ text: returning ? `${base}, welcome back` : base, last });
  }, []);
  return (
    <p className="greet">
      <span>{s.text}</span>
      {s.last ? (
        <>
          <span aria-hidden="true"> · </span>
          <Link prefetch={false} href={`/work/${s.last.slug}/`}>Continue with {s.last.title}</Link>
        </>
      ) : null}
    </p>
  );
}

// Sam's local time next to his city, so visitors know if he is awake.
export function LocalTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat([], { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Tirane" });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return t ? <span className="loc-time"> · {t} my time</span> : null;
}

// Counts up once per session, without changing the width of the text.
export function CountUp({ to, suffix = "" }) {
  const [n, setN] = useState(to);
  useEffect(() => {
    let done = false;
    try {
      done = !!window.sessionStorage.getItem("sv:counted");
      window.sessionStorage.setItem("sv:counted", "1");
    } catch {}
    if (done || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    const t0 = performance.now();
    const from = Math.round(to * 0.9);
    let raf;
    (function frame(now) {
      const p = Math.min(1, (now - t0) / 1100);
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(from + (to - from) * e));
      if (p < 1) raf = requestAnimationFrame(frame);
    })(t0);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <b className="countup">{n.toLocaleString("en-US")}{suffix}</b>;
}
