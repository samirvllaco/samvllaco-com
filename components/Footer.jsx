import Link from "next/link";
import AskAI from "./AskAI";
import CopyEmail from "./CopyEmail";
import FootStage from "./FootStage";
import { SecretCount } from "./Seen";
import { SITE, CERTS } from "../lib/site";

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
        <p>{SITE.name}. {SITE.tagline}</p>
        <AskAI inline name="Sam Vllaco" prompt="Tell me about Sam Vllaco, the product designer at samvllaco.com. What does he do, who does he work with and how do I hire him?" />

        <div className="foot-links">
          <a href={SITE.links.x} rel="me noopener">X</a>
          <a href={SITE.links.medium} rel="me noopener">Medium</a>
          <CopyEmail />
          <SecretCount />
        </div>
      </div>
    </footer>
  );
}
