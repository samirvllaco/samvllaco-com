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
// Lower is better, so colors tell the story at a glance: green is clean, coral is slop.
const band = (n) => (n <= 20 ? 0 : n <= 40 ? 1 : n <= 60 ? 2 : n <= 80 ? 3 : 4);
const TOOL = "https://samvllaco.com/slop-score/";
// Stripe sends buyers back to /slop-score/r/?paid=1, so the report id waits in localStorage during checkout.
const idFromUrl = () => {
  const q = new URLSearchParams(location.search);
  let pay = "";
  try { pay = q.get("paid") ? localStorage.getItem("ss:pay") || "" : ""; } catch { /* optional */ }
  return (location.pathname.match(/\/slop-score\/r\/([A-Za-z0-9]{10})/) || [])[1] || q.get("id") || pay;
};
const when = (iso) => { try { return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }); } catch { return ""; } };

// One fix as a to-do: tick it off when it's done (kept in this browser), open it for the why, the fix and the prompts.
function Issue({ x, open, done, onDone }) {
  return (
    <li className={`sx-issue is-${x.severity || "medium"}${done ? " is-done" : ""}`}>
      <label className="sx-do"><input type="checkbox" checked={done} onChange={(e) => onDone(e.target.checked)} /><span className="sr-only">Mark "{x.title}" as done</span></label>
      <details className="sx-fix" open={open}>
        <summary>
          <span className="sx-sev"><span>{x.severity === "high" ? "High impact" : x.severity === "low" ? "Low impact" : "Medium impact"}</span>{NAME[x.category] || ""}{x.effort_minutes ? ` · about ${x.effort_minutes} min` : ""}</span>
          <h3>{x.title}</h3>
        </summary>
        <div className="sx-fix-body">
          <p><b>What's wrong:</b> {x.wrong}</p>
          <p><b>Why it matters:</b> {x.why}</p>
          <p><b>The fix:</b> {x.fix}</p>
          {x.prompts ? (
            <div className="sx-prompts">
              <p className="sx-ptool-h">Copy-paste prompts</p>
              {[["lovable", "Lovable"], ["cursor", "Cursor"], ["claude_code", "Claude Code"]].map(([k, n]) => (x.prompts[k] ? <div key={k}><p className="sx-ptool">{n}</p><CopyBlock text={x.prompts[k]} /></div> : null))}
            </div>
          ) : null}
        </div>
      </details>
    </li>
  );
}

// The score as a ring: the stroke fills to the score (lower is better).
function Ring({ score }) {
  const c = 2 * Math.PI * 52;
  return (
    <svg className="sx-ring" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="52" />
      <circle cx="60" cy="60" r="52" style={{ strokeDasharray: c, strokeDashoffset: c * (1 - Math.max(2, score) / 100) }} />
    </svg>
  );
}

