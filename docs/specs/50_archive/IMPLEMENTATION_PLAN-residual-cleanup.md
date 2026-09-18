# Implementation Plan: SPEC-residual-cleanup-engineering

**Agent:** vasquez (CTO) — domain chain owner, engineering
**Date:** 2026-09-16
**Approved By:** montilla (CEO/orchestrator) 2026-09-16 per user go-ahead after proposal; author vasquez (no self-approval); barrera N/A docs-only
**Domains-Touched:** [engineering]

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Reword README.md:97 — drop parenthetical | `README.md` | file diff | 5 min |
| 2 | Reword README.md:236 — drop tool-mapping clause, keep `[ ]` | `README.md` | file diff | 5 min |
| 3 | Verify: grep README 0 + repo-wide scope + PII scan + git status | repo (read-only) | TEST_MATRIX-residual-cleanup.md | 10 min |

**Grouping (explicit):** Steps 1-2 commit together (same file, adjacent concern, one atomic prose fix); Step 3 commits with trace artifacts.

## Order of Operations

Edits first (either order — same file, disjoint lines), verification only after both land.

## Rollback Points

| Point | Revert | Owner | ETA |
|-------|--------|-------|-----|
| After exec commit | `git revert <exec-sha>` — restores both lines | vasquez | < 2 min |
| After evidence commit | `git revert <evidence-sha>` — removes plan + matrix only | vasquez | < 2 min |

## Quality Gates

- [x] Engineering: grep + glob + read-through as domain checks, evidence in matrix
- [ ] Finance / Legal / Marketing / People / Revenue / Automation-ops: N/A — prosa front-door, sin impacto
