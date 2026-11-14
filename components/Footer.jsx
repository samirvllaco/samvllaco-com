import Link from "next/link";
import AskAI from "./AskAI";
import CopyEmail from "./CopyEmail";
import FootStage from "./FootStage";
import { SecretCount } from "./Seen";
import { SITE, CERTS } from "../lib/site";
import { WORK } from "../lib/work";
import { SERVICES } from "../lib/services";

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
const MAP = [
  { h: "Services", links: [...svc(["saas-product-design", "dashboard-design", "mobile-app-design", "ux-audit", "design-systems", "website-design"]), ["All services", "/services/"]] },
  { h: "Work", links: [...WORK.slice(0, 5).map((w) => [w.title, `/work/${w.slug}/`]), ["All case studies", "/work/"]] },
  { h: "Resources", links: [["All resources", "/resources/"], ["Insights", "/writing/"], ["AI slop UI ebook", "/ebook/", null, "$6.99"], ["Free UI prompts", "/ebook/#free"], ["FAQs", "/#faq"], ["Products", "/products/"]] },
  { h: "Company", links: [["About Sam", "/about/"], ["Book a call", "/book/"], ["What I'm building", "/building/"]] },
  { h: "Social", links: [["X", SITE.links.x, "x"], ["Medium", SITE.links.medium, "medium"], ["Dribbble", SITE.links.dribbble, "dribbble"]] },
];
const Ext = () => <svg className="fm-ext" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>;

function FootMap() {
  return (
    <nav className="foot-map" aria-label="Site map">
      <div className="fm-brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sam-144.webp" width="40" height="40" alt="" loading="lazy" />
        <p><b>Sam Vllaco</b><span>Product designer for SaaS and AI products</span></p>
      </div>
      {MAP.map((c) => (
        <div key={c.h}>
          <p className="foot-map-h">{c.h}</p>
          <ul>
            {c.links.map(([t, href, icon, tag]) => (
              <li key={href}>
                {href.startsWith("http") ? (
                  <a href={href} target="_blank" rel="me noopener">{icon ? <svg className="fm-ico" viewBox="0 0 24 24" aria-hidden="true"><path d={ICON[icon]} /></svg> : null}{t}{icon ? null : <Ext />}<span className="sr-only"> (opens in a new tab)</span></a>
                ) : <a href={href}>{t}{tag ? <span className="mega-pdf mega-gold">{tag}</span> : null}</a>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <FootStage />
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
        <FootMap />
        <p>© {new Date().getFullYear()} Sam Vllaco<span className="foot-tagline">, your close design partner</span></p>
        <AskAI inline name="Sam Vllaco" prompt="Tell me about Sam Vllaco, the product designer at samvllaco.com. What does he do, who does he work with and how do I hire him?" />

        <div className="foot-links">
          <CopyEmail />
        </div>
      </div>
    </footer>
  );
}
