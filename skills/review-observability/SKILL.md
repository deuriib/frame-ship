---
name: review-observability
description: Use when verifying telemetry, structured logging, distributed tracing, metrics, audit logs, and alert coverage.
---

# Review Observability — Observability & Telemetry Review

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Verify telemetry instrumentation: structured logs, metric emission, distributed tracing context, correlation IDs, and operational dashboards. Issue a binding verdict: **PASS / CONDITIONAL / FAIL**. The repository stays untouched—`OBSERVABILITY_REVIEW.md` is produced in `.frame-ship/quality-gate/<spec-id>/OBSERVABILITY_REVIEW.md` (or `.frame-ship/<domain>/`) and promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`.

## Chain Contract

- **Previous:** `frame-ship:execute-spec` / `frame-ship:propose-changes`
- **Next:** `frame-ship:quality-gate` / `frame-ship:ship-release`

## Role Binding

Bound to the **engineering quality reviewer (observability lens)** ensuring that any production issue can be diagnosed and resolved quickly without attaching debuggers or guessing.

## Process

0. **Pre-flight load — HARD STOP** (contract: `../using-frame-ship/references/pre-flight.md`). `skill(review-observability)` loaded? Applicable standards (`rules/reliability.md`, `rules/domain-auditing.md`, `rules/deny-hard-gates.md`) loaded? Any NO → STOP.
1. Read the implementation diff or telemetry configurations under review.
2. Evaluate against the observability checklist in `references/observability-review.md` (correlation IDs, structured JSON logs, zero secret/PII emission, error breadcrumbs, key business metrics).
3. Produce `.frame-ship/quality-gate/<spec-id>/OBSERVABILITY_REVIEW.md` via `references/observability-review.md` (promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`).
4. Issue a verdict + conditions. **Block promotion on FAIL.** Secrets or raw personal data in logs/traces are hard blockers (rule: `deny-hard-gates`).
5. Record the verdict in the quality gate report.

## Verdict Rules

| Verdict | Meaning | Next |
|---|---|---|
| **PASS** | Telemetry is structured, actionable, secret-free, and covers critical paths. | → `quality-gate` / next lens |
| **CONDITIONAL** | Missing correlation ID or dashboard metric that must be added before release. | Conditions tracked; no silent promotion. |
| **FAIL** | Raw secrets/PII logged, bare `console.log` statements, or silent failure paths without telemetry. | Blocked; return to implementation. |

## What I Won't Do

- Allow raw credentials, tokens, or PII into logs or traces.
- Accept unstructured plain-text logging or debug prints.
- Permit critical state transitions or financial movements without audit logs.

## Red Flags

| Thought | Reality |
|---|---|
| "`console.log(err)` is enough to debug" | Unstructured logs lack stack traces, correlation IDs, and context, making triage nearly impossible. |
| "Logging the entire payload helps us see everything" | Entire payloads frequently leak passwords, credit cards, or personal data. |
| "We will set up dashboards after we see errors" | Without metrics and alerts from day one, you won't know users are suffering until they complain. |

## References

- `references/observability-review.md` — Checklist, findings, and verdict template.
