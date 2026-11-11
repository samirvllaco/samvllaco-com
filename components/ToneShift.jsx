"use client";
import { useEffect } from "react";

// Turns the page light while the target section sits in the middle of the screen, then back to the visitor's own theme.
export default function ToneShift({ target = "#work" }) {
  useEffect(() => {
    const el = document.querySelector(target);
    const root = document.documentElement;
    if (!el || !("IntersectionObserver" in window)) return;
    let timer;
    const own = () => { try { return JSON.parse(localStorage.getItem("sv:theme")) === "light" ? "light" : null; } catch (e) { return null; } };
    const set = (light) => {
      const want = light ? "light" : own();
      if ((root.dataset.theme || null) === want) return;
      root.classList.add("tone-fade");
      if (want) root.dataset.theme = want; else delete root.dataset.theme;
      window.dispatchEvent(new Event("sv:theme"));
      clearTimeout(timer);
      timer = setTimeout(() => root.classList.remove("tone-fade"), 900);
    };
    const io = new IntersectionObserver(([e]) => set(e.isIntersecting), { rootMargin: "-45% 0px -45% 0px" });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); root.classList.remove("tone-fade"); const o = own(); if (o) root.dataset.theme = o; else delete root.dataset.theme; };
  }, [target]);
  return null;
}
