# Test Strategy & Execution Template: SPEC-XXX

**Specialist / Owner:** [specialist name or role]  
**Date:** YYYY-MM-DD  
**Spec ID:** SPEC-XXX  
**Domains-Touched:** [e.g. engineering, security, data]  
**Target Version:** vX.Y.Z  

---

## 1. Directory & Path Standards

Test files must follow standard naming and directory layout conventions according to their scope and runtime level:

```
tests/
├── unit/                      # Fast, isolated tests without external I/O or network
│   ├── <module>/
│   │   └── <feature>.test.ts  # Collocated *.test.ts or *.spec.ts also permitted
├── integration/               # Multi-component interaction (DB, HTTP, message queues, adapters)
│   ├── api/
│   ├── persistence/
│   └── adapters/
├── e2e/                       # Full workflow / browser / CLI system journeys
│   └── <user-flow>.e2e.test.ts
├── contract/                  # API schema, serialization, cross-boundary contracts
│   └── <boundary>-contract.test.ts
├── architecture/              # Fitness functions, dependency hygiene, layer boundaries
│   └── fitness.test.ts
├── security/                  # STRIDE regression, auth boundaries, input sanitization, SAST
│   └── <vulnerability-or-threat>.security.test.ts
├── performance/               # Benchmarks, latency budgets, load & throughput
│   └── <scenario>.bench.ts
├── fixtures/                  # Static test data, deterministic payloads, sample envelopes
└── helpers/                   # Shared test harnesses, mock factories, memory adapters
```

### Path Conventions
- **Unit tests:** `tests/unit/<domain>/<name>.test.ts` (or collocated adjacent to implementation: `src/<domain>/<name>.test.ts`).
- **Integration tests:** `tests/integration/<domain>/<name>.integration.test.ts`.
- **E2E tests:** `tests/e2e/<flow-name>.e2e.test.ts`.
- **Non-code domain evidence:** `docs/specs/40_workspace/<domain>/evidence/` (e.g. `E-001-legal-redline.pdf`, `E-002-finance-recon.xlsx`).

---

## 2. Coverage Targets & Quality Floors

| Scope / Metric | Standard Baseline | Critical Paths (Auth, Data, Finance, PII) | Non-Code Domains |
|---|---|---|---|
| **Line Coverage** | ≥ 80% | ≥ 95% | N/A (with written justification) |
| **Branch Coverage** | ≥ 75% | ≥ 90% | N/A (with written justification) |
| **Function Coverage** | ≥ 85% | ≥ 95% | N/A (with written justification) |
| **P0 Acceptance Criteria** | 100% automated test trace | 100% automated test trace | 100% attestation/evidence trace |
| **Flaky Tests** | 0 tolerance (quarantine & root-cause) | 0 tolerance | N/A |
| **Execution Speed** | Unit suite < 30s | Unit suite < 30s | N/A |

> **Rule:** High coverage with weak assertions is prohibited. Assertions must verify boundary invariants, state transitions, and expected side-effects, not merely invocation counts.

---

## 3. Catalog of Testing Types

### 3.1 Unit Testing
- **Focus:** Single functions, pure business logic, domain entities, value objects.
- **Dependencies:** In-memory mocks, fakes, or stubs. No real disk I/O, network, or external processes.
- **Speed:** Milliseconds per test.

### 3.2 Integration Testing
- **Focus:** Interactions between two or more architectural units (e.g., repository + database, client + external API adapter, middleware pipeline).
- **Dependencies:** Ephemeral containers, local test databases, or local loopback servers.
- **Speed:** Seconds per test suite.

### 3.3 End-to-End (E2E) Testing
- **Focus:** Complete end-to-end user journeys from public boundary to database and back.
- **Dependencies:** Fully assembled application runtime or dedicated staging environment.
- **Speed:** Tens of seconds to minutes.

### 3.4 Acceptance & Behavioral Testing (BDD)
- **Focus:** Verification of user stories and business acceptance criteria using Given-When-Then phrasing.
- **Dependencies:** Directly maps to `REQ-XXX` acceptance criteria.

