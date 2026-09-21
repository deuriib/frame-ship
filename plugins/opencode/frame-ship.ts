/**
 * frame-ship v0.7.0 — Frame→Ship plugin (single-file, zero deps, V2-only).
 * Chain: see CHAIN const (single source of truth for order).
 * Skills: ./skills/<stage>/SKILL.md. Location: plugins/opencode/frame-ship.ts.
 * Install: explicit `plugins: ["./plugins/opencode/frame-ship.ts"]` (a root-level
 * `plugins/` dir is NOT auto-discovered — only `.opencode/plugins/` is).
 * Creed: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."
 */

import { Plugin, type Skill } from "@opencode/plugin";

const VERSION = "0.7.0";
const MARKER = `[frame-ship v${VERSION}]`;

const CHAIN =
  "frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release";

// Compact pointer-form card. Full detail lives in skills/*/SKILL.md + live bootstrap body — this keeps contract + routing only.
const WORKFLOW_CARD = `${MARKER} Frame→Ship: ${CHAIN} (do not skip).
LOAD ORDER — HARD STOP: 1.skill(frame-ship:using-frame-ship) 2.skill(frame-ship:<stage>) via skill tool (no skill=STOP) 3.then act. Pre-flight: skill? SPEC/HARD/GATE/DOMAINS? NO→STOP, retry N=2, escalate orchestrator. No 3rd loop, no sideways.
Triggers→skill: start/what-skills→frame-ship:using-frame-ship | initiative/OKRs→frame-ship:frame-intent(BRIEF+OKRs) | brief-approved→frame-ship:translate-to-spec(REQ+ARCHITECTURE+CONTRACTS) | pre-approval→frame-ship:propose-changes(PROPOSED_CHANGES,untouched) | auth/data/API→frame-ship:review-security(STRIDE) | API/model/cross-cut→frame-ship:review-architecture(ADR) | approved→frame-ship:execute-spec(approved files,REQ→test) | impl-ready→frame-ship:quality-gate(CLOSED on fail) | complete→frame-ship:verify-handoff(HANDOFF,DoD) | verified→frame-ship:ship-release(NOTES+changelog+rollback).
Hard rules: 1.no code w/o proposal 2.security review auth/data/API 3.ADR for contracts 4.no handoff on CLOSED w/o waiver 5.REQ→test→artifact→verdict 6.HANDOFF before ship 7.reference-only packets. Detail: skills/*/SKILL.md.`;

// Short-form guardrails: every rule 1-14 present, greppable by number, same meaning. Full text: AGENTS.md.
const GUARDRAILS_FULL = `${MARKER} Guardrails for Software Development and Beyond (BEFORE dispatch, AFTER verify):
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
`;

const POINTERS = `${MARKER} Truth: AGENTS.md (creed, guardrails 1-15) > skills/<stage>/SKILL.md+references/. Entry frame-intent; close ship-release (lessons on PASS). Chain: ${CHAIN}. Subagents: Always use subagents as much as possible proactively, this is no negotiable, based on session context and metions about it.`;

const COMPACTION_REMINDER = `${MARKER} Compaction: re-load using-frame-ship, then stage skill BEFORE resume. Chain: ${CHAIN}. Subagents: Always use subagents as much as possible proactively, this is no negotiable, based on session context and metions about it. Keep REQ→test→artifact, verdicts, stage. No skill=STOP. No code w/o proposal. No handoff on CLOSED.`;

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

function fileUrlToPath(url: string): string | undefined {
  try {
    const pathname = decodeURIComponent(new URL(url).pathname);
    // URL pathname on win32 looks like /D:/GitHub/frame-ship/... — strip the
    // leading slash before a drive letter so joins stay valid.
    const win = pathname.match(/^\/([A-Za-z]:\/.*)$/);
    return win ? win[1] : pathname;
  } catch {
    return undefined;
  }
}

