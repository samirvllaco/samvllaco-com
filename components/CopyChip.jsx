"use client";
import useCopyMotion, { TICK_D, TICK_LEN } from "./useCopyMotion";

// The small "Copy" part inside an email pill, with the same loading to success motion as the prompt copy button.
export function useCopyChip(status = "Email copied") {
  const m = useCopyMotion({ pad: 22, loadMs: 550, status });
  const { box, lbl, spin, done, fill, tick } = m.refs;
  const chip = (
    <span ref={box} className="cc" aria-hidden="true">
      <i ref={fill} className="cc-fill" />
      <span ref={lbl} className="cc-lbl">Copy</span>
      <i ref={spin} className="cc-spin" />
      <span ref={done} className="cc-done"><svg viewBox="0 0 24 24" width="15" height="15"><path ref={tick} d={TICK_D} style={{ strokeDasharray: TICK_LEN, strokeDashoffset: TICK_LEN }} /></svg>Copied</span>
    </span>
  );
  const live = <span className="sr-only" role="status">{m.msg}</span>;
  return { chip, live, start: m.start };
}
