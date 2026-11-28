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
const parts = [head, "", "---", ""];

// Services, case studies, reviews and the FAQ as plain text (added 28 Nov 2026): hiring questions put to AI tools are
// answered from these, not from the articles. Read straight from lib/, so this never goes stale.
const clean = (t) => String(t || "").replace(/\*\*|==/g, "").trim();
const lib = (f) => import(path.join(root, "lib", f));
const [{ SERVICES, svcHref }, { SEO }, { WORK }, { STUDIES }, { TESTIMONIALS, LIVE }, { FAQ }, { LADDER }] = await Promise.all(
  ["services.js", "service-pages.js", "work.js", "work-studies.js", "testimonials.js", "faq.js", "plans.js"].map(lib));
parts.push("# Services", "");
for (const g of SERVICES) {
  parts.push(`## ${g.title}`, "", clean(g.blurb), "");
  for (const it of g.items || []) {
    const seo = SEO[it.id];
    parts.push(`### ${it.name}`, `URL: ${site}${svcHref(it.id)}`, clean(seo?.desc || it.text), it.ex ? `Example: ${clean(it.ex)}` : "", "");
    for (const f of seo?.faq || []) parts.push(`Q: ${clean(f.q)}`, `A: ${clean(f.a)}`, "");
  }
}
parts.push("# Ways to work with Sam, smallest step first", "", ...LADDER.map((l) => `- ${l.name}: ${l.price}. ${l.who} ${site}${l.href}`), "");
parts.push("# Case studies", "");
for (const w of WORK) {
  const st = STUDIES[w.slug];
  parts.push(`## ${w.title}`, `URL: ${site}/work/${w.slug}/`, clean(w.sub), "");
  if (st) {
    parts.push(`${st.kind || ""}${st.year ? `, ${st.year}` : ""}${st.industry ? `, ${st.industry}` : ""}. Services: ${(st.services || []).join(", ")}.`);
    for (const f of st.facts || []) parts.push(`- ${f.value}: ${clean(f.label)}`);
    parts.push("", ...(st.about || []).map(clean), "");
  } else if (w.overview) parts.push(clean(w.overview), "");
}
if (LIVE) {
  parts.push("# What clients say", "", "Quotes from client reviews, shown without names on the site.", "");
  for (const t of TESTIMONIALS) parts.push(`- "${clean(t.quote)}" (${t.project}${t.when ? `, ${t.when}` : ""})`);
  parts.push("");
}
parts.push("# Questions people ask", "");
for (const f of FAQ) parts.push(`Q: ${clean(f.q)}`, `A: ${clean(f.a)}`, "");
parts.push("---", "", `# Full text of every article on ${site}/writing/ (${entries.length} articles)`, "");
for (const p of entries) {
  const md = fs.readFileSync(path.join(root, "content/writing", `${p.slug}.md`), "utf8").trim()
    .replace(/\]\(\/(?!\/)/g, `](${site}/`);
  parts.push(`## ${p.title}`, "", `URL: ${site}/writing/${p.slug}/`, `Author: Sam Vllaco`, `Published: ${p.published}${p.modified && p.modified !== p.published ? `, updated ${p.modified}` : ""}`, `Summary: ${p.description}`, "", md, "", "---", "");
}
fs.writeFileSync(path.join(root, "public/llms-full.txt"), parts.join("\n"));
console.log(`llms-full.txt: ${entries.length} articles, ${Math.round(fs.statSync(path.join(root, "public/llms-full.txt")).size / 1024)} KB`);
