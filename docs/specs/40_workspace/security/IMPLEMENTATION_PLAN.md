# Implementation Plan: SPEC-singleton-consolidation-security

**Agent:** barrera (CISO) — domain chain owner, security
**Date:** 2026-09-18
**Approved By:** bounded brief approved 2026-09-18 (single mode, direct)
**Domains-Touched:** [security]
**Skill:** `skills/execute-spec/SKILL.md`

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Write 4 created canonicals (no source) | `ARCHITECTURE.md`, `API_CONTRACT.md`, `DRILL.md`, `RELEASE_NOTES.md` | this plan §Order; consolidation record "created, no source" | 0.25h |
| 2 | Write `ARCHITECTURE_REVIEW.md` (6-review + 4-model index) | `ARCHITECTURE_REVIEW.md` | TEST_MATRIX T-003 (index completeness 10/10 refs) | 0.5h |
| 3 | Write `IMPLEMENTATION_PLAN.md` (this file), `TEST_MATRIX.md`, `HANDOFF.md` | lane canonicals | TEST_MATRIX T-001..T-005 | 0.5h |
| 4 | Move 14 originals to `50_archive/` (copy → SHA256-verify → delete) | `50_archive/` | TEST_MATRIX T-002 (14/14 hash log) | 0.25h |
| 5 | Run lane scans (suffix residue, secret/PII-shape, changed-files boundary) | lane + archive | TEST_MATRIX T-004/T-005 | 0.25h |

## Order of Operations

1. Steps 1–3 (writes, lane only) → 4 (moves) → 5 (scans). Never move before the receiving canonical exists.
2. `PROPOSED_CHANGES.md` already canonical (proposal stage); its §Prior-proposal pointer resolves at step 4.

## Rollback Points

- Before step 4: delete created canonicals (no archive touched yet).
- After step 4: move archived originals back per consolidation records; delete created canonicals. ETA < 15 min; owner barrera.

## Consolidation Record

| Source → Archive path |
|-----------------------|
| `IMPLEMENTATION_PLAN-git-worktree-security.md` → `docs/specs/50_archive/IMPLEMENTATION_PLAN-git-worktree-security.md` (step 4) |
