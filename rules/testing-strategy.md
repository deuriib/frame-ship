---
trigger: model_decision
description: Use when deciding which tests to write, where a test file belongs,
  how much coverage is enough, or how to handle a flaky or slow suite.
---

# Testing Strategy

How the suite is shaped, once the decision to write a test is made. The
obligation to write one is in `testing-discipline`.

## Layer by risk, not by habit

The pyramid is a default, not a law: integration over unit over end-to-end,
because an integration test catches the wiring bug that a unit test mocks away.
Add a layer when a boundary demands it — never to fill a template.

| Layer | Add it when |
| --- | --- |
| Unit | Branching logic, pure functions, edge cases |
| Integration | Two real components meet — database, HTTP client, queue |
| Contract | A published API or a third-party boundary can drift from you |
| End-to-end | A critical user path must work as a whole |
| Regression | A bug you just fixed could come back |
| Acceptance / BDD | A stakeholder-readable statement of done is required |
| Architecture fitness | A structural rule must not decay — import cycles, layering |
| Security / STRIDE | A trust boundary takes attacker-controlled input |
| Performance | A latency or throughput budget is promised |
| Mutation / property | Core logic needs proof that the tests can actually fail |
| Resilience / chaos | A dependency can be slow, partitioned, or absent |
| Smoke / synthetic | Production must prove it is alive |

## Determinism

- **No `sleep`.** Poll for the condition or inject the clock. A fixed sleep is a
  flaky test with a delay bolted on.
- **No shared mutable state between tests.** Each test owns its data and setup;
  order dependence is a hidden global.
- **No network in a unit test.** External calls are stubbed at that layer and
  real (containerized) at the integration layer.
- **Zero flaky tolerance.** Quarantine it, name an owner, and root-cause within
  24 hours. Never rerun until green and never blanket-retry.
- **Fast by default.** The unit suite stays under 30 seconds so it runs on every
  save. A suite slow enough to skip is a suite that is already ignored.

## Coverage

These are floors to clear, never targets to chase.

| Scope | Line | Branch | Function |
| --- | --- | --- | --- |
| Overall | ≥80% | ≥75% | ≥85% |
| Critical path — auth, money, permissions, PII | ≥95% | ≥90% | ≥95% |
| P0 acceptance criteria | 100% automated trace | — | — |

A covered line is not a covered behaviour: an asserted call is not an asserted
outcome. Never add a test to move a number — add it to catch a failure.

## Layout

One predictable home per layer, so a reader knows where to look and a runner
knows what to include.

```text
tests/
├── unit/<name>.test.<ext>
├── integration/<name>.integration.test.<ext>
├── e2e/<flow>.e2e.test.<ext>
├── contract/<boundary>-contract.test.<ext>
├── architecture/fitness.test.<ext>
├── security/<threat>.security.test.<ext>
├── performance/<scenario>.bench.<ext>
├── fixtures/   ← shared data only
└── helpers/    ← shared builders and harnesses only
```

- **Shared helpers live in `tests/fixtures/` and `tests/helpers/` only.** A
  helper that starts next to one test gets copy-pasted into the next.
- **Non-code evidence goes to `docs/evidence/`.** Screenshots, traces, and
  reports are artefacts a human reads, not tests a runner executes.
