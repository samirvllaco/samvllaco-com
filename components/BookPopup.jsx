"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { BOOK_URL } from "../lib/site";

// Book widget: tucked into the bottom left edge, slides out and grows on hover, focus or tap.
// Appears after the visitor starts scrolling, so it never slows the first paint.
export default function BookPopup() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  const ptr = useRef("");
  const path = usePathname() || "";

  useEffect(() => {
    const on = () => { if (window.scrollY > 200) { setShow(true); window.removeEventListener("scroll", on); } };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const out = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    const key = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", out);
    window.addEventListener("keydown", key);
    return () => { document.removeEventListener("pointerdown", out); window.removeEventListener("keydown", key); };
  }, [open]);

  if (!show || path.replace(/\/$/, "") === "/ebook") return null;
  return (
    <aside ref={box} className={`bw${open ? " is-open" : ""}`} aria-label="My book, 27 prompts to fix AI slop UI"
      onPointerEnter={(e) => { if (e.pointerType === "mouse") { clearTimeout(box.t); setOpen(true); } }} onPointerLeave={(e) => { if (e.pointerType === "mouse") { clearTimeout(box.t); box.t = setTimeout(() => setOpen(false), 220); } }}
      onFocus={(e) => { if (e.target.matches(":focus-visible")) setOpen(true); }} onBlur={(e) => { if (!box.current?.contains(e.relatedTarget)) setOpen(false); }}>
      <button type="button" className="bw-tab" aria-expanded={open} aria-controls="bw-card" onPointerDown={(e) => { ptr.current = e.pointerType; }}
        onClick={() => { if (ptr.current !== "mouse") setOpen((v) => !v); ptr.current = ""; }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/book-cover.webp?v=2" width="300" height="400" alt="" />
        <span className="bw-price">$6.99</span>
        <span className="sr-only">Show my book</span>
      </button>
      <div id="bw-card" className="bw-card">
        <p className="bw-k">My book</p>
        <p className="bw-t">27 copy-paste prompts to fix AI slop UI</p>
        <ul className="bw-l">
          <li>59 pages, one prompt per step</li>
          <li>DESIGN.md and 100 UX laws</li>
          <li>Bonus motion and UX prompts</li>
        </ul>
        <a className="hero2-btn hero2-btn-primary bw-buy" href={BOOK_URL} target="_blank" rel="noopener" tabIndex={open ? 0 : -1}>Buy for $6.99</a>
        <a className="bw-more" href="/ebook/" tabIndex={open ? 0 : -1}>See what's inside</a>
      </div>
    </aside>
  );
}
