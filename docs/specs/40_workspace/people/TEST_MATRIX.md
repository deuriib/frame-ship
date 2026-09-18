# Test Matrix: Per-Lane Singleton Consolidation — People Lane

**Spec:** `SPEC-singleton-consolidation-people.md` | **Owner:** santana (CHRO/CPO) | **Date:** 2026-09-18
**Mode:** single — docs-only unit; evidence = globs, listings, hashes (no code tests apply) — skill `execute-spec`

| REQ | Check (AC) | Method | Result |
|-----|-----------|--------|--------|
| REQ-001 | AC-001: 9 canonicals, no suffixed variant of the 9 types remains (SPEC pair intact) | `Get-ChildItem people/` name match | PASS — 9/9 canonicals present, 0 suffixed variants of the 9 types (only `SPEC-single-dispatcher-people.md` + `SPEC-singleton-consolidation-people.md`, out-of-scope class) |
| REQ-002 | AC-002: 7/7 originals in `50_archive/` byte-identical; zero purge | archive listing + hash-verify at move time (7/7) | PASS — 7/7 MOVED_OK, all HASH_MATCH (log below) |
| REQ-003 | AC-003: merged canonicals index all prior sources (pointer-complete) | read-through 4 merged files | PASS — HANDOFF.md (7-row supersede table), IMPLEMENTATION_PLAN.md (2-plan index), PROPOSED_CHANGES.md (§Superseded 2-row table), this matrix (§Carried-Forward Verdicts) |
| REQ-004 | AC-004: each canonical carries its consolidation record | read-through 9 files | PASS — 9/9 carry §Consolidation Record |
| REQ-NF-001/002 | AC-005: lane+archive-only scan; rollback note in HANDOFF | pattern scan + HANDOFF §Rollback | PASS — touched paths: `40_workspace/people/` + 7 `50_archive/*-people.md` files only; HANDOFF carries §Rollback + Cross-domain request |

## Carried-Forward Verdicts (REQ-003 — prior units, archived originals readable)

| Source (archived) | Verdicts preserved |
|-------------------|--------------------|
| `TEST_MATRIX-git-worktree-people.md` | E-001..E-005 all pass + C-006 evidenced (scoped excerpts, exactly-once count 2 create + ≤2 remove); HANDOFF DoD 10/10 |
| `TEST_MATRIX-single-dispatcher.md` | REQ-F-001..007 PASS, REQ-F-008 CANCELLED (CEO decision #3), REQ-NF-001..004 PASS, REQ-NF-005 PENDING-at-gate (now superseded by this unit's gate), REQ-NF-006 PASS; gate conditions C-1..C-5 met |

## Verification Log (filled at execute + confirmed at gate)

- Pre-move source hashes (SHA256):
  - `HANDOFF-git-worktree.md` (3950 B): `B90FDB995B8F16DD32B16182F6908D55FEC48EA85B14B5B273BAA5E4674F534D`
  - `IMPLEMENTATION_PLAN-git-worktree-people.md` (4738 B): `FC429ADFDB21AC9FA290F681ABC56A76F06647BB7CA1277CBCB0C32A23051023`
  - `IMPLEMENTATION_PLAN-single-dispatcher.md` (5993 B): `C89F843C58D1103FB8A361A2A0D246DE65E583B37317C279353AFAA1921D764E`
  - `PROPOSED_CHANGES-git-worktree-people.md` (8983 B): `9F7C41B72CC9EFC98D2EDBB11B0DE17043796B87E1E108839920A46C70064BAA`
  - `PROPOSED_CHANGES-single-dispatcher.md` (18586 B): `BF01FDCD941A31C89356454D372B4A820F9C3CF4B8989FE1BEEF03573E8EA12A`
  - `TEST_MATRIX-git-worktree-people.md` (4426 B): `D5DAAE6ECA738036B1485EAAA62987A92F14AD0CF698E5CE2CA8A6EED51BAA0E`
  - `TEST_MATRIX-single-dispatcher.md` (9195 B): `23F4ACC7C2ADE028D7CF48D8BF234476499CF40E2794F45EF062FE55C25514BE`
- Move results: 7/7 MOVED_OK (`B90FDB99`, `FC429ADF`, `C89F843C`, `9F7C41B7`, `BF01FDCD`, `D5DAAE6E`, `23F4ACC7`) — post-copy hash == pre-move hash per file, originals deleted after verify.
- Lane listing (post-move): 9 canonicals (`API_CONTRACT.md`, `ARCHITECTURE_REVIEW.md`, `ARCHITECTURE.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `PROPOSED_CHANGES.md`, `RELEASE_NOTES.md`, `TEST_MATRIX.md` (this file)) + `SPEC-single-dispatcher-people.md` + `SPEC-singleton-consolidation-people.md` (out-of-scope class); 0 suffixed variants of the 9 types.

## Consolidation Record

This file is the canonical `TEST_MATRIX.md` — created by consolidating `TEST_MATRIX-git-worktree-people.md` → `docs/specs/50_archive/TEST_MATRIX-git-worktree-people.md` and `TEST_MATRIX-single-dispatcher.md` → `docs/specs/50_archive/TEST_MATRIX-single-dispatcher-people.md` (SPEC-singleton-consolidation-people, 2026-09-18).
