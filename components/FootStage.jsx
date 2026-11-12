import CallIcon from "./CallIcon";
import fs from "fs";
import path from "path";
import FootSeq from "./FootSeq";
import FootSig from "./FootSig";
import { SITE } from "../lib/site";

// Laptop animation frames, if any have been added to public/footer-frames.
let FRAMES = [];
try { FRAMES = fs.readdirSync(path.join(process.cwd(), "public", "footer-frames")).filter((f) => /\.(webp|png)$/.test(f)).sort().map((f) => `/footer-frames/${f}`); } catch {}

// Tall footer scene: Sam's portrait with a laptop and the things around his work day.
// Each object has a hotspot. Hover, focus or tap shows a short note about it.
// x, y, w, h are percentages of the image. place: where the note opens. align: which edge it hugs.
const SPOTS = [
  { id: "gym", x: 26.9, y: 16.2, w: 17, h: 15, place: "below", align: "start", title: "Gym", text: "Daily. It keeps the head clear." },
  { id: "figma", x: 19.5, y: 31, w: 11, h: 14.500, place: "above", align: "start", title: "Figma", text: "My daily design tool." },
  { id: "figjam", x: 26.2, y: 41, w: 16, h: 9, place: "below", align: "start", title: "FigJam", text: "Where the planning happens." },
  { id: "chatgpt", x: 80.1, y: 16.8, w: 12, h: 12, place: "below", align: "end", title: "ChatGPT", text: "Also in the toolbox." },
  { id: "coffee", x: 89.7, y: 27.5, w: 12.500, h: 10, place: "above", align: "end", title: "Coffee", text: "A product designer turns coffee into design." },
  { id: "claude", x: 82.1, y: 38.1, w: 11, h: 11, place: "below", align: "end", title: "Claude", text: "My daily AI tool." },
  { id: "ocufuse", x: 69.2, y: 64.2, w: 7, h: 7, place: "above", align: "center", title: "Ocufuse", text: "My side project for eye health.", href: SITE.links.ocufuse, cta: "Visit ocufuse.com" },
  { id: "ace", x: 12.8, y: 60.2, w: 8.500, h: 10, place: "above", align: "start", title: "Ace", text: "My dog. Head of morale." },
];

function Note({ s }) {
  return (
    <span className={`spot-note is-${s.place} is-${s.align}`} role="tooltip" id={`spot-${s.id}`}>
      <b>{s.title}</b>
      <span>{s.text}</span>
      {s.cta ? <em>{s.cta} <i aria-hidden="true">→</i></em> : null}
    </span>
  );
}

export default function FootStage() {
  return (
    <div className="foot-stage foot-photo">
      <p className="foot-tag" data-reveal aria-label="Your design partner">
        {[..."Your design partner"].map((c, i) => <span key={i} aria-hidden="true" style={{ "--i": i }}>{c === " " ? "\u00a0" : c}</span>)}
      </p>
      <p className="foot-call"><a className="hero2-btn hero2-btn-light" href="/book/"><CallIcon />Book a call</a></p>
      <div className="foot-photo-in">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sam-footer.webp" width="1254" height="1254" loading="lazy"
          alt="Sam Vllaco holding a laptop, with a dumbbell, design tool icons, a marker and a coffee cup floating around him" />
        <FootSig />
        {/* The same photo with the background removed, so the signature sits behind Sam. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {FRAMES.length > 1 ? <FootSeq frames={FRAMES} /> : <img className="foot-cut" src="/sam-footer-cut.webp" width="1254" height="1254" loading="lazy" alt="" aria-hidden="true" />}
        {SPOTS.map((s) => {
          const style = { left: `${s.x}%`, top: `${s.y}%`, width: `${s.w}%`, height: `${s.h}%` };
          return s.href ? (
            <a key={s.id} className="spot" style={style} href={s.href} target="_blank" rel="noopener noreferrer" aria-describedby={`spot-${s.id}`} aria-label={`${s.title}. ${s.text} Opens in a new tab`}>
              <Note s={s} />
            </a>
          ) : (
            <button key={s.id} type="button" className="spot" style={style} aria-describedby={`spot-${s.id}`} aria-label={s.title}>
              <Note s={s} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
