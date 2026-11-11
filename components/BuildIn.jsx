"use client";
import { useEffect, useState } from "react";

// A sharp screen that builds in band by band, then hands over to the next screen.
const BANDS = 7;
export default function BuildIn({ screens, hold = 5200 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % screens.length), hold);
    return () => clearInterval(id);
  }, [screens.length, hold]);
  return (
    <div className="bi" key={i} aria-hidden="true">
      {Array.from({ length: BANDS }, (_, b) => (
        <span key={b} className="bi-band" style={{ top: `${(b * 100) / BANDS}%`, height: `${100 / BANDS + 0.2}%`, backgroundImage: `url(${screens[i]})`, backgroundPosition: `0 ${(b * 100) / (BANDS - 1)}%`, animationDelay: `${b * 90}ms` }} />
      ))}
    </div>
  );
}
