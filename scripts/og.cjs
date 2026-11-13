// Builds the 1200x630 social share images in public/og from local images.
// Run: npx serve out -l 4173 (after a build), then NODE_PATH=$(npm root -g) node scripts/og.cjs
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const BASE = "http://localhost:4173";
const OUT = path.join(__dirname, "..", "public", "og");

const shell = (body) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Caveat;src:url(${BASE}/fonts/caveat-600.woff2)}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;font-family:Inter,system-ui,sans-serif;color:#f5f5f7;
background:radial-gradient(70% 90% at 78% 40%,#1d2a3d 0%,#0b0b0d 62%),#0b0b0d;}
body:before{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.09) 1.2px,transparent 1.3px);background-size:26px 26px;-webkit-mask-image:linear-gradient(90deg,#000,transparent 70%)}
.l{position:absolute;left:72px;top:0;bottom:0;width:600px;display:flex;flex-direction:column;justify-content:center;gap:22px}
.k{font-size:20px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#a1a1a6}
h1{font-size:68px;line-height:1.02;letter-spacing:-.045em;font-weight:700}
h1 span{color:#62c1fd}
.s{font-size:26px;line-height:1.35;color:#c7c7cc;max-width:520px}
.scr{font-family:Caveat;font-size:44px;color:#8fd0ff;transform:rotate(-3deg);transform-origin:left}
.brand{position:absolute;left:72px;top:56px;font-size:22px;font-weight:700;letter-spacing:.02em;color:#86868b}
.url{position:absolute;left:72px;bottom:52px;font-size:22px;color:#86868b}
</style></head><body>${body}</body></html>`;

const pages = [];
pages.push(["default", shell(`<p class="brand">SAM VLLACO</p>
<div class="l"><p class="k">Product designer</p><h1>Screens people get <span>on the first try.</span></h1>
<p class="s">10 years designing SaaS, AI, fintech and health products. One designer from first call to handover.</p></div>
<img src="${BASE}/sam-footer-cut.webp" style="position:absolute;right:-40px;bottom:-60px;width:690px">
<p class="url">samvllaco.com</p>`)]);
pages.push(["ebook", shell(`<p class="brand">SAM VLLACO</p>
<div class="l"><p class="k">The book</p><h1>27 copy-paste prompts to fix <span>AI slop UI</span></h1>
<p class="s">For Claude, Cursor, Lovable and v0. With a DESIGN.md rules file and a private video.</p></div>
<img src="${BASE}/book-cover.webp" style="position:absolute;right:120px;top:85px;width:345px;border-radius:6px 14px 14px 6px;transform:rotate(-4deg);box-shadow:0 40px 80px -20px rgba(0,0,0,.8),inset 0 0 0 1px rgba(255,255,255,.1)">
<p class="url">samvllaco.com/ebook</p>`)]);

(async () => {
const { WORK } = await import(path.join(__dirname, "..", "lib", "work.js"));
for (const w of WORK) {
  const img = `<img src="${BASE}${w.small}" style="position:absolute;right:-60px;top:50%;transform:translateY(-50%);width:620px;max-height:540px;object-fit:cover;object-position:left center;border-radius:16px;box-shadow:0 40px 80px -20px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.08)">`;
  pages.push([`work-${w.slug}`, shell(`<p class="brand">SAM VLLACO</p>
<div class="l" style="width:520px"><p class="k">UI/UX case study</p><h1 style="font-size:60px">${w.title}</h1><p class="s" style="font-size:24px">${w.sub}</p></div>${img}
<p class="url">samvllaco.com/work</p>`)]);
}

  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  for (const [name, html] of pages) {
    await p.setContent(html, { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(OUT, `${name}.jpg`), type: "jpeg", quality: 82 });
    console.log("og", name);
  }
  await b.close();
})();
