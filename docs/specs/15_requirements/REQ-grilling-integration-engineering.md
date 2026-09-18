# Requirements Index: Grilling-Style Challenge Plug-in (C1–C4)

**Owner:** engineering owner
**Brief Reference:** BRIEF-grilling-integration
**Domains-Touched:** [engineering, people, security]

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-001 | C1 classification-scaled challenger (spike 1 / bounded 2–3 / architectural full) + falsifiable-bet prompt, recorded in `Framings-Considered`, one-at-a-time, opt-in + exit hatch, one-way ratchet | P0 | BRIEF-grilling-integration | SPEC-grilling-integration-engineering | engineering | review |
| REQ-002 | C2 pre-approval grill trigger (auth/data/API/PII, multi-domain, customer/regulator/revenue blast radius, approver request) + one-pass budget, then approve/reject; repo untouched | P0 | BRIEF-grilling-integration | SPEC-grilling-integration-engineering | engineering | review |
| REQ-003 | C3 refuter-amplification + CONDITIONAL/waiver interrogation lane only; full re-review banned; CLOSED stays CLOSED without domain-owners + orchestrator sign-off | P0 | BRIEF-grilling-integration | SPEC-grilling-integration-engineering | engineering | review |
| REQ-004 | C4 REQ→evidence-link presence check; missing = FAIL, no handoff; re-litigation of settled verdicts banned (return to `execute-spec` with findings) | P0 | BRIEF-grilling-integration | SPEC-grilling-integration-engineering | engineering | review |
| REQ-005 | Plug-in invariants: no new skill dir/stage/reviewer; zero new deps; warmth preserved; opt-in + exit hatch mandatory C1–C4 | P0 | BRIEF-grilling-integration | SPEC-grilling-integration-engineering | engineering | review |
| REQ-006 | Chain invariants: proposal-before-code, STRIDE on auth/data/API, ADR on contract change, no handoff on CLOSED without waiver, N=2 → escalate, reference-only packets | P0 | BRIEF-grilling-integration | SPEC-grilling-integration-engineering | engineering | review |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | No PII/secrets in grill rounds; masking rules ride every export | Security | guardrails 1–8 pass; 0 findings |
| REQ-NF-002 | Attention budget: one question at a time (C1), one-pass budget (C2), surgical lane only (C3), presence-check only (C4) — no unbounded interrogation | Usability | wording present in all four touchpoints |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| people | Tone/attention/opt-in guardrail sign-off across C1–C4; "relentless" mode excluded | people owner |
| security | Waiver scrutiny quality bar (accepted-risk + compensating-controls + expiry) + residual-risk bar preserved; no sideways override | security owner |
