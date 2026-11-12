"use client";
import { useState } from "react";
import CallIcon from "./CallIcon";
import { EMAIL, SITE } from "../lib/site";

// Card with Sam's photo and ways to get in touch. `wide` lays it out in one row.
export default function HireCard({ wide = false }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }
  return (
      <div className={`hire${wide ? " hire-wide" : ""}`}>
        <div className="hire-top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sam.jpg" width="56" height="56" alt="Sam Vllaco" />
          <div>
            <p className="hire-name">Sam Vllaco</p>
            <p className="hire-status"><span className="avail-dot" aria-hidden="true" />Open to new projects</p>
          </div>
        </div>
        <p className="hire-text">Need a product designed like this? Tell me what you are building.</p>
        <a className="btn btn-primary hire-btn" href="/book/"><CallIcon />Book a call</a>
        <button type="button" className="hire-copy" onClick={copy} aria-label={`Copy email address ${EMAIL}`}>
          <span>{EMAIL}</span>
          <span className="hire-copied" role="status">{copied ? "Copied" : "Copy"}</span>
        </button>
        <a className="hire-x" href={SITE.links.x} rel="me noopener">Or message me on X</a>
      </div>
  );
}
