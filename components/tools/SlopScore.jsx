"use client";
import { useState } from "react";

// Each question is a sign of AI slop UI, with the fix that removes it.
const Q = [
  ["Purple or blue gradients on the hero, buttons or cards?", "Pick one brand color and use it only for the main action."],
  ["More than two font families on one page?", "Keep one family, two at most, and 2 to 3 weights."],
  ["Spacing values that are not on a 4 or 8 point scale?", "Use only 4, 8, 12, 16, 24, 32, 48 and 64."],
  ["Cards inside cards inside cards?", "Remove the inner borders and let spacing group things."],
  ["Gray text that is hard to read on its background?", "Raise body text to at least 4.5:1 contrast."],
  ["A hero headline that does not say what the product does?", "Say the outcome, for whom, and how fast, in under 10 words."],
  ["Emoji or random icons used as decoration?", "Use one icon set with one stroke weight, only where it helps."],
  ["Glows, blurs and drop shadows on almost everything?", "One soft shadow style for things that float, nothing else."],
  ["Buttons with no hover, focus or loading state?", "Design every state: hover, pressed, focus, disabled, loading."],
  ["Empty states that just say 'No data'?", "Explain what goes there and give one button to add it."],
  ["Two or more equal-looking buttons side by side?", "One filled primary button per screen, the rest quieter."],
  ["Touch targets smaller than a fingertip on phones?", "Make tap targets at least 44 by 44 pixels."],
];

export default function SlopScore() {
  const [a, setA] = useState({});
  const done = Object.keys(a).length;
  const yes = Object.values(a).filter(Boolean).length;
  const score = Math.round(((Q.length - yes) / Q.length) * 100);
  const label = score >= 85 ? "Looks designed" : score >= 60 ? "Some AI slop showing" : "Looks generated";
  return (
    <div className="tl-box ss-tool">
      <ol className="ss-list">
        {Q.map(([q], i) => (
          <li key={q}>
            <p>{q}</p>
            <div className="ss-btns" role="group" aria-label={q}>
              <button type="button" aria-pressed={a[i] === true} onClick={() => setA({ ...a, [i]: true })}>Yes</button>
              <button type="button" aria-pressed={a[i] === false} onClick={() => setA({ ...a, [i]: false })}>No</button>
            </div>
          </li>
        ))}
      </ol>
      <div className="ss-res" aria-live="polite">
        {done < Q.length ? <p className="ss-wait">{Q.length - done} questions left</p> : (
          <>
            <p className="ss-score"><b>{score}</b><span>/100</span></p>
            <p className="ss-label">{label}</p>
            {yes ? <><p className="ss-h">Fix these first</p><ul className="ss-fixes">{Q.map(([q, f], i) => (a[i] ? <li key={q}>{f}</li> : null))}</ul></> : <p>Clean. Your UI already avoids the common AI tells.</p>}
          </>
        )}
      </div>
    </div>
  );
}
