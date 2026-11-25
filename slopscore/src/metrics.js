// Runs inside the scanned page (page.evaluate). Must stay self-contained: no imports, no outer variables.
// Measures visible elements only and returns plain JSON.
export function collectMetrics(buzzwords) {
  const vh = innerHeight;
  const visible = (el) => {
    if (el.closest("[aria-hidden='true']")) return false;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility !== "visible" || +cs.opacity === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const rgb = (s) => (s.match(/[\d.]+/g) || []).map(Number);
  const isClear = (c) => !c || c === "transparent" || /rgba\(.*,\s*0\)$/.test(c);
  const hsl = ([r, g, b]) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
    if (!d) return [0, 0, l];
    const s = d / (1 - Math.abs(2 * l - 1));
    let h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
    return [h, s, l];
  };
  const all = [...document.body.querySelectorAll("*")].filter((el) => !/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|SVG|PATH|G|DEFS|USE)$/i.test(el.tagName)).slice(0, 6000);
  const vis = all.filter(visible);
  const ownText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1);

  const sizes = new Set(), families = new Set(), textColors = new Set(), bgColors = new Set(), lh = [];
  const spacingVals = [], radii = new Set(), shadows = new Set();
  let gradients = 0, aiGradient = false, gradientText = false;
  for (const el of vis) {
    const cs = getComputedStyle(el);
    if (ownText(el)) {
      sizes.add(cs.fontSize);
      families.add(cs.fontFamily.split(",")[0].trim().replace(/["']/g, "").toLowerCase());
      textColors.add(cs.color);
    }
    if (!isClear(cs.backgroundColor)) bgColors.add(cs.backgroundColor);
    if (el.tagName === "P" && ownText(el)) {
      const fs = parseFloat(cs.fontSize), l = cs.lineHeight === "normal" ? fs * 1.2 : parseFloat(cs.lineHeight);
      if (fs && l) lh.push(l / fs);
    }
    for (const p of ["marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "rowGap", "columnGap"]) {
      const v = parseFloat(cs[p]);
      if (v > 0 && v < 400) spacingVals.push(Math.round(v * 10) / 10);
    }
    if (parseFloat(cs.borderTopLeftRadius) > 0) radii.add(cs.borderTopLeftRadius);
    if (cs.boxShadow && cs.boxShadow !== "none") shadows.add(cs.boxShadow);
    if (/gradient\(/.test(cs.backgroundImage)) {
      gradients++;
      const clip = cs.webkitBackgroundClip || cs.backgroundClip;
      if (/text/.test(clip)) gradientText = true;
      const top = el.getBoundingClientRect().top;
      if (top < vh) {
        const hues = (cs.backgroundImage.match(/rgba?\([^)]+\)/g) || []).map((c) => hsl(rgb(c))).filter(([, s]) => s > 0.25).map(([h]) => h);
        if (hues.some((h) => h >= 230 && h <= 320)) aiGradient = true;
      }
    }
  }
  const colors = [...new Set([...textColors, ...bgColors])].map(rgb);
  const grays = new Set(), accents = new Set();
  for (const c of colors) {
    const [r, g, b] = c;
    const white = r > 250 && g > 250 && b > 250, black = r < 5 && g < 5 && b < 5;
    if (!white && !black && Math.max(r, g, b) - Math.min(r, g, b) <= 10) grays.add(`${r},${g},${b}`);
    const [h, s] = hsl(c);
    if (s > 0.25) accents.add(Math.floor(h / 20));
  }
  const distinctSpacing = new Set(spacingVals);
  const onGrid = [...distinctSpacing].filter((v) => Math.abs(v / 4 - Math.round(v / 4)) < 0.01).length;

  // Filled, button-like controls in the first screen.
  let filledButtons = 0;
  for (const el of vis) {
    if (!el.matches("button, [role=button], a, input[type=submit], input[type=button]")) continue;
    const r = el.getBoundingClientRect();
    if (r.top > vh || r.bottom < 0 || r.height < 24 || r.height > 120) continue;
    const cs = getComputedStyle(el);
    if (isClear(cs.backgroundColor) && !/gradient\(/.test(cs.backgroundImage)) continue;
    if (el.tagName === "A" && parseFloat(cs.paddingLeft) < 6) continue;
    filledButtons++;
  }

  // Cards inside cards.
  const isCard = (el) => {
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    if (r.width < 80 || r.height < 60 || parseFloat(cs.borderTopLeftRadius) < 6) return false;
    return parseFloat(cs.borderTopWidth) > 0 || (cs.boxShadow && cs.boxShadow !== "none") || !isClear(cs.backgroundColor);
  };
  const cards = new Set(vis.filter(isCard));
  let cardDepth = 0;
  for (const c of cards) {
    let d = 1;
    for (let p = c.parentElement; p; p = p.parentElement) if (cards.has(p)) d++;
    cardDepth = Math.max(cardDepth, d);
  }

  const heads = [...document.querySelectorAll("h1, h2, h3")].filter(visible).map((h) => h.innerText.trim()).filter(Boolean).slice(0, 20);
  const buttons = [...document.querySelectorAll("button, [role=button], a")].filter(visible).filter((b) => { const cs = getComputedStyle(b); return !isClear(cs.backgroundColor) || b.tagName === "BUTTON"; }).map((b) => b.innerText.trim()).filter((t) => t && t.length < 40).slice(0, 20);
  const text = (document.body.innerText || "").replace(/\s+/g, " ").trim().slice(0, 1500);
  const lower = (document.body.innerText || "").toLowerCase();
  const buzz = buzzwords.filter((w) => new RegExp(`\\b${w.replace("-", "[- ]")}`, "i").test(lower));
  const emoji = (heads.join(" ").match(/\p{Extended_Pictographic}/gu) || []).length;
  const imagesNoAlt = [...document.querySelectorAll("img")].filter(visible).filter((i) => !i.hasAttribute("alt")).length;
  const sorted = lh.sort((a, b) => a - b);

  return {
    fontSizes: sizes.size, fontFamilies: families.size, familyNames: [...families].slice(0, 6),
    bodyLineHeight: sorted.length ? Math.round(sorted[Math.floor(sorted.length / 2)] * 100) / 100 : null,
    textColors: textColors.size, bgColors: bgColors.size, grays: grays.size, accentHues: accents.size,
    gradients, aiGradient, gradientText,
    spacingValues: distinctSpacing.size, gridShare: distinctSpacing.size ? Math.round((onGrid / distinctSpacing.size) * 100) / 100 : 1,
    radii: radii.size, shadows: shadows.size,
    filledButtons, cardDepth,
    headings: heads, buttonLabels: buttons, buzzwords: buzz, headingEmoji: emoji,
    imagesNoAlt, copy: text, title: document.title.slice(0, 120),
  };
}

// Mobile viewport: interactive elements smaller than 44px in either dimension (inline text links skipped).
export function mobileTargets() {
  const out = [];
  for (const el of document.querySelectorAll("a, button, input, select, textarea, [role=button], [tabindex]:not([tabindex='-1'])")) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility !== "visible" || el.closest("[aria-hidden='true']")) continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    if (el.tagName === "A" && cs.display === "inline" && el.closest("p, li")) continue;
    if (r.width < 44 || r.height < 44) out.push((el.getAttribute("aria-label") || el.innerText || el.getAttribute("name") || el.tagName).trim().slice(0, 40));
  }
  return { smallTargets: out.length, smallTargetExamples: out.slice(0, 3) };
}
