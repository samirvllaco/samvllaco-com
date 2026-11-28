#!/usr/bin/env python3
"""Rule check for outreach emails and proposals, so the model does not re-check each one by reading.

One email:
  python3 scripts/tasks/lint_email.py --profile ocufuse-brand --subject "..." body.txt
Many at once (best): a JSON file holding a list of {"id", "subject", "body", "name", "keyword"}:
  python3 scripts/tasks/lint_email.py --profile sam-uiux --batch emails.json

Profiles
  ocufuse-brand  Ocufuse brand partnership first emails (no links, no prices, fixed subject, signature and opt-out line)
  sam-uiux       Sam Vllaco founder outreach (under 120 words, one samvllaco.com link at most, signed Sam)
  sam-audit      Sam Vllaco "Quick UX idea for <domain>" emails to funded companies and firms
  dribbble       Dribbble proposal: "subject" is the title, "body" the Project Details; pass "name" and "keyword"

Exit code 0 when everything passes, 1 when any item has a FAIL. WARN lines never fail an item.
The check is mechanical. It does not judge tone or truth; the humanizer pass and the facts check still apply.
"""
import argparse
import json
import re
import sys

DASH = re.compile("[—–]")
URL = re.compile(r"(https?://\S+|www\.\S+|\b[a-z0-9\-]+\.(?:com|co|io|net|org|app|ai|dev|me|us|uk|agency)\b(?:/\S*)?)", re.I)
MONEY = re.compile(r"([$€£]\s?\d|\b\d[\d,.]*\s?(?:usd|eur|gbp|dollars|euros)\b)", re.I)
PLACEHOLDER = re.compile(r"(\[[^\]]{2,40}\]|\{[^}]{2,40}\}|<[A-Za-z ]{2,30}>|\bTODO\b|\bXXX\b)")
AI_WORDS = ["delve", "leverage", "seamless", "elevate", "cutting-edge", "robust", "game-changer", "game changer",
            "unlock", "streamline", "tapestry", "in today's", "i hope this email finds", "i hope this finds you",
            "testament", "landscape", "foster", "pivotal", "showcase", "revolutionize", "supercharge", "synergy",
            "moreover", "furthermore", "it's worth noting", "rest assured"]
NDA = ["lingopie", "golflive", "golf live", "golfliveapp"]
HEALTH = ["cure", "treat ", "treats ", "heal ", "improve your vision", "improves vision", "improve eyesight",
          "relieve", "relief", "reduce eye strain", "reduces eye strain", "fix your eyes", "clinically", "prevent"]
PRESSURE = ["last chance", "limited time", "only today", "act now", "spots left", "before it's too late", "urgent"]
DRIBBBLE_BANNED = ["i hope", "i came across", "i read your brief", "i'm excited", "i am excited", "i am a ", "my name is",
                   "i'd love", "i would love", "i can help", "here is", "my plan", "amazing", "stunning", "modern",
                   "sleek", "seamless", "elevate", "cutting-edge", "premium"]
DRIBBBLE_CONTACT = ["whatsapp", "telegram", "skype", "paypal", "@gmail", "email me", "wise.com", "payoneer"]


def words(text):
    return len(re.findall(r"\b[\w'\-]+\b", text))


def has(text, items):
    low = text.lower()
    return [w for w in items if w in low]


