"use client";
import { EMAIL } from "../lib/site";
import { useCopyChip } from "./CopyChip";

export default function CopyEmailInline() {
  const { chip, live, start } = useCopyChip();
  async function copy() {
    try { await navigator.clipboard.writeText(EMAIL); start(); } catch {}
  }
  return (
    <>
      <button type="button" className="hp-copy" onClick={copy}>
        <span>{EMAIL}</span><span className="sr-only">Copy email</span>{chip}
      </button>
      {live}
    </>
  );
}
