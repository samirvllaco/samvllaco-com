import Link from "next/link";
import CallIcon from "./CallIcon";
import SoundToggle from "./SoundToggle";
import ServicesMenu from "./ServicesMenu";
import HeaderScroll from "./HeaderScroll";
import BrandFace from "./BrandFace";
import { EMAIL } from "../lib/site";
import HeadCta from "./HeadCta";
import MobileMenu from "./MobileMenu";

// Short nav (owner, 27 Nov 2026: "some items can be only on footer, nav can have a direct link to insights"): Services,
// Work, Insights and About. Free tools, the e-book and the other resources live in the footer; the button starts a project.
const NAV = [
  { href: "/work/", label: "Work" },
  { href: "/writing/", label: "Insights" },
  { href: "/about/", label: "About" },
];

export default function Header() {
  return (
    <header className="site-header">
      <HeaderScroll />
      <a className="top-note" href="/book/">
        <i className="nav-dot" aria-hidden="true" />
        <span className="tn-swap"><span className="tn-a">Low signups, confusing UX, a cheap-looking site? Start a project</span><span className="tn-b" aria-hidden="true">Start a project</span></span>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
      <div className="wrap head-row">
        <Link prefetch={false} className="brand-me" href="/">
          <BrandFace />
          <span className="brand-word">Sam</span><span className="sr-only"> Vllaco, home</span>
        </Link>
        <nav className="head-nav" aria-label="Main">
          <ServicesMenu />
          {NAV.map((n) => (
            <Link prefetch={false} key={n.href} href={n.href}>
              {n.dot ? <i className="nav-dot" aria-hidden="true" /> : null}
              {n.label}
              {n.badge ? <span className="top-badge">{n.badge}</span> : null}
            </Link>
          ))}
        </nav>
        <div className="head-end">
          <SoundToggle />
          <HeadCta />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
