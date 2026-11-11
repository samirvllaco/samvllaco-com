import fs from "fs";
import path from "path";

// "Ask AI about us": each button opens an AI assistant with a question about this site already typed in.
// To show a logo on a button, save the official SVG from that company's brand kit as public/ai/<id>.svg.
const TOOLS = [
  { id: "chatgpt", name: "ChatGPT", url: (q) => `https://chatgpt.com/?q=${q}` },
  { id: "claude", name: "Claude", url: (q) => `https://claude.ai/new?q=${q}` },
  { id: "perplexity", name: "Perplexity", url: (q) => `https://www.perplexity.ai/search?q=${q}` },
  { id: "google-ai", name: "Google AI", url: (q) => `https://www.google.com/search?udm=50&q=${q}` },
  { id: "grok", name: "Grok", url: (q) => `https://x.com/i/grok?text=${q}` },
];

export default function AskAI({ name, prompt, inline }) {
  const q = encodeURIComponent(prompt);
  const has = (id) => { try { return fs.existsSync(path.join(process.cwd(), "public", "ai", `${id}.svg`)); } catch { return false; } };
  return (
    <div className={inline ? "ask-ai ask-ai-row" : "wrap ask-ai"} role="group" aria-labelledby="ask-ai-h">
      <p id="ask-ai-h" className="ask-ai-t">Ask AI about {name.split(" ")[0]}</p>
      <ul>
        {TOOLS.map((t) => (
          <li key={t.id}>
            <a href={t.url(q)} target="_blank" rel="noopener noreferrer" aria-label={`Ask ${t.name} about ${name}, opens in a new tab`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {has(t.id) ? <img src={`/ai/${t.id}.svg`} width="20" height="20" alt="" /> : null}
              <span>{t.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
