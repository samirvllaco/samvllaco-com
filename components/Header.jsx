import Link from "next/link";
import CallIcon from "./CallIcon";
import SoundToggle from "./SoundToggle";
import { EMAIL } from "../lib/site";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/products/", label: "Products", badge: "New" },
  { href: "/writing/", label: "Writing" },
  { href: "/building/", label: "Building" },
  { href: "/about/", label: "About" },
  { href: "/links/", label: "Contact" },
];

export default function Header() {
  return (
    <header className="site-header">
      <Link className="top-note" href="/products/">
        <span className="top-badge">New</span>
        <span>AI Slop UI: 25 UX fixes for AI-built apps</span>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </Link>
      <div className="wrap head-row">
        <Link className="brand-me" href="/" aria-label="Sam Vllaco, home">
          <svg className="logo-mark" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
            <rect width="40" height="40" rx="9" fill="#f5f5f7" />
            <path d="M17.500 14.200c-.8-1.500-2.300-2.300-4.200-2.300-2.500 0-4.300 1.300-4.300 3.400 0 4.600 9 2.200 9 7.200 0 2.200-1.900 3.600-4.600 3.600-2.200 0-3.900-.9-4.800-2.600" fill="none" stroke="#111112" strokeWidth="2.600" strokeLinecap="round" />
            <path d="M21 12.200l5 13.600 5-13.600" fill="none" stroke="#111112" strokeWidth="2.600" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <nav className="head-nav" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
              {n.badge ? <span className="top-badge">{n.badge}</span> : null}
            </Link>
          ))}
        </nav>
        <div className="head-end">
          <SoundToggle />
          <a className="head-cta" href={`mailto:${EMAIL}?subject=Schedule%20a%20call`}><CallIcon />Schedule a call</a>
        </div>
      </div>
    </header>
  );
}
