"use client";
import { useState } from "react";

// Before and after slider. Sample site drawn for this page; add reader screenshots as new pairs later.
// To add a pair later, give it before and after image paths.
const PAIRS = [{ id: 1, before: "/ebook/ba-before.webp?v=2", after: "/ebook/ba-after.webp?v=2", beforeAlt: "First AI draft of a sample invoicing site: default AI layout with a gradient headline word, generic stats and six colorful icon cards", afterAlt: "The same sample site with the DESIGN.md rules: dark gray base with a dotted fade, one blue accent, a clear headline and a real invoice screen" }];

function Slider({ id, before, after, beforeAlt, afterAlt }) {
  const [v, setV] = useState(50);
  return (
    <div className="ba-sl" style={{ "--p": `${v}%` }}>
      <div className="ba-layer ba-b">{before ? <img src={before} alt={beforeAlt} width="1280" height="1280" loading="lazy" decoding="async" /> : null}<span>Before</span></div>
      <div className="ba-layer ba-a">{after ? <img src={after} alt={afterAlt} width="1280" height="1280" loading="lazy" decoding="async" /> : null}<span>After</span></div>
      <div className="ba-line" aria-hidden="true"><i /></div>
      <input type="range" min="0" max="100" value={v} onChange={(e) => setV(+e.target.value)} aria-label={`Compare before and after, example ${id}`} />
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section className="eb-sec ba" aria-labelledby="ba-h">
      <h2 id="ba-h">Before and <span className="t2">after</span></h2>
      <p className="eb-why-lede">A sample marketing site, hero and first section. Left is the first AI draft, breaking every rule in DESIGN.md. Right is the same page with the rules applied. <em className="scr">Drag to compare.</em></p>
      <div className="ba-list">
        {PAIRS.map((p) => <Slider key={p.id} {...p} />)}
      </div>
    </section>
  );
}
