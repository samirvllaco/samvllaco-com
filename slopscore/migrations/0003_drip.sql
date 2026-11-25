-- Slop Score email flow: one row per email and report. step 0 is the report email; 1 to 3 are follow-ups (consent only).
CREATE TABLE IF NOT EXISTS drip (id TEXT PRIMARY KEY, email TEXT NOT NULL, report_id TEXT NOT NULL, domain TEXT, score INTEGER, consent INTEGER NOT NULL DEFAULT 0, token TEXT NOT NULL UNIQUE, step INTEGER NOT NULL DEFAULT 0, next_at INTEGER NOT NULL, created_ms INTEGER NOT NULL, last_sent INTEGER, tries INTEGER NOT NULL DEFAULT 0, unsub INTEGER NOT NULL DEFAULT 0);
CREATE UNIQUE INDEX IF NOT EXISTS drip_email_report ON drip (email, report_id);
CREATE INDEX IF NOT EXISTS drip_due ON drip (unsub, next_at);
