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
      <div className="book-cover" aria-hidden="true"><b>AI Slop UI</b></div>
      <div className="book-copy">
        <p className="book-title">AI Slop UI book</p>
        <p className="book-sub">25 UX fixes · <b>$1</b></p>
      </div>
      <Link className="btn btn-primary" href="/products/">Get book</Link>
      <button className="book-close" type="button" onClick={close} aria-label="Close book offer">
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </aside>
  );
}
