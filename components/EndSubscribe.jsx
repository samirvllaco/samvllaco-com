"use client";
import { useState } from "react";

// The newsletter sign-up in the end card of every article and case study (owner, 28 Nov 2026: "add thanks for reading,
// subscribe to newsletter, remove go to top"). Posts to /api/subscribe (handleSubscribe in slopscore/src/api.js).
export default function EndSubscribe() {
  const [email, setEmail] = useState("");
  const [st, setSt] = useState({ busy: false, done: false, msg: "" });
  const send = async (e) => {
    e.preventDefault();
    setSt({ busy: true, done: false, msg: "" });
    try {
      const r = await fetch("/api/subscribe", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, source: location.pathname, website2: e.target.website2.value }) });
      const j = await r.json().catch(() => ({}));
      if (j.ok) { setSt({ busy: false, done: true, msg: j.already ? "You're already on the list. Thanks." : "You're in. The next one comes to your inbox." }); return; }
      setSt({ busy: false, done: false, msg: j.error === "email" ? "That email doesn't look right. Check it and try again." : j.error === "limit" ? "Too many tries from here today. Try again tomorrow." : "That didn't work. Try again in a minute." });
    } catch { setSt({ busy: false, done: false, msg: "That didn't work. Try again in a minute." }); }
  };
  if (st.done) return <p className="end-sub-ok" role="status">{st.msg}</p>;
  return (
    <form className="end-sub" onSubmit={send}>
      <p className="end-sub-h">Get the next one by email. One short note when something new is out, no spam.</p>
      <div className="end-sub-row">
        <label className="sr-only" htmlFor="end-sub-mail">Email</label>
        <input id="end-sub-mail" className="end-sub-in" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" name="website2" tabIndex={-1} autoComplete="off" className="end-sub-hp" aria-hidden="true" />
        <button className="hero2-btn hero2-btn-primary" type="submit" disabled={st.busy}>{st.busy ? "Subscribing…" : "Subscribe"}</button>
      </div>
      <p className="end-sub-msg" role="status">{st.msg}</p>
    </form>
  );
}
