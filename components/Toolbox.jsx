import fs from "fs";
import path from "path";

// Tools row that scrolls left to right. A tile shows the tool's logo when its official SVG is saved
// as public/tools/<id>.svg; tools without a file are left out.
const TOOLS = [
  ["figma", "Figma"], ["figjam", "FigJam"], ["photoshop", "Photoshop"], ["illustrator", "Illustrator"], ["after-effects", "After Effects"],
  ["framer", "Framer"], ["webflow", "Webflow"], ["spline", "Spline"], ["blender", "Blender"], ["lottie", "Lottie"],
  ["notion", "Notion"], ["miro", "Miro"], ["maze", "Maze"], ["hotjar", "Hotjar"], ["claude", "Claude"],
  ["chatgpt", "ChatGPT"], ["cursor", "Cursor"], ["github", "GitHub"], ["tailwind", "Tailwind"], ["storybook", "Storybook"],
];

export default function Toolbox() {
  const svg = (id) => { try { return fs.readFileSync(path.join(process.cwd(), "public", "tools", `${id}.svg`), "utf8"); } catch { return ""; } };
  // Only tools with a real logo file are shown.
  const SHOWN = TOOLS.filter(([id]) => svg(id));
  const tile = ([id, name], k) => (
    <li key={k}>
      <span className="tb-ico" dangerouslySetInnerHTML={{ __html: svg(id) }} />
      <span className="tb-name">{name}</span>
    </li>
  );
  return (
    <div className="bx-card bx-tools tb" data-reveal>
      <p><b>Everyday toolbox</b><span>Used on every project.</span></p>
      <div className="tb-view">
        <ul className="tb-track">{SHOWN.map((t) => tile(t, t[0]))}</ul>
        <ul className="tb-track" aria-hidden="true">{SHOWN.map((t) => tile(t, `${t[0]}-2`))}</ul>
      </div>
    </div>
  );
}
