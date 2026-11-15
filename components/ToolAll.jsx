"use client";
import { useEffect, useRef, useState } from "react";

// "See all" for the toolbox: hover (or tap, or keyboard) opens a panel with every tool at once.
export default function ToolAll({ count, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const off = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const key = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", off);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("pointerdown", off); document.removeEventListener("keydown", key); };
  }, [open]);
  return (
    <div className={`tb-all${open ? " is-open" : ""}`} ref={ref}>
      <button type="button" className="hero2-btn hero2-btn-light" aria-expanded={open} aria-controls="tb-all-panel" onClick={() => setOpen((v) => !v)}>
        See all {count} tools
      </button>
      <div className="tb-all-panel" id="tb-all-panel" role="region" aria-label="All tools">{children}</div>
    </div>
  );
}
