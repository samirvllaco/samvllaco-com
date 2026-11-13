"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CallIcon from "./CallIcon";
import { SERVICES } from "../lib/services";

// "Services" in the header. Opens a wide panel on hover, click or keyboard.
// Add PDFs here as { name, href: "/resources/file.pdf", pdf: true } once the files are in public/resources.
const RESOURCES = [
  { name: "27 Prompts book", href: "/ebook/", tag: "$6.99" },
  { name: "Digital kit", href: "/products/" },
];

const ITEMS = SERVICES.flatMap((g) => g.items);
// [service id, icon path, one short line]
const FEATURED = [
  ["saas-product-design", "M4 5h16v11H4zM4 9h16M8 20h8M12 16v4", "Web apps, from first flow to final screen."],
  ["dashboard-design", "M4 20V10M10 20V4M16 20v-7M22 20H2", "Dense numbers people can read at a glance."],
  ["ai-product-ux", "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 1.5L21 18l-1.3.6L19 20l-.7-1.4L17 18l1.3-.5z", "Assistants that feel like part of the product."],
  ["mobile-app-design", "M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2", "iOS and Android with native patterns."],
  ["ux-audit", "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5 21 21M8 10.5l2 2 3-3.5", "What to fix first, then the redesign."],
  ["design-systems", "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM16.5 13a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z", "Tokens and components your AI tools follow."],
  ["website-design", "M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01", "Marketing sites that explain the product."],
  ["landing-pages", "M12 3v12M7 10l5 5 5-5M5 21h14", "One page, one message, one action."],
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
      <div id="mega-services" className="mega mx" hidden={!open}>
        <div className="wrap mx-in">
          <div className="mx-main">
            <p className="mx-k">What I design</p>
            <ul className="mx-grid">
              {FEATURED.map(([id, d, short]) => {
                const it = ITEMS.find((x) => x.id === id);
                if (!it) return null;
                return (
                  <li key={id}>
                    <Link prefetch={false} href={`/services/${id}/`} onClick={() => setOpen(false)}>
                      <i className="tg-ico mx-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={d} /></svg></i>
                      <span><b>{it.name}</b><em>{short}</em></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mx-more">
              <span>Also:</span>
              {SERVICES.map((g) => <Link prefetch={false} key={g.id} href={`/services/#${g.id}`} onClick={() => setOpen(false)}>{g.title}</Link>)}
              {RESOURCES.map((r) => <Link prefetch={false} key={r.name} href={r.href} onClick={() => setOpen(false)}>{r.name}{r.tag ? <span className="mega-pdf mega-gold">{r.tag}</span> : null}</Link>)}
            </div>
          </div>
          <aside className="mx-side">
            <div className="mx-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sam-sky.webp" width="1891" height="832" alt="Sam Vllaco, product designer" loading="lazy" decoding="async" />
              <span className="mx-live"><i aria-hidden="true" />1 to 2 new projects at a time</span>
            </div>
            <p className="mx-side-t">Not sure what you need?</p>
            <p className="mx-side-p">Tell me what you're building. In 30 minutes I'll point to the screens that will help most.</p>
            <a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Book a call</a>
          </aside>
          <Link prefetch={false} className="mx-all" href="/services/" onClick={() => setOpen(false)}>
            <span><b>All 32 services</b><em>Design, development, marketing and SEO</em></span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </Link>
        </div>
      </div>
    </span>
  );
}
