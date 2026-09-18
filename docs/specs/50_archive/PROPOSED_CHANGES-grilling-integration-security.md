# Proposed Changes: barrera — security lane C3+C4 (grilling integration)

**Spec Reference:** `docs/specs/20_backlog/SPEC-grilling-integration-security.md#REQ-SEC-001..007` (canonical per orchestrator COND-S4 ruling; `50_archive/` copy is terminal history) + `docs/specs/10_design/SPEC-grilling-integration-engineering.md#REQ-003..004` + people slice `docs/specs/10_design/SPEC-grilling-integration-people.md#REQ-P-001..006` (woven by reference) + brief `docs/briefs/BRIEF-grilling-integration.md` (read-only, approved 2026-09-18)
**Agent:** barrera (CISO) — domain chain owner, security
**Date:** 2026-09-18
**Execution_Mode:** multi-subagents (max 2 parallel lanes; inherited from brief; per-SPEC override only with orchestrator waiver)
**Domains-Touched:** [engineering, people, security] — this proposal owns: security (lane C3+C4 only)
**Packet:** SPEC:docs/specs/40_workspace/security/SPEC-grilling-integration-security.md#REQ-SEC-001..007 + engineering REQ-003..004 + people REQ-P-001..006 / HARD:multi-subagents(max-2)+repo-untouched-except-singleton+reference-only-packets+retry-N=2→escalate+CLOSED-stays-CLOSED+full-re-review-banned(C3)+re-litigation-banned(C4)+waiver-TTL-90d-or-next-release(proposed-default-needs-orchestrator-confirmation) / GATE:specs-complete / DOMAINS:[engineering,people,security]
**Skill:** `skills/propose-changes/SKILL.md` via `frame-ship:propose-changes` (template: `skills/propose-changes/references/proposal-template.md`; risk: `skills/propose-changes/references/risk-assessment.md`)

## Summary

Surgical skill-text-only bar for the grilling plug-in's late gates: C3 interrogates every CONDITIONAL/waiver in `quality-gate` against the normative three-block bar (Accepted-risk / Compensating-controls+owner / Expiry+owner) with refuter-amplification, and C4 enforces REQ→evidence-link presence in `verify-handoff` where missing link = FAIL. CLOSED authority, full re-review ban (C3), re-litigation ban (C4), deny-by-default, and PII/masking rules hold throughout; no new stage, skill dir, reviewer, or runtime change.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `skills/quality-gate/SKILL.md` | file-modify | Add C3 surgical lane only: amplify existing refuter output + interrogate CONDITIONAL/waiver justification against three-block bar. Explicit bans in text: full re-review banned; CLOSED stays CLOSED without recorded `domain-owners + orchestrator` sign-off; retry N=2 → escalate. No routing-table change. (REQ-SEC-001, REQ-SEC-002; eng REQ-003) |
| `skills/quality-gate/references/waiver-template.md` | file-modify | Harden to normative wording: `Accepted-risk: [risk + why] / Compensating-controls: [control + owner + evidence-ref] / Expiry: [date/condition + re-review owner] / Sign-off: [domain-owners + orchestrator]`. Missing block = FAIL, no promotion. Add `Expiry default: 90 days or next release (proposed default — needs orchestrator confirmation)` + `Residual-risk + owner` line. (REQ-SEC-001, REQ-SEC-005, REQ-SEC-NF-003) |
| `skills/quality-gate/references/gate-report.md` | file-modify | Add C3 interrogation record row (waiver sample vs three-block bar: pass/fail per block) + `Residual-risk + owner` statement (or explicit `none + owner`); silent PASS = FAIL. No verdict-shape change beyond added rows. (REQ-SEC-001, REQ-SEC-005) |
| `skills/verify-handoff/SKILL.md` | file-modify | Add C4 presence check: every REQ links evidence (test/scan/log/review-link), not a tick; missing link = FAIL, no handoff. Explicit ban: re-litigation of settled gate verdicts banned — findings return to `execute-spec` instead. N=2 + `SPEC/HARD/GATE/DOMAINS` packets preserved. (REQ-SEC-005; eng REQ-004) |
| `skills/verify-handoff/references/dod-checklist.md` | file-modify | Tighten Common line to: `All REQ-IDs have linked evidence (link present; attestation-alone = FAIL)`. Add security-lane note: C4 FAIL lists `residual-risk + owner`. No other DoD change. (REQ-SEC-005) |
| PII/masking guardrail inserts (ride both lanes) | file-modify | Carry REQ-SEC-003/004 + REQ-P-006 co-sign into touched refs: zero PII/secrets/tokens/credentials/sessions in grill questions/answers/prompts/logs/examples/exports; every prompt/adapter/event/log/export is a declared PII checkpoint (mask/tokenize + allowlist); allowlisted evidence only; Ley 172-13 minimization. Wide/cross-tenant disclosure = finding. |

