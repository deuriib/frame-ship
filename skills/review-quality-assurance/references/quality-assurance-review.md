# Quality Assurance Review: SPEC-XXX

**Review Lens:** Engineering — Quality Assurance (`engineering/qa`)
**Date:** YYYY-MM-DD
**Verdict:** pass | conditional | fail

## Checklist

- [ ] New/altered observable behavior has automated tests in the same PR (rule: `testing-discipline`)
- [ ] Bug fixes include a regression test reproducing the failure before the fix
- [ ] Assertions verify contracts and state transitions, not just counts or types
- [ ] No fabricated test results; suite executed and terminal output captured
- [ ] Skips, if any, carry a named owner, tracking issue, and reason (no anonymous skips)
- [ ] Fixtures use synthetic or anonymized data only (no real personal data, rule: `deny-hard-gates`)
- [ ] Tests run deterministically without flakiness or order-dependence
- [ ] Coverage meets or exceeds project thresholds without artificial padding

## Findings

| ID | Severity | Finding | Mitigation |
|----|----------|---------|------------|
| QA-001 | High | [issue] | [action] |

## Verdict Rationale

[Why this verdict]
