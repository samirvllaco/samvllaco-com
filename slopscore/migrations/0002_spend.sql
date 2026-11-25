-- Running Anthropic spend in USD: 'total' and one row per day ('day:YYYY-MM-DD'). See slopscore/src/budget.js.
CREATE TABLE IF NOT EXISTS spend (k TEXT PRIMARY KEY, usd REAL NOT NULL DEFAULT 0);
