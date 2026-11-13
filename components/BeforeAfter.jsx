"use client";
import { useState } from "react";

// Before and after sliders, one per niche. Sample products drawn for this page (fictional Acme brands).
// Left is a typical first AI draft, right is the same screen with the DESIGN.md rules applied.
const PAIRS = [
  { id: "site", label: "Marketing site", h: 1280, before: "/ebook/ba-before.webp?v=2", after: "/ebook/ba-after.webp?v=3", beforeAlt: "First AI draft of a sample invoicing site: gradient headline word, generic stats and six colorful icon cards", afterAlt: "The same site with the DESIGN.md rules: dotted dark background, purple 3D buttons, a clear headline, a real invoice screen and a bento grid" },
  { id: "dash", label: "SaaS dashboard", h: 900, before: "/ebook/ba-dash-before.webp?v=1", after: "/ebook/ba-dash-after.webp?v=1", beforeAlt: "First AI draft of a sample dashboard: four gradient stat tiles, rainbow bars, a pie chart and emoji everywhere", afterAlt: "The same dashboard with the rules: one big revenue number with a trend line, two quiet cards, one icon set and a calm table" },
  { id: "store", label: "Online store", h: 880, before: "/ebook/ba-store-before.webp?v=1", after: "/ebook/ba-store-after.webp?v=1", beforeAlt: "First AI draft of a sample product page: sale banner, colorful tags, three competing buttons and a countdown", afterAlt: "The same product page with the rules: a short headline, one price, one main button and three clear benefits" },
  { id: "app", label: "Mobile app", h: 920, before: "/ebook/ba-mob-before.webp?v=1", after: "/ebook/ba-mob-after.webp?v=1", beforeAlt: "First AI draft of a sample fitness app: gradient headers, emoji icons and colorful tiles on every screen", afterAlt: "The same fitness app with the rules: one progress ring, quiet stat cards, one main button and a clean workout list" },
];

function Slider({ label, h, before, after, beforeAlt, afterAlt }) {
  const [v, setV] = useState(50);
  return (
    <div className="ba-sl" style={{ "--p": `${v}%`, aspectRatio: `1280 / ${h}` }}>
      <div className="ba-layer ba-b"><img src={before} alt={beforeAlt} width="1280" height={h} loading="lazy" decoding="async" /><span>Before</span></div>
      <div className="ba-layer ba-a"><img src={after} alt={afterAlt} width="1280" height={h} loading="lazy" decoding="async" /><span>After</span></div>
      <div className="ba-line" aria-hidden="true"><i /></div>
      <input type="range" min="0" max="100" value={v} onChange={(e) => setV(+e.target.value)} aria-label={`Compare before and after: ${label}`} />
    </div>
  );
}

export default function BeforeAfter() {
  const [tab, setTab] = useState(PAIRS[0].id);
  const cur = PAIRS.find((p) => p.id === tab);
  return (
    <section className="eb-sec ba" aria-labelledby="ba-h">
      <div className="eb-cov-h"><h2 id="ba-h">Before and <span className="t2">after</span></h2><img className="eb-cov" src="/book-cover.webp?v=2" width="300" height="400" alt="" loading="lazy" aria-hidden="true" /></div>
      <p className="eb-why-lede">Four sample products in four niches. Left is the first AI draft, breaking every rule in DESIGN.md. Right is the same screen with the rules applied. <em className="scr">Drag to compare.</em></p>
      <div className="ba-tabs" role="tablist" aria-label="Pick a niche">
        {PAIRS.map((p) => (
          <button key={p.id} type="button" role="tab" id={`ba-t-${p.id}`} aria-selected={tab === p.id} aria-controls="ba-panel" onClick={() => setTab(p.id)}>{p.label}</button>
        ))}
      </div>
      <div className="ba-list" id="ba-panel" role="tabpanel" aria-labelledby={`ba-t-${tab}`}>
        <Slider key={cur.id} {...cur} />
      </div>
      <p className="ba-note">Sample products made for this page with fictional brands.</p>
    </section>
  );
}
