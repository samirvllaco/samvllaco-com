"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BOOK_URL } from "../lib/site";

const LINKS = [
  { href: "/services/", label: "Services" },
  { href: "/work/", label: "Work" },
  { href: "/resources/", label: "Resources" },
  { href: "/ebook/", label: "E-book", tag: "$6.99" },
  { href: "/about/", label: "About" },
  { href: "/book/", label: "Contact", dot: true },
];

// Hamburger menu for phones and small tablets. The desktop nav is hidden at the same width.
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const path = usePathname() || "";
  const btn = useRef(null);
  const [ready, setReady] = useState(false);
  const [spot, setSpot] = useState(null);
  useEffect(() => setReady(true), []);
  const onBook = path.replace(/\/$/, "") === "/ebook";

  useEffect(() => { setOpen(false); }, [path]);
  // The close button sits exactly where the hamburger was, so the menu closes without moving the pointer or thumb.
  const place = () => { const r = btn.current?.getBoundingClientRect(); if (r) setSpot({ "--bx-t": `${r.top}px`, "--bx-l": `${r.left}px`, "--bx-s": `${r.width}px` }); };
  useEffect(() => {
    if (!open) return;
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [open]);
  useEffect(() => {
    document.documentElement.classList.toggle("mm-open", open);
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.documentElement.classList.remove("mm-open"); };
  }, [open]);

  return (
    <>
      <button ref={btn} type="button" className="mm-btn" aria-expanded={open} aria-controls="mm-sheet" aria-label="Open menu" onClick={() => { place(); setOpen(true); }}>
        <span aria-hidden="true" /><span aria-hidden="true" />
      </button>
      {ready ? createPortal(<div id="mm-sheet" className={`mm-sheet${open ? " is-open" : ""}${spot ? " has-spot" : ""}`} style={spot || undefined} hidden={!open} role="dialog" aria-modal="true" aria-label="Menu" onClick={(e) => { if (e.target === e.currentTarget) { setOpen(false); btn.current?.focus(); } }}>
        {/* Outside the panel, so the panel's drop-in motion never moves it */}
        <button type="button" className="mm-x" aria-label="Close menu" onClick={() => { setOpen(false); btn.current?.focus(); }}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <div className="mm-panel">
          <div className="mm-top">
            <span>Menu</span>
          </div>
          <nav aria-label="Mobile">
            <ul>
              {LINKS.map((l) => {
                const here = path.startsWith(l.href);
                return (
                  <li key={l.href}>
                    <Link prefetch={false} href={l.href} aria-current={here ? "page" : undefined} onClick={() => setOpen(false)}>
                      {l.dot ? <i className="nav-dot" aria-hidden="true" /> : null}
                      {l.label}
                      {l.tag ? <span className="top-badge">{l.tag}</span> : null}
                      <svg className="mm-arr" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mm-cta">
            {onBook
              ? <a className="hero2-btn hero2-btn-primary" href={BOOK_URL} target="_blank" rel="noopener">Buy the e-book for $6.99</a>
              : <a className="hero2-btn hero2-btn-primary" href="/book/">Book a call</a>}
          </div>
        </div>
      </div>, document.body) : null}
    </>
  );
}
