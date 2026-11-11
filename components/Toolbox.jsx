import fs from "fs";
import path from "path";

// Tools row that scrolls left to right. A tile shows the tool's logo when its official SVG is saved
// as public/tools/<id>.svg; until then it shows a monogram.
const TOOLS = [
  ["figma", "Figma"], ["figjam", "FigJam"], ["photoshop", "Photoshop"], ["illustrator", "Illustrator"], ["after-effects", "After Effects"],
  ["framer", "Framer"], ["webflow", "Webflow"], ["spline", "Spline"], ["blender", "Blender"], ["lottie", "Lottie"],
  ["notion", "Notion"], ["miro", "Miro"], ["maze", "Maze"], ["hotjar", "Hotjar"], ["claude", "Claude"],
  ["chatgpt", "ChatGPT"], ["cursor", "Cursor"], ["github", "GitHub"], ["tailwind", "Tailwind"], ["storybook", "Storybook"],
];

export default function Toolbox() {
  const has = (id) => { try { return fs.existsSync(path.join(process.cwd(), "public", "tools", `${id}.svg`)); } catch { return false; } };
  const tile = ([id, name], k) => (
    <li key={k}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <span className="tb-ico">{has(id) ? <img src={`/tools/${id}.svg`} width="28" height="28" alt="" /> : name.replace(/[^A-Z]/g, "").slice(0, 2) || name.slice(0, 2)}</span>
      <span className="tb-name">{name}</span>
    </li>
  );
  return (
    <div className="bx-card bx-tools tb" data-reveal>
      <p><b>Everyday toolbox</b><span>Used on every project.</span></p>
      <div className="tb-view">
        <ul className="tb-track">{TOOLS.map((t) => tile(t, t[0]))}</ul>
        <ul className="tb-track" aria-hidden="true">{TOOLS.map((t) => tile(t, `${t[0]}-2`))}</ul>
      </div>
    </div>
  );
}
