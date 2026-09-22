/**
 * frame-ship: guardrails plugin (id "frame-ship-guardrails") — Frame→Ship
 * guardrails lane (zero deps, V2-only). Source of truth: ./rules/guardrails.md
 * (canonical truth: AGENTS.md), read at runtime so the full text never drifts
 * into a hardcoded copy. Version lockstep lives in ./shared.ts (header + const
 * VERSION). Injects the full guardrails on session context (fallback: minimal)
 * and the minimal one-liner-per-domain set on compaction, so the guardrails
 * survive context compression behind a versioned marker.
 * Location: plugins/opencode/guardrails.ts. Load it directly, or load
 * ./frame-ship.ts (composed entry: skills + agents + guardrails under one id).
 * Creed: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."
 */

import { Plugin } from "@opencode/plugin";
import { VERSION, readTextFile, resolveRepoDir } from "./shared";

// Lane-scoped marker: distinct from the skills lane marker
// (`[frame-ship v…]`) so each lane's hasMarker idempotency guard only sees
// its own injections — neither string contains the other.
const MARKER = `[frame-ship-guardrails v${VERSION}]`;

// Minimal version: one line per domain, same meaning as the full text.
// Injected on compaction (context: fallback when rules/guardrails.md is
// unreadable) so the guardrails survive compression without the full body.
const GUARDRAILS_MINIMAL = `${MARKER} 1. Conduct & Process
No sugarcoating. State facts. One point per paragraph. Respect attention.

No busywork theater. Every action must have clear value.

Assumptions on irreversible calls stated explicitly before action.

FAIL → retry N=2 differently → escalate. No third loop, no sideways.

No freelance fixes. Report severity + location + owner. Owner remediates.

Blameless post-mortems. Own mistakes. Ask for help early. No heroics.

Document decisions (ADRs for architecture, tickets for TODOs).

2. Severity
Critical: exploitable / prod impact / data loss. Block release. Fix immediately.

High: probable exploit or major impact. Fix before next release.

Medium: conditional impact. Fix within sprint.

Low: hygiene. Backlog.

Critical/High surface same session with severity + evidence + owner. Residual risk explicit. No silent PASS.

Accepted risks documented with owner, justification, expiry.

3. Security
Deny by default. Fail closed.

No secrets/tokens/credentials/sessions in code, config, logs, examples, events, prompts, or commits. Finding without proof (diff/scan/log) = REFUTED. Use vault/env. Rotate. Scan pre-push.

OWASP Top 10 screen on every new endpoint, adapter, boundary, payload — each is a trust boundary. Validate input, encode output. Cover injection, broken authN/Z, data exposure, insecure deps, missing access control, SSRF, deserialization, XXE.

Parameterized queries only. No string concatenation for SQL. No eval. No shell injection. No path traversal.

Secure random. Hash passwords with argon2/bcrypt. No custom crypto. TLS everywhere, cert pinning where needed.

CSRF tokens. CSP with nonces. HSTS. SRI for external scripts. No tokens in localStorage — use httpOnly Secure SameSite cookies.

Least privilege per interface, key, role, automation. Short-lived credentials. MFA for human access.

Rate limiting, quotas, WAF per interface.

Idempotency keys for mutating endpoints. Idempotent consumers.

Validate at boundaries. Trust nothing inbound. No deserialization of untrusted data.

SAST, DAST, SCA, secret scan in CI. Pen test annually or on major changes.

Signed commits. Signed artifacts. Provenance.

4. Privacy (Ley 172-13)
Minimization. Purpose limitation. Collect only what is necessary.

Every port, adapter, event, log, prompt, export is a PII checkpoint — mask/tokenize, allowlists only.

Every PII store declares purpose + TTL + deletion procedure. Automated enforcement.

PASS exports carry allowlisted evidence only. No raw PII.

No PII in test data — synthetic or anonymized only.

Data subject rights: access, rectification, erasure, objection. Respond within legal timeframe.

Cross-border transfers only to approved jurisdictions with adequate protection.

DPIA for high-risk processing. Privacy by design and default.

Breach notification within 72 hours to authorities and affected parties.

5. Coding Standards
Type Safety
No ANY. TypeScript strict mode, noImplicitAny, ban any. Use unknown + narrowing, generics, discriminated unions.

Python: mypy/pyright strict, ban Any, no untyped defs. Use Protocol, TypedDict, Literal, TypeVar.

Java/C#: no raw types, no dynamic unless interop. Nullable reference types enabled.

Go/Rust: no interface{} unless necessary; no unwrap()/expect() in production.

No unsafe casts (as without proof, non-null assertion without proof, ts-ignore without ticket).

Annotations, generics, variance, exhaustive switches, readonly/immutable by default.

No stringly-typed code. Strong types, enums, union types, constants.

Structure & Quality
Pure functions preferred. Side effects isolated at edges.

Dependency injection. No global mutable state. No service locator. Singletons only with justification + DI.

No circular dependencies. No dead code. No commented-out code. No TODOs without ticket.

Single responsibility. Small functions. Early returns over deep nesting.

Cyclomatic complexity ≤ 10. Nesting ≤ 3. Function length ≤ 40 lines (soft).

Composition over inheritance. Interfaces/contracts over concretes.

No premature optimization. Benchmark before optimizing.

No magic numbers/strings. Design tokens, enums, constants.

Clear naming. No abbreviations unless universal.

Immutability by default: readonly, const, final, frozen.

Error Handling
No empty catch. No catch-all. Wrap with context. Use Result/Either where appropriate.

No exceptions for control flow.

Fail fast, fail closed. No silent failures.

Resource cleanup: using, try-with-resources, defer. No leaks.

Concurrency
Immutability first. Message passing over shared memory.

Avoid locks if possible. If used, document ordering.

No unbounded queues. Backpressure.

Idempotency for retries.

Timeouts everywhere. Retries with jitter. Circuit breakers.

Graceful shutdown. Health checks.

6. SOLID
S: One reason to change per module/class/function. Separate orchestration, business logic, I/O.

O: Extend via composition, strategy, plugins. Polymorphism over conditionals.

L: Subtypes substitutable. No strengthened preconditions, weakened postconditions, unexpected exceptions. No NotImplementedError in overrides.

I: Many small role interfaces > one fat interface.

D: Depend on abstractions. High-level modules own interfaces. I/O at edges. Ports & adapters.

7. Design Patterns
Patterns solve problems — no pattern without a concrete pain point. Document non-obvious ones in ADR. Name the pattern in code. No cargo cult.

Creational: Factory, Abstract Factory, Builder, Prototype, Singleton (justified only).

Structural: Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy.

Behavioral: Strategy, Observer, Command, State, Chain of Responsibility, Mediator, Iterator, Template Method, Visitor.

Architectural: Repository, Unit of Work, CQRS, Event Sourcing, Saga, Circuit Breaker, Bulkhead, Strangler Fig, Sidecar, Ambassador.

Banned anti-patterns: God Object, Spaghetti Code, Golden Hammer, Lava Flow, Big Ball of Mud, Copy-Paste, Magic Numbers, Anemic Domain Model (unless intentional), Singleton abuse, Service Locator, God Base Class.

8. Architecture
ADRs mandatory for every significant decision: context, options, decision, consequences, status.

Layered / Hexagonal / Clean / Onion: domain core has zero dependencies on frameworks, DB, HTTP. Ports define contracts. Adapters implement.

Bounded contexts (DDD): explicit boundaries, ubiquitous language, context mapping. No shared mutable models across contexts.

Modular monolith first. Microservices only when justified by scaling, team topology, or deployment independence — documented in ADR.

Event-driven: idempotent consumers, at-least-once with dedup, dead-letter queues, schema registry, versioned events.

CQRS / Event Sourcing only when read/write asymmetry or audit trail demands it. Never by default.

API contracts: contract-first, versioned, backward compatible. Deprecation window for breaking changes.

Backpressure, timeouts, retries with jitter, circuit breakers, bulkheads at every boundary.

No distributed monolith. No shared database across services. No chatty synchronous chains.

No single point of failure. Redundancy and failover tested.

Observability by design: logs, metrics, traces, correlation IDs from day one.

Cost, scalability, maintainability, operability evaluated per decision.

Strangler Fig for legacy migration. No big-bang rewrites.

Infrastructure as Code. Versioned, reviewed, tested.

Environment parity: dev, staging, prod as similar as possible.

Feature flags for safe rollouts. Kill switches.

9. Frontend
Components: small, focused, presentational vs container separation. Props down, events up. No prop drilling beyond 2 levels — use context/store.

State: local > lifted > context > global store. Server state separate (React Query / SWR / TanStack). No duplicating server state in client store.

Immutability: no direct state mutation. Immutable updates or Immer.

Rendering: avoid unnecessary re-renders (memo/useMemo/useCallback only with proof). Virtualize long lists. Code-split routes. Lazy load below-the-fold.

SSR/SSG/CSR/ISR: chosen per route, documented. No hydration mismatches. No window/document in SSR paths.

Effects: no side effects in render. Cleanup subscriptions. Correct dependency arrays.

Data fetching: abort on unmount. Handle loading/error/empty/partial states explicitly. Optimistic updates with rollback.

Forms: controlled or uncontrolled — consistent. Validate client and server. Never trust client. Accessible labels, errors tied via aria-describedby.

Routing: declarative, typed routes, code-split per route. 404 and error boundaries at route and feature level with graceful fallback and observability reporting.

Security: no dangerouslySetInnerHTML without sanitization (DOMPurify). CSP with nonces. No secrets in bundle. No eval. No tokens in localStorage.

Styling: design tokens, no magic values. Scoped/atomic CSS. No inline styles except dynamic values. Dark mode, RTL, responsive breakpoints from tokens.

i18n: no hardcoded strings. Locale-aware formatting. Lazy-load translations. ICU pluralization.

Performance budgets: LCP < 2.5s, INP < 200ms, CLS < 0.1. Bundle size budget in CI. Lighthouse CI gate.

Browser support: documented matrix. Polyfills only where required. No vendor hacks without comment.

Progressive enhancement: core functionality without JS where feasible.

Assets: optimized images (WebP/AVIF), responsive srcset, lazy loading, preload critical, width/height to prevent CLS. Font subsetting, font-display: swap.

Testing: unit (components), integration (user flows), E2E (Playwright/Cypress). Visual regression. a11y automated (axe) + manual.

TypeScript strict. No any. Discriminated unions for state. Exhaustive switches.

10. Testing
Test pyramid: unit > integration > E2E. Fast, isolated, deterministic.

Coverage ≥ 80% for critical paths. Mutation testing for core logic.

No flaky tests. No sleep. Quarantine and fix within 24h.

Security tests: SAST, DAST, SCA, secret scan in CI.

Performance tests: load, stress, soak before major releases.

Accessibility tests: WCAG 2.1 AA, automated + manual.

No PII in test data. Synthetic or anonymized only.

11. Observability
Structured logging. No console.log in prod. No PII in logs.

Metrics, traces, correlated IDs across services.

SLOs/SLIs for all user-facing services. Alert on SLO breach. Error budgets.

Audit logs for sensitive actions.

Monitor latency, throughput, error rates, drift.

12. Performance & Reliability
SLOs/SLIs defined. Load test before release. Baseline and track regressions.

Optimize critical paths: caching, indexing, query optimization.

Backups tested regularly. Disaster recovery plan documented and rehearsed.

Chaos engineering in staging. Graceful degradation.

Monitoring/alerting for all services. On-call rotation.

13. Accessibility
WCAG 2.1 AA. Semantic HTML first, ARIA only when needed.

Keyboard navigable. Focus management. Screen reader tested.

Color contrast ≥ 4.5:1. Alt text for images. aria-describedby for errors.

No accessibility regressions. Automated checks in CI.

14. Internationalization
Externalize all strings. No hardcoded user-facing text.

RTL layouts supported. Locale-aware formatting (dates, numbers, currency).

Unicode support. Timezone handling in UTC, display in local.

Translation workflow with version control. ICU pluralization.

15. Data Management
Data lifecycle: ingestion, storage, processing, archival, deletion.

Data quality checks at ingestion. Lineage tracked.

Backup and recovery for all data stores. Test restores.

Data governance: ownership, classification, retention policies.

Parameterized queries only. No string SQL.

16. AI/ML
Ethical AI: fairness, bias mitigation, transparency.

Explainability for critical decisions. Human-in-the-loop where needed.

Model versioning. Reproducible training. Data privacy in training.

Monitoring for drift. Retraining triggers. Fallback to safe default.

No PII in prompts unless explicitly approved and masked.

17. Dependencies & Supply Chain
Pin versions. Minimal dependencies. Scan daily for CVEs.

License compatibility verified. SBOM maintained. Reproducible builds.

No unmaintained libraries.

Signed commits, signed artifacts, provenance.

18. Documentation
README: setup, usage, architecture, contribution.

API docs (OpenAPI/AsyncAPI) up-to-date. Contract-first.

Runbooks for operations, incidents, rollbacks.

Changelog (Keep a Changelog). Semantic versioning.

Migration guides for breaking changes.

ADRs for significant decisions. Diagrams (C4 or similar) updated with architecture changes.

Inline comments for why, not what. Complex logic explained.

19. Commit, Branching & Review
Work-unit commits. Atomic, single purpose. Reference ticket/issue. Conventional Commits format type(scope): subject.

Short-lived feature branches. Rebase before merge. No direct pushes to main.

Every change peer-reviewed (security, privacy, performance, tests). No self-merge.

CI must pass: lint, type-check, test, security scan, license scan, bundle budget, a11y, Lighthouse.

Critical/High findings block release. No manual overrides without written approval.

20. Incident Response
Severity levels defined. On-call rotation. Escalation paths.

Runbooks for common incidents. Communication templates.

Blameless post-mortems with tracked action items.

Breach notification per legal requirements (72h).`;