Change types per `proposal-template.md`: skill-text edits use `file-modify`; no `API_CONTRACTS.md`, runtime, or dep change.

## Rationale

- REQ-SEC-001 → three-block bar in waiver template + C3 interrogation record makes thin CONDITIONALs unfailable-by-politeness; sample-vs-bar is the AC-SEC-001 test.
- REQ-SEC-002 → CLOSED-authority + re-review-ban wording in `quality-gate/SKILL.md` preserves gate authority (C3 scrutiny never becomes override).
- REQ-SEC-003/004 + REQ-SEC-NF-002 → PII/masking + checkpoint table ride every grill round/export; secret/PII scan log on sample round + export is AC-SEC-003/004 evidence.
- REQ-SEC-005 + REQ-SEC-NF-001 → residual-risk + owner on every C3 CONDITIONAL and C4 FAIL; silent APPROVE+conditions = FAIL; 0 unwaived findings ship.
- REQ-SEC-006 → no-freelance-fix clause: grill findings report `severity + location + evidence`, owner remediates; never rotate keys/patch prod/widen perms.
- REQ-SEC-007 → proof-or-refuted + triage SLA: finding without `diff/scan/log` = REFUTED; Critical/High with proof surfaces same session.
- Eng REQ-003/004 + people REQ-P-001..006 woven by reference only: engineering owns *how* to grill, people owns tone/attention/opt-in wording; this lane owns *what must be refused/masked/allowlisted/capped*. No reinterpretation of brief (read-only).

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Full re-review inside C3 (re-run routing table on CONDITIONAL) | Banned by HARD C3 + REQ-SEC-002; violates surgical-lane + attention budget (REQ-P-005); escalate, don't re-litigate |
| New reviewer role / new skill dir for grilling scrutiny | Out of scope per brief + both SPECs §5; reuse `security-reviewer` + existing templates only |
| Attestation-grade evidence links accepted at C4 | Rejected by REQ-SEC-005 + eng REQ-004: missing link = FAIL; attestation-alone = FAIL |
| Silent PASS on APPROVE+conditions (no residual line) | Rejected by Guardrail 11 + REQ-SEC-005: silent PASS = FAIL |
| Self-remediation of grill findings (rotate/patch/widen) | Banned by Guardrail 4 + REQ-SEC-006; report, owner remediates |

## Risk Assessment (MANDATORY — PII/auth/data surface)

### Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-SEC-001 | Thin waiver passes C3 (missing block promoted) | Med | High | Normative template + interrogation record; missing block = FAIL enforced in SKILL text; gate sample-vs-bar at review |
| R-SEC-002 | PII/secret leaks into grill round, log, or export sample | Med | High | Zero-PII rule + checkpoint mask/tokenize + allowlisted evidence only; secret/PII scan log required evidence; Ley 172-13 minimization (REQ-SEC-NF-002) |
| R-SEC-003 | C3 scrutiny drifts into full re-review / CLOSED override | Low | High | Authority-limit wording + re-review ban in SKILL text; CLOSED stays CLOSED without domain-owners + orchestrator; retry N=2 → escalate |
| R-SEC-004 | C4 presence check becomes re-litigation of settled verdicts | Low | Med | Re-litigation ban + return-to-`execute-spec` routing in SKILL text; people anti-fatigue budget (REQ-P-005) |
| R-SEC-005 | Silent residual (APPROVE+conditions without risk+owner) ships | Med | High | Residual-risk + owner mandatory line in gate-report + dod-checklist; silent PASS = FAIL |
| R-SEC-006 | Freelance fix from grill (key rotation / prod patch / perm widen) | Low | High | No-freelance-fix clause; report severity+location+evidence, owner remediates (Guardrail 4) |
| R-SEC-007 | Waiver TTL drifts unbounded (no expiry) | Med | Med | Expiry default proposed: 90 days or next release — needs orchestrator confirmation; re-review owner mandatory |

