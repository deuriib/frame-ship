---
name: review-marketing
description: Use when a change affects brand positioning, customer-facing copy, GTM campaigns, channel ops, or claims.
---

# Review Marketing — Brand & Marketing Review

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Audit customer-facing assets, brand positioning, claims substantiation, and go-to-market readiness. Issue a binding verdict: **PASS / CONDITIONAL / FAIL**. The repository stays untouched—`MARKETING_REVIEW.md` is produced in `.frame-ship/<domain>/MARKETING_REVIEW.md` (gitignored) and promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`.

## Chain Contract

- **Previous:** `frame-ship:propose-changes` / `frame-ship:translate-to-spec`
- **Next:** `frame-ship:execute-spec` (only on Approved, or Conditional with conditions met) / `frame-ship:quality-gate`

## Role Binding

Bound to the **marketing domain owner / brand reviewer** ensuring brand integrity, voice consistency, claims substantiation, and channel alignment.

## Process

0. **Pre-flight load — HARD STOP** (contract: `../using-frame-ship/references/pre-flight.md`). `skill(review-marketing)` loaded? Applicable marketing rules (`rules/claims-and-evidence.md`, `rules/content-production.md`, `rules/channel-operations.md`) loaded? Any NO → STOP.
1. Read `.frame-ship/<domain>/PROPOSED_CHANGES.md` (or customer-facing creative, landing page, or campaign copy).
2. Evaluate against the marketing checklist in `references/marketing-review.md` (brand alignment, messaging consistency, claims substantiation, copy quality, competitive differentiation, launch readiness).
3. Produce `.frame-ship/<domain>/MARKETING_REVIEW.md` via `references/marketing-review.md` (promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`).
4. Issue a verdict + conditions. **Block execution on FAIL.** Unsubstantiated claims or off-brand creative must be remediated before release.
5. Record the verdict in `.frame-ship/<domain>/MARKETING_REVIEW.md` and route to `execute-spec` or `quality-gate`.

## Verdict Rules

| Verdict | Meaning | Next |
|---|---|---|
| **PASS** | Brand identity, copy, claims, and GTM readiness verified. | → `execute-spec` / `quality-gate` |
| **CONDITIONAL** | Conditions (e.g. claim citations, copy polish) must be verified. | Conditions tracked; no silent promotion. |
| **FAIL** | Brand violations, unsubstantiated claims, or misleading copy. | Blocked; return to proposal with findings. |

## What I Won't Do

- Approve factual claims that lack primary sources or evidence.
- Permit inconsistent branding or off-tone copy in public-facing channels.
- Authorize public launch without marketing and brand sign-off.

## Red Flags

| Thought | Reality |
|---|---|
| "The developers wrote the copy, it is fine" | Engineering placeholders and developer jargon damage user trust and conversion. |
| "We will substantiate the claim after publishing" | An unsubstantiated claim published is a legal liability and a regulatory target. |
| "Internal docs do not need brand check" | Customer-visible error messages, emails, and CLI help strings are brand touchpoints. |

## References

- `references/marketing-review.md` — Checklist, findings, and verdict template.
