// Layout check (owner, 26 Nov 2026: "do full layout check, make sure we follow it strictly").
// Run with the built site served:  npm run build && npx serve out -l 4173
// then:                           NODE_PATH=$(npm root -g) node scripts/layout.cjs [/page/ ...]
// Rules, from CLAUDE.md "Type and spacing system":
//   edge    every panel, grid or card row inside a section lines up with the 1200px content box: it spans it,
//           starts at its left edge, ends at its right edge, or is a centered text block no wider than 800px.
//   intro   a section title and the lede under it are 12px apart.
//   content the intro and the content below it are 40px apart (32px on phones), and so is the content and its button row.
//   gap     cards in a row or grid are 20px apart (rows and columns).
//   pad     card padding is on the spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.
//   section consecutive sections are var(--space-section) apart (128px at 1440, 64px on phones).
// Prints one line per problem and exits 1 when there are any. Desktop (1440) and phone (390).
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const BASE = process.env.BASE || "http://localhost:4173";
const OUT = path.join(__dirname, "..", "out");
function pages() {
  const list = [];
  const walk = (dir, rel) => {
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) { if (!f.startsWith("_") && !/^(og|fonts|hero|wall|me|ebook)$/.test(f)) walk(p, `${rel}${f}/`); }
      else if (f === "index.html") list.push(rel);
    }
  };
  walk(OUT, "/");
  return list.filter((p) => !/testimonials-preview|_newsletter|slop-score\/r\//.test(p)).sort();
}