// Skills live at <repo-root>/skills/ next to this file's
// <repo-root>/plugins/opencode/frame-ship.ts. Resolve relative to our own
// location (import.meta.url) so installs work from ANY cwd — never assume cwd
// IS the frame-ship repo. Falls back to the plugin location dir only when our
// own URL is unavailable (e.g. unit tests). No static node: imports keeps
// zero-dep + no @types/node so `tsc` stays clean (runtime read uses Bun.file
// first, then a function-scoped dynamic import of node:fs/promises).
function resolveSkillsDir(fallbackBase: string): string {
  try {
    const meta = import.meta as unknown as { url?: string };
    const url = meta?.url;
    if (typeof url === "string" && url.startsWith("file:")) {
      const filePath = fileUrlToPath(url);
      if (filePath) {
        const parts = filePath.split("/");
        // [..., <root>, plugins, opencode, frame-ship.ts] → drop last 3.
        if (
          parts.length >= 4 &&
          parts[parts.length - 3] === "plugins" &&
          parts[parts.length - 2] === "opencode"
        ) {
          const root = parts.slice(0, parts.length - 3).join("/") || "/";
          return `${root.replace(/[/\\]+$/, "")}/skills`;
        }
      }
    }
  } catch {
    // fall through to fallback
  }
  return `${fallbackBase.replace(/[/\\]+$/, "")}/skills`;
}

// Bounded init I/O: a read that never settles (hung handle, wedged mount)
// must not stall setup. Every read races a small timeout — timeout wins →
// miss ("", entry skipped, uncached so retry self-heals). Timer cleared on
// settle; the raced read never rejects (inner try/catch), so the race loser
// cannot surface an unhandled rejection. Zero-dep (Promise.race + setTimeout
// only). Local 2-6KB reads land in single-digit ms; 2000ms is generous
// headroom against false skips on loaded disks.
const READ_TIMEOUT_MS = 2000;

async function withTimeout(
  task: Promise<string>,
  ms: number,
): Promise<string | undefined> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<undefined>((resolve) => {
    timer = setTimeout(() => resolve(undefined), ms);
  });
  return Promise.race([task, timeout]).finally(() => {
    if (timer !== undefined) clearTimeout(timer);
  });
}

// Bun.file first, dynamic node:fs/promises fallback (no static node: import so
// `tsc` stays clean without @types/node). Silent "" on miss — the caller
// skips the entry, init never wedges. Never echoes contents into errors.
async function readTextFile(path: string): Promise<string> {
  try {
    // Eager read, never rejects (inner try/catch) so the timeout race below
    // stays rejection-free from both sides.
    const read: Promise<string> = (async (): Promise<string> => {
      try {
        const bunFile = (
          globalThis as unknown as {
            Bun?: { file: (p: string) => { text: () => Promise<string> } };
          }
        )?.Bun?.file;
        if (typeof bunFile === "function") {
          return await bunFile(path).text();
        }
        // @ts-ignore — node types intentionally not installed; dynamic import only.
        const fs = (await import("node:fs/promises")) as unknown as {
          readFile: (p: string, enc: string) => Promise<string>;
        };
        return await fs.readFile(path, "utf8");
      } catch {
        return "";
      }
    })();
    // Timeout-as-miss: a hung read resolves undefined → skip the entry, and —
    // like any miss — is never cached, so a retry self-heals.
    const raw = await withTimeout(read, READ_TIMEOUT_MS);
    if (raw === undefined) return "";
    const text = raw || "";
    return text;
  } catch {
    return "";
  }
}

// Skill frontmatter: name + description (same shape as agents; body kept whole
// as Skill.Info.content — references stay file-based per scope).
function parseSkillFile(raw: string): {
  name: string;
  description: string;
  content: string;
} {
  const text = (typeof raw === "string" ? raw : "").replace(/^[\uFEFF\s]*/, "");
  const fence = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);
  if (fence) {
    const frontmatter = fence[1] || "";
    const nameMatch = frontmatter.match(
      /^\s*name\s*:\s*(?:"([^"]*)"|'([^']*)'|(.*?))\s*$/m,
    );
    const descMatch = frontmatter.match(
      /^\s*description\s*:\s*(?:"([^"]*)"|'([^']*)'|(.*?))\s*$/m,
    );
    const name = (
      nameMatch?.[1] ??
      nameMatch?.[2] ??
      nameMatch?.[3] ??
      ""
    ).trim();
    const description = (
      descMatch?.[1] ??
      descMatch?.[2] ??
      descMatch?.[3] ??
      ""
    ).trim();
    return { name, description, content: (raw || "").trim() };
  }
  return { name: "", description: "", content: (raw || "").trim() };
}

