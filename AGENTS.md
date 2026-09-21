# frame-ship — persistent rules

## Chain (do not skip)

```text
frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release
```

## Load order (HARD STOP)

1. `using-frame-ship` is ALREADY loaded in context (bootstrap via `context-inject` hook). NEVER re-read or re-load `using-frame-ship` via the skill tool.
2. Load the `<stage>` skill via the skill tool ONCE at the start of that stage before performing work for that stage. NEVER re-load skills on every individual edit or command. No skill = STOP.
3. Then act. Pre-flight: stage skill loaded? `SPEC/HARD/GATE/DOMAINS`? Any NO → STOP, load stage skill first. FAIL → retry N=2 differently → escalate to orchestrator. No third loop, no sideways.

## Trigger → skill

- start / what-skills → `using-frame-ship`
- initiative / OKRs → `frame-intent` (BRIEF + OKRs)
- brief approved → `translate-to-spec` (REQ + ARCHITECTURE + CONTRACTS)
- ready to implement → `propose-changes` (PROPOSED_CHANGES, repo untouched)
- auth / data / external API → `review-security` (STRIDE)
- public API / data model / cross-cutting → `review-architecture` (ADR)
- approved spec → `execute-spec` (approved files, REQ → test)
- implementation ready → `quality-gate` (CLOSED on fail)
- work complete → `verify-handoff` (HANDOFF, DoD)
- verified → `ship-release` (NOTES + changelog + rollback)

## Hard rules

1. No code without an approved proposal.
2. Security review for auth/data/API.
3. ADR for contract changes.
4. No handoff on CLOSED gate without waiver.
5. `REQ-ID → test → artifact → gate verdict` trace, always.
6. `HANDOFF.md` before ship.
7. Reference-only packets between stages — never paste full context.

## Execution mode

Execution is subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.

## Subagents

- Always use subagents as much as possible proactively, this is no negotiable, based on session context and metions about it, like multi-subagents mode.

## Guardrails for Software Development and Beyond (BEFORE dispatch, AFTER verify; full text: AGENTS.md)

These guardrails are non‑negotiable. Violations block progress, trigger escalation, and require remediation with evidence. They apply across all domains below.

Software Development Core
Work‑unit commits: Atomic, single‑purpose commits. Each commit references a ticket/issue. No mixing refactors with features. Commit messages: type(scope): subject (Conventional Commits).

Branching: Short‑lived feature branches. Rebase before merge. No direct pushes to main.

Code review: Every change requires at least one peer review. Reviewers check for security, privacy, performance, and tests. No self‑merge.

CI/CD: All builds pass automated checks (lint, test, security scan, license scan). Fail on Critical/High findings. No manual overrides without written approval.

Dependencies: Pin versions. Scan for CVEs daily. No unmaintained libraries. License compatibility verified.

Secrets: Never in code, config, logs, examples, events, or commits. Use a vault or environment variables. Rotate regularly. Scan commits pre‑push.

Security
Deny by default: All access is denied unless explicitly allowed. Fail closed.

No secrets/credentials/sessions in code, config, logs, examples, events, or prompts. Finding without proof (diff/scan/log) = REFUTED.

OWASP Top 10 screen: Injection, broken authN/Z, data exposure, insecure deps, missing access control. Every new endpoint, adapter, boundary, or payload is a trust boundary—validate input, encode output.

Least privilege: Per interface, key, role, automation. Short‑lived credentials. MFA for human access.

Secure defaults: TLS everywhere. Strong cipher suites. HSTS. CSP. No debug in prod.

No freelance fixes: Report severity + location + owner. Owner remediates. No unsolicited changes.

SAST/DAST/SCA in CI. Pen test annually or on major changes.

Privacy (Ley 172‑13)
Minimization: Collect only what is necessary. Purpose limitation.

PII checkpoints: Every port, adapter, event, log, prompt, export. Mask/tokenize. Allowlists only.

