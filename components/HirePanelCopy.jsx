"use client";
import { useState } from "react";
import { EMAIL } from "../lib/site";

export default function CopyEmailInline() {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  }
  return (
    <button type="button" className="hp-copy" onClick={copy} aria-label={`Copy email address ${EMAIL}`}>
      <span>{EMAIL}</span><b role="status">{copied ? "Copied" : "Copy"}</b>
    </button>
  );
}
