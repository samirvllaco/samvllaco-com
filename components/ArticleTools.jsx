"use client";
import { useEffect, useRef, useState } from "react";
import { useOnePop } from "../lib/onePop";

// Copy page, Share and Ask AI on every article (owner, 27 Nov 2026).
// Copy page puts the article as plain text on the clipboard (handy to paste into an AI tool).
// Share uses the phone's share sheet where there is one, and copies the link everywhere else.
// Ask AI opens ChatGPT, Claude or Perplexity with this article as the question.
const AI = [
  ["ChatGPT", (q) => `https://chatgpt.com/?q=${q}`],
  ["Claude", (q) => `https://claude.ai/new?q=${q}`],
  ["Perplexity", (q) => `https://www.perplexity.ai/search?q=${q}`],
];

export default function ArticleTools({ title, url }) {
  const [done, setDone] = useState("");
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  useOnePop("article-tools", open, () => setOpen(false));

  useEffect(() => {
    if (!open) return;
    const off = (e) => { if (!wrap.current?.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", off);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", off); document.removeEventListener("keydown", esc); };
  }, [open]);

  const flash = (k) => { setDone(k); setTimeout(() => setDone(""), 1800); };
  const copy = async (text, k) => { try { await navigator.clipboard.writeText(text); flash(k); } catch { flash(""); } };

  const copyPage = () => {
    const art = document.querySelector(".art");
    const parts = [title, url, ""];
    art?.querySelectorAll(".art-head .lede, .art-tldr, .art-body :is(h2, h3, p, li, blockquote)").forEach((el) => {
      const t = el.innerText.trim();
      if (!t) return;
      parts.push(el.matches("h2") ? `## ${t}` : el.matches("h3") ? `### ${t}` : el.matches("li") ? `- ${t}` : t);
    });
    copy(parts.join("\n\n"), "copy");
  };
  const share = async () => {
    if (navigator.share) { try { await navigator.share({ title, url }); } catch {} return; }
    copy(url, "share");
  };
  const q = encodeURIComponent(`Read ${url} and give me the key points of "${title}", then help me apply them to my product.`);

  return (
    <div className="art-tools">
      <button type="button" className="at-btn" onClick={copyPage}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8h12v12H8zM16 8V4H4v12h4" /></svg>{done === "copy" ? "Copied" : "Copy page"}
      </button>
      <button type="button" className="at-btn" onClick={share}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></svg>{done === "share" ? "Link copied" : "Share"}
      </button>
      <div className="at-ai" ref={wrap}>
        <button type="button" className="at-btn" aria-expanded={open} aria-controls="at-ai-menu" onClick={() => setOpen((v) => !v)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 1.5L21 18l-1.3.6L19 20l-.7-1.4L17 18l1.3-.5z" /></svg>Ask AI
        </button>
        <div className="at-menu" id="at-ai-menu" hidden={!open}>
          {AI.map(([name, href]) => (
            <a key={name} href={href(q)} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Ask {name}<span className="sr-only"> (opens in a new tab)</span></a>
          ))}
        </div>
      </div>
      <span className="sr-only" role="status">{done === "copy" ? "Page copied" : done === "share" ? "Link copied" : ""}</span>
    </div>
  );
}