export default function SlopResult() {
  const [id, setId] = useState("");
  const [r, setR] = useState(null);
  const [state, setState] = useState("loading"); // loading | ok | missing | error
  const [paying, setPaying] = useState(false);
  const [paidOk, setPaidOk] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState({});
  const [mail, setMail] = useState({ email: "", consent: false, sent: false, sending: false, msg: "" });
  const [done, setDone] = useState({});
  const [shot, setShot] = useState("");
  const ts = useTurnstile(r && !r.unlocked && status.siteKey ? status.siteKey : null);

  useEffect(() => {
    const i = idFromUrl(); setId(i);
    if (!i) { setState("missing"); return; }
    try { const c = sessionStorage.getItem(`ss:${i}`); if (c) { setR(JSON.parse(c)); setState("ok"); } } catch { /* optional */ }
    try { setDone(JSON.parse(localStorage.getItem(`ss:done:${i}`) || "{}")); setShot(sessionStorage.getItem(`ss:shot:${i}`) || ""); } catch { /* optional */ }
    fetch("/api/slop-score/status").then((x) => x.json()).then(setStatus).catch(() => {});
    const load = () => fetch(`/api/slop-score/report/${i}`).then((x) => (x.ok ? x.json() : Promise.reject(x.status)));
    load().then((j) => { setR(j); setState("ok"); if (new URLSearchParams(location.search).get("paid") && !j.unlocked) poll(); })
      .catch((code) => setState(code === 404 ? "missing" : "error"));
    // After checkout, Stripe's webhook unlocks the report. Wait for it for up to 30 seconds.
    function poll() {
      setPaying(true);
      let n = 0;
      const t = setInterval(() => {
        n++;
        load().then((j) => { if (j.unlocked || n >= 15) { clearInterval(t); setPaying(false); setR(j); if (j.unlocked) { setPaidOk(true); try { localStorage.removeItem("ss:pay"); history.replaceState(null, "", `/slop-score/r/${j.id}`); } catch { /* optional */ } } } }).catch(() => { if (n >= 15) { clearInterval(t); setPaying(false); } });
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

  const mark = (key, v) => setDone((d) => { const n = { ...d, [key]: v }; try { localStorage.setItem(`ss:done:${r.id}`, JSON.stringify(n)); } catch { /* optional */ } return n; });
  const doneCount = r.issues.filter((x) => done[x.id]).length;
  const total = r.issues.length + (r.locked || 0);
  // $5 unlock through the Stripe Payment Link; the report id rides along as client_reference_id.
  const pay = () => {
    track("unlock_click", r.id);
    try { localStorage.setItem("ss:pay", r.id); } catch { /* optional */ }
    location.assign(`${status.payLink}?client_reference_id=${r.id}`);
  };
  // Free: the score and top fixes by email, plus the follow-ups when the box is ticked.
  const sendMail = async (e) => {
    e.preventDefault();
    if (!ts.token) { setMail((m) => ({ ...m, msg: "Please finish the quick check, then try again." })); return; }
    setMail((m) => ({ ...m, sending: true, msg: "" }));
    const body = { email: mail.email, id: r.id, url: r.url, consent: mail.consent, token: ts.token };
    const [x] = await Promise.allSettled([
      fetch("/api/slop-score/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }).then((y) => y.json()),
      fetch(LEADS_ENDPOINT, { method: "POST", headers: { "content-type": "application/json", accept: "application/json" }, body: JSON.stringify({ _subject: `Slop Score lead: ${r.domain} (${r.score}/100)`, email: mail.email, report: pageUrl, score: `${r.score}/100`, tips: mail.consent ? "yes" : "no", _template: "table" }) }),
    ]);
    const j = x.status === "fulfilled" ? x.value : {};
    ts.reset();
    if (j.ok) { track("email_unlock", r.id); setMail((m) => ({ ...m, sent: true, sending: false })); return; }
    setMail((m) => ({ ...m, sending: false, msg: j.error === "email" ? "That email doesn't look right. Check it and try again." : j.error === "rate_hour" ? "Too many tries from here. Try again in an hour." : "That didn't work. Try again in a minute." }));
  };

  return (
    <div className="sx-result">
      <section className={`sx-score b${band(r.score)}${shot ? " has-shot" : ""}`} aria-labelledby="sx-score-h">
        <div className="sx-num">
          <p id="sx-score-h" className="sx-k">Slop Score</p>
          <div className="sx-dial"><Ring score={r.score} /><p className="sx-big"><b>{r.score}</b><span>/100</span></p></div>
          <p className="sx-lab">{r.label}</p>
        </div>
        <div className="sx-ver">
          <p className="sx-verdict">{r.verdict}</p>
          <p className="sx-meta">{r.domain} · scanned {when(r.created_at)} · lower is better</p>
          <ul className="sx-next" aria-label="Your next steps">
            <li><b>1</b>Fix the top {Math.min(3, r.issues.length)} below. Each has copy-paste prompts{r.unlocked ? "" : " in the full report"}.</li>
            <li><b>2</b>Check again after: <a href={`/slop-score/?url=${encodeURIComponent(r.url)}`}>rescan {r.domain}</a></li>
            <li><b>3</b>Want a designer's eyes? <a href="/book/" onClick={() => track("book_click", r.id)}>Book a 30-min call</a></li>
          </ul>
        </div>
        {shot ? (
          <figure className="sx-thumb">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={shot} alt={`${r.domain}, first screen`} width="1440" height="900" /></figure>
        ) : null}
      </section>

      {paying ? <p className="sx-paying" role="status">Payment received. Unlocking your full report…</p> : paidOk ? <p className="sx-paying" role="status">Unlocked. The full report is on its way to your inbox.</p> : null}

      <section className="sv-sec" aria-labelledby="sx-cat-h">
        <h2 id="sx-cat-h">What's dragging <span className="t2">it down</span></h2>
        <ul className="sx-cats">
          {cats.map((c) => (
            <li key={c.k} className={`b${band(c.score)}`}>
              <b>{NAME[c.k]}</b>
              <span className="sx-bar" aria-hidden="true"><i style={{ transform: `scaleX(${Math.max(2, c.score) / 100})` }} /></span>
              <span className="sx-cat-n">{c.score}<span className="sr-only"> out of 100, lower is better</span></span>
              {c.evidence ? <p className="sx-ev">{c.evidence}</p> : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="sv-sec" aria-labelledby="sx-fix-h">
        <h2 id="sx-fix-h">Your fixes, <span className="t2">biggest first</span></h2>
        <p className="sx-todo-h" role="status">{doneCount} of {total} done{r.locked ? ` · ${r.locked} more in the full report` : ""}</p>
        <ol className="sx-issues">{r.issues.map((x, i) => <Issue key={x.id} x={x} open={i === 0} done={Boolean(done[x.id])} onDone={(v) => mark(x.id, v)} />)}</ol>
        {r.locked ? (
          <div className="sx-locked">
            <ol className="sx-blur" aria-hidden="true">{Array.from({ length: Math.min(5, r.locked) }, (_, i) => <li key={i}><span /><b>{["Fix the spacing scale across sections", "One primary button per task in the hero", "Raise contrast on the muted gray text", "Replace generic feature icons", "Tighten the type scale to 6 sizes"][i]}</b><i /><i /></li>)}</ol>
            <div className="sx-unlock">
              <p className="sx-unlock-h">Unlock all {total} fixes</p>
              <ul>
                <li>Every issue ranked by impact, with the exact fix</li>
                <li>Copy-paste prompts for Lovable, Cursor and Claude Code</li>
                <li>The full report emailed to you, yours to keep</li>
              </ul>
              {status.payLink ? (
                <button type="button" className="hero2-btn hero2-btn-primary" onClick={pay}>Unlock for {usd(SLOP.reportPrice)}</button>
              ) : <p className="sx-note">Paid unlock opens shortly. Leave your email below and I'll send your score.</p>}
              <p className="sx-note">One-time payment by card through Stripe. No account.</p>
            </div>
            {!mail.sent ? (
              <form className="sx-form sx-gate" onSubmit={sendMail}>
                <label className="sx-label" htmlFor="sx-mail">Not now? Get your score and top fixes by email, free.</label>
                <div className="sx-row">
                  <input id="sx-mail" className="sx-input" type="email" autoComplete="email" placeholder="you@company.com" value={mail.email} onChange={(e) => setMail((m) => ({ ...m, email: e.target.value }))} required />
                  <button className="hero2-btn hero2-btn-light" type="submit" disabled={mail.sending}>{mail.sending ? "Sending…" : "Email me"}</button>
                </div>
                <label className="sx-check"><input type="checkbox" checked={mail.consent} onChange={(e) => setMail((m) => ({ ...m, consent: e.target.checked }))} /> Also send me 3 short emails with fixes and offers. Unsubscribe anytime.</label>
                <div className="sx-ts" ref={ts.box} />
                <p className="sx-note" role="status">{mail.msg}</p>
              </form>
            ) : <p className="sx-note sx-sent" role="status">Sent to {mail.email}. Check your inbox in a minute.</p>}
          </div>
        ) : null}
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
