"use client";
import { useEffect, useRef, useState } from "react";

// Cloudflare Turnstile, loaded only when a form that needs it is on screen. Returns the widget box and the token.
export function useTurnstile(siteKey, opts = {}) {
  const box = useRef(null);
  const wid = useRef(null);
  const host = useRef(null);
  const [token, setToken] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!siteKey) return;
    if (window.turnstile) { setLoaded(true); return; }
    let s = document.querySelector("script[data-turnstile]");
    if (!s) {
      s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.dataset.turnstile = "1";
      document.head.appendChild(s);
    }
    const on = () => setLoaded(true);
    s.addEventListener("load", on);
    return () => s.removeEventListener("load", on);
  }, [siteKey]);
  // Runs after every render: when the form remounts (it hides while a scan runs), the box is a new element, so draw again.
  useEffect(() => {
    if (!loaded || !siteKey || !window.turnstile || !box.current || host.current === box.current) return;
    if (wid.current !== null) { try { window.turnstile.remove(wid.current); } catch { /* already gone */ } }
    setToken("");
    host.current = box.current;
    wid.current = window.turnstile.render(box.current, { sitekey: siteKey, theme: "dark", size: "flexible", ...opts, callback: setToken, "expired-callback": () => setToken(""), "error-callback": () => setToken("") });
  });
  const reset = () => { if (window.turnstile && wid.current !== null && host.current?.isConnected) window.turnstile.reset(wid.current); setToken(""); };
  return { box, token, reset };
}

export const track = (type, id) => {
  try { navigator.sendBeacon("/api/slop-score/event", JSON.stringify({ type, id })); } catch { /* optional */ }
};
