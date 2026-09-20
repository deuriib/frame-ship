# QA Review: SPEC-multi-default-people

**Reviewer:** qa (verification sweep)
**Date:** 2026-09-20
**Verdict:** pass
**Spec:** `docs/specs/20_backlog/SPEC-multi-default-people.md`

## Acceptance Criteria Checklist

- [x] AC-REQ-F-001: `using-frame-ship/SKILL.md §3` contains no `single:` mode branch; contains W-MULTI + W-SEQ verbatim; grep matches = 0
- [x] AC-REQ-F-002: `bootstrap-checklist.md` mode line contains W-MULTI + W-SEQ pointer; grep matches = 0
- [x] AC-REQ-F-003: `frame-intent/SKILL.md §3 paso 3` freezes multi-only without mode question; grep matches = 0
- [x] AC-REQ-F-004: `product-brief.md` Execution_Mode matches W-BRIEF-MODE; grep matches = 0
- [x] AC-REQ-F-005: W-MULTI extraction diff across 4 surfaces = 0
- [x] AC-REQ-F-006: W-SEQ extraction diff in `using-frame-ship §3` and `bootstrap-checklist` = 0
- [x] AC-REQ-F-007: `people-review.md` contains 3 W-PPL-GATE checklist items + evidence rationale
- [x] AC-REQ-NF-001: Zero live `single` mode-branch mentions; narrow-pattern confirmed
- [x] AC-REQ-NF-002: Cross-diff W-MULTI / W-SEQ = 0
- [x] AC-REQ-NF-003: History intact; `50_archive/` and past briefs unedited
- [x] AC-REQ-NF-004: 0 credential / secret / PII patterns in diff; attestation passed
- [x] AC-REQ-NF-005: Diff set matches exactly the 5 approved skill files
- [x] AC-REQ-NF-006: Full traceability 13/13 verified without gaps

## Verdict Rationale

pass — 100% acceptance criteria satisfied (13/13). No defects or regressions found.
