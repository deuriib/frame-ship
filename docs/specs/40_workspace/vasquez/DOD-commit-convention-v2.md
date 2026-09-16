# Definition of Done: SPEC-commit-convention-v2

**Verifier:** vasquez (CTO)
**Date:** 2026-09-16
**Domains-Touched:** [engineering]

## Common (all 8 domains)

- [x] All acceptance criteria met (6/6 AC covered by evidence matrix)
- [x] All REQ-IDs have linked evidence (6/6 REQ-IDs in TEST_MATRIX-commit-convention-v2.md)
- [x] Edge cases / failure modes handled (splitting vs. batching rules cover ambiguity)
- [x] Gate OPEN (GATE_REPORT.md — all 4 reviewers pass)
- [x] Load evidence: `skill(verify-handoff)` + `agents/c-level/vasquez.md` cited, execution_mode `single`, packet intact
- [x] Docs/changelog updated for user-facing impact (commit-convention.md is the doc)

## Engineering (vasquez — only if engineering-touched)

- [x] Lint passes with zero warnings (N/A — documentation only)
- [x] Type checks pass (N/A — documentation only)
- [x] Test coverage meets threshold (N/A — documentation only)
- [x] No TODO/FIXME left in code (N/A — no code)

## Security (barrera — only if security-touched)

N/A — no security impact.

## Domain appendix (only touched domains)

- [x] Engineering: documentation-only change, no code

## Documentation

- [x] API docs updated (N/A — no API)
- [x] Changelog entry added (N/A — internal process doc, no user-facing change)
- [x] ADR written if architecture contract changed (N/A — no contract change)