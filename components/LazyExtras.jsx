"use client";
import dynamic from "next/dynamic";

// Floating extras that are not needed for the first paint. Loaded in the browser after the page is up.
const ToTop = dynamic(() => import("./ToTop"), { ssr: false });
const ActiveNav = dynamic(() => import("./ActiveNav"), { ssr: false });
const BookPopup = dynamic(() => import("./BookPopup"), { ssr: false });
const VideoBubble = dynamic(() => import("./VideoBubble"), { ssr: false });
const Delight = dynamic(() => import("./Delight"), { ssr: false });
const SmoothScroll = dynamic(() => import("./SmoothScroll"), { ssr: false });

export default function LazyExtras() {
  return (<><SmoothScroll /><ActiveNav /><ToTop /><BookPopup /><VideoBubble /><Delight /></>);
}
