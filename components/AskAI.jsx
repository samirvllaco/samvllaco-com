// "Ask AI about us": each button opens an AI assistant with a question about this site already typed in.
const TOOLS = [
  { name: "ChatGPT", url: (q) => `https://chatgpt.com/?q=${q}` },
  { name: "Claude", url: (q) => `https://claude.ai/new?q=${q}` },
  { name: "Perplexity", url: (q) => `https://www.perplexity.ai/search?q=${q}` },
  { name: "Google AI", url: (q) => `https://www.google.com/search?udm=50&q=${q}` },
  { name: "Grok", url: (q) => `https://x.com/i/grok?text=${q}` },
];

export default function AskAI({ name, prompt }) {
  const q = encodeURIComponent(prompt);
  return (
    <section className="ask-ai" aria-labelledby="ask-ai-h" data-bg="#000000">
      <h2 id="ask-ai-h">Ask AI about {name}</h2>
      <ul>
        {TOOLS.map((t) => (
          <li key={t.name}>
            <a href={t.url(q)} target="_blank" rel="noopener noreferrer" aria-label={`Ask ${t.name} about ${name}, opens in a new tab`}>{t.name}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
