"use client";
import { useEffect, useState } from "react";
import { load, save, play } from "../lib/delight";

// Dark by default. The choice is remembered on this device.
export default function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => { setLight(load("theme", "dark") === "light"); }, []);
  function flip() {
    const next = !light;
    setLight(next);
    save("theme", next ? "light" : "dark");
    if (next) document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    window.dispatchEvent(new Event("sv:theme"));
    play("tab");
  }
  return (
    <button type="button" className="thm" onClick={flip} aria-pressed={light} aria-label={light ? "Switch to dark mode" : "Switch to light mode"} title={light ? "Dark mode" : "Light mode"}>
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.800" strokeLinecap="round">
        {light ? (
          <path d="M20 14.500A8 8 0 0 1 9.500 4a8 8 0 1 0 10.500 10.500z" strokeLinejoin="round" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.500v2M12 19.500v2M2.500 12h2M19.500 12h2M5.300 5.300l1.400 1.400M17.300 17.300l1.400 1.400M5.300 18.700l1.400-1.400M17.300 6.700l1.400-1.400" />
          </>
        )}
      </svg>
    </button>
  );
}
