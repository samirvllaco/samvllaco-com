"use client";
import { useEffect, useRef, useState } from "react";
import { LEADS_ENDPOINT, EMAIL } from "../lib/site";

const PLANS = { personal: "30-min UI/UX review + the book", complete: "All-inclusive UI/UX review + branding tips + the book" };

// The plan line under the title: same box from the first frame, only the words change once the plan is read.
export function PlanLine() {
  const [plan, setPlan] = useState("");
  useEffect(() => { try { setPlan(PLANS[new URLSearchParams(location.search).get("plan")] || ""); } catch {} }, []);
  return (
    <p className="rv-plan">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      <span>{plan ? <>Booked: <b>{plan}</b></> : <>Your review is <b>booked</b></>}</span>
    </p>
  );
}

// One short confetti burst on arrival. Canvas, no library, skipped for reduced motion. Never blocks clicks.
export function Confetti() {
  const ref = useRef(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = ref.current; const ctx = c.getContext("2d");
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const W = innerWidth, H = innerHeight;
    c.width = W * dpr; c.height = H * dpr; ctx.scale(dpr, dpr);
    const cols = ["#ffb35c", "#2563eb", "#7cc4ff", "#ffffff", "#f39a2c", "#a5b4fc"];
    const parts = Array.from({ length: 140 }, (_, i) => {
      const left = i % 2 === 0;
      return { x: left ? -10 : W + 10, y: H * (0.55 + Math.random() * 0.3), vx: (left ? 1 : -1) * (6 + Math.random() * 8), vy: -(10 + Math.random() * 9), w: 6 + Math.random() * 6, h: 8 + Math.random() * 8, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: cols[i % cols.length] };
    });
    let raf, t0;
    const step = (t) => {
      t0 ??= t; const age = t - t0;
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = age > 2600 ? Math.max(0, 1 - (age - 2600) / 900) : 1;
      for (const p of parts) {
        p.vy += 0.32; p.vx *= 0.985; p.vy *= 0.985; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.r * 2))); ctx.restore();
      }
      if (age < 3500) raf = requestAnimationFrame(step); else ctx.clearRect(0, 0, W, H);
    };
    const go = setTimeout(() => { raf = requestAnimationFrame(step); }, 350);
    return () => { clearTimeout(go); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} className="rv-confetti" aria-hidden="true" />;
}

// Optional: buyers resend their link and notes here, see exactly what reached me, and it lands in Sam's inbox.
export function DetailsForm() {
  const [state, setState] = useState("idle");
  const [f, setF] = useState({ email: "", link: "", notes: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  async function send(e) {
    e.preventDefault();
    if (state === "busy") return;
    setState("busy");
    let plan = "";
    try { plan = PLANS[new URLSearchParams(location.search).get("plan")] || ""; } catch {}
    try {
      const r = await fetch(LEADS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: f.email, link: f.link, notes: f.notes, plan, _subject: `Review details: ${f.link}`, _template: "table", _captcha: "false", _replyto: f.email, page: "samvllaco.com/review/thanks/" }),
      });
      setState(r.ok ? "done" : "error");
    } catch { setState("error"); }
  }
  if (state === "done") {
    return (
      <div className="rv-got" role="status">
        <p className="rv-got-h"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg><b>Got it. This is what reached me:</b></p>
        <dl>
          <dt>Your email</dt><dd>{f.email}</dd>
          <dt>Your link</dt><dd>{f.link}</dd>
          {f.notes ? <><dt>Your notes</dt><dd>{f.notes}</dd></> : null}
        </dl>
      </div>
    );
  }
  return (
    <form className="rv-form" onSubmit={send}>
      <label><span>Your email</span><input type="email" required autoComplete="email" placeholder="you@company.com" value={f.email} onChange={set("email")} /></label>
      <label><span>Your site or app link</span><input type="url" required placeholder="https://yourapp.com" value={f.link} onChange={set("link")} /></label>
      <label><span>What bugs you most, and which screens matter most? <em>Optional</em></span><textarea rows={3} placeholder="Onboarding feels long, the dashboard looks generic" value={f.notes} onChange={set("notes")} /></label>
      <button type="submit" className="hero2-btn hero2-btn-light" disabled={state === "busy"}>{state === "busy" ? "Sending..." : "Send to Sam"}</button>
      {state === "error" ? <p className="rv-err" role="alert">That didn't go through. Email it to {EMAIL} instead.</p> : null}
    </form>
  );
}
