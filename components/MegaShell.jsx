"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// A header item that opens a wide panel on hover, click or keyboard. children(close) renders the panel content.
export default function MegaShell({ id, label, href, children }) {
  const [open, setOpen] = useState(false);
  // shown: the panel is in the page. on: the panel sits in its open state. The panel moves with CSS transitions,
  // so opening and closing quickly reverses from wherever it is instead of jumping back to the start.
  const [shown, setShown] = useState(false);
  const [on, setOn] = useState(false);
  const hideT = useRef(null);
  const handoff = useRef(false);
  const wrap = useRef(null);
  const timer = useRef(null);
  const path = usePathname();

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (open) {
      clearTimeout(hideT.current); handoff.current = false;
      setShown(true);
      window.dispatchEvent(new CustomEvent("mega:open", { detail: id }));
      return;
    }
    setOn(false);
    if (handoff.current) { handoff.current = false; clearTimeout(hideT.current); setShown(false); return; }
    clearTimeout(hideT.current);
    hideT.current = setTimeout(() => setShown(false), 220);
  }, [open, id]);
  // Once the panel is in the page, read its layout first so the open transition always starts from the closed state.
  useLayoutEffect(() => {
    if (!open || !shown || on) return;
    const btn = wrap.current?.querySelector(".mega-btn"); const panel = document.getElementById(id);
    if (btn && panel) {
      const b = btn.getBoundingClientRect(); const pr = panel.getBoundingClientRect();
      if (pr.width) panel.style.setProperty("--mx-ox", `${Math.round(b.left + b.width / 2 - pr.left)}px`);
    }
    setOn(true);
  }, [open, shown, on, id]);
  useEffect(() => () => clearTimeout(hideT.current), []);
  // Moving from one menu to the next swaps them at once, with no close animation in between.
  useEffect(() => {
    const swap = (e) => { if (e.detail === id) return; clearTimeout(timer.current); clearTimeout(hideT.current); handoff.current = true; setOpen(false); setOn(false); setShown(false); };
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
      <div id={id} className={`mega mx${on ? " is-on" : ""}`} hidden={!shown}>
        {children(close)}
      </div>
    </span>
  );
}
