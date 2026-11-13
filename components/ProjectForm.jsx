"use client";
import { useState } from "react";

// Project details form. With `endpoint` set (a form service URL that accepts JSON) it sends there.
// Without one it opens the visitor's email app with everything filled in.
export default function ProjectForm({ email, endpoint = "", needs, budgets, starts, sources, who = "us", example = "", ask = "What are you building?" }) {
  const [v, setV] = useState({ name: "", email: "", website: "", fax: "", needs: [], budget: "", start: "", building: "", source: "" });
  const [tried, setTried] = useState(false);
  const [state, setState] = useState("idle");
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });
  const toggle = (n) => setV({ ...v, needs: v.needs.includes(n) ? v.needs.filter((x) => x !== n) : [...v.needs, n] });
  const err = {
    name: !v.name.trim() && "Enter your name.",
    email: !/^\S+@\S+\.\S+$/.test(v.email) && "Enter a work email, like name@company.com.",
    needs: v.needs.length === 0 && "Pick at least one.",
    budget: !v.budget && "Choose a range, or “Not sure yet”.",
    source: !v.source && `Pick where you heard about ${who}.`,
  };
  const bad = Object.values(err).some(Boolean);
  const show = (k) => (tried && err[k] ? <p className="pf-err" id={`pf-${k}-err`}><span aria-hidden="true">!</span>{err[k]}</p> : null);

  async function submit(e) {
    e.preventDefault();
    setTried(true);
    if (bad || v.fax) return;
    const lines = [`Name: ${v.name}`, `Email: ${v.email}`, v.website && `Website: ${v.website}`, `Needs: ${v.needs.join(", ")}`, `Budget: ${v.budget}`, v.start && `Start: ${v.start}`, v.building && `Building: ${v.building}`, `Heard via: ${v.source}`].filter(Boolean);
    if (endpoint) {
      setState("sending");
      try {
        const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...v, needs: v.needs.join(", "), fax: undefined, _subject: `Project details from ${v.name}` }) });
        setState(r.ok ? "sent" : "error");
      } catch { setState("error"); }
      return;
    }
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Project details from ${v.name}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setState("mail");
  }

  if (state === "sent") return <div className="pf pf-done" role="status"><h3>Thanks, {v.name.split(" ")[0]}.</h3><p>Your project details are in. You get a reply within 1 business day.</p></div>;

  return (
    <form className="pf" onSubmit={submit} noValidate>
      <h3>Your details</h3>
      <div className="pf-row">
        <label>Your name<input type="text" autoComplete="name" value={v.name} onChange={set("name")} aria-invalid={tried && !!err.name} />{show("name")}</label>
        <label>Work email<input type="email" autoComplete="email" inputMode="email" value={v.email} onChange={set("email")} aria-invalid={tried && !!err.email} />{show("email")}</label>
      </div>
      <label>Website <i>(optional)</i><input type="url" autoComplete="url" placeholder="https://" value={v.website} onChange={set("website")} /></label>
      <label className="pf-trap" aria-hidden="true">Fax number (leave this empty)<input type="text" tabIndex={-1} autoComplete="off" value={v.fax} onChange={set("fax")} /></label>

      <h3>Your project</h3>
      <fieldset>
        <legend>What do you need?</legend>
        <div className="pf-chips">
          {needs.map((n) => <button type="button" key={n} aria-pressed={v.needs.includes(n)} onClick={() => toggle(n)}>{n}</button>)}
        </div>
        {show("needs")}
      </fieldset>
      <div className="pf-row">
        <label>Budget<select value={v.budget} onChange={set("budget")} aria-invalid={tried && !!err.budget}><option value="">Choose a range</option>{budgets.map((o) => <option key={o}>{o}</option>)}</select>{show("budget")}</label>
        <label>When do you want to start? <i>(optional)</i><select value={v.start} onChange={set("start")}><option value="">Choose one</option>{starts.map((o) => <option key={o}>{o}</option>)}</select></label>
      </div>
      <label>{ask} <i>(optional)</i><textarea rows={3} placeholder={example} value={v.building} onChange={set("building")} /></label>
      <label>How did you hear about {who}?<select value={v.source} onChange={set("source")} aria-invalid={tried && !!err.source}><option value="">Choose one</option>{sources.map((o) => <option key={o}>{o}</option>)}</select>{show("source")}</label>

      <button type="submit" className="hero2-btn hero2-btn-primary pf-send" disabled={state === "sending"}>{state === "sending" ? "Sending" : "Send project details"} <span aria-hidden="true">→</span></button>
      {state === "error" ? <p className="pf-err" role="alert"><span aria-hidden="true">!</span>Could not send. Email {email} instead.</p> : null}
      {state === "mail" ? <p className="pf-note" role="status">Your email app opened with the details filled in. Press send there. If nothing opened, write to <b>{email}</b>.</p> : <p className="pf-note">You get a reply within 1 business day, with questions or a time to talk.</p>}
    </form>
  );
}
