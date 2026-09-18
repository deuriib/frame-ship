# Implementation Plan: Per-Lane Singleton Consolidation — People Lane

**Spec:** `SPEC-singleton-consolidation-people.md` | **Owner:** santana (CHRO/CPO) | **Date:** 2026-09-18
**Mode:** single (direct, no dispatch) — skill `execute-spec`

## Objective

Bring `docs/specs/40_workspace/people/` to the 9-type singleton (REQ-001..004 + NF) without touching any other lane.

## Steps

1. **Write 9 canonicals** (this file + 8 siblings) — each carries its consolidation record (REQ-004). Order: plan → proposal exists → HANDOFF → TEST_MATRIX → RELEASE_NOTES → ARCHITECTURE_REVIEW → DRILL → ARCHITECTURE → API_CONTRACT.
2. **Move 7 variants** → `docs/specs/50_archive/` via copy → `Get-FileHash` compare → delete-original (REQ-002, REQ-NF-001). Exact source → archive map in SPEC §4 + §Consolidation Record below. HANDOFF.md must exist before its source moves (pointer must land first).
3. **Verify** AC-001..005: glob counts (9 canonicals, 0 suffixed, SPEC pair intact), 7/7 archive hash match, index-completeness read-through, record read-through, lane+archive-only scan.
4. **Gate** via min-gate (readability + risk + refuter + qa) → HANDOFF DoD → ship.

## Order & Dependencies

Steps are sequential 1 → 2 → 3. Step 2 depends on HANDOFF.md + TEST_MATRIX.md existing (pointers must land before sources move). No parallel lanes (single mode).

## Prior Plans Indexed (REQ-003, not re-executed)

| Source (archived) | Outcome carried forward |
|-------------------|-------------------------|
| `IMPLEMENTATION_PLAN-single-dispatcher.md` | W1–W8 passes across 68 templates + README (steps 1–9, sequential reversible units; REQ-F-008 CANCELLED by CEO decision #3); rollback = `git revert` per surface, ETA < 5 min per revert |
| `IMPLEMENTATION_PLAN-git-worktree-people.md` | Uniform announce-template create + byte-uniformity + PII-hygiene self-checks + plan/matrix writes; rollback = delete template + retract scratch, ETA < 5 min |

## Rollback Points

- Before step 2: delete created canonicals (SPEC pair + proposal stay as audit trail).
- After step 2: move archived originals back per HANDOFF record table; delete the 9 newly created canonicals on full revert. ETA < 15 min; owner santana.

## Consolidation Record

| Source | Archive path | Status |
|--------|--------------|--------|
| `HANDOFF-git-worktree.md` | `docs/specs/50_archive/HANDOFF-git-worktree-people.md` | planned (step 2) |
| `IMPLEMENTATION_PLAN-git-worktree-people.md` | `docs/specs/50_archive/IMPLEMENTATION_PLAN-git-worktree-people.md` | planned (step 2) |
| `IMPLEMENTATION_PLAN-single-dispatcher.md` | `docs/specs/50_archive/IMPLEMENTATION_PLAN-single-dispatcher-people.md` | planned (step 2) |
| `PROPOSED_CHANGES-git-worktree-people.md` | `docs/specs/50_archive/PROPOSED_CHANGES-git-worktree-people.md` | planned (step 2) |
| `PROPOSED_CHANGES-single-dispatcher.md` | `docs/specs/50_archive/PROPOSED_CHANGES-single-dispatcher-people.md` | planned (step 2) |
| `TEST_MATRIX-git-worktree-people.md` | `docs/specs/50_archive/TEST_MATRIX-git-worktree-people.md` | planned (step 2) |
| `TEST_MATRIX-single-dispatcher.md` | `docs/specs/50_archive/TEST_MATRIX-single-dispatcher-people.md` | planned (step 2) |
| 5 other types | — (no prior variant; slots created new) | planned (step 1) |
