# Proposed Changes: santana (CHRO/CPO) — Per-Lane Singleton Consolidation (People)

**Spec Reference:** SPEC-singleton-consolidation-people (`docs/specs/40_workspace/people/SPEC-singleton-consolidation-people.md`)
**Agent:** santana (CHRO/CPO) — domain chain owner, people
**Date:** 2026-09-18
**Execution_Mode:** single (direct, no task dispatch, min gate)
**Domains-Touched:** [people]

## Summary

Consolidate `docs/specs/40_workspace/people/` (8 files at spec time: 7 suffixed variants of 4 singleton types + 1 out-of-scope SPEC) to the 9-type singleton: exactly one canonical UPPER_SNAKE file per type (`RELEASE_NOTES.md`, `ARCHITECTURE_REVIEW.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `PROPOSED_CHANGES.md`, `TEST_MATRIX.md`, `ARCHITECTURE.md`, `API_CONTRACT.md`). The 7 suffixed variants merge by index + reference into 4 canonicals (HANDOFF 1→1; IMPLEMENTATION_PLAN 2→1; PROPOSED_CHANGES 2→1 superseded-by-reference; TEST_MATRIX 2→1); originals move to `docs/specs/50_archive/` byte-identical (copy → hash-verify → delete-original, no purge). The other 5 canonicals are created new (no prior variant; slot established with consolidation record). `SPEC-*.md` pair untouched (SPEC is not a singleton type). No impl files touched — docs-only. Precedents: engineering `07a75de`, automation + security lanes.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `docs/specs/40_workspace/people/PROPOSED_CHANGES.md` (this file) | document-create | This proposal — canonical slot created (no prior canonical to preserve; supersedes both prior suffixed proposals by reference, §Superseded below) |
| `HANDOFF.md` (new canonical) | document-create | Carries forward `HANDOFF-git-worktree.md` (2026-09-16, SPEC-git-worktree-people, 10/10 DoD) by index + reference; supersedes the suffixed variant with pointer table |
| `IMPLEMENTATION_PLAN.md` (new canonical) | document-create | Plan for this lane's consolidation (§Summary above as the plan) + index of both prior plans (single-dispatcher W1–W8 passes; git-worktree announce-template steps) |
| `TEST_MATRIX.md` (new canonical) | document-create | Evidence map for AC-001..005 (glob counts, 7/7 hash-verify, index-completeness read-through, record read-through, scan) + carried-forward verdicts of both prior matrices |
| `RELEASE_NOTES.md` (new canonical) | document-create | Notes for this consolidation unit (superseded variants listed, no behavior change) |
| `ARCHITECTURE_REVIEW.md` (new canonical) | document-create | Review note: no new design; lane links numbered-store truth; people-reviewer gate recorded here |
| `DRILL.md` (new canonical) | document-create | Carries forward worktree drill substance by reference (engineering `DRILL-git-worktree-2spec.md` + announce-template path); people fatigue-guard appendix preserved via HANDOFF pointer |
| `ARCHITECTURE.md` (new canonical) | document-create | Lane index linking numbered-store truth; not a fork |
| `API_CONTRACT.md` (new canonical) | document-create | Lane pointer to numbered-store contracts + singleton file-contract (naming, no-suffix rule) |
| 7× `docs/specs/50_archive/*-people.md` | file-move | Original suffixed variants moved byte-identical (copy → hash-verify → delete original); zero deletions (exact archive names in SPEC §4) |

Change types per proposal-template. No other files touched. Other lanes untouched (Cross-domain request to montilla for non-people lanes).

## Superseded (prior proposals, archived — not deleted)

| Source | Subject | Archive path |
|--------|---------|--------------|
| `PROPOSED_CHANGES-git-worktree-people.md` | People-side git-worktree contract (consent-before-create + uniform announce + refusal + fatigue guard, 2026-09-16) | `docs/specs/50_archive/PROPOSED_CHANGES-git-worktree-people.md` |
| `PROPOSED_CHANGES-single-dispatcher.md` | Agent-rules wording-change plan W1–W8 across 68 templates + README (2026-09-16) | `docs/specs/50_archive/PROPOSED_CHANGES-single-dispatcher-people.md` |

Both remain readable in the archive; this canonical carries their subjects forward by reference (TEST_MATRIX + HANDOFF pointers), never by full paste.

## Rationale

REQ-001/002 demand one canonical per type with history preserved — index + reference satisfies both without pasting two full proposals + two matrices + two plans + one handoff of context (reference-only packets principle). REQ-003's latest-wins + index-both keeps the two-variant pairs honest: single-dispatcher (agent-rules outcome, grep-verified) and git-worktree (announce-template outcome, 10/10 DoD) are independent units — neither rewrites the other, both are pointed to. Full 9-canonical creation (not just the 4 merged) honors create-if-missing so future people writes never suffix.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Only create the 4 merged canonicals, skip the other 5 | Leaves 5 slots missing — next write re-invents a suffix; violates create-if-missing + uniformity with shipped precedents |
| Full-text paste of all 7 variants into canonicals | Pastes massive context, duplicates DoD/matrices already archived; violates reference-only principle |
| Delete the suffixed variants after indexing | Purge — explicitly forbidden by HARD (no purge) |
| Consolidate other lanes in this unit | Sideways — explicitly forbidden; other lanes belong to their owners |

## Approval Required From

- [x] Owning domain owner: santana (people owner) — self as proposer cannot self-approve substance; approval recorded at quality-gate min-review (people-reviewer lens + refuter + risk screen) below
- [ ] Security screen: docs-only, no auth/data/API/PII — screen only, no deep audit (fast gate per classify table)
- [ ] Architecture impact: lane index links (not forks) numbered-store truth — no ADR (no new design; waived with rationale at gate)

> **Rule:** No repository file modifications during proposal phase. Only this proposal doc (+ SPEC, already done) produced at this stage.

## Risk Assessment

**Proposer:** santana (CHRO/CPO) | **Date:** 2026-09-18 | **Domains-Touched:** [people]

### Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Move loses bytes (copy/delete asymmetry across 7 files) | Low | High | Copy → hash-verify → delete-original per file; all 7 hashes logged in TEST_MATRIX |
| R-002 | Archived renames confuse trace (4 files renamed with `-people` infix) | Low | Low | SPEC §4 + HANDOFF + TEST_MATRIX record both source name and archive name; original bytes identical |
| R-003 | Future trace breaks (old suffixed link dangles) | Med | Low | Record tables map source → archive path; HANDOFF carries the map |
| R-004 | Scope creep into other lanes | Low | Med | HARD per-lane scope; other lanes → Cross-domain request to montilla, never touched here |
| R-005 | Two-variant merge loses a verdict (single-dispatcher vs git-worktree) | Low | Med | REQ-003 index-both: TEST_MATRIX carries both verdict tables; HANDOFF pointer lists both DoDs |

### Blast Radius

Systems: `40_workspace/people/` + `50_archive/` (7 files) only. Teams: people owner only — culture wording history (announce-template + agent-rules) is indexed, never rewritten. Customers/regulators/revenue: none (docs-only, no PII/auth/API). Numbered store, plugin, skills: untouched.

### Rollback Plan

Move archived originals back per consolidation record table; delete the 9 newly created canonicals on full revert if ordered (SPEC pair + this proposal stay as audit trail); ETA < 15 min; owner santana.

### Security Considerations

Docs surface only — no secret/token/credential/session in code/config/logs (Guardrails 1-4); indexes carry filename + one-line substance note, never pasted secrets (none present — workspace docs are process artifacts). Privacy: no PII mapped or exported (Ley 172-13 minimization holds; announce/refusal slots carry no PII).

### Domain Considerations

People only. Workload minimal (docs-only move/index, no new roles or training). Culture guarded by preserving both prior outcomes by reference (uniform announce-template habit + uniform agent-rules wording) — no wording is changed in this unit, only filed. Change plan = the singleton discipline itself (create-if-missing / update-in-place / never-suffix). Gate lens `people-review.md` at quality-gate. Non-touched domains carry no considerations.

## Assumptions

1. `SPEC-*.md` is out of scope (SPEC not a singleton type) — both SPECs stay in-lane as trace anchors.
2. Bare archive names (`HANDOFF-git-worktree.md`, `IMPLEMENTATION_PLAN-single-dispatcher.md`, `PROPOSED_CHANGES-single-dispatcher.md`, `TEST_MATRIX-single-dispatcher.md`) are already taken — the `-people` infix on those 4 archived copies is provenance, not a new in-lane suffix.
3. Security screen + ADR waiver (docs-only, link-not-fork) will be confirmed at min-gate; no separate review dispatch in single mode per precedent.

## Trace

SPEC-singleton-consolidation-people REQ-001..004 + NF → this proposal → execute-spec (7 moves + 9 canonical creates) → min-gate (readability + risk + refuter + qa) → verify-handoff → ship-release.

## Scoped Evidence (proposal phase)

- Lane inventory: `docs/specs/40_workspace/people/` = 8 files (7 suffixed variants of 4 singleton types + 1 out-of-scope SPEC); 0 canonicals pre-existing.
- Numbered-store truth linked (not forked): `docs/specs/10_design/ARCHITECTURE.md` (verified via automation precedent pattern).
- Precedents: engineering `07a75de`, automation + security lanes (min-gate 4/4 pattern reused).
