---
name: verify-handoff
description: Verify completed implementation meets Definition of Done and produce a structured handoff. Use when a specialist declares work complete and it needs review before shipping.
---

# Verify-Handoff — Definition of Done Verification

> _"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."_

## 1. Purpose

Run the full DoD checklist against spec + test matrix + open gate report, then
produce HANDOFF.md routing to the next agent. No gate OPEN, no handoff.

## 2. Chain Contract

- Previous: frame-ship:quality-gate (must be OPEN)
- Next: frame-ship:ship-release (on complete) or frame-ship:execute-spec (on findings)

## 2b. Role Binding (Org)

- **Bound to:** owning domain owner gate (engineering / security / domain owner) with
  orchestrator synthesizing cross-domain handoffs.

## 3. Process

0. Pre-flight LOAD — HARD STOP: `skill(verify-handoff)` loaded? Owning domain owner template read? `SPEC/HARD/GATE/DOMAINS` packet + `GATE_REPORT.md` in hand? Any NO → STOP. Single = direct verify; multi = orchestrator dispatches ordered to read skill. No OPEN gate = no handoff (waiver only domain owners + orchestrator).
1. Read spec + test/evidence matrix + `GATE_REPORT.md` with `SPEC/HARD/GATE/DOMAINS` packet intact.
2. Run DoD via `references/dod-checklist.md` — Common section for all, Domain appendix only for touched domains.
3. Produce `docs/specs/40_workspace/<domain>/HANDOFF.md` via `references/handoff-template.md` (deliverables may be files, documents, filings, campaigns, closes, workflows — with evidence links). Singleton: create-if-missing else update-in-place, never suffix — one UPPER_SNAKE canonical per lane (only `HANDOFF.md`, never `HANDOFF-*.md`).
4. All gates pass → hand off to `frame-ship:ship-release`.
5. Gates fail → return to `frame-ship:execute-spec` with specific findings.
6. Close with a commit. Example: `docs(handoff-003): verify DoD and route SPEC-003 to ship`.

## 3a. C4 — REQ→evidence-link presence check (surgical, security-owned)

Every REQ links evidence (test/scan/log/review-link), not a tick; missing link
= FAIL, no handoff. Attestation-alone = FAIL. Every C4 FAIL lists
`residual-risk + owner`. Re-litigation of settled gate verdicts banned —
findings return to `frame-ship:execute-spec` instead. Retry N=2 → escalate
orchestrator. `SPEC/HARD/GATE/DOMAINS` packets preserved. PII checkpoint
(REQ-SEC-003/004 + REQ-P-006 co-sign): zero
PII/secrets/tokens/credentials/sessions in handoff text, grill
questions/answers/prompts/logs/examples/exports; every
prompt/adapter/event/log/export is a declared PII checkpoint (mask/tokenize +
allowlist); allowlisted evidence only; Ley 172-13 minimization. Wide/cross-tenant
disclosure = finding. No-freelance-fix: findings report `severity + location +
evidence`, owner remediates — never rotate keys/patch prod/widen perms.
Proof-or-refuted: finding without `diff/scan/log` = REFUTED; Critical/High with
proof surfaces same session. Tone (REQ-P-003/006 co-sign, people owner verifies
at gate): warm and direct — one item at a time; say `exit/salir` / pause anytime, no
penalty; masking reminder rides every export. Exit-terminal (COND-P5-shared): `exit/salir` at C4 = pause + recorded `grill: exited` + escalate orchestrator; proposal stays unapproved on pre-decision exit, no silent promote.

## 4. What I won't do

- Approve without the full DoD checklist.
- Skip security verification for security-relevant specs.
- Allow shipping without doc updates.

## 5. References

- `references/handoff-template.md` — Deliverables + DoD + next agent.
- `references/dod-checklist.md` — Functional/quality/security/docs gates.