// Live bootstrap: SKILL.md body only (references stay file-based per scope).
// Runtime file read keeps a single source of truth — no hardcoded copy to drift.
const BOOTSTRAP_LABEL = `${MARKER} frame-ship:using-frame-ship bootstrap:`;
const BOOTSTRAP_ACK = `NOTE: frame-ship:using-frame-ship is already loaded in this context — do not re-load it via the skill tool; follow the chain: ${CHAIN}.`;
let bootstrapCachePath = "";
let bootstrapCacheText = "";

async function loadBootstrapBody(skillsDir: string): Promise<string> {
  const clean = (skillsDir || "").replace(/[/\\]+$/, "");
  if (!clean || clean === "/skills") return "";
  const skillFile = `${clean}/using-frame-ship/SKILL.md`;
  if (bootstrapCachePath === skillFile && bootstrapCacheText)
    return bootstrapCacheText;
  try {
    const raw = await readTextFile(skillFile);
    const body = (raw || "").trim();
    if (!body) return "";
    const labeled = `${BOOTSTRAP_LABEL}\n${BOOTSTRAP_ACK}\n${body}`;
    bootstrapCachePath = skillFile;
    bootstrapCacheText = labeled;
    return labeled;
  } catch {
    return ""; // silent fallback — pointers above still orient the session
  }
}

// Skill dirs shipped at <repo-root>/skills/ (SKILL.md each). IDs are prefixed
// `frame-ship:<dir>` to match the chain triggers; `name` stays the bare
// frontmatter name (loader expects `name` == dir convention).
const SKILL_DIRS = [
  "using-frame-ship",
  "frame-intent",
  "translate-to-spec",
  "propose-changes",
  "review-security",
  "review-architecture",
  "execute-spec",
  "quality-gate",
  "verify-handoff",
  "ship-release",
  "debugging",
  "git-worktree",
  "pull-request",
] as const;

export default Plugin.define({
  id: "frame-ship",
  async setup(ctx) {
    const fallbackBase = (ctx.location.directory || "").replace(/[/\\]+$/, "");
    const skillsDir = resolveSkillsDir(fallbackBase);

    // ---- Skills lane (additive, sync transform) ----
    // Preload async BEFORE the sync transform callback — transforms must stay
    // cheap/replayable with no side effects inside.
    if (skillsDir && skillsDir !== "/skills") {
      const pending: Array<{
        id: string;
        name: string;
        description: string;
        path: string;
        content: string;
      }> = [];
      for (const dir of SKILL_DIRS) {
        const skillFile = `${skillsDir}/${dir}/SKILL.md`;
        const raw = await readTextFile(skillFile);
        if (!raw) continue;
        const parsed = parseSkillFile(raw);
        const name = parsed.name || dir;
        if (!parsed.content) continue;
        pending.push({
          id: `frame-ship:${dir}`,
          name,
          description: parsed.description || name,
          path: skillFile,
          content: parsed.content,
        });
      }
      if (pending.length > 0) {
        await ctx.skill.transform((editor) => {
          for (const s of pending) {
            // Never overwrite user skills with the same id.
            if (editor.get(s.id) !== undefined) continue;
            editor.add({
              id: s.id as Skill.Info["id"],
              name: s.name as Skill.Info["name"],
              description: s.description,
              path: s.path as Skill.Info["path"],
              content: s.content,
            });
          }
        });
      }
    }

    // ---- System injection: agent loop ----
    const bootstrap = await loadBootstrapBody(skillsDir);
    await ctx.session.hook("context", (event) => {
      if (hasMarker(event.system)) return; // idempotent — no duplication
      event.system.push(
        { type: "text", text: WORKFLOW_CARD },
        { type: "text", text: GUARDRAILS_FULL },
        { type: "text", text: POINTERS },
      );
      if (bootstrap) event.system.push({ type: "text", text: bootstrap });
    });

    // ---- Compaction reminder ----
    await ctx.session.hook("compaction", (event) => {
      if (hasMarker(event.system)) return;
      event.system.push({ type: "text", text: COMPACTION_REMINDER });
    });
  },
});
