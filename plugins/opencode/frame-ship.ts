/**
 * frame-ship v0.8.0 — Frame→Ship plugin (single-file, zero deps, V2-only).
 * Chain: see CHAIN const (single source of truth for order).
 * Skills: ./skills/<stage>/SKILL.md. Location: plugins/opencode/frame-ship.ts.
 * Install: explicit `plugins: ["./plugins/opencode/frame-ship.ts"]` (a root-level
 * `plugins/` dir is NOT auto-discovered — only `.opencode/plugins/` is).
 * Creed: "Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."
 */

import { Plugin, type Skill } from "@opencode/plugin";

const VERSION = "0.8.0";
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

// Agents live at <repo-root>/agents/ next to <repo-root>/plugins/opencode/.
// Same resolution contract as skills: relative to our own import.meta.url so
// package installs work from ANY cwd; fallbackBase only when URL unavailable.
function resolveAgentsDir(fallbackBase: string): string {
  try {
    const meta = import.meta as unknown as { url?: string };
    const url = meta?.url;
    if (typeof url === "string" && url.startsWith("file:")) {
      const filePath = fileUrlToPath(url);
      if (filePath) {
        const parts = filePath.split("/");
        if (
          parts.length >= 4 &&
          parts[parts.length - 3] === "plugins" &&
          parts[parts.length - 2] === "opencode"
        ) {
          const root = parts.slice(0, parts.length - 3).join("/") || "/";
          return `${root.replace(/[/\\]+$/, "")}/agents`;
        }
      }
    }
  } catch {
    // fall through to fallback
  }
  return `${fallbackBase.replace(/[/\\]+$/, "")}/agents`;
}

// Canonical roster: <repo-root>/agents/<id>.md. Hardcoded (no readdir helper)
// so init I/O stays bounded — one small read per id, miss skipped, never cached.
const AGENT_FILES = [
  "orchestrator",
  "barrera",
  "dauhajre",
  "subero",
  "vera",
  "santana",
  "montero",
  "vasquez",
  "espinoza",
  "engineering-specialist",
  "security-specialist",
  "finance-specialist",
  "legal-specialist",
  "marketing-specialist",
  "people-specialist",
  "revenue-specialist",
  "automation-specialist",
  "security-reviewer",
  "finance-reviewer",
  "legal-reviewer",
  "people-reviewer",
  "revenue-reviewer",
  "automation-reviewer",
  "brand-reviewer",
  "quality-assurance",
  "review-data",
  "review-readability",
  "review-refuter",
  "review-reliability",
  "review-resilience",
  "review-risk",
] as const;

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

