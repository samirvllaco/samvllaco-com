"use client";
import dynamic from "next/dynamic";

// Floating extras that are not needed for the first paint. Loaded in the browser after the page is up.
const ToTop = dynamic(() => import("./ToTop"), { ssr: false });
const ActiveNav = dynamic(() => import("./ActiveNav"), { ssr: false });
// VideoBubble is off until Sam records his intro video (owner, 27 Nov 2026). Bring it back here: dynamic(() => import("./VideoBubble"), { ssr: false }).
const Delight = dynamic(() => import("./Delight"), { ssr: false });
const SmoothScroll = dynamic(() => import("./SmoothScroll"), { ssr: false });
const HeroDots = dynamic(() => import("./HeroDots"), { ssr: false });
const AskSam = dynamic(() => import("./AskSam"), { ssr: false });
const WidgetLoops = dynamic(() => import("./WidgetLoops"), { ssr: false });
const HeadReveal = dynamic(() => import("./HeadReveal"), { ssr: false });

export default function LazyExtras() {
  return (<><SmoothScroll /><ActiveNav /><ToTop />{/* The ebook bubble is off on every page (owner, 28 Nov 2026: "hide completely from all pages") */}<Delight /><HeroDots /><AskSam /><WidgetLoops /><HeadReveal /></>);
}
