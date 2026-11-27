// D1 tables, created on first use so setup needs no migration command. Same as migrations/0001_init.sql.
// One statement per line: D1's exec() splits on new lines.
export const SCHEMA = [
  "CREATE TABLE IF NOT EXISTS reports (id TEXT PRIMARY KEY, url TEXT NOT NULL, url_hash TEXT NOT NULL, score INTEGER NOT NULL, label TEXT NOT NULL, verdict TEXT, categories TEXT NOT NULL, issues TEXT NOT NULL, metrics TEXT, unlocked INTEGER NOT NULL DEFAULT 0, model TEXT, created_at TEXT NOT NULL);",
  "CREATE INDEX IF NOT EXISTS reports_hash ON reports (url_hash);",
  "CREATE INDEX IF NOT EXISTS reports_created ON reports (created_at);",
  "CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, email TEXT NOT NULL, report_id TEXT, url TEXT, consent_marketing INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL);",
  "CREATE INDEX IF NOT EXISTS leads_created ON leads (created_at);",
  "CREATE TABLE IF NOT EXISTS purchases (id TEXT PRIMARY KEY, report_id TEXT, whop_payment_id TEXT UNIQUE, email TEXT, created_at TEXT NOT NULL);",
  "CREATE INDEX IF NOT EXISTS purchases_email ON purchases (email);",
  "CREATE TABLE IF NOT EXISTS events (id TEXT PRIMARY KEY, report_id TEXT, type TEXT NOT NULL, created_at TEXT NOT NULL);",
  "CREATE INDEX IF NOT EXISTS events_created ON events (created_at);",
  "CREATE TABLE IF NOT EXISTS asks (id TEXT PRIMARY KEY, session TEXT, page TEXT, question TEXT NOT NULL, answer TEXT, created_at TEXT NOT NULL);",
  "CREATE INDEX IF NOT EXISTS asks_created ON asks (created_at);",
  "CREATE TABLE IF NOT EXISTS spend (k TEXT PRIMARY KEY, usd REAL NOT NULL DEFAULT 0);",
  "CREATE TABLE IF NOT EXISTS drip (id TEXT PRIMARY KEY, email TEXT NOT NULL, report_id TEXT NOT NULL, domain TEXT, score INTEGER, consent INTEGER NOT NULL DEFAULT 0, token TEXT NOT NULL UNIQUE, step INTEGER NOT NULL DEFAULT 0, next_at INTEGER NOT NULL, created_ms INTEGER NOT NULL, last_sent INTEGER, tries INTEGER NOT NULL DEFAULT 0, unsub INTEGER NOT NULL DEFAULT 0);",
  "CREATE UNIQUE INDEX IF NOT EXISTS drip_email_report ON drip (email, report_id);",
  "CREATE INDEX IF NOT EXISTS drip_due ON drip (unsub, next_at);",
  "CREATE TABLE IF NOT EXISTS scan_errors (id TEXT PRIMARY KEY, stage TEXT NOT NULL, code TEXT NOT NULL, detail TEXT, host TEXT, created_at TEXT NOT NULL);",
  "CREATE INDEX IF NOT EXISTS scan_errors_created ON scan_errors (created_at);",
  "CREATE TABLE IF NOT EXISTS audits (id TEXT PRIMARY KEY, name TEXT, email TEXT NOT NULL, url TEXT NOT NULL, focus TEXT, details TEXT, mailed INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL);",
].join("\n");
