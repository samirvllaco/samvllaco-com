"use client";
import { useMemo, useState } from "react";
import CopyBlock from "../CopyBlock";

// DESIGN.md generator (28 Nov 2026): the template from /writing/design-md-template/, filled with the visitor's
// own values. Everything runs in the browser; nothing is sent anywhere.
const hex = (v) => { let s = v.trim().replace("#", ""); if (s.length === 3) s = s.split("").map((c) => c + c).join(""); return /^[0-9a-f]{6}$/i.test(s) ? "#" + s.toUpperCase() : null; };
const lum = (h) => { const [r, g, b] = [1, 3, 5].map((i) => { let c = parseInt(h.slice(i, i + 2), 16) / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

const TYPES = {
  dash: ["SaaS dashboard", `## Dashboard rules
- The first screen answers one question: the decision a user makes here.
- One headline number per dashboard, the largest text on the page, with its change against last period beside it.
- One trend chart and one table on the first screen. Everything else goes below the fold or into a detail page.
- Charts: --accent for the main series, --text-2 for comparison. No more than 3 series. Every chart has a date range the user can change.
- Tables: sticky header, sortable columns, a filter bar above, pagination of 50. Numbers right-aligned with tabular figures.
- New accounts see an empty state with one action that brings in their first data, never an empty chart.`],
  app: ["Web app", `## App rules
- Every screen exists for one action. That action is the only primary button on the screen.
- Navigation: a left sidebar with 5 to 7 items on desktop, a bottom bar or menu on phones. The current page is always marked.
- Forms: one column, labels above fields, the primary button at the end of the form.
- Settings and destructive actions sit apart from everyday actions. Delete always asks to confirm.`],
  land: ["Landing page", `## Landing page rules
- One page, one goal. That button is the only primary button on the page.
- Hero: a headline under 10 words on what the user gets, one line on how, the button, then proof (a number, logos or one quote).
- Sections in this order: problem, how it works in 3 steps, product shot, proof, next step, FAQ, final call.
- Text columns no wider than 680. Sections 96 apart on desktop.
- No stock photos of people. Show the product.`],
  mobile: ["Mobile app", `## Mobile rules
- Touch targets at least 44 by 44. Primary actions sit in the bottom third of the screen.
- One primary button per screen, full width, 16 from the screen edges.
- Tab bar with 3 to 5 items, icon and label, never icon alone.
- Respect safe areas. Nothing important within 16 of the screen edge.`],
};
const SHAPES = { sharp: ["Sharp", 4, 6], balanced: ["Balanced", 8, 12], round: ["Round", 12, 16] };
const THEMES = {
  light: ["Light", { text: "#0F172A", text2: "#475569", border: "#E2E8F0", bg: "#FFFFFF", surface: "#F8FAFC" }],
  dark: ["Dark", { text: "#F5F5F7", text2: "#A1A1AA", border: "#27272A", bg: "#0E0E10", surface: "#18181B" }],
};

function build({ product, type, accent, font, shape, theme }) {
  const t = THEMES[theme][1];
  const [, r1, r2] = SHAPES[shape];
  const onAccent = ratio(accent, "#FFFFFF") >= 4.5 ? "#FFFFFF" : "#0F172A";
  return `# DESIGN.md

Read this before any UI work. If a request would break a rule here, say which rule and ask first.

## Product
${product.trim() || "One sentence: who uses this app and the one job it does for them."}

## Spacing
- Scale: 4, 8, 12, 16, 24, 32, 48, 64. No other values.
- Inside cards and inputs: 16. Between cards: 24. Between page sections: 48 on mobile, 64 on desktop.
- A heading and its paragraph sit 8 apart. The next group starts 24 below.

## Type
- Family: ${font.trim() || "Inter"} for everything.
- Sizes: 12, 14, 16, 20, 24, 32, 48. No other sizes.
- Body 16/24. Secondary text 14/20. Page title 32/40.
- Weights: 400 for text, 600 for headings and buttons. Nothing heavier.

## Color
- --accent ${accent}: primary buttons, links, the active nav item and focus rings only. Text on the accent: ${onAccent}.
- --text ${t.text}, --text-2 ${t.text2}, --border ${t.border}, --bg ${t.bg}, --surface ${t.surface}.
- --danger #DC2626, --success #16A34A: only for errors and confirmations.
- No gradients. No second accent. Text keeps 4.5:1 contrast on its background.

## Shape
- Radius: ${r1} for buttons and inputs, ${r2} for cards and dialogs. Nothing else.
- Cards: 1px --border, no shadow. One shadow only, on menus and dialogs: 0 8px 24px rgba(0,0,0,.12).

## Components
- Buttons: one primary per screen, filled --accent. Secondary: --bg with a 1px --border. Height 40, padding 0 16.
- Every button has default, hover, focus (2px --accent ring, 2px offset), disabled and loading states.
- Inputs: visible label above, 40 high, error message under the field in --danger.
- Tables: numbers right-aligned with tabular figures, header row sticky, 48 row height.

## States
- Empty: one line saying what will appear here, one line on why it matters, one button with a verb and an object.
- Loading: a skeleton in the shape of the real layout. Nothing moves when the data arrives.
- Error: what happened, then how to fix it. No error codes in the message.
- Success: say what happened and what is next.

${TYPES[type][1]}

## Copy
- Buttons are a verb and an object: "Create invoice", never "Submit" or "Get started".
- Sentence case everywhere. No exclamation marks.

## Before you finish a task
List every rule from this file that the change touches, and confirm each one holds.
`;
}

function Seg({ legend, opts, value, set }) {
  return (
    <fieldset><legend>{legend}</legend>
      <div className="cc2-seg">{Object.entries(opts).map(([k, [l]]) => <button type="button" key={k} aria-pressed={value === k} onClick={() => set(k)}>{l}</button>)}</div>
    </fieldset>
  );
}

export default function DesignMdGen() {
  const [product, setProduct] = useState("");
  const [type, setType] = useState("dash");
  const [accIn, setAcc] = useState("#2563EB");
  const [font, setFont] = useState("Inter");
  const [shape, setShape] = useState("balanced");
  const [theme, setTheme] = useState("light");
  const accent = hex(accIn) || "#2563EB";
  const md = useMemo(() => build({ product, type, accent, font, shape, theme }), [product, type, accent, font, shape, theme]);
  const bgRatio = ratio(accent, THEMES[theme][1].bg);
  return (
    <div className="tl-box dm-tool">
      <div className="cc2-in">
        <label className="dm-f"><span>What does your product do, and for whom?</span>
          <span className="cc-in"><input type="text" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="An invoicing app that helps freelancers get paid faster." /></span>
        </label>
        <Seg legend="What are you building?" opts={TYPES} value={type} set={setType} />
        <div className="cc-ins">
          <label><span>Accent color</span>
            <span className="cc-in"><input type="color" value={accent} onChange={(e) => setAcc(e.target.value)} aria-label="Accent color picker" /><input type="text" value={accIn} onChange={(e) => setAcc(e.target.value)} spellCheck="false" aria-invalid={!hex(accIn)} /></span>
          </label>
          <label><span>Font</span>
            <span className="cc-in"><input type="text" value={font} onChange={(e) => setFont(e.target.value)} spellCheck="false" /></span>
          </label>
        </div>
        <Seg legend="Corners" opts={SHAPES} value={shape} set={setShape} />
        <Seg legend="Theme" opts={THEMES} value={theme} set={setTheme} />
        <p className="dm-note" aria-live="polite">{bgRatio >= 3 ? `Your accent has ${bgRatio.toFixed(1)}:1 contrast on the page background, enough for buttons and icons.` : `Your accent has only ${bgRatio.toFixed(1)}:1 contrast on the page background. Buttons and links need at least 3:1; pick a stronger color.`}</p>
      </div>
      <h2 className="dm-out-h">Your DESIGN.md</h2>
      <CopyBlock text={md} />
      <p className="dm-note">Save it as DESIGN.md in the root of your project, then tell your AI tool to read it before any UI work. <a href="/writing/design-md-template/">Where each tool reads it</a>.</p>
    </div>
  );
}
