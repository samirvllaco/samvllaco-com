"use client";
import { useState } from "react";
import { EMAIL } from "../lib/site";

// "Book a call" or "Send message" on /book/ (owner, 28 Nov 2026: "add a book a call and send message switch so they can
// message us on the contact form as well"). The calendar stays the default; the message goes to /api/message, which
// emails Sam with the visitor as reply-to and keeps a copy.
export default function ContactSwitch({ call }) {
  const [tab, setTab] = useState("call");
  const [state, setState] = useState("idle");
  const [err, setErr] = useState("");
  const [sentTo, setSentTo] = useState("");
  async function submit(e) {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.currentTarget).entries());
    setState("sending"); setErr("");
    try {
      const r = await fetch("/api/message", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) { setSentTo(String(body.email || "")); setState("done"); return; }
      setErr(j.error === "email" ? "Check your email address." : j.error === "message" ? "Tell me a little more, a sentence or two." : j.error === "limit" ? "You've sent a few today. Email me instead." : "fallback");
      setState("error");
    } catch { setErr("fallback"); setState("error"); }
  }
  const tabs = [["call", "Book a call"], ["message", "Send message"]];
  return (
    <div className="cs">
      <div className="cs-switch" role="tablist" aria-label="How to reach me">
        {tabs.map(([id, label]) => (
          <button key={id} type="button" role="tab" id={`cs-tab-${id}`} aria-controls={`cs-panel-${id}`} aria-selected={tab === id} tabIndex={tab === id ? 0 : -1}
            onClick={() => setTab(id)}
            onKeyDown={(e) => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { const n = id === "call" ? "message" : "call"; setTab(n); document.getElementById(`cs-tab-${n}`)?.focus(); } }}>
            {label}
          </button>
        ))}
        <span className="cs-thumb" aria-hidden="true" data-on={tab} />
      </div>
      <div id="cs-panel-call" role="tabpanel" aria-labelledby="cs-tab-call" hidden={tab !== "call"}>{call}</div>
      <div id="cs-panel-message" role="tabpanel" aria-labelledby="cs-tab-message" hidden={tab !== "message"} className="cs-msg">
        {state === "done" ? (
          <div className="fa-done" role="status">
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="var(--ok, #3ecf7a)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <p className="fa-done-h">Thanks, it&apos;s with me now.</p>
            <p>I read every message myself and reply to <b>{sentTo}</b>, usually within a day.</p>
          </div>
        ) : (
          <form className="fa-form" onSubmit={submit} noValidate>
            <div className="fa-grid">
              <label className="fa-f"><span>Name</span><input className="sx-input" name="name" autoComplete="name" placeholder="Your name" maxLength={80} /></label>
              <label className="fa-f"><span>Email</span><input className="sx-input" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={200} aria-invalid={err.startsWith("Check your email") || undefined} /></label>
              <label className="fa-f fa-wide"><span>Company or product <em>Optional</em></span><input className="sx-input" name="company" placeholder="Company name or yoursite.com" maxLength={200} /></label>
              <label className="fa-f fa-wide"><span>Message</span><textarea className="sx-input fa-ta" name="message" rows={6} required placeholder="What are you building, and what do you need help with?" maxLength={4000} aria-invalid={err.startsWith("Tell me") || undefined} /></label>
              <label className="fa-hp" aria-hidden="true">Leave this empty<input name="website2" tabIndex={-1} autoComplete="off" /></label>
            </div>
            {err && err !== "fallback" ? <p className="fa-err" role="alert">{err}</p> : null}
            {err === "fallback" ? <p className="fa-err" role="alert">That didn&apos;t go through. Email the same to <b>{EMAIL}</b> and I&apos;ll reply from there.</p> : null}
            <button type="submit" className="hero2-btn hero2-btn-primary fa-go" disabled={state === "sending"}>{state === "sending" ? "Sending" : "Send message"}</button>
          </form>
        )}
      </div>
    </div>
  );
}
