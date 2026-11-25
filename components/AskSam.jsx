"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTurnstile } from "./slop/useTurnstile";
import { EMAIL } from "../lib/site";

// "Ask Sam's AI" (owner, 25 Nov 2026): a small pill at the bottom of the page that opens a chat answering from the site's
// own facts (slopscore/src/ask.js). Shows after the first scroll and only once the API is switched on.
const CHIPS = ["What does a weekly sprint include?", "How fast can you start?", "Can you fix my AI-built app?"];
const HIDE = ["/fix-ai-slop-ui/", "/book/"];
const ERR = {
  rate: "You've asked a lot this hour. Book a call and ask Sam directly.",
  cap: "The assistant is busy today. Book a call or email Sam.",
  turnstile: "Please finish the quick check below, then send again.",
  invalid: "That message didn't go through. Try a shorter question.",
};
const OFF = `The assistant is offline right now. Email ${EMAIL} or book a call.`;

// Answers may hold [text](/path/) links to pages on this site; everything else stays plain text.
function Text({ t }) {
  const out = [];
  const re = /\[([^\]]{1,80})\]\((\/[^)\s]{0,120})\)|\*\*/g;
  let last = 0, m, k = 0;
  while ((m = re.exec(t))) {
    if (m.index > last) out.push(t.slice(last, m.index));
    if (m[1]) out.push(<a key={k++} href={m[2]}>{m[1]}</a>);
    last = re.lastIndex;
  }
  out.push(t.slice(last));
  return out;
}

export default function AskSam() {
  const path = usePathname() || "/";
  const [on, setOn] = useState(null); // { siteKey } once the API is ready
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const sid = useRef("");
  const input = useRef(null);
  const pill = useRef(null);
  const list = useRef(null);
  const panel = useRef(null);
  const ts = useTurnstile(open && on && !sid.current ? on.siteKey : null, { appearance: "interaction-only" });

  useEffect(() => {
    let gone = false;
    const go = () => {
      if (window.scrollY < 200) return;
      window.removeEventListener("scroll", go);
      fetch("/api/ask/status").then((r) => (r.ok ? r.json() : null)).then((j) => { if (!gone && j && j.ready) { setOn(j); setShow(true); } }).catch(() => {});
    };
    window.addEventListener("scroll", go, { passive: true });
    go();
    try { sid.current = sessionStorage.getItem("ask:sid") || ""; } catch { /* optional */ }
    return () => { gone = true; window.removeEventListener("scroll", go); };
  }, []);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const key = (e) => { if (e.key === "Escape") { setOpen(false); pill.current?.focus(); } };
    const out = (e) => { if (panel.current && !panel.current.contains(e.target) && !pill.current?.contains(e.target)) setOpen(false); };
    window.addEventListener("keydown", key);
    document.addEventListener("pointerdown", out);
    return () => { window.removeEventListener("keydown", key); document.removeEventListener("pointerdown", out); };
  }, [open]);

  useEffect(() => { if (list.current) list.current.scrollTop = list.current.scrollHeight; }, [msgs]);

  if (!show || HIDE.some((h) => path.startsWith(h))) return null;

  const send = async (q) => {
    q = q.trim();
    if (!q || busy) return;
    if (!sid.current && !ts.token) { setNote(ERR.turnstile); return; }
    setNote(""); setText(""); setBusy(true);
    const next = [...msgs, { role: "user", content: q }];
    setMsgs([...next, { role: "assistant", content: "" }]);
    try {
      const r = await fetch("/api/ask", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: next, sid: sid.current, token: ts.token, page: path }) });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        if (j.error === "turnstile") { sid.current = ""; ts.reset(); }
        throw new Error(ERR[j.error] || OFF);
      }
      const s = r.headers.get("x-ask-sid");
      if (s) { sid.current = s; try { sessionStorage.setItem("ask:sid", s); } catch { /* optional */ } }
      const rd = r.body.getReader(), dec = new TextDecoder();
      let a = "";
      for (;;) {
        const { value, done } = await rd.read();
        if (done) break;
        a += dec.decode(value, { stream: true });
        setMsgs([...next, { role: "assistant", content: a }]);
      }
      if (!a) throw new Error(OFF);
    } catch (e) {
      setMsgs(next);
      setNote(e.message && e.message.length > 20 ? e.message : OFF);
    }
    setBusy(false);
  };

  return (
    <>
      <button ref={pill} type="button" className={`ask-pill${open ? " is-open" : ""}`} aria-expanded={open} aria-controls="ask-panel" onClick={() => setOpen((v) => !v)}>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 3l1.8 4.9L18.7 9.7 13.8 11.5 12 16.4 10.2 11.5 5.3 9.7 10.2 7.9zM18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" /></svg>
        Ask Sam's AI
      </button>
      {open ? (
        <section ref={panel} id="ask-panel" className="ask-panel" role="dialog" aria-modal="false" aria-labelledby="ask-h">
          <header className="ask-head">
            <div>
              <p id="ask-h" className="ask-title">Ask Sam's AI</p>
              <p>An AI that answers from this site. Sam reads the questions to improve it.</p>
            </div>
            <button type="button" className="ask-x" onClick={() => { setOpen(false); pill.current?.focus(); }} aria-label="Close the chat">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </header>
          <div ref={list} className="ask-list" aria-live="polite">
            <p className="ask-msg is-ai">Hi. Ask me about Sam's services, prices, process or past work.</p>
            {msgs.map((m, i) => (
              <p key={i} className={`ask-msg ${m.role === "user" ? "is-me" : "is-ai"}`}>
                {m.role === "user" ? <span className="sr-only">You: </span> : <span className="sr-only">Assistant: </span>}
                {m.content ? <Text t={m.content} /> : <span className="ask-dots"><i /><i /><i /><span className="sr-only">Writing</span></span>}
              </p>
            ))}
          </div>
          {msgs.length ? null : (
            <ul className="ask-chips" aria-label="Suggested questions">
              {CHIPS.map((c) => <li key={c}><button type="button" onClick={() => send(c)}>{c}</button></li>)}
            </ul>
          )}
          <form className="ask-form" onSubmit={(e) => { e.preventDefault(); send(text); }}>
            <label htmlFor="ask-in" className="sr-only">Your question</label>
            <input ref={input} id="ask-in" type="text" autoComplete="off" maxLength={800} placeholder="Ask about pricing, process, timelines" value={text} onChange={(e) => setText(e.target.value)} />
            <button type="submit" className="ask-send" disabled={busy || !text.trim()} aria-label="Send">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
            </button>
          </form>
          <div className="ask-ts" ref={ts.box} />
          <p className="ask-note" role="status">{note}</p>
          <p className="ask-foot">Rather talk to Sam? <a href="/book/">Book a 30-min call</a></p>
        </section>
      ) : null}
    </>
  );
}
