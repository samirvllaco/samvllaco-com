// The bento sphere's orbit (components/Bento.jsx renders the first frame, components/BentoRun.jsx moves it).
// Positions are in % of the stage (container query units), so the server and the client place the chips alike.
export const ORBIT_CHIPS = ["UX research", "UI design", "Design systems", "Prototypes", "Web apps", "Mobile apps", "Landing pages", "Front end"];
const RX = 42, RY = 21;
export function orbitAt(i, a, n = ORBIT_CHIPS.length) {
  const t = a + (i / n) * Math.PI * 2 + 0.3;
  const s = Math.sin(t);
  return { x: 50 + RX * Math.cos(t), y: 50 + RY * s, s, front: s > -0.05 };
}
export const orbitTf = ({ x, y, s }) => `translate(calc(${x.toFixed(2)}cqw - 50%), calc(${y.toFixed(2)}cqh - 50%)) scale(${(0.92 + 0.08 * s).toFixed(3)})`;
