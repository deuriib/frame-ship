---
name: review-people
description: Use when a change affects organizational culture, team collaboration, compensation plans, Creed alignment, or change management impact.
---

# Review People — Culture & People Review

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Assess human and organizational impact: culture health, team collaboration, compensation structures, Creed alignment, and change readiness. Issue a binding verdict: **PASS / CONDITIONAL / FAIL**. The repository stays untouched—`PEOPLE_REVIEW.md` is produced in `.frame-ship/<domain>/PEOPLE_REVIEW.md` (gitignored) and promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`.

## Chain Contract

- **Previous:** `frame-ship:propose-changes` / `frame-ship:translate-to-spec`
- **Next:** `frame-ship:execute-spec` (only on Approved, or Conditional with conditions met) / `frame-ship:quality-gate`

## Role Binding

Bound to the **people domain owner / organizational culture reviewer** ensuring psychological safety, fair compensation, Creed alignment, and structured change management.

## Process

0. **Pre-flight load — HARD STOP** (contract: `../using-frame-ship/references/pre-flight.md`). `skill(review-people)` loaded? Applicable people rules (`rules/compensation.md`, `rules/integrity-and-screening.md`, `rules/foundation-conduct.md`) loaded? Any NO → STOP.
1. Read `.frame-ship/<domain>/PROPOSED_CHANGES.md` (or policy, organizational change plan, or team spec).
2. Evaluate against the people checklist in `references/people-review.md` (Creed alignment, team impact, compensation fairness, change enablement, cognitive load, psychological safety).
3. Produce `.frame-ship/<domain>/PEOPLE_REVIEW.md` via `references/people-review.md` (promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`).
4. Issue a verdict + conditions. **Block execution on FAIL.** Any conflict with foundation values or unexplained workforce disruption requires remediation.
5. Record the verdict in `.frame-ship/<domain>/PEOPLE_REVIEW.md` and route to `execute-spec` or `quality-gate`.

## Verdict Rules

| Verdict | Meaning | Next |
|---|---|---|
| **PASS** | Cultural integrity, compensation governance, team enablement, and Creed alignment validated. | → `execute-spec` / `quality-gate` |
| **CONDITIONAL** | Conditions (e.g. communication plan, stakeholder training) must be addressed. | Conditions tracked; no silent promotion. |
| **FAIL** | Unmitigated burnout risk, unfair compensation, unethical incentives, or Creed violations. | Blocked; return to proposal with findings. |

## What I Won't Do

- Approve incentive structures that encourage adversarial internal behavior or cutting ethical corners.
- Permit organizational rollouts without a documented change enablement plan.
- Disregard team feedback or psychological safety concerns.

## Red Flags

| Thought | Reality |
|---|---|
| "People issues will resolve themselves once the tool ships" | Tool adoption fails when human enablement and training are ignored. |
| "Creed alignment is just aspirational" | Foundation values govern daily execution, craft excellence, and respect for teammates. |
| "Compensation changes can be announced without modeling" | Inequitable or ambiguous compensation destroys morale and trust. |

## References

- `references/people-review.md` — Checklist, findings, and verdict template.