### Blast Radius

- Systems: docs/skill-text only (`skills/quality-gate/`, `skills/verify-handoff/` refs); no runtime, no deps, `mise run typecheck` unaffected.
- Teams: security lane owns bar; engineering (gate mechanics) + people (tone) co-sign wording; other 5 domains untouched.
- Customers/regulators/revenue: failure mode = thin waiver or PII in grill export → regulatory (Ley 172-13) + customer-trust exposure; contained by masking/allowlist + scan-log evidence + TTL cap.
- Data: no new PII store; grill corpus minimized; every PII checkpoint declares purpose+TTL+deletion per REQ-SEC-NF-002.

### Rollback Plan

Revert skill-text diffs per file (git revert of the execute-spec commit); re-issue gate packet with prior template versions; ETA < 30 min; owner: barrera (security) with engineering owner confirming gate mechanics restored + people owner confirming tone wording restored. No prod rollback (docs-only).

### Security Considerations

Auth/data exposure/input validation: no new endpoints/adapters/boundaries/payloads — no new trust boundaries; deny-by-default holds (0 unwaived findings ship, waiver record path required); every grill prompt/export is a PII checkpoint; proof-or-refuted enforced (no proof = REFUTED); Critical/High triage same-session. Security owner confirms.

### Domain Considerations

- Engineering (engineering owner): C3/C4 mechanics fidelity — surgical-lane + presence-check wording must not alter routing table or DoD beyond stated rows; needs engineering-owner sign (gate mechanics).
- People (people owner): tone/attention/opt-in — C3 interrogation + C4 FAIL wording must carry warm opt-in + exit-hatch + one-at-a-time + masking-reminder co-sign (REQ-P-006); banned lexicon (relentless/interrogate/drill/trap) excluded; needs people-owner sign.
- Touched-only: finance/legal/marketing/revenue/automation/ops deleted per template (not touched).

## Approval Required From

- [ ] barrera — security owner (MANDATORY: waiver + residual bar, this spec) — BLOCKS until APPROVE
- [ ] engineering owner (gate mechanics: C3 surgical-lane + C4 presence-check wiring fidelity) — BLOCKS until APPROVE
- [ ] people owner (tone: interrogation/FAIL wording warmth + opt-in + masking co-sign REQ-P-006) — BLOCKS until APPROVE

> **Rule:** No repository file modifications during proposal phase (only this `PROPOSED_CHANGES.md` is committed). No external sends/filings/launches. Specialist never self-approves — this proposal is RETURNED, never self-approved. CLOSED stays CLOSED without domain-owners + orchestrator; waiver TTL default (90 days or next release) proposed, needs orchestrator confirmation.

## Traceability

| Requirement | Acceptance Criterion | Evidence (planned) |
|-------------|---------------------|--------------------|
| REQ-SEC-001 | AC-SEC-001 | waiver sample vs three-block bar |
| REQ-SEC-002 | AC-SEC-002 | CLOSED-authority + re-review ban text + gate record |
| REQ-SEC-003 | AC-SEC-003 | secret/PII scan log on round + export (0 raw) |
| REQ-SEC-004 | AC-SEC-004 | checkpoint table + allowlisted export sample |
| REQ-SEC-005 | AC-SEC-005 | gate residual statement (risk + owner) |
| REQ-SEC-006 | AC-SEC-005 | no-freelance-fix scan |
| REQ-SEC-007 | AC-SEC-005 | finding sample + triage log |
| REQ-SEC-NF-001..003 | AC-SEC-001..005 | deny-by-default + flow map + template conformance |
| Eng REQ-003/004 | AC-002/003 | lane + ban + FAIL-rule text in touched skills |
| People REQ-P-001..006 | AC-P-001..004 | tone/opt-in/masking wording co-sign (by reference) |
