"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTurnstile } from "./slop/useTurnstile";
import { EMAIL } from "../lib/site";

// "Ask Sam's AI" (owner, 25 Nov 2026): a small pill at the bottom of the page that opens a chat answering from the site's
// own facts (slopscore/src/ask.js). Shows after the first scroll and only once the API is switched on.
// Quick links (owner, 25 Nov 2026: "add more quick links"): always shown above the input in one swipeable row.
// [label, question to send] or [label, null, page to open].
const CHIPS = [
  ["Book a call", null, "/book/"],
  ["Pricing", "What does it cost to work with you?"],
  ["UX audit", "What do I get from a UX audit?"],
  ["UI/UX sprint", "What does a weekly sprint include?"],
  ["Redesign my app", "Can you redesign our existing app without changing its features?"],
  ["From zero", "Can you design a new product from scratch?"],
  ["AI-built app", "Can you fix my AI-built app?"],
  ["How fast can you start?", "How fast can you start?"],
  ["Case studies", null, "/work/"],
];
// The empty input suggests what to ask, one idea at a time.
const HINTS = ["Ask about pricing", "Ask what a UX audit covers", "Ask how a sprint works", "Ask how fast Sam can start"];
// Thinking state (owner, 25 Nov 2026): a 3x3 grid of dots breathing in a diagonal wave, and the status words under a slow
// light sweep. The words change as the answer is prepared; each new one rises in from below inside a clipped line.
const STEPS = ["Reading Sam's site", "Checking his work and reviews", "Writing your answer"];
function Thinking() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => Math.min(n + 1, STEPS.length - 1)), 1600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="ask-think">
      <span className="ask-grid" aria-hidden="true">{Array.from({ length: 9 }, (_, k) => <i key={k} style={{ "--d": (k % 3) + Math.floor(k / 3) }} />)}</span>
      <span className="ask-think-line"><span className="ask-think-size" aria-hidden="true">{STEPS.reduce((a, b) => (b.length > a.length ? b : a))}</span><span key={i} className="ask-think-t">{STEPS[i]}</span></span>
      <span className="sr-only">Writing</span>
    </span>
  );
}
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
  const drag = useRef(null);
  const asked = useRef(0);
  const [hint, setHint] = useState(0);
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

  useEffect(() => {
    if (!open || text) return;
    const t = setInterval(() => setHint((n) => (n + 1) % HINTS.length), 3200);
    return () => clearInterval(t);
  }, [open, text]);

  // Phones: drag the sheet down by its top edge to close it. It follows the finger and springs back if let go early.
  const grab = (e) => {
    if (e.pointerType === "mouse" || e.target.closest("button")) return;
    drag.current = { y: e.clientY, t: performance.now(), dy: 0 };
    panel.current.style.transition = "none";
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const pull = (e) => {
    const d = drag.current;
    if (!d) return;
    d.dy = Math.max(0, e.clientY - d.y);
    panel.current.style.transform = `translateY(${d.dy}px)`;
  };
  const drop = () => {
    const d = drag.current, el = panel.current;
    drag.current = null;
    if (!d || !el) return;
    const fast = d.dy / Math.max(1, performance.now() - d.t) > 0.5;
    el.style.transition = "transform .26s cubic-bezier(.22, 1, .36, 1)";
    if (d.dy > 96 || (fast && d.dy > 24)) {
      el.style.transform = "translateY(110%)";
      setTimeout(() => { setOpen(false); pill.current?.focus({ preventScroll: true }); }, 220);
    } else el.style.transform = "";
  };
  const clear = () => { setMsgs([]); setNote(""); asked.current = 0; input.current?.focus(); };

  // Focus on the answer: when a question goes out, bring it to the top of the list and let the answer grow under it,
  // so the visitor reads from the first line instead of chasing the end of the text.
  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const n = msgs.filter((m) => m.role === "user").length;
    if (n === asked.current) return;
    asked.current = n;
    const mine = el.querySelectorAll(".ask-msg.is-me");
    const q = mine[mine.length - 1];
    if (q) el.scrollTo({ top: Math.max(0, q.offsetTop - el.offsetTop - 8), behavior: "smooth" });
  }, [msgs]);

  // Phones: keep the panel above the on-screen keyboard and inside what's visible (owner, 25 Nov 2026).
  useEffect(() => {
    const vv = typeof window !== "undefined" && window.visualViewport;
    if (!open || !vv) return;
    let raf = 0;
    const fit = () => {
      raf = 0;
      const el = panel.current;
      if (!el) return;
      const kb = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
      el.style.setProperty("--kb", `${kb}px`);
      el.style.setProperty("--ask-max", `${Math.round(vv.height - (kb > 0 ? 16 : window.innerWidth <= 640 ? 24 : 96))}px`); // phones: a near-full sheet over the header
      if (kb > 0 && list.current) list.current.scrollTop = list.current.scrollHeight;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(fit); };
    fit();
    vv.addEventListener("resize", on);
    vv.addEventListener("scroll", on);
    return () => { vv.removeEventListener("resize", on); vv.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, [open]);

  if (!show || HIDE.some((h) => path.startsWith(h))) return null;
  // After the first full answer, the panel offers the call: the one next step that converts.
  const answered = !busy && msgs.some((m) => m.role === "assistant" && m.content);

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
        <section ref={panel} id="ask-panel" className="ask-panel" role="dialog" aria-modal="false" aria-labelledby="ask-h" data-lenis-prevent="">
          <header className="ask-head" onPointerDown={grab} onPointerMove={pull} onPointerUp={drop} onPointerCancel={drop}>
            <i className="ask-handle" aria-hidden="true" />
            <span className="ask-badge" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sam-face-144.webp?v=1" width="40" height="40" alt="" />
              <svg className="ask-hat" viewBox="0 0 32 28" width="30" height="26"><path d="M3 24.5c6-2.6 20-2.6 26 0" /><path d="M7 23.4 17.5 2.5c.6-1.2 2.3-.7 2.2.6L21.8 22.6" /><path className="ask-star" d="m15.2 13.6.7 1.8 1.9.1-1.5 1.2.5 1.8-1.6-1-1.6 1 .5-1.8-1.5-1.2 1.9-.1z" /></svg>
            </span>
            <div>
              <p id="ask-h" className="ask-title">Ask Sam's AI</p>
              <p><i className="ask-live" aria-hidden="true" />Answers from this site</p>
            </div>
            <button type="button" className="ask-clear" onClick={clear} disabled={!msgs.length || busy}>Clear</button>
            <button type="button" className="ask-x" onClick={() => { setOpen(false); pill.current?.focus(); }} aria-label="Close the chat">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </header>
          <div ref={list} className="ask-list" aria-live="polite">
            <p className="ask-msg is-ai">Hi. Ask me about Sam's services, prices, process or past work.</p>
            {msgs.map((m, i) => (
              <div key={i} className={`ask-turn ${m.role === "user" ? "is-me" : "is-ai"}`}>
                <p className={`ask-msg ${m.role === "user" ? "is-me" : "is-ai"}`}>
                  {m.role === "user" ? <span className="sr-only">You: </span> : <span className="sr-only">Assistant: </span>}
                  {m.content ? <Text t={m.content} /> : <Thinking />}
                </p>
                {m.role === "assistant" && m.content && !(busy && i === msgs.length - 1) ? <p className="ask-meta" aria-hidden="true">Sam&apos;s AI · Just now</p> : null}
              </div>
            ))}
          </div>
          <ul className="ask-chips" aria-label="Quick questions" onWheel={(e) => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) e.currentTarget.scrollLeft += e.deltaY; }}>
            {CHIPS.map(([label, q, href]) => (
              <li key={label}>{href ? <a href={href}>{label}</a> : <button type="button" disabled={busy} onClick={() => send(q)}>{label}</button>}</li>
            ))}
          </ul>
          <form className="ask-form" onSubmit={(e) => { e.preventDefault(); send(text); }}>
            <label htmlFor="ask-in" className="sr-only">Your question</label>
            <input ref={input} id="ask-in" type="text" autoComplete="off" maxLength={800} placeholder={`${HINTS[hint]}…`} value={text} onChange={(e) => setText(e.target.value)} />
            <button type="submit" className="ask-send" disabled={busy || !text.trim()} aria-label="Send">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
            </button>
          </form>
          <div className="ask-ts" ref={ts.box} />
          <p className="ask-note" role="status">{note}</p>
          {answered ? (
            <div className="ask-cta">
              <p><b>Want Sam on it?</b>Free 30-min call</p>
              <a className="hero2-btn hero2-btn-primary" href="/book/">Book a call</a>
            </div>
          ) : <p className="ask-foot">Rather talk to Sam? <a href="/book/">Book a 30-min call</a></p>}
        </section>
      ) : null}
    </>
  );
}
