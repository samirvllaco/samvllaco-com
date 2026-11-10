"use client";
import { useEffect } from "react";

// If a page fails in the browser (most often right after a new version goes live),
// reload once to pick up the fresh files. If it still fails, show a calm message.
export default function Error({ reset }) {
  useEffect(() => {
    try {
      if (!window.sessionStorage.getItem("sv:reloaded")) {
        window.sessionStorage.setItem("sv:reloaded", "1");
        window.location.reload();
      }
    } catch {}
  }, []);
  return (
    <div className="wrap page stack prose">
      <h1>Something went wrong</h1>
      <p className="lede">The page did not load correctly. Reloading usually fixes it.</p>
      <p><button type="button" className="btn" onClick={() => { try { window.location.reload(); } catch { reset(); } }}>Reload the page</button></p>
    </div>
  );
}
