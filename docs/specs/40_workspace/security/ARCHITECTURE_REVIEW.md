# Architecture Review: Security Lane Singleton Consolidation

**Reviewer:** barrera (CISO) — domain chain owner, security
**Date:** 2026-09-18
**Spec Reference:** `docs/specs/50_archive/SPEC-singleton-consolidation-security.md#REQ-003` (archived at ship per lifecycle)
**Execution_Mode:** single
**Skill:** `skills/execute-spec/SKILL.md` (consolidation index; verdict authority stays in archived originals)

## §Security Review Index (6 reviews → archive)

| Review (archived original) | Date | Verdict | Scope (by reference) |
|----------------------------|------|---------|----------------------|
| `50_archive/SECURITY_REVIEW.md` | 2026-09-16 | Conditional (APPROVE with conditions) | INTENT concise-plugin-prompts, frame-ship.ts H1-H6 literals |
| `50_archive/SECURITY_REVIEW-agents-into-plugin.md` | 2026-09-17 | Approved | SPEC-agents-into-plugin-engineering, light config-surface screen |
| `50_archive/SECURITY_REVIEW-agy-plugin.md` | 2026-09-17 | Conditional | agy-plugin TS+Bun hooks proposal |
| `50_archive/SECURITY_REVIEW-debugging.md` | 2026-09-16 | Conditional | SPEC-debugging-engineering |
| `50_archive/SECURITY_REVIEW-git-worktree.md` | 2026-09-16 | Conditional | git-worktree isolation, 4-lane proposals |
| `50_archive/SECURITY_REVIEW-single-dispatcher.md` | 2026-09-16 | APPROVE with conditions (wording-only attestation) | SPEC-single-dispatcher engineering + people |

Verdict tally preserved verbatim: 1 Approved, 5 Conditional (of which 2 APPROVE-with-conditions). No Critical open findings declared by any review beyond their recorded conditions. Full STRIDE tables + conditions live in the archived originals — referenced, not pasted.

## §Threat-Model Index (4 models → archive)

| Model (archived original) | Date | Methodology | Scope (by reference) |
|---------------------------|------|-------------|----------------------|
| `50_archive/THREAT_MODEL-agents-into-plugin.md` | 2026-09-17 | STRIDE-lite | agents-into-plugin config-surface |
| `50_archive/THREAT_MODEL-agy-plugin.md` | 2026-09-17 | STRIDE | agy-plugin hook stdin/stdout boundary |
| `50_archive/THREAT_MODEL-git-worktree.md` | 2026-09-16 | STRIDE | git-worktree isolation, 4 proposals |
| `50_archive/THREAT-MODEL-debugging.md` | 2026-09-16 | STRIDE | debugging skill examples + log guidance |

## Consolidation Record

| Source → Archive path |
|-----------------------|
| `SECURITY_REVIEW.md` → `docs/specs/50_archive/SECURITY_REVIEW.md` |
| `SECURITY_REVIEW-agents-into-plugin.md` → `docs/specs/50_archive/SECURITY_REVIEW-agents-into-plugin.md` |
| `SECURITY_REVIEW-agy-plugin.md` → `docs/specs/50_archive/SECURITY_REVIEW-agy-plugin.md` |
| `SECURITY_REVIEW-debugging.md` → `docs/specs/50_archive/SECURITY_REVIEW-debugging.md` |
| `SECURITY_REVIEW-git-worktree.md` → `docs/specs/50_archive/SECURITY_REVIEW-git-worktree.md` |
| `SECURITY_REVIEW-single-dispatcher.md` → `docs/specs/50_archive/SECURITY_REVIEW-single-dispatcher.md` |
| `THREAT_MODEL-agents-into-plugin.md` → `docs/specs/50_archive/THREAT_MODEL-agents-into-plugin.md` |
| `THREAT_MODEL-agy-plugin.md` → `docs/specs/50_archive/THREAT_MODEL-agy-plugin.md` |
| `THREAT_MODEL-git-worktree.md` → `docs/specs/50_archive/THREAT_MODEL-git-worktree.md` |
| `THREAT-MODEL-debugging.md` → `docs/specs/50_archive/THREAT-MODEL-debugging.md` |

---

# Architecture Review: SPEC-grilling-integration-security (C3+C4 lane) — engineering-owner lens

**Reviewer:** vasquez (engineering owner, with architect design input) — gate-mechanics fidelity only; security bar defers to security owner (parallel lane binds, never overridden)
**Date:** 2026-09-18
**Verdict:** Approved

## Contract Compliance

| Invariant | Status | Notes |
|-----------|--------|-------|
| INV-001 (single-file zero-dep) | pass | Skill-text only (`skills/quality-gate/`, `skills/verify-handoff/` + refs); no runtime/plugin/package.json change; `mise run typecheck` unaffected |
| INV-002 (idempotent, never clobbers) | pass | No config-hook surface touched |
| INV-003/004/005 (prompts/roster/defaults) | pass | No agent-file, manifest, or default change |
| INV-006 (version triple) | pass | No version bump in this unit |
| INV-007 (reference-only provenance) | pass | Eng REQ-003/004 + people REQ-P-001..006 woven by reference only; SPEC/HARD/GATE/DOMAINS packet preserved |
| INV-008 (deny-default) | pass | No new trust boundary (no endpoints/adapters/boundaries/payloads); PII checkpoints + allowlisted evidence ride touched refs |
| Plug-in invariants (no new dir/stage/reviewer; routing table intact) | pass | Proposal bans full re-review (C3) + re-litigation (C4); states no routing-table change, no new reviewer; waiver/gate-report/dod-checklist deltas are additive rows/wording only |
| API_CONTRACTS.md | pass | No config-surface change; proposal states no API_CONTRACTS.md change |
| CLOSED authority + N=2 → escalate | pass | CLOSED-stays-CLOSED wording + retry N=2 preserved in proposal; authority-limit text is additive |

## ADR Required?

- [x] Yes — ADR-007 (`docs/specs/10_design/ADR-007-grilling-integration.md`, proposed) covers C3/C4 fold-in, three-block bar placement, and bans. No separate lane ADR; no contract-shape change.
- [ ] No — change is within existing contracts

## Conditions for Approval

None blocking execute-spec from the architecture lens. Explicitly deferred (not decided here): security-owner formal bar (waiver + residual wording, REQ-SEC-001..007) in the parallel `review-security` lane — its conditions bind this lane; waiver TTL default (90d or next release) is proposed and needs orchestrator confirmation; people-owner tone co-sign (REQ-P-006, banned lexicon) rides gate.

## Sign-off

- [x] engineering owner (vasquez, with architect input) — gate-mechanics Approved; hand off toward execute-spec subject to parallel security verdict
