# Implementation Plan: Antigravity Discovery-Path Fix — Engineering Lane

**Agent:** vasquez (CTO) — engineering owner
**Date:** 2026-09-18
**Proposal:** `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (Antigravity Discovery-Path Fix, 2026-09-18)
**Execution_Mode:** single (direct, no task dispatch; docs/config-only, min gate)
**Domains-Touched:** [engineering]

> **Singleton note:** this file reuses the canonical `40_workspace/engineering/IMPLEMENTATION_PLAN.md` slot per execute-spec discipline (create-if-missing else update-in-place, never suffix). Prior content (singleton-consolidation plan, 2026-09-18) is superseded by this unit and recoverable from git history; same for `TEST_MATRIX.md`.

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Create `.agents/rules/frame-ship.md`: verbatim mirror of `rules/frame-ship.md` + Always On frontmatter (`description:` trigger + `alwaysApply: true`) | `.agents/rules/frame-ship.md` (new) | TEST_MATRIX.md V-001/V-002 | 10 min |
| 2 | Create `.agents/hooks.json`: verbatim move of root `hooks.json` 3 entries (same commands/matchers/timeouts) | `.agents/hooks.json` (new) | TEST_MATRIX.md V-003 | 5 min |
| 3 | Inspect `plugin.json` v1 schema; declare surfaces ONLY if supported, else leave byte-identical | `plugin.json` (conditional) | TEST_MATRIX.md V-004 | 5 min |
| 4 | Add one-line by-reference bridge in root `AGENTS.md` NOTES | `AGENTS.md` (one line) | TEST_MATRIX.md V-005 | 5 min |
| 5 | Remove root `hooks.json` post-verification (git history preserves it) | `hooks.json` (delete) | TEST_MATRIX.md V-003 | 5 min |
| 6 | Run 5-check verify runbook; update this plan + TEST_MATRIX singletons | workspace | this file + TEST_MATRIX.md | 10 min |

## Order of Operations

Steps run 1→6. Additive steps (1–2) land and verify BEFORE the destructive step (5): mirror body diff + hooks diff must read IDENTICAL before root removal. Step 3 resolves first as read-only schema inspection — its outcome (leave-identical) gates whether the architect/ADR trigger fires (it does not). Step 4 is order-independent of 5. Rollback before step 5 is delete-only.

## Rollback Points

Rollback point after step 4 (before removal): delete `.agents/rules/frame-ship.md` + `.agents/hooks.json`, revert the one-line `AGENTS.md` bridge — pure delete/revert, ETA < 5 min. After step 5: additionally `git checkout -- hooks.json` to restore the root twin; revert any `plugin.json` edit (none made). Full rollback ETA < 10 min; owner vasquez.

## Quality Gates

Domain checks:

- [x] Engineering: JSON validity (`ConvertFrom-Json`), body/hook diffs identical, `git status` confirms runtimes untouched
- [ ] Finance: N/A (config/docs-only, no finance surface)
- [ ] Legal: N/A
- [ ] Marketing: N/A
- [ ] People: N/A
- [ ] Revenue: N/A
- [ ] Automation/ops: N/A (hook commands/timeouts unchanged — no ops behavior change)
