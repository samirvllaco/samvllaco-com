"use client";
import { EMAIL } from "../lib/site";
import { useCopyChip } from "./CopyChip";
import { copyText } from "../lib/copy";

export default function CopyEmailInline({ icon = false }) {
  const { chip, live, start } = useCopyChip();
  async function copy(e) {
    if (await copyText(EMAIL, e.currentTarget.querySelector("span"))) start();
  }
  return (
    <>
      <button type="button" className="hp-copy" onClick={copy}>
        {icon ? <i className="tg-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 6h16v12H4z" /><path d="M4 7l8 6 8-6" /></svg></i> : null}<span>{EMAIL}</span><span className="sr-only">Copy email</span>{chip}
      </button>
      {live}
    </>
  );
}
