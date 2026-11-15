"use client";
import { useEffect } from "react";

// Hero quote of the day. First visit: "Good design is good business." Every day after that, the next
// quote from public/quotes.json (365 quotes on product design, UI/UX, AI and productivity).
// The inline script in app/page.jsx paints a cached quote before first paint; this fetches a new one
// once a day and slides it in. The box keeps its size, so nothing moves.
export const QUOTE_DAY = `(function(){try{var d=Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5),f=localStorage.getItem('sv-q0');if(f===null){localStorage.setItem('sv-q0',d);return}var c=JSON.parse(localStorage.getItem('sv-qd')||'null');if(c&&c.d===d&&d!==+f){var e=document.getElementById('hq');e.querySelector('.hq-t').textContent='\\u201c'+c.q+'\\u201d';e.querySelector('.hq-by').textContent=c.by;e.setAttribute('data-set','1')}}catch(e){}})()`;

export default function HeroQuote() {
  useEffect(() => {
    const el = document.getElementById("hq");
    if (!el || el.dataset.set) return;
    let d, f;
    try {
      d = Math.floor((Date.now() - new Date().getTimezoneOffset() * 6e4) / 864e5);
      f = localStorage.getItem("sv-q0");
    } catch { return; }
    if (f === null || +f === d) return;
    let gone = false;
    fetch("/quotes.json?v=1").then((r) => r.json()).then((all) => {
      if (gone || !all.length) return;
      const [q, by] = all[(((d - +f) % all.length) + all.length) % all.length];
      try { localStorage.setItem("sv-qd", JSON.stringify({ d, q, by })); } catch {}
      const t = el.querySelector(".hq-t"), b = el.querySelector(".hq-by");
      t.textContent = `“${q}”`; b.textContent = by;
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches && t.animate) {
        const o = { duration: 700, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" };
        t.animate([{ transform: "translateY(110%)" }, { transform: "none" }], o);
        b.animate([{ transform: "translateY(110%)" }, { transform: "none" }], { ...o, delay: 90 });
      }
    }).catch(() => {});
    return () => { gone = true; };
  }, []);
  return null;
}
