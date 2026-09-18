# Requirements Index: Grilling-Style Challenge Plug-in (Security)

**Owner:** barrera — security owner
**Brief Reference:** BRIEF-grilling-integration
**Domains-Touched:** [security] (full initiative: engineering, people, security)
**Spec:** docs/specs/20_backlog/SPEC-grilling-integration-security.md
**Workspace Draft:** docs/specs/40_workspace/security/SPEC-grilling-integration-security.md
**Execution_Mode:** multi-subagents
**Note on IDs:** REQ-IDs use `REQ-SEC-001..007` + `REQ-SEC-NF-001..003` so they stay unique vs engineering `REQ-001..006` + `REQ-NF-001/002`; the `SEC-NF` namespacing is a placement mechanic only, no content change.

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-SEC-001 | C3 waiver quality bar: every CONDITIONAL/waiver interrogated in C3 lane contains Accepted-risk + Compensating-controls + owner + Expiry/Re-review + owner, else FAIL | P0 | BRIEF-grilling-integration (Scope [security] + Open Q C3 wording), OKR KR-2.1 | SPEC-grilling-integration-security | security | review (waiver sample vs bar) |
| REQ-SEC-002 | C3 lane authority limit: grill NEVER overturns CLOSED; CLOSED stays CLOSED without domain-owners + orchestrator sign-off; full re-review banned | P0 | BRIEF-grilling-integration (Scope C3 + Chain invariants), OKR KR-2.1 | SPEC-grilling-integration-security | security | review (SKILL wording + gate record) |
| REQ-SEC-003 | PII/masking in grill rounds C1–C4: zero PII/secrets/tokens/credentials/sessions in questions/answers/prompts/logs/examples/exports; masking rides every export | P0 | BRIEF-grilling-integration (Constraints Regulatory), Guardrails 1/5/6/8 | SPEC-grilling-integration-security | security | test (secret/PII scan log) |
| REQ-SEC-004 | Boundary hygiene per lane: every grill prompt/adapter/event/log/export is a PII checkpoint with mask/tokenize + allowlist; wide/cross-tenant = finding | P0 | Guardrails 6, BRIEF Constraints Regulatory | SPEC-grilling-integration-security | security | review (checkpoint table) |
| REQ-SEC-005 | Residual-risk ownership: every C3 CONDITIONAL + C4 FAIL lists residual-risk + owner; silent PASS = FAIL | P0 | OKR KR-2.1/KR-2.2, Guardrail 11 | SPEC-grilling-integration-security | security | review (gate residual statement) |
| REQ-SEC-006 | No freelance fixes from grill: never rotate keys/patch prod/widen perms; report severity + location + evidence, owner remediates | P0 | Guardrail 4, BRIEF Out of Scope | SPEC-grilling-integration-security | security | review (no-freelance-fix scan) |
| REQ-SEC-007 | Proof-or-refuted + triage SLA: finding without diff/scan/log proof = REFUTED; Critical/High with proof surfaces same session with severity + evidence + owner | P0 | Guardrails 1/9/10 | SPEC-grilling-integration-security | security | test (finding sample + triage log) |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-SEC-NF-001 | Deny-by-default across C1–C4; 0 unwaived security findings ship; waiver record path required | Security | 0 unwaived findings at gate |
| REQ-SEC-NF-002 | Ley 172-13 minimization: minimum PII, flow source → store → log → third-party mapped; every PII store declares purpose + TTL + deletion | Privacy | flow map present; 0 raw PII in shares |
| REQ-SEC-NF-003 | C3 wording template normative: Accepted-risk / Compensating-controls + owner + evidence-ref / Expiry + re-review owner / Sign-off domain-owners + orchestrator | Governance | all waivers match template structure |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| security | Waiver three-block bar + CLOSED authority + PII checkpoints + residual ownership + proof-or-refuted in C3/C4 lane refs | barrera |
| engineering | C1–C4 mechanics complement (no duplication): engineering owns *how* to grill, security owns *what must be refused/masked/allowlisted/capped* | engineering owner |
| people | Tone/attention/opt-in wording DX reviewed for PII hygiene; wording changes via Cross-domain request only | people owner |

## Traceability Anchor

| Layer | Files | REQ-IDs |
|-------|-------|---------|
| Waiver + authority | `skills/quality-gate/SKILL.md`, gate-report/waiver refs, gate record | REQ-SEC-001, REQ-SEC-002, REQ-SEC-NF-001, REQ-SEC-NF-003 |
| PII + boundaries | sample C1–C4 round + export packet, secret/PII scan log | REQ-SEC-003, REQ-SEC-004, REQ-SEC-NF-002 |
| Residual + conduct | gate residual statement, no-freelance-fix scan, triage log | REQ-SEC-005, REQ-SEC-006, REQ-SEC-007 |
