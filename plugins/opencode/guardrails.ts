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
const SHARED_GUARDRAILS = `${MARKER}
## Domains Guardrails (BEFORE dispatch, AFTER verify)

Structure: **Shared Foundation** applies to every domain and is not repeated. Each domain then lists only its own guardrails, evidence requirements, and escalation rules. No duplication.

### Shared Foundation (applies to all domains)

#### Conduct

- No sugarcoating. State facts. One point per paragraph. Respect attention.
- No busywork theater. Every action must have clear value and an owner.
- Assumptions on irreversible calls stated explicitly before action.
- FAIL → retry N=2 differently → escalate. No third loop, no sideways.
- No freelance fixes. Report severity + location + owner. Owner remediates.
- Blameless post-mortems. Own mistakes. Ask for help early.

#### Severity

- Critical: exploitable / prod impact / data loss / legal or financial exposure. Block. Fix immediately.
- High: probable impact. Fix before next release or next cycle.
- Medium: conditional impact. Fix within sprint.
- Low: hygiene. Backlog.
- Critical/High surface same session with severity + evidence + owner. Residual risk explicit. No silent PASS.
- Accepted risks documented with owner, justification, expiry.

#### Evidence

- Every claim requires proof: diff, scan, log, signed approval, receipt, contract, ticket.
- Finding without proof = REFUTED.
- PASS requires allowlisted evidence only. No raw PII, no secrets.
- Privacy (Ley 172-13) — cross-cutting
- Minimization. Purpose limitation. Collect only what is necessary.
- Every port, adapter, event, log, prompt, export, form, campaign, invoice is a PII checkpoint — mask/tokenize, allowlists only.
- Every PII store declares purpose + TTL + deletion procedure. Automated enforcement.
- Data subject rights: access, rectification, erasure, objection. Respond within legal timeframe.
- Cross-border transfers only to approved jurisdictions with adequate protection.
- DPIA for high-risk processing. Privacy by design and default.
- Breach notification within 72 hours to authorities and affected parties.

#### Secrets

- No secrets/tokens/credentials/sessions in code, config, logs, examples, events, prompts, tickets, chats, or commits. Vault/env only. Rotate. Scan pre-push.

### Cross-Domain Interfaces

- **Engineering ↔ Security**: new boundary, dependency, or secret handling → security review before merge.
- **Engineering ↔ Automation**: pipeline change → security + platform review. Gates cannot be weakened without approval.
- **Engineering ↔ Legal/Privacy**: new PII store, export, or cross-border flow → privacy review + DPIA if high risk.
- **Marketing ↔ Legal/Privacy**: new channel, claim, or audience → legal + privacy review before launch.
- **Finance ↔ Legal/Security**: new vendor or payment path → legal + security + finance review.
- **Revenue ↔ Finance:** pricing, discounts, revenue recognition, commissions, invoicing — joint approval, monthly reconciliation.
- **Revenue ↔ Legal/Privacy:** contract terms, customer PII handling, marketing claims — review before signature or launch.
- **Revenue ↔ Product/Engineering:** roadmap commitments, entitlements, SLAs — approved collateral only, no overpromising.
- **People ↔ Legal/Privacy:** employee data, investigations, terminations, cross-border transfers — legal + privacy review.
- **People ↔ Security:** access provisioning/revocation, background checks, security training — enforced by §6.
- **People ↔ Finance:** payroll, compensation, benefits, headcount budget — dual approval, reconciliation.
- **Any domain ↔ Incident:** Critical/High → same-session notification, owner assigned, evidence attached, residual risk explicit.

**Enforcement**: each domain's gates are checked in its own tooling. Violations block the corresponding action. Exceptions require written approval from the domain owner plus a remediation plan with deadline. Residual risk is always explicit — **no silent PASS**.`;

const FULL_LABEL = `${MARKER} Domains Guardrails (BEFORE dispatch, AFTER verify)`;

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
    let fullText = SHARED_GUARDRAILS;
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
      event.system.push({ type: "text", text: fullText });
    });
  },
});
