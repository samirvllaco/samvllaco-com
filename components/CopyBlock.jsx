"use client";
import useCopyMotion, { TICK_D, TICK_LEN } from "./useCopyMotion";
import { copyText } from "../lib/copy";

const COPY_D = "M9 9h11v11H9zM5 15H4V4h11v1";

// The copy button with the site's standard loading to success motion. `pick(button)` returns the text to select when the clipboard is blocked.
export function CopyButton({ text, label = "Copy", status = "Copied to clipboard", className = "", extra = null, pick }) {
  const { refs, start, msg } = useCopyMotion({ status });
  return (
    <>
      <button ref={refs.box} type="button" className={`fp-copy ${className}`.trim()} onClick={(e) => { copyText(text, pick?.(e.currentTarget)).then((ok) => ok && start()); }}>
        <i ref={refs.fill} className="fp-c-fill" aria-hidden="true" />
        <span ref={refs.lbl} className="fp-c-lbl"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d={COPY_D} /></svg>{label}</span>
        <i ref={refs.spin} className="fp-c-spin" aria-hidden="true" />
        <span ref={refs.done} className="fp-c-done" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18"><path ref={refs.tick} d={TICK_D} style={{ strokeDasharray: TICK_LEN, strokeDashoffset: TICK_LEN }} /></svg>Copied</span>
        {extra}
      </button>
      <span className="sr-only" role="status">{msg}</span>
    </>
  );
}

// A prompt or rules file the reader can copy in one click.
export default function CopyBlock({ text }) {
  return (
    <div className="art-code">
      <pre tabIndex={0}><code>{text}</code></pre>
      <CopyButton text={text} className="art-copy" extra={<span className="sr-only"> this block</span>} pick={(b) => b.closest(".art-code").querySelector("code")} />
    </div>
  );
}
