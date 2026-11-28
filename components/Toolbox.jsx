import fs from "fs";
import path from "path";
import ToolAll from "./ToolAll";

// Tools row that scrolls left to right. A tile shows the tool's logo when its official SVG is saved
// as public/tools/<id>.svg; tools without a file are left out.
const TOOLS = [
  ["figma", "Figma"], ["figjam", "FigJam"], ["photoshop", "Photoshop"], ["illustrator", "Illustrator"], ["after-effects", "After Effects"],
  ["framer", "Framer"], ["webflow", "Webflow"], ["spline", "Spline"], ["blender", "Blender"], ["lottie", "Lottie"],
  ["notion", "Notion"], ["miro", "Miro"], ["maze", "Maze"], ["hotjar", "Hotjar"], ["claude", "Claude"],
  ["chatgpt", "ChatGPT"], ["cursor", "Cursor"], ["github", "GitHub"], ["tailwind", "Tailwind"], ["storybook", "Storybook"],
];

// Bento tools cell (owner, 28 Nov 2026, after grafit.agency's partner tiles): the words and "See all" on the left,
// a loose stack of tilted app tiles on the right. The tilt is fixed; tiles never move on hover.
const FAN = ["figma", "photoshop", "illustrator", "after-effects", "framer", "webflow", "claude", "chatgpt"];
const TILT = [[-10, 6], [6, -4], [-4, 8], [9, -6], [-7, 4], [4, -8], [-9, 6], [7, -2]];
export default function Toolbox() {
  const svg = (id) => { try { return fs.readFileSync(path.join(process.cwd(), "public", "tools", `${id}.svg`), "utf8"); } catch { return ""; } };
  // Only tools with a real logo file are shown.
  const SHOWN = TOOLS.filter(([id]) => svg(id));
  const fan = FAN.map((id) => SHOWN.find((t) => t[0] === id)).filter(Boolean);
  return (
    <div className="bx2-c bx2-t tb">
      <div className="bx2-txt">
        <h3>Everyday toolbox</h3>
        <p>The tools I use on every project, from the first sketch to the handoff.</p>
        <ToolAll count={SHOWN.length}>
          <ul className="tb-grid">{SHOWN.map(([id, name]) => <li key={id}><span className="tb-ico" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg(id) }} /><span className="tb-name">{name}</span></li>)}</ul>
        </ToolAll>
      </div>
      <ul className="bt-fan" aria-label="Some of my tools">
        {fan.map(([id, name], i) => (
          <li key={id} style={{ "--r": `${TILT[i % TILT.length][0]}deg`, "--y": `${TILT[i % TILT.length][1]}px`, zIndex: i % 2 ? 2 : 1 }}>
            <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg(id) }} /><span className="sr-only">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
