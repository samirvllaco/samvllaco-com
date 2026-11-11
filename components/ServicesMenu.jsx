"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CallIcon from "./CallIcon";
import { SERVICES } from "../lib/services";
import { EMAIL } from "../lib/site";

// "Services" in the header. Opens a wide panel on hover, click or keyboard.
// Add PDFs here as { name, href: "/resources/file.pdf", pdf: true } once the files are in public/resources.
const RESOURCES = [
  { name: "AI Slop UI: 25 UX fixes", href: "/writing/" },
  { name: "Digital products", href: "/products/" },
  { name: "Case studies", href: "/#work" },
  { name: "Questions founders ask", href: "/#faq" },
  { name: "Send a project brief", href: "/book/#write" },
];

export default function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  const timer = useRef(null);
  const path = usePathname();

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") {
        setOpen(false);
        wrap.current?.querySelector("button")?.focus();
      }
    }
    function onDown(e) {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const hoverable = () => window.matchMedia && window.matchMedia("(hover: hover) and (min-width: 981px)").matches;
  function enter() { if (hoverable()) { clearTimeout(timer.current); setOpen(true); } }
  function leave() { if (hoverable()) { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(false), 180); } }

  return (
    <span className="mega-wrap" ref={wrap} onMouseEnter={enter} onMouseLeave={leave}>
      <button type="button" className={`mega-btn${open ? " is-open" : ""}`} aria-expanded={open} aria-controls="mega-services" onClick={() => setOpen((v) => !v)}>
        Services
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>
      <div id="mega-services" className="mega" hidden={!open}>
        <div className="wrap mega-in">
          {SERVICES.map((g) => (
            <div className="mega-col" key={g.id}>
              <Link className="mega-title" href={`/services/#${g.id}`} onClick={() => setOpen(false)}>{g.title}</Link>
              <p className="mega-blurb">{g.blurb}</p>
              <ul>
                {g.items.map((it) => (
                  <li key={it.id}><Link href={`/services/${it.id}/`} onClick={() => setOpen(false)}>{it.name}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mega-col">
            <Link className="mega-title" href="/writing/" onClick={() => setOpen(false)}>Resources</Link>
            <p className="mega-blurb">Guides and tools from my own work.</p>
            <ul>
              {RESOURCES.map((r) => (
                <li key={r.href}><Link href={r.href} onClick={() => setOpen(false)}>{r.name}{r.pdf ? <span className="mega-pdf">PDF</span> : null}</Link></li>
              ))}
            </ul>
          </div>
          <div className="mega-side">
            <p className="mega-side-title">Not sure what you need?</p>
            <p>Tell me about the product. I will suggest where design will help most.</p>
            <a className="btn btn-primary" href="/book/"><CallIcon />Schedule a call</a>
            <Link className="mega-all" href="/services/" onClick={() => setOpen(false)}>All services <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </div>
    </span>
  );
}
