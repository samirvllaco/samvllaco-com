"use client";
import { useEffect, useRef, useState } from "react";
import { useTurnstile } from "./useTurnstile";
import { LEADS_ENDPOINT } from "../../lib/site";

const STEPS = ["Opening your site", "Measuring spacing, type and color", "Running accessibility checks", "Looking at it like a designer"];
const STEP_AT = [0, 6000, 14000, 22000];

export const ERRORS = {
  invalid: "That doesn't look like a web address. Try something like yoursite.com.",
  too_long: "That address is too long. Try the main address of your site.",
  blocked: "I can only check public websites. Try the address your visitors use.",
  load: "Your site didn't load for me. Check the address, or try again in a minute.",
  bot_blocked: "Your site blocked my checker. Strict bot protection does that. Try another page, or ask me for a designer review.",
  timeout: "Your site took too long to load. Try again, or try a lighter page like your pricing page.",
  rate_hour: "You've used your scans for this hour. Leave your email below and I'll send your result when you can scan again.",
  rate_day: "You've used your scans for today. Leave your email below and I'll send your result tomorrow.",
  cap: "Slop Score is busy today. Leave your email below and I'll send your result tomorrow.",
  busy: "All checkers are busy right now. Try again in a minute.",
  turnstile: "Please finish the quick check above the button, then try again.",
  review: "The design review didn't finish. Try again in a minute.",
  server: "Something went wrong on my side. Try again in a minute.",
};

export default function SlopScan() {
  const [status, setStatus] = useState(null); // null while checking, then { ready, siteKey }
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState(0);
  const [code, setCode] = useState("");
  const err = code ? ERRORS[code] || ERRORS.server : "";
  const setErr = setCode;
  const [wait, setWait] = useState({ email: "", sent: false, sending: false });
  const timers = useRef([]);
  const ts = useTurnstile(status?.ready ? status.siteKey : null);

  useEffect(() => {
    fetch("/api/slop-score/status").then((r) => (r.ok ? r.json() : { ready: false })).then(setStatus).catch(() => setStatus({ ready: false }));
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const scan = async (e) => {
    e.preventDefault();
    setErr("");
    if (!url.trim()) { setErr("invalid"); return; }
    if (!ts.token) { setErr("turnstile"); return; }
    setBusy(true); setStep(0);
    timers.current = STEP_AT.map((t, i) => setTimeout(() => setStep(i), t));
    try {
      const r = await fetch("/api/slop-score/scan", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ url, token: ts.token }) });
      const j = await r.json().catch(() => ({ error: "server" }));
      if (j.id) {
        try { sessionStorage.setItem(`ss:${j.id}`, JSON.stringify(j)); } catch { /* optional */ }
        location.assign(`/slop-score/r/${j.id}`);
        return;
      }
      if (j.error === "setup") setStatus({ ready: false });
      setErr(ERRORS[j.error] ? j.error : "server");
    } catch { setErr("server"); }
    timers.current.forEach(clearTimeout);
    setBusy(false); ts.reset();
  };

  // Before the tool is switched on, or when a limit is hit: the visitor leaves an email and Sam sends the score.
  const notify = async (e) => {
    e.preventDefault();
    setWait((w) => ({ ...w, sending: true }));
    try {
      await fetch(LEADS_ENDPOINT, { method: "POST", headers: { "content-type": "application/json", accept: "application/json" }, body: JSON.stringify({ _subject: "Slop Score request", email: wait.email, site: url, _template: "table" }) });
      setWait((w) => ({ ...w, sent: true, sending: false }));
    } catch { setWait((w) => ({ ...w, sending: false })); setErr("server"); }
  };
  const showNotify = ["rate_hour", "rate_day", "cap"].includes(code);

  return (
    <div className="sx-tool">
      {busy ? (
        <div className="sx-steps" aria-live="polite">
          <p className="sx-steps-h">Checking {url.replace(/^https?:\/\//, "")}</p>
          <ol>
            {STEPS.map((s, i) => <li key={s} className={i < step ? "is-done" : i === step ? "is-now" : ""}>{s}{i < step ? <span className="sr-only"> (done)</span> : null}</li>)}
          </ol>
          <p className="sx-note">This takes about 30 seconds.</p>
        </div>
      ) : status && !status.ready ? (
        <form className="sx-form" onSubmit={notify}>
          <p className="sx-soon"><b>Slop Score opens soon.</b> Leave your site and email, and I'll send you your score myself the day it's live.</p>
          <label className="sx-label" htmlFor="sx-url">Your website</label>
          <input id="sx-url" className="sx-input" type="text" inputMode="url" autoComplete="url" placeholder="yoursite.com" value={url} onChange={(e) => setUrl(e.target.value)} required />
          <label className="sx-label" htmlFor="sx-mail">Your email</label>
          <div className="sx-row">
            <input id="sx-mail" className="sx-input" type="email" autoComplete="email" placeholder="you@company.com" value={wait.email} onChange={(e) => setWait((w) => ({ ...w, email: e.target.value }))} required />
            <button className="hero2-btn hero2-btn-primary" type="submit" disabled={wait.sending || wait.sent}>{wait.sent ? "Got it" : "Send me my score"}</button>
          </div>
          <p className="sx-note" aria-live="polite">{wait.sent ? "Got it. I'll send it myself as soon as the tool is live." : "No spam. One email with your score."}</p>
        </form>
      ) : (
        <form className="sx-form" onSubmit={scan} noValidate>
          <label className="sx-label" htmlFor="sx-url">Your website</label>
          <div className="sx-row">
            <input id="sx-url" className="sx-input" type="text" inputMode="url" autoComplete="url" placeholder="yoursite.com" value={url} onChange={(e) => setUrl(e.target.value)} aria-describedby="sx-err sx-hint" aria-invalid={["invalid", "too_long", "blocked"].includes(code) ? "true" : undefined} />
            <button className="hero2-btn hero2-btn-primary" type="submit" disabled={!status}>Check my site</button>
          </div>
          <div className="sx-ts" ref={ts.box} />
          <p id="sx-err" className="sx-err" role="alert">{err}</p>
          <p id="sx-hint" className="sx-note">Lower is better. 0 is hand-crafted, 100 is pure AI slop.</p>
          <p className="sx-note">I store the URL, the score and the report. Not your page content, not screenshots.</p>
        </form>
      )}
      {showNotify && status?.ready && !busy ? (
        <form className="sx-form sx-wait" onSubmit={notify}>
          <label className="sx-label" htmlFor="sx-mail2">Your email</label>
          <div className="sx-row">
            <input id="sx-mail2" className="sx-input" type="email" autoComplete="email" placeholder="you@company.com" value={wait.email} onChange={(e) => setWait((w) => ({ ...w, email: e.target.value }))} required />
            <button className="hero2-btn hero2-btn-light" type="submit" disabled={wait.sending || wait.sent}>{wait.sent ? "Got it" : "Send me the result"}</button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
