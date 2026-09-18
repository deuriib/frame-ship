# Proposed Changes: espinoza (automation owner) - Per-Lane Singleton Consolidation

**Spec Reference:** SPEC-singleton-consolidation-automation (`docs/specs/40_workspace/automation/SPEC-singleton-consolidation-automation.md`)
**Agent:** espinoza (Senior Automation Consultant) - domain chain owner, automation/ops
**Date:** 2026-09-18
**Execution_Mode:** single (direct, no task dispatch, min gate)
**Domains-Touched:** [automation/ops]

## Summary

Consolidate `docs/specs/40_workspace/automation/` (1 file at spec time) to the 9-type singleton: exactly one canonical UPPER_SNAKE file per type (`RELEASE_NOTES.md`, `ARCHITECTURE_REVIEW.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `PROPOSED_CHANGES.md`, `TEST_MATRIX.md`, `ARCHITECTURE.md`, `API_CONTRACT.md`). The single suffixed variant `HANDOFF-git-worktree.md` merges by index + reference into canonical `HANDOFF.md`; the original moves to `docs/specs/50_archive/HANDOFF-git-worktree-automation.md` byte-identical (copy → hash-verify → delete-original, no purge). Archived name carries the `-automation` lane suffix because a bare `HANDOFF-git-worktree.md` lineage also exists in engineering history (now archived) — collision-safe provenance, not a new suffix in-lane. The other 8 canonicals are created new (no prior variant; slot established with consolidation record). `SPEC-*.md` untouched (SPEC is not a singleton type). No impl files touched — docs-only. Precedent: engineering lane commit `07a75de` (58 moves, min-gate 4/4).

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `docs/specs/40_workspace/automation/PROPOSED_CHANGES.md` (this file) | document-create | This proposal — canonical slot created (no prior canonical to preserve) |
| `HANDOFF.md` (new canonical) | document-create | Carries forward `HANDOFF-git-worktree.md` (2026-09-16, SPEC-git-worktree-automation REQ-AUTO-001..007, 12/12 DoD) by index + reference; supersedes the suffixed variant with pointer table |
| `TEST_MATRIX.md` (new canonical) | document-create | Evidence map for AC-001..004 (glob counts, hash-verify, record read-through, scan) |
| `IMPLEMENTATION_PLAN.md` (new canonical) | document-create | Plan for this lane's consolidation — §Summary above as the plan |
| `RELEASE_NOTES.md` (new canonical) | document-create | Notes for this consolidation unit (superseded variant listed, no behavior change) |
| `ARCHITECTURE_REVIEW.md` (new canonical) | document-create | Review note: no new design; lane links numbered-store truth; waived ADR with rationale |
| `DRILL.md` (new canonical) | document-create | Carries forward worktree drill substance by reference (`DRILL-git-worktree-2spec.md` in engineering lane + runbook path); automation ops appendix preserved via HANDOFF pointer |
| `ARCHITECTURE.md` (new canonical) | document-create | Lane index linking numbered-store truth (`10_design/ARCHITECTURE.md`, `API_CONTRACTS.md`); not a fork |
| `API_CONTRACT.md` (new canonical) | document-create | Lane pointer to `10_design/API_CONTRACTS.md` + singleton file-contract (naming, no-suffix rule) |
| `docs/specs/50_archive/HANDOFF-git-worktree-automation.md` | file-move | Original suffixed variant moved byte-identical (copy → hash-verify → delete original); zero deletions |
| `docs/specs/15_requirements/REQ-singleton-consolidation-automation.md` | document-create | Requirements index (already written at spec stage, carried forward) |

Change types per proposal-template. No other files touched. Other lanes untouched (Cross-domain request to montilla for security/people/single-demo/quality-gate lanes).

## Rationale

REQ-001/002 demand one canonical per type with history preserved — index + reference satisfies both without pasting 4506 bytes of context (reference-only packets principle). REQ-003's record-per-canonical keeps the 8 created-new slots honest about having no prior variant. Latest-wins is trivially satisfied (single variant, no conflict). Full 9-canonical creation (not just HANDOFF.md) honors create-if-missing so future automation writes never suffix.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Only create `HANDOFF.md`, skip the other 8 | Leaves 8 slots missing — next write re-invents a suffix; violates create-if-missing + uniformity with engineering precedent |
| Full-text paste of `HANDOFF-git-worktree.md` into `HANDOFF.md` | Pastes massive context, duplicates DoD already archived; violates reference-only principle |
| Delete the suffixed variant after indexing | Purge — explicitly forbidden by HARD (no purge) |
| Consolidate other lanes in this unit | Sideways — explicitly forbidden; other lanes belong to their owners |

## Approval Required From

- [x] Owning domain owner: espinoza (automation owner) — self as proposer cannot self-approve substance; approval recorded at quality-gate min-review (refuter + risk screen) below
- [ ] Security screen: docs-only, no auth/data/API/PII — screen only, no deep audit (fast gate per classify table)
- [ ] Architecture impact: lane index links (not forks) numbered-store truth — no ADR (no new design; waived with rationale at gate)

> **Rule:** No repository file modifications during proposal phase. Only this proposal doc (+ SPEC + REQ index, already done) produced.

## Risk Assessment

**Proposer:** espinoza (automation owner) | **Date:** 2026-09-18 | **Domains-Touched:** [automation/ops]

### Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Move loses bytes (copy/delete asymmetry) | Low | High | Copy → hash-verify → delete-original; single file, hash logged in TEST_MATRIX |
| R-002 | Archived name confuses trace (renamed with `-automation` infix) | Low | Low | HANDOFF.md + TEST_MATRIX record both source name and archive name; original bytes identical |
| R-003 | Future trace breaks (old suffixed link dangles) | Med | Low | Record tables map source → archive path; HANDOFF carries the map |
| R-004 | Scope creep into other lanes | Low | Med | HARD per-lane scope; other lanes → Cross-domain request to montilla, never touched here |

### Blast Radius

Systems: `40_workspace/automation/` + `50_archive/` (1 file) only. Teams: automation owner only. Customers/regulators/revenue: none (docs-only, no PII/auth/API). Numbered store, plugin, skills: untouched.

### Rollback Plan

Move archived original back per consolidation record table; delete the 8 newly created canonicals if full revert ordered (this proposal file + SPEC stay as audit trail); ETA < 10 min; owner espinoza.

### Security Considerations

Docs surface only — no secret/token/credential/session in code/config/logs (Guardrails 1-4); index carries filename + one-line substance note, never pasted secrets (none present — workspace docs are process artifacts). Privacy: no PII mapped or exported (Ley 172-13 minimization holds).

### Domain Considerations

Automation/ops only. Ops mechanics (worktree runbook `skills/git-worktree/references/pwsh-flow.md`) referenced by path in DRILL.md/HANDOFF.md, never forked. Non-touched domains carry no considerations.

## Assumptions

1. `SPEC-*.md` is out of scope (SPEC not a singleton type) — this SPEC stays in-lane as trace anchor.
2. Bare `HANDOFF-git-worktree.md` in engineering history is already archived — the `-automation` infix on the archived copy is provenance, not a new in-lane suffix.
3. Security screen + ADR waiver (docs-only, link-not-fork) will be confirmed at min-gate; no separate review dispatch in single mode per precedent.

## Trace

SPEC-singleton-consolidation-automation REQ-001..003 + NF → this proposal → execute-spec (1 move + 9 canonical creates) → min-gate (risk screen + refuter + readability + QA) → verify-handoff → ship-release.

## Scoped Evidence (proposal phase)

- Lane inventory: `docs/specs/40_workspace/automation/` = 1 file (`HANDOFF-git-worktree.md`, 4506 bytes) + this SPEC + this proposal; 0 canonicals pre-existing.
- Numbered-store truth linked (not forked): `docs/specs/10_design/ARCHITECTURE.md`, `docs/specs/10_design/API_CONTRACTS.md` (both exist — verified at spec stage via engineering precedent).
- Precedent: commit `07a75de` (engineering singleton consolidation, min-gate 4/4).
