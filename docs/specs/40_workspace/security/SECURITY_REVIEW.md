# Security Review: Grilling Integration — Security Lane C3+C4

**Reviewer:** barrera (security owner) via security-reviewer (gate)
**Date:** 2026-09-18
**Proposal:** `docs/specs/40_workspace/security/PROPOSED_CHANGES.md` (C3+C4)
**Spec Reference:** `docs/specs/40_workspace/security/SPEC-grilling-integration-security.md#REQ-SEC-001..007` + `docs/specs/10_design/SPEC-grilling-integration-engineering.md#REQ-003..004` + people slice `docs/specs/10_design/SPEC-grilling-integration-people.md#REQ-P-001..006` (by reference) + brief `docs/briefs/BRIEF-grilling-integration.md` (read-only, approved 2026-09-18)
**Execution_Mode:** multi-subagents (max 2 parallel lanes, inherited from brief)
**Verdict:** Conditional
**Skill:** `skills/review-security/SKILL.md` via `frame-ship:review-security`

## Threat Model

See `THREAT_MODEL.md` (sibling, full STRIDE) for attack surface + per-threat analysis.
Summary: docs-only skill-text bar, no new endpoints/adapters/boundaries/payloads, no new
trust boundary. Primary surfaces are the waiver lane (thin CONDITIONAL promoted past C3)
and evidence exports (PII in waiver justification / C4 links). The proposal's own bar —
normative three-block waiver template, CLOSED-stays-CLOSED, re-review/re-litigation bans,
residual-risk mandatory, no-freelance-fix, proof-or-refuted — is sound; conditions below
bind its verbatim enforcement at execute-spec.

## Findings

| ID | Severity | Finding | OWASP | Evidence | Fix location / Remediation |
|----|----------|---------|-------|----------|----------------------------|
| S-C34-001 | Medium | Thin waiver passes C3 if three-block bar not enforced verbatim at execute (missing block promoted) | A04:2021 Insecure Design (waiver laundering) | `security/PROPOSED_CHANGES.md:20-21` (normative template + interrogation record; self-declared R-SEC-001 Med/High) | Conditions D-1 + D-2: waiver-template wording verbatim + missing-block = FAIL in SKILL text + waiver sample-vs-bar proof at execute/gate |
| S-C34-002 | Low | C3 scrutiny drifts into full re-review / CLOSED override | A01:2021 Broken Access Control (gate override) | `security/PROPOSED_CHANGES.md:19` (authority-limit + re-review ban text; R-SEC-003 Low/High) | Condition D-3: ban + CLOSED-authority wording verbatim; CLOSED stays CLOSED without domain-owners + orchestrator; retry N=2 → escalate |
| S-C34-003 | Low | C4 presence check drifts into re-litigation of settled verdicts | N/A (process integrity) | `security/PROPOSED_CHANGES.md:22` (re-litigation ban + return-to-execute-spec routing; R-SEC-004 Low/Med) | Condition D-3: ban + routing verbatim in `verify-handoff/SKILL.md` |
| S-C34-004 | Medium | Silent residual ships (APPROVE+conditions without risk+owner) if residual line not enforced | A04:2021 Insecure Design (silent PASS) | `security/PROPOSED_CHANGES.md:21,23` (residual-risk + owner lines; silent PASS = FAIL; R-SEC-005 Med/High) | Condition D-4: residual-risk + owner mandatory in gate-report + dod-checklist; silent PASS = FAIL enforced; gate re-verifies |
| S-C34-005 | Info (open question, not a finding) | Waiver TTL default (90 days or next release) unconfirmed — correctly escalated, not silently resolved | N/A (governance) | `security/PROPOSED_CHANGES.md:20,60,89` (proposed default, needs orchestrator confirmation) | Condition D-5: orchestrator confirms TTL default before execute; re-review owner mandatory on every waiver |
| S-C34-006 | REFUTED | No credential material in proposal text — `rg` hits are policy words only (zero-PII rule declarations), no values | — | bash `rg -i api_key|secret|token|password|credential|session` on both PROPOSED_CHANGES: hits descriptive only, 0 values | No fix; claim evidenced by scan, finding refuted per proof-or-refuted |
| S-C34-007 | Low (tone watch) | C3 "interrogation" / C4 "FAIL" wording must ship warm per people co-sign; proposal prose itself uses interrogate-language descriptively | N/A (tone governance) | `security/PROPOSED_CHANGES.md:13,80` + people SPEC §4.4 (banned lexicon) | Condition D-6: people co-sign verifies warmth + banned-lexicon grep = 0 on skill diffs; substitutes challenge/explore/test/falsify |

