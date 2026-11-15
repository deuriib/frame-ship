---
name: review-automation
description: Use when a change affects CI/CD pipelines, infrastructure as code, automated workflows, SLOs, runbooks, or deployment operations.
---

# Review Automation — Automation & Operations Review

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Inspect infrastructure automation, CI/CD pipelines, operational runbooks, service level objectives (SLOs), and rollback procedures. Issue a binding verdict: **PASS / CONDITIONAL / FAIL**. The repository stays untouched—`AUTOMATION_REVIEW.md` is produced in `.frame-ship/<domain>/AUTOMATION_REVIEW.md` (gitignored) and promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`.

## Chain Contract

- **Previous:** `frame-ship:propose-changes` / `frame-ship:translate-to-spec`
- **Next:** `frame-ship:execute-spec` (only on Approved, or Conditional with conditions met) / `frame-ship:quality-gate`

## Role Binding

Bound to the **automation/ops domain owner / DevOps reviewer** ensuring pipeline reproducibility, infrastructure determinism, safe rollbacks, and zero manual production drift.

## Process

0. **Pre-flight load — HARD STOP** (contract: `../using-frame-ship/references/pre-flight.md`). `skill(review-automation)` loaded? Applicable ops rules (`rules/devops.md`, `rules/reliability.md`, `rules/deny-hard-gates.md`) loaded? Any NO → STOP.
1. Read `.frame-ship/<domain>/PROPOSED_CHANGES.md` (or CI/CD config, IaC templates, runbooks, or deployment scripts).
2. Evaluate against the automation checklist in `references/automation-review.md` (pipeline determinism, rollback readiness, error budgets/SLOs, monitoring, IaC immutability, pipeline security).
3. Produce `.frame-ship/<domain>/AUTOMATION_REVIEW.md` via `references/automation-review.md` (promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`).
4. Issue a verdict + conditions. **Block execution on FAIL.** Manual production deploys, unversioned IaC, or unverified rollbacks are hard blockers.
5. Record the verdict in `.frame-ship/<domain>/AUTOMATION_REVIEW.md` and route to `execute-spec` or `quality-gate`.

## Verdict Rules

| Verdict | Meaning | Next |
|---|---|---|
| **PASS** | Automated pipelines, IaC, rollback mechanisms, and operational runbooks validated. | → `execute-spec` / `quality-gate` |
| **CONDITIONAL** | Conditions (e.g. canary setup, runbook update) must be verified before deploy. | Conditions tracked; no silent promotion. |
| **FAIL** | Manual deploy steps required, untested rollback, pipeline vulnerabilities, or missing SLOs. | Blocked; return to proposal with findings. |

## What I Won't Do

- Authorize pipelines without automated rollback procedures.
- Permit manual interventions or configuration drifts outside source control.
- Skip staging environment validation before progressive rollout.

## Red Flags

| Thought | Reality |
|---|---|
| "We will write the rollback script if the deploy fails" | If rollback is not rehearsed, the outage will last hours longer. |
| "A manual shell script is fine for this one release" | The pipeline is the only path to production (rule: `deny-hard-gates`). |
| "We do not need alerts for background automations" | Silent failures in background jobs corrupt downstream data unseen. |

## References

- `references/automation-review.md` — Checklist, findings, and verdict template.
