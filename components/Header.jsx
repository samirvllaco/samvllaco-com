import Link from "next/link";
import { BOOK_URL } from "../lib/site";
import CallIcon from "./CallIcon";
import SoundToggle from "./SoundToggle";
import ServicesMenu from "./ServicesMenu";
import ThemeToggle from "./ThemeToggle";
import HeaderScroll from "./HeaderScroll";
import BrandFace from "./BrandFace";
import BrandRole from "./BrandRole";
import { EMAIL } from "../lib/site";
import NavBook from "./NavBook";
import HeadCta from "./HeadCta";
import MobileMenu from "./MobileMenu";

const NAV = [
  { href: "/work/", label: "Work" },
  { href: "/writing/", label: "Insights" },
  { href: "/ebook/", label: "Book", book: true },
  { href: "/about/", label: "About" },
  { href: "/book/", label: "Contact", dot: true },
];

export default function Header() {
  return (
    <header className="site-header">
      <HeaderScroll />
      <a className="top-note" href={BOOK_URL} target="_blank" rel="noopener">
        <span className="top-badge tn-new">New book</span>
        <span className="tn-swap"><span className="tn-a">I'm selling my book: 27 copy-paste prompts to fix AI slop UI</span><span className="tn-b" aria-hidden="true">Get your copy: fix your website</span></span>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
      <div className="wrap head-row">
        <Link prefetch={false} className="brand-me" href="/">
          <BrandFace />
          <span className="brand-word">Sam</span><span className="sr-only"> Vllaco, home</span>
          <BrandRole />
        </Link>
        <nav className="head-nav" aria-label="Main">
          <ServicesMenu />
          {NAV.map((n) => (
            n.book ? (
              <NavBook key={n.href} />
            ) : (
            <Link prefetch={false} key={n.href} href={n.href}>
              {n.dot ? <i className="nav-dot" aria-hidden="true" /> : null}
              {n.label}
              {n.badge ? <span className="top-badge">{n.badge}</span> : null}
            </Link>
            )
          ))}
        </nav>
        <div className="head-end">
          <SoundToggle />
          <ThemeToggle />
          <HeadCta />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
