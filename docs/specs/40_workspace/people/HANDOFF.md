# Handoff: People Lane — Per-Lane Singleton Consolidation (Singleton Canonical)

**From:** santana (CHRO/CPO) — people domain chain owner
**Date:** 2026-09-18
**Spec:** `SPEC-singleton-consolidation-people.md`
**Status:** consolidates-and-supersedes the 7 prior lane files listed below (history preserved in `50_archive/`)

## Outcome

People lane consolidated to the 9-type singleton. 7 suffixed variants moved to `50_archive/` byte-identical (copy → hash-verify → delete). No purge, no repo-wide lock, no impl touched, no wording changed (filing only).

## Prior Files Superseded (moved to `50_archive/`)

| Source | Subject | Archive path |
|--------|---------|--------------|
| `HANDOFF-git-worktree.md` | SPEC-git-worktree-people gate — REQ-PPL-001..005, matrix E-001..E-005 (5/5) + C-006 evidenced, 10/10 DoD (2026-09-16) | `docs/specs/50_archive/HANDOFF-git-worktree-people.md` |
| `IMPLEMENTATION_PLAN-git-worktree-people.md` | Announce-template plan (2026-09-16) | `docs/specs/50_archive/IMPLEMENTATION_PLAN-git-worktree-people.md` |
| `IMPLEMENTATION_PLAN-single-dispatcher.md` | W1–W8 execution passes (2026-09-16) | `docs/specs/50_archive/IMPLEMENTATION_PLAN-single-dispatcher-people.md` |
| `PROPOSED_CHANGES-git-worktree-people.md` | People-side worktree contract proposal | `docs/specs/50_archive/PROPOSED_CHANGES-git-worktree-people.md` |
| `PROPOSED_CHANGES-single-dispatcher.md` | Agent-rules W1–W8 proposal + risk assessment | `docs/specs/50_archive/PROPOSED_CHANGES-single-dispatcher-people.md` |
| `TEST_MATRIX-git-worktree-people.md` | E-001..E-005 + C-006 evidence map (5/5) | `docs/specs/50_archive/TEST_MATRIX-git-worktree-people.md` |
| `TEST_MATRIX-single-dispatcher.md` | Grep suite REQ-F-001..008 + REQ-NF-001..006 (all PASS, F-008 CANCELLED, NF-005 PENDING-at-gate) | `docs/specs/50_archive/TEST_MATRIX-single-dispatcher-people.md` |

Archived names carry the `-people` lane infix where the bare name was already taken (4 files); 3 kept original names (free). Original bytes identical; full DoD/matrices remain readable in the archived originals.

The standing lesson of this unit: **suffix-per-variant was the drift mechanism — the singleton rule (create-if-missing / update-in-place / never-suffix) is now the lane's file discipline.**

## Deliverables

| Artifact | Location / Evidence | Status |
|----------|---------------------|--------|
| Spec | `docs/specs/40_workspace/people/SPEC-singleton-consolidation-people.md` (REQ-001..004 + NF, AC-001..005) | done |
| Proposal | `docs/specs/40_workspace/people/PROPOSED_CHANGES.md` (this unit; supersedes 2 priors by reference) | done |
| Tests / Evidence | `docs/specs/40_workspace/people/TEST_MATRIX.md` (AC-001..005, 7/7 HASH_MATCH) | done |
| Plan | `docs/specs/40_workspace/people/IMPLEMENTATION_PLAN.md` (steps 1–4 + prior-plan index) | done |
| Gate verdict | `docs/specs/40_workspace/quality-gate/singleton-consolidation-people/GATE_REPORT.md` (OPEN 4/4 min-gate) | done |
| Domain artifact | 9 canonicals in `docs/specs/40_workspace/people/` (this file + 8 siblings) + SPEC pair | done |

## Definition of Done Checklist

Common (6/6):
- [x] Acceptance criteria satisfied — AC-001 via glob (9 canonicals, 0 suffixed, SPEC pair intact), AC-002 via 7/7 HASH_MATCH, AC-003 via index tables, AC-004 via record read-through, AC-005 via scan + this rollback note
- [x] Tests/evidence linked per REQ-ID — REQ-001..004 + NF in TEST_MATRIX (glob/hash/read-through/scan methods for docs-only unit)
- [x] Load evidence present — `skill(translate-to-spec)` + `skill(propose-changes)` + `skill(execute-spec)` + `skill(quality-gate)` + `skill(verify-handoff)` + `skill(ship-release)`; mode `single`; packet `SPEC/HARD/GATE/DOMAINS` intact
- [x] Domain checks passing — Common + People appendix (see below)
- [x] Security checks passing — N/A for people lane (no auth/data/API/PII surface); docs-only screen at min-gate, no secrets/PII in indexes
- [x] Documentation / filing / comms updated as applicable — 9 canonicals filed; no external sends required

People appendix (1/1):
- [x] Impact/skills/change-plan signed — people-reviewer lens at min-gate: team impact minimal (filing-only, no wording changed), no skills gap / no hiring, change plan = singleton discipline itself (create-if-missing / update-in-place / never-suffix); comms = none required (internal filing)

Documentation (3/3):
- [x] Domain artifact filed in agreed location — `docs/specs/40_workspace/people/` (9 canonicals) + `docs/specs/50_archive/` (7 originals)
- [x] Changelog entry added (or N/A with justification) — N/A: internal-only filing consolidation, no user-facing release surface; justification recorded here
- [x] ADR written if architecture contract changed — N/A: no contract change (waiver rationale in ARCHITECTURE_REVIEW.md)

**DoD: 10/10 pass.**

## Blockers / Open Questions

None. No Cross-domain request brief filed beyond the standing lane-ownership note below (per REQ scope "other lanes belong to their owners" — notification only, no action needed from this lane).

## Next Agent

`frame-ship:ship-release` — people lane complete with OPEN gate (4/4 min-gate). In-lane `RELEASE_NOTES.md` is the unit's notes; delivery-level release (if ordered) is a CEO decision outside this lane.

## Rollback

Move the archived originals back per the record table above; delete the 9 newly created canonicals on full revert if ordered (SPEC pair + PROPOSED_CHANGES stay as audit trail). ETA < 15 min; owner santana.

## Cross-Domain Request (to montilla, orchestrator)

Other lanes still carry suffixed variants and belong to their owners — single-demo (lowercase mirrors), quality-gate subdirs, any residual non-shipped lane. Request: dispatch each owning owner to run the same singleton consolidation in their lane. People lane does not touch them (no sideways).

## Lessons (recorded on PASS)

1. Suffix-per-variant was the drift mechanism — create-if-missing / update-in-place / never-suffix is now this lane's file discipline (same standing lesson as engineering + automation precedents).
2. Two-variant pairs need index-both, not latest-only: single-dispatcher (agent-rules) and git-worktree (announce-template) are independent outcomes — TEST_MATRIX carries both verdict tables so neither DoD is orphaned.
3. Archived renames need provenance, not purity: the `-people` infix on 4 archived copies disambiguates from taken bare names while bytes stay identical — record both names everywhere.
4. No wording changed in a consolidation unit — filing-only scope keeps the people gate clean (culture trust preserved; reviewers verify pointers, not prose).

## Consolidation Record

This file is the canonical `HANDOFF.md` — created by consolidating `HANDOFF-git-worktree.md` → `docs/specs/50_archive/HANDOFF-git-worktree-people.md` (SPEC-singleton-consolidation-people, 2026-09-18).
