import { test } from "node:test";
import assert from "node:assert/strict";
import { checkUrl, isBlockedHost, variants } from "../src/url.js";

test("accepts public sites and adds https", () => {
  assert.deepEqual(checkUrl("samvllaco.com"), { ok: true, url: "https://samvllaco.com", host: "samvllaco.com" });
  assert.equal(checkUrl("https://www.Stripe.com/pricing#x").url, "https://www.stripe.com/pricing");
  assert.equal(checkUrl("http://example.com/").url, "http://example.com");
  assert.equal(checkUrl("https://8.8.8.8/").ok, true);
});

test("rejects bad input", () => {
  for (const u of ["", "ftp://a.com", "javascript:alert(1)", "https://user:pw@a.com", "not a url at all"]) assert.equal(checkUrl(u).ok, false, u);
  assert.equal(checkUrl(`https://a.com/${"x".repeat(2100)}`).reason, "too_long");
});

test("blocks private, loopback, link-local and metadata addresses", () => {
  for (const u of ["http://localhost", "http://127.0.0.1", "http://10.1.2.3", "http://172.16.5.4", "http://172.31.255.255", "http://192.168.1.1", "http://169.254.169.254/latest/meta-data", "http://0.0.0.0", "http://100.64.0.1", "http://[::1]/", "http://[fd00::1]/", "http://[fe80::1]/", "http://[::ffff:127.0.0.1]/", "http://2130706433/", "http://0x7f000001/", "http://printer.local", "http://db.internal", "http://intranet", "http://metadata.google.internal", "https://a.com:8080/"]) {
    assert.equal(checkUrl(u).ok, false, u);
  }
  assert.equal(isBlockedHost("172.32.0.1"), false);
  assert.equal(isBlockedHost("11.0.0.1"), false);
});

test("tries www, no www and http", () => {
  assert.deepEqual(variants("https://cookingbuddy.ai/"), ["https://cookingbuddy.ai/", "https://www.cookingbuddy.ai/", "http://cookingbuddy.ai/"]);
  assert.deepEqual(variants("https://www.linear.app/pricing"), ["https://www.linear.app/pricing", "https://linear.app/pricing", "http://www.linear.app/pricing"]);
  assert.deepEqual(variants("http://example.org"), ["http://example.org", "http://www.example.org/"]);
});
