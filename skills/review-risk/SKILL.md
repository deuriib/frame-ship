---
name: review-risk
description: Use when assessing dependency supply-chain risks, blast radius, single points of failure, technical debt, and architectural risks.
---

# Review Risk — Engineering Risk & Supply-Chain Review

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Analyze operational, technical, and supply-chain dependencies: blast radius, single points of failure (SPOFs), third-party dependency vulnerabilities, technical debt accumulation, and license risks. Issue a binding verdict: **PASS / CONDITIONAL / FAIL**. The repository stays untouched—`RISK_REVIEW.md` is produced in `.frame-ship/quality-gate/<spec-id>/RISK_REVIEW.md` (or `.frame-ship/<domain>/`) and promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`.

## Chain Contract

- **Previous:** `frame-ship:execute-spec` / `frame-ship:propose-changes`
- **Next:** `frame-ship:quality-gate` / `frame-ship:ship-release`

## Role Binding

Bound to the **engineering quality reviewer (risk lens)** evaluating overall systemic risk, supply chain integrity, and technical liability.

## Process

0. **Pre-flight load — HARD STOP** (contract: `../using-frame-ship/references/pre-flight.md`). `skill(review-risk)` loaded? Applicable standards (`rules/supply-chain.md`, `rules/foundation-conduct.md`) loaded? Any NO → STOP.
1. Read the proposal, architecture, or dependency diffs.
2. Evaluate against the risk checklist in `references/risk-review.md` (SPOF analysis, dependency health, blast radius, version pinning, lockfile integrity, risk ownership).
3. Produce `.frame-ship/quality-gate/<spec-id>/RISK_REVIEW.md` via `references/risk-review.md` (promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`).
4. Issue a verdict + conditions. **Block promotion on FAIL.** Unaccepted Critical/High risks or unvetted external dependencies block release.
5. Record the verdict in the quality gate report.

## Verdict Rules

| Verdict | Meaning | Next |
|---|---|---|
| **PASS** | Systemic risk is low, dependencies are pinned and scanned, blast radius is contained. | → `quality-gate` / next lens |
| **CONDITIONAL** | Residual risks documented with named human owner, mitigation plan, and expiration. | Conditions tracked; no silent promotion. |
| **FAIL** | Unvetted critical dependencies, unmitigated single point of failure, or intolerable blast radius. | Blocked; return to architecture/spec. |

## What I Won't Do

- Authorize new dependencies without verifying license, maintenance health, and lockfile pinning.
- Allow critical or high severity risks to be merged without named owner sign-off.
- Accept unverified assumptions regarding disaster recovery or supplier uptime.

## Red Flags

| Thought | Reality |
|---|---|
| "This small utility package saves us 10 lines of code" | Adds supply-chain attack surface, transitive dependencies, and future update burden (rule: `minimal-code`). |
| "We will document the single point of failure as known debt" | Unmitigated SPOFs will take down the business; design redundancy now. |
| "Residual risks don't need expiration dates" | Unbounded risk acceptances become permanent architectural liabilities. |

## References

- `references/risk-review.md` — Checklist, findings, and verdict template.
