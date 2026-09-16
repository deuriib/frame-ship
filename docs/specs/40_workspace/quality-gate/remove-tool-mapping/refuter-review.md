# Refuter Review: SPEC-remove-tool-mapping-engineering

**Reviewer:** review-refuter (adversarial)
**Date:** 2026-09-16
**Verdict:** pass ("could not falsify")

## Mission

Attempt to **falsify** the implementation. Success = finding a counterexample.

## Attack Vectors Tried

| ID | Hypothesis | Attempt | Result |
|----|-----------|---------|--------|
| RF-001 | A live `tool-mapping` pointer survives in skills/ | Grep `tool-mapping` scoped to `skills/` | Confirmed (0 hits) |
| RF-002 | A live pointer survives in `.opencode/` or any `AGENTS.md` | Scoped greps on `.opencode/` + `AGENTS.md` include | Confirmed (0 hits) |
| RF-003 | `SKILL.md §5` no longer matches disk | Glob `skills/using-frame-ship/references/*` vs §5 bullets | Confirmed (1 file = 1 bullet) |
| RF-004 | User amendment broke the load-order contract | Read §3.0 MANDATORY LOAD ORDER + §5 checklist pointer | Confirmed intact — rule preserved, only duplication removed |
| RF-005 | `README.md` staleness falsifies "zero dangling" | Read `README.md:97,236` | Not falsified within scope — prose mentions, non-load-bearing; claim scoped to `skills/ + .opencode/ + AGENTS.md` per brief |

## Counterexamples Found

| ID | Counterexample | Impact | Reproduction |
|----|---------------|--------|--------------|
| — | None within scope | — | — |

## Verdict Rationale

- pass = attempted falsification, no counterexamples found
- Five attacks, zero counterexamples. The one out-of-scope observation (README prose) is recorded as follow-up, not a falsification. Pass.
