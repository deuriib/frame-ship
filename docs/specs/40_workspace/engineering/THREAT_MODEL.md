# Threat Model: Grilling Integration — Engineering Lane C1+C2

**Methodology:** STRIDE
**Date:** 2026-09-18
**Proposal:** `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` (C1+C2)
**Reviewer:** barrera (security owner) via security-reviewer
**Skill:** `skills/review-security/SKILL.md` via `frame-ship:review-security`

## Attack Surface

| Surface | Entry Point | Trust Boundary |
|---------|-------------|----------------|
| C1 challenger prompt (`skills/frame-intent/SKILL.md`) | Initiator answers to classification-scaled questions (spike 1 / bounded ≤3 / architectural ≤5) | external (user-supplied framing detail crosses into brief/store) |
| C1 `Framings-Considered` record | Sample BRIEF artifact demonstrating challenger + falsifiable-bet | internal → export (brief shared downstream) |
| C2 grill trigger + one-pass round (`skills/propose-changes/SKILL.md` + proposal/risk refs) | Proposer answers on auth/data/API/PII, multi-domain scope, customer/regulator/revenue blast radius, approver request | external (blast-radius detail crosses into proposal/logs) |
| Sample proposal artifact (C2 demo) | Verification-only sample demonstrating trigger + one-pass round | internal → export |
| Grill logs/exports (C1+C2) | Round transcripts, evidence links | internal → export (PII checkpoint) |
| Classification input (spike/bounded/architectural) | Initiator-declared classification selects grill depth | trust decision (self-declared; downgrade = evasion) |

No new endpoints/adapters/boundaries/payloads added — no new runtime trust boundary.
Every prompt/export above is a declared PII checkpoint (mask/tokenize + allowlist).

## STRIDE Analysis

| Threat | Applicable? | Mitigation |
|--------|-------------|------------|
| Spoofing | Yes (conditional) | Classification spoof to evade grill (declare spike). Mitigated by one-way ratchet text (depth only rises, never downgrades) + `Framings-Considered` recording + gate grep. Condition C-3 in SECURITY_REVIEW. |
| Tampering | No* | *No runtime/data store touched (skill-text only). Editorial tampering risk (weakened grill wording at execute) mitigated by proposal-before-code + gate diff review + rollback `git checkout -- skills/frame-intent skills/propose-changes`. |
| Repudiation | No | Grill decline/exit recorded as `grill: declined/exited`; falsifiable bets recorded in `Framings-Considered`; proposal traces REQ-001/002 → execute → gate. No repudiation vector introduced. |
| Information Disclosure | Yes (primary) | C2 trigger by design elicits customer/regulator/revenue detail; C1 framings invite strategic detail. Mitigated by verbatim warm masking clause (C-1), secret/PII scan log 0 raw + allowlisted evidence only (C-2), Ley 172-13 minimization, 0-PII samples. Residual RR-C12-1 (volunteered PII) carried explicitly. |
| Denial of Service | Yes (attenuated) | Challenge fatigue (attention DoS): extra C1/C2 rounds tax reviewers. Mitigated by opt-in + exit hatch, one-at-a-time, C2 one-pass cap, pause/exit after round (REQ-P-001/005), classification scaling. |
| Elevation of Privilege | No | Least-privilege unchanged; no keys/roles/perms touched; no-freelance-fix holds (grill findings report, owner remediates). Verified: no secret/credential material in proposal (scan evidenced). |

## Residual Risk

RR-C12-1 volunteered PII in answers (owner: engineering + people, verifier barrera at gate) + RR-C12-2 budget dispute (owner: engineering, escalate orchestrator). Detail in sibling `SECURITY_REVIEW.md`. No Critical/High active vuln; no same-session escalation.
