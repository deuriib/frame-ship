# qa-review — hidden flag (runs the real suite)

**SPEC:** SPEC-hidden-flag-engineering | **Date:** 2026-09-17 | **Verdict:** PASS

## Checklist

- [x] All acceptance criteria mapped to evidence (TEST_MATRIX-hidden-flag.md 6/6)
- [x] `mise run typecheck` EXIT 0 (real suite for single-file zero-dep runtime)
- [x] `rg "hidden: true"` → 8 entry lines (260-267); montilla 0; subagent-hidden 0
- [x] `git diff --stat` scope: only `frame-ship.ts` + `ARCHITECTURE.md` (no agent bodies, no skills, no defaults)
- [x] No secrets/PII in diff (scan 0 findings)

No test harness in repo (`tests/` empty per AGENTS.md); typecheck + grep + diff is the real suite for this lane. Green.
