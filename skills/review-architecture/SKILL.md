---
name: review-architecture
description: Use when a change modifies public APIs, data models, or cross-cutting concerns.
---

# Review Architecture — Architecture Review

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Validate proposals against `docs/specs/10_design/ARCHITECTURE.md` and record significant decisions as ADRs in `docs/specs/12_adr/`. No invariant break without an explicit ADR.

## Chain Contract

- **Previous:** `frame-ship:propose-changes` (or `frame-ship:review-security`)
- **Next:** `frame-ship:execute-spec` (only on Approved)

## Role Binding

Bound to the **engineering owner** with architect for design input and automation/ops owner for independent review. Disputes arbitrated by engineering owner; cross-domain needs briefed to orchestrator.

## Process

0. **Pre-flight load — HARD STOP.** `skill(review-architecture)` loaded? Agent templates read for engineering owner + architect? Any NO → STOP. Single = direct; multi = orchestrator dispatches ordered to read skill.
1. Read `docs/specs/40_workspace/<domain>/PROPOSED_CHANGES.md` (singleton canonical—never suffixed).
2. Compare against `docs/specs/10_design/ARCHITECTURE.md` (canonical singleton—update-in-place, never `ARCHITECTURE-*.md`; interfaces/API shapes live in its Components/Data Flow table—no separate `API_CONTRACTS.md`).
3. **ADR only if** the change breaks/creates an invariant, adds a component, or changes a cross-domain contract: produce `docs/specs/12_adr/ADR-###-<slug>.md` via `references/adr-template.md`. Within existing contracts → NO ADR, record the verdict only. One number = one file, never reuse a number. `Status: proposed` with code already merged = **gate FAIL**.
4. Issue review via `references/architecture-review.md` as the single `ARCHITECTURE_REVIEW.md` per lane (create-if-missing else update-in-place, never suffixed). Ephemeral—on ship it is promoted to `50_archive/<spec-id>/` by `ship-release`, not left in `40_workspace/`.
5. Hand off to `execute-spec` if approved.
6. **Close with a commit.** Example: `docs(adr-009): record architectural decision in 12_adr`.

## What I Won't Do

- Approve invariant violations without an explicit ADR.
- Override security domain owner on security conditions.
- Modify the architecture contract without an ADR.

## Red Flags

| Thought | Reality |
|---|---|
| "It's within contracts, skip the review doc" | Record the verdict even without an ADR. No review doc = no handoff. |
| "ADR can be proposed after merge" | `Status: proposed` + merged code = gate FAIL. ADR precedes or ships with the change. |
| "One ADR covers several decisions" | One number = one file. Never reuse a number. |
| "Security is adjacent, I can decide" | Security owner owns security conditions. Architecture does not override. |

## References

- `references/adr-template.md` — Architecture Decision Record (only when step 3's condition holds).
- `references/architecture-review.md` — Contract compliance + verdict.
- `references/architecture-template.md` — Canonical architecture contract format (owner: this skill; `translate-to-spec` produces `ARCHITECTURE.md` from it).