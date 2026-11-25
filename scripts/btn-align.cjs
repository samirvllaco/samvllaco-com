// Finds button rows that sit off-center under centered text, on every page, at 1440 and 390 wide (DESIGN.md Buttons).
// Run with `npx serve out -l 4173` running: NODE_PATH=$(npm root -g) node scripts/btn-align.cjs
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const OUT = path.join(__dirname, "..", "out");
const pages = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) { if (!/_next|work\/|fonts|og|ebook|hero|me|about|\.well/.test(path.relative(OUT, p) + "/") || /^work$/.test(path.relative(OUT,p))) walk(p); } else if (f === "index.html") pages.push("/" + path.relative(OUT, d).replace(/\\/g, "/") + (d === OUT ? "" : "/")); } })(OUT);
const extra = fs.readdirSync(path.join(OUT, "work")).filter((f) => fs.existsSync(path.join(OUT, "work", f, "index.html"))).map((f) => `/work/${f}/`);
const list = [...new Set([...pages.map((p) => p.replace(/^\/\//, "/")), ...extra])].filter((p) => !/404|slop-score\/r/.test(p));
(async () => {
  const b = await chromium.launch();
  const bad = [];
  for (const vw of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const ctx = await b.newContext({ viewport: vw });
    for (const u of list) {
      const p = await ctx.newPage();
      try { await p.goto("http://localhost:4173" + u, { waitUntil: "load", timeout: 30000 }); } catch { await p.close(); continue; }
      await p.waitForTimeout(300);
      const r = await p.evaluate(() => {
        const out = [], seen = new Set();
        for (const btn of document.querySelectorAll(".hero2-btn")) {
          const s = getComputedStyle(btn);
          if (btn.closest(".site-header, .mega, .foot-map, .foot-stage, .ask-panel, dialog:not([open]), [hidden]") || s.display === "none" || s.visibility === "hidden" || !btn.offsetWidth) continue;
          const par = btn.parentElement;
          const onlyBtns = [...par.children].every((c) => c.classList.contains("hero2-btn") || c.classList.contains("sr-only"));
          const row = onlyBtns ? par : btn;
          if (seen.has(row)) continue; seen.add(row);
          const box = row.parentElement; if (!box) continue;
          const bs = getComputedStyle(box);
          const sibs = [...box.children].filter((c) => c !== row && /^(H1|H2|H3|P|HEADER)$/.test(c.tagName) && c.offsetWidth && !c.contains(row));
          const centered = bs.textAlign === "center" || sibs.some((c) => getComputedStyle(c).textAlign === "center");
          if (!centered) continue;
          const br = box.getBoundingClientRect(), rr = row.getBoundingClientRect();
          const l = rr.left - (br.left + parseFloat(bs.paddingLeft)), rt = br.right - parseFloat(bs.paddingRight) - rr.right;
          if (Math.abs(l - rt) > 8) out.push({ txt: row.textContent.trim().slice(0, 50), cls: (row.className || "").toString().slice(0, 60), box: (box.className || box.tagName).toString().slice(0, 60), l: Math.round(l), r: Math.round(rt) });
        }
        return out;
      });
      for (const x of r) bad.push({ u, w: vw.width, ...x });
      await p.close();
    }
    await ctx.close();
  }
  console.log(list.length, "pages");
  for (const x of bad) console.log(JSON.stringify(x));
  await b.close();
})();
