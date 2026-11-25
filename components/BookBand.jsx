"use client";
import CalFrame from "./CalFrame";
import CopyEmailInline from "./HirePanelCopy";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { BOOKING_URL, SITE } from "../lib/site";

/* Booking calendar shown above the footer on every page except /book, which has its own. */
export function BookAlt() {
  const dlg = useRef(null);
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
        <button type="button" className="bb-qr-pic" onClick={() => dlg.current?.showModal()} aria-haspopup="dialog">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cal-qr.svg?v=1" width="96" height="96" alt="" loading="lazy" />
          <span className="sr-only">Show the booking QR code larger</span>
        </button>
        <figcaption><b>On your phone anyway?</b><span>Scan it and book in a minute. Click to enlarge.</span></figcaption>
      </figure>
      <dialog className="qr-dlg" ref={dlg} aria-labelledby="qr-dlg-h" onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}>
        <div className="qr-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cal-qr.svg?v=1" width="280" height="280" alt="QR code that opens the booking calendar" loading="lazy" />
          <p id="qr-dlg-h" className="qr-h">Scan to book</p>
          <p className="qr-p">Point your phone camera at the code. My calendar opens on your phone.</p>
          <button type="button" className="hero2-btn hero2-btn-light" onClick={() => dlg.current?.close()}>Close</button>
        </div>
      </dialog>
    </div>
  );
}

export default function BookBand() {
  const path = usePathname() || "";
  if (!BOOKING_URL || path.startsWith("/book") || path.startsWith("/fix-ai-slop-ui")) return null;
  return (
    <section className="wrap book-band" id="book" aria-labelledby="book-band-h">
      <div className="book-band-head">
        <p className="case-eyebrow">Available for new projects</p>
        <h2 id="book-band-h">Tell me <span className="t2">what you are building</span></h2>
        <p className="bb-sub scr">No pitch. Just you, me and your product.</p>
      </div>
      <div className="book-cal">
        <CalFrame src={`${BOOKING_URL}?embed=true&theme=dark&layout=month_view`} />
      </div>
      <BookAlt />
    </section>
  );
}
