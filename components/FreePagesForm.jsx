"use client";
import { useState } from "react";
import { LEADS_ENDPOINT } from "../lib/site";

// Email in, 10 free pages out: the request lands in Sam's inbox and he emails the pages himself.
export default function FreePagesForm() {
  const [state, setState] = useState("idle"); // idle | busy | done | error
  const [email, setEmail] = useState("");
  async function send(e) {
    e.preventDefault();
    if (state === "busy") return;
    setState("busy");
    try {
      const r = await fetch(LEADS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, _subject: "10 free pages request (samvllaco.com/fix-ai-slop-ui)", _template: "table", _captcha: "false", page: "samvllaco.com/fix-ai-slop-ui/" }),
      });
      setState(r.ok ? "done" : "error");
    } catch { setState("error"); }
  }
  if (state === "done") {
    return (
      <p className="fp-done" role="status">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        <span><b>Got it.</b> I'll email the 10 pages to {email} myself.</span>
      </p>
    );
  }
  return (
    <form className="fp-form" onSubmit={send}>
      <label className="sr-only" htmlFor="fp-email">Your email</label>
      <input id="fp-email" type="email" required autoComplete="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit" className="hero2-btn hero2-btn-light" disabled={state === "busy"}>{state === "busy" ? "Sending..." : "Send me the 10 pages"}</button>
      {state === "error" ? <p className="fp-err" role="alert">That didn't go through. Try again, or email hello@samvllaco.com.</p> : null}
      <p className="fp-small">No newsletter. Just the pages, from me.</p>
    </form>
  );
}
