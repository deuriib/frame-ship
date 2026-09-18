# Implementation Plan: SPEC-grilling-integration-security (C3+C4 lane)

**Agent:** barrera (CISO) — domain chain owner, security
**Date:** 2026-09-18
**Approved By:** arch Approved (mechanics fidelity) + security Conditional (conditions evidenced here); engineering + people owners co-sign per PROPOSED_CHANGES §Approval
**Domains-Touched:** [engineering, people, security] (this lane owns: security C3+C4 only)
**Execution_Mode:** multi-subagents (max 2 parallel lanes; parallel with engineering C1+C2 lane)
**Packet:** SPEC:`docs/specs/40_workspace/security/PROPOSED_CHANGES.md` (C3+C4) + `SPEC-grilling-integration-security.md#REQ-SEC-001..007` / HARD:multi-subagents+approved-list-only+TTL-90d-or-next-release-whichever-first+no-freelance-fixes / GATE:arch-Approved+security-Conditional / DOMAINS:[engineering,people,security]
**Skill:** `skills/execute-spec/SKILL.md` via `frame-ship:execute-spec`

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Land singleton plan (this file, update-in-place) | `docs/specs/40_workspace/security/IMPLEMENTATION_PLAN.md` | this plan §Order | 0.1h |
| 2 | C3 bar: normative three-block waiver template (missing-block = FAIL) + expiry default + residual+owner | `skills/quality-gate/references/waiver-template.md` | TEST_MATRIX T-001/T-005 (sample vs bar) | 0.3h |
| 3 | C3 bar: interrogation record row + residual statement + silent-PASS = FAIL | `skills/quality-gate/references/gate-report.md` | TEST_MATRIX T-001/T-005 | 0.2h |
| 4 | C3 lane: surgical interrogation wording + authority bans verbatim + N=2 + PII checkpoint note (no routing-table change) | `skills/quality-gate/SKILL.md` | TEST_MATRIX T-002 | 0.3h |
| 5 | C4 check: REQ→evidence-link presence (missing = FAIL) + re-litigation ban + return-to-execute-spec routing | `skills/verify-handoff/SKILL.md` | TEST_MATRIX T-005 | 0.3h |
| 6 | C4 check: tighten DoD Common line (link present; attestation-alone = FAIL) + C4 FAIL residual+owner note | `skills/verify-handoff/references/dod-checklist.md` | TEST_MATRIX T-005 | 0.2h |
| 7 | PII/masking guardrails ride both lanes (REQ-SEC-003/004 + REQ-P-006 co-sign) + no-freelance-fix + proof-or-refuted clauses | all 5 targets above | TEST_MATRIX T-003/T-004/T-006/T-007 | 0.2h |
| 8 | Land singleton TEST_MATRIX.md + run scans (secret/PII-shape, changed-files boundary) | `docs/specs/40_workspace/security/TEST_MATRIX.md` | TEST_MATRIX T-003/T-008 | 0.2h |

Each step maps to one commit per REQ-ID (never batch unrelated REQ-IDs); body links `REQ-ID → test → artifact`.

## Order of Operations

1. Step 1 (plan) → 2–3 (templates first, so SKILL text references normative wording) → 4 (SKILL lane wording) → 5–6 (C4 presence check) → 7 (PII/no-fix/proof clauses woven into all touched refs) → 8 (matrix + scans).
2. Never touch runtime, deps, routing table, STRIDE/ADR cores, or C1+C2 engineering lane — skill-text only.
3. Engineering mechanics fidelity arrives at `quality-gate`, never sideways; people tone co-sign carried by reference; scope expansion → STOP + new proposal.

## Rollback Points

- Before any skill-text commit: delete/overwrite plan only (no skill touched).
- After each REQ-ID commit: `git revert <sha>` per file; re-issue gate packet with prior template versions. ETA < 30 min; owner barrera, engineering owner confirms gate mechanics restored, people owner confirms tone wording restored. No prod rollback (docs-only).
- TTL: waiver expiry default 90 days or next release, whichever first (orchestrator-confirmed); re-review owner mandatory on every waiver.

## Quality Gates

Domain checks (touched only, keep evidence path):

- [ ] Engineering: `mise run typecheck` unaffected (docs-only skill-text; no runtime change) — evidence: typecheck log ref in TEST_MATRIX
- [ ] People: people owner tone/opt-in/masking co-sign (warm opt-in + exit-hatch, banned lexicon excluded) — evidence: co-sign ref in TEST_MATRIX
- [ ] Security: secret/PII-shape scan 0 raw + changed-files boundary = approved list only — evidence: scan log in TEST_MATRIX
