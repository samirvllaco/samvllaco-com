import CallIcon from "./CallIcon";

// Home page: the problems founders bring to Sam, then a short story and one next step.
export default function PainStory() {
  return (
    <section className="eb-sec eb-feel pain pain2" aria-labelledby="pain-h" data-bg="#111112">
      <header className="pn-head">
        <h2 id="pain-h">Sound <span className="t2">familiar?</span></h2>
        <p className="pn-hook">You stayed up late to ship it. Friends said it looks great. Then real people landed on it, scrolled for five seconds and left, <em className="scr">and nobody told you why.</em></p>
      </header>
      <ul className="eb-pains pain-seg pn-cards">
        <li><i className="pain-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><defs><linearGradient id="pg-f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity=".2" /></linearGradient></defs><g stroke="url(#pg-f)"><path d="M12 15c-1.5-1-3-2.5-4-4 1.5-5 5.5-8 11-8 0 5.5-3 9.5-8 11zM8 11l-3.5-.5L7 8h3M13 16l.5 3.5L16 17v-3M6.5 17.5c-1 1-1.5 3-1.5 3s2-.5 3-1.5" /><circle cx="15" cy="9" r="1.5" /></g></svg></i><span>Startup founders</span><b>You've put everything into the idea. Make the first experience count.</b><em>Will people understand and use what we're building?</em></li>
        <li><i className="pain-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><defs><linearGradient id="pg-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity=".2" /></linearGradient></defs><g stroke="url(#pg-s)"><path d="M12 3 3 8l9 5 9-5zM3 12.5l9 5 9-5M3 17l9 5 9-5" /></g></svg></i><span>SaaS product teams</span><b>Your product is getting bigger. It shouldn't be getting harder to use.</b><em>Why is every release a little more confusing?</em></li>
        <li><i className="pain-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><defs><linearGradient id="pg-m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity=".2" /></linearGradient></defs><g stroke="url(#pg-m)"><path d="M4 10v4a1 1 0 0 0 1 1h2l5 4V5L7 9H5a1 1 0 0 0-1 1zM16 9a4 4 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11" /></g></svg></i><span>Marketing teams</span><b>People can't choose what they don't understand.</b><em>Why are visitors leaving without taking action?</em></li>
      </ul>
      {/* Three problems, one answer: the paths lead the eye from each card to the fix in the middle */}
      <svg className="pn-paths" viewBox="0 0 1200 140" preserveAspectRatio="none" aria-hidden="true">
        <path d="M200 0 C200 80 600 50 600 140" />
        <path d="M600 0 L600 140" />
        <path d="M1000 0 C1000 80 600 50 600 140" />
      </svg>
      <div className="pn-fix">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pn-me" src="/me/ai/ai6-tall.webp?v=1" width="800" height="999" alt="Sam Vllaco, product designer, explaining a design" loading="lazy" decoding="async" />
        <div className="pn-fix-copy">
          <p className="pn-k">The fix for all three</p>
          <h3>The product is almost never the problem. <span className="t2">It just isn't clear yet.</span></h3>
          <p>I've sat on both sides of that. For 10 years I've designed products in SaaS, fintech, health and AI, and I build my own with the same AI tools you use.</p>
          <ol className="pn-steps">
            <li><b>Find</b> what confuses people on your key screens.</li>
            <li><b>Fix</b> the screens that cost you users.</li>
            <li><b>Keep it fixed</b> with a system your team and your AI follow.</li>
          </ol>
          <p className="pn-me-line">The process of an agency, without the handoffs. You talk to me from the first call to the last file. <span className="pn-sign scr">Sam</span></p>
        </div>
        <div className="pn-cta">
          <a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Show me what you're building</a>
          <p className="pn-note">30-minute call. You get a fixed price after it.</p>
        </div>
      </div>
    </section>
  );
}
