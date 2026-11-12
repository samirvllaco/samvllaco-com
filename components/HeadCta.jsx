"use client";
import { usePathname } from "next/navigation";
import CallIcon from "./CallIcon";
import { BOOK_URL } from "../lib/site";

// Main header button. On the book page it is the book purchase, everywhere else it books a call.
export default function HeadCta() {
  const p = usePathname() || "";
  if (p.replace(/\/$/, "") === "/ebook") {
    return (
      <a className="head-cta head-cta-book" href={BOOK_URL} target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>Download e-book</a>
    );
  }
  return <a className="head-cta" href="/book/"><CallIcon />Book a call</a>;
}
