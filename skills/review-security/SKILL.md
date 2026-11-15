---
name: review-security
description: Use when a change touches auth, data, external APIs, or when security owner sign-off is required.
---

# Review Security

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Threat-model security-relevant proposals with STRIDE and issue a binding verdict: **PASS / CONDITIONAL / FAIL**. The repository is untouched—`SECURITY_REVIEW.md` is produced in `.frame-ship/<domain>/SECURITY_REVIEW.md` (gitignored) and promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`.

## Chain Contract

- **Previous:** `frame-ship:propose-changes`
- **Next:** `frame-ship:execute-spec` (only on Approved, or Conditional with conditions met)

## Role Binding

Bound to the **security owner**, who orchestrates security reviewers for PII flows. Escalate **Critical/High** findings to the orchestrator.

## Process

0. **Pre-flight load — HARD STOP** (contract: `../using-frame-ship/references/pre-flight.md`). Load `skill(review-security)`. Load applicable security rules. No skill = STOP.
1. Read `.frame-ship/<domain>/PROPOSED_CHANGES.md` (singleton canonical—only `PROPOSED_CHANGES.md`, never suffixed).
2. Threat-model with **STRIDE** via `references/threat-model.md`.
3. Produce `.frame-ship/<domain>/SECURITY_REVIEW.md` via `references/security-review-template.md` (singleton per lane; promoted to `docs/frame-ship/archive/<spec-id>/` by `ship-release`).
4. Issue a binding verdict + conditions. **Block implementation on Rejected.**
5. Record the verdict in `.frame-ship/<domain>/SECURITY_REVIEW.md` (promoted to `docs/frame-ship/archive/<spec-id>/` on ship) and route to `execute-spec` if Approved (or Conditional with conditions met).

## Verdict Rules

| Verdict | Meaning | Next |
|---|---|---|
| **Approved** | No blocking findings. | → `execute-spec` |
| **Conditional** | Conditions must be met and verified before implementation. | Conditions tracked; no silent promotion. |
| **Rejected** | Blocking findings. | Implementation stops; return to `propose-changes` with findings. |

## What I Won't Do

- Approve without a complete threat model.
- Override the engineering owner on architecture-impacting decisions.
- Let implementation proceed on a **Rejected** verdict.
- Skip security review for auth / data / external-API / PII surfaces.

## Red Flags

| Thought | Reality |
|---|---|
| "Internal-only, no auth surface" | PII and data flow through internal paths. Scan data + API surfaces before deciding scope. |
| "Mitigations are already listed" | Verify mitigations against the threat model—don't take the proposal's word. |
| "Conditional approval is good enough" | Conditions need **owner + expiry + verification**; otherwise it's an unowned TODO. |
| "No reviewer available" | No review = no implementation. Escalate to orchestrator. |

## References

- `references/security-review-template.md` — Findings + verdict + sign-off.
- `references/threat-model.md` — STRIDE attack surface analysis.