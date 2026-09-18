# Implementation Plan: Per-Lane Singleton Consolidation - Automation Lane

**Spec:** `SPEC-singleton-consolidation-automation.md` | **Owner:** espinoza | **Date:** 2026-09-18
**Mode:** single (direct, no dispatch) — skill `execute-spec`

## Objective

Bring `docs/specs/40_workspace/automation/` to the 9-type singleton (REQ-001..003 + NF) without touching any other lane.

## Steps

1. **Write 9 canonicals** (this file + 8 siblings) — each carries its consolidation record (REQ-003). Order: plan → proposal exists → HANDOFF → TEST_MATRIX → RELEASE_NOTES → ARCHITECTURE_REVIEW → DRILL → ARCHITECTURE → API_CONTRACT.
2. **Move** `HANDOFF-git-worktree.md` → `docs/specs/50_archive/HANDOFF-git-worktree-automation.md` via copy → `Get-FileHash` compare → delete-original (REQ-002, REQ-NF-001). Source hash at plan time: `D74C6E06E0BADE76F5F715BA7C6409EDCA4BA017BE5D6FFDEA00AAC682B6CF76`.
3. **Verify** AC-001..004: glob counts (9 canonicals, 0 suffixed), archive hash match, record read-through, lane+archive-only scan.
4. **Gate** via min-gate (risk screen + refuter + readability + QA) → HANDOFF → ship.

## Order & Dependencies

Steps are sequential 1 → 2 → 3. Step 2 depends on HANDOFF.md existing (pointer must land before the source moves). No parallel lanes (single mode).

## Rollback Points

- Before step 2: delete created canonicals (SPEC + proposal stay as audit trail).
- After step 2: move archived original back per HANDOFF record table; delete the 8 newly created canonicals on full revert. ETA < 10 min; owner espinoza.

## Consolidation Record

| Source | Archive path | Status |
|--------|--------------|--------|
| `HANDOFF-git-worktree.md` (4506 bytes, 2026-09-16) | `docs/specs/50_archive/HANDOFF-git-worktree-automation.md` | planned (step 2) |
| 8 other types | — (no prior variant; slots created new) | planned (step 1) |
