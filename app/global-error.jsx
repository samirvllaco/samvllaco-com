"use client";
import { useEffect } from "react";

export default function GlobalError() {
  useEffect(() => {
    try {
      if (!window.sessionStorage.getItem("sv:reloaded")) {
        window.sessionStorage.setItem("sv:reloaded", "1");
        window.location.reload();
      }
    } catch {}
  }, []);
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#111112", color: "#f5f5f7", fontFamily: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif", padding: 24, textAlign: "center" }}>
        <div>
          <h1 style={{ fontSize: 28, margin: "0 0 8px" }}>Something went wrong</h1>
          <p style={{ color: "#a1a1a6", margin: "0 0 20px" }}>The page did not load correctly. Reloading usually fixes it.</p>
          <button type="button" onClick={() => window.location.reload()} style={{ minHeight: 44, padding: "0 20px", borderRadius: 22, border: 0, background: "#62c1fd", color: "#06213a", font: "600 16px system-ui", cursor: "pointer" }}>Reload the page</button>
        </div>
      </body>
    </html>
  );
}
