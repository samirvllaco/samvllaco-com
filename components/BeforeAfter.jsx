"use client";
import { useState } from "react";

// Before and after sliders. Gray placeholders until real screenshots from readers are added.
// To add a pair later, give it before and after image paths.
const PAIRS = [{ id: 1 }, { id: 2 }];

function Slider({ id, before, after }) {
  const [v, setV] = useState(50);
  return (
    <div className="ba-sl" style={{ "--p": `${v}%` }}>
      <div className="ba-layer ba-b">{before ? <img src={before} alt="" /> : <span>Before</span>}</div>
      <div className="ba-layer ba-a">{after ? <img src={after} alt="" /> : <span>After</span>}</div>
      <div className="ba-line" aria-hidden="true"><i /></div>
      <input type="range" min="0" max="100" value={v} onChange={(e) => setV(+e.target.value)} aria-label={`Compare before and after, example ${id}`} />
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section className="eb-sec ba" aria-labelledby="ba-h">
      <h2 id="ba-h">Before and <span className="t2">after</span></h2>
      <div className="ba-list">
        {PAIRS.map((p) => <Slider key={p.id} {...p} />)}
      </div>
    </section>
  );
}
