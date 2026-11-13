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
  { name: "27 Prompts book", href: "/ebook/", tag: "$6.99" },
  { name: "Digital kit", href: "/products/" },
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
      </button>
      <div id="mega-services" className="mega" hidden={!open}>
        <div className="wrap mega-in">
          {SERVICES.map((g) => (
            <div className="mega-col" key={g.id}>
              <Link prefetch={false} className="mega-title" href={`/services/#${g.id}`} onClick={() => setOpen(false)}>{g.title}</Link>
              <p className="mega-blurb">{g.blurb}</p>
              <ul>
                {g.items.filter((it) => !it.more).map((it) => (
                  <li key={it.id}><Link prefetch={false} href={`/services/${it.id}/`} onClick={() => setOpen(false)}>{it.name}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mega-col">
            <Link prefetch={false} className="mega-title" href="/writing/" onClick={() => setOpen(false)}>Resources</Link>
            <p className="mega-blurb">My book and the kit I use on my own products.</p>
            <ul>
              {RESOURCES.map((r) => (
                <li key={r.name}><Link prefetch={false} href={r.href} onClick={() => setOpen(false)}>{r.name}{r.tag ? <span className="mega-pdf mega-gold">{r.tag}</span> : null}</Link></li>
              ))}
            </ul>
          </div>
          <div className="mega-side">
            <p className="mega-side-title">Not sure what you need?</p>
            <p>Tell me about the product. I will suggest where design will help most.</p>
            <a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Book a call</a>
            <Link prefetch={false} className="mega-all" href="/services/" onClick={() => setOpen(false)}>All services <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </div>
    </span>
  );
}
