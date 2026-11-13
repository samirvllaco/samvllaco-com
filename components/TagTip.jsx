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
  if (!w) return <li><span className="tg-btn">{label}</span></li>;
  return (
    <li ref={me} className={`tg${open ? " is-open" : ""}`}>
      <button type="button" className="tg-btn" aria-expanded={open} aria-describedby={id} onClick={() => setOpen((v) => !v)}>
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
