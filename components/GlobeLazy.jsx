"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// The globe and its map data load only when the card is about to scroll into view.
const BentoGlobe = dynamic(() => import("./BentoGlobe"), { ssr: false, loading: () => <span className="bx-globe" aria-hidden="true" /> });

export default function GlobeLazy() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: "600px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return on ? <BentoGlobe /> : <span ref={ref} className="bx-globe" aria-hidden="true" />;
}
