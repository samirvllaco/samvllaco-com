"use client";
import { useState } from "react";
import { EMAIL } from "../lib/site";

// Free audit form (owner, 27 Nov 2026). Posts to /api/audit, which emails Sam and keeps a copy in D1.
// If the API is off, the visitor is offered the same note by email instead, so nothing is lost.
export default function FreeAuditForm() {
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [err, setErr] = useState("");
  const [sentTo, setSentTo] = useState("");
  async function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = Object.fromEntries(f.entries());
    setState("sending"); setErr("");
    try {
      const r = await fetch("/api/audit", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) { setSentTo(String(body.email || "")); setState("done"); return; }
      setErr(j.error === "email" ? "Check your email address." : j.error === "url" ? "Add your product's address, like yoursite.com." : j.error === "limit" ? "You've sent a few today. Email me instead." : "fallback");
      setState("error");
    } catch { setErr("fallback"); setState("error"); }
  }
  if (state === "done") {
    return (
      <div className="fa-done" role="status">
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="var(--ok, #3ecf7a)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <p className="fa-done-h">Got it. I&apos;ll take a look myself.</p>
        <p>Your Loom goes to <b>{sentTo}</b>. If I need anything else, I&apos;ll reply there.</p>
      </div>
    );
  }
  return (
    <form className="fa-form" onSubmit={submit} noValidate>
      <div className="fa-grid">
        <label className="fa-f"><span>Name</span><input className="sx-input" name="name" autoComplete="name" placeholder="Your name" maxLength={80} /></label>
        <label className="fa-f"><span>Email</span><input className="sx-input" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={200} aria-invalid={err.startsWith("Check your email") || undefined} /></label>
        <label className="fa-f"><span>Product or website address</span><input className="sx-input" name="url" inputMode="url" autoComplete="url" placeholder="yoursite.com or an App Store link" required maxLength={300} aria-invalid={err.startsWith("Add your product") || undefined} /></label>
        <label className="fa-f"><span>What should I look at? <em>Optional</em></span><input className="sx-input" name="focus" placeholder="Onboarding, pricing page, checkout" maxLength={200} /></label>
        <label className="fa-f fa-wide"><span>Anything I should know? <em>Optional</em></span><textarea className="sx-input fa-ta" name="details" rows={5} placeholder="Who it's for, what's not working, links to screenshots or a Figma file" maxLength={2000} /></label>
        <label className="fa-hp" aria-hidden="true">Leave this empty<input name="website2" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {err && err !== "fallback" ? <p className="fa-err" role="alert">{err}</p> : null}
      {err === "fallback" ? <p className="fa-err" role="alert">That didn&apos;t go through. Email the same to <b>{EMAIL}</b> and I&apos;ll do the audit from there.</p> : null}
      <button type="submit" className="hero2-btn hero2-btn-primary fa-go" disabled={state === "sending"}>{state === "sending" ? "Sending" : "Get my free audit"}</button>
      <p className="fa-small">No call needed. If you want the fixes done after, I&apos;ll tell you what it takes.</p>
    </form>
  );
}
