---
name: review-architecture
description: Review a proposal against the canonical architecture contract and record an ADR. Use when a change modifies public APIs, data models, or cross-cutting concerns.
---

# Review-Architecture — Architecture Review

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## 1. Purpose

Validate proposals against `docs/specs/10_design/ARCHITECTURE.md` and record
significant decisions as ADRs. No invariant break without an explicit ADR.

## 2. Chain Contract

- Previous: frame-ship:propose-changes (or frame-ship:review-security)
- Next: frame-ship:execute-spec (only on Approved)

## 2b. Role Binding (Org)

- **Bound to:** engineering owner with architect for design input and automation/ops owner
  for independent review. Disputes arbitrated by engineering owner; cross-domain needs
  briefed to orchestrator.

## 3. Process

0. Pre-flight LOAD — HARD STOP: `skill(review-architecture)` loaded? Agent templates read for engineering owner + architect? Any NO → STOP. Single = direct; multi = orchestrator dispatches `task(general)` ordered to read skill + templates first.
1. Read `docs/specs/40_workspace/<agent>/PROPOSED_CHANGES.md`.
2. Compare against `ARCHITECTURE.md` + `API_CONTRACTS.md`.
3. Produce/update ADR via `references/adr-template.md`.
4. Issue review via `references/architecture-review.md`.
5. Hand off to `frame-ship:execute-spec` if approved.
6. Close with work-unit commit per `../using-frame-ship/references/commit-convention.md` (guidance only).

## 4. What I won't do

- Approve invariant violations without an explicit ADR.
- Override security domain owner on security conditions.
- Modify the architecture contract without an ADR.

## 5. References

- `references/adr-template.md` — Architecture Decision Record.
- `references/architecture-review.md` — Contract compliance + verdict.
- `../using-frame-ship/references/commit-convention.md` — Commit format + per-stage examples (guidance only; see `frame-ship:using-frame-ship`).