const FULL_LABEL = `${MARKER} Guardrails for Software Development and Beyond (BEFORE dispatch, AFTER verify; full text: AGENTS.md) — source: rules/guardrails.md:`;

// V2 system parts are {type:"text",text} objects (not strings). Accept both
// so idempotency holds across context + compaction hooks and retries.
function hasMarker(parts: unknown): boolean {
  if (!Array.isArray(parts)) return false;
  return parts.some((p) => {
    if (typeof p === "string") return p.includes(MARKER);
    if (p && typeof p === "object") {
      const text = (p as { text?: unknown }).text;
      if (typeof text === "string" && text.includes(MARKER)) return true;
    }
    return false;
  });
}

export default Plugin.define({
  id: "frame-ship-guardrails",
  async setup(ctx) {
    const fallbackBase = (ctx.location.directory || "").replace(/[/\\]+$/, "");
    const rulesDir = resolveRepoDir(fallbackBase, "rules");

    // Full text: rules/guardrails.md read at runtime (single source of truth,
    // same pattern as the bootstrap body in ./skills.ts) — miss → minimal, so
    // a missing/unreadable file degrades instead of dropping the guardrails.
    let fullText = GUARDRAILS_MINIMAL;
    if (rulesDir && rulesDir !== "/rules") {
      const raw = await readTextFile(`${rulesDir}/guardrails.md`);
      const body = (raw || "").trim();
      if (body) fullText = `${FULL_LABEL}\n${body}`;
    }

    // ---- System injection: full guardrails on every context build ----
    await ctx.session.hook("context", (event) => {
      if (hasMarker(event.system)) return; // idempotent — no duplication
      event.system.push({ type: "text", text: fullText });
    });

    // ---- Compaction: minimal version survives compression ----
    await ctx.session.hook("compaction", (event) => {
      if (hasMarker(event.system)) return;
      event.system.push({ type: "text", text: GUARDRAILS_MINIMAL });
    });
  },
});
