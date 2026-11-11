"use client";

// Floating pill that scrolls back to the top. Shown after the page has been scrolled.
export default function ToTop() {
  return (
    <button type="button" className="to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/sam.jpg" width="72" height="72" alt="" />
      <span>Sam Vllaco</span>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
    </button>
  );
}