No Critical findings. No High active vulnerabilities — S-C34-001/S-C34-004 are
forward-looking design risks on the *proposed bar's enforcement*, contained by binding
conditions. No same-session Critical/High escalation to orchestrator. I do not override
the engineering owner on architecture-impacting decisions: routing-table and DoD changes
are limited to the stated added rows (conditions D-3/D-4 note the fidelity check, owned
by the engineering owner at gate).

## Conditions for Approval (binding on execute-spec + quality-gate)

- [ ] **D-1 — Normative waiver template verbatim:** `Accepted-risk: [risk + why] / Compensating-controls: [control + owner + evidence-ref] / Expiry: [date/condition + re-review owner] / Sign-off: [domain-owners + orchestrator]` in `waiver-template.md`; missing block = FAIL, no promotion (REQ-SEC-001/005, REQ-SEC-NF-003).
- [ ] **D-2 — Sample-vs-bar proof:** waiver sample interrogated against the three-block bar (pass/fail per block) recorded in `gate-report.md` + `Residual-risk + owner` statement (or explicit `none + owner`); silent PASS = FAIL (AC-SEC-001/005).
- [ ] **D-3 — Authority limits verbatim:** CLOSED-stays-CLOSED + full re-review ban in `quality-gate/SKILL.md`; re-litigation ban + return-to-`execute-spec` routing in `verify-handoff/SKILL.md`; retry N=2 → escalate intact. Engineering owner confirms routing-table/DoD fidelity beyond stated rows.
- [ ] **D-4 — PII/masking proof:** every grill prompt/adapter/event/log/export declared a PII checkpoint (mask/tokenize + allowlist); checkpoint table present; secret/PII scan log on sample round + export shows 0 raw; allowlisted export sample only (REQ-SEC-003/004, REQ-SEC-NF-002, Ley 172-13).
- [ ] **D-5 — TTL confirmation:** orchestrator confirms waiver expiry default (90 days or next release proposed) before execute; re-review owner mandatory on every waiver (REQ-SEC-NF-003, R-SEC-007).
- [ ] **D-6 — Tone + conduct:** C3/C4 wording carries warm opt-in + exit-hatch + one-at-a-time + masking-reminder co-sign (REQ-P-006); banned-lexicon grep = 0 on skill diffs; no-freelance-fix clause present (report severity+location+evidence, owner remediates); proof-or-refuted + Critical/High same-session triage intact (REQ-SEC-006/007). People-owner co-sign required.
- [ ] **D-7 — No scope drift:** no new skill dir / stage / reviewer / runtime / dep change in the execute diff; deny-by-default holds (0 unwaived findings ship, waiver record path required).

## Residual Risk (explicit — no silent PASS)

- **RR-C34-1 (owner: barrera, verifier: security-reviewer at quality-gate):** a politely-worded but thin waiver passes C3 review despite the template (box-ticking without substance). Likelihood Low under D-1/D-2, impact High. Watched via sample-vs-bar record + gate reviewer judgment.
- **RR-C34-2 (owner: barrera):** waiver TTL lapses without re-review if expiry owner does not act. Likelihood Low under D-5, impact Med. Contained by mandatory re-review owner + expiry date/condition on every waiver.

## Assumptions

1. Proposal-phase attestations (scan logs, checkpoint table, sample-vs-bar) are planned evidence; proof arrives at execute-spec per D-2/D-4.
2. TTL default remains a proposal until orchestrator confirms (D-5); execute-spec must not hard-code an unconfirmed default as normative.
3. Engineering lane (C1+C2) reviewed separately in `engineering/SECURITY_REVIEW.md`; lanes proceed in parallel.
4. `SPEC/HARD/GATE/DOMAINS` reference-only packets preserved end-to-end.

## Cross-Domain Requests (to orchestrator montilla — no sideways)

1. **TTL confirmation (orchestrator):** confirm or replace the 90-days-or-next-release waiver expiry default + re-review ownership rule before execute-spec.
2. **Engineering fidelity (engineering owner):** confirm C3 surgical-lane + C4 presence-check wiring alters routing table / DoD only by the stated added rows — collect at quality-gate.
3. **Tone co-sign (people owner santana):** warmth + opt-in + masking co-sign on C3/C4 wording (REQ-P-006) — collect at quality-gate.

## Sign-off

- [x] barrera (security owner) — Conditional, 2026-09-18 (execute-spec gated on D-1..D-7)
- [ ] engineering owner (gate mechanics fidelity; architecture-impacting scope respected, no override)
- [ ] santana (people owner — tone/masking co-sign)
- [ ] orchestrator (TTL default confirmation per D-5)
- [ ] Re-verification at quality-gate (security-reviewer on implemented diff)
