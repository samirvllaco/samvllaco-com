"use client";
import { useEffect, useState } from "react";
import { EMAIL, SITE } from "../lib/site";

// Sticky side column on case studies: a table of contents and a card to get in touch.
export default function CaseAside({ items }) {
  const [active, setActive] = useState(items[0]?.id);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function onScroll() {
      let cur = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= 140) cur = it.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = items[items.length - 1].id;
      setActive(cur);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <aside className="case-aside">
      <nav className="case-toc" aria-label="On this page">
        <p className="case-toc-label">On this page</p>
        <ol>
          {items.map((it) => (
            <li key={it.id}>
              <a href={`#${it.id}`} aria-current={active === it.id ? "true" : undefined}>{it.label}</a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="hire">
        <div className="hire-top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sam.jpg" width="56" height="56" alt="Sam Vllaco" />
          <div>
            <p className="hire-name">Sam Vllaco</p>
            <p className="hire-status"><span className="avail-dot" aria-hidden="true" />Open to new projects</p>
          </div>
        </div>
        <p className="hire-text">Need a product designed like this? Tell me what you are building.</p>
        <a className="btn btn-primary hire-btn" href={`mailto:${EMAIL}?subject=Project%20inquiry`}>Hire me</a>
        <button type="button" className="hire-copy" onClick={copy} aria-label={`Copy email address ${EMAIL}`}>
          <span>{EMAIL}</span>
          <span className="hire-copied" role="status">{copied ? "Copied" : "Copy"}</span>
        </button>
        <a className="hire-x" href={SITE.links.x} rel="me noopener">Or message me on X</a>
      </div>
    </aside>
  );
}
