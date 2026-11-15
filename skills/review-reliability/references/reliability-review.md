# Reliability Review: SPEC-XXX

**Review Lens:** Engineering — Reliability (`engineering/reliability`)
**Date:** YYYY-MM-DD
**Verdict:** pass | conditional | fail

## Checklist

- [ ] All external I/O (network, DB, filesystem) guarded by bounded timeouts
- [ ] Mutation endpoints and webhooks are idempotent (deduplication keys, unique constraints)
- [ ] Concurrency edge cases and race conditions handled (optimistic locking, atomicity)
- [ ] Error handling is explicit: no empty `catch` blocks or swallowed errors
- [ ] Graceful degradation on dependency failure (no unhandled process crashes)
- [ ] Memory leaks and unclosed handles/streams avoided
- [ ] Timestamps persisted and transported in UTC (rule: `coding-standards`)
- [ ] State mutations survive partial process restarts without data corruption

## Findings

| ID | Severity | Finding | Mitigation |
|----|----------|---------|------------|
| REL-001 | High | [issue] | [action] |

## Verdict Rationale

[Why this verdict]
