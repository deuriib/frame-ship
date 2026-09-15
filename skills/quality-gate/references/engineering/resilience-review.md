# Resilience Review: SPEC-XXX

**Reviewer:** review-resilience
**Date:** YYYY-MM-DD
**Verdict:** pass | conditional | fail

## Checklist

- [ ] Graceful degradation under partial failure
- [ ] Circuit breakers / retries with backoff
- [ ] Resource limits (memory, CPU, connections)
- [ ] Recovery from crash / restart
- [ ] No single point of failure introduced
- [ ] Observability (logs, metrics, traces)
- [ ] Chaos scenarios tested

## Stress Scenarios

| ID | Scenario | Expected | Observed | Pass? |
|----|----------|----------|----------|-------|
| RS-001 | [scenario] | [expected] | [observed] | yes/no |

## Verdict Rationale

[Why this verdict]
