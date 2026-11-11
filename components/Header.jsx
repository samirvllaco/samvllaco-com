import Link from "next/link";
import CallIcon from "./CallIcon";
import SoundToggle from "./SoundToggle";
import ServicesMenu from "./ServicesMenu";
import ThemeToggle from "./ThemeToggle";
import { EMAIL } from "../lib/site";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/writing/", label: "Writing" },
  { href: "/about/", label: "About" },
  { href: "/book/", label: "Contact" },
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
          <span className="face-badge">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sam.jpg" width="40" height="40" alt="" />
          </span>
        </Link>
        <nav className="head-nav" aria-label="Main">
          <ServicesMenu />
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
              {n.badge ? <span className="top-badge">{n.badge}</span> : null}
            </Link>
          ))}
        </nav>
        <div className="head-end">
          <SoundToggle />
          <ThemeToggle />
          <a className="head-cta" href="/book/"><CallIcon />Schedule a call</a>
        </div>
      </div>
    </header>
  );
}
