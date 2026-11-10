"use client";
import { useEffect, useState } from "react";
import HireCard from "./HireCard";

// Sticky side column on case studies: a table of contents and a card to get in touch.
export default function CaseAside({ items }) {
  const [active, setActive] = useState(items[0]?.id);

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
      <HireCard />
    </aside>
  );
}
