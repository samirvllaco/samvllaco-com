"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BOOK_URL } from "../lib/site";

const LINKS = [
  { href: "/services/", label: "Services" },
  { href: "/work/", label: "Work" },
  { href: "/writing/", label: "Insights" },
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
  useEffect(() => setReady(true), []);
  const onBook = path.replace(/\/$/, "") === "/ebook";

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    document.documentElement.classList.toggle("mm-open", open);
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.documentElement.classList.remove("mm-open"); };
  }, [open]);

  return (
    <>
      <button ref={btn} type="button" className="mm-btn" aria-expanded={open} aria-controls="mm-sheet" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
        <span aria-hidden="true" /><span aria-hidden="true" />
      </button>
      {ready ? createPortal(<div id="mm-sheet" className={`mm-sheet${open ? " is-open" : ""}`} hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {LINKS.map((l) => {
              const here = path.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link href={l.href} aria-current={here ? "page" : undefined} onClick={() => setOpen(false)}>
                    {l.dot ? <i className="nav-dot" aria-hidden="true" /> : null}
                    {l.label}
                    {l.tag ? <span className="top-badge">{l.tag}</span> : null}
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
      </div>, document.body) : null}
    </>
  );
}
