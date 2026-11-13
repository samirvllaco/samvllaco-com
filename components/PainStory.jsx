import CallIcon from "./CallIcon";

// Home page: the problems founders bring to Sam, then a short story and one next step.
export default function PainStory() {
  return (
    <section className="eb-sec eb-feel pain" aria-labelledby="pain-h" data-bg="#111112">
      <h2 id="pain-h">Sound <span className="t2">familiar?</span></h2>
      <ul className="eb-pains pain-seg">
        <li><i className="pain-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><defs><linearGradient id="pg-f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity=".2" /></linearGradient></defs><g stroke="url(#pg-f)"><path d="M12 15c-1.5-1-3-2.5-4-4 1.5-5 5.5-8 11-8 0 5.5-3 9.5-8 11zM8 11l-3.5-.5L7 8h3M13 16l.5 3.5L16 17v-3M6.5 17.5c-1 1-1.5 3-1.5 3s2-.5 3-1.5" /><circle cx="15" cy="9" r="1.5" /></g></svg></i><span>Startup founders</span><b>You've put everything into the idea. Make the first experience count.</b><em>Will people understand and use what we're building?</em></li>
        <li><i className="pain-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><defs><linearGradient id="pg-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity=".2" /></linearGradient></defs><g stroke="url(#pg-s)"><path d="M12 3 3 8l9 5 9-5zM3 12.5l9 5 9-5M3 17l9 5 9-5" /></g></svg></i><span>SaaS product teams</span><b>Your product is getting bigger. It shouldn't be getting harder to use.</b><em>Why is every release a little more confusing?</em></li>
        <li><i className="pain-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><defs><linearGradient id="pg-m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity=".2" /></linearGradient></defs><g stroke="url(#pg-m)"><path d="M4 10v4a1 1 0 0 0 1 1h2l5 4V5L7 9H5a1 1 0 0 0-1 1zM16 9a4 4 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11" /></g></svg></i><span>Marketing teams</span><b>People can't choose what they don't understand.</b><em>Why are visitors leaving without taking action?</em></li>
      </ul>
      <div className="eb-story">
        <p>You stayed up late to ship it. Friends said it looks great. Then real people landed on it, scrolled for five seconds and left, and nobody told you why.</p>
        <p>I've sat on both sides of that. For 10 years I've designed products in SaaS, fintech, health and AI, and I build my own with the same AI tools you use. The product is almost never the problem. <em className="scr">It just isn't clear yet.</em></p>
        <p>So I find what confuses people, fix the screens that cost you users, and leave you with a system that keeps it fixed. No agency, no handoffs. You talk to me from the first call to the last file.</p>
        <p className="eb-story-sign scr">Sam</p>
      </div>
      <p className="pain-cta"><a className="hero2-btn hero2-btn-primary" href="/book/"><CallIcon />Show me what you're building</a><span>30 minutes. You get a fixed price after the call.</span></p>
    </section>
  );
}
