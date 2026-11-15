// Contrast check for every page, in dark AND light mode, on phone and desktop.
// Run with the built site served:  npm run build && npx serve out -l 4173
// then:                           NODE_PATH=$(npm root -g) node scripts/contrast.cjs [/page/ ...]
// It scrolls each page top to bottom (so lazy sections and scroll-reveals render), then runs axe-core's
// color-contrast rule (WCAG AA: 4.5:1 for text, 3:1 for large text). Exit code 1 when anything fails.
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const BASE = process.env.BASE || "http://localhost:4173";
const OUT = path.join(__dirname, "..", "out");
const AXE = [
  path.join(require.resolve("lighthouse/package.json", { paths: [process.env.NODE_PATH || ""] }), "..", "node_modules", "axe-core", "axe.min.js"),
].find((p) => fs.existsSync(p));
if (!AXE) { console.error("axe-core not found (it ships with the global lighthouse install)"); process.exit(2); }

function pages() {
  const list = [];
  const walk = (dir, rel) => {
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) { if (!f.startsWith("_") && f !== "og") walk(p, `${rel}${f}/`); }
      else if (f === "index.html") list.push(rel);
    }
  };
  walk(OUT, "/");
  return list.filter((p) => !/testimonials-preview|_newsletter/.test(p)).sort();
}

const THEMES = ["dark", "light"];
const SIZES = [{ name: "phone", width: 390, height: 844 }, { name: "desktop", width: 1280, height: 900 }];

