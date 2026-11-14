"use client";
import { useEffect, useRef, useState } from "react";
import { TAG_WORDS } from "../lib/tagWords";

// A review tag with a small 3D icon. Hover, focus or tap shows what it means, in Sam's words.
export default function TagTip({ label, id }) {
  const [open, setOpen] = useState(false);
  const me = useRef(null);
  const w = TAG_WORDS[label];
  useEffect(() => {
    if (!open) return;
    const off = (e) => { if (me.current && !me.current.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", off);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", off); document.removeEventListener("keydown", esc); };
  }, [open]);
  // Keep the note on screen: shift it left or right so it never crops at the viewport edge.
  const place = () => {
    const li = me.current; if (!li) return;
    const note = li.querySelector(".tg-note"); if (!note) return;
    const r = li.getBoundingClientRect(), nw = note.offsetWidth, vw = document.documentElement.clientWidth;
    let x = r.left;
    if (x + nw > vw - 16) x = vw - 16 - nw;
    if (x < 16) x = 16;
    note.style.left = `${Math.round(x - r.left)}px`;
    note.style.right = "auto";
    const ax = Math.max(14, Math.min(nw - 26, r.left + 22 - x));
    note.style.setProperty("--ax", `${Math.round(ax)}px`);
    note.style.transformOrigin = `${Math.round(ax + 6)}px 100%`;
  };
  // Once one note is showing, the next ones in the same row appear at once, so moving along the row feels quick.
  const warm = () => { const ul = me.current?.parentElement; if (!ul) return; clearTimeout(ul.__cool); ul.__warm = setTimeout(() => ul.classList.add("tg-warm"), 160); };
  const cool = () => { const ul = me.current?.parentElement; if (!ul) return; clearTimeout(ul.__warm); ul.__cool = setTimeout(() => ul.classList.remove("tg-warm"), 300); };
  if (!w) return <li><span className="tg-btn">{label}</span></li>;
  return (
    <li ref={me} className={`tg${open ? " is-open" : ""}`} onPointerEnter={() => { place(); warm(); }} onPointerLeave={cool} onFocus={place}>
      <button type="button" className="tg-btn" aria-expanded={open} aria-describedby={id} onClick={() => { place(); setOpen((v) => !v); }}>
        <i className="tg-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={w.d} /></svg></i>{label}
      </button>
      <span className="tg-note" role="tooltip" id={id}>
        <b>{label}</b>
        <span>{w.t}</span>
        <em className="scr">Sam</em>
      </span>
    </li>
  );
}