### 3.5 Regression Testing
- **Focus:** Verification that existing functionality, fixed defects, and previous features continue to operate without regression.
- **Dependencies:** Automated suite executed on every commit and PR.

### 3.6 Contract & Schema Testing
- **Focus:** Data transfer objects (DTOs), API schemas, protobuf/JSON schemas, and client-server wire compatibility.
- **Dependencies:** Consumer-driven contract harnesses, schema validators.

### 3.7 Security & STRIDE Verification Testing
- **Focus:** Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege.
- **Dependencies:** Fuzzers, authentication bypass suites, token expiration checks, PII leakage scanners.

### 3.8 Architectural & Fitness Testing
- **Focus:** Enforcing architectural rules (e.g. domain layer must never import infrastructure layer, no circular imports, bundle size budgets).
- **Dependencies:** AST parsers, linter rules, dependency-cruiser, arch-unit equivalents.

### 3.9 Performance, Benchmark & Load Testing
- **Focus:** Latency percentiles (p50, p95, p99), memory usage, CPU consumption under concurrency, leak detection.
- **Dependencies:** Benchmark harnesses, simulated traffic generators.

### 3.10 Refuter, Adversarial & Mutation Testing
- **Focus:** Deliberately attempting to break implementation assumptions with malformed payloads, out-of-order calls, boundary conditions, and test mutation analysis.
- **Dependencies:** Mutation testing engines, property-based testing generators (e.g. fast-check).

### 3.11 Resilience & Chaos Testing
- **Focus:** Fault tolerance, circuit breaker behavior, graceful degradation, recovery after panic, network partition handling.
- **Dependencies:** Injected network faults, killed sub-processes, simulated downstream timeouts.

### 3.12 Smoke & Synthetic Health Testing
- **Focus:** Post-deployment verification that core endpoints and critical runtimes respond correctly in staging or production.
- **Dependencies:** Live deployment environment, non-destructive synthetic probes.

### 3.13 Non-Code Domain Evidence & Attestations
- **Focus:** Verification for business domains (finance, legal, marketing, people, ops, revenue).
- **Dependencies:** Documented redlines, signed reconciliation reports, campaign approvals, regulatory filings.

---

## 4. Frame→Ship Methodology Fit: Stage-by-Stage Lifecycle

Testing in Frame→Ship is not an afterthought relegated to QA; it is distributed systematically across every stage of the chain:

```
frame-intent ────────► translate-to-spec ──────► propose-changes
 (Objectives/KPIs)     (REQ-IDs & Acceptance)     (Test Plan & Blast Radius)
                                                             │
quality-gate ◄───────── execute-spec ◄─────────── review-security/arch
 (Multi-Lens QA,         (TDD, Impl, Unit/Integ,    (STRIDE vectors,
  Refuter, Gate Report)   Test Matrix)               Fitness Invariants)
       │
verify-handoff ───────► ship-release
 (DoD Verification,     (Smoke/Canary Probes,
  Passing Evidence)      Rollback Verification)
```

