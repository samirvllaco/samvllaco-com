#!/usr/bin/env python3
"""Find fresh Show HN launches with a founder email that is published in the open.

Replaces the slow manual search in the weekday UI/UX outreach task. It lists candidates only:
the run still opens each site, judges the design and writes the email.

  python3 scripts/tasks/find_launches.py                       last 14 days, up to 40 candidates
  python3 scripts/tasks/find_launches.py --days 7 --max 25
  python3 scripts/tasks/find_launches.py --exclude sent.txt    skip domains and addresses listed in sent.txt
                                                               (one per line; paste Sent-folder domains and the log's addresses)

An address is listed only when it appears as text on the page named as its source (the founder's
Hacker News profile or the product's own page). Addresses decoded from "name at site dot com" are
marked "decoded": open the source and confirm before using. Nothing is guessed. Read-only.
Python 3 standard library only.
"""
import argparse
import socket
import html
import json
import re
import sys
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urljoin, urlparse

UA = "Mozilla/5.0 (compatible; launch-finder/1.0)"
EMAIL = re.compile(r"[A-Za-z0-9._%+\-]+@[A-Za-z0-9\-]+(?:\.[A-Za-z0-9\-]+)*\.[A-Za-z]{2,}")
OBFUSCATED = re.compile(r"\b([A-Za-z0-9._%+\-]{1,40}) ?(?:\[at\]|\(at\)| at ) ?([A-Za-z0-9\-]{1,40}(?: ?(?:\[dot\]|\(dot\)| dot |\.) ?[A-Za-z0-9\-]{1,20}){1,3})", re.I)
GENERIC = ("hello", "hi", "support", "info", "contact", "team", "help", "admin", "sales", "mail", "office", "feedback", "press", "privacy", "legal", "security", "abuse", "noreply", "no-reply")
NOT_PRODUCT = ("github.com", "gitlab.com", "youtube.com", "youtu.be", "twitter.com", "x.com", "medium.com", "substack.com",
               "apps.apple.com", "play.google.com", "chromewebstore.google.com", "npmjs.com", "pypi.org", "huggingface.co",
               "arxiv.org", "docs.google.com", "codeberg.org", "sr.ht", "crates.io", "news.ycombinator.com")
SKIP_WORDS = ("crypto", "casino", "betting", "gambl", "nsfw", "porn", "token", "blockchain", "web3", "nft", "defi")
FREEMAIL = ("gmail.com", "googlemail.com", "outlook.com", "hotmail.com", "proton.me", "protonmail.com", "pm.me", "icloud.com", "me.com", "fastmail.com", "hey.com", "duck.com", "yahoo.com")
PLACEHOLDER_USERS = ("you", "your", "yourname", "name", "email", "user", "username", "john", "jane", "johndoe", "test", "deine", "example", "me", "someone", "first.last")
JUNK_EMAIL = ("company.com", "email.de", "mail.com", "acme.", "example.com", "sentry.io", "wixpress.com", "domain.com", "email.com", "yourdomain", ".png", ".jpg", ".webp", ".svg", "sentry-next", "@2x")


socket.setdefaulttimeout(10)


def get(url, timeout=8):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read(300_000).decode("utf-8", "replace")


