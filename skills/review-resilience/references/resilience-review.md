# Resilience Review: SPEC-XXX

**Review Lens:** Engineering — Resilience (`engineering/resilience`)
**Date:** YYYY-MM-DD
**Verdict:** pass | conditional | fail

## Checklist

- [ ] Retries employ exponential backoff with full jitter (no thundering herds)
- [ ] Circuit breakers wrapped around volatile or slow remote dependencies
- [ ] Fallbacks provide degraded but functional user experience when remote services fail
- [ ] Bulkhead isolation protects critical services from resource starvation
- [ ] Inbound and outbound rate limiting configured to prevent traffic overload
- [ ] Blast radius of failures strictly contained to the calling subsystem
- [ ] Graceful shutdown hooks implemented to drain active requests safely

## Findings

| ID | Severity | Finding | Mitigation |
|----|----------|---------|------------|
| RES-001 | High | [issue] | [action] |

## Verdict Rationale

[Why this verdict]
