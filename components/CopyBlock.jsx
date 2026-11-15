"use client";
import { useState } from "react";

// A prompt or rules file the reader can copy in one click.
export default function CopyBlock({ text }) {
  const [done, setDone] = useState(false);
  function copy() {
    navigator.clipboard?.writeText(text).then(() => { setDone(true); setTimeout(() => setDone(false), 2000); }).catch(() => {});
  }
  return (
    <div className="art-code">
      <pre tabIndex={0}><code>{text}</code></pre>
      <button type="button" className="hero2-btn hero2-btn-light art-copy" onClick={copy}>{done ? "Copied" : "Copy"}<span className="sr-only"> this block</span></button>
      <span className="sr-only" role="status">{done ? "Copied to clipboard" : ""}</span>
    </div>
  );
}
