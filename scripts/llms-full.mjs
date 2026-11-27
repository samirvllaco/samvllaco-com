// Builds public/llms-full.txt before every build: llms.txt followed by the full text of every article,
// so AI tools can read the whole site in one file. Runs as "prebuild"; never edit llms-full.txt by hand.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const site = "https://samvllaco.com";
const src = fs.readFileSync(path.join(root, "lib/articles.js"), "utf8");
const start = src.indexOf("export const POSTS = {");
const entries = [...src.slice(start).matchAll(/^  "([a-z0-9-]+)": \{\n([\s\S]*?)\n  \},?$/gm)].map(([, slug, body]) => {
  const get = (k) => (body.match(new RegExp(`^    ${k}: "((?:[^"\\\\]|\\\\.)*)"`, "m")) || [])[1] || "";
  return { slug, title: get("title"), description: get("description"), published: get("published"), modified: get("modified") };
}).filter((p) => fs.existsSync(path.join(root, "content/writing", `${p.slug}.md`)));

entries.sort((a, b) => (b.published || "").localeCompare(a.published || ""));

const head = fs.readFileSync(path.join(root, "public/llms.txt"), "utf8").trim();
const parts = [head, "", "---", "", `# Full text of every article on ${site}/writing/ (${entries.length} articles)`, ""];
for (const p of entries) {
  const md = fs.readFileSync(path.join(root, "content/writing", `${p.slug}.md`), "utf8").trim()
    .replace(/\]\(\/(?!\/)/g, `](${site}/`);
  parts.push(`## ${p.title}`, "", `URL: ${site}/writing/${p.slug}/`, `Author: Sam Vllaco`, `Published: ${p.published}${p.modified && p.modified !== p.published ? `, updated ${p.modified}` : ""}`, `Summary: ${p.description}`, "", md, "", "---", "");
}
fs.writeFileSync(path.join(root, "public/llms-full.txt"), parts.join("\n"));
console.log(`llms-full.txt: ${entries.length} articles, ${Math.round(fs.statSync(path.join(root, "public/llms-full.txt")).size / 1024)} KB`);
