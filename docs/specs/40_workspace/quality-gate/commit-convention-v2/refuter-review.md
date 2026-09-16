# Refuter Review: SPEC-commit-convention-v2

**Reviewer:** review-refuter (adversarial)
**Date:** 2026-09-16
**Verdict:** pass ("could not falsify")

## Mission

Attempt to **falsify** the implementation. Success = finding a counterexample.

## Attack Vectors Tried

| ID | Hypothesis | Attempt | Result |
|----|-----------|---------|--------|
| RF-001 | The `<stage>/<work-unit>` scope syntax breaks existing commit history | Checked git log — existing commits use flat scopes (`docs(brief-auth)`, `feat(plugin-001)`); new syntax is forward-looking guidance only, no history rewrite | Confirmed (no break) |
| RF-002 | Splitting rules contradict the "1 per stage" defaults in stage SKILL.md files | Stage SKILL.md examples still show flat scopes, but they cite commit-convention.md as source of truth; the convention file now overrides with work-unit syntax | Confirmed (no contradiction — reference file is authoritative) |
| RF-003 | Batching rules allow batching different REQ-IDs | §Batching "Never batch: Different REQ-IDs" explicitly forbids it; §execute-spec per-task rule repeats it | Confirmed (no loophole) |
| RF-004 | "Guidance only" status lost | §Format line 11 preserves "missing/bad commit format never fails quality-gate or blocks verify-handoff" | Confirmed (preserved) |

## Counterexamples Found

| ID | Counterexample | Impact | Reproduction |
|----|---------------|--------|--------------|
| — | None | — | — |

## Verdict Rationale

- pass = attempted falsification, no counterexamples found. The new syntax is consistent, the splitting rules are unambiguous, and the guidance-only status is preserved.