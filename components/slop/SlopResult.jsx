"use client";
import { useEffect, useState } from "react";
import CallIcon from "../CallIcon";
import CopyBlock, { CopyButton } from "../CopyBlock";
import { copyText } from "../../lib/copy";
import { useTurnstile, track } from "./useTurnstile";
import { CATS, SLOP } from "../../slopscore/config";
import { PERSONAL_REVIEW_URL, REVIEW_URL, LEADS_ENDPOINT } from "../../lib/site";
import { usd } from "../../lib/plans";

const NAME = Object.fromEntries(CATS.map((c) => [c.k, c.name]));
const TOOL = "https://samvllaco.com/slop-score/";
const idFromUrl = () => (location.pathname.match(/\/slop-score\/r\/([A-Za-z0-9]{10})/) || [])[1] || new URLSearchParams(location.search).get("id") || "";
const when = (iso) => { try { return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }); } catch { return ""; } };

function Issue({ x, open }) {
  return (
    <li className={`sx-issue is-${x.severity || "medium"}`}>
      <p className="sx-sev"><span>{x.severity === "high" ? "High impact" : x.severity === "low" ? "Low impact" : "Medium impact"}</span>{NAME[x.category] || ""}{x.effort_minutes ? ` · about ${x.effort_minutes} min` : ""}</p>
      <h3>{x.title}</h3>
      <p><b>What's wrong:</b> {x.wrong}</p>
      <p><b>Why it matters:</b> {x.why}</p>
      <p><b>The fix:</b> {x.fix}</p>
      {x.prompts ? (
        <details className="sx-prompts" open={open}>
          <summary>Copy-paste prompts</summary>
          {[["lovable", "Lovable"], ["cursor", "Cursor"], ["claude_code", "Claude Code"]].map(([k, n]) => (x.prompts[k] ? <div key={k}><p className="sx-ptool">{n}</p><CopyBlock text={x.prompts[k]} /></div> : null))}
        </details>
      ) : null}
    </li>
  );
}

