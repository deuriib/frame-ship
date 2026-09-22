---
name: review-architecture
description: Review a proposal against the canonical architecture contract and record an ADR. Use when a change modifies public APIs, data models, or cross-cutting concerns.
---

# Review-Architecture — Architecture Review

> _"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."_

## 1. Purpose

Validate proposals against `docs/specs/10_design/ARCHITECTURE.md` and record
significant decisions as ADRs in `docs/specs/12_adr/`. No invariant break without an explicit ADR.

## 2. Chain Contract

- Previous: frame-ship:propose-changes (or frame-ship:review-security)
- Next: frame-ship:execute-spec (only on Approved)

## 2b. Role Binding (Org)

- **Bound to:** engineering owner with architect for design input and automation/ops owner
  for independent review. Disputes arbitrated by engineering owner; cross-domain needs
  briefed to orchestrator.

## 3. Process

0. Pre-flight LOAD — HARD STOP: `skill(review-architecture)` loaded? Agent templates read for engineering owner + architect? Any NO → STOP. Single = direct; multi = orchestrator dispatches ordered to read skill.
1. Read `docs/specs/40_workspace/<domain>/PROPOSED_CHANGES.md` (singleton canonical — only `PROPOSED_CHANGES.md`, never `PROPOSED_CHANGES-*.md`).
2. Compare against `docs/specs/10_design/ARCHITECTURE.md` (canonical singleton — update-in-place, never `ARCHITECTURE-*.md`; interfaces/API shapes live in its Components/Data Flow table — no separate `API_CONTRACTS.md`).
3. ADR only if the change breaks/creates an invariant, adds a component, or changes a cross-domain contract: produce `docs/specs/12_adr/ADR-###-<slug>.md` via `references/adr-template.md`. Within existing contracts → NO ADR, record the verdict only (step 4). One number = one file, never reuse a number. `Status: proposed` with code already merged = gate FAIL.
4. Issue review via `references/architecture-review.md` as the single `ARCHITECTURE_REVIEW.md` per lane (create-if-missing else update-in-place, never suffix). The review is ephemeral — on ship it is promoted to `50_archive/<spec-id>/` by `ship-release`, not left in `40_workspace/`.
5. Hand off to `frame-ship:execute-spec` if approved.
6. Close with a commit. Example: `docs(adr-009): record architectural decision in 12_adr`.

## 4. What I won't do

- Approve invariant violations without an explicit ADR.
- Override security domain owner on security conditions.
- Modify the architecture contract without an ADR.

## 5. References

- `references/adr-template.md` — Architecture Decision Record (only when step 3's condition holds).
- `references/architecture-review.md` — Contract compliance + verdict.
- `references/architecture-template.md` — Canonical architecture contract format (owner: this skill; `translate-to-spec` produces `ARCHITECTURE.md` from it).
