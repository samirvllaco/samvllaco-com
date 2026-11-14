"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// A header item that opens a wide panel on hover, click or keyboard. children(close) renders the panel content.
export default function MegaShell({ id, label, href, children }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  const timer = useRef(null);
  const path = usePathname();

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") { setOpen(false); wrap.current?.querySelector(".mega-btn")?.focus(); }
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
      {href ? (
        // A real link to the section page; hover (or ArrowDown on the keyboard) opens the panel.
        <Link prefetch={false} href={href} className={`mega-btn${open ? " is-open" : ""}`} aria-expanded={open} aria-controls={id}
          onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); requestAnimationFrame(() => wrap.current?.querySelector(`#${id} a`)?.focus()); } }}
          onClick={(e) => { if (!hoverable() && !open) { e.preventDefault(); setOpen(true); } else setOpen(false); }}>
          {label}
        </Link>
      ) : (
        <button type="button" className={`mega-btn${open ? " is-open" : ""}`} aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
          {label}
        </button>
      )}
      <div id={id} className="mega mx" hidden={!open}>
        {children(close)}
      </div>
    </span>
  );
}
