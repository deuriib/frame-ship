# Proposed Changes: Commit Convention v2 — Work-Unit Scope Syntax

**Spec Reference:** SPEC-commit-convention-v2
**Agent:** vasquez (CTO)
**Date:** 2026-09-16
**Execution_Mode:** single
**Domains-Touched:** [engineering]

## Summary

Rewrite `skills/using-frame-ship/references/commit-convention.md` to introduce a work-unit scope syntax (`type(<stage>/<work-unit>): subject`), mandate multiple commits when work units are distinct, and provide explicit splitting/batching rules for all 9 stages. Single file change; no stage SKILL.md modifications.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `skills/using-frame-ship/references/commit-convention.md` | file-modify | Rewrite with work-unit scope syntax, splitting/batching rules, updated scope table + examples |

## Rationale

The current convention defaults to 1-commit-per-stage, which under-specifies complex work (multiple REQ-IDs, multiple briefs, code + docs). The flat scope syntax (`brief-auth`, `spec-003`) doesn't encode the work unit, making traceability harder. The new syntax `type(<stage>/<work-unit>): subject` makes every commit self-describing: stage + work unit + action. Splitting rules give agents a decision procedure; batching rules prevent atom-splitting theater.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Keep flat scopes, just add "split when needed" note | Doesn't solve traceability; scope still ambiguous across stages |
| Use `type(work-unit): subject` without stage prefix | Ambiguous when work units repeat across stages (e.g., `spec-003` appears in translate, propose, gate, handoff) |
| Enforce commit format in quality-gate | Violates the "guidance only" contract; would break existing history |

## Approval Required From

- [x] Owning C-level: vasquez (CTO, engineering)
- [ ] vasquez (CTO, if architecture/API/model/cross-cutting impact) — self-approval not allowed; waived as documentation-only, no contract change
- [ ] barrera (CISO, if auth/data/external-API/PII impact) — N/A, no auth/data/API/PII impact