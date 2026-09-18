# Spec: Grilling-Style Challenge Plug-in (C1–C4) — Security Domain

**ID:** SPEC-grilling-integration-security
**Owner:** barrera — security owner
**Domains-Touched:** [engineering, people, security] (this slice: security only)
**Brief Reference:** docs/briefs/BRIEF-grilling-integration.md (read-only) + docs/briefs/OKR-grilling-integration.md
**Status:** draft
**Priority:** P0 (security bar)
**Execution_Mode:** multi-subagents (inherited from brief; max 2 parallel lanes; per-SPEC override only with orchestrator waiver)

## 1. Context

Frame-ship gates have rigor (STRIDE verdicts, ADR invariants, gate refuter, debugging Iron Law) but late-gate weakness: `quality-gate` CONDITIONALs/waivers can pass on thin justification, and `verify-handoff` DoD can accept attestation-grade evidence links. This security slice defines the non-negotiable bar for the grilling plug-in's challenge lanes C1–C4: C3 waiver justification quality (accepted-risk + compensating-controls + expiry wording), PII/masking constraints for every grill round, and residual-risk ownership. No new stage, no new skill dir, no new reviewer; no STRIDE/ADR core changes beyond the C3 scrutiny lane. Tone stays warm, opt-in + exit hatch; retry N=2 → escalate and CLOSED authority hold throughout.

## 2. Requirements

- REQ-SEC-001 (C3 waiver quality bar): every CONDITIONAL/waiver interrogated in the C3 lane MUST contain all three blocks — `Accepted-risk` + `Compensating-controls + owner` + `Expiry/Re-review date-or-condition + owner` — else FAIL, no promotion.
- REQ-SEC-002 (C3 lane authority limit): grill interrogation NEVER overturns CLOSED; CLOSED stays CLOSED without recorded `domain-owners + orchestrator` sign-off; full re-review explicitly banned.
- REQ-SEC-003 (PII/masking in grill rounds C1–C4): zero PII/secrets/tokens/credentials/sessions in grill questions, answers, prompts, logs, examples, or exports; masking rules ride every export.
- REQ-SEC-004 (Boundary hygiene per lane): every grill prompt/adapter/event/log/export at C1–C4 is a declared PII checkpoint with mask/tokenize + allowlist; wide/cross-tenant disclosure = finding.
- REQ-SEC-005 (Residual-risk ownership): every C3-interrogated CONDITIONAL and every C4 evidence-link FAIL lists `residual-risk + owner`; APPROVE+conditions with silent PASS = FAIL.
- REQ-SEC-006 (No freelance fixes from grill): grill findings never self-remediate — never rotate keys, patch prod, or widen perms; report `severity + location + evidence`, owner remediates.
- REQ-SEC-007 (Proof-or-refuted + triage SLA): grill-surfaced security finding without `diff/scan/log` proof = REFUTED; Critical/High with proof surfaces same session with `severity + evidence + owner`, no batching.

### Non-Functional

- REQ-SEC-NF-001 (Deny-by-default): deny-by-default holds across C1–C4; 0 unwaived security findings ship; waiver record path required. (Namespaced `SEC-NF` to stay unique vs engineering `REQ-NF-001/002` — placement mechanic only.)
- REQ-SEC-NF-002 (Ley 172-13 minimization): minimum PII in grill corpus; flow mapped `source → store → log → third-party`; every PII store declares `purpose + TTL + deletion`.
- REQ-SEC-NF-003 (C3 wording template, normative): `Accepted-risk: [risk + why] / Compensating-controls: [control + owner + evidence-ref] / Expiry: [date/condition + re-review owner] / Sign-off: [domain-owners + orchestrator]` — all waivers match this structure.

## 3. Acceptance Criteria