// Bun.write first, dynamic node:fs/promises fallback (no static node: import so
// `tsc` stays clean without @types/node). Resolves false on failure —
// provisioning is best-effort; the update transform below still enriches
// manually-copied agents when writes are unavailable (read-only project).
async function fileExists(path: string): Promise<boolean> {
  try {
    const bunFile = (
      globalThis as unknown as {
        Bun?: { file: (p: string) => { exists: () => Promise<boolean> } };
      }
    )?.Bun?.file;
    if (typeof bunFile === "function") {
      return await bunFile(path).exists();
    }
    // @ts-ignore — node types intentionally not installed; dynamic import only.
    const fs = (await import("node:fs/promises")) as unknown as {
      stat: (p: string) => Promise<unknown>;
    };
    await fs.stat(path);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(dir: string): Promise<boolean> {
  try {
    // @ts-ignore — node types intentionally not installed; dynamic import only.
    const fs = (await import("node:fs/promises")) as unknown as {
      mkdir: (p: string, opts: { recursive: boolean }) => Promise<unknown>;
    };
    await fs.mkdir(dir, { recursive: true });
    return true;
  } catch {
    return false;
  }
}

async function writeTextFile(path: string, content: string): Promise<boolean> {
  try {
    const bunWrite = (
      globalThis as unknown as { Bun?: { write: unknown } }
    )?.Bun?.write;
    if (typeof bunWrite === "function") {
      await (bunWrite as (p: string, c: string) => Promise<unknown>)(
        path,
        content,
      );
      return true;
    }
    // @ts-ignore — node types intentionally not installed; dynamic import only.
    const fs = (await import("node:fs/promises")) as unknown as {
      writeFile: (p: string, c: string, enc: string) => Promise<void>;
    };
    await fs.writeFile(path, content, "utf8");
    return true;
  } catch {
    return false;
  }
}

// FNV-1a 32-bit hex — zero-dep content hash so the provision manifest can tell
// our generated files apart from user-customized ones.
function hashText(text: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

// YAML double-quote escaping for single-line frontmatter scalars.
function yamlQuote(value: string): string {
  return `"${(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
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

// ---- Agents lane: frame-ship frontmatter → OpenCode V2 --------------------
// Source of truth stays at <repo-root>/agents/*.md with frame-ship frontmatter:
//   name, description, mainAgent?, subagent?, effort?, tools:[custom names]
// OpenCode V2 wants: description, mode (primary|subagent|all), system (body),
// steps, permissions:[{action, resource, effect}]. V2 renamed bash→shell and
// task→subagent; `tools` boolean map is deprecated. This wrapper is the only
// place that knows the translation — agents/*.md never carry V2 syntax.
// V2 `AgentEditor` has no `add`, so setup() provisions V2-native discovery
// files first (<project>/.opencode/agents/<id>.md → id), reloads the domain,
// then updates in place only (missing ids are skipped). File discovery owns
// id creation; the transform owns enrichment (mode/steps/permissions) + the
// orchestrator default.
interface ParsedAgent {
  name: string;
  description: string;
  mainAgent: boolean;
  subagent: boolean;
  effort: string;
  tools: string[];
  system: string;
}

function stripQuotes(value: string): string {
  const text = (value || "").trim();
  if (
    text.length >= 2 &&
    ((text.startsWith('"') && text.endsWith('"')) ||
      (text.startsWith("'") && text.endsWith("'")))
  ) {
    return text.slice(1, -1).trim();
  }
  return text;
}

function parseAgentFile(raw: string): ParsedAgent {
  const empty: ParsedAgent = {
    name: "",
    description: "",
    mainAgent: false,
    subagent: false,
    effort: "",
    tools: [],
    system: (raw || "").trim(),
  };
  const text = (typeof raw === "string" ? raw : "").replace(/^[\uFEFF\s]*/, "");
  const fence = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);
  if (!fence) return empty;
  const frontmatter = fence[1] || "";
  const nameMatch = frontmatter.match(
    /^\s*name\s*:\s*(?:"([^"]*)"|'([^']*)'|(.*?))\s*$/m,
  );
  const descMatch = frontmatter.match(
    /^\s*description\s*:\s*(?:"([^"]*)"|'([^']*)'|(.*?))\s*$/m,
  );
  const effortMatch = frontmatter.match(/^\s*effort\s*:\s*(\S+)\s*$/m);
  const toolsBlock = frontmatter.match(/^\s*tools\s*:\s*(?:\r?\n|$)((?:\s*-\s*.*(?:\r?\n|$))*)/m);
  const tools: string[] = [];
  if (toolsBlock) {
    for (const line of (toolsBlock[1] || "").split(/\r?\n/)) {
      const item = line.match(/^\s*-\s*(\S+)\s*$/);
      if (item) tools.push(item[1].trim());
    }
  }
  const body = text.slice(fence[0].length).trim();
  return {
    name: stripQuotes(nameMatch?.[1] ?? nameMatch?.[2] ?? nameMatch?.[3] ?? ""),
    description: stripQuotes(
      descMatch?.[1] ?? descMatch?.[2] ?? descMatch?.[3] ?? "",
    ),
    mainAgent: /^\s*mainAgent\s*:\s*true\s*$/m.test(frontmatter),
    subagent: /^\s*subagent\s*:\s*true\s*$/m.test(frontmatter),
    effort: (effortMatch?.[1] || "").trim().toLowerCase(),
    tools,
    system: body,
  };
}

// mainAgent+subagent → all (owners); mainAgent only → primary (orchestrator);
// anything else → subagent (specialists, reviewers). Never defaults to primary
// except for the explicit orchestrator shape, so a malformed flag fails closed.
function toOpenCodeMode(
  mainAgent: boolean,
  subagent: boolean,
): "primary" | "subagent" | "all" {
  if (mainAgent && subagent) return "all";
  if (mainAgent) return "primary";
  return "subagent";
}

// effort → steps (V2 positive max). Unknown/missing → 8 (OpenCode doc example).
function toOpenCodeSteps(effort: string): number {
  if (effort === "high") return 12;
  if (effort === "medium") return 8;
  if (effort === "low") return 5;
  return 8;
}

// Custom frame-ship tools → V2 permission actions. Only actions we explicitly
// own are emitted; websearch/external_directory inherit the base policy.
//   view_file|list_dir → read | find_by_name → glob | grep_search → grep
//   write_to_file|replace_file_content → edit | run_command → shell
//   invoke_subagent|manage_subagents|send_message → subagent
//   ask_question → question | read_url_content → webfetch | skill → always allow
// Least privilege in practice: shell allow only for 3 executors
// (engineering/automation-specialist, quality-assurance), subagent allow only
// for orchestrator+8 owners, question allow only for orchestrator, webfetch
// allow only for 3 research specialists.
function toOpenCodePermissions(
  frameTools: string[],
): Array<{ action: string; resource: string; effect: "allow" | "deny" }> {
  const has = (name: string): boolean => frameTools.includes(name);
  const read = has("view_file") || has("list_dir");
  const edit = has("write_to_file") || has("replace_file_content");
  const delegation = has("invoke_subagent") || has("manage_subagents") || has("send_message");
  return [
    { action: "read", resource: "*", effect: read ? "allow" : "deny" },
    { action: "glob", resource: "*", effect: has("find_by_name") ? "allow" : "deny" },
    { action: "grep", resource: "*", effect: has("grep_search") ? "allow" : "deny" },
    { action: "edit", resource: "*", effect: edit ? "allow" : "deny" },
    { action: "shell", resource: "*", effect: has("run_command") ? "allow" : "deny" },
    { action: "subagent", resource: "*", effect: delegation ? "allow" : "deny" },
    { action: "question", resource: "*", effect: has("ask_question") ? "allow" : "deny" },
    { action: "webfetch", resource: "*", effect: has("read_url_content") ? "allow" : "deny" },
    { action: "skill", resource: "*", effect: "allow" },
  ];
}

interface ProvisionedAgent {
  id: string;
  displayName: string;
  description: string;
  mode: "primary" | "subagent" | "all";
  steps: number;
  hidden: boolean;
  frameTools: string[];
  system: string;
}

// Frame-ship tools → V2 Markdown permission map. Each V2 permission key gates
// a category of tools; "allow" grants, "deny" blocks. Only explicitly listed
// keys are emitted — omitted keys inherit the global config policy (last match
// wins per V2 permission model).
//   view_file|list_dir → read | find_by_name → glob | grep_search → grep
//   write_to_file|replace_file_content → edit | run_command → bash
//   invoke_subagent|manage_subagents|send_message → task
//   ask_question → question | read_url_content → webfetch | skill → allow
function toPermissionMap(
  frameTools: string[],
): Record<string, "allow" | "deny"> {
  const has = (name: string): boolean => frameTools.includes(name);
  return {
    read: has("view_file") || has("list_dir") ? "allow" : "deny",
    glob: has("find_by_name") ? "allow" : "deny",
    grep: has("grep_search") ? "allow" : "deny",
    edit: has("write_to_file") || has("replace_file_content") ? "allow" : "deny",
    bash: has("run_command") ? "allow" : "deny",
    task: has("invoke_subagent") || has("manage_subagents") || has("send_message")
      ? "allow"
      : "deny",
    question: has("ask_question") ? "allow" : "deny",
    webfetch: has("read_url_content") ? "allow" : "deny",
    skill: "allow" as const,
  };
}

// Serialize one agent to OpenCode V2 native markdown. Only keys V2 file
// discovery recognizes (description/mode/steps/hidden/permission + body =
// system). Frame-ship frontmatter (mainAgent/subagent/effort/custom tools) is
// translated, never copied verbatim. Permissions are embedded in the
// frontmatter `permission:` block so they survive V2's config reconciliation
// (runtime editor.update() mutations are overwritten by the host). C-level
// owners (mode "all") are emitted with `hidden: true` so dispatch flows
// through the visible orchestrator entry point.
function toAgentFileContent(agent: ProvisionedAgent): string {
  const perm = toPermissionMap(agent.frameTools);
  const permLines = Object.entries(perm)
    .map(([k, v]) => `  ${k}: ${v}`)
    .join("\n");
  return [
    "---",
    `description: ${yamlQuote(agent.description)}`,
    `mode: ${agent.mode}`,
    `steps: ${agent.steps}`,
    `hidden: ${agent.hidden}`,
    "permission:",
    permLines,
    "---",
    "",
    agent.system.trim(),
    "",
  ].join("\n");
}

const PROVISION_MANIFEST = ".frame-ship.json";

interface ProvisionManifest {
  version: string;
  files: Record<string, string>;
}

function parseManifest(raw: string): ProvisionManifest {
  try {
    const data = JSON.parse(raw || "") as Partial<ProvisionManifest>;
    const files =
      data && typeof data === "object" && data.files &&
        typeof data.files === "object"
        ? (data.files as Record<string, string>)
        : {};
    return {
      version: typeof data.version === "string" ? data.version : "",
      files,
    };
  } catch {
    return { version: "", files: {} };
  }
}

// Provision V2-native agent files into <project>/.opencode/agents/ so V2
// file discovery registers one id per file (<id>.md → id). V2 `AgentEditor`
// has no `add`, so without these files the update transform below has nothing
// to enrich and no frame-ship agent ever appears. Policy: write missing files;
// rewrite only our own stale files (content hash still matches the manifest
// record from a previous version — user-customized files are never touched);
// then the caller reloads the agent domain. Returns true when at least one
// file was written. Best-effort: false on any I/O failure.
async function provisionAgents(
  projectDir: string,
  agents: ProvisionedAgent[],
): Promise<boolean> {
  const clean = (projectDir || "").replace(/[/\\]+$/, "");
  if (!clean || agents.length === 0) return false;
  const dir = `${clean}/.opencode/agents`;
  if (!(await ensureDir(dir))) return false;
  const manifestPath = `${dir}/${PROVISION_MANIFEST}`;
  const manifest = parseManifest(await readTextFile(manifestPath));
  let wrote = false;
  for (const agent of agents) {
    const target = `${dir}/${agent.id}.md`;
    const content = toAgentFileContent(agent);
    const hash = hashText(content);
    if (!(await fileExists(target))) {
      if (!(await writeTextFile(target, content))) return false;
      manifest.files[agent.id] = hash;
      wrote = true;
      continue;
    }
    const recorded = manifest.files[agent.id];
    if (
      recorded !== undefined && recorded === hashText(await readTextFile(target)) &&
      manifest.version !== VERSION
    ) {
      // Our file from a previous version, untouched by the user → upgrade.
      if (!(await writeTextFile(target, content))) return false;
      manifest.files[agent.id] = hash;
      wrote = true;
    }
    // Hash mismatch (user customized) or up to date → never touch.
    if (recorded === undefined) {
      // Unknown pre-existing file (e.g. manual copy) — adopt without rewrite
      // so future version upgrades can refresh it if still untouched.
      const current = hashText(await readTextFile(target));
      if (current === hash) {
        manifest.files[agent.id] = hash;
        wrote = true;
      }
    }
  }
  if (wrote) {
    manifest.version = VERSION;
    await writeTextFile(manifestPath, JSON.stringify(manifest, null, 2));
  }
  return wrote;
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

    // ---- Agents lane (provision + update-in-place, sync transforms) ----
    // V2 `AgentEditor` has no `add`: ids are born in file discovery
    // (<project>/.opencode/agents/<id>.md → id), never in the transform. So
    // setup() first provisions V2-native files (with permission blocks that
    // survive V2's config reconciliation) from the canonical agents/*.md,
    // reloads the agent domain when anything was written, and then the sync
    // transform enriches every discovered id in place (name/description/mode/
    // system/steps/hidden).
    // Permissions live exclusively in the markdown frontmatter — runtime
    // editor.update() mutations for permissions are overwritten by the host.
    const agentsDir = resolveAgentsDir(fallbackBase);
    const pendingAgents: Array<{
      id: string;
      displayName: string;
      description: string;
      mode: "primary" | "subagent" | "all";
      steps: number;
      hidden: boolean;
      frameTools: string[];
      system: string;
    }> = [];
    if (agentsDir && agentsDir !== "/agents") {
      for (const id of AGENT_FILES) {
        const raw = await readTextFile(`${agentsDir}/${id}.md`);
        if (!raw) continue;
        const parsed = parseAgentFile(raw);
        const displayName = parsed.name || id;
        if (!parsed.system) continue;
        const mode = toOpenCodeMode(parsed.mainAgent, parsed.subagent);
        pendingAgents.push({
          id,
          displayName,
          description: parsed.description || displayName,
          mode,
          steps: toOpenCodeSteps(parsed.effort),
          // C-levels (the 8 owners, mode "all") stay out of the @ autocomplete
          // menu — dispatch flows through orchestrator (primary, visible).
          hidden: mode === "all",
          frameTools: parsed.tools,
          system: parsed.system,
        });
      }
    }
    if (pendingAgents.length > 0 && fallbackBase) {
      let provisioned = false;
      try {
        provisioned = await provisionAgents(fallbackBase, pendingAgents);
      } catch {
        provisioned = false;
      }
      if (provisioned) {
        try {
          await ctx.agent.reload();
        } catch {
          // Best-effort: the update transform below still applies to whatever
          // discovery has already loaded (e.g. manually-copied files).
        }
      }
      await ctx.agent.transform((editor) => {
        for (const a of pendingAgents) {
          // Update only what discovery already loaded. Missing ids are skipped
          // by design (fresh files arrive via the reload above). Permissions
          // are intentionally NOT mutated here — they live in the markdown
          // frontmatter and survive V2's host reconciliation.
          if (editor.get(a.id) === undefined) continue;
          editor.update(a.id, (agent) => {
            agent.name = a.displayName as unknown as typeof agent.name;
            agent.description = a.description || agent.description;
            agent.mode = a.mode;
            agent.system = a.system;
            agent.steps = a.steps;
            agent.hidden = a.hidden;
          });
        }
      });
    }
    // Default entry point. Always registered (never gated on parse/provision
    // success) and presence-guarded: orchestrator becomes default only when
    // discovery knows it. Config equivalent: "default_agent": "orchestrator".
    await ctx.agent.transform((editor) => {
      if (editor.get("orchestrator") !== undefined) {
        editor.default("orchestrator");
      }
    });

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
