# Proposed Changes: vasquez (engineering owner) — Per-Lane Singleton Consolidation

**Spec Reference:** SPEC-singleton-consolidation-engineering (`docs/specs/40_workspace/engineering/SPEC-singleton-consolidation-engineering.md`)
**Agent:** vasquez (CTO) — engineering owner
**Date:** 2026-09-18
**Execution_Mode:** single (direct, no task dispatch, min gate)
**Domains-Touched:** [engineering]

## Summary

Consolidate `docs/specs/40_workspace/engineering/` (63 files at spec time) to the 9-type singleton: exactly one canonical UPPER_SNAKE file per type (`RELEASE_NOTES.md`, `ARCHITECTURE_REVIEW.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `PROPOSED_CHANGES.md`, `TEST_MATRIX.md`, `ARCHITECTURE.md`, `API_CONTRACT.md`). Suffixed variants merge by index + reference into their canonical; originals move to `docs/specs/50_archive/` byte-identical (no purge). Prior canonical `PROPOSED_CHANGES.md` (hidden-flag, 2026-09-17) already preserved at `docs/specs/50_archive/PROPOSED_CHANGES-hidden-flag.md` (hash-verified identical); this file reuses the canonical slot and references it. `SPEC-*.md` trio untouched (SPEC is not a singleton type). No impl files touched — docs-only.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (this file) | document-modify | This proposal — canonical slot reused after archive-preservation of prior content |
| `ARCHITECTURE_REVIEW.md` (new canonical) | document-create | Consolidation index of 6× `ARCHITECTURE_REVIEW-*.md`; latest-wins substance note + record table |
| `DRILL.md` (new canonical) | document-create | Carries forward `DRILL-git-worktree-2spec.md` substance by reference + record |
| `HANDOFF.md` (new canonical) | document-create | Consolidation index of 14× `HANDOFF-*.md` (incl. space-named `HANDOFF-commit-convention purge.md`); supersedes all prior lane handoffs with pointer table |
| `IMPLEMENTATION_PLAN.md` (new canonical) | document-create | Consolidation index of 11× `IMPLEMENTATION_PLAN-*.md`; plan for this lane's consolidation is §Summary above |
| `TEST_MATRIX.md` (new canonical) | document-create | Consolidation index of 10× `TEST_MATRIX-*.md` + evidence map for AC-001..005 |
| `RELEASE_NOTES.md` (new canonical) | document-create | Notes for this consolidation unit (superseded proposals listed, no behavior change) |
| `ARCHITECTURE.md` (new canonical) | document-create | Lane index linking numbered-store truth (`10_design/ARCHITECTURE.md`, `API_CONTRACTS.md`); not a fork |
| `API_CONTRACT.md` (new canonical) | document-create | Lane pointer to `10_design/API_CONTRACTS.md` + singleton file-contract (naming, no-suffix rule) |
| `docs/specs/50_archive/` (+57 files) | file-move | Original suffixed variants moved byte-identical (copy → hash-verify → delete original); zero deletions |
| `docs/specs/15_requirements/REQ-singleton-consolidation-engineering.md` | document-create | Requirements index (already written at spec stage, carried forward) |

Change types per proposal-template. No other files touched. Other lanes untouched (Cross-domain request to montilla for security/people/automation/single-demo/quality-gate lanes).

## Rationale

REQ-001/002 demand one canonical per type with history preserved — index + reference satisfies both without pasting 57 files of context (reference-only packets principle). REQ-003 is already satisfied (hash-verified copy). Latest-wins for substance conflicts avoids inventing merges that need per-variant specs (out of scope per SPEC §5).

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Full-text merge of all variants into each canonical | Pastes massive context, invents conflict resolutions needing per-variant specs — violates reference-only + scope |
| Delete suffixed variants after indexing | Purge — explicitly forbidden by HARD (no purge) |
| Consolidate all lanes repo-wide in this unit | Repo-wide lock — explicitly forbidden; other lanes belong to other owners (sideways) |

## Approval Required From

- [x] Owning domain owner: vasquez (engineering owner) — self as proposer cannot self-approve substance; approval recorded at quality-gate min-review (refuter + risk screen) below
- [ ] Security screen: docs-only, no auth/data/API/PII — screen only, no deep audit (fast gate per classify table)
- [ ] Architecture impact: lane index links (not forks) numbered-store truth — no ADR (no new design; waived with rationale at gate)

> **Rule:** No repository file modifications during proposal phase. Only this proposal doc (+ REQ-003 preservation copy, already done) produced.

## Risk Assessment

**Proposer:** vasquez (engineering owner) | **Date:** 2026-09-18 | **Domains-Touched:** [engineering]

### Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Overwrite destroys prior canonical content | Low (already mitigated) | High | REQ-003 copy done BEFORE this write; hashes match (7BD6AE17…) |
| R-002 | Move loses bytes (copy/delete asymmetry) | Low | High | Copy → hash-verify → delete-original per file; spot-check ≥3; archive listing is evidence |
| R-003 | Future trace breaks (old suffixed links dangle) | Med | Low | Record tables map every source → archive path; HANDOFF carries the map |
| R-004 | Scope creep into other lanes | Low | Med | HARD per-lane scope; other lanes → Cross-domain request to montilla, never touched here |

### Blast Radius

Systems: `40_workspace/engineering/` + `50_archive/` only. Teams: engineering owner only. Customers/regulators/revenue: none (docs-only, no PII/auth/API). Numbered store, plugin, skills: untouched.

### Rollback Plan

Move archived originals back per consolidation record tables; delete the 8 newly created canonicals (this proposal file stays as the audit trail); ETA < 15 min; owner vasquez. Prior canonical restorable from `50_archive/PROPOSED_CHANGES-hidden-flag.md`.

### Security Considerations

Docs surface only — no secret/token/credential/session in code/config/logs (Guardrails 1-4); indexes carry filenames + one-line substance notes, never pasted secrets (none present — workspace docs are process artifacts). Privacy: no PII mapped or exported (Ley 172-13 minimization holds).

### Domain Considerations

Engineering only. Non-touched domains carry no considerations.

## Assumptions

1. `SPEC-*.md` trio is out of scope (SPEC not a singleton type) — trace anchors stay in-lane.
2. Security lane's `SECURITY_REVIEW-*.md` / `THREAT_MODEL-*` variants belong to the security owner — flagged cross-domain, not consolidated here.
3. Latest-wins substance notes are sufficient; deep content merges are future per-variant specs.

## Trace

SPEC-singleton-consolidation-engineering REQ-001..004 + NF → this proposal → execute-spec (moves + 8 canonical creates) → min-gate (risk screen + refuter) → verify-handoff → ship-release.

## Scoped Evidence (proposal phase)

- Lane inventory: `docs/specs/40_workspace/engineering/` = 63 files (6× ARCHITECTURE_REVIEW-*, 1× DRILL-*, 14× HANDOFF-*, 11× IMPLEMENTATION_PLAN-*, 15× PROPOSED_CHANGES-*, 10× TEST_MATRIX-*, 3× SPEC-*, 1× canonical PROPOSED_CHANGES.md).
- REQ-003 proof: `50_archive/PROPOSED_CHANGES-hidden-flag.md` hash `7BD6AE175C167B09B4708CCB43A63A7C3A5D0EE3382E48F37C120683852DC585` == source hash at copy time.
- Numbered-store truth linked (not forked): `docs/specs/10_design/ARCHITECTURE.md`, `docs/specs/10_design/API_CONTRACTS.md` (both exist).
