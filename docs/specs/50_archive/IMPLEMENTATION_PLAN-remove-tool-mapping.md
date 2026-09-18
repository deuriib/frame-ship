# Implementation Plan: SPEC-remove-tool-mapping-engineering

**Agent:** vasquez (CTO) — domain chain owner, engineering
**Date:** 2026-09-16
**Approved By:** montilla (CEO/orchestrator) 2026-09-16 per user go-ahead after proposal; author vasquez (no self-approval — approval by CEO); barrera N/A docs-only (sin auth/data/API/PII)
**Domains-Touched:** [engineering]

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Delete tool-mapping.md from live tree | `skills/using-frame-ship/references/tool-mapping.md` | `git status --short` (`D`), Test-Path False | 5 min |
| 2 | Reword SKILL.md §3.1 (L43-45) — drop tool-mapping pointer, keep load order self-contained | `skills/using-frame-ship/SKILL.md` | file diff | 10 min |
| 3 | Reword SKILL.md §5 (L74-77) — single bullet (bootstrap-checklist), refs 1:1 with disk | `skills/using-frame-ship/SKILL.md` | file diff + glob | 10 min |
| 4 | Verify: grep 0 live hits + glob 1:1 + Test-Path + PII scan + git status scope | repo (read-only) | TEST_MATRIX-remove-tool-mapping.md | 10 min |

Each step maps to one commit unless the plan explicitly groups them. **Grouping (explicit):** Steps 1-3 commit together as one atomic exec commit — delete without the two rewrites leaves a broken tree (dangling pointers), so splitting would ship a knowingly-broken intermediate state. Step 4 commits with the trace artifacts.

## Order of Operations

Delete first (Step 1), then reword (Steps 2-3): the grep in Step 4 must prove the post-delete tree, not the pre-delete one. Reword order (§3 then §5) is irrelevant — same file, adjacent lines, single edit pass each. Verification (Step 4) runs only after all three mutations land.

## Rollback Points

| Point | Revert | Owner | ETA |
|-------|--------|-------|-----|
| After exec commit | `git revert <exec-sha>` — restores tool-mapping.md + both SKILL lines in one step | vasquez | < 5 min |
| After evidence commit | `git revert <evidence-sha>` — removes plan + matrix only; live tree untouched | vasquez | < 2 min |

Docs-only; no migration, no external undo.

## Quality Gates

- [x] Engineering: N/A lint/types/tests (no code); grep + glob + read-through as domain checks, evidence in matrix
- [ ] Finance: N/A — docs-only, no budget/controls impact
- [ ] Legal: N/A — no IP/regulatory/liability surface
- [ ] Marketing: N/A — no brand/GTM surface
- [ ] People: N/A — cambio docs aislado, sin change plan
- [ ] Revenue: N/A — sin pipeline/quota
- [ ] Automation/ops: N/A — sin runbooks/flags/capacity