Every PII store declares purpose, TTL, deletion procedure. Automated enforcement.

PASS exports carry allowlisted evidence only. No raw PII.

Data subject rights: Access, rectification, erasure, objection. Respond within legal timeframe.

Cross‑border transfers: Only to approved jurisdictions with adequate protection.

DPIA for high‑risk processing. Privacy by design and default.

Breach notification: Within 72 hours to authorities and affected parties.

Severity
Critical: Exploitable, production impact, data loss. Fix immediately. Block release.

High: Probable exploit or major impact. Fix before next release.

Medium: Conditional impact. Schedule within sprint.

Low: Hygiene. Backlog.

Critical/High surface same session with severity + evidence + owner. Residual risk explicit. No silent PASS.

Accepted risks documented with owner, justification, expiry.

Conduct
No sugarcoating. State facts. One point per paragraph. Respect attention.

No busywork theater. Every action must have clear value.

Assumptions on irreversible calls stated explicitly before action.

FAIL → retry N=2 differently → escalate. No third loop, no sideways.

Blameless post‑mortems. Own mistakes. Ask for help early. No heroics.

Document decisions. ADRs for architecture. Comments for complex logic.

Respect deadlines. No scope creep. Flag risks early.

Architecture
ADRs for every significant decision. Context, options, decision, consequences.

Modular, loosely coupled, highly cohesive. Clear boundaries.

Design for failure: Circuit breakers, retries with backoff, timeouts, bulkheads.

No single points of failure. Redundancy where needed.

API versioning. Contract‑first. OpenAPI/AsyncAPI specs.

Scalability, maintainability, observability considered from day one.

Testing
Test pyramid: Unit > Integration > E2E. Fast, isolated, deterministic.

Coverage: Minimum 80% for critical paths. Mutation testing for core logic.

No flaky tests. Quarantine and fix within 24h.

Security tests: SAST, DAST, dependency scan, secret scan. Pen test annually.

Performance tests: Load, stress, soak before major releases.

Accessibility tests: Automated + manual (WCAG 2.1 AA).

Test data: No PII. Synthetic or anonymized only.

Documentation
README: Setup, usage, architecture, contribution.

API docs: OpenAPI/Swagger, up‑to‑date.

Runbooks: For operations, incidents, rollbacks.

Changelog: Keep a Changelog format.

Inline comments: For why, not what. Complex logic explained.

Diagrams: C4 model or similar. Updated with architecture changes.

Performance
SLOs/SLIs defined for all user‑facing services.

Load testing before release. Baseline and track regressions.

Optimize critical paths. Caching, indexing, query optimization.

Monitor latency, throughput, error rates. Alert on SLO breach.

Reliability
Error budgets. Balance innovation and stability.

Chaos engineering in staging. Graceful degradation.

Backups tested regularly. Disaster recovery plan documented and rehearsed.

Monitoring/alerting for all services. On‑call rotation.

Incident management: Severity levels, communication plan, post‑mortems.

Accessibility
WCAG 2.1 AA compliance. Keyboard navigable. Screen reader compatible.

Color contrast ≥ 4.5:1. Alt text for images. ARIA labels where needed.

No accessibility regressions. Automated checks in CI.

Internationalization
Externalize all strings. No hardcoded user‑facing text.

Support RTL layouts. Locale‑aware formatting (dates, numbers, currency).

Unicode support. Timezone handling in UTC, display in local.

Translation workflow with version control.

Data Management
Data lifecycle: Ingestion, storage, processing, archival, deletion.

Data quality checks at ingestion. Lineage tracked.

Backup and recovery for all data stores. Test restores.

Data governance: Ownership, classification, retention policies.

AI/ML
Ethical AI: Fairness, bias mitigation, transparency.

Explainability for critical decisions. Human‑in‑the‑loop where needed.

Model versioning. Reproducible training. Data privacy in training.

Monitoring for drift. Retraining triggers. Fallback to safe default.

