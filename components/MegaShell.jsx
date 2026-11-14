"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// A header item that opens a wide panel on hover, click or keyboard. children(close) renders the panel content.
export default function MegaShell({ id, label, href, children }) {
  const [open, setOpen] = useState(false);
  const [shut, setShut] = useState(false); // plays the short close animation before the panel is hidden
  const was = useRef(false);
  const handoff = useRef(false);
  const wrap = useRef(null);
  const timer = useRef(null);
  const path = usePathname();

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (open) {
      was.current = true; setShut(false);
      window.dispatchEvent(new CustomEvent("mega:open", { detail: id }));
      return;
    }
    if (!was.current) return;
    was.current = false;
    if (handoff.current) { handoff.current = false; setShut(false); return; }
    setShut(true);
    const t = setTimeout(() => setShut(false), 200);
    // Another menu opening hides this one at once, so the two never overlap.
    const other = (e) => { if (e.detail !== id) { clearTimeout(t); setShut(false); } };
    window.addEventListener("mega:open", other);
    return () => { clearTimeout(t); window.removeEventListener("mega:open", other); };
  }, [open, id]);
  // Moving from one menu to the next swaps them at once, with no close animation in between.
  useEffect(() => {
    const swap = (e) => { if (e.detail !== id && was.current) { clearTimeout(timer.current); handoff.current = true; setOpen(false); } };
    window.addEventListener("mega:open", swap);
    return () => window.removeEventListener("mega:open", swap);
  }, [id]);
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
      <div id={id} className={`mega mx${shut ? " is-closing" : ""}`} hidden={!open && !shut}>
        {children(close)}
      </div>
    </span>
  );
}
