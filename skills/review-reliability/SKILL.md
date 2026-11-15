---
name: review-reliability
description: Use when stress-testing code for correctness, determinism, graceful failure, race conditions, and idempotency.
---

# Review Reliability — Reliability & Determinism Review

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Evaluate system determinism, state consistency, concurrency safety, edge-case behavior, and idempotent handling. Issue a binding verdict: **PASS / CONDITIONAL / FAIL**. The repository stays untouched—`RELIABILITY_REVIEW.md` is produced in `.frame-ship/quality-gate/<spec-id>/RELIABILITY_REVIEW.md` (or `.frame-ship/<domain>/`) and promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`.

## Chain Contract

- **Previous:** `frame-ship:execute-spec` / `frame-ship:propose-changes`
- **Next:** `frame-ship:quality-gate` / `frame-ship:ship-release`

## Role Binding

Bound to the **engineering quality reviewer (reliability lens)** ensuring that operations behave deterministically, handle errors cleanly without crashing, and prevent data corruption.

## Process

0. **Pre-flight load — HARD STOP** (contract: `../using-frame-ship/references/pre-flight.md`). `skill(review-reliability)` loaded? Applicable standards (`rules/reliability.md`, `rules/engineering-standards.md`, `rules/domain-auditing.md`) loaded? Any NO → STOP.
1. Read the implementation diff or files under review.
2. Evaluate against the reliability checklist in `references/reliability-review.md` (idempotency, null/undefined safety, error boundaries, concurrency locks, state determinism, timeout safety).
3. Produce `.frame-ship/quality-gate/<spec-id>/RELIABILITY_REVIEW.md` via `references/reliability-review.md` (promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`).
4. Issue a verdict + conditions. **Block promotion on FAIL.**
5. Record the verdict in the quality gate report.

## Verdict Rules

| Verdict | Meaning | Next |
|---|---|---|
| **PASS** | Logic is deterministic, concurrency-safe, idempotent, and gracefully handles failure. | → `quality-gate` / next lens |
| **CONDITIONAL** | Conditions (e.g. add mutex, handle edge-case timeout) must be satisfied. | Conditions tracked; no silent promotion. |
| **FAIL** | Race conditions, unhandled rejections, infinite loops, or potential data corruption. | Blocked; return to implementation. |

## What I Won't Do

- Accept unhandled promise rejections or bare catch blocks that swallow errors silently.
- Permit non-idempotent mutation operations on external systems without safeguards.
- Allow unbound resource consumption (unbounded queues, unmetered memory allocations).

## Red Flags

| Thought | Reality |
|---|---|
| "The network won't fail here" | Network calls always fail eventually; missing timeouts and retry boundaries cause hung processes. |
| "This operation only runs once" | Retries, duplicates, and concurrent requests will run it multiple times; idempotency is essential. |
| "A silent catch prevents crashes" | Swallowing exceptions hides bugs and leaves the application in an indeterminate corrupted state. |

## References

- `references/reliability-review.md` — Checklist, findings, and verdict template.
