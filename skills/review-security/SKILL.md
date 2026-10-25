---
name: review-security
description: Use when a change touches auth, data, external APIs, or when security owner sign-off is required.
---

# Review Security

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Threat-model security-relevant proposals with STRIDE and issue a binding verdict: **Approved / Conditional / Rejected**. The repository is untouched—only the review document is produced and committed.

## Chain Contract

- **Previous:** `frame-ship:propose-changes`
- **Next:** `frame-ship:execute-spec` (only on Approved, or Conditional with conditions met)

## Role Binding

Bound to the **security owner**, who orchestrates security reviewers for PII flows. Escalate **Critical/High** findings to the orchestrator.

## Process

0. **Pre-flight load — HARD STOP.** Load `skill(review-security)`. Read agent templates for security owner + security reviewer. No skill = STOP. Security owner runs inside the orchestrator's ordered skill read (single = direct read).
1. Read `docs/specs/40_workspace/<domain>/PROPOSED_CHANGES.md` (singleton canonical—only `PROPOSED_CHANGES.md`, never suffixed).
2. Threat-model with **STRIDE** via `references/threat-model.md`.
3. Produce the review via `references/security-review-template.md`.
4. Issue a binding verdict + conditions. **Block implementation on Rejected.**
5. Close with a commit. Example: `docs(sec-003): approve SECURITY_REVIEW with STRIDE verdict`.

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