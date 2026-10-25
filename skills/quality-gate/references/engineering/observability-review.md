# Observability Review: SPEC-XXX

**Reviewer:** review-observability
**Date:** YYYY-MM-DD
**Verdict:** pass | conditional | fail

## Checklist

- [ ] Structured logging used (JSON/key-value; no raw `console.log` in production)
- [ ] Zero PII, secrets, or tokens in logs, traces, or metrics (GEN-12, PRV-02)
- [ ] Correlation IDs / trace propagation across service boundaries and async handlers
- [ ] Four golden signals captured via metrics (latency, traffic, errors, saturation)
- [ ] Distributed tracing spans created at meaningful boundaries with sufficient attributes
- [ ] Bounded metric cardinality (no unbounded label values causing memory/cost explosion)
- [ ] Error logging includes context, stack traces (where appropriate), and error codes
- [ ] Health check, liveness, and readiness probes instrumented
- [ ] Alerts mapped to runbooks or automated actions (OPS-11)

## Telemetry Verification Matrix

| ID | Signal Type | Component / Path | Description / Emitted Signal | Verified? |
|----|-------------|------------------|------------------------------|-----------|
| OB-001 | [Log/Metric/Trace] | [Module/Endpoint] | [What is recorded/emitted] | yes/no |

## Findings

| ID | Severity | Location | Finding |
|----|----------|----------|---------|
| OB-F001 | Med | [file:line] | [Issue description] |

## Verdict Rationale

- pass = all critical paths instrumented with structured logs, metrics, and traces; zero PII/secrets leakage; correlation IDs intact
- conditional = telemetry present but minor gaps (unstructured debug logs, missing metric units, or missing span attributes)
- fail = unobservable critical paths, missing correlation IDs across boundaries, or PII/secrets detected in telemetry
