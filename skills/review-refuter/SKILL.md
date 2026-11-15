---
name: review-refuter
description: Use when adversarially challenging assumptions, finding unhandled boundary cases, red-teaming design logic, or refuting claims.
---

# Review Refuter — Adversarial Refutation & Edge-Case Review

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Act as the constructive devil's advocate. Adversarially stress-test architectural hypotheses, find hidden assumptions, challenge optimistic assertions, and uncover unhandled boundary failures. Issue a binding verdict: **PASS / CONDITIONAL / FAIL**. The repository stays untouched—`REFUTER_REVIEW.md` is produced in `.frame-ship/quality-gate/<spec-id>/REFUTER_REVIEW.md` (or `.frame-ship/<domain>/`) and promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`.

## Chain Contract

- **Previous:** `frame-ship:propose-changes` / `frame-ship:execute-spec`
- **Next:** `frame-ship:quality-gate` / `frame-ship:ship-release`

## Role Binding

Bound to the **engineering quality reviewer (refuter lens)** dedicated to rigorous adversarial thinking, disproving claims that lack concrete proof, and hunting fragile edge cases.

## Process

0. **Pre-flight load — HARD STOP** (contract: `../using-frame-ship/references/pre-flight.md`). `skill(review-refuter)` loaded? Applicable standards (`rules/foundation-conduct.md`, `rules/minimal-code.md`) loaded? Any NO → STOP.
1. Read the proposal, architecture, or code under review.
2. Formulate counter-hypotheses and extreme edge cases using `references/refuter-review.md` (e.g. empty inputs, astronomical loads, Byzantine clocks, partial network partitions, adversarial user manipulation).
3. Produce `.frame-ship/quality-gate/<spec-id>/REFUTER_REVIEW.md` via `references/refuter-review.md` (promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`).
4. Issue a verdict + conditions. **Block promotion on FAIL.** A finding without proof is refuted; an assertion without proof is treated as an assumption.
5. Record the verdict in the quality gate report.

## Verdict Rules

| Verdict | Meaning | Next |
|---|---|---|
| **PASS** | Design withstands adversarial scrutiny; all critical edge cases defended. | → `quality-gate` / next lens |
| **CONDITIONAL** | Specific boundary defenses or failure modes must be explicitly handled. | Conditions tracked; no silent promotion. |
| **FAIL** | Fundamental premise refuted, fatal unhandled edge case, or fragile assumption proven invalid. | Blocked; return to design/implementation. |

## What I Won't Do

- Accept claims without empirical evidence or verifiable tests.
- Allow optimistic "happy path only" assumptions to proceed to production.
- Conflate wishful thinking with architectural safety.

## Red Flags

| Thought | Reality |
|---|---|
| "Users won't click that twice in rapid succession" | Users double-click everything; bots click thousands of times per second. |
| "The downstream service is internal, so it is 100% reliable" | Internal services suffer network hiccups, deployments, and cascading restarts. |
| "This edge case is statistically impossible" | At scale, one-in-a-million edge cases happen multiple times a week. |

## References

- `references/refuter-review.md` — Checklist, findings, and verdict template.
