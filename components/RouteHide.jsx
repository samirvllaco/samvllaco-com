"use client";
import { usePathname } from "next/navigation";

// Free tools and the contact page keep a lean footer and no photos of Sam, so visitors stay on the task
// and the one call to action (owner, 25 Nov 2026).
export const LEAN = ["/tools/", "/slop-score/", "/book/"];
export const isLean = (path) => LEAN.some((p) => (path || "/").startsWith(p));

// Renders children everywhere except on the given path prefixes (default: the lean pages).
export default function RouteHide({ on = LEAN, children }) {
  const path = usePathname() || "/";
  return on.some((p) => path.startsWith(p)) ? null : children;
}
