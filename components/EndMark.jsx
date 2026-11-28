// End of a single article or case study (owner, 28 Nov 2026: "we should know when the article ends", "mark end of
// single work and single article"): a hairline with "End of article" (or "End of case study") in its middle, then a short
// sign-off with Sam's face, who wrote it and when, and a way back to the top. No call to action here.
// A case study of a live product adds "Check live" (owner, 28 Nov 2026: "add check live button here and add ocufuse.com"),
// set by the work item's `live` address.
export default function EndMark({ kind = "article", date, minutes, live }) {
  const host = live ? live.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";
  const facts = [date ? `Published ${date}` : "", minutes ? `${minutes} min read` : ""].filter(Boolean).join(" · ");
  return (
    <div className="end-mark">
      <p className="end-rule"><span>End of {kind}</span></p>
      <div className="end-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sam-face-144.webp?v=1" width="48" height="48" alt="" loading="lazy" decoding="async" />
        <div className="end-txt">
          <p className="end-h">Thanks for reading</p>
          <p className="end-p">{kind === "article" ? "Written" : "Designed and written"} by Sam Vllaco, UI/UX and product designer.{facts ? ` ${facts}.` : ""}{host ? <> Live at <a href={live} target="_blank" rel="noopener">{host}</a>.</> : null}</p>
        </div>
        <div className="btn-row end-btns">
          {live ? (
            <a className="hero2-btn hero2-btn-primary" href={live} target="_blank" rel="noopener">
              Check live
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </a>
          ) : null}
          <a className="hero2-btn hero2-btn-light end-top" href="#intro">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
            Back to top
          </a>
        </div>
      </div>
    </div>
  );
}
