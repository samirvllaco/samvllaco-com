"use client";
import { useEffect, useState } from "react";
import { load, save, play } from "../lib/delight";

export default function SoundToggle() {
  const [on, setOn] = useState(false);
  useEffect(() => { setOn(load("sound", false) === true); }, []);
  function flip() {
    const next = !on;
    setOn(next);
    save("sound", next);
    if (next) play("on", true);
  }
  return (
    <button type="button" className="snd" aria-pressed={on} onClick={flip} aria-label={on ? "Turn sounds off" : "Turn sounds on"} title={on ? "Sounds on" : "Sounds off"}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M4 9.5h3.2L12 5.500v13L7.200 14.500H4z" fill="currentColor" />
        {on ? (
          <path d="M15.500 9a4.200 4.200 0 0 1 0 6M18 6.500a7.800 7.800 0 0 1 0 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        ) : (
          <path d="M16 9.500l5 5m0-5l-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        )}
      </svg>
    </button>
  );
}
