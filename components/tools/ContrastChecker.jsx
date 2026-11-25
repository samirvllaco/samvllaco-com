"use client";
import { useMemo, useState } from "react";

const hex = (v) => { let s = v.trim().replace("#", ""); if (s.length === 3) s = s.split("").map((c) => c + c).join(""); return /^[0-9a-f]{6}$/i.test(s) ? "#" + s.toLowerCase() : null; };
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lum = (h) => { const [r, g, b] = rgb(h).map((c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const toHex = (c) => "#" + c.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
// Nudge the text color toward black or white until it reaches the target ratio.
function fix(fg, bg, target) {
  if (ratio(fg, bg) >= target) return fg;
  const dir = lum(bg) > 0.18 ? 0 : 255; const c = rgb(fg);
  for (let t = 0.02; t <= 1; t += 0.02) { const h = toHex(c.map((v) => v + (dir - v) * t)); if (ratio(h, bg) >= target) return h; }
  return dir ? "#ffffff" : "#000000";
}

// What each rule looks like in the chosen colors: body text, large text, or an icon with a control outline.
function Sample({ k, fg, bg }) {
  return (
    <span className={`cc-s cc-s-${k}`} style={{ color: fg, background: bg }} aria-hidden="true">
      {k === "u" ? (
        <>
          <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z" /></svg>
          <i className="cc-s-box" style={{ borderColor: fg }} />
          <i className="cc-s-tog" style={{ borderColor: fg }}><i style={{ background: fg }} /></i>
        </>
      ) : k === "l" ? "Large text" : "Body text at 16px"}
    </span>
  );
}

export default function ContrastChecker() {
  const [fgIn, setFg] = useState("#8e8e93");
  const [bgIn, setBg] = useState("#1c1c1e");
  const fg = hex(fgIn), bg = hex(bgIn);
  const r = useMemo(() => (fg && bg ? ratio(fg, bg) : null), [fg, bg]);
  const rows = r ? [["Normal text, AA", 4.5, "n"], ["Large text, AA", 3, "l"], ["Normal text, AAA", 7, "n"], ["Large text, AAA", 4.5, "l"], ["Icons and UI parts", 3, "u"]] : [];
  const sug = r && r < 4.5 ? fix(fg, bg, 4.5) : null;
  return (
    <div className="tl-box cc-tool">
      <div className="cc-ins">
        {[["Text color", fgIn, setFg, fg], ["Background", bgIn, setBg, bg]].map(([l, v, set, ok]) => (
          <label key={l}><span>{l}</span>
            <span className="cc-in"><input type="color" value={ok || "#000000"} onChange={(e) => set(e.target.value)} aria-label={`${l} picker`} /><input type="text" value={v} onChange={(e) => set(e.target.value)} spellCheck="false" aria-invalid={!ok} /></span>
          </label>
        ))}
      </div>
      <div className="cc-prev" style={{ color: fg || "#000", background: bg || "#fff" }}>
        <p className="cc-big">Large text 24px</p>
        <p>Normal body text at 16px. Can you read this comfortably?</p>
      </div>
      {r ? (
        <>
          <p className="cc-ratio" aria-live="polite"><b>{r.toFixed(2)}:1</b> contrast ratio</p>
          <ul className="cc-rows">{rows.map(([l, t, k]) => <li key={l} className={r >= t ? "ok" : "no"}><Sample k={k} fg={fg} bg={bg} /><span><span>{l}</span><span>needs {t}:1</span></span><b>{r >= t ? "Pass" : "Fail"}</b></li>)}</ul>
          {sug ? <p className="cc-sug">Closest passing text color for AA: <button type="button" onClick={() => setFg(sug)}><i style={{ background: sug }} />{sug}</button></p> : null}
        </>
      ) : <p className="cc-ratio">Enter two hex colors, like #1d1d1f.</p>}
    </div>
  );
}
