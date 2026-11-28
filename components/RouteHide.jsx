"use client";
import { usePathname } from "next/navigation";

// Free tools, the contact page, work and pricing keep a lean footer and no photos of Sam, so visitors stay on the task
// and the one call to action (owner, 25 Nov 2026; /work/ and /pricing/ added the same day).
export const LEAN = ["/tools/", "/slop-score/", "/book/", "/free-audit/", "/work/"];
export const isLean = (path) => LEAN.some((p) => (path || "/").startsWith(p));

// `sub`: prefixes that match only the pages under them (e.g. "/writing/" matches an article, not the list).
const hit = (path, on, sub) => on.some((p) => path.startsWith(p)) || sub.some((p) => path.startsWith(p) && path !== p);
// Renders children everywhere except on the given path prefixes (default: the lean pages).
export default function RouteHide({ on = LEAN, sub = [], children }) {
  const path = usePathname() || "/";
  return hit(path, on, sub) ? null : children;
}

// Renders children only on the given path prefixes.
export function RouteOnly({ on, sub = [], children }) {
  const path = usePathname() || "/";
  return hit(path, on, sub) ? children : null;
}
