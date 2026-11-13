#!/bin/sh
# Tells Bing (and other IndexNow engines) about every URL in the sitemap. Run after a deploy that adds or changes pages.
# Usage: npm run build && sh scripts/indexnow.sh
python3 - <<'P'
import re, json, urllib.request
K = "672dc3b186b8191062b3f405b18b266a"
urls = re.findall(r"<loc>(.*?)</loc>", open("out/sitemap.xml").read())
body = json.dumps({"host": "samvllaco.com", "key": K, "keyLocation": f"https://samvllaco.com/{K}.txt", "urlList": urls}).encode()
req = urllib.request.Request("https://api.indexnow.org/indexnow", data=body, headers={"Content-Type": "application/json; charset=utf-8"})
print(urllib.request.urlopen(req).status, len(urls), "urls")
P
