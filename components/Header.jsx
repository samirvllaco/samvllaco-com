import Link from "next/link";
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sam.jpg" width="36" height="36" alt="" />
          <span>Sam Vllaco</span>
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
          <a className="head-cta" href={`mailto:${EMAIL}?subject=Project%20inquiry`}>Hire me</a>
        </div>
      </div>
    </header>
  );
}
