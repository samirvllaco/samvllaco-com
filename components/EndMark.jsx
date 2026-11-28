// End of a single article or case study (owner, 28 Nov 2026: "we should know when the article ends", "mark end of
// single work and single article"): a hairline with "End of article" (or "End of case study") in its middle, then a short
// sign-off with Sam's face, who wrote it and when, and a way back to the top. No call to action here.
export default function EndMark({ kind = "article", date, minutes }) {
  const facts = [date ? `Published ${date}` : "", minutes ? `${minutes} min read` : ""].filter(Boolean).join(" · ");
  return (
    <div className="end-mark">
      <p className="end-rule"><span>End of {kind}</span></p>
      <div className="end-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sam-face-144.webp?v=1" width="48" height="48" alt="" loading="lazy" decoding="async" />
        <div className="end-txt">
          <p className="end-h">Thanks for reading</p>
          <p className="end-p">{kind === "article" ? "Written" : "Designed and written"} by Sam Vllaco, UI/UX and product designer.{facts ? ` ${facts}.` : ""}</p>
        </div>
        <a className="hero2-btn hero2-btn-light end-top" href="#intro">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
          Back to top
        </a>
      </div>
    </div>
  );
}
