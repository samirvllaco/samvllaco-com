"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// The bento's canvas work (the dithered sphere, the client dots) loads only when the bento is about to scroll in.
const BentoRun = dynamic(() => import("./BentoRun"), { ssr: false });

export default function BentoLazy() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current?.closest(".bx2");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: "600px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <span ref={ref} hidden>{on ? <BentoRun at={ref} /> : null}</span>;
}
