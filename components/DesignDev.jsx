// Bento cell: design and front end (owner, 28 Nov 2026: "I want to make clear that I am a designer and ship front end,
// show this on the bento, that I design and develop"). Words on the left; on the right one small UI card goes through
// three panes: picked in a design file, written as code, then live in a browser. On phones the panes share one
// stage and wipe from one to the next. BentoRun.jsx plays it as one GSAP
// timeline (selection, code lines typing, the live card, a pointer pressing its button); without GSAP the end state shows.
const CODE = [
  [["t", "<Card>"]],
  [["s", "  "], ["t", "<h3>"], ["x", "Weekly report"], ["t", "</h3>"]],
  [["s", "  "], ["t", "<p>"], ["x", "Signups up 18%"], ["t", "</p>"]],
  [["s", "  "], ["t", "<Button "], ["a", "size"], ["t", "="], ["v", "\"lg\""], ["t", ">"]],
  [["s", "    "], ["x", "View report"]],
  [["s", "  "], ["t", "</Button>"]],
  [["t", "</Card>"]],
];

const Card = ({ live }) => (
  <div className={`dd-card${live ? " dd-card-live" : ""}`}>
    <b>Weekly report</b>
    <span>Signups up 18%</span>
    <em className="dd-btn">View report{live ? <i className="dd-ring" /> : <span className="dd-sel"><i /><i /><i /><i /><s>Button / Primary</s></span>}</em>
  </div>
);

export default function DesignDev() {
  return (
    <div className="bx2-c bx2-d dd">
      <div className="bx2-txt">
        <h3>I design it, then I build it</h3>
        <p>Most designers stop at Figma. I write the front end too, so the screens you approve are the screens your users get. No handoff gap, no pixel drift.</p>
        <ul className="dd-tags" aria-label="What I hand over">
          <li>Figma files</li>
          <li>Front-end code</li>
          <li>Design system in code</li>
        </ul>
      </div>
      <div className="dd-flow" aria-hidden="true">
        <figure className="dd-pane dd-design">
          <figcaption><i />Design</figcaption>
          <div className="dd-stage dd-canvas">
            <Card />
          </div>
        </figure>
        <span className="dd-link"><i /></span>
        <figure className="dd-pane dd-code">
          <figcaption><i />Code</figcaption>
          <div className="dd-stage">
            <pre>{CODE.map((ln, k) => (
              <span className={`dd-ln${k >= 3 && k <= 5 ? " dd-hl" : ""}`} key={k}>
                <span className="dd-no">{k + 1}</span>
                {ln.map(([c, t], j) => <span className={`dd-${c}`} key={j}>{t}</span>)}
              </span>
            ))}</pre>
          </div>
        </figure>
        <span className="dd-link"><i /></span>
        <figure className="dd-pane dd-live">
          <figcaption><i />Live</figcaption>
          <div className="dd-stage dd-browser">
            <div className="dd-bar"><i /><i /><i /><span>app.yourproduct.com</span></div>
            <div className="dd-page"><Card live /></div>
            <svg className="dd-cur" viewBox="0 0 24 24" width="20" height="20"><path d="M5 3.5 19 12l-6.2 1.6L9.6 19.5 5 3.5Z" fill="#111112" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg>
          </div>
        </figure>
      </div>
    </div>
  );
}
