# Proposed Changes: SPEC-singleton-consolidation-security

**Spec Reference:** `docs/specs/40_workspace/security/SPEC-singleton-consolidation-security.md#REQ-001..004+NF-001..002`
**Agent:** barrera (CISO) — domain chain owner, security
**Date:** 2026-09-18
**Execution_Mode:** single (direct, no dispatch, min gate)
**Domains-Touched:** [security]
**Packet:** SPEC:docs/specs/40_workspace/security/SPEC-singleton-consolidation-security.md#REQ-001..004+NF / HARD:single+per-lane+archive-no-purge / GATE:none-yet / DOMAINS:[security]
**Skill:** `skills/propose-changes/SKILL.md`

## Summary

Consolidate the security lane (`docs/specs/40_workspace/security/`, 14 files, 0 of the 9 canonicals) into exactly the 9 UPPER_SNAKE canonicals, archiving all 14 originals to `docs/specs/50_archive/` via copy → SHA256-verify → delete-original. Security-type strays (`SECURITY_REVIEW*`, `THREAT*`) index into `ARCHITECTURE_REVIEW.md`; four canonicals with no source (`ARCHITECTURE.md`, `API_CONTRACT.md`, `DRILL.md`, `RELEASE_NOTES.md`) are created. No implementation files are modified in any phase — docs-only moves plus index writes.

## Changes (source → canonical → archive)

| # | Source (lane) | Canonical (lane, create) | Archive target | REQ |
|---|---------------|--------------------------|----------------|-----|
| 1 | `HANDOFF-git-worktree.md` | `HANDOFF.md` (execute stage, verified content + record) | `50_archive/HANDOFF-git-worktree.md` | REQ-002 |
| 2 | `IMPLEMENTATION_PLAN-git-worktree-security.md` | `IMPLEMENTATION_PLAN.md` | `50_archive/IMPLEMENTATION_PLAN-git-worktree-security.md` | REQ-002 |
| 3 | `PROPOSED_CHANGES-git-worktree-security.md` | `PROPOSED_CHANGES.md` (this file; §Prior-proposal pointer added at execute) | `50_archive/PROPOSED_CHANGES-git-worktree-security.md` | REQ-002 |
| 4 | `TEST_MATRIX-git-worktree-security.md` | `TEST_MATRIX.md` | `50_archive/TEST_MATRIX-git-worktree-security.md` | REQ-002 |
| 5 | `SECURITY_REVIEW.md` + 5× `SECURITY_REVIEW-*.md` | `ARCHITECTURE_REVIEW.md` §Security review index (verdict/date/archive-path per review) | `50_archive/SECURITY_REVIEW*.md` (6 files) | REQ-003 |
| 6 | 4× `THREAT_MODEL*.md` / `THREAT-MODEL-*.md` | `ARCHITECTURE_REVIEW.md` §Threat-model index (methodology/scope-ref per model) | `50_archive/THREAT*` (4 files) | REQ-003 |
| 7 | (none) | `ARCHITECTURE.md` — lane pointer to numbered-store truth, consolidation record "created, no source" | — | REQ-001/004 |
| 8 | (none) | `API_CONTRACT.md` — lane pointer to numbered-store truth, record "created, no source" | — | REQ-001/004 |
| 9 | (none) | `DRILL.md` — lane rollback drill pointer, record "created, no source" | — | REQ-001/004 |
| 10 | (none) | `RELEASE_NOTES.md` — lane release pointer, record "created, no source" | — | REQ-001/004 |

No pre-existing canonical to preserve (lane holds zero of the 9 today) — no REQ-003-style archive-before-reuse needed, unlike the engineering precedent.

## Risk Assessment

| Risk | Likelihood / Impact | Mitigation |
|------|---------------------|------------|
| R-001 content loss during move | Low / High | Copy → SHA256 match on all 14 → delete original; any mismatch = STOP, retry, escalate. Zero deletions without archive. |
| R-002 verdict dilution (index drops a Conditional) | Low / High | Index carries every verdict verbatim (6 reviews: 1 Approved, 5 Conditional) with date + archive path; refuter review attempts "a Conditional was dropped". |
| R-003 secret/PII copied into index | Low / High | Indexes carry prohibition clauses only (verdicts, dates, paths); pattern scan before gate; finding without proof = REFUTED. |
| R-004 sideways touch (engineering/other lanes) | Low / Med | Glob-scoped commands to `40_workspace/security/` + `50_archive/` only; changed-files scan at gate proves lane boundary. |

**Blast radius:** systems — docs only, no runtime; teams — security lane only, other owners unaffected; customers/regulators/revenue — none (no PII, no prod, no keys; Guardrail 4 holds — never rotate keys/patch prod/widen perms).

**Rollback:** move archived originals back per consolidation records; delete created canonicals; ETA < 15 min; owner barrera.

## Approvers

- [x] Bounded brief approved 2026-09-18 (scope + singleton set + HARD) — this proposal's approval basis in single mode.
- [ ] barrera (CISO, security owner) — final sign at quality-gate (security lens, STRIDE screen of the index for R-002/R-003); blocks execute-spec handoff on Rejected.

## Prior-proposal pointer (added at execute)

- Superseded security proposal archived at `docs/specs/50_archive/PROPOSED_CHANGES-git-worktree-security.md` — referenced, not pasted.
