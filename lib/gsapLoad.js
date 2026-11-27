// The vendored GSAP (the same file the intro uses), loaded once on demand. Resolves with window.gsap, or null if it
// cannot load, so callers fall back to plain style updates.
let p = null;
export function loadGsap() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.gsap) return Promise.resolve(window.gsap);
  if (!p) {
    p = new Promise((res) => {
      const sc = document.createElement("script");
      sc.src = "/vendor/gsap-3.15.1.min.js";
      sc.async = true;
      sc.onload = () => res(window.gsap || null);
      sc.onerror = () => res(null);
      document.head.appendChild(sc);
    });
  }
  return p;
}
