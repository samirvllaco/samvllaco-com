"use client";
import CallIcon from "./CallIcon";
import { EMAIL, SITE } from "../lib/site";
import { useCopyChip } from "./CopyChip";

// Card with Sam's photo and ways to get in touch. `wide` lays it out in one row.
export default function HireCard({ wide = false }) {
  const { chip, live, start } = useCopyChip();
  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      start();
    } catch {}
  }
  return (
      <div className={`hire${wide ? " hire-wide" : ""}`}>
        <div className="hire-top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sam-face-144.webp?v=1" width="56" height="56" alt="Sam Vllaco" />
          <div>
            <p className="hire-name">Sam Vllaco</p>
            <p className="hire-status"><span className="avail-dot" aria-hidden="true" />Open to new projects</p>
          </div>
        </div>
        <p className="hire-text">Need a product designed like this? Tell me what you are building.</p>
        <a className="hero2-btn hero2-btn-primary hire-btn" href="/book/"><CallIcon />Book a call</a>
        <button type="button" className="hire-copy" onClick={copy}>
          <span>{EMAIL}</span>
          <span className="sr-only">Copy email</span>{chip}
        </button>
        {live}
        <a className="hire-x" href={SITE.links.x} rel="me noopener">Or message me on X</a>
      </div>
  );
}
