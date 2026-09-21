# Architecture Review: SPEC-agents-roster-engineering & SPEC-agents-roster-people

**Reviewer:** vasquez (engineering owner)
**Date:** 2026-09-21
**Verdict:** Approved

## Contract Compliance

| Invariant | Status | Notes |
|-----------|--------|-------|
| INV-001 (Singular Methodological Mode) | pass | All agents preserve `subagents` execution mode |
| INV-002 (Envelope Purity) | pass | Inter-stage communication strictly by reference |
| INV-003 (HARD Prefix Discipline) | pass | Envelope standard maintained |
| INV-004 (Sequential Equivalence) | pass | Sequential degradation contract preserved |
| INV-005 (Fast-Path Containment) | pass | No pseudo-stages or chain branching |
| INV-006 (Parallel Worktree Bound) | pass | Compliant with max 2 parallel lanes |
| INV-007 (Historical Immutability) | pass | Historical archive intact; changes strictly additive in `agents/` |
| INV-008 (Singleton Working File) | pass | Strictly single canonical files used |
| INV-009 (Agent Least Privilege) | pass | Leaders and reviewers are 100% read-only |
| INV-010 (Domain Specialist Fusion) | pass | Exactly 1 fused specialist per canonical domain |
| INV-011 (Universal Creed & Conduct) | pass | Creed and conduct guardrails embedded in all prompts |
| INV-012 (Single Dispatcher Discipline) | pass | Orchestrator sole dispatcher |

## ADR Required?

- [x] Yes — ADR-010 created (`docs/specs/12_adr/ADR-010-canonical-agents-roster.md`)
- [ ] No — change is within existing contracts

## Conditions for Approval

1. Implementation must adhere strictly to the 4-tier architecture.
2. Frontmatter of every agent file must parse as valid YAML with declared `tools: [...]`.
3. Zero code craft execution permitted for domain owners or reviewers.

## Sign-off

- [x] vasquez (engineering owner) — 2026-09-21
