"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Marks the link to the page you are on, in the header and the footer link map.
export default function ActiveNav() {
  const path = usePathname() || "/";
  useEffect(() => {
    const here = path.endsWith("/") ? path : `${path}/`;
    document.querySelectorAll(".head-nav a, .foot-map a, .crumb-pop a").forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (href.startsWith("http") || href.includes("#")) return;
      const h = href.endsWith("/") ? href : `${href}/`;
      if (h === here) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    const groups = { "mega-services": ["/services/"], "mega-resources": ["/writing/", "/ebook/", "/products/", "/building/"] };
    Object.entries(groups).forEach(([id, roots]) => {
      const btn = document.querySelector(`.mega-btn[aria-controls="${id}"]`);
      if (btn) btn.classList.toggle("is-current", roots.some((r) => here.startsWith(r)));
    });
  }, [path]);
  return null;
}
