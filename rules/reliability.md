---
trigger: model_decision
description: Use when writing code that calls a network, queue, database, or any
  external service, and when adding logs, metrics, traces, or alerting around
  it.
---

# Reliability

Rules for code that can fail partially. Anything crossing a process boundary is
treated as slow, flaky, and hostile until measured otherwise.

## Resilience

- **Every outbound call has a timeout.** A call with no deadline is an outage
  waiting for the dependency to hang.
- **Retry only idempotent work, with jittered exponential backoff.** Retrying a
  non-idempotent write duplicates the effect.
- **Bound every retry.** A finite attempt count and a total deadline. Unbounded
  retry converts a blip into a self-inflicted outage.
- **Break the circuit.** When a dependency is failing, stop calling it so it can
  recover and so you fail fast instead of queueing.
- **Bound every queue.** No unbounded buffer or in-memory list that grows with
  traffic — it converts overload into a memory exhaustion crash. Apply
  backpressure or shed load explicitly.
- **Make writes idempotent.** Accept an idempotency key or upsert. The network
  will deliver your request twice; design for the second one.
- **Shut down gracefully.** Stop accepting new work, drain in-flight requests,
  then exit. No work is lost on deploy.
- **Immutable by default.** Replace state rather than mutate shared state. It
  removes a whole class of ordering and aliasing bugs.
- **Degrade, don't collapse.** Decide in advance which features shed under load
  and keep the critical path running.

## Observability

- **Structured logs, never string interpolation.** Emit fields an aggregator can
  query. Prose logs are unsearchable under pressure.
- **No `console.log` / print in production paths.** Use the project's logger so
  level and destination are configurable.
- **No PII, secrets, or tokens in logs.** Treat every log line as public and
  permanent.
- **Correlation IDs across boundaries.** One ID per request, propagated through
  every call, so a trace can be reassembled.
- **Metrics on what you promise.** Latency, error rate, saturation per endpoint,
  queue, and dependency.
- **Traces across services.** Instrument the boundaries, not every line.
- **SLOs and alerts on symptoms users feel.** Alert on the SLO, not on CPU.
  Every alert must be actionable and have an owner.
- **Audit log security-relevant actions.** Who did what, when, to which object,
  from where — append-only.

## Recovery

- **Backups are tested, not just taken.** A restore is rehearsed on a schedule;
  an untested backup is a hope.
- **Disaster recovery is documented and rehearsed.** State the RTO and RPO, and
  prove them.
