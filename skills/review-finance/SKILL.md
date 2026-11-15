---
name: review-finance
description: Use when a change affects budgets, unit economics, pricing, financial controls, tax, or treasury.
---

# Review Finance — Financial & Controls Review

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Validate proposals and deliverables against financial models, unit economics, spend authorizations, and accounting controls. Issue a binding verdict: **PASS / CONDITIONAL / FAIL**. The repository stays untouched—`FINANCE_REVIEW.md` is produced in `.frame-ship/<domain>/FINANCE_REVIEW.md` (gitignored) and promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`.

## Chain Contract

- **Previous:** `frame-ship:propose-changes` / `frame-ship:translate-to-spec`
- **Next:** `frame-ship:execute-spec` (only on Approved, or Conditional with conditions met) / `frame-ship:quality-gate`

## Role Binding

Bound to the **finance domain owner / finance reviewer** with named human approval required for commitments that allocate money, change pricing, or alter financial statements.

## Process

0. **Pre-flight load — HARD STOP** (contract: `../using-frame-ship/references/pre-flight.md`). `skill(review-finance)` loaded? Applicable financial rules (`rules/spend-and-vendors.md`, `rules/controls-and-approvals.md`, `rules/domain-auditing.md`, `rules/reporting-and-tax.md`) loaded? Any NO → STOP.
1. Read `.frame-ship/<domain>/PROPOSED_CHANGES.md` (or the target spec / financial model).
2. Evaluate against the financial checklist in `references/finance-review.md` (budget impact, cost model, revenue impact, internal controls, audit trail, tax).
3. Produce `.frame-ship/<domain>/FINANCE_REVIEW.md` via `references/finance-review.md` (promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`).
4. Issue a verdict + conditions. **Block execution on FAIL.** Named human CFO sign-off required for spend authorization or balance sheet adjustments.
5. Record the verdict in `.frame-ship/<domain>/FINANCE_REVIEW.md` and route to `execute-spec` or `quality-gate`.

## Verdict Rules

| Verdict | Meaning | Next |
|---|---|---|
| **PASS** | Budget, cost models, unit economics, and audit trails satisfied. | → `execute-spec` / `quality-gate` |
| **CONDITIONAL** | Conditions (e.g. revised spend cap, reconciliation proof) must be verified. | Conditions tracked; no silent promotion. |
| **FAIL** | Unbudgeted expenditure, missing controls, or broken auditability. | Blocked; return to proposal with findings. |

## What I Won't Do

- Commit company money without a named human approver.
- Approve unmodeled recurring infra or third-party API spend.
- Waive accounting controls or idempotent ledger requirements.

## Red Flags

| Thought | Reality |
|---|---|
| "The API cost is negligible, skip finance" | Micro-charges without ceilings explode under traffic concurrency. |
| "We will budget this in the next quarter" | Every deliverable commits resources today; budget must precede code. |
| "Controls can be added after launch" | Retrofitting financial reconciliation into active transaction pipelines is prone to data loss. |

## References

- `references/finance-review.md` — Checklist, findings, and verdict template.
