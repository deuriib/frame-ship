# Release Notes: People Lane Singleton Consolidation

**Owner:** santana (CHRO/CPO) | **Date:** 2026-09-18 | **Spec:** SPEC-singleton-consolidation-people

## What Changed

People lane consolidated to the 9-type singleton. 7 suffixed variants (1 HANDOFF + 2 IMPLEMENTATION_PLAN + 2 PROPOSED_CHANGES + 2 TEST_MATRIX) merged by index + reference into 4 canonicals; originals moved to `50_archive/` byte-identical (4 renamed with `-people` provenance infix where bare names were taken, 3 kept original names). 5 remaining canonicals created new (no prior variant). No behavior change — docs-only; no wording changed, only filed.

## Superseded

| Source | Subject | Archive path |
|--------|---------|--------------|
| `HANDOFF-git-worktree.md` | SPEC-git-worktree-people gate (10/10 DoD, 2026-09-16) | `docs/specs/50_archive/HANDOFF-git-worktree-people.md` |
| `IMPLEMENTATION_PLAN-git-worktree-people.md` | Announce-template plan (2026-09-16) | `docs/specs/50_archive/IMPLEMENTATION_PLAN-git-worktree-people.md` |
| `IMPLEMENTATION_PLAN-single-dispatcher.md` | W1–W8 execution passes (2026-09-16) | `docs/specs/50_archive/IMPLEMENTATION_PLAN-single-dispatcher-people.md` |
| `PROPOSED_CHANGES-git-worktree-people.md` | People-side worktree contract proposal | `docs/specs/50_archive/PROPOSED_CHANGES-git-worktree-people.md` |
| `PROPOSED_CHANGES-single-dispatcher.md` | Agent-rules W1–W8 proposal | `docs/specs/50_archive/PROPOSED_CHANGES-single-dispatcher-people.md` |
| `TEST_MATRIX-git-worktree-people.md` | E-001..E-005 + C-006 (5/5) | `docs/specs/50_archive/TEST_MATRIX-git-worktree-people.md` |
| `TEST_MATRIX-single-dispatcher.md` | Grep suite (REQ-F/REQ-NF verdicts) | `docs/specs/50_archive/TEST_MATRIX-single-dispatcher-people.md` |

## Rollback

Move archived originals back per HANDOFF record table; delete the 9 newly created canonicals on full revert. ETA < 15 min; owner santana.

## Consolidation Record

Created new — no prior variant; singleton slot established by SPEC-singleton-consolidation-people (2026-09-18).
