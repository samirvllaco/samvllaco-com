"use client";
import { useEffect, useRef } from "react";

// Makes a server-rendered tab row work: click, or arrow keys, Home and End, show the panel each tab controls
// (aria-controls) and hide the rest. Renders nothing visible.
export default function TabSwitch({ list }) {
  const ref = useRef(null);
  useEffect(() => {
    const row = ref.current && ref.current.parentElement && ref.current.parentElement.querySelector(list);
    if (!row) return;
    const tabs = [...row.querySelectorAll('[role="tab"]')];
    const pick = (t, focus) => {
      tabs.forEach((x) => {
        const on = x === t;
        x.setAttribute("aria-selected", on ? "true" : "false");
        x.tabIndex = on ? 0 : -1;
        x.classList.toggle("is-on", on);
        const p = document.getElementById(x.getAttribute("aria-controls"));
        if (p) p.hidden = !on;
      });
      if (focus) t.focus();
    };
    const click = (e) => { const t = e.target.closest('[role="tab"]'); if (t) pick(t, false); };
    const key = (e) => {
      const i = tabs.indexOf(document.activeElement), n = tabs.length;
      if (i < 0) return;
      const to = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
      if (to < 0) return;
      e.preventDefault();
      pick(tabs[to], true);
    };
    row.addEventListener("click", click);
    row.addEventListener("keydown", key);
    return () => { row.removeEventListener("click", click); row.removeEventListener("keydown", key); };
  }, [list]);
  return <span ref={ref} hidden />;
}
