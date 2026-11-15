// A small Markdown reader for the articles in content/writing. It covers what those files use:
// headings, paragraphs, lists, quotes, fenced code and images. No package needed.
export const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function parseMd(src) {
  const lines = src.replace(/\r/g, "").split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    if (l.startsWith("```")) {
      const buf = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) buf.push(lines[i++]);
      i++;
      out.push({ t: "code", text: buf.join("\n") });
      continue;
    }
    const h = l.match(/^(#{2,3}) (.+)$/);
    if (h) { out.push({ t: h[1].length === 2 ? "h2" : "h3", text: h[2], id: slugify(h[2]) }); i++; continue; }
    const img = l.match(/^!\[(.*)\]\((.+)\)$/);
    if (img) { out.push({ t: "img", alt: img[1], ref: img[2] }); i++; continue; }
    if (l.startsWith("> ")) { out.push({ t: "quote", text: l.slice(2) }); i++; continue; }
    if (/^(- |\d+\. )/.test(l)) {
      const ordered = /^\d/.test(l);
      const items = [];
      while (i < lines.length && /^(- |\d+\. )/.test(lines[i])) items.push(lines[i++].replace(/^(- |\d+\. )/, ""));
      out.push({ t: ordered ? "ol" : "ul", items });
      continue;
    }
    out.push({ t: "p", text: l });
    i++;
  }
  return out;
}

// Inline marks: `code`, **bold**, _italic_ and [text](url). Returns a tree of { t, text | kids, href }.
export function parseInline(s) {
  const out = [];
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))|(_[^_]+_)/;
  let rest = s;
  while (rest) {
    const m = rest.match(re);
    if (!m) { out.push({ t: "text", text: rest }); break; }
    if (m.index) out.push({ t: "text", text: rest.slice(0, m.index) });
    const tok = m[0];
    if (m[1]) out.push({ t: "code", text: tok.slice(1, -1) });
    else if (m[2]) out.push({ t: "b", kids: parseInline(tok.slice(2, -2)) });
    else if (m[3]) { const k = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/); out.push({ t: "a", href: k[2], kids: parseInline(k[1]) }); }
    else out.push({ t: "i", kids: parseInline(tok.slice(1, -1)) });
    rest = rest.slice(m.index + tok.length);
  }
  return out;
}
