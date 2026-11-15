---
name: review-revenue
description: Use when a change affects pricing, packaging, deal desk terms, billing recognition, or pipeline forecasting.
---

# Review Revenue — Revenue & Deal Desk Review

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Audit commercial terms, packaging, discount tiers, funnel velocity, and quota/forecasting alignment. Issue a binding verdict: **PASS / CONDITIONAL / FAIL**. The repository stays untouched—`REVENUE_REVIEW.md` is produced in `.frame-ship/<domain>/REVENUE_REVIEW.md` (gitignored) and promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`.

## Chain Contract

- **Previous:** `frame-ship:propose-changes` / `frame-ship:translate-to-spec`
- **Next:** `frame-ship:execute-spec` (only on Approved, or Conditional with conditions met) / `frame-ship:quality-gate`

## Role Binding

Bound to the **revenue domain owner / commercial reviewer** ensuring pricing consistency, contract margins, sales motion alignment, and pipeline accuracy.

## Process

0. **Pre-flight load — HARD STOP** (contract: `../using-frame-ship/references/pre-flight.md`). `skill(review-revenue)` loaded? Applicable commercial rules (`rules/deal-desk.md`, `rules/pipeline-and-forecast.md`, `rules/billing-and-recognition.md`, `rules/compensation.md`) loaded? Any NO → STOP.
1. Read `.frame-ship/<domain>/PROPOSED_CHANGES.md` (or commercial quote, contract terms, or pricing table).
2. Evaluate against the revenue checklist in `references/revenue-review.md` (pipeline impact, quota targets, pricing structure, packaging, GTM handoff, commercial controls).
3. Produce `.frame-ship/<domain>/REVENUE_REVIEW.md` via `references/revenue-review.md` (promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`).
4. Issue a verdict + conditions. **Block execution on FAIL.** Non-standard terms or discounts exceeding floors require explicit deal desk authorization.
5. Record the verdict in `.frame-ship/<domain>/REVENUE_REVIEW.md` and route to `execute-spec` or `quality-gate`.

## Verdict Rules

| Verdict | Meaning | Next |
|---|---|---|
| **PASS** | Commercial terms, pricing floors, billing recognition, and forecast models validated. | → `execute-spec` / `quality-gate` |
| **CONDITIONAL** | Conditions (e.g. margin sign-off, billing rule adjustment) must be verified. | Conditions tracked; no silent promotion. |
| **FAIL** | Negative-margin terms, unapproved pricing, or unrecognisable billing schedules. | Blocked; return to proposal with findings. |

## What I Won't Do

- Approve non-standard discount schedules without documented deal desk justification.
- Allow pricing changes to ship without migration and billing engine verification.
- Compromise revenue recognition schedules to close a sprint.

## Red Flags

| Thought | Reality |
|---|---|
| "Engineering can hardcode the price tiers" | Hardcoded prices decouple billing from product catalogs and break quoting engines. |
| "A special discount for one customer does not hurt" | Side letters and unrecorded commitments create audit failures and revenue leakage. |
| "Forecasts can be updated at quarter end" | Pipeline stages must trace to verifiable evidence at each gate. |

## References

- `references/revenue-review.md` — Checklist, findings, and verdict template.
