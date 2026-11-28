"use client";
import CalFrame from "./CalFrame";
import CopyEmailInline from "./HirePanelCopy";
import { useRef } from "react";
import { loadGsap } from "../lib/gsapLoad";
import { usePathname } from "next/navigation";
import { BOOKING_URL, SITE } from "../lib/site";

/* Booking calendar shown above the footer on every page except /book, which has its own. */
// The QR opens with GSAP (owner, 28 Nov 2026: "open qr code with gsap animation, smooth"): the small code flies from its
// place in the row to the middle of the screen while it grows, the white card opens round it and the words follow;
// closing flies it back. Reduced motion opens and closes at once.
const calm = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export function BookAlt() {
  const dlg = useRef(null);
  const pic = useRef(null);
  const busy = useRef(false);
  const flight = (g) => {
    const d = dlg.current, from = pic.current?.querySelector("img"), to = d.querySelector(".qr-card img");
    const a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
    return { dx: a.left + a.width / 2 - (b.left + b.width / 2), dy: a.top + a.height / 2 - (b.top + b.height / 2), s: a.width / b.width, from, to, card: d.querySelector(".qr-card"), rest: d.querySelectorAll(".qr-card > :not(img)") };
  };
  const open = () => {
    const d = dlg.current; if (!d || d.open || busy.current) return;
    d.showModal();
    if (calm()) { d.classList.add("is-in"); return; }
    busy.current = true;
    loadGsap().then((g) => {
      requestAnimationFrame(() => d.classList.add("is-in"));
      if (!g) { busy.current = false; return; }
      const f = flight(g);
      f.from.style.visibility = "hidden";
      g.timeline({ onComplete: () => { g.set(f.card, { clearProps: "clipPath" }); busy.current = false; } })
        .fromTo(f.card, { opacity: 0, clipPath: "inset(22% 22% 40% 22% round 8px)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 8px)", duration: .65, ease: "expo.inOut" }, 0)
        .fromTo(f.to, { x: f.dx, y: f.dy, scale: f.s }, { x: 0, y: 0, scale: 1, duration: .7, ease: "expo.inOut" }, 0)
        .fromTo(f.rest, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .45, ease: "power3.out", stagger: .06 }, .35);
    });
  };
  const close = () => {
    const d = dlg.current; if (!d || !d.open || busy.current) return;
    const done = () => { d.classList.remove("is-in"); d.close(); const im = pic.current?.querySelector("img"); if (im) im.style.visibility = ""; busy.current = false; };
    if (calm()) { done(); return; }
    busy.current = true;
    loadGsap().then((g) => {
      if (!g) { done(); return; }
      const f = flight(g);
      d.classList.remove("is-in");
      g.timeline({ onComplete: () => { g.set([f.card, f.to, ...f.rest], { clearProps: "all" }); done(); } })
        .to(f.rest, { opacity: 0, y: 6, duration: .2, ease: "power2.in" }, 0)
        .to(f.to, { x: f.dx, y: f.dy, scale: f.s, duration: .55, ease: "expo.inOut" }, .05)
        .to(f.card, { opacity: 0, clipPath: "inset(22% 22% 40% 22% round 8px)", duration: .45, ease: "expo.inOut" }, .08);
    });
  };
  return (
    <div className="bb-alt">
      <div className="bb-alt-l">
        <p className="bb-alt-h"><b>Not a fan of calendars?</b> <span>Me neither. Just say hi.</span></p>
        <div className="bb-alt-row">
          <a className="bb-x" href={SITE.links.x} target="_blank" rel="me noopener noreferrer"><i className="tg-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path style={{ fill: "#fff", stroke: "none" }} d="M17.75 3h3.07l-6.71 7.67L22 21h-6.18l-4.84-6.33L5.44 21H2.37l7.18-8.2L2 3h6.34l4.37 5.78zm-1.08 16.2h1.7L7.4 4.73H5.58z" /></svg></i>Message me on X<span className="sr-only"> (opens in a new tab)</span></a>
          <CopyEmailInline icon />
        </div>
      </div>
      <figure className="bb-qr">
        {/* Small in the row; click opens it big in the middle of the screen for a clean scan. */}
        <button type="button" className="bb-qr-pic" ref={pic} onClick={open} aria-haspopup="dialog">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cal-qr.svg?v=1" width="96" height="96" alt="" loading="lazy" />
          <span className="sr-only">Show the booking QR code larger</span>
        </button>
        <figcaption><b>On your phone anyway?</b><span>Scan it and book in a minute. Click to enlarge.</span></figcaption>
      </figure>
      <dialog className="qr-dlg" ref={dlg} aria-labelledby="qr-dlg-h" onClick={(e) => { if (e.target === e.currentTarget) close(); }} onCancel={(e) => { e.preventDefault(); close(); }}>
        <div className="qr-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cal-qr.svg?v=1" width="280" height="280" alt="QR code that opens the booking calendar" loading="lazy" />
          <p id="qr-dlg-h" className="qr-h">Scan to book</p>
          <p className="qr-p">Point your phone camera at the code. My calendar opens on your phone.</p>
          <button type="button" className="hero2-btn hero2-btn-light" onClick={close}>Close</button>
        </div>
      </dialog>
    </div>
  );
}

export default function BookBand() {
  const path = usePathname() || "";
  // Not on single articles either (owner, 28 Nov 2026: "hide contact from single blog").
  if (!BOOKING_URL || path.startsWith("/book") || path.startsWith("/fix-ai-slop-ui") || (path.startsWith("/writing/") && path !== "/writing/")) return null;
  return (
    <section className="wrap book-band" id="book" aria-label="Book a call">
      <div className="book-cal">
        <CalFrame src={`${BOOKING_URL}?embed=true&theme=dark&layout=month_view&ui.color-scheme=dark`} />
      </div>
      <BookAlt />
    </section>
  );
}
