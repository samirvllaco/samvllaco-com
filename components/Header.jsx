import Link from "next/link";
import CallIcon from "./CallIcon";
import SoundToggle from "./SoundToggle";
import ServicesMenu from "./ServicesMenu";
import ResourcesMenu from "./ResourcesMenu";
import ToolsMenu from "./ToolsMenu";
import HeaderScroll from "./HeaderScroll";
import BrandFace from "./BrandFace";
import { EMAIL } from "../lib/site";
import HeadCta from "./HeadCta";
import MobileMenu from "./MobileMenu";

// Order (owner, 25 Nov 2026): Services, Pricing, Work, Resources, Free tools. Resources and Free tools only open their menus.
const NAV = [
  { href: "/pricing/", label: "Pricing" },
  { href: "/work/", label: "Work" },
  { href: "/tools/", label: "Free tools" },
  { href: "/about/", label: "About" },
  { href: "/book/", label: "Contact" },
];

export default function Header() {
  return (
    <header className="site-header">
      <HeaderScroll />
      <a className="top-note" href="/book/">
        <i className="nav-dot" aria-hidden="true" />
        <span className="tn-swap"><span className="tn-a">Low signups, confusing UX, a cheap-looking site? Book a 30-min call</span><span className="tn-b" aria-hidden="true">Book a 30-min strategy call</span></span>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
      <div className="wrap head-row">
        <Link prefetch={false} className="brand-me" href="/">
          <BrandFace />
          <span className="brand-word">Sam</span><span className="sr-only"> Vllaco, home</span>
        </Link>
        <nav className="head-nav" aria-label="Main">
          <ServicesMenu />
          {NAV.flatMap((n) => (n.href === "/tools/" ? [{ res: true }, n] : [n])).map((n) => n.res ? <ResourcesMenu key="res" /> : n.href === "/tools/" ? <ToolsMenu key={n.href} /> : (
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
