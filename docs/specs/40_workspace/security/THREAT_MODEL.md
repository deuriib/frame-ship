# Threat Model: Grilling Integration — Security Lane C3+C4

**Methodology:** STRIDE
**Date:** 2026-09-18
**Proposal:** `docs/specs/40_workspace/security/PROPOSED_CHANGES.md` (C3+C4)
**Reviewer:** barrera (security owner) via security-reviewer
**Skill:** `skills/review-security/SKILL.md` via `frame-ship:review-security`

## Attack Surface

| Surface | Entry Point | Trust Boundary |
|---------|-------------|----------------|
| C3 interrogation lane (`skills/quality-gate/SKILL.md`) | CONDITIONAL/waiver justification text under scrutiny | internal (gate deliberation; downgrade = thin waiver promoted) |
| Waiver template (`skills/quality-gate/references/waiver-template.md`) | Accepted-risk / Compensating-controls+owner / Expiry+owner / Sign-off blocks | governance boundary (missing block = bypass) |
| Gate report record (`skills/quality-gate/references/gate-report.md`) | C3 interrogation row (sample vs bar) + Residual-risk + owner statement | internal → export (report shared to handoff/ship) |
| CLOSED verdicts | Prior CLOSED gates revisited under C3 scrutiny | authority boundary (override without domain-owners + orchestrator) |
| C4 presence check (`skills/verify-handoff/SKILL.md` + `dod-checklist.md`) | REQ→evidence links (test/scan/log/review-link) | internal → handoff (attestation smuggled as evidence) |
| Waiver justification / C4 evidence exports | Justification prose, linked evidence, residual statements | internal → export (PII checkpoint; Ley 172-13) |
| Grill findings (C3/C4-surfaced) | Severity + location + evidence reports | internal (remediation boundary — owner remediates, grill never self-fixes) |

No new endpoints/adapters/boundaries/payloads added — no new runtime trust boundary.
Every prompt/adapter/event/log/export at C3–C4 is a declared PII checkpoint
(mask/tokenize + allowlist).

## STRIDE Analysis

| Threat | Applicable? | Mitigation |
|--------|-------------|------------|
| Spoofing | No | No identity/authN session in scope; sign-off blocks name real owners (domain-owners + orchestrator), verified at gate record. |
| Tampering | Yes (conditional) | Thin-waiver tampering: justification edited to look complete while missing a block; attestation-grade link smuggled as evidence at C4. Mitigated by normative template + missing-block = FAIL (D-1), sample-vs-bar record (D-2), attestation-alone = FAIL in dod-checklist. |
| Repudiation | No | Waiver sign-off + expiry owner + re-review owner recorded; C4 FAIL lists residual-risk + owner; retry N=2 → escalate trace intact. No repudiation vector introduced. |
| Information Disclosure | Yes (primary) | Waiver justification / evidence exports may carry PII or sensitive control detail. Mitigated by zero-PII rule + checkpoint mask/tokenize + allowlisted evidence only + scan log 0 raw (D-4), Ley 172-13 minimization (purpose+TTL+deletion per PII store). Residual RR-C34-1/2 carried explicitly. |
| Denial of Service | Yes (attenuated) | Re-review / re-litigation loops as attention DoS. Mitigated by full re-review ban (C3) + re-litigation ban with return-to-`execute-spec` routing (C4) + N=2 → escalate (D-3). |
| Elevation of Privilege | Yes (conditional) | Two vectors: (a) CLOSED override without authority — mitigated by CLOSED-stays-CLOSED + domain-owners + orchestrator sign-off (D-3); (b) freelance fix from grill (rotate keys / patch prod / widen perms) — mitigated by no-freelance-fix clause, report-only, owner remediates (D-6). Least-privilege otherwise unchanged. |

## Residual Risk

RR-C34-1 box-ticked thin waiver (owner: barrera, verifier security-reviewer at gate) + RR-C34-2 lapsed TTL without re-review (owner: barrera, contained by D-5). Detail in sibling `SECURITY_REVIEW.md`. No Critical/High active vuln; no same-session escalation. Architecture-impacting scope (routing/DoD rows) is additive-only; engineering owner confirms fidelity at gate — no security override.