function check(vw) {
  const SCALE = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128];
  const bad = [];
  const name = (e) => (e.tagName.toLowerCase() + (e.id ? "#" + e.id : "") + "." + (e.className || "").toString().trim().split(/\s+/).filter((c) => !/^is-|^dark-island$/.test(c)).slice(0, 2).join(".")).replace(/\.$/, "");
  const where = (e) => { const s = e.closest("section, footer, header.site-header"); return s && s !== e ? name(s) + " > " : ""; };
  const box = (e) => e.getBoundingClientRect();
  const seen = (e) => { const r = box(e); const s = getComputedStyle(e); return r.width > 1 && r.height > 1 && s.visibility !== "hidden" && s.display !== "none" && +s.opacity !== 0; };
  const floats = (e) => { const p = getComputedStyle(e).position; return p === "absolute" || p === "fixed"; };
  const isCard = (e) => { const s = getComputedStyle(e); const bg = s.backgroundColor; const solid = (bg && !/rgba\(0, 0, 0, 0\)|transparent/.test(bg)) || /gradient/.test(s.backgroundImage); return (solid || s.boxShadow.includes("inset")) && parseFloat(s.borderTopLeftRadius) >= 8 && box(e).height > 60; };
  const cardish = (e) => isCard(e) || (e.children.length === 1 && isCard(e.children[0]) && Math.abs(box(e.children[0]).height - box(e).height) < 4); // li > a.card
  const inCard = (e) => { for (let a = e.parentElement; a && a.tagName !== "SECTION"; a = a.parentElement) if (isCard(a)) return true; return false; };
  // Product shots, sliders and mockups (fixed aspect ratio or a media element) are art, not panels: they may be centered narrower.
  const isMedia = (e) => /^(IMG|VIDEO|PICTURE|CANVAS|IFRAME|FIGURE)$/.test(e.tagName) || getComputedStyle(e).aspectRatio !== "auto";
  const isText = (e) => /^(H1|H2|H3|P|HEADER|BLOCKQUOTE|FIGURE)$/.test(e.tagName) || [...e.children].every((c) => /^(H1|H2|H3|H4|P|SPAN|EM|B|A|BR|SMALL|STRONG)$/.test(c.tagName));

  // The content box: the .wrap padding box, minus its padding.
  const wrap = document.querySelector("main .wrap, .wrap.page, .page") || document.body;
  const ws = getComputedStyle(wrap), wr = box(wrap);
  const C = { l: wr.left + parseFloat(ws.paddingLeft), r: wr.right - parseFloat(ws.paddingRight) };
  const near = (a, b) => Math.abs(a - b) <= 2;

  const secs = [...document.querySelectorAll("main section, .wrap.page > section, .page > section")].filter((s, i, a) => seen(s) && !a.some((o) => o !== s && o.contains(s)) && !s.closest(".site-footer, .site-header, dialog, [hidden], .ask-panel"));

  for (const s of secs) {
    const sr = box(s);
    // Full-bleed sections (wider than the content box) are art direction, not layout: skip their edges.
    const bleed = sr.left < C.l - 4 || sr.right > C.r + 4;
    // Walk layout blocks: children of the section, and children of wrappers that span their parent.
    const blocks = [];
    const walk = (e, d) => {
      for (const c of e.children) {
        if (!seen(c) || floats(c) || /^(SCRIPT|STYLE|SVG|svg|BR|TEMPLATE)$/.test(c.tagName)) continue;
        if (getComputedStyle(c).display.startsWith("inline") && !/^(UL|OL|DIV|A)$/.test(c.tagName)) continue; // words and icons inside text
        blocks.push(c);
        const r = box(c), pr = box(e);
        if (d < 2 && near(r.left, pr.left) && near(r.right, pr.right) && !isCard(c) && !/^(H1|H2|H3|H4|P|BLOCKQUOTE)$/.test(c.tagName)) walk(c, d + 1);
      }
    };
    walk(s, 0);
    if (!bleed) {
      for (const b of blocks) {
        const r = box(b);
        if (r.width < 40) continue;
        // Inside a two-column layout the column edges are the reference, not the content box.
        const par = b.parentElement, pr = box(par);
        const ps = getComputedStyle(par);
        const cols = (ps.display.includes("grid") && ps.gridTemplateColumns.split(" ").length > 1) || (ps.display.includes("flex") && !ps.flexDirection.startsWith("column") && [...par.children].filter(seen).length > 1);
        if (cols) continue;
        const L = Math.max(C.l, pr.left + parseFloat(ps.paddingLeft)), R = Math.min(C.r, pr.right - parseFloat(ps.paddingRight));
        const full = near(r.left, L) && near(r.right, R);
        const left = near(r.left, L), right = near(r.right, R);
        const centered = Math.abs((r.left - L) - (R - r.right)) <= 3;
        if (full || left || right) continue;
        if (centered && (isText(b) || isMedia(b) || (!isCard(b) && r.width <= 820))) continue; // a centered card or panel is never fine
        bad.push(`edge   ${where(b)}${name(b)}  x${Math.round(r.left)}..${Math.round(r.right)} (content ${Math.round(L)}..${Math.round(R)})`);
      }
    }
    // Title to lede: 12px.
    for (const h of s.querySelectorAll("h2")) {
      if (!seen(h) || h.closest(".bx-card, .tm-card, details, dialog")) continue;
      let n = h.nextElementSibling;
      while (n && !seen(n)) n = n.nextElementSibling;
      if (!n || n.tagName !== "P") continue;
      const g = box(n).top - box(h).bottom;
      if (Math.abs(g - 12) > 2) bad.push(`intro  ${where(h)}${name(h)} -> ${name(n)}  ${Math.round(g)}px (want 12)`);
    }
    // Intro to content, and content to its button row: --gap-content.
    const GC = vw < 768 ? 32 : 40;
    const vtop = (e) => { // where an element visibly starts: itself if it paints, else its first painted child
      for (let k = e, i = 0; k && i < 6; i++) {
        const ks = getComputedStyle(k); const paints = !/rgba\(0, 0, 0, 0\)|transparent/.test(ks.backgroundColor) || ks.boxShadow !== "none" || /^(IMG|BUTTON|A|P|H1|H2|H3|UL|OL|LI|DETAILS)$/.test(k.tagName);
        if ((paints || parseFloat(ks.paddingTop) > 0) && box(k).height > 0) return box(k).top; // padding is space the block keeps for its own art
        k = [...k.children].find((c) => seen(c) && !floats(c));
      }
      return box(e).top;
    };
    const nextBlock = (e) => { for (let a = e; a && a !== s; a = a.parentElement) { let n = a.nextElementSibling; while (n && (!seen(n) || floats(n) || /^(SCRIPT|STYLE)$/.test(n.tagName))) n = n.nextElementSibling; if (n) return n; } return null; };
    for (const h of s.querySelectorAll("h2")) {
      if (!seen(h) || inCard(h) || h.closest("details, dialog")) continue;
      let end = h; const hd = h.parentElement;
      if (hd !== s && /^(HEADER)$/.test(hd.tagName) || /-head$|-head /.test((hd.className || "") + " ")) end = hd;
      else { let n = h.nextElementSibling; while (n && !seen(n)) n = n.nextElementSibling; if (n && n.tagName === "P") end = n; }
      const nb = nextBlock(end);
      if (!nb) continue;
      const g = vtop(nb) - box(end).bottom;
      if (g < -2) continue; // side by side
      if (Math.abs(g - GC) > 2) bad.push(`content ${where(h)}${name(end)} -> ${name(nb)}  ${Math.round(g)}px (want ${GC})`);
    }
    for (const btn of s.querySelectorAll(".hero2-btn")) {
      if (!seen(btn) || inCard(btn)) continue;
      let row = btn.parentElement; if (row === s) continue;
      if (row.firstElementChild !== btn && ![...row.children].every((c) => c.classList.contains("hero2-btn"))) continue;
      let prev = row.previousElementSibling; while (prev && (!seen(prev) || floats(prev))) prev = prev.previousElementSibling;
      if (!prev || /^(H1|H2|H3|P|HEADER)$/.test(prev.tagName) || prev.querySelector(":scope > h2, :scope > h1")) continue; // a button right under its text
      const g = box(row).top - box(prev).bottom;
      if (Math.abs(g - GC) > 2) bad.push(`cta    ${where(row)}${name(prev)} -> ${name(row)}  ${Math.round(g)}px (want ${GC})`);
    }
    // Card rows and grids: 20px gaps, padding on the scale.
    for (const g of s.querySelectorAll("*")) {
      if (!seen(g) || g.closest(".site-header, .ask-panel, dialog, .wall") || inCard(g) || isCard(g)) continue;
      const kids = [...g.children].filter((c) => seen(c) && !floats(c));
      if (kids.length < 2 || kids.filter(cardish).length < 2) continue;
      const gs = getComputedStyle(g);
      if (!(gs.display.includes("grid") || gs.display.includes("flex"))) continue;
      if (gs.overflowX === "auto" || gs.overflowX === "scroll") continue; // swipe rows set their own gap
      const rg = parseFloat(gs.rowGap) || 0, cg = parseFloat(gs.columnGap) || 0;
      const rows = new Set(kids.map((k) => Math.round(box(k).top))).size > 1, colsN = new Set(kids.map((k) => Math.round(box(k).left))).size > 1;
      if ((rows && Math.abs(rg - 20) > 0.5) || (colsN && Math.abs(cg - 20) > 0.5)) bad.push(`gap    ${where(g)}${name(g)}  ${rows ? rg : "-"}/${colsN ? cg : "-"} (want 20)`);
    }
    for (const c of s.querySelectorAll("*")) {
      if (!seen(c) || !isCard(c) || inCard(c) || c.closest(".site-header, .ask-panel, dialog, .wall, .fan, .work-media")) continue;
      if (/^(A|BUTTON|LI)$/.test(c.tagName) && box(c).height < 64) continue; // chips and pills
      const cs = getComputedStyle(c);
      const pads = [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].map((v) => Math.round(parseFloat(v)));
      if (pads.every((p) => p === 0)) continue;
      const off = pads.filter((p) => p !== 0 && !SCALE.includes(p));
      if (off.length) bad.push(`pad    ${where(c)}${name(c)}  ${pads.join(" ")}`);
    }
  }
  // The booking band and the footer sit outside the page sections and use the site-wide content box
  // (a plain .wrap: 1200px plus gutters), even on pages whose own wrap is narrower.
  const probe0 = document.createElement("div"); probe0.className = "wrap"; probe0.style.cssText = "position:absolute;left:0;right:0;top:0;height:1px;visibility:hidden"; document.body.appendChild(probe0);
  const pr0 = box(probe0), ps0 = getComputedStyle(probe0); const G = { l: pr0.left + parseFloat(ps0.paddingLeft), r: pr0.right - parseFloat(ps0.paddingRight) }; probe0.remove();
  for (const b of document.querySelectorAll(".book-band > *, .site-footer > .wrap > *")) {
    if (!seen(b) || floats(b) || /^(SCRIPT|STYLE|DIALOG)$/.test(b.tagName)) continue;
    const r = box(b), par = b.parentElement, ps = getComputedStyle(par);
    if (r.width < 40) continue;
    const L = box(par).left + parseFloat(ps.paddingLeft), R = box(par).right - parseFloat(ps.paddingRight);
    if (Math.abs(L - G.l) > 2 || Math.abs(R - G.r) > 2) { bad.push(`edge   ${name(par)} content box x${Math.round(L)}..${Math.round(R)} (site ${Math.round(G.l)}..${Math.round(G.r)})`); break; }
    const full = near(r.left, L) && near(r.right, R), left = near(r.left, L);
    const centered = Math.abs((r.left - L) - (R - r.right)) <= 3;
    const inRow = r.width < (R - L) * 0.6 && !centered; // the footer bottom row: copyright, chat link, links
    if (full || left || inRow || (centered && (isText(b) || isMedia(b) || (!isCard(b) && r.width <= 820)))) continue;
    bad.push(`edge   ${name(par)} > ${name(b)}  x${Math.round(r.left)}..${Math.round(r.right)} (content ${Math.round(L)}..${Math.round(R)})`);
  }
  // Section to section.
  const probe = document.createElement("div"); probe.style.cssText = "position:absolute;height:var(--space-section)"; document.body.appendChild(probe); const S = Math.round(probe.getBoundingClientRect().height); probe.remove();
  // Measured as the space you see: padding counts as space unless the section paints its own background (a band or panel).
  const paints = (e) => { const cs = getComputedStyle(e); return !/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor) || /inset/.test(cs.boxShadow) || e.classList.contains("lite"); }; // a hairline border is a divider, not a band
  // The block before a section is whatever sits right above it in the flow: another section, or a wrapper that ends with
  // a button row or a photo. Measured as the space you see: padding counts as space unless the block paints a band or panel.
  const edges = (e) => { const r = box(e), cs = getComputedStyle(e), pt = paints(e) ? 0 : parseFloat(cs.paddingTop), pb = paints(e) ? 0 : parseFloat(cs.paddingBottom); return { top: r.top + pt, bottom: r.bottom - pb, rt: r.top, rb: r.bottom }; };
  const wide = (e) => { const r = box(e); return r.left < C.l - 4 || r.right > C.r + 4; };
  for (const sb of secs) {
    let prev = null;
    for (let a = sb; a && a !== document.body && !prev; a = a.parentElement) {
      let n = a.previousElementSibling;
      while (n && (!seen(n) || floats(n) || /^(SCRIPT|STYLE|TEMPLATE)$/.test(n.tagName) || box(n).height < 2)) n = n.previousElementSibling;
      if (n) prev = n;
      if (a.matches(".wrap, main")) break;
    }
    if (!prev || prev.closest(".site-header") || prev.matches(".crumbs, nav, .ph, .page-head, header") || prev.querySelector("h1")) continue;
    if (wide(sb) || wide(prev)) continue; // full-bleed art sections (the screen wall) set their own space
    const a = edges(prev), b = edges(sb);
    if (b.rt < a.rb - 2) continue; // overlapping (sticky)
    const g = Math.round(b.top - a.bottom);
    if (Math.abs(g - S) > 2) bad.push(`section ${name(prev)} -> ${name(sb)}  ${g}px (want ${S})`);
  }
  return bad;
}

