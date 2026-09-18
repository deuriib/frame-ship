# Security Review: Grilling Integration — Engineering Lane C1+C2

**Reviewer:** barrera (security owner) via security-reviewer (gate)
**Date:** 2026-09-18
**Proposal:** `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (C1+C2)
**Spec Reference:** `docs/specs/10_design/SPEC-grilling-integration-engineering.md#REQ-001..002` + `docs/specs/10_design/SPEC-grilling-integration-people.md#REQ-P-001..006` (by reference) + brief `docs/briefs/BRIEF-grilling-integration.md` (read-only, approved 2026-09-18)
**Execution_Mode:** multi-subagents (max 2 lanes, inherited from brief)
**Verdict:** Conditional
**Skill:** `skills/review-security/SKILL.md` via `frame-ship:review-security`

## Threat Model

See `THREAT_MODEL.md` (sibling, full STRIDE) for attack surface + per-threat analysis.
Summary: docs-only skill-text change, no new endpoints/adapters/boundaries/payloads,
no new trust boundary. Primary surface is PII elicitation by design: C2 trigger fires
on blast radius mentioning customers/regulators/revenue, inviting regulated detail into
the grill round; C1 framings invite strategic detail. Controls are masking-reminder
pointer + allowlisted evidence + 0-PII samples — pointer-grade at proposal, must go
verbatim at execute (conditions below).

## Findings

| ID | Severity | Finding | OWASP | Evidence | Fix location / Remediation |
|----|----------|---------|-------|----------|----------------------------|
| S-C12-001 | Medium | C2 trigger solicits customer/regulator/revenue detail into grill answers/exports by design | A04:2021 Insecure Design (privacy elicitation) | `engineering/PROPOSED_CHANGES.md:20` (trigger list incl. customers/regulators/revenue) | Conditions C-1 + C-2: verbatim warm masking clause in C2 prompt + every export; secret/PII scan log 0 raw on sample round + export at execute |
| S-C12-002 | Low | Classification spoof/downgrade to evade grill (declare spike, get 1 question) | A01:2021 Broken Access Control (evasion) | `engineering/PROPOSED_CHANGES.md:19` (one-way ratchet line) | Condition C-3: ratchet wording verbatim at execute; gate greps ratchet present, no downgrade path |
| S-C12-003 | Low | Sample BRIEF `Framings-Considered` / sample proposal artifacts could carry PII/secrets | A09:2021 Security Logging Failures (exposure via samples) | `engineering/PROPOSED_CHANGES.md:23` (samples carry 0 PII claim, attestation-grade at proposal) | Condition C-2: scan-log proof (not attestation) at execute; allowlisted evidence only |
| S-C12-004 | Info | Tone drift watch: proposal prose uses "interrogate(s)/interrogation" descriptively; banned lexicon must be 0 in shipped skill text | N/A (tone governance) | `engineering/PROPOSED_CHANGES.md:34,42` + people `SPEC-grilling-integration-people.md:33-35` (banned lexicon) | Condition C-4: people co-sign verifies banned-lexicon grep = 0 on skill diffs; substitutes challenge/explore/test/falsify |
| S-C12-005 | REFUTED | No credential material in proposal text — `rg` hits are policy words only (zero-PII rule declarations), no values | — | bash `rg -i api_key|secret|token|password|credential|session` on both PROPOSED_CHANGES: hits descriptive only, 0 values | No fix; claim evidenced by scan, finding refuted per proof-or-refuted |

No Critical findings. No High active vulnerabilities — S-C12-001 is a
forward-looking design surface on the *proposed grill behavior*, contained by
binding conditions below. No same-session Critical/High escalation to orchestrator.

## Conditions for Approval (binding on execute-spec + quality-gate)

- [ ] **C-1 — Verbatim masking clause C1+C2:** grill openers + C2 prompt + every export carry the people SPEC §4.5 warm masking reminder verbatim-in-intent (no PII/secrets/tokens in answers; mask/tokenize + allowlist on exports; Ley 172-13). Pointer-by-reference is insufficient at execute.
- [ ] **C-2 — Scan-log proof + allowlist:** sample C1 round + C2 round + export packet each ship a secret/PII scan log showing 0 raw; exports are allowlisted evidence only (REQ-NF-001, REQ-P-006). Attestation-alone = FAIL.
- [ ] **C-3 — Ratchet + budget verbatim:** C1 caps (spike 1 / bounded cap 3 / architectural cap 5) + one-way ratchet (never downgrade) + C2 one-pass budget + pause/exit offer present verbatim-in-intent in touched skill text; joint engineering + people sign-off on caps recorded at gate.
- [ ] **C-4 — Tone gate:** opt-in + exit-hatch + one-at-a-time + disagreement-invite + warmth clauses verbatim-in-intent in C1/C2 touchpoints; banned-lexicon grep = 0 on skill diffs; people-owner co-sign required (REQ-P-001..003).
- [ ] **C-5 — No verbatim external text:** LICENSE + attribution open question stays with orchestrator; execute-spec uses original wording only unless orchestrator clears reuse in writing.
- [ ] **C-6 — No scope drift:** no new skill dir / stage / reviewer / dependency in the execute diff; `mise run typecheck` unaffected (docs-only); any need beyond [engineering, people, security] → Cross-domain request to orchestrator, never sideways.

## Residual Risk (explicit — no silent PASS)

- **RR-C12-1 (owner: engineering owner, co-owner people owner, verifier: barrera at quality-gate):** a grill answer may still contain volunteered PII despite the masking reminder (user pastes customer detail unprompted). Likelihood Low under C-1, impact High. Contained by scan-log + allowlist + Ley 172-13 minimization at export; watched at quality-gate sample-vs-checkpoint review.
- **RR-C12-2 (owner: engineering owner):** C1 budget default (1 / cap 3 / cap 5) disputed or downgraded mid-initiative. Likelihood Low, impact Med. Contained by ratchet text + gate joint sign-off; disputes escalate to orchestrator, never sideways.

## Assumptions

1. Proposal-phase claims (0 PII in samples, masking pointers) are intent declarations; proof arrives at execute-spec per C-2.
2. C3/C4 sibling lane proceeds in parallel without blocking this lane; waiver/residual bar owned there.
3. `SPEC/HARD/GATE/DOMAINS` reference-only packets preserved end-to-end.

## Cross-Domain Requests (to orchestrator montilla — no sideways)

1. **People co-sign (santana):** tone/budget wording co-sign on C1 caps + ratchet + inserts 1–6 intent-match (REQ-P-004 co-owned) — collect at quality-gate.
2. **LICENSE clearance (orchestrator):** external grilling text LICENSE + attribution before any verbatim reuse — owner orchestrator per brief Open Questions.

## Sign-off

- [x] barrera (security owner) — Conditional, 2026-09-18 (execute-spec gated on C-1..C-6)
- [ ] vasquez (engineering owner — mechanics fidelity; proposer cannot self-approve)
- [ ] santana (people owner — tone/budget co-sign)
- [ ] Re-verification at quality-gate (people + security reviewers on implemented diff)
