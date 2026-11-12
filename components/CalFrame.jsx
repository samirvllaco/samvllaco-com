"use client";
import { useEffect, useRef } from "react";

// Booking calendar. Cal.com reports its own height, so the frame grows for the form step and never leaves a gap.
export default function CalFrame({ src }) {
  const ref = useRef(null);
  useEffect(() => {
    const onMsg = (e) => {
      const f = ref.current;
      if (!f || e.source !== f.contentWindow) return;
      const d = e.data;
      if (d && d.originator === "CAL" && d.type === "__dimensionChanged" && d.data && d.data.iframeHeight > 200) f.style.height = `${Math.ceil(d.data.iframeHeight)}px`;
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);
  return <iframe ref={ref} src={src} title="Booking calendar" loading="lazy" />;
}
