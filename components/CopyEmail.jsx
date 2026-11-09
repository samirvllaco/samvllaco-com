"use client";
import { useState } from "react";
import { EMAIL } from "../lib/site";

export default function CopyEmail() {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const r = document.createRange();
      r.selectNodeContents(document.getElementById("copy-email-text"));
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
    }
    setDone(true);
    setTimeout(() => setDone(false), 1800);
  }
  return (
    <button type="button" className="copy-email" onClick={copy} aria-label={`Copy email address ${EMAIL}`}>
      <span id="copy-email-text">{EMAIL}</span>
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        {done ? (
          <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7.5" />
        ) : (
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h8" /></g>
        )}
      </svg>
      <span className="copy-status" role="status">{done ? "Copied" : ""}</span>
    </button>
  );
}
