#!/usr/bin/env python3
"""Live technical SEO check of a site from its sitemap. Prints problems only, so the output stays small.

  python3 scripts/tasks/live_check.py                         checks https://samvllaco.com
  python3 scripts/tasks/live_check.py https://example.com     any other site with /sitemap.xml
  python3 scripts/tasks/live_check.py --max 80                check only the first 80 sitemap pages
  python3 scripts/tasks/live_check.py --json out.json         also save every page's facts for later lookups

Checks per page: status 200, no redirect, no noindex, canonical equals the address, exactly one h1,
title 30 to 60 characters, description 70 to 155 characters (after HTML unescape), duplicate titles and
descriptions, every internal link answers 200, pages linked inside the site but missing from the sitemap,
all lastmod values the same, and robots.txt (public pages and AI crawlers allowed, sitemap named).
Read-only. Python 3 standard library only.
"""
import argparse
import html
import json
import re
import sys
import urllib.error
import urllib.request
from collections import Counter, defaultdict
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urldefrag, urljoin, urlparse

UA = "Mozilla/5.0 (compatible; site-live-check/1.0)"
AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Google-Extended", "Bingbot"]
SKIP_LINK = ("/cdn-cgi/", "mailto:", "tel:", "javascript:", "#")
ASSET = re.compile(r"\.(png|jpe?g|webp|svg|gif|ico|css|js|woff2?|pdf|xml|txt|json|mp4|webm|ics|zip)(\?|$)", re.I)


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None


OPENER = urllib.request.build_opener(NoRedirect)


