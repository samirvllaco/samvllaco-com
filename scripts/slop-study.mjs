// Measures Show HN launch home pages with the Slop Score's own in-page metrics (no AI). Aggregate use only.
import { createRequire } from "node:module"; const { chromium } = createRequire(import.meta.url)("playwright"); // run with NODE_PATH=$(npm root -g)
import fs from "node:fs";
const { METRICS_JS } = await import(new URL("../slopscore/src/_page.js", import.meta.url).href);
const { BUZZWORDS } = await import(new URL("../slopscore/config.js", import.meta.url).href);
// Usage: NODE_PATH=$(npm root -g) node scripts/slop-study.mjs 100 (try 3 first). Writes study-<n>.json in the current folder.
const MAX = +process.argv[2] || 3, DAYS = 30, CONC = 4;
const since = Math.floor(Date.now() / 1000) - DAYS * 86400;
let hits = [];
for (let page = 0; page < 10 && hits.length < MAX * 3; page++) {
  const r = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=show_hn&numericFilters=created_at_i>${since},points>1&hitsPerPage=100&page=${page}`, { signal: AbortSignal.timeout(15000) }).then((x) => x.json());
  hits.push(...r.hits.filter((h) => h.url && !/github\.com|gitlab|youtube|npmjs|pypi|apple\.com|play\.google|chromewebstore|arxiv|\.pdf$|huggingface|codeberg|crates\.io|docs\.google/.test(h.url)));
  if (!r.hits.length) break;
}
const seen = new Set(); hits = hits.filter((h) => { const d = new URL(h.url).hostname; if (seen.has(d)) return false; seen.add(d); return true; });
console.log("candidates", hits.length);
const b = await chromium.launch(); const out = []; let i = 0;
async function worker() {
  while (i < hits.length && out.length < MAX) {
    const h = hits[i++]; const origin = new URL(h.url).origin + "/";
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36" });
    const p = await ctx.newPage();
    try {
      await p.goto(origin, { waitUntil: "domcontentloaded", timeout: 20000 }); await p.waitForTimeout(2500);
      const m = await Promise.race([p.evaluate(`(${METRICS_JS})(${JSON.stringify(BUZZWORDS)})`), new Promise((_, rej) => setTimeout(() => rej(new Error("eval timeout")), 15000))]);
      if ((m.copy || "").length > 200 && out.length < MAX) { delete m.copy; out.push({ host: new URL(origin).hostname, ...m }); }
    } catch (e) {}
    await ctx.close().catch(() => {});
  }
}
await Promise.all(Array.from({ length: CONC }, worker));
await b.close();
fs.writeFileSync(`study-${MAX}.json`, JSON.stringify(out));
console.log("scanned", out.length, "of tried", i);
