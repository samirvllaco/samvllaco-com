"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOOK_URL } from "../lib/site";

// Nav item for the book. Elsewhere it opens the internal book page.
// On the book page itself it becomes the buy button.
function Book3D() {
  return (
    <span className="nb-book" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="nb-img" src="/nav-book.webp" width="20" height="29" alt="" />
    </span>
  );
}

export default function NavBook() {
  const p = usePathname() || "";
  const here = p.replace(/\/$/, "") === "/ebook";
  if (here) {
    return (
      <a href={BOOK_URL} target="_blank" rel="noopener">
        <Book3D />Buy now <span className="top-badge">$6.99</span>
      </a>
    );
  }
  return (
    <Link href="/ebook/">
      <Book3D />Book <span className="top-badge">$6.99</span>
    </Link>
  );
}
