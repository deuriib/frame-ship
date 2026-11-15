# Observability Review: SPEC-XXX

**Review Lens:** Engineering — Observability (`engineering/observability`)
**Date:** YYYY-MM-DD
**Verdict:** pass | conditional | fail

## Checklist

- [ ] Structured logging enforced (JSON with timestamp, level, event name, context)
- [ ] No `console.log` or debug statements committed (rule: `coding-standards`)
- [ ] No secrets, tokens, or PII emitted in logs or traces (rule: `deny-hard-gates`)
- [ ] Distributed tracing / correlation ID propagated across service boundaries
- [ ] Key health metrics emitted (request duration, error rate, throughput)
- [ ] Audit logs captured for money-moving or privilege-changing operations (rule: `domain-auditing`)
- [ ] Alerting thresholds and notification channels mapped to new metrics

## Findings

| ID | Severity | Finding | Mitigation |
|----|----------|---------|------------|
| OBS-001 | High | [issue] | [action] |

## Verdict Rationale

[Why this verdict]
