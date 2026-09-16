---
name: review-security
description: Perform a structured security review of a proposed change with STRIDE threat model and verdict. Use when a change touches auth, data, external APIs, or when security owner sign-off is required.
---

# Review-Security — Security Review

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## 1. Purpose

Threat-model every security-relevant proposal and issue a binding verdict:
Approved / Conditional / Rejected. Reuses existing security reviewers —
no parallel reviewer universe.

## 2. Chain Contract

- Previous: frame-ship:propose-changes
- Next: frame-ship:execute-spec (only on Approved or Conditional-with-conditions-met)

## 2b. Role Binding (Org)

- **Bound to:** security owner orchestrating security reviewers
  for PII flows. Escalation to orchestrator on Critical/High.

## 3. Process

0. Pre-flight LOAD — HARD STOP: `skill(review-security)` loaded? Agent templates read for security owner + security reviewer? Any NO → STOP. Security owner runs inside the orchestrator's `task(general)` ordered to read skill + templates first (single = direct read).
1. Read `docs/specs/40_workspace/<domain>/PROPOSED_CHANGES.md`.
2. Produce security review output via `references/security-review-template.md`.
3. Threat-model via `references/threat-model.md` (STRIDE).
4. Issue verdict + conditions; block implementation on Rejected.
5. Close with work-unit commit per `../using-frame-ship/references/commit-convention.md` (guidance only). Example: `docs(sec-003): approve SECURITY_REVIEW with STRIDE verdict`.

## 4. What I won't do

- Approve without a complete threat model.
- Override engineering owner on architecture-impacting decisions.
- Let implementation proceed on a Rejected verdict.

## 5. References

- `references/security-review-template.md` — Findings + verdict + sign-off.
- `references/threat-model.md` — STRIDE attack surface analysis.
- `../using-frame-ship/references/commit-convention.md` — Commit format + per-stage examples (guidance only; see `frame-ship:using-frame-ship`).