def emails_in(text, decode=False):
    text = html.unescape(text)
    found = {(e.strip(".").lower(), "found") for e in EMAIL.findall(text)}
    # Decoding "name at site dot com" runs only on short profile text; on whole pages it is slow and noisy.
    for user, dom in (OBFUSCATED.findall(re.sub(r"<[^>]+>", " ", text)[:3000]) if decode else []):
        dom = re.sub(r"\s*(?:\[dot\]|\(dot\)|\s+dot\s+)\s*", ".", dom, flags=re.I).replace(" ", "")
        cand = f"{user}@{dom}".lower()
        if EMAIL.fullmatch(cand) and (cand, "found") not in found:
            found.add((cand, "decoded"))
    return {(e, k) for e, k in found if not any(j in e for j in JUNK_EMAIL) and e.split("@")[0] not in PLACEHOLDER_USERS}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=14)
    ap.add_argument("--max", type=int, default=40)
    ap.add_argument("--exclude")
    ap.add_argument("--min-points", type=int, default=1)
    a = ap.parse_args()

    excluded = set()
    if a.exclude:
        for line in open(a.exclude, encoding="utf-8"):
            line = line.strip().lower()
            if line and not line.startswith("#"):
                excluded.add(line.split("@")[-1])
                excluded.add(line)

    since = int(time.time()) - a.days * 86400
    hits = []
    for page in range(5):
        url = ("https://hn.algolia.com/api/v1/search_by_date?tags=show_hn&hitsPerPage=200"
               f"&numericFilters=created_at_i>{since}&page={page}")
        try:
            data = json.loads(get(url, 30))
        except Exception as e:
            sys.exit(f"BLOCKED: the Hacker News search API did not answer ({str(e)[:80]}). Search by hand this run.")
        hits += data.get("hits", [])
        if page + 1 >= data.get("nbPages", 0):
            break

    cands, seen = [], set()
    for h in hits:
        url, title = h.get("url") or "", h.get("title") or ""
        host = urlparse(url).netloc.lower().removeprefix("www.")
        if not url or not host or host in seen or (h.get("points") or 0) < a.min_points:
            continue
        if any(host == n or host.endswith("." + n) for n in NOT_PRODUCT):
            continue
        if any(w in (title + " " + url).lower() for w in SKIP_WORDS):
            continue
        if host in excluded:
            continue
        seen.add(host)
        cands.append({"title": re.sub(r"^Show HN:\s*", "", title), "url": url, "host": host, "author": h.get("author"),
                      "points": h.get("points") or 0, "date": (h.get("created_at") or "")[:10],
                      "hn": f"https://news.ycombinator.com/item?id={h.get('objectID')}"})

    def enrich(c):
        found = []
        try:
            prof = json.loads(get(f"https://hacker-news.firebaseio.com/v0/user/{c['author']}.json"))
            src = f"https://news.ycombinator.com/user?id={c['author']}"
            found += [(e, k, src) for e, k in emails_in((prof or {}).get("about") or "", decode=True)]
        except Exception:
            pass
        base = f"{urlparse(c['url']).scheme}://{urlparse(c['url']).netloc}"
        for path in ("", "/about", "/contact"):
            if path and (c.get("site_error") or any(k == "found" for _, k, _ in found)):
                break
            page_url = c["url"] if path == "" else urljoin(base, path)
            try:
                # On the product's own pages keep only its own domain or a personal mailbox, not third parties.
                found += [(e, k, page_url) for e, k in emails_in(get(page_url))
                          if e.split("@")[1] in FREEMAIL or e.split("@")[1].endswith(".".join(c["host"].split(".")[-2:]))]
            except Exception:
                if path == "":
                    c["site_error"] = True
        best = None
        for e, k, src in found:
            if e in excluded or e.split("@")[1] in excluded:
                continue
            named = e.split("@")[0] not in GENERIC
            score = (named, k == "found", "ycombinator" in src)
            if best is None or score > best[0]:
                best = (score, e, k, src, named)
        if best:
            c.update(email=best[1], kind=("named" if best[4] else "generic") + ("" if best[2] == "found" else ", decoded"), source=best[3])
        return c

    cands.sort(key=lambda c: -c["points"])
    with ThreadPoolExecutor(24) as ex:
        cands = list(ex.map(enrich, cands[:max(a.max * 3, 60)]))

    with_mail = [c for c in cands if c.get("email")]
    with_mail.sort(key=lambda c: (not c["kind"].startswith("named"), -c["points"]))
    print(f"Show HN launches in the last {a.days} days: {len(hits)} posts, {len(cands)} product sites checked, "
          f"{len(with_mail)} with a published address ({sum(c['kind'].startswith('named') for c in with_mail)} named). "
          f"Excluded entries loaded: {len(excluded)}.")
    print("product | site | founder (HN) | address | type | address seen on | points | posted | HN thread")
    for c in with_mail[:a.max]:
        print(f"{c['title'][:70]} | {c['url']} | {c['author']} | {c['email']} | {c['kind']} | {c['source']} | {c['points']} | {c['date']} | {c['hn']}")
    rest = [c for c in cands if not c.get("email") and not c.get("site_error")][:15]
    if rest:
        print("\nNo address found by the script (look by hand only if the list above is too short):")
        for c in rest:
            print(f"{c['title'][:70]} | {c['url']} | {c['author']} | {c['hn']}")


if __name__ == "__main__":
    import signal
    signal.signal(signal.SIGPIPE, signal.SIG_DFL)  # quiet exit when the output is piped to head
    main()
