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
pages.push(["fix-ai-slop-ui", shell(`<style>
.eb-h{font-size:56px;line-height:1.14;letter-spacing:-.045em;font-weight:700}
.eb-m{padding:0 .14em;margin-left:-.1em;border-radius:.36em .2em .4em .24em;color:#1a0f00;background:linear-gradient(104deg,rgba(255,182,85,.85),#ffad45 6%,#ff9d2e 55%,#f5901c 94%,rgba(240,138,20,.8));-webkit-box-decoration-break:clone;box-decoration-break:clone;box-shadow:0 14px 40px -12px rgba(255,157,46,.55)}
.eb-g{color:#8e8e93;white-space:nowrap}
.eb-row{display:flex;align-items:center;gap:12px;font-size:20px;color:#c7c7cc;white-space:nowrap}
.eb-p{display:inline-flex;align-items:center;gap:10px;padding:8px 18px;border-radius:999px;font-weight:700;color:#fff;background:linear-gradient(180deg,#5b8cff,#2f6bff);box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 10px 30px -10px rgba(47,107,255,.7)}
.eb-p s{font-weight:500;opacity:.7}
.eb-st{color:#ffb020;letter-spacing:2px}
.shot{position:absolute;width:330px;border-radius:14px;box-shadow:0 30px 60px -20px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.1);overflow:hidden}
.shot img{display:block;width:100%}
.shot b{position:absolute;left:12px;top:12px;padding:5px 12px;border-radius:999px;font-size:15px;font-weight:600}
</style>
<p class="brand">SAM VLLACO</p>
<div class="l" style="width:540px;gap:26px">
<p class="k" style="color:#ff9d2e">Designed, not generated.</p>
<h1 class="eb-h"><span class="eb-m">27 copy-paste prompts</span> to fix <span class="eb-g">AI slop UI</span></h1>
<div class="eb-row"><span class="eb-p"><s>$17.32</s> $12.99</span><span class="eb-st">★★★★★</span><span>5.0 · 200+ reviews</span></div>
</div>
<div class="shot" style="right:190px;top:60px;width:300px;transform:rotate(-7deg)"><img src="${BASE}/ebook/ba-before-768.webp"><b style="background:rgba(0,0,0,.6);color:#fff">First AI draft</b></div>
<div class="shot" style="right:30px;top:150px;width:300px;transform:rotate(4deg)"><img src="${BASE}/ebook/ba-after-768.webp"><b style="background:#ff9d2e;color:#1a0f00">After the book</b></div>
<img src="${BASE}/ebook/cover.webp" style="position:absolute;right:250px;bottom:-110px;width:230px;border-radius:6px 14px 14px 6px;transform:rotate(-5deg);box-shadow:inset 3px 0 0 rgba(255,255,255,.25),0 40px 80px -20px rgba(0,0,0,.9),0 0 0 1px rgba(255,255,255,.1)">
<p class="url">samvllaco.com/fix-ai-slop-ui</p>`)]);

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
