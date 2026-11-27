// "One designer, end to end": the path from audit to growth as a rising curve (owner, 27 Nov 2026, after grafit.agency's
// growth system, in our own words and with no invented numbers). Pure SVG and CSS, no JS: the curve draws, a light runs
// along it and each stage's node lights as the light passes. It waits for the first interaction and pauses off screen
// (WidgetLoops sets .is-on on [data-loop]). The words never animate, so they keep full contrast.
const CURVE = "M0 400 C420 396 820 300 1200 72";
const STAGES = [
  { x: 150, y: 394.5, col: "UX audit", word: "Gaps", cap: "Found and ranked", tile: "Audit", t: 0.12 },
  { x: 450, y: 357.3, col: "UI design", word: "Screens", cap: "Designed in Figma", tile: "Design", t: 0.36 },
  { x: 750, y: 279.7, col: "Build", word: "Live", cap: "Built and shipped", tile: "Ship", t: 0.61 },
  { x: 1050, y: 154.7, col: "Growth", word: "Lift", cap: "Tested and measured", tile: "Measure", t: 0.87 },
];

export default function GrowthSystem() {
  return (
    <section className="gs" data-loop aria-labelledby="gs-h">
      <h2 id="gs-h">One designer, <span className="t2">end to end</span></h2>
      <div className="gs-art">
        <svg viewBox="0 0 1200 720" role="img" aria-labelledby="gs-desc">
          <desc id="gs-desc">Four stages along a rising curve: audit, where gaps are found and ranked; design, where the screens are designed in Figma; ship, where the work is built and shipped; and measure, where changes are tested and measured. All four run through one designer.</desc>
          <defs>
            <linearGradient id="gs-fade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset=".25" stopColor="#fff" stopOpacity=".6" />
              <stop offset="1" stopColor="#fff" />
            </linearGradient>
            <filter id="gs-glow" x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation="8" /></filter>
            <clipPath id="gs-face"><rect x="568" y="608" width="64" height="64" rx="10" /></clipPath>
          </defs>
          {[300, 600, 900].map((x) => <line key={x} className="gs-col" x1={x} y1="70" x2={x} y2="440" />)}
          {STAGES.map((s, i) => <text key={s.col} className="gs-k" x={i * 300 + 24} y="40">{s.col.toUpperCase()}</text>)}
          <path className="gs-glow" d={CURVE} filter="url(#gs-glow)" />
          <path className="gs-curve" d={CURVE} pathLength="1" stroke="url(#gs-fade)" />
          <path className="gs-run" d={CURVE} pathLength="1" />
          {STAGES.map((s, i) => (
            <g key={s.tile} className="gs-stage" style={{ "--i": i, "--t": s.t }}>
              <text className="gs-word" x={i * 300 + 24} y={s.y - 64}>{s.word}</text>
              <text className="gs-cap" x={i * 300 + 26} y={s.y - 36}>{s.cap.toUpperCase()}</text>
              <line className="gs-wire" x1={s.x} y1="486" x2={s.x} y2={s.y + 10} pathLength="1" />
              <circle className="gs-on" cx={s.x} cy={s.y} r="4" />
              <rect className="gs-tile" x={s.x - 100} y="486" width="200" height="64" rx="10" />
              <circle className="gs-node" cx={s.x} cy="486" r="4" />
              <text className="gs-tile-t" x={s.x} y="525" textAnchor="middle">{s.tile}</text>
              <path className="gs-tree" d={`M${s.x} 550 V${i < 2 ? 640 : 640} H${i < 2 ? 560 : 640}`} />
            </g>
          ))}
          <rect className="gs-hub" x="560" y="600" width="80" height="80" rx="12" />
          <image href="/sam-face-144.webp?v=1" x="568" y="608" width="64" height="64" clipPath="url(#gs-face)" />
          <text className="gs-hub-t" x="600" y="712" textAnchor="middle">ONE DESIGNER, END TO END</text>
        </svg>
      </div>
    </section>
  );
}
