#!/usr/bin/env bun
/**
 * context-inject.ts — PreInvocation context injection, run via `bun ./hooks/context-inject.ts`.
 *
 * 1:1 parity with `.opencode/plugins/frame-ship.ts`:
 *   opencode `config` (skills.paths)              → agy `skills/` dir (same files, reused verbatim)
 *   opencode `chat.system.transform` (3 cards)    → `rules/frame-ship.md` (static) + this hook (live bootstrap)
 *   opencode `loadBootstrapBody`                   → live read of skills/using-frame-ship/SKILL.md,
 *                                                   plugin root resolved from our own import.meta.url
 *                                                   (mirrors opencode resolveSkillsDir), silent fallback
 *   opencode `session.compacting` (reminder)      → N/A in agy (no compaction lifecycle event;
 *                                                   rules/frame-ship.md is always-on in context)
 *   opencode `hasMarker` dedupe                   → full bootstrap exactly once (invocationNum == 0,
 *                                                   0-indexed per official hooks docs)
 *
 * stdin:  PreInvocation JSON { invocationNum, initialNumSteps, workspacePaths?, ... }
 * stdout: `{ injectSteps: [{ ephemeralMessage }] }` on first invocation (invocationNum == 0),
 *         otherwise `{}`. Single JSON object, exit 0.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

const VERSION = "0.8.0";
// [frame-ship v0.8.0] parity marker — keep in lockstep with .opencode/plugins/frame-ship.ts + rules/frame-ship.md.
const MARKER = `[frame-ship v${VERSION}]`;

const CHAIN =
  "frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release";

const GUARD_RAILS = `
## ${MARKER} Guardrails for Software Development and Beyond (BEFORE dispatch, AFTER verify):
These guardrails are non‑negotiable. Violations block progress, trigger escalation, and require remediation with evidence. They apply across all domains below.

### Software Development Core
Work‑unit commits: Atomic, single‑purpose commits. Each commit references a ticket/issue. No mixing refactors with features. Commit messages: type(scope): subject (Conventional Commits).

Branching: Short‑lived feature branches. Rebase before merge. No direct pushes to main.

Code review: Every change requires at least one peer review. Reviewers check for security, privacy, performance, and tests. No self‑merge.

CI/CD: All builds pass automated checks (lint, test, security scan, license scan). Fail on Critical/High findings. No manual overrides without written approval.

Dependencies: Pin versions. Scan for CVEs daily. No unmaintained libraries. License compatibility verified.

Secrets: Never in code, config, logs, examples, events, or commits. Use a vault or environment variables. Rotate regularly. Scan commits pre‑push.

### Security
Deny by default: All access is denied unless explicitly allowed. Fail closed.

No secrets/credentials/sessions in code, config, logs, examples, events, or prompts. Finding without proof (diff/scan/log) = REFUTED.

OWASP Top 10 screen: Injection, broken authN/Z, data exposure, insecure deps, missing access control. Every new endpoint, adapter, boundary, or payload is a trust boundary—validate input, encode output.

Least privilege: Per interface, key, role, automation. Short‑lived credentials. MFA for human access.

Secure defaults: TLS everywhere. Strong cipher suites. HSTS. CSP. No debug in prod.

No freelance fixes: Report severity + location + owner. Owner remediates. No unsolicited changes.

SAST/DAST/SCA in CI. Pen test annually or on major changes.

### Privacy (Ley 172‑13)
Minimization: Collect only what is necessary. Purpose limitation.

PII checkpoints: Every port, adapter, event, log, prompt, export. Mask/tokenize. Allowlists only.

Every PII store declares purpose, TTL, deletion procedure. Automated enforcement.

PASS exports carry allowlisted evidence only. No raw PII.

Data subject rights: Access, rectification, erasure, objection. Respond within legal timeframe.

Cross‑border transfers: Only to approved jurisdictions with adequate protection.

DPIA for high‑risk processing. Privacy by design and default.

Breach notification: Within 72 hours to authorities and affected parties.

### Severity
Critical: Exploitable, production impact, data loss. Fix immediately. Block release.

High: Probable exploit or major impact. Fix before next release.

Medium: Conditional impact. Schedule within sprint.

Low: Hygiene. Backlog.

Critical/High surface same session with severity + evidence + owner. Residual risk explicit. No silent PASS.

Accepted risks documented with owner, justification, expiry.

### Conduct
No sugarcoating. State facts. One point per paragraph. Respect attention.

No busywork theater. Every action must have clear value.

Assumptions on irreversible calls stated explicitly before action.

FAIL → retry N=2 differently → escalate. No third loop, no sideways.

Blameless post‑mortems. Own mistakes. Ask for help early. No heroics.

Document decisions. ADRs for architecture. Comments for complex logic.

Respect deadlines. No scope creep. Flag risks early.

### Architecture
ADRs for every significant decision. Context, options, decision, consequences.

Modular, loosely coupled, highly cohesive. Clear boundaries.

Design for failure: Circuit breakers, retries with backoff, timeouts, bulkheads.

No single points of failure. Redundancy where needed.

API versioning. Contract‑first. OpenAPI/AsyncAPI specs.

Scalability, maintainability, observability considered from day one.

### Testing
Test pyramid: Unit > Integration > E2E. Fast, isolated, deterministic.

Coverage: Minimum 80% for critical paths. Mutation testing for core logic.

No flaky tests. Quarantine and fix within 24h.

Security tests: SAST, DAST, dependency scan, secret scan. Pen test annually.

Performance tests: Load, stress, soak before major releases.

Accessibility tests: Automated + manual (WCAG 2.1 AA).

Test data: No PII. Synthetic or anonymized only.

### Documentation
README: Setup, usage, architecture, contribution.

API docs: OpenAPI/Swagger, up‑to‑date.

Runbooks: For operations, incidents, rollbacks.

Changelog: Keep a Changelog format.

Inline comments: For why, not what. Complex logic explained.

Diagrams: C4 model or similar. Updated with architecture changes.

### Performance
SLOs/SLIs defined for all user‑facing services.

Load testing before release. Baseline and track regressions.

Optimize critical paths. Caching, indexing, query optimization.

Monitor latency, throughput, error rates. Alert on SLO breach.

### Reliability
Error budgets. Balance innovation and stability.

Chaos engineering in staging. Graceful degradation.

Backups tested regularly. Disaster recovery plan documented and rehearsed.

Monitoring/alerting for all services. On‑call rotation.

Incident management: Severity levels, communication plan, post‑mortems.

### Accessibility
WCAG 2.1 AA compliance. Keyboard navigable. Screen reader compatible.

Color contrast ≥ 4.5:1. Alt text for images. ARIA labels where needed.

No accessibility regressions. Automated checks in CI.

### Internationalization
Externalize all strings. No hardcoded user‑facing text.

Support RTL layouts. Locale‑aware formatting (dates, numbers, currency).

Unicode support. Timezone handling in UTC, display in local.

Translation workflow with version control.

### Data Management
Data lifecycle: Ingestion, storage, processing, archival, deletion.

Data quality checks at ingestion. Lineage tracked.

Backup and recovery for all data stores. Test restores.

Data governance: Ownership, classification, retention policies.

### AI/ML
Ethical AI: Fairness, bias mitigation, transparency.

Explainability for critical decisions. Human‑in‑the‑loop where needed.

Model versioning. Reproducible training. Data privacy in training.

Monitoring for drift. Retraining triggers. Fallback to safe default.

No PII in prompts unless explicitly approved and masked.

### Incident Response
Severity levels defined. On‑call rotation. Escalation paths.

Runbooks for common incidents. Communication templates.

Post‑mortems blameless, action items tracked.

Breach notification per legal requirements.

### General
Automate everything possible. Manual steps are error‑prone.

Infrastructure as Code. Versioned, reviewed, tested.

Environment parity. Dev, staging, prod as similar as possible.

Feature flags for safe rollouts. Kill switches.

Observability: Logs, metrics, traces. Correlated IDs.

Cost awareness. Monitor cloud spend. Optimize regularly.

### Type Safety
No ANY: TypeScript strict mode, noImplicitAny, ban any (@typescript-eslint/no-explicit-any: error). Use unknown + narrowing, generics, discriminated unions.

Python: mypy/pyright strict, ban Any, no untyped defs. Use Protocol, TypedDict, Literal, TypeVar.

Java/C#: no raw types, no dynamic unless interop. Enable nullable reference types.

Go/Rust: no interface{} unless necessary; no unwrap()/expect() in production.

No unsafe casts: no as without proof, no non-null assertion unless proven, no ts-ignore without ticket.

Correct typing everywhere: annotations, generics, variance, exhaustive switches, readonly/immutable by default.

### Code Structure
Pure functions where possible. Side effects isolated.

Dependency injection. No global mutable state. No singletons unless justified.

No circular dependencies. No dead code. No commented-out code. No TODOs without ticket.

Single responsibility. Small functions. Limit cyclomatic complexity. Early returns over deep nesting.

Composition over inheritance. Prefer interfaces/contracts.

No premature optimization. Benchmark before optimizing.

No magic numbers/strings. Use enums, union types, constants.

Clear naming. No abbreviations unless universal.

No stringly typed code. Use strong types.

### Error Handling
No empty catch. No catch-all. Wrap with context. Use Result/Either where appropriate.

Validate at boundaries. Trust nothing from outside.

Fail fast, fail closed. No silent failures.

No exceptions for control flow.

Resource cleanup: using, try-with-resources, defer. No leaks.

### Concurrency
Immutability first. Message passing over shared memory.

Avoid locks if possible. If used, document ordering.

No unbounded queues. Backpressure.

Idempotency for retries.

Timeouts everywhere. Retries with jitter. Circuit breakers.

Graceful shutdown. Health checks.

### Security & Privacy in Code
Parameterized queries only. No string concatenation for SQL.

Encode output. No XSS. CSRF tokens. SSRF allowlists. No path traversal.

No deserialization of untrusted data. No eval. No shell injection.

Secure random. Hash passwords with argon2/bcrypt. No custom crypto.

TLS verify. Certificate pinning where needed.

No secrets in code/config/logs/examples/events. Scan, rotate, vault.

No PII in logs/prompts/exports. Mask/tokenize. Allowlists only.

Least privilege per interface/key/role/automation.

### Testing & Quality
Unit > Integration > E2E. Fast, isolated, deterministic.

No flaky tests. No sleep. Quarantine and fix within 24h.

Coverage ≥80% for critical paths. Mutation testing for core logic.

Security tests: SAST, DAST, SCA, secret scan in CI.

No PII in test data. Synthetic or anonymized only.

Accessibility tests: WCAG 2.1 AA. Automated + manual.

### Observability
Structured logging. No console.log in prod. No PII.

Metrics, traces, correlated IDs.

SLOs/SLIs. Alerts on SLO breach.

Audit logs for sensitive actions.

Dependencies & Supply Chain
Pin versions. Minimal dependencies. Scan daily for CVEs.

License compatibility. SBOM. Reproducible builds.

Signed commits. Signed artifacts. Provenance.

No unmaintained libraries.
`;

const BOOTSTRAP_LABEL = `${MARKER} frame-ship:using-frame-ship bootstrap:`;
const BOOTSTRAP_ACK = `NOTE: frame-ship:using-frame-ship is already loaded in this context — do not re-load it via the skill tool; follow the chain: ${CHAIN}.`;

function fileUrlToPath(url: string): string | undefined {
  try {
    const pathname = decodeURIComponent(new URL(url).pathname);
    // URL pathname on win32 looks like /D:/... — strip the leading slash
    // before a drive letter so joins stay valid (mirrors opencode).
    const win = pathname.match(/^\/([A-Za-z]:\/.*)$/);
    return win ? win[1] : pathname;
  } catch {
    return undefined;
  }
}

/** Plugin root resolved from our own location (mirrors opencode resolveSkillsDir). */
function resolvePluginRoot(fallbackBase: string): string {
  try {
    const url = (import.meta as unknown as { url?: string })?.url;
    if (typeof url === "string" && url.startsWith("file:")) {
      const filePath = fileUrlToPath(url);
      if (filePath) {
        const norm = filePath.replace(/\\/g, "/");
        // <root>/hooks/context-inject.ts → drop /hooks/<file>.
        const idx = norm.lastIndexOf("/hooks/");
        if (idx > 0) return norm.slice(0, idx);
      }
    }
  } catch {
    // fall through to cwd-based fallback
  }
  return fallbackBase;
}

