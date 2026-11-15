---
name: review-data
description: Use when a change affects data schemas, database migrations, ETL/ELT pipelines, data lineage, retention policies, or PII handling.
---

# Review Data — Data & Schema Review

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Inspect data models, database migrations, streaming/batch pipelines, data lineage, retention schedules, and privacy/PII minimization. Issue a binding verdict: **PASS / CONDITIONAL / FAIL**. The repository stays untouched—`DATA_REVIEW.md` is produced in `.frame-ship/<domain>/DATA_REVIEW.md` (gitignored) and promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`.

## Chain Contract

- **Previous:** `frame-ship:propose-changes` / `frame-ship:translate-to-spec`
- **Next:** `frame-ship:execute-spec` (only on Approved, or Conditional with conditions met) / `frame-ship:quality-gate`

## Role Binding

Bound to the **data domain owner / data architect reviewer** ensuring schema integrity, reversible zero-downtime migrations, lineage tracking, and strict PII minimization.

## Process

0. **Pre-flight load — HARD STOP** (contract: `../using-frame-ship/references/pre-flight.md`). `skill(review-data)` loaded? Applicable data rules (`rules/data-minimization.md`, `rules/identity-and-data.md`, `rules/governance-and-rights.md`, `rules/deny-hard-gates.md`) loaded? Any NO → STOP.
1. Read `.frame-ship/<domain>/PROPOSED_CHANGES.md` (or migration scripts, schema definitions, ETL pipelines, or query definitions).
2. Evaluate against the data checklist in `references/data-review.md` (backward compatibility, zero-downtime migration, rollback readiness, indexing, PII minimization, data retention).
3. Produce `.frame-ship/<domain>/DATA_REVIEW.md` via `references/data-review.md` (promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`).
4. Issue a verdict + conditions. **Block execution on FAIL.** Destructive migrations without backup/rollback, unindexed foreign keys, or unredacted personal data are hard blockers.
5. Record the verdict in `.frame-ship/<domain>/DATA_REVIEW.md` and route to `execute-spec` or `quality-gate`.

## Verdict Rules

| Verdict | Meaning | Next |
|---|---|---|
| **PASS** | Schemas, zero-downtime migrations, lineage, retention, and PII minimization validated. | → `execute-spec` / `quality-gate` |
| **CONDITIONAL** | Conditions (e.g. backfill script, index addition) must be completed before deploy. | Conditions tracked; no silent promotion. |
| **FAIL** | Irreversible destructive schema changes, PII leaks, missing rollback, or locking operations. | Blocked; return to proposal with findings. |

## What I Won't Do

- Authorize destructive DDL migrations without verified backups and tested rollbacks.
- Permit unminimized personal data or sensitive credentials in database tables.
- Allow schema changes that lock large tables during business hours.

## Red Flags

| Thought | Reality |
|---|---|
| "We can drop the old column immediately" | Application servers running previous versions will throw fatal runtime exceptions. |
| "Personal data in this auxiliary table won't be noticed" | Data minimization is mandatory; unmapped PII breaches privacy compliance. |
| "Migrations don't need automated tests" | Migration failures in production corrupt state and cause prolonged downtimes. |

## References

- `references/data-review.md` — Checklist, findings, and verdict template.
