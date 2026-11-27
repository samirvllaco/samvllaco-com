"use client";
import { usePathname } from "next/navigation";

// Free tools, the contact page, work and pricing keep a lean footer and no photos of Sam, so visitors stay on the task
// and the one call to action (owner, 25 Nov 2026; /work/ and /pricing/ added the same day).
export const LEAN = ["/tools/", "/slop-score/", "/book/", "/work/", "/pricing/"];
export const isLean = (path) => LEAN.some((p) => (path || "/").startsWith(p));

// Renders children everywhere except on the given path prefixes (default: the lean pages).
export default function RouteHide({ on = LEAN, children }) {
  const path = usePathname() || "/";
  return on.some((p) => path.startsWith(p)) ? null : children;
}

// Renders children only on the given path prefixes.
export function RouteOnly({ on, children }) {
  const path = usePathname() || "/";
  return on.some((p) => path.startsWith(p)) ? children : null;
}
