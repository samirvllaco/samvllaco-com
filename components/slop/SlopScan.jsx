"use client";
import { useEffect, useRef, useState } from "react";
import { useTurnstile } from "./useTurnstile";
import { LEADS_ENDPOINT } from "../../lib/site";

const STEPS = ["Opening your site", "Measuring spacing, type and color", "Running accessibility checks", "Looking at it like a designer", "Writing your fixes"];
// Rules from my book, shown one at a time while the scan runs.
const TIPS = [
  "One filled primary button per task. Everything else is outline or a text link.",
  "Spacing from one scale: 4, 8, 16, 24, 32, 48, 64. Groups sit further apart than the items inside them.",
  "Body text at 16px with 1.5 line height. Size makes hierarchy, not color.",
  "No card inside a card. Use space, a divider or a heading instead.",
  "Text needs 4.5:1 contrast. Muted gray on gray is the most common miss.",
  "Real screenshots beat 3D blobs and gradient orbs every time.",
  "Button labels are a verb plus an object: Start free trial, never Submit.",
  "Touch targets of 44px with 8px between them.",
];
const EXPECT = 50; // seconds a full scan usually takes

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

// The wait, made worth watching: the visitor's own site in a browser frame as soon as it renders, a scan line over it,
// real steps from the server, an honest progress bar and one rule from my book at a time.
function Live({ url, shot, step, secs }) {
  const domain = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "") || "your site";
  // The review is the long step; after 18 seconds in it, show the last step so the list keeps moving.
  const at = step >= 3 && secs > 30 ? 4 : step;
  const pct = Math.min(96, Math.max(((at + (shot ? 1 : 0.4)) / (STEPS.length + 1)) * 100, (secs / EXPECT) * 100));
  const tip = TIPS[Math.floor(secs / 6) % TIPS.length];
  return (
    <div className="sx-live" aria-live="polite" aria-busy="true">
      <div className="sx-browser">
        <div className="sx-chrome">
          <span className="sx-lights" aria-hidden="true"><i /><i /><i /></span>
          <span className="sx-addr">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={`https://icons.duckduckgo.com/ip3/${encodeURIComponent(domain)}.ico`} width="14" height="14" alt="" onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} />{domain}</span>
          <span className="sx-secs" aria-hidden="true">{secs}s</span>
        </div>
        <div className={`sx-view${shot ? " has-shot" : ""}`}>
          {shot ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={shot} alt={`${domain} as my checker sees it`} width="1440" height="900" />
          ) : (
            <div className="sx-skel" aria-hidden="true"><i /><i /><i /><span><i /><i /><i /></span></div>
          )}
          <span className="sx-beam" aria-hidden="true" />
          {shot ? <span className="sx-marks" aria-hidden="true"><i /><i /><i /><i /></span> : null}
        </div>
      </div>
      <div className="sx-prog" role="progressbar" aria-label="Scan progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)}><span style={{ transform: `scaleX(${pct / 100})` }} /></div>
      <div className="sx-steps">
        <ol>
          {STEPS.map((s, i) => <li key={s} className={i < at ? "is-done" : i === at ? "is-now" : ""}>{s}{i < at ? <span className="sr-only"> (done)</span> : null}</li>)}
        </ol>
        <p className="sx-tip" key={tip}><b>While you wait</b>{tip}</p>
      </div>
    </div>
  );
}

export default function SlopScan() {
  const [status, setStatus] = useState(null); // null while checking, then { ready, siteKey }
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState(0);
  const [shot, setShot] = useState("");
  const [secs, setSecs] = useState(0);
  const [owner, setOwner] = useState(false); // owner mode: no captcha, no limits (see the status effect)
  const [code, setCode] = useState("");
  const err = code ? ERRORS[code] || ERRORS.server : "";
  const setErr = setCode;
  const [wait, setWait] = useState({ email: "", sent: false, sending: false });
  const timers = useRef([]);
  const ts = useTurnstile(status?.ready ? status.siteKey : null);

  useEffect(() => {
    try { const q = new URLSearchParams(location.search).get("url"); if (q) setUrl(q.slice(0, 300)); } catch { /* optional */ }
    fetch("/api/slop-score/status").then((r) => (r.ok ? r.json() : { ready: false })).then(setStatus).catch(() => setStatus({ ready: false }));
    // Owner mode (owner, 26 Nov 2026): open /slop-score/#owner=<ADMIN_TOKEN> once. The token stays in this browser only,
    // is removed from the address bar at once, and lets the owner test without the captcha or the daily limits.
    try {
      const m = location.hash.match(/^#owner=([A-Za-z0-9._~-]{16,})$/);
      if (m) { localStorage.setItem("ss:owner", m[1]); history.replaceState(null, "", location.pathname + location.search); }
      if (location.hash === "#owner-off") { localStorage.removeItem("ss:owner"); history.replaceState(null, "", location.pathname + location.search); }
      setOwner(!!localStorage.getItem("ss:owner"));
    } catch { /* storage blocked */ }
    return () => timers.current.forEach(clearInterval);
  }, []);

  const scan = async (e) => {
    e.preventDefault();
    setErr("");
    if (!url.trim()) { setErr("invalid"); return; }
    if (!ts.token && !owner) { setErr("turnstile"); return; }
    setBusy(true); setStep(0); setShot(""); setSecs(0);
    const t0 = Date.now();
    timers.current = [setInterval(() => setSecs(Math.round((Date.now() - t0) / 1000)), 1000)];
    const done = (j) => {
      try { sessionStorage.setItem(`ss:${j.id}`, JSON.stringify(j)); } catch { /* optional */ }
      location.assign(`/slop-score/r/${j.id}`);
    };
    let j = {}, img = "";
    try {
      let auth = {}; try { const o = localStorage.getItem("ss:owner"); if (o) auth = { authorization: `Bearer ${o}` }; } catch { /* none */ }
      const r = await fetch("/api/slop-score/scan", { method: "POST", headers: { "content-type": "application/json", ...auth }, body: JSON.stringify({ url, token: ts.token, stream: true }) });
      if ((r.headers.get("content-type") || "").includes("ndjson") && r.body) {
        // Live scan: the server sends the rendered page first, then the steps, then the report.
        const rd = r.body.getReader(), dec = new TextDecoder();
        let buf = "";
        for (;;) {
          const { value, done: end } = await rd.read();
          if (end) break;
          buf += dec.decode(value, { stream: true });
          const lines = buf.split("\n"); buf = lines.pop();
          for (const line of lines) {
            if (!line.trim()) continue;
            let ev; try { ev = JSON.parse(line); } catch { continue; }
            if (ev.t === "shot" && ev.img) { img = ev.img; setShot(ev.img); }
            if (ev.t === "step") setStep((n) => Math.max(n, ev.i));
            if (ev.t === "done") j = ev.report;
            if (ev.t === "error") j = { error: ev.error };
          }
        }
      } else j = await r.json().catch(() => ({ error: "server" }));
      if (j && j.id) {
        if (img) { try { sessionStorage.setItem(`ss:shot:${j.id}`, img); } catch { /* optional */ } }
        setStep(STEPS.length);
        setTimeout(() => done(j), img ? 500 : 0);
        return;
      }
      if (j.error === "setup") setStatus({ ready: false });
      setErr(ERRORS[j.error] ? j.error : "server");
    } catch { setErr("server"); }
    timers.current.forEach(clearInterval);
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
        <Live url={url} shot={shot} step={step} secs={secs} />
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
          {owner ? <p className="sx-note" role="status">Owner mode: no captcha, no daily limit. Turn off with #owner-off.</p> : null}
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
