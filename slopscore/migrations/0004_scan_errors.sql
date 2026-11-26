-- Failed scans, so the cause is visible later (no IPs, no emails).
CREATE TABLE IF NOT EXISTS scan_errors (id TEXT PRIMARY KEY, stage TEXT NOT NULL, code TEXT NOT NULL, detail TEXT, host TEXT, created_at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS scan_errors_created ON scan_errors (created_at);
