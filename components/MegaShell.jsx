"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// A header item that opens a wide panel on hover, click or keyboard. children(close) renders the panel content.
export default function MegaShell({ id, label, children }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  const timer = useRef(null);
  const path = usePathname();

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") { setOpen(false); wrap.current?.querySelector("button")?.focus(); }
    }
    function onDown(e) { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false); }
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => { window.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); };
  }, [open]);

  const hoverable = () => window.matchMedia && window.matchMedia("(hover: hover) and (min-width: 981px)").matches;
  function enter() { if (hoverable()) { clearTimeout(timer.current); setOpen(true); } }
  function leave() { if (hoverable()) { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(false), 180); } }
  const close = () => setOpen(false);

  return (
    <span className="mega-wrap" ref={wrap} onMouseEnter={enter} onMouseLeave={leave}>
      <button type="button" className={`mega-btn${open ? " is-open" : ""}`} aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
        {label}
      </button>
      <div id={id} className="mega mx" hidden={!open}>
        {children(close)}
      </div>
    </span>
  );
}