- [ ] AC-SEC-001: waiver sample vs bar — any C3 waiver missing one of the three blocks fails review.
- [ ] AC-SEC-002: SKILL wording + gate record show CLOSED-authority rule intact and re-review ban in text.
- [ ] AC-SEC-003: secret/PII scan log on a sample round + export shows 0 raw PII/secrets.
- [ ] AC-SEC-004: checkpoint table present; allowlisted export sample only.
- [ ] AC-SEC-005: gate packet residual statement lists risk + owner or explicit "none" — no silent PASS.

## 4. Contracts & Interfaces

- Output targets (skill-text only, no runtime change): `skills/quality-gate/SKILL.md` + `references/gate-report.md` / `waiver-template.md` (C3 bar + ban + authority); `skills/verify-handoff/SKILL.md` + `references/dod-checklist.md` (evidence-link + residual). No `API_CONTRACTS.md` change.
- Sign-off contracts: security owner (this spec — waiver + residual bar); engineering owner (C1–C4 wiring — own spec); people owner (tone/attention/opt-in — own spec).
- Handoff packet to `propose-changes`: `SPEC:docs/specs/20_backlog/SPEC-grilling-integration-security.md#REQ-SEC-001..007 / HARD:multi-subagents+no-PII-in-rounds+masking-on-exports+CLOSED-stays-CLOSED / GATE:none-yet / DOMAINS:[engineering,people,security]`.

## 5. Out of Scope

Restated from BRIEF-grilling-integration (read-only, no reinterpretation):

- New skill directory, new stage, or new reviewer role — reuse existing reviewers/templates only.
- Changes to `review-security` STRIDE core or `review-architecture` ADR core beyond the C3 scrutiny lane.
- Mid-`execute-spec` interruption, worktree isolation changes, or per-REQ commit rhythm changes.
- `ship-release` rollback re-litigation or archive mechanics changes.
- Verbatim copy of external `grilling` text without LICENSE verification + attribution.
- `debugging` Iron Law, `git-worktree` mechanics, or `pull-request` budget changes.

## 6. Dependencies

- BRIEF-grilling-integration (approved 2026-09-18) + OKR-grilling-integration (KR-2.1, KR-2.2); skills/AGENTS.md conventions.
- Cross-domain inputs (by reference): engineering-owner spec (C1–C4 mechanics), people-owner spec (tone/attention/opt-in wording).
- Open-question owners (escalations, not resolved here): orchestrator (external grilling LICENSE + attribution); engineering + people owners (exact C1 per-classification question budget — assumed masking cost excluded); security owner (this bar — now defined).
- No runtime/plugin dependency; `mise run typecheck` unaffected (docs-only SPEC cycle).

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence | Brief OKR |
|-------------|---------------------|-----------------|----------|-----------|
| REQ-SEC-001 | AC-SEC-001 | PROPOSED_CHANGES.md | waiver sample vs three-block bar | KR-2.1 |
| REQ-SEC-002 | AC-SEC-002 | PROPOSED_CHANGES.md | CLOSED-authority + re-review ban text + gate record | KR-2.1 |
| REQ-SEC-003 | AC-SEC-003 | PROPOSED_CHANGES.md | secret/PII scan log on round + export | Brief Constraints Regulatory |
| REQ-SEC-004 | AC-SEC-004 | PROPOSED_CHANGES.md | checkpoint table + allowlisted export sample | Guardrails 6/8 |
| REQ-SEC-005 | AC-SEC-005 | PROPOSED_CHANGES.md | gate residual statement (risk + owner) | KR-2.1/KR-2.2 |
| REQ-SEC-006 | AC-SEC-005 | PROPOSED_CHANGES.md | no-freelance-fix scan | Guardrail 4 |
| REQ-SEC-007 | AC-SEC-005 | PROPOSED_CHANGES.md | finding sample + triage log (proof-or-refuted, same-session C/H) | Guardrails 1/9/10 |
| REQ-SEC-NF-001..003 | AC-SEC-001..005 | PROPOSED_CHANGES.md | deny-by-default + flow map + template conformance | Guardrails 1–11 |
