import FootParallax from "./FootParallax";
import Link from "next/link";
import AskAI from "./AskAI";
import CopyEmail from "./CopyEmail";
import { SecretCount } from "./Seen";
import { SITE, CERTS } from "../lib/site";
import { SERVICES, svcHref } from "../lib/services";
import CallIcon from "./CallIcon";
import RouteHide, { RouteOnly } from "./RouteHide";
import ScreenWall from "./ScreenWall";
import { INDUSTRIES } from "../lib/industries";

// 16 point scalloped seal, drawn once and filled with a shared gold gradient
function sealPath() {
  const pts = [];
  for (let i = 0; i < 32; i++) {
    const r = i % 2 === 0 ? 23 : 20.2;
    const a = (Math.PI * 2 * i) / 32 - Math.PI / 2;
    pts.push(`${(24 + r * Math.cos(a)).toFixed(2)},${(24 + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}
const SEAL = sealPath();

// Certificates row is hidden for now. Set to true to show it again.
const SHOW_CERTS = false;

function Seal() {
  return (
    <svg className="seal" viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">
      <path d={SEAL} fill="url(#gold-g)" />
      <circle cx="24" cy="24" r="15" fill="none" stroke="#7a5614" strokeOpacity=".55" strokeWidth="1.2" />
      <circle cx="24" cy="24" r="13.4" fill="url(#gold-g2)" />
      <path d="M17.5 24.5l4.6 4.6 8.6-9.6" fill="none" stroke="#5c3f0c" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Link map: main pages one click from every page. Clean columns like v0: white headings, quiet links,
// an arrow on links that leave the site, icons on the social links.
const svc = (ids) => SERVICES.flatMap((g) => g.items).filter((it) => ids.includes(it.id)).map((it) => [{ "dashboard-design": "Dashboard design", "ux-audit": "UX audit" }[it.id] || it.name, `/services/${it.id}/`]);
const ICON = {
  x: "M17.75 3h3.07l-6.71 7.67L22 21h-6.18l-4.84-6.33L5.44 21H2.37l7.18-8.2L2 3h6.34l4.37 5.78zm-1.08 16.2h1.7L7.4 4.73H5.58z",
  medium: "M7 7a5 5 0 1 1 0 10A5 5 0 0 1 7 7zm8 .5c1.4 0 2.5 2 2.5 4.5s-1.1 4.5-2.5 4.5-2.5-2-2.5-4.5 1.1-4.5 2.5-4.5zm4.5.8c.6 0 1 1.7 1 3.7s-.4 3.7-1 3.7-1-1.7-1-3.7.4-3.7 1-3.7z",
  dribbble: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.6 4.6a8.5 8.5 0 0 1 1.9 5.2c-2.8-.6-5.3-.6-7.6-.1l-.7-1.6c2.6-1.1 4.8-2.2 6.4-3.5zM12 3.5c2 0 3.9.7 5.4 1.9-1.4 1.2-3.5 2.2-5.9 3.2-1.2-2.2-2.5-4-3.6-5a8.5 8.5 0 0 1 4.1-.1zM6.4 4.4c1.1.9 2.4 2.7 3.6 4.8-2.6.8-5.4 1.2-6.4 1.3a8.5 8.5 0 0 1 2.8-6.1zM3.5 12v-.1c1.3-.1 4.4-.5 7.2-1.4l.7 1.5c-3.1 1-5.6 3-7 5.3A8.4 8.4 0 0 1 3.5 12zm3.3 6.9c1.3-2 3.6-3.8 6.3-4.7.9 2.4 1.5 4.9 1.7 6.4a8.5 8.5 0 0 1-8-1.7zm9.4.8c-.3-1.6-.8-3.8-1.6-6 2-.3 4.2-.2 6.7.3a8.5 8.5 0 0 1-5.1 5.7z",
  figma: "M9 3h3v6H9a3 3 0 0 1 0-6zm3 0h3a3 3 0 0 1 0 6h-3zm-3 6h3v6H9a3 3 0 0 1 0-6zm6 0a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm-6 6h3v3a3 3 0 1 1-3-3z",
};
// One footer map (owner, 25 Nov 2026: "combine, it looks like 2x footer"): the brand column holds company and social links,
// then services grouped the way buyers search, work by industry and resources, and one closing call line.
const MAP = [
  { h: "Product design", links: [...svc(["saas-product-design", "dashboard-design", "mobile-app-design", "ai-product-ux"]), ["AI-built app design fix", svcHref("ai-app-design-fix")], ["Design systems", svcHref("design-systems")], ["UX audit", svcHref("ux-audit")], ["All services", "/services/"]] },
  { h: "Websites and growth", links: [["Website design", svcHref("website-design")], ["Landing pages", svcHref("landing-pages")], ["Conversion optimization", svcHref("conversion-optimization")], ["Website development", svcHref("website-development")], ["SEO audit", svcHref("seo-audit")], ["AI search visibility", svcHref("ai-search")]] },
  { h: "Accessibility and brand", links: [["EAA accessibility audit", "/eaa-audit/"], ["Managed accessibility", "/accessibility/"], ["Brand identity", svcHref("brand-identity")], ["Logo design", svcHref("logo-design")], ["Pitch deck design", svcHref("pitch-decks")]] },
  { h: "Work", links: [["B2B SaaS", "/work/marketing-dashboard/"], ["Marketplaces", "/work/freelance-marketplace/"], ["Fintech", "/work/mobile-banking/"], ["Health", "/work/eye-care-web-app/"], ["EdTech", "/work/language-player/"], ["E-commerce", "/work/supplements-store/"], ["Legal", "/work/law-firm-website/"], ["All case studies", "/work/"]] },
  { h: "Resources", links: [["Free UX audit", "/free-audit/", null, "Free"], ["Insights", "/writing/"], ["AI slop UI ebook", "/fix-ai-slop-ui/", null, "New"], ["UI/UX review", "/fix-ai-slop-ui/#options"], ["Slop Score", "/slop-score/", null, "New"], ["Free tools", "/tools/"], ["FAQs", "/#faq"], ["All resources", "/resources/"]] },
];
const COMPANY = [["About Sam", "/about/"], ["Start a project", "/book/"]];
const SOCIAL = [["X", SITE.links.x, "x", "@samvllaco", "https://x.com/intent/follow?screen_name=samvllaco"], ["Medium", SITE.links.medium, "medium", "@samvllaco", SITE.links.medium], ["Dribbble", SITE.links.dribbble, "dribbble", "samirvllaco", SITE.links.dribbble]];
// Five columns: services, who I work with, work, resources, and Sam with his social links.
const COLS = [
  { h: "Services", links: [...MAP[0].links.slice(0, 5), ["Website design", svcHref("website-design")], ["Landing pages", svcHref("landing-pages")], ["Conversion optimization", svcHref("conversion-optimization")], ["EAA accessibility audit", "/eaa-audit/"]] },
  { h: "Who I work with", links: INDUSTRIES.map((x) => [x.name, `/for/${x.id}/`]) },
  MAP[3],
  MAP[4],
  { h: "Sam", links: [...COMPANY, ...SOCIAL.map(([t, href, icon]) => [t, href, icon])] },
];

function FootMap() {
  return (
    <nav className="foot-map fo-cols" aria-label="Site map">
      {COLS.map((c) => (
        <div key={c.h}>
          <p className="foot-map-h">{c.h}</p>
          <ul>
            {c.links.map(([t, href, icon, tag]) => (
              <li key={t}><a href={href} {...(/^https?:/.test(href) ? { target: "_blank", rel: "me noopener" } : {})}>{icon ? <svg className="fm-ico" viewBox="0 0 24 24" aria-hidden="true"><path d={ICON[icon]} /></svg> : null}{t}{tag ? <span className="fm-new">{tag}</span> : null}{/^https?:/.test(href) ? <span className="sr-only"> (opens in a new tab)</span> : null}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

// Pages without the wall of screens at the foot: the lean pages.
// (Same list as LEAN in RouteHide.jsx; a "use client" module cannot hand plain values to this server file.)
const WALL_OFF = ["/tools/", "/slop-score/", "/book/", "/free-audit/", "/work/"];

export default function Footer() {
  return (
    <footer className="site-footer">
      <FootParallax />
      {/* Lean pages (free tools, contact, work, pricing): no portrait scene, no site map, no photo (see RouteHide). */}
      {/* The portrait scene shows only at the foot of the About page (owner, 27 Nov 2026: "remove from footer, add only on about") */}
      {/* The portrait scene (FootStage.jsx) is off everywhere (owner, 27 Nov 2026: "hide this from everywhere"). */}
      {/* The closing call over the wall of screens (owner, 27 Nov 2026). Lean pages and About keep the plain call below. */}
      <RouteHide on={WALL_OFF}>
        <ScreenWall cta={<>
          <h2 id="wall-h" className="wall-h">Work with the designer <span className="t2">who does the work</span></h2>
          <p className="wall-p">UI/UX and product design for SaaS, AI, fintech, health and law firms. One senior designer from the first call to the handover.</p>
          <div className="btn-row">
            <a className="hero2-btn hero2-btn-primary" href="/book/">Start a project<CallIcon /></a>
            <a className="hero2-btn hero2-btn-light" href="/work/">See my work</a>
          </div>
        </>} />
      </RouteHide>
      <div className="wrap">
        {SHOW_CERTS ? (
        <div className="certs" role="group" aria-label="Certificates">
          <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="gold-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fff0b3" />
                <stop offset=".35" stopColor="#e9b84a" />
                <stop offset=".7" stopColor="#b9801f" />
                <stop offset="1" stopColor="#f3cf6b" />
              </linearGradient>
              <linearGradient id="gold-g2" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffe9a0" />
                <stop offset=".5" stopColor="#e2ab3b" />
                <stop offset="1" stopColor="#fbe08a" />
              </linearGradient>
            </defs>
          </svg>
          <p className="certs-label">Certified</p>
          <ul>
            {CERTS.map((c) => {
              const label = `${c.title}, ${c.full || c.issuer}${c.year ? `, ${c.year}` : ""}`;
              const front = (
                <>
                  <Seal />
                  <span className="cert-front">
                    <span className="cert-title">{c.title}</span>
                    <span className="cert-sub">{c.issuer}{c.year ? ` · ${c.year}` : ""}</span>
                  </span>
                  <span className="cert-back">
                    <span className="cert-kind">{c.kind}</span>
                    <span className="cert-line">{c.full || c.issuer}</span>
                    {c.issued ? <span className="cert-line">Issued {c.issued}</span> : null}
                    {c.skills ? <span className="cert-line">Skill: {c.skills}</span> : null}
                    {c.href ? <span className="cert-verify">Verify certificate</span> : null}
                  </span>
                </>
              );
              return (
                <li key={c.title}>
                  {c.href ? (
                    <a className="cert" href={c.href} target="_blank" rel="noopener noreferrer" aria-label={`${label}. Verify certificate, opens in a new tab`}>{front}</a>
                  ) : (
                    <div className="cert" tabIndex={0} role="group" aria-label={label}>{front}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        ) : null}
        {/* Footer like grafit.agency, in our own look (owner, 27 Nov 2026: "clean, smaller sizes, more organized, divided with lines"):
            a top line with Sam and his availability, the call on the left and the site map on the right split by a hairline,
            then one bottom line with the copyright and the email. Lean pages keep only the call and the bottom line. */}
        <div className="fo">
          <RouteHide>
            <div className="fo-top">
              <a className="fo-brand" href="/about/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/sam-face-144.webp?v=1" width="32" height="32" alt="" loading="lazy" />
                <span><b>Sam Vllaco</b><span>UI/UX and product designer</span></span>
              </a>
              <p className="fo-live"><i aria-hidden="true" />1 to 2 new projects at a time <a href="/book/">Start a project</a></p>
            </div>
          </RouteHide>
          <div className="fo-body">
            <RouteOnly on={WALL_OFF.filter((p) => p !== "/book/")}>
              <div className="fo-lead">
                <p className="fo-h">Talk to the designer who does the work.</p>
                <p className="fo-p">UI/UX and product design for SaaS, AI, fintech, health and law firms. One senior designer from the first call to the handover.</p>
                <a className="hero2-btn hero2-btn-primary" href="/book/">Start a project<CallIcon /></a>
              </div>
            </RouteOnly>
            <RouteHide>
              <div className="fo-right">
                <FootMap />
                <AskAI inline name="Sam Vllaco" prompt="Tell me about Sam Vllaco, the product designer at samvllaco.com. What does he do, who does he work with and how do I hire him?" />
              </div>
            </RouteHide>
          </div>
          <div className="fo-bottom">
            <p>© {new Date().getFullYear()} Sam Vllaco<span className="foot-tagline">, your close design partner</span></p>
            <div className="foot-links"><CopyEmail /></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
