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
  const [buyErr, setBuyErr] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState({});
  const [mail, setMail] = useState({ email: "", consent: false, sent: false, sending: false });
  const [claim, setClaim] = useState({ email: "", msg: "", sending: false });
  const ts = useTurnstile(r && status.siteKey ? status.siteKey : null);

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

  const buy = async () => {
    track("unlock_click", r.id);
    const x = await fetch("/api/slop-score/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: r.id }) }).then((y) => y.json()).catch(() => ({}));
    if (x.url) location.assign(x.url); else setBuyErr("Checkout didn't open. Try again in a minute.");
  };
  const sendMail = async (e) => {
    e.preventDefault();
    setMail((m) => ({ ...m, sending: true }));
    const body = { email: mail.email, id: r.id, url: r.url, consent: mail.consent, token: ts.token };
    await Promise.allSettled([
      fetch("/api/slop-score/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }),
      fetch(LEADS_ENDPOINT, { method: "POST", headers: { "content-type": "application/json", accept: "application/json" }, body: JSON.stringify({ _subject: `Slop Score report for ${r.domain}`, email: mail.email, report: pageUrl, score: `${r.score}/100`, tips: mail.consent ? "yes" : "no", _template: "table" }) }),
    ]);
    setMail((m) => ({ ...m, sent: true, sending: false }));
    ts.reset();
  };
  const sendClaim = async (e) => {
    e.preventDefault();
    setClaim((c) => ({ ...c, sending: true, msg: "" }));
    const x = await fetch("/api/slop-score/claim", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: r.id, email: claim.email, token: ts.token }) }).then((y) => y.json()).catch(() => ({}));
    if (x.ok) { const j = await fetch(`/api/slop-score/report/${r.id}`).then((y) => y.json()); setR(j); setClaim({ email: "", msg: "", sending: false }); }
    else setClaim((c) => ({ ...c, sending: false, msg: x.error === "no_purchase" ? "I couldn't find a payment with that email yet. Payments can take a minute; try again shortly, or email me." : "That didn't work. Check the email and try again." }));
    ts.reset();
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
          </div>
        ) : null}
      </section>

      {!r.unlocked ? (
        <section className="sv-sec" aria-labelledby="sx-up-h">
          <h2 id="sx-up-h">Want <span className="t2">the rest?</span></h2>
          <ul className="pr-plans sx-up">
            <li className="pr-plan">
              <p className="pr-k">Full AI report</p>
              <p className="pr-price">{usd(SLOP.reportPrice)}<span>one time</span></p>
              <p className="pr-lead">Every issue ranked, with copy-paste fix prompts for Lovable, Cursor and Claude Code. Instant.</p>
              <button type="button" className="hero2-btn hero2-btn-light" onClick={buy} disabled={!status.payments}>{status.payments ? "Get the full report" : "Coming soon"}</button>
              <p className="sx-note" role="status">{buyErr}</p>
            </li>
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
          {paying ? null : (
            <form className="sx-claim" onSubmit={sendClaim}>
              <label className="sx-label" htmlFor="sx-claim">Already paid? Enter your checkout email.</label>
              <div className="sx-row">
                <input id="sx-claim" className="sx-input" type="email" autoComplete="email" value={claim.email} onChange={(e) => setClaim((c) => ({ ...c, email: e.target.value }))} required />
                <button className="hero2-btn hero2-btn-light" type="submit" disabled={claim.sending}>Unlock my report</button>
              </div>
              <p className="sx-note" role="status">{claim.msg}</p>
            </form>
          )}
        </section>
      ) : null}

      {r.a11y?.nudge ? (
        <p className="ax-banner sx-eaa">Selling to customers in the EU? I found {r.a11y.issues} accessibility issues that could matter under the European Accessibility Act. <a href="/eaa-audit/" onClick={() => track("eaa_click", r.id)}>See the EAA audit</a></p>
      ) : null}

      <section className="sv-sec sx-keep" aria-labelledby="sx-keep-h">
        <h2 id="sx-keep-h">Keep <span className="t2">this report</span></h2>
        <form className="sx-form" onSubmit={sendMail}>
          <label className="sx-label" htmlFor="sx-mail">Email me this report and 10 free pages of my book.</label>
          <div className="sx-row">
            <input id="sx-mail" className="sx-input" type="email" autoComplete="email" placeholder="you@company.com" value={mail.email} onChange={(e) => setMail((m) => ({ ...m, email: e.target.value }))} required disabled={mail.sent} />
            <button className="hero2-btn hero2-btn-primary" type="submit" disabled={mail.sending || mail.sent}>{mail.sent ? "Sent" : "Email me"}</button>
          </div>
          <label className="sx-check"><input type="checkbox" checked={mail.consent} onChange={(e) => setMail((m) => ({ ...m, consent: e.target.checked }))} /> Send me occasional design tips. Unsubscribe anytime.</label>
          <div className="sx-ts" ref={ts.box} />
          <p className="sx-note" role="status">{mail.sent ? "Got it. I'll send them myself within a day." : ""}</p>
        </form>
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
