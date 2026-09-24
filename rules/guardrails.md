# frame-ship — Guardrails

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

**Enforcement**: each domain's gates are checked in its own tooling. Violations block the corresponding action. Exceptions require written approval from the domain owner plus a remediation plan with deadline. Residual risk is always explicit — **no silent PASS**.
