# Product Brief: Commit Convention v2 — Work-Unit Scope Syntax

**ID:** BRIEF-commit-convention-v2
**Initiator:** montilla (CEO)
**Date:** 2026-09-16
**Status:** approved
**Execution_Mode:** single (single file, documentation only)
**Domains-Touched:** [engineering]

## Problem Statement

The current commit convention (`skills/using-frame-ship/references/commit-convention.md`) has three gaps:

1. **Rigid commit-per-stage**: Stages default to "1 commit" but complex work (multiple REQ-IDs, multiple briefs, code + docs) requires multiple commits. No clear splitting criteria.
2. **Flat scope syntax**: Scopes like `brief-auth`, `spec-003` don't explicitly encode the work unit. No structured syntax to map commits to specific work units.
3. **Inconsistent guidance**: `execute-spec` already mandates 1-per-REQ-ID, but other stages lack the same clarity.

## Desired Outcome

A commit convention that:
- Mandates **multiple commits when work units are distinct** (different REQ-IDs, different briefs, different concerns)
- Uses a **work-unit scope syntax** that explicitly maps each commit to its work unit
- Provides **clear splitting/batching rules** so agents know when to split and when to batch
- Remains **guidance only** (never gates quality-gate or verify-handoff)

## Scope

### In Scope

- Rewrite `skills/using-frame-ship/references/commit-convention.md` with work-unit scope syntax
- Define work-unit splitting rules for all 9 stages
- Update examples to use the new scope syntax

### Out of Scope

- Changing the commit format header (type + scope + subject already works)
- Modifying stage SKILL.md files (they reference by path, not by content)
- Adding enforcement/gating (remains guidance only)

## Stakeholders

| Role | Agent | Involvement |
|------|-------|-------------|
| Sponsor | montilla | Decision authority |
| Owner | vasquez | Engineering process |
| Touched | — | No cross-domain impact |

## Constraints

- Single file change only (`commit-convention.md`)
- Must not break existing commit history or conventions
- Guidance only: never becomes a gate requirement
- All 9 stage SKILL.md files reference this file by path — no path change needed

## Open Questions

- [x] Scope syntax: `<stage>/<work-unit-id>` (approved)
- [x] Splitting criteria: atomic work unit = 1 commit (approved)
