"use client";
import { useEffect, useState } from "react";
import { load, save, unlock, SECRETS } from "../lib/delight";
import { WORK } from "../lib/work";

function useStored(key, fallback) {
  const [v, setV] = useState(fallback);
  useEffect(() => {
    const read = () => setV(load(key, fallback));
    read();
    window.addEventListener("sv:change", read);
    return () => window.removeEventListener("sv:change", read);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return v;
}

export function useSeen() {
  return useStored("seen", []);
}

// On a case study: remember it was viewed and show reading progress.
export function SeenMarker({ slug }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const seen = load("seen", []);
    save("last", slug);
    if (!seen.includes(slug)) {
      const next = [...seen, slug];
      save("seen", next);
      if (WORK.every((w) => next.includes(w.slug))) {
        setTimeout(() => unlock("explorer", "Explorer unlocked", "You viewed every project. Thank you for looking."), 900);
      }
    }
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);
  return <div className="dl-read" aria-hidden="true"><span style={{ transform: `scaleX(${p})` }} /></div>;
}

// Above the work grid: how many case studies this visitor has opened.
export function WorkProgress() {
  const seen = useSeen();
  const n = WORK.filter((w) => seen.includes(w.slug)).length;
  const all = n === WORK.length;
  return (
    <p className={`work-prog${all ? " is-done" : ""}`} aria-label={`${n} of ${WORK.length} projects explored`}>
      <span className="work-prog-dots" aria-hidden="true">
        {WORK.map((w) => <i key={w.slug} className={seen.includes(w.slug) ? "on" : ""} />)}
      </span>
      <span>{all ? "All explored" : `${n} of ${WORK.length} explored`}</span>
    </p>
  );
}

export function SecretCount() {
  const got = useStored("secrets", []);
  const n = SECRETS.filter((s) => got.includes(s)).length;
  return (
    <p className="secrets" title="Three secrets are hidden on this site. One uses the arrow keys, one the logo, one the console.">
      Secrets found: {n} of {SECRETS.length}
    </p>
  );
}