(async () => {
  const only = process.argv.slice(2);
  const list = only.length ? only : pages();
  const browser = await chromium.launch();
  const axe = fs.readFileSync(AXE, "utf8");
  const report = [];
  // Every page in both themes and both sizes, a few at a time.
  const jobs = [];
  for (const size of SIZES) for (const theme of THEMES) for (const url of list) jobs.push({ size, theme, url });
  const ctxs = {};
  const ctxFor = async (size, theme) => {
    const k = size.name + theme;
    if (!ctxs[k]) {
      ctxs[k] = browser.newContext({ viewport: { width: size.width, height: size.height } }).then(async (ctx) => {
        await ctx.addInitScript((t) => { try { sessionStorage.setItem("sv:theme", JSON.stringify(t)); } catch (e) {} }, theme);
        return ctx;
      });
    }
    return ctxs[k];
  };
  const worker = async () => {
    for (let job = jobs.shift(); job; job = jobs.shift()) {
      const { size, theme, url } = job;
      const page = await (await ctxFor(size, theme)).newPage();
      try {
        await page.goto(BASE + url, { waitUntil: "load", timeout: 30000 });
        // Freeze motion so nothing is caught halfway through a fade.
        await page.addStyleTag({ content: "*,*::before,*::after{animation-delay:-1s!important;animation-duration:1ms!important;animation-iteration-count:1!important;transition-duration:0s!important;transition-delay:0s!important}" });
        const h = await page.evaluate(() => document.documentElement.scrollHeight);
        for (let y = 0; y < h; y += Math.round(size.height * 0.8)) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(90); }
        await page.waitForTimeout(1900);
        await page.addScriptTag({ content: axe });
        // Check each screenful where it is, since some sections change colours with scroll position.
        const found = new Map();
        for (let y = 0; y < h; y += size.height) {
          await page.evaluate((y) => window.scrollTo(0, y), y);
          await page.waitForTimeout(250);
          const res = await page.evaluate(async () => {
            const r = await window.axe.run(document, { runOnly: ["color-contrast"], resultTypes: ["violations"] });
            const vh = window.innerHeight;
            return r.violations.flatMap((v) => v.nodes).filter((n) => {
              const el = document.querySelector(n.target[0]);
              if (!el) return false;
              const b = el.getBoundingClientRect();
              return b.bottom > 0 && b.top < vh; // only what is on this screen right now
            }).map((n) => ({ target: n.target.join(" "), text: (document.querySelector(n.target[0])?.innerText || "").trim().slice(0, 60), data: n.any[0]?.data || {} }));
          });
          for (const n of res) if (!found.has(n.target)) found.set(n.target, n);
          // axe skips gradient text (background-clip: text). Check its lightest and darkest stop against the background.
          const grad = await page.evaluate(() => {
            const lum = (c) => { const [r, g, b] = c.map((v) => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }); return .2126 * r + .7152 * g + .0722 * b; };
            const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + .05) / (y + .05); };
            const rgb = (s) => { const v = (s.match(/[\d.]+/g) || []).map(Number); return s.startsWith("color(") ? v.map((x, i) => (i < 3 ? x * 255 : x)) : v; };
            const bgOf = (el) => { for (let e = el.parentElement; e; e = e.parentElement) { const c = getComputedStyle(e).backgroundColor; const v = rgb(c); if (v.length >= 3 && (v[3] === undefined || v[3] > .5)) return v.slice(0, 3); } return [255, 255, 255]; };
            const out = [];
            // Plain text on a flat colour (no image behind): axe sometimes gives up on these, so check them simply too.
            const flatBg = (el) => {
              // Blend see-through backgrounds down to the first solid one. Give up (null) on images and gradients.
              let acc = null, a = 1;
              for (let e = el; e; e = e.parentElement) {
                const c = getComputedStyle(e);
                if (c.backgroundImage !== "none" || /^(IMG|VIDEO|CANVAS|PICTURE)$/.test(e.tagName)) return null;
                const v = rgb(c.backgroundColor); if (v.length < 3) continue;
                const al = v[3] === undefined ? 1 : v[3]; if (al < .02) continue;
                acc = acc ? acc.map((x, i) => x + a * al * v[i]) : v.slice(0, 3).map((x) => x * al); a *= 1 - al;
                if (a < .02) return acc.map(Math.round);
              }
              return acc ? acc.map((x) => Math.round(x + a * 255)) : [255, 255, 255];
            };
            const overMedia = (el, b) => document.elementsFromPoint(b.left + b.width / 2, b.top + b.height / 2).some((n) => n !== el && !n.contains(el) && /^(IMG|VIDEO|CANVAS|PICTURE|IFRAME)$/.test(n.tagName));
            for (const el of document.querySelectorAll("body *")) {
              if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
              const cs = getComputedStyle(el);
              if (cs.visibility !== "visible" || /text/.test(cs.webkitBackgroundClip || cs.backgroundClip)) continue;
              let op = 1; for (let e = el; e; e = e.parentElement) op *= +getComputedStyle(e).opacity; if (op < .5) continue;
              const b = el.getBoundingClientRect(); if (b.bottom <= 0 || b.top >= innerHeight || b.width < 2 || b.height < 2) continue;
              if (el.closest("[aria-hidden='true'], .sr-only, [hidden], .skip")) continue;
              if (overMedia(el, b)) continue;
              const fg = rgb(cs.color); if (fg[3] !== undefined && fg[3] < .5) continue;
              const bg = flatBg(el); if (!bg) continue;
              const r = ratio(fg.slice(0, 3), bg);
              if (r < 3) out.push({ target: el.tagName.toLowerCase() + "." + [...el.classList].join("."), text: el.textContent.trim().slice(0, 60), data: { fgColor: cs.color, bgColor: `rgb(${bg.join(",")})`, contrastRatio: r.toFixed(2), expectedContrastRatio: "3:1 (simple check)" } });
            }
            for (const el of document.querySelectorAll("body *")) {
              const cs = getComputedStyle(el);
              if (!/text/.test(cs.webkitBackgroundClip || cs.backgroundClip) || !/gradient/.test(cs.backgroundImage) || !el.textContent.trim()) continue;
              const b = el.getBoundingClientRect(); if (b.bottom <= 0 || b.top >= innerHeight || !b.width) continue;
              const stops = (cs.backgroundImage.match(/rgba?\([^)]+\)/g) || []).map(rgb).filter((v) => v[3] === undefined || v[3] > .5);
              if (!stops.length) continue;
              const bg = bgOf(el); const worst = Math.min(...stops.map((s) => ratio(s.slice(0, 3), bg)));
              if (worst < 3) out.push({ target: el.tagName.toLowerCase() + "." + [...el.classList].join("."), text: el.textContent.trim().slice(0, 60), data: { fgColor: "gradient", bgColor: `rgb(${bg.join(",")})`, contrastRatio: worst.toFixed(2), expectedContrastRatio: "3:1" } });
            }
            return out;
          });
          for (const n of grad) if (!found.has(n.target)) found.set(n.target, n);
        }
        for (const n of found.values()) {
          report.push({ page: url, theme, size: size.name, target: n.target, text: n.text, fg: n.data.fgColor, bg: n.data.bgColor, ratio: n.data.contrastRatio, need: n.data.expectedContrastRatio });
        }
        process.stdout.write(`${found.size ? "x" : "."}`);
      } catch (e) {
        report.push({ page: url, theme, size: size.name, error: String(e).slice(0, 120) });
        process.stdout.write("!");
      }
      await page.close();
    }
  };
  await Promise.all(Array.from({ length: Number(process.env.JOBS || 6) }, worker));
  await browser.close();
  fs.writeFileSync(path.join(__dirname, "..", "contrast-report.json"), JSON.stringify(report, null, 1));
  console.log("\n");
  const fails = report.filter((r) => !r.error);
  const by = {};
  for (const r of fails) { const k = `${r.theme} ${r.size} ${r.page}`; (by[k] = by[k] || []).push(r); }
  for (const [k, rs] of Object.entries(by)) {
    console.log(`\n${k}`);
    for (const r of rs) console.log(`  ${r.ratio}:1 (needs ${r.need}) ${r.fg} on ${r.bg}  ${r.target}  "${r.text}"`);
  }
  const errs = report.filter((r) => r.error);
  errs.forEach((r) => console.log(`ERROR ${r.theme} ${r.size} ${r.page}: ${r.error}`));
  console.log(`\n${fails.length} contrast failures, ${errs.length} page errors, ${list.length} pages x ${THEMES.length} themes x ${SIZES.length} sizes`);
  process.exit(fails.length || errs.length ? 1 : 0);
})();
