---
name: review-quality-assurance
description: Use when verifying test coverage, test discipline, regression prevention, test matrix completeness, and empirical test evidence.
---

# Review Quality Assurance — Test Discipline & Quality Assurance Review

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Verify test suites, execution evidence, test matrix coverage, and regression prevention. Ensure tests assert real behavior and can fail when code breaks. Issue a binding verdict: **PASS / CONDITIONAL / FAIL**. The repository stays untouched—`QA_REVIEW.md` is produced in `.frame-ship/quality-gate/<spec-id>/QA_REVIEW.md` (or `.frame-ship/<domain>/`) and promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`.

## Chain Contract

- **Previous:** `frame-ship:execute-spec` / `frame-ship:propose-changes`
- **Next:** `frame-ship:quality-gate` / `frame-ship:ship-release`

## Role Binding

Bound to the **engineering quality reviewer (QA lens)** verifying test honesty, matrix execution, and proof that bugs cannot regress silently.

## Process

0. **Pre-flight load — HARD STOP** (contract: `../using-frame-ship/references/pre-flight.md`). `skill(review-quality-assurance)` loaded? Applicable standards (`rules/testing-discipline.md`, `rules/testing-strategy.md`, `rules/deny-hard-gates.md`) loaded? Any NO → STOP.
1. Read the implementation diff, test files, and test run logs/evidence.
2. Evaluate against the QA checklist in `references/quality-assurance-review.md` (behavior tested in same commit, reproducible assertions, bug reproduction tests, no fabricated greens, no anonymous skips).
3. Produce `.frame-ship/quality-gate/<spec-id>/QA_REVIEW.md` via `references/quality-assurance-review.md` (promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`).
4. Issue a verdict + conditions. **Block promotion on FAIL.** A red or unrun test suite, or skipped tests without named owners, is a hard blocker (rule: `deny-hard-gates`).
5. Record the verdict in the quality gate report.

## Verdict Rules

| Verdict | Meaning | Next |
|---|---|---|
| **PASS** | Tests pass with verifiable output, contract covered, regressions prevented. | → `quality-gate` / `ship-release` |
| **CONDITIONAL** | Missing edge-case test case or flakiness mitigation before merge. | Conditions tracked; no silent promotion. |
| **FAIL** | Tests failing, unrun tests claimed as passing, missing test for new behavior, or count-only assertions. | Blocked; return to implementation. |

## What I Won't Do

- Accept changes to observable behavior without accompanying automated tests (rule: `testing-discipline`).
- Allow anonymous skips (`test.skip` without ticket/owner) or commented-out assertions.
- Fabricate green test runs or accept inconclusive test evidence.

## Red Flags

| Thought | Reality |
|---|---|
| "I'll add the tests in a follow-up ticket" | Behavior without tests is unverified debt; tests ship in the same PR (rule: `testing-discipline`). |
| "Asserting that the array has length > 0 is enough" | Count-only checks prove cardinality, not correct behavior; assert values and state transitions. |
| "The CI is red, but it's probably unrelated" | Merging on red is forbidden; red suites block until resolved. |

## References

- `references/quality-assurance-review.md` — Checklist, findings, and verdict template.