def check(profile, subject, body, name="", keyword=""):
    fail, warn = [], []
    full = f"{subject}\n{body}"
    if DASH.search(full):
        fail.append("em or en dash found")
    if PLACEHOLDER.search(full):
        fail.append(f"placeholder left in text: {PLACEHOLDER.search(full).group(0)}")
    if "  " in body.replace("\n", " \n ").replace(" \n ", "\n"):
        warn.append("double space")
    if has(full, NDA):
        fail.append("NDA name present: " + ", ".join(has(full, NDA)))
    ai = has(full, AI_WORDS)
    if ai:
        warn.append("AI-sounding words: " + ", ".join(ai))
    if has(full, PRESSURE):
        fail.append("pressure wording: " + ", ".join(has(full, PRESSURE)))
    urls = [u for u in URL.findall(body) if "@" not in u]

    if profile == "ocufuse-brand":
        if not re.fullmatch(r"\U0001F44B .+ in our Top 10 .+\?", subject.strip()):
            fail.append('subject must be "\U0001F44B {Brand} in our Top 10 {list}?"')
        if urls:
            fail.append("no links allowed in a first email: " + ", ".join(urls[:3]))
        if MONEY.search(body):
            fail.append("no prices in a first email: " + MONEY.search(body).group(0))
        if "Not relevant? Just reply and I won't email again." not in body.replace("’", "'"):
            fail.append('opt-out line missing or changed: "Not relevant? Just reply and I won\'t email again."')
        tail = body.strip()[-160:]
        if "Samir \U0001F44B" not in tail or "Ocufuse" not in tail:
            fail.append('signature must be "Samir \U0001F44B" then "Ocufuse"')
        if has(body, HEALTH):
            warn.append("possible health claim, describe only: " + ", ".join(has(body, HEALTH)))
        if has(full, ["sam vllaco", "samvllaco", "ebook", "ui/ux", "whop"]):
            fail.append("other lane mentioned (Sam Vllaco, ebook or design services)")
        if not re.match(r"(Hi|Hello|Hey) \S", body.strip()):
            warn.append("greeting not found at the start")
        if words(body) > 190:
            warn.append(f"{words(body)} words, long for a first email")

    elif profile in ("sam-uiux", "sam-audit"):
        if has(full, ["ocufuse", "ebook", "whop.com", "27 copy-paste", "ai slop ui"]):
            fail.append("must not mention Ocufuse, the ebook or Whop")
        if MONEY.search(body):
            fail.append("no prices: " + MONEY.search(body).group(0))
        own = [u for u in urls if re.search(r"samvllaco\.com|dribbble\.com/samirvllaco|figma\.com/design/JDrxmwmeWbl1oyj1d4O391", u)]
        if profile == "sam-uiux":
            n = words(body)
            if n > 120:
                fail.append(f"{n} words, limit is 120")
            if len(own) > 1:
                fail.append("link samvllaco.com at most once")
            if "Not for you? Just reply and I won't email again." not in body.replace("’", "'"):
                fail.append('closing line missing or changed: "Not for you? Just reply and I won\'t email again."')
            if not re.search(r"(^|\n)Sam\s*(\n|$)", body.strip()):
                fail.append('must be signed "Sam" on its own line')
            if not subject.strip() or len(subject) > 70:
                fail.append("subject missing or over 70 characters")
        else:
            if not re.match(r"(For .+: quick UX idea for |Quick UX idea for )\S+\.\S+", subject.strip()):
                fail.append('subject must be "Quick UX idea for <domain>" or "For <Name>: quick UX idea for <domain>"')
            for need in ("samvllaco.com", "dribbble.com/samirvllaco", "figma.com/design/JDrxmwmeWbl1oyj1d4O391"):
                if need not in body:
                    fail.append(f"signature block is missing {need}")
            if "15-minute call" not in body:
                warn.append('the "15-minute call" ask is missing')
        extra = [u for u in urls if u not in own]
        if profile == "sam-uiux" and extra:
            warn.append("other links or domains in the body (fine when it is their own site): " + ", ".join(extra[:3]))

    elif profile == "dribbble":
        title, first = subject.strip(), body.strip()[:255]
        if len(title) > 40:
            fail.append(f"title is {len(title)} characters, limit is 40")
        if not title:
            fail.append("title missing")
        if "samvllaco.com" not in first:
            fail.append("samvllaco.com is not in the first 255 characters")
        if not re.search(r"\d", first):
            fail.append("no number in the first 255 characters")
        greet = f"Hi {name}," if name else "Hi there,"
        if greet.lower() not in first.lower():
            fail.append(f'first 255 characters must hold the greeting "{greet}"')
        if keyword and keyword.lower() not in first.lower():
            fail.append(f'brief keyword "{keyword}" is not in the first 255 characters')
        if not keyword:
            warn.append("no keyword passed, the brief keyword check did not run")
        if has(first, DRIBBBLE_BANNED):
            fail.append("banned phrase in the first 255 characters: " + ", ".join(has(first, DRIBBBLE_BANNED)))
        if has(body, DRIBBBLE_CONTACT):
            fail.append("contact or payment word: " + ", ".join(has(body, DRIBBBLE_CONTACT)))
        if re.search(r"(^|\n)\s*([-*•]|\d+[.)])\s", body):
            fail.append("bullets or numbered lists are not allowed")
        if "\n\n\n" in body:
            fail.append("extra blank lines")
        pre_links = body.split("https://")[0]
        if not 110 <= words(pre_links) <= 200:
            warn.append(f"{words(pre_links)} words before the links, aim for 120 to 190")
        if "ocufuse" in body.lower() and "ocufuse.com" not in body.lower():
            warn.append("Ocufuse named without ocufuse.com")
    else:
        sys.exit(f"Unknown profile '{profile}'.")
    return fail, warn


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--profile", required=True, choices=["ocufuse-brand", "sam-uiux", "sam-audit", "dribbble"])
    ap.add_argument("--subject", default="")
    ap.add_argument("--name", default="")
    ap.add_argument("--keyword", default="")
    ap.add_argument("--batch")
    ap.add_argument("file", nargs="?")
    a = ap.parse_args()
    if a.batch:
        items = json.load(open(a.batch, encoding="utf-8"))
    else:
        body = open(a.file, encoding="utf-8").read() if a.file else sys.stdin.read()
        items = [{"id": a.file or "stdin", "subject": a.subject, "body": body, "name": a.name, "keyword": a.keyword}]
    bad = 0
    for n, it in enumerate(items, 1):
        fail, warn = check(a.profile, it.get("subject", ""), it.get("body", ""), it.get("name", ""), it.get("keyword", ""))
        label = it.get("id", n)
        if fail:
            bad += 1
            print(f"FAIL {label}: " + "; ".join(fail))
        else:
            print(f"PASS {label}" + (f" ({words(it.get('body', ''))} words)"))
        for w in warn:
            print(f"  WARN {label}: {w}")
    print(f"{len(items) - bad} of {len(items)} passed.")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
