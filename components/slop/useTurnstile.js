"use client";
import { useEffect, useRef, useState } from "react";

// Cloudflare Turnstile, loaded only when a form that needs it is on screen. Returns the widget box and the token.
export function useTurnstile(siteKey) {
  const box = useRef(null);
  const wid = useRef(null);
  const [token, setToken] = useState("");
  useEffect(() => {
    if (!siteKey || !box.current) return;
    let gone = false;
    const draw = () => {
      if (gone || !window.turnstile || wid.current !== null || !box.current) return;
      wid.current = window.turnstile.render(box.current, { sitekey: siteKey, theme: "dark", size: "flexible", callback: setToken, "expired-callback": () => setToken(""), "error-callback": () => setToken("") });
    };
    if (window.turnstile) draw();
    else {
      let s = document.querySelector("script[data-turnstile]");
      if (!s) {
        s = document.createElement("script");
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        s.async = true;
        s.dataset.turnstile = "1";
        document.head.appendChild(s);
      }
      s.addEventListener("load", draw);
    }
    return () => { gone = true; };
  }, [siteKey]);
  const reset = () => { if (window.turnstile && wid.current !== null) window.turnstile.reset(wid.current); setToken(""); };
  return { box, token, reset };
}

export const track = (type, id) => {
  try { navigator.sendBeacon("/api/slop-score/event", JSON.stringify({ type, id })); } catch { /* optional */ }
};
