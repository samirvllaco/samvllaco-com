import Link from "next/link";
import CallIcon from "./CallIcon";
import SoundToggle from "./SoundToggle";
import ServicesMenu from "./ServicesMenu";
import ThemeToggle from "./ThemeToggle";
import HeaderScroll from "./HeaderScroll";
import { EMAIL } from "../lib/site";

const NAV = [
  { href: "/work/", label: "Work", badge: "New" },
  { href: "/writing/", label: "Writing" },
  { href: "/about/", label: "About" },
  { href: "/book/", label: "Contact", dot: true },
];

export default function Header() {
  return (
    <header className="site-header">
      <HeaderScroll />
      <Link className="top-note" href="/ebook/">
        <span className="top-badge">Just $6.99</span>
        <span>I'm selling my book: 27 copy-paste prompts to fix AI slop UI</span>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </Link>
      <div className="wrap head-row">
        <Link className="brand-me" href="/" aria-label="Sam Vllaco, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-face" src="/sam.jpg" width="72" height="72" alt="" />
          <span className="brand-word">Sam</span>
        </Link>
        <nav className="head-nav" aria-label="Main">
          <ServicesMenu />
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.dot ? <i className="nav-dot" aria-hidden="true" /> : null}
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
