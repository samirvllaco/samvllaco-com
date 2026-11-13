"use client";
import { useState } from "react";

// Two full prompts from the book, free to try. Text copied from PROMPTS.md (prompts 1 and 18).
const P = [
  ["1", "Audit your colors", "Audit the colors on this page. Do not change anything yet. List every color you find as a hex value, with where it is used and how many times. Then group them: backgrounds, surfaces, borders, text, accents, and status colors. Flag every gradient, every color used only once, every pair of colors that do the same job, and every color that carries meaning on its own with no label or icon. Check each text color against its background and list any pair under 4.5 to 1 contrast. Work out the split between neutral, secondary and accent colors and compare it with 60-30-10. Finish with one line: how many colors the page uses now, and how many it needs. Follow these UX laws: 60-30-10 color rule, Von Restorff effect, Contrast minimum (WCAG 1.4.3) and Color is not the only signal (WCAG 1.4.1)."],
  ["18", "Say what it does in ten words", "Rewrite the top of the page. One headline under 10 words that says what this does and who it is for. One sentence under it that says how. One main button that names the first thing the visitor does. Remove any second button. Show a real screenshot of the product. Follow these UX laws: Hick's law, Focal point, Inverted pyramid and Serial position effect."],
];

function Copy({ text }) {
  const [done, setDone] = useState(false);
  return (
    <button type="button" className="fp-copy" onClick={() => { navigator.clipboard?.writeText(text).then(() => { setDone(true); setTimeout(() => setDone(false), 1600); }).catch(() => {}); }}>
      {done ? "Copied" : "Copy prompt"}
    </button>
  );
}

export default function FreePrompts() {
  return (
    <section className="eb-sec fp" id="free" aria-labelledby="fp-h">
      <div className="fp-box">
      <span className="fp-free">Free</span>
      <h2 id="fp-h">Try 2 prompts <span className="t2">for free, right now</span></h2>
      <p className="eb-why-lede">Two full prompts from the book, exactly as they are inside. Copy one, paste it into Claude, Cursor, Lovable or v0, and <em className="scr">judge the quality yourself.</em></p>
      <div className="fp-list">
        {P.map(([n, t, text]) => (
          <article key={n}>
            <div className="fp-h"><span>Prompt {n}</span><h3>{t}</h3><Copy text={text} /></div>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <p className="fp-more">Liked these? There are 25 more inside, plus DESIGN.md and the private video.</p>
      </div>
    </section>
  );
}