async function readStdin(): Promise<string> {
  const maybeBun = (globalThis as unknown as { Bun?: { stdin?: { text?: () => Promise<string> } } }).Bun;
  if (maybeBun?.stdin?.text) {
    try {
      return await maybeBun.stdin.text();
    } catch {
      // fall through to node read
    }
  }
  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

function readFileIfExists(path: string): string {
  try {
    return readFileSync(path, "utf8").trim();
  } catch {
    return "";
  }
}

/** Live bootstrap body (opencode `loadBootstrapBody` parity): SKILL.md body only, silent fallback. */
function loadBootstrapBody(pluginRoot: string, workspacePaths: string[]): string {
  const rel = join("skills", "using-frame-ship", "SKILL.md");
  const candidates: string[] = [join(pluginRoot, rel), join(process.cwd(), rel)];
  for (const w of workspacePaths) {
    if (typeof w === "string" && w) candidates.push(join(w, rel));
  }
  for (const c of candidates) {
    const body = readFileIfExists(c);
    if (body) return `${BOOTSTRAP_LABEL}\n${BOOTSTRAP_ACK}\n${body}`;
  }
  return `${BOOTSTRAP_LABEL}\n${BOOTSTRAP_ACK}\nSkill file not readable from hook — load skills/using-frame-ship/SKILL.md from the plugin root. Chain: ${CHAIN}.
Subagents: Always use subagents as much as possible proactively, this is no negotiable, based on session context and metions about it. Guardrails: ${GUARD_RAILS}`;
}

async function main(): Promise<void> {
  let payload: { invocationNum?: unknown; initialNumSteps?: unknown; workspacePaths?: unknown };
  try {
    payload = JSON.parse((await readStdin()).trim() || "{}");
  } catch {
    console.log("{}");
    return;
  }
  const invocationNum = typeof payload.invocationNum === "number" ? payload.invocationNum : -1;
  const initialNumSteps = typeof payload.initialNumSteps === "number" ? payload.initialNumSteps : 0;
  const workspacePaths = Array.isArray(payload.workspacePaths)
    ? (payload.workspacePaths as unknown[]).filter((w): w is string => typeof w === "string")
    : [];

  if (invocationNum === 0) {
    const pluginRoot = resolvePluginRoot(process.cwd());
    const bootstrap = loadBootstrapBody(pluginRoot, workspacePaths);
    console.log(JSON.stringify({ injectSteps: [{ ephemeralMessage: bootstrap }] }));
    return;
  }
  console.log("{}");
}

await main();