| Chain Stage | Primary Testing Activity | Responsible Role | Input Packet | Output Artifact / Test Evidence | Gate / Pass Criteria |
|---|---|---|---|---|---|
| **1. frame-intent** | Define measurable business outcomes and quantifiable key results. | Orchestrator + Business Domain Owners | Strategic Direction | `BRIEF-<slug>.md` + `OKR-<slug>.md` | Measurable KPIs with unambiguous verification baselines. |
| **2. translate-to-spec** | Define testable requirements (`REQ-XXX`) with formal Given-When-Then acceptance criteria. | Domain Owner + Engineering Owner | Approved Brief | `docs/specs/15_requirements/REQ-*.md`, `ARCHITECTURE.md` | Every requirement has unambiguous, falsifiable criteria. |
| **3. propose-changes** | Formulate technical test plan, assess test blast radius, declare new test files. | Specialist | Approved Spec | `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` | Test strategy pre-approved before any code modification. |
| **4. review-security** | Review STRIDE threat model, specify security test vectors (auth, PII, injection). | Security Owner | Proposal | `THREAT_MODEL.md` + Security Review Verdict | No open High/Critical security vulnerabilities. |
| **5. review-architecture** | Validate architectural fitness, boundary rules, and public interface contracts. | Engineering Owner | Proposal | `ADR-*.md` in `docs/specs/12_adr/` | Architectural invariants and backwards compatibility upheld. |
| **6. execute-spec** | Implement code against tests (Unit, Integration, E2E). Populate traceable test matrix. | Domain Specialist | Approved Proposal + Approvals | `TEST_MATRIX.md`, committed tests, passing test suites | 100% P0 REQ-ID trace; all tests pass; coverage floors met. |
| **7. quality-gate** | Multi-lens independent verification: QA suite run, Refuter edge-case attack, Resilience audit. | QA Reviewer + Refuter Reviewer + Domain Reviewers | `SPEC/HARD/GATE/DOMAINS` packet | `qa-review.md`, `refuter-review.md`, `GATE_REPORT.md` | All gate reviews PASS; zero unhandled findings; gate OPEN. |
| **8. verify-handoff** | Verify Definition of Done (DoD), CI pass logs, test matrix completeness before release. | Owning Domain Owner + Orchestrator | `GATE_REPORT.md` (OPEN) | `docs/specs/30_delivery/HANDOFF.md` | DoD 100% verified; zero failing tests; zero undocumented waivers. |
| **9. ship-release** | Smoke testing, synthetic probes, canary validation, post-deploy rollback drill. | Release Manager / DevOps / Ops | Verified `HANDOFF.md` | `RELEASE_NOTES.md` + archived spec | Live deployment passes smoke checks; rollback dry-run proven. |

### Supporting Skills Fit
- **`debugging`**: Triggered upon test failure or defect. Follows 4-phase RCA to write a failing reproduction test *before* proposing any code fix.
- **`pull-request`**: Validates CI test automation, runs linting/typechecks, and enforces test-to-code review budget ratio.
- **`git-worktree`**: Executes isolated parallel test suites in segregated workspace trees without cross-lane pollution.

---

## 5. Test Implementation Plan Template

Use this section to plan tests for a spec during `execute-spec`:

### 5.1 Requirement to Test Mapping
| REQ-ID | Test ID | Scope / Path | Test Type | Expected Behavior / Boundary Checked |
|---|---|---|---|---|
| REQ-001 | T-001 | `tests/unit/auth/token.test.ts` | Unit | Returns valid JWT when credentials match; throws 401 on invalid secret |
| REQ-001 | T-002 | `tests/security/auth-expiry.test.ts` | Security | Rejects expired token after TTL; denies refresh after revocation |
| REQ-002 | T-003 | `tests/integration/db/user-repo.test.ts` | Integration | Persists user record and rolls back transaction on duplicate email |
| REQ-003 | E-001 | `docs/specs/40_workspace/legal/evidence/` | Attestation | Legal counsel written sign-off on updated terms of service |

### 5.2 Test Environment & Setup Requirements
- **Prerequisites:** [e.g. Node 22, local Postgres container on port 5433, mock HTTP server]
- **Environment Variables:** [e.g. `TEST_MODE=true`, `JWT_SECRET=test-secret-1234`]
- **Cleanup & Isolation:** [e.g. Truncate test tables in `afterEach`, isolate mock timers]

---

## 6. Execution & Verification Checklist

- [ ] All test files located under canonical directories (`tests/unit`, `tests/integration`, etc.).
- [ ] Every requirement ID (`REQ-XXX`) has at least one corresponding Test ID (`T-XXX`) or Evidence ID (`E-XXX`).
- [ ] Code tests executed with real assertions (no empty mocks or skipped tests).
- [ ] Test coverage meets or exceeds baseline thresholds (Line ≥80%, Branch ≥75%, Critical ≥95%).
- [ ] Negative test cases included (invalid inputs, network timeouts, unauthorized access).
- [ ] Edge cases tested (empty arrays, boundary numbers, null/undefined inputs).
- [ ] Tests run deterministically with zero flakiness (isolated state, no shared mutable singletons).
- [ ] Test matrix recorded in `TEST_MATRIX.md` with commit SHAs linked to each task.
