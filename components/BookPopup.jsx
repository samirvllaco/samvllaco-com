"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BOOK_URL } from "../lib/site";
import Link from "next/link";

const KEY = "book-promo-closed-v2";

// Bottom right promo card. Opens the book checkout in a new tab.
export default function BookPopup() {
  const [open, setOpen] = useState(false);
  const path = usePathname() || "";

  useEffect(() => {
    let closed = false;
    try { closed = !!window.localStorage.getItem(KEY); } catch {}
    if (closed) return;
    // Show after the visitor starts scrolling, so the card never delays the first paint of the page.
    const on = () => { if (window.scrollY > 200) { setOpen(true); window.removeEventListener("scroll", on); } };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  function close() {
    setOpen(false);
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {}
  }

  if (!open || path.replace(/\/$/, "") === "/ebook") return null;
  return (
    <aside className="bk" aria-label="27 prompts to fix AI slop UI, $6.99">
      <a className="bk-link" href={BOOK_URL} target="_blank" rel="noopener">
        <span className="bk-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/book-cover.webp?v=2" width="300" height="400" alt="" />
          
        </span>
        <span className="bk-tag">$6.99</span>
        <span className="bk-tip"><b>My AI book</b><span>$6.99. 27 prompts to fix AI slop UI.</span></span>
      </a>
      <button className="bk-close" type="button" onClick={close} aria-label="Hide book offer">
        <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </aside>
  );
}
