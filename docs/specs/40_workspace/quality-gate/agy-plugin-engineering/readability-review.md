# Review: readability — SPEC-agy-plugin-engineering

**Reviewer:** review-readability (engineering lens, single mode direct)
**Date:** 2026-09-17
**Verdict:** pass
**Findings:** 0

## Checked

- `hooks/*.ts`: small pure filters, header contracts state stdin/stdout/exit; named consts (`DENY_PATTERNS`, `COMPACTION_STEP_THRESHOLD`, `MARKER`); win32-safe joins; no cleverness.
- `plugin.json` / `hooks.json`: schema-exact, minimal keys, every command greppable (`bun ./hooks/*.ts`).
- `rules/frame-ship.md`: verbatim cards + mapping table; one screen answers "how is this 1:1?".
- README section: install/verify/disable/replay/rollback in order; commands copy-pasteable.

## Notes (non-blocking)

- None. Threshold `40` is a named const with a delta comment — good.
