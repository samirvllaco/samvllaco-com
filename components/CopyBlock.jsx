"use client";
import useCopyMotion, { TICK_D, TICK_LEN } from "./useCopyMotion";

const COPY_D = "M9 9h11v11H9zM5 15H4V4h11v1";

// A prompt or rules file the reader can copy in one click, with the site's standard loading to success motion.
export default function CopyBlock({ text }) {
  const { refs, start, msg } = useCopyMotion({ status: "Copied to clipboard" });
  return (
    <div className="art-code">
      <pre tabIndex={0}><code>{text}</code></pre>
      <button ref={refs.box} type="button" className="fp-copy art-copy" onClick={() => { navigator.clipboard?.writeText(text).then(start).catch(() => {}); }}>
        <i ref={refs.fill} className="fp-c-fill" aria-hidden="true" />
        <span ref={refs.lbl} className="fp-c-lbl"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d={COPY_D} /></svg>Copy</span>
        <i ref={refs.spin} className="fp-c-spin" aria-hidden="true" />
        <span ref={refs.done} className="fp-c-done" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18"><path ref={refs.tick} d={TICK_D} style={{ strokeDasharray: TICK_LEN, strokeDashoffset: TICK_LEN }} /></svg>Copied</span>
        <span className="sr-only"> this block</span>
      </button>
      <span className="sr-only" role="status">{msg}</span>
    </div>
  );
}