No PII in prompts unless explicitly approved and masked.

Incident Response
Severity levels defined. On‑call rotation. Escalation paths.

Runbooks for common incidents. Communication templates.

Post‑mortems blameless, action items tracked.

Breach notification per legal requirements.

General
Automate everything possible. Manual steps are error‑prone.

Infrastructure as Code. Versioned, reviewed, tested.

Environment parity. Dev, staging, prod as similar as possible.

Feature flags for safe rollouts. Kill switches.

Observability: Logs, metrics, traces. Correlated IDs.

Cost awareness. Monitor cloud spend. Optimize regularly.

Type Safety
No ANY: TypeScript strict mode, noImplicitAny, ban any (@typescript-eslint/no-explicit-any: error). Use unknown + narrowing, generics, discriminated unions.

Python: mypy/pyright strict, ban Any, no untyped defs. Use Protocol, TypedDict, Literal, TypeVar.

Java/C#: no raw types, no dynamic unless interop. Enable nullable reference types.

Go/Rust: no interface{} unless necessary; no unwrap()/expect() in production.

No unsafe casts: no as without proof, no non-null assertion unless proven, no ts-ignore without ticket.

Correct typing everywhere: annotations, generics, variance, exhaustive switches, readonly/immutable by default.

Code Structure
Pure functions where possible. Side effects isolated.

Dependency injection. No global mutable state. No singletons unless justified.

No circular dependencies. No dead code. No commented-out code. No TODOs without ticket.

Single responsibility. Small functions. Limit cyclomatic complexity. Early returns over deep nesting.

Composition over inheritance. Prefer interfaces/contracts.

No premature optimization. Benchmark before optimizing.

No magic numbers/strings. Use enums, union types, constants.

Clear naming. No abbreviations unless universal.

No stringly typed code. Use strong types.

Error Handling
No empty catch. No catch-all. Wrap with context. Use Result/Either where appropriate.

Validate at boundaries. Trust nothing from outside.

Fail fast, fail closed. No silent failures.

No exceptions for control flow.

Resource cleanup: using, try-with-resources, defer. No leaks.

Concurrency
Immutability first. Message passing over shared memory.

Avoid locks if possible. If used, document ordering.

No unbounded queues. Backpressure.

Idempotency for retries.

Timeouts everywhere. Retries with jitter. Circuit breakers.

Graceful shutdown. Health checks.

Security & Privacy in Code
Parameterized queries only. No string concatenation for SQL.

Encode output. No XSS. CSRF tokens. SSRF allowlists. No path traversal.

No deserialization of untrusted data. No eval. No shell injection.

Secure random. Hash passwords with argon2/bcrypt. No custom crypto.

TLS verify. Certificate pinning where needed.

No secrets in code/config/logs/examples/events. Scan, rotate, vault.

No PII in logs/prompts/exports. Mask/tokenize. Allowlists only.

Least privilege per interface/key/role/automation.

Testing & Quality
Unit > Integration > E2E. Fast, isolated, deterministic.

No flaky tests. No sleep. Quarantine and fix within 24h.

Coverage ≥80% for critical paths. Mutation testing for core logic.

Security tests: SAST, DAST, SCA, secret scan in CI.

No PII in test data. Synthetic or anonymized only.

Accessibility tests: WCAG 2.1 AA. Automated + manual.

Observability
Structured logging. No console.log in prod. No PII.

Metrics, traces, correlated IDs.

SLOs/SLIs. Alerts on SLO breach.

Audit logs for sensitive actions.

Dependencies & Supply Chain
Pin versions. Minimal dependencies. Scan daily for CVEs.

License compatibility. SBOM. Reproducible builds.

Signed commits. Signed artifacts. Provenance.

No unmaintained libraries.

Version lockstep: [frame-ship v0.7.0] — bump with `plugins/opencode/frame-ship.ts` + `plugins/antigravity/hooks/context-inject.ts`.
