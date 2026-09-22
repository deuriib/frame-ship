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
const GUARDRAILS_MINIMAL = `${MARKER} Guardrails (minimal — one line per domain; full text: rules/guardrails.md, canonical truth: AGENTS.md):
Software Development Core: atomic ticketed Conventional Commits; short-lived branches, rebase before merge, no push to main; peer review, no self-merge; CI fails on Critical/High; pinned deps + daily CVE scan; secrets in vault/env only.
Security: deny by default, fail closed; no secrets anywhere — claim without proof (diff/scan/log) = REFUTED; OWASP Top 10 at every trust boundary; least privilege, short-lived creds, MFA; TLS/HSTS/CSP defaults; report severity+location+owner, no freelance fixes; SAST/DAST/SCA in CI, annual pen test.
Privacy (Ley 172-13): minimize; PII checkpoints at every port/adapter/event/log/prompt/export (mask/tokenize, allowlists); each store declares purpose+TTL+deletion; PASS exports allowlisted evidence only; data-subject rights; approved jurisdictions only; DPIA for high-risk; breach notice within 72h.
Severity: Critical=fix now+block release; High=fix before next release; Medium=this sprint; Low=backlog. Surface Critical/High same session with severity+evidence+owner; residual risk explicit, no silent PASS; accepted risks get owner+justification+expiry.
Conduct: no sugarcoating, one point per paragraph, no busywork; state assumptions on irreversible calls; FAIL→retry N=2 differently→escalate, no third loop; blameless post-mortems, own mistakes; ADRs for decisions; respect deadlines, no scope creep, flag risks early.
Architecture: ADR per significant decision (context/options/decision/consequences); modular, loosely coupled, cohesive; design for failure (circuit breakers, backoff, timeouts, bulkheads); no SPOF; contract-first versioned APIs; scalability, maintainability, observability from day one.
Testing: unit>integration>E2E, fast/isolated/deterministic; ≥80% coverage critical paths + mutation testing core logic; no flaky tests (quarantine+fix ≤24h); SAST/DAST/dep/secret scans, annual pen test; load/stress/soak pre-release; WCAG 2.1 AA; no PII in test data.
Documentation: README; up-to-date OpenAPI/Swagger; runbooks for ops/incidents/rollbacks; Keep a Changelog; comments explain why; C4 diagrams updated with architecture.
Performance: SLOs/SLIs for user-facing services; load test before release with baselines; optimize critical paths; monitor latency/throughput/error rates, alert on SLO breach.
Reliability: error budgets; chaos engineering in staging + graceful degradation; tested backups + documented, rehearsed DR; monitoring/alerting + on-call rotation; incident severity levels, comms plan, blameless post-mortems.
Accessibility: WCAG 2.1 AA; keyboard + screen-reader compatible; contrast ≥4.5:1, alt text, ARIA; no regressions — automated checks in CI.
Internationalization: externalize all strings; RTL + locale-aware dates/numbers/currency; Unicode + UTC storage/local display; translation workflow under version control.
Data Management: lifecycle ingestion→storage→processing→archival→deletion; quality checks + lineage at ingestion; tested restores; governance: ownership, classification, retention.
AI/ML: fairness, bias mitigation, transparency; explainability + human-in-the-loop for critical decisions; model versioning, reproducible training, private training data; drift monitoring + retraining triggers + safe-default fallback; no PII in prompts unless approved and masked.
Incident Response: severity levels + on-call + escalation paths; runbooks + comms templates; blameless post-mortems with tracked action items; breach notification per legal requirements.
General: automate manual steps; IaC versioned, reviewed, tested; env parity dev/staging/prod; feature flags + kill switches; logs/metrics/traces with correlated IDs; cost awareness.
Type Safety: no \`any\` (strict; unknown+narrowing, generics, discriminated unions; strict equivalents per language); no \`as\`/non-null \`!\`/\`ts-ignore\` without proof or ticket; correct annotations everywhere, readonly by default.
Code Structure: pure functions, isolated side effects; DI, no global mutable state; no circular deps/dead code/commented code/ticketless TODOs; single responsibility, small functions, early returns; composition over inheritance; no magic numbers/strings.
Error Handling: no empty catch/catch-all — wrap with context; validate at boundaries; fail fast, fail closed, no silent failures; no exceptions for control flow; always release resources.
Concurrency: immutability + message passing first; document lock ordering; bounded queues + backpressure; idempotent retries; timeouts + jittered retries + circuit breakers; graceful shutdown + health checks.
Security & Privacy in Code: parameterized queries; encode output (XSS/CSRF/SSRF/path-traversal safe); no eval, untrusted deserialization, or shell injection; secure random + argon2/bcrypt; TLS verify; no secrets in code/config/logs, no PII in logs/prompts/exports; least privilege per interface/key/role.
Testing & Quality: unit>integration>E2E; no flaky tests, no sleep; ≥80% critical coverage + mutation testing; SAST/DAST/SCA/secret scan in CI; no PII in test data; WCAG 2.1 AA automated+manual.
Observability: structured logs only (no console.log, no PII); metrics, traces, correlated IDs; SLOs/SLIs + breach alerts; audit logs for sensitive actions.
Dependencies & Supply Chain: pin versions, minimal deps, daily CVE scan; license compatibility, SBOM, reproducible builds; signed commits/artifacts, provenance; no unmaintained libraries.
`;

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
