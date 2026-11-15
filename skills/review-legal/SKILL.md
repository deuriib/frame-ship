---
name: review-legal
description: Use when a change touches regulatory compliance, contracts, licensing, IP, privacy law, or legal liabilities.
---

# Review Legal — Legal & Compliance Review

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Evaluate proposals, contracts, terms, and regulatory compliance to ensure all legal and contractual invariants are upheld. Issue a binding verdict: **PASS / CONDITIONAL / FAIL**. The repository stays untouched—`LEGAL_REVIEW.md` is produced in `.frame-ship/<domain>/LEGAL_REVIEW.md` (gitignored) and promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`.

## Chain Contract

- **Previous:** `frame-ship:propose-changes` / `frame-ship:translate-to-spec`
- **Next:** `frame-ship:execute-spec` (only on Approved, or Conditional with conditions met) / `frame-ship:quality-gate`

## Role Binding

Bound to the **legal domain owner / legal reviewer** with consultation from a licensed human attorney for statutory filings, regulatory matters, or formal contract signatures.

## Process

0. **Pre-flight load — HARD STOP** (contract: `../using-frame-ship/references/pre-flight.md`). `skill(review-legal)` loaded? Applicable legal rules (`rules/contracts.md`, `rules/compliance-and-escalation.md`, `rules/ip-and-licensing.md`, `rules/records-and-holds.md`) loaded? Any NO → STOP.
1. Read `.frame-ship/<domain>/PROPOSED_CHANGES.md` (or the target spec / agreement).
2. Evaluate against the legal checklist in `references/legal-review.md` (contracts, IP ownership, regulatory compliance, licensing, liability exposure, terms of service).
3. Produce `.frame-ship/<domain>/LEGAL_REVIEW.md` via `references/legal-review.md` (promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`).
4. Issue a verdict + conditions. **Block execution on FAIL/Rejected.** Named human attorney sign-off required for formal commitments or regulatory filings.
5. Record the verdict in `.frame-ship/<domain>/LEGAL_REVIEW.md` and route to `execute-spec` or `quality-gate`.

## Verdict Rules

| Verdict | Meaning | Next |
|---|---|---|
| **PASS** | No legal, regulatory, IP, or contractual blockers. | → `execute-spec` / `quality-gate` |
| **CONDITIONAL** | Specific conditions (e.g., license update, redline approval) must be verified. | Conditions tracked; no silent promotion. |
| **FAIL** | Unacceptable liability, non-compliance, or unapproved terms. | Blocked; return to proposal with findings. |

## What I Won't Do

- Give binding legal advice on behalf of a human attorney without human sign-off.
- Allow changes with unverified third-party licenses or unclear IP ownership to proceed.
- Waive regulatory or statutory compliance obligations.

## Red Flags

| Thought | Reality |
|---|---|
| "It's an internal API, no legal impact" | Data processing, IP licenses, and employee data have strict legal boundaries. |
| "We will sort out the license after merge" | Unlicensed third-party assets in source expose the project to statutory damages. |
| "Legal review is optional for engineering specs" | Specs touching customer data, billing, or third-party SDKs must pass legal review. |

## References

- `references/legal-review.md` — Checklist, findings, and verdict template.
