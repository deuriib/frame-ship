---
name: review-readability
description: Use when auditing code for clarity, cognitive load, function size, bounded complexity, and long-term maintainability.
---

# Review Readability — Readability & Maintainability Review

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Inspect code structure, cognitive load, naming precision, and complexity bounds. Issue a binding verdict: **PASS / CONDITIONAL / FAIL**. The repository stays untouched—`READABILITY_REVIEW.md` is produced in `.frame-ship/quality-gate/<spec-id>/READABILITY_REVIEW.md` (or `.frame-ship/<domain>/`) and promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`.

## Chain Contract

- **Previous:** `frame-ship:execute-spec` / `frame-ship:propose-changes`
- **Next:** `frame-ship:quality-gate` / `frame-ship:ship-release`

## Role Binding

Bound to the **engineering quality reviewer (readability lens)** ensuring that code is immediately comprehensible to both human engineers and AI agents with minimal cognitive friction.

## Process

0. **Pre-flight load — HARD STOP** (contract: `../using-frame-ship/references/pre-flight.md`). `skill(review-readability)` loaded? Applicable standards (`rules/coding-standards.md`, `rules/minimal-code.md`) loaded? Any NO → STOP.
1. Read the implementation diff or files under review.
2. Evaluate against the readability checklist in `references/readability-review.md` (function length < 40 lines, cyclomatic complexity <= 10, nesting <= 3, early returns, clear naming, no magic values).
3. Produce `.frame-ship/quality-gate/<spec-id>/READABILITY_REVIEW.md` via `references/readability-review.md` (promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`).
4. Issue a verdict + conditions. **Block promotion on FAIL.**
5. Record the verdict in the quality gate report.

## Verdict Rules

| Verdict | Meaning | Next |
|---|---|---|
| **PASS** | Code is clean, modular, self-explanatory, and within complexity limits. | → `quality-gate` / next lens |
| **CONDITIONAL** | Minor readability improvements or naming refactors required before merge. | Conditions tracked; no silent promotion. |
| **FAIL** | Convoluted control flow, excessive nesting, giant functions, or impenetrable logic. | Blocked; return to implementation. |

## What I Won't Do

- Accept functions exceeding 40 lines without demonstrable architectural cohesion justification.
- Permit magic numbers or strings without named constants.
- Allow deep nested conditional branching (>3 levels) where guard clauses apply.

## Red Flags

| Thought | Reality |
|---|---|
| "The logic is complex, so the function has to be 150 lines" | Complex logic split into small, pure functions is easier to test and reason about. |
| "A comment explains what this cryptic regex or math does" | Express intent in readable variable and function names first; comments clarify *why*, not *what*. |
| "Anyone reading this will know what `ctx`, `d`, or `tmp` means" | Ambiguous abbreviations slow down every subsequent reader and invite bugs. |

## References

- `references/readability-review.md` — Checklist, findings, and verdict template.
