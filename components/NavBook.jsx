"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOOK_URL } from "../lib/site";

// Nav item for the book. Elsewhere it opens the internal book page.
// On the book page itself it becomes the buy button.
export default function NavBook() {
  const p = usePathname() || "";
  const here = p.replace(/\/$/, "") === "/ebook";
  if (here) {
    return (
      <a href={BOOK_URL} target="_blank" rel="noopener">
        Buy now <span className="top-badge">$6.99</span>
      </a>
    );
  }
  return (
    <Link href="/ebook/">
      Book <span className="top-badge">$6.99</span>
    </Link>
  );
}
