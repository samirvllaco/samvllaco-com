"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "book-popup-closed";

// Bottom right promo card. Design only: the button goes to /products/ until checkout exists.
export default function BookPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  function close() {
    setOpen(false);
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {}
  }

  if (!open) return null;
  return (
    <aside className="book-pop" aria-label="AI Slop UI book">
      <button className="book-close" type="button" onClick={close} aria-label="Close">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      <div className="book-cover" aria-hidden="true">
        <span className="book-kicker">Book</span>
        <b>AI Slop UI</b>
        <span>25 UX fixes</span>
      </div>
      <div className="book-copy">
        <p className="book-title">AI Slop UI: 25 UX Fixes</p>
        <p className="book-sub">Copy-paste fixes for vibe-coded apps.</p>
        <div className="book-row">
          <b className="book-price">$1.99</b>
          <Link className="btn btn-primary" href="/products/">Get the book</Link>
        </div>
      </div>
    </aside>
  );
}
