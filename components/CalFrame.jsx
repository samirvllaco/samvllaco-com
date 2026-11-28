"use client";
import { useEffect, useRef } from "react";

// Booking calendar. Cal.com reports its own height, so the frame grows for the form step and never leaves a gap.
// Once Cal.com talks to us, we send it the site's colours through its embed "ui" message: a transparent page and
// the site's dark tones, so the calendar sits on the page with one frame instead of a black box around it.
const UI = {
  colorScheme: "dark",
  styles: { body: { background: "transparent" } },
  cssVarsPerTheme: {
    dark: {
      "cal-bg": "#0e0e10",
      "cal-bg-muted": "#141416",
      "cal-bg-subtle": "#1a1a1d",
      "cal-bg-emphasis": "#232326",
      "cal-border": "rgba(255, 255, 255, 0.12)",
      "cal-border-subtle": "rgba(255, 255, 255, 0.08)",
      "cal-border-booker": "rgba(255, 255, 255, 0.08)",
    },
  },
};

export default function CalFrame({ src }) {
  const ref = useRef(null);
  useEffect(() => {
    let sent = 0;
    const send = () => { const f = ref.current; if (f && f.contentWindow) { f.contentWindow.postMessage({ originator: "CAL", method: "ui", arg: UI }, "*"); sent++; } };
    const onMsg = (e) => {
      const f = ref.current;
      if (!f || e.source !== f.contentWindow) return;
      const d = e.data;
      if (!d || d.originator !== "CAL") return;
      if (sent < 3) send();
      if (d.type === "__dimensionChanged" && d.data && d.data.iframeHeight > 200) f.style.height = `${Math.ceil(d.data.iframeHeight)}px`;
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);
  // The Cal.com footer mark under the booker is clipped off: the frame sits in a clipping box and pulls
  // its last 80px (the branding strip) below the box edge (owner, 27 Nov 2026).
  return <div className="cal-clip"><iframe ref={ref} src={src} title="Booking calendar" loading="lazy" /></div>;
}