export default function SlopResult() {
  const [id, setId] = useState("");
  const [r, setR] = useState(null);
  const [state, setState] = useState("loading"); // loading | ok | missing | error
  const [paying, setPaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState({});
  const [mail, setMail] = useState({ email: "", consent: false, sent: false, sending: false, msg: "" });
  const ts = useTurnstile(r && !r.unlocked && status.siteKey ? status.siteKey : null);

  useEffect(() => {
    const i = idFromUrl(); setId(i);
    if (!i) { setState("missing"); return; }
    try { const c = sessionStorage.getItem(`ss:${i}`); if (c) { setR(JSON.parse(c)); setState("ok"); } } catch { /* optional */ }
    fetch("/api/slop-score/status").then((x) => x.json()).then(setStatus).catch(() => {});
    const load = () => fetch(`/api/slop-score/report/${i}`).then((x) => (x.ok ? x.json() : Promise.reject(x.status)));
    load().then((j) => { setR(j); setState("ok"); if (new URLSearchParams(location.search).get("paid") && !j.unlocked) poll(); })
      .catch((code) => setState(code === 404 ? "missing" : "error"));
    // After checkout, Whop's webhook unlocks the report. Wait for it for up to 20 seconds.
    function poll() {
      setPaying(true);
      let n = 0;
      const t = setInterval(() => {
        n++;
        load().then((j) => { if (j.unlocked || n >= 10) { clearInterval(t); setPaying(false); setR(j); } }).catch(() => { if (n >= 10) { clearInterval(t); setPaying(false); } });
      }, 2000);
    }
    const open = () => document.querySelectorAll(".sx-prompts").forEach((d) => { d.open = true; });
    addEventListener("beforeprint", open);
    return () => removeEventListener("beforeprint", open);
  }, []);

  if (state === "loading") return <p className="sx-msg" aria-live="polite">Loading your report…</p>;
  if (state === "missing") return <div className="sx-msg"><p>I couldn't find that report. Reports live for good once made, so the link may be mistyped.</p><p><a className="hero2-btn hero2-btn-primary" href="/slop-score/">Check a site</a></p></div>;
  if (state === "error" || !r) return <div className="sx-msg"><p>The report didn't load. Try again in a minute.</p><p><a className="hero2-btn hero2-btn-primary" href="/slop-score/">Check a site</a></p></div>;

  const cats = [...r.categories].sort((a, b) => b.score - a.score);
  const shareText = `My site got a Slop Score of ${r.score}/100 (lower is better). Check yours: ${TOOL}`;
  const pageUrl = `https://samvllaco.com/slop-score/r/${r.id}`;

  // Email gate: the full report unlocks on the page at once and goes out by email.
  const sendMail = async (e) => {
    e.preventDefault();
    if (!ts.token) { setMail((m) => ({ ...m, msg: "Please finish the quick check above the button, then try again." })); return; }
    setMail((m) => ({ ...m, sending: true, msg: "" }));
    const body = { email: mail.email, id: r.id, url: r.url, consent: mail.consent, token: ts.token };
    const [x] = await Promise.allSettled([
      fetch("/api/slop-score/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }).then((y) => y.json()),
      fetch(LEADS_ENDPOINT, { method: "POST", headers: { "content-type": "application/json", accept: "application/json" }, body: JSON.stringify({ _subject: `Slop Score lead: ${r.domain} (${r.score}/100)`, email: mail.email, report: pageUrl, score: `${r.score}/100`, tips: mail.consent ? "yes" : "no", _template: "table" }) }),
    ]);
    const j = x.status === "fulfilled" ? x.value : {};
    if (j.report) {
      track("email_unlock", r.id);
      setR(j.report);
      try { sessionStorage.setItem(`ss:${r.id}`, JSON.stringify(j.report)); } catch { /* optional */ }
      setMail((m) => ({ ...m, sent: true, sending: false }));
      requestAnimationFrame(() => document.getElementById("sx-fix-h")?.scrollIntoView({ behavior: "smooth", block: "start" }));
      return;
    }
    ts.reset();
    setMail((m) => ({ ...m, sending: false, msg: j.error === "email" ? "That email doesn't look right. Check it and try again." : j.error === "rate_hour" ? "Too many tries from here. Try again in an hour." : j.error === "turnstile" ? "The quick check expired. Try again." : "That didn't work. Try again in a minute." }));
  };

  return (
    <div className="sx-result">
      <section className="sx-score" aria-labelledby="sx-score-h">
        <div className="sx-num">
          <p id="sx-score-h" className="sx-k">Slop Score</p>
          <p className="sx-big"><b>{r.score}</b><span>/100</span></p>
          <p className="sx-lab">{r.label}</p>
        </div>
        <div className="sx-ver">
          <p className="sx-verdict">{r.verdict}</p>
          <p className="sx-meta">{r.domain} · scanned {when(r.created_at)} · lower is better</p>
        </div>
      </section>

      {paying ? <p className="sx-paying" role="status">Payment received. Unlocking your full report…</p> : null}

      <section className="sv-sec" aria-labelledby="sx-cat-h">
        <h2 id="sx-cat-h">What's dragging <span className="t2">it down</span></h2>
        <ul className="sx-cats">
          {cats.map((c) => (
            <li key={c.k}>
              <p className="sx-cat-top"><b>{NAME[c.k]}</b><span>{c.score}</span></p>
              <span className="sx-bar" aria-hidden="true"><i style={{ width: `${Math.max(2, c.score)}%` }} /></span>
              {c.evidence ? <p className="sx-ev">{c.evidence}</p> : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="sv-sec" aria-labelledby="sx-fix-h">
        <h2 id="sx-fix-h">{r.unlocked ? "Every fix," : "Top 3 fixes,"} <span className="t2">biggest first</span></h2>
        <ol className="sx-issues">{r.issues.map((x) => <Issue key={x.id} x={x} />)}</ol>
        {r.locked ? (
          <div className="sx-locked">
            <p className="sx-locked-h">I found {r.locked} more issues</p>
            <div className="sx-fake" aria-hidden="true">{Array.from({ length: Math.min(4, r.locked) }, (_, i) => <span key={i}><i /><i /><i /></span>)}</div>
            <form className="sx-form sx-gate" onSubmit={sendMail}>
              <label className="sx-label" htmlFor="sx-mail">See all {r.issues.length + r.locked} fixes with copy-paste prompts. Free, I'll email you the report too.</label>
              <div className="sx-row">
                <input id="sx-mail" className="sx-input" type="email" autoComplete="email" placeholder="you@company.com" value={mail.email} onChange={(e) => setMail((m) => ({ ...m, email: e.target.value }))} required />
                <button className="hero2-btn hero2-btn-primary" type="submit" disabled={mail.sending}>{mail.sending ? "Unlocking…" : "Show all fixes"}</button>
              </div>
              <label className="sx-check"><input type="checkbox" checked={mail.consent} onChange={(e) => setMail((m) => ({ ...m, consent: e.target.checked }))} /> Also send me 3 short emails with fixes and offers. Unsubscribe anytime.</label>
              <div className="sx-ts" ref={ts.box} />
              <p className="sx-note" role="status">{mail.msg}</p>
            </form>
          </div>
        ) : mail.sent ? <p className="sx-note sx-sent" role="status">Unlocked. The full report is on its way to {mail.email}.</p> : null}
      </section>

      <section className="sv-sec" aria-labelledby="sx-up-h">
        <h2 id="sx-up-h">Fix it <span className="t2">your way</span></h2>
        <ul className="pr-plans sx-up">
          <li className="pr-plan">
            <p className="pr-k">Fix it yourself</p>
            <p className="pr-price">$12.99<span>ebook</span></p>
            <p className="pr-lead">27 copy-paste prompts and the rules behind every fix, for any AI builder. Use it on every page you make next.</p>
            <a className="hero2-btn hero2-btn-light" href="/fix-ai-slop-ui/" onClick={() => track("book_click", r.id)}>See the book</a>
          </li>
          <li className="pr-plan">
            <p className="pr-k">Designer review</p>
            <p className="pr-price">$49 or $99</p>
            <p className="pr-lead">I record a Loom going through your site and tell you what I'd change first. In your inbox in under 12 hours. Includes my book.</p>
            <div className="sx-two">
              <a className="hero2-btn hero2-btn-light" href={PERSONAL_REVIEW_URL} target="_blank" rel="noopener" onClick={() => track("review_click", r.id)}>$49 review<span className="sr-only"> (opens in a new tab)</span></a>
              <a className="hero2-btn hero2-btn-light" href={REVIEW_URL} target="_blank" rel="noopener" onClick={() => track("review_click", r.id)}>$99 review<span className="sr-only"> (opens in a new tab)</span></a>
            </div>
            <p className="sx-order">Paste your site in the order note: <code>{r.url}</code> <CopyButton text={r.url} label="Copy" className="sx-copy" extra={<span className="sr-only"> your site address</span>} /></p>
          </li>
          <li className="pr-plan is-hot">
            <p className="pr-k">Fix it for me</p>
            <p className="pr-price">{usd(SLOP.sprintPrice)}<span>per week</span></p>
            <p className="pr-lead">I redesign the problem screens in a one-week sprint.</p>
            <a className="hero2-btn hero2-btn-primary" href="/book/" onClick={() => track("sprint_click", r.id)}><CallIcon />Book a call</a>
          </li>
        </ul>
      </section>

      {r.a11y?.nudge ? (
        <p className="ax-banner sx-eaa">Selling to customers in the EU? I found {r.a11y.issues} accessibility issues that could matter under the European Accessibility Act. <a href="/eaa-audit/" onClick={() => track("eaa_click", r.id)}>See the EAA audit</a></p>
      ) : null}

      <section className="sv-sec sx-keep" aria-labelledby="sx-keep-h">
        <h2 id="sx-keep-h">Share <span className="t2">this report</span></h2>
        <div className="sx-share">
          <a className="hero2-btn hero2-btn-light" href={`https://x.com/intent/post?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener" onClick={() => track("share_click", r.id)}>Share on X<span className="sr-only"> (opens in a new tab)</span></a>
          <button type="button" className="hero2-btn hero2-btn-light" onClick={() => copyText(pageUrl).then((ok) => { if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000); } })}>{copied ? "Link copied" : "Copy link"}</button>
        </div>
        <p className="sr-only" role="status">{copied ? "Link copied" : ""}</p>
      </section>

      <p className="sx-book">Want to know why these fixes work? <a href="/fix-ai-slop-ui/" onClick={() => track("book_click", r.id)}>My book teaches the system behind them.</a></p>
    </div>
  );
}
