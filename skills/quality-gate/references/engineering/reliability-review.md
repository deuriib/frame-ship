# Reliability Review: SPEC-XXX

**Reviewer:** review-reliability
**Date:** YYYY-MM-DD
**Verdict:** pass | conditional | fail

## Checklist

- [ ] Error paths handled explicitly
- [ ] No swallowed exceptions
- [ ] Input validation at boundaries
- [ ] Deterministic behavior (no hidden state)
- [ ] Edge cases tested (empty, null, max, boundary)
- [ ] Idempotency where required
- [ ] Timeouts on external calls

## Failure Modes Analyzed

| ID | Failure Mode | Expected Behavior | Handled? |
|----|--------------|-------------------|----------|
| FM-001 | [mode] | [behavior] | yes/no |

## Findings

| ID | Severity | Location | Finding |
|----|----------|----------|---------|
| RL-001 | Med | [file] | [issue] |

## Verdict Rationale

[Why this verdict]
