"use client";
import { usePathname } from "next/navigation";
import CallIcon from "./CallIcon";
import DownloadIcon from "./DownloadIcon";
import { BOOK_URL } from "../lib/site";

// Main header button. On the book page it is the book purchase, everywhere else it books a call.
export default function HeadCta() {
  const p = usePathname() || "";
  if (p.replace(/\/$/, "") === "/ebook") {
    return (
      <a className="head-cta head-cta-book" href={BOOK_URL} target="_blank" rel="noopener"><DownloadIcon />Download e-book</a>
    );
  }
  return <a className="head-cta" href="/book/"><CallIcon />Book a call</a>;
}