def fetch(url, body=True):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html,*/*"})
    for attempt in (1, 2):
        try:
            with OPENER.open(req, timeout=25) as r:
                return r.status, (r.read().decode("utf-8", "replace") if body else ""), r.headers.get("X-Robots-Tag", "")
        except urllib.error.HTTPError as e:
            return e.code, e.headers.get("Location", ""), ""
        except Exception as e:  # network hiccup: one retry
            if attempt == 2:
                return 0, str(e)[:80], ""
    return 0, "", ""


def first(pattern, text):
    m = re.search(pattern, text, re.I | re.S)
    return html.unescape(re.sub(r"\s+", " ", m.group(1)).strip()) if m else ""


def meta(text, name):
    for tag in re.findall(r"<meta\b[^>]*>", text, re.I):
        if re.search(rf'(name|property)\s*=\s*["\']{re.escape(name)}["\']', tag, re.I):
            m = re.search(r'content\s*=\s*"([^"]*)"|content\s*=\s*\'([^\']*)\'', tag, re.I)
            if m:
                return html.unescape(m.group(1) or m.group(2) or "").strip()
    return ""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("site", nargs="?", default="https://samvllaco.com")
    ap.add_argument("--max", type=int, default=0)
    ap.add_argument("--json")
    ap.add_argument("--threads", type=int, default=12)
    a = ap.parse_args()
    site = a.site.rstrip("/")
    host = urlparse(site).netloc

    code, sm, _ = fetch(site + "/sitemap.xml")
    if code != 200:
        sys.exit(f"BLOCKED: {site}/sitemap.xml answered {code} {sm}")
    urls = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", sm)
    lastmods = re.findall(r"<lastmod>\s*([^<\s]+)\s*</lastmod>", sm)
    if a.max:
        urls = urls[:a.max]

    def page(u):
        code, text, xrobots = fetch(u)
        if code != 200:
            return u, {"status": code, "note": text[:120]}
        robots = (meta(text, "robots") + " " + xrobots).lower()
        can = ""
        for tag in re.findall(r"<link\b[^>]*>", text, re.I):
            if re.search(r'rel\s*=\s*["\']canonical["\']', tag, re.I):
                m = re.search(r'href\s*=\s*["\']([^"\']+)', tag, re.I)
                can = html.unescape(m.group(1)) if m else ""
        links = set()
        for h in re.findall(r'<a\b[^>]*\bhref\s*=\s*["\']([^"\']+)', text, re.I):
            h = html.unescape(h)
            if h.startswith(SKIP_LINK) or "/cdn-cgi/" in h:
                continue
            full = urldefrag(urljoin(u, h))[0]
            if urlparse(full).netloc == host and not ASSET.search(full):
                links.add(full)
        return u, {"status": 200, "title": first(r"<title[^>]*>(.*?)</title>", text), "desc": meta(text, "description"),
                   "h1": len(re.findall(r"<h1\b", text, re.I)), "canonical": can, "noindex": "noindex" in robots,
                   "links": sorted(links)}

    with ThreadPoolExecutor(a.threads) as ex:
        pages = dict(ex.map(page, urls))

    problems = defaultdict(list)
    for u, p in pages.items():
        path = urlparse(u).path or "/"
        if p["status"] != 200:
            kind = "redirects" if p["status"] in (301, 302, 307, 308) else "not 200"
            problems[kind].append(f"{path} ({p['status']} {p.get('note', '')})".strip())
            continue
        if p["noindex"]:
            problems["noindex but in sitemap"].append(path)
        if p["canonical"].rstrip("/") != u.rstrip("/"):
            problems["canonical differs"].append(f"{path} -> {p['canonical'] or 'missing'}")
        if p["h1"] != 1:
            problems["h1 count not 1"].append(f"{path} ({p['h1']})")
        tl, dl = len(p["title"]), len(p["desc"])
        if not 30 <= tl <= 60:
            problems["title outside 30 to 60"].append(f"{path} ({tl})")
        if not 70 <= dl <= 155:
            problems["description outside 70 to 155"].append(f"{path} ({dl})")
    ok = {u: p for u, p in pages.items() if p["status"] == 200}
    for field, label in (("title", "duplicate titles"), ("desc", "duplicate descriptions")):
        for value, n in Counter(p[field] for p in ok.values() if p[field]).items():
            if n > 1:
                who = [urlparse(u).path or "/" for u, p in ok.items() if p[field] == value]
                problems[label].append(f"{n}x \"{value[:70]}\": " + ", ".join(who[:6]))

    inbound = Counter()
    targets = defaultdict(set)
    for u, p in ok.items():
        for l in p["links"]:
            targets[l].add(urlparse(u).path or "/")
            if l.rstrip("/") != u.rstrip("/"):
                inbound[l.rstrip("/")] += 1
    known = {u.rstrip("/") for u in pages}
    unknown = sorted(l for l in targets if l.rstrip("/") not in known)

    def head(l):
        code, text, xrobots = fetch(l)
        if code == 200 and "noindex" in (meta(text, "robots") + " " + xrobots).lower():
            return l, (-1, "", "")
        return l, (code, text if code != 200 else "", "")

    noindexed = 0

    if not a.max:
        with ThreadPoolExecutor(a.threads) as ex:
            for l, (code, note, _) in ex.map(head, unknown):
                src = ", ".join(sorted(targets[l])[:3])
                path = l[len(site):] or "/"
                if code == -1:
                    noindexed += 1
                elif code == 200:
                    problems["linked in the site, 200, but not in the sitemap"].append(f"{path} (from {src})")
                elif code in (301, 302, 307, 308):
                    problems["internal link to a redirect"].append(f"{path} -> {note} (from {src})")
                else:
                    problems["broken internal link"].append(f"{path} ({code}) (from {src})")
        weak = sorted((urlparse(u).path or "/") for u in ok if inbound[u.rstrip("/")] < 3)
        if weak:
            problems["fewer than 3 inbound internal links"] = weak

    if lastmods and len(set(lastmods)) == 1 and len(lastmods) > 5:
        problems["sitemap"].append(f"all {len(lastmods)} lastmod values are {lastmods[0]}, so Google ignores them")
    code, robots, _ = fetch(site + "/robots.txt")
    if code != 200:
        problems["robots.txt"].append(f"answered {code}")
    else:
        if "sitemap:" not in robots.lower():
            problems["robots.txt"].append("does not name the sitemap")
        block, agent = [], ""
        for line in robots.splitlines():
            line = line.split("#")[0].strip()
            if line.lower().startswith("user-agent:"):
                agent = line.split(":", 1)[1].strip()
            elif line.lower().startswith("disallow:") and line.split(":", 1)[1].strip() == "/":
                block.append(agent)
        for b in block:
            if b == "*" or b in AI_BOTS:
                problems["robots.txt"].append(f"blocks everything for {b}")

    if not a.max and noindexed:
        print(f"Note: {noindexed} linked page(s) are noindex and left out of the sitemap on purpose (not counted as problems).")
    print(f"{site}: {len(urls)} sitemap pages, {len(ok)} answered 200. "
          f"{sum(len(v) for v in problems.values())} problem(s) in {len(problems)} group(s).")
    for label, items in problems.items():
        print(f"\n{label}: {len(items)}")
        for it in items[:25]:
            print(f"  {it}")
        if len(items) > 25:
            print(f"  [{len(items) - 25} more; use --json for the full list]")
    if not problems:
        print("No problems found.")
    if a.json:
        json.dump({"pages": pages, "problems": problems}, open(a.json, "w", encoding="utf-8"), indent=1)
        print(f"\nFull data saved to {a.json}")


if __name__ == "__main__":
    main()
