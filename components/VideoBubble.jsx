"use client";
import { useEffect, useRef, useState } from "react";
import { VIDEO_EMBED } from "../lib/site";

// Bottom right intro video bubble. Hover to peek, click to open the player.
export default function VideoBubble() {
  const [open, setOpen] = useState(false);
  const btn = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className={`vid${open ? " is-open" : ""}`}>
      <div className="vid-panel" role="dialog" aria-label="Intro video from Sam" aria-hidden={!open}>
        <div className="vid-frame">
          {VIDEO_EMBED ? (
            open && (
              <iframe
                src={VIDEO_EMBED}
                title="Intro video from Sam"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            )
          ) : (
            <div className="vid-empty">
              <span>Intro video coming soon</span>
            </div>
          )}
        </div>
      </div>
      <button
        ref={btn}
        type="button"
        className="vid-bubble"
        aria-expanded={open}
        aria-label={open ? "Close intro video" : "Play intro video from Sam"}
        onClick={() => setOpen((v) => !v)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sam-cut.webp" alt="" width="80" height="80" />
        <span className="vid-icon" aria-hidden="true">
          {open ? (
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M8 5v14l11-7z" /></svg>
          )}
        </span>
      </button>
      <span className="vid-on" aria-hidden="true" />
      <span className="vid-label" aria-hidden="true">Say hi</span>
    </div>
  );
}
