# Proposed Changes: {{AGENT_ROLE}}

**Spec Reference:** SPEC-XXX
**Agent:** [name]
**Date:** YYYY-MM-DD
**Execution_Mode:** single | multi-subagents (inherited from spec)
**Domains-Touched:** [engineering | security | finance | legal | marketing/brand | people | revenue | automation/ops — delete as applicable, must match spec]

## Summary

[What this agent proposes to do, in 2-3 sentences]

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `api/v2/users.ts` | file-modify | Add pagination params |
| `contracts/MSA-v3.md` | document-create | Redline liability cap per SPEC-XXX |
| `campaigns/launch-q3.md` | campaign-update | Reposition messaging per marketing owner brief |
| `policies/retention.md` | policy-update | Set PII TTL + deletion path |
| `workflows/billing-close.md` | workflow-update | Add finance owner sign-off step |

Change types: `file-create | file-modify | file-delete | document-create | campaign-update | contract-update | policy-update | model-update | workflow-update | config-update`. Engineering proposals use `file-*`; non-engineering proposals use document/campaign/contract/policy/workflow rows — same table, no forced file path.

## Rationale

[Why these changes satisfy the spec]

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| [approach] | [why not] |

## Approval Required From

- [ ] Owning domain owner: [engineering owner | security owner | finance owner | legal owner | marketing owner | people owner | revenue owner | automation owner — per Domains-Touched]
- [ ] engineering owner (if architecture/API/model/cross-cutting impact)
- [ ] security owner (if auth/data/external-API/PII impact)

> **Rule:** No repository file modifications during proposal phase. For non-code domains, no external sends/filings/launches during proposal phase either.

## C2 challenge hook (REQ-002 — additive, no new required section)

- Trigger checklist — challenge round fires on ANY: auth/data/API/PII surface;
  multi-domain scope; blast radius mentioning customers/regulators/revenue
  (synonyms fire: customers/users/clients/members/consumers; regulators/GDPR/
  Ley 172-13/authorities; revenue/pipeline/quota/money; independent
  blast-radius + API-surface scan fires even when prose says "internal only");
  approver request.
- One-pass budget: exactly one budgeted round per trigger (pass = ≤3
  questions; question 4 (N+1) = FAIL, blocked), then terminal
  approve/reject; approver-requested re-challenge ≤1 extra pass (total ≤2),
  then Retry N=2 → escalate orchestrator; pause/exit offered
  after the round. Exit before decision = pause + recorded `grill: exited` +
  escalate, proposal stays unapproved (no silent promote).
- Masking reminder: grill prompt + every export carry the people SPEC §4
  masking clause ("Por tu privacidad: no compartas PII/secretos/tokens en esta
  ronda; enmascaramos todo export (Ley 172-13)."); allowlisted evidence only.
- Single source: glossary lives once in C1 (`skills/frame-intent/SKILL.md` §C1); opener/warmth/masking canonical wording lives in people SPEC §4 inserts 1–6 — this hook points there, never redefines.
