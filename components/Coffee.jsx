import { COFFEE_URL } from "../lib/site";

export default function Coffee({ label = "Buy me a coffee" }) {
  if (!COFFEE_URL) return null;
  return (
    <a className="hero2-btn hero2-btn-light" href={COFFEE_URL} rel="noopener">
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" style={{ marginRight: 8 }}><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Zm13 1h1.5a2.5 2.5 0 0 1 0 5H17M8 3v2m4-2v2"/></svg>
      {label}
    </a>
  );
}
