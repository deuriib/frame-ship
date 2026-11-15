---
name: review-resilience
description: Use when evaluating circuit breakers, backoff retry policies, rate limiters, fallback paths, and blast-radius containment.
---

# Review Resilience — Resilience & Fault Tolerance Review

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Assess how the system behaves under partial degradation, external outages, spikes, and component crashes. Issue a binding verdict: **PASS / CONDITIONAL / FAIL**. The repository stays untouched—`RESILIENCE_REVIEW.md` is produced in `.frame-ship/quality-gate/<spec-id>/RESILIENCE_REVIEW.md` (or `.frame-ship/<domain>/`) and promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`.

## Chain Contract

- **Previous:** `frame-ship:execute-spec` / `frame-ship:propose-changes`
- **Next:** `frame-ship:quality-gate` / `frame-ship:ship-release`

## Role Binding

Bound to the **engineering quality reviewer (resilience lens)** ensuring that failure in any single dependency degrades gracefully rather than bringing down the entire platform.

## Process

0. **Pre-flight load — HARD STOP** (contract: `../using-frame-ship/references/pre-flight.md`). `skill(review-resilience)` loaded? Applicable standards (`rules/reliability.md`, `rules/architecture.md`) loaded? Any NO → STOP.
1. Read the implementation diff or architecture under review.
2. Evaluate against the resilience checklist in `references/resilience-review.md` (circuit breaking, retries with exponential backoff & jitter, bulkhead isolation, rate limiting, graceful fallbacks).
3. Produce `.frame-ship/quality-gate/<spec-id>/RESILIENCE_REVIEW.md` via `references/resilience-review.md` (promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`).
4. Issue a verdict + conditions. **Block promotion on FAIL.**
5. Record the verdict in the quality gate report.

## Verdict Rules

| Verdict | Meaning | Next |
|---|---|---|
| **PASS** | Fault-tolerant, self-healing, blast-radius contained, and degrades gracefully. | → `quality-gate` / next lens |
| **CONDITIONAL** | Missing jitter, fallback, or circuit breaker on non-critical path. | Conditions tracked; no silent promotion. |
| **FAIL** | Cascading failure risk, retry storms, uncontained blast radius, or infinite retry loops. | Blocked; return to implementation. |

## What I Won't Do

- Authorize unbounded retries or retry storms that overwhelm struggling downstream services.
- Permit tight coupling where a third-party outage immediately causes 500s across unrelated endpoints.
- Allow uncapped resource pools that can exhaust memory or database connections.

## Red Flags

| Thought | Reality |
|---|---|
| "If the payment gateway is slow, we will just keep waiting" | Exhausts connection pools and causes thread starvation across the entire backend. |
| "Retry immediately 10 times" | Creates a thundering herd / retry storm that guarantees the downstream service stays down. |
| "A fallback is unnecessary because the vendor has a 99.9% SLA" | Three nines allows nearly 9 hours of downtime a year; plan the fallback upfront. |

## References

- `references/resilience-review.md` — Checklist, findings, and verdict template.