(async () => {
  const list = process.argv.slice(2).length ? process.argv.slice(2) : pages();
  const b = await chromium.launch();
  let total = 0;
  for (const vw of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const ctx = await b.newContext({ viewport: vw, reducedMotion: "reduce" });
    for (const u of list) {
      const p = await ctx.newPage();
      try { await p.goto(BASE + u, { waitUntil: "networkidle", timeout: 30000 }); } catch { await p.close(); continue; }
      await p.evaluate(async () => {
        document.documentElement.classList.add("is-live");
        for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); }
        scrollTo(0, 0);
        const st = document.createElement("style");
        st.textContent = "*,*::before,*::after{transition:none!important;animation:none!important}[data-reveal]{transform:none!important;scale:none!important;translate:none!important;opacity:1!important}";
        document.head.appendChild(st);
        document.querySelectorAll("[data-reveal], .is-shown, .rv").forEach((e) => { e.style.transform = "none"; e.style.translate = "none"; e.style.scale = "none"; });
        await new Promise((r) => setTimeout(r, 400));
      });
      const bad = await p.evaluate(check, vw.width);
      for (const x of bad) console.log(`${vw.width} ${u}  ${x}`);
      total += bad.length;
      await p.close();
    }
    await ctx.close();
  }
  console.log(`\n${total} layout problems, ${list.length} pages x 2 sizes`);
  await b.close();
  process.exit(total ? 1 : 0);
})();
