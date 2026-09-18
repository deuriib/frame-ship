# Implementation Plan: Per-Lane Singleton Consolidation — Engineering Lane

**Spec:** `docs/specs/40_workspace/engineering/SPEC-singleton-consolidation-engineering.md`
**Proposal:** `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md`
**Owner:** vasquez (CTO) — engineering owner
**Execution_Mode:** single (direct, no task dispatch)
**Date:** 2026-09-18

## Steps

| # | Step | Target | REQ | Evidence |
|---|------|--------|-----|----------|
| 1 | Preserve prior canonical `PROPOSED_CHANGES.md` (hidden-flag) to `50_archive/PROPOSED_CHANGES-hidden-flag.md`, hash-verify | archive | REQ-003 | hashes `7BD6AE17…` match — DONE at proposal stage |
| 2 | Write new canonical `PROPOSED_CHANGES.md` (this lane's proposal) | engineering lane | REQ-001/003 | file exists — DONE at proposal stage |
| 3 | Write 8 remaining canonicals (`ARCHITECTURE_REVIEW.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md` (this file), `TEST_MATRIX.md`, `RELEASE_NOTES.md`, `ARCHITECTURE.md`, `API_CONTRACT.md`) with consolidation record tables | engineering lane | REQ-001/004 | files exist |
| 4 | Write `15_requirements/REQ-singleton-consolidation-engineering.md` | requirements | spec §5 | file exists — DONE at spec stage |
| 5 | Move 58 suffixed variants to `50_archive/` (copy → hash-verify → delete original) | archive | REQ-002 | move log + spot-check diffs |
| 6 | Verify: glob shows 9 canonicals + 4 SPEC files only; archive holds all originals; spot-check ≥3 byte-identical | — | AC-001/002 | TEST_MATRIX.md |

## Order & Rollback Points

Steps run in order 1→6. Rollback point after step 5: consolidation record tables map every source → archive path; reverse the moves, delete the 8 new canonicals (proposal file stays as audit trail). ETA < 15 min.

## Consolidation Record (sources → archive)

All originals move under original filenames to `docs/specs/50_archive/`. Full per-file tables live in each canonical file (REQ-004).
