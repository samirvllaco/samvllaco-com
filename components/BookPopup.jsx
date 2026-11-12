"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "book-promo-closed-v2";

// Bottom right promo card. Design only: the button goes to /ebook/ until checkout exists.
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
    <aside className="bk" aria-label="27 prompts to fix AI slop UI, $1 promo">
      <Link className="bk-link" href="/ebook/">
        <span className="bk-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/book-cover.webp" width="300" height="400" alt="" />
          
        </span>
        <span className="bk-tag">$1</span>
        <span className="bk-tip"><b>My AI book</b><span>$1 promo. 27 prompts to fix AI slop UI.</span></span>
      </Link>
      <button className="bk-close" type="button" onClick={close} aria-label="Hide book offer">
        <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </aside>
  );
}
