---
name: propose-changes
description: Use when a specialist is ready to implement or a change needs pre-approval.
---

# Propose Changes — Proposal Without Code

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Force design-before-code. The proposal is reviewable; the repository is untouched.

## Chain Contract

- **Previous:** `frame-ship:translate-to-spec`
- **Next:** `frame-ship:review-security` / `frame-ship:review-architecture` (as required), then `frame-ship:execute-spec`

## Role Binding

Bound to the **orchestrator dispatches**; owning domain owner + domain specialists return proposals for all 8 business domains. Orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. **Specialists never self-dispatch, never approve their own proposal.**

## Process

0. **Pre-flight load — HARD STOP.** `skill(propose-changes)` loaded? Agent template read for proposing specialist + owning domain owner? Any NO → STOP. Single = direct, no task; multi = orchestrator dispatches ordered to read skill.
1. Read the target spec (`docs/specs/20_backlog/SPEC-###-<slug>.md`) including `execution_mode` and `Domains-touched`.
2. Produce `docs/specs/40_workspace/<domain>/PROPOSED_CHANGES.md` via `references/proposal-template.md`, carrying `execution_mode` + `DOMAINS` forward. **Singleton:** create-if-missing else update-in-place, never suffixed.
3. Include **risk assessment** via `references/risk-assessment.md` (blast radius covers systems + teams + customers + regulators + revenue).
4. **Identify approvers by domain**—owning domain owner mandatory; engineering owner for architecture impact; security owner for auth/data/API/PII. **Block until approval.**
5. Hand off to `review-security` / `review-architecture` as required with `SPEC/HARD/GATE/DOMAINS` packet intact.
6. **Close with a commit** (proposal doc itself is committed; impl files stay untouched). Example: `docs(proposal-003): add PROPOSED_CHANGES for auth with blast radius`.

### C2 — Pre-Approval Challenge Trigger + One-Pass Budget (REQ-002)

- Mechanics: `../using-frame-ship/references/challenge-round.md` §1–§2 — never redefined here.
- **Trigger (any):** auth/data/API/PII surface; multi-domain scope; blast radius mentioning customers/regulators/revenue (synonym scan fires even when prose says "internal only"); approver request.
- **Budget:** exactly one pass of ≤3 questions (question 4 = FAIL); approver-requested re-grill ≤1 extra pass (≤2 total).
- **Untouched rule:** repo files AND external sends/filings/launches stay untouched during the round.
- **Exit terminal (pre-decision):** exit before approve/reject = pause + recorded `grill: exited` + escalate; proposal stays unapproved (no silent promote). Then terminal approve/reject.

## What I Won't Do

- Modify implementation files during proposal phase (only `PROPOSED_CHANGES.md` + risk assessment are produced and committed).
- Skip risk assessment for auth, data, or external-API changes.
- Approve my own proposal (specialists never self-approve).

## Red Flags

| Thought | Reality |
|---|---|
| "I'll just fix this one small thing while proposing" | Proposal phase = no code. Repo is untouched until approval. |
| "Risk assessment is boilerplate" | Blast radius covers systems + teams + customers + regulators + revenue. Synonyms count. |
| "I'll self-approve to save a round-trip" | Specialists never self-approve. Owning domain owner must approve. |
| "Conditions in the proposal are enough" | Approvals must be recorded. Block until approver signs. |
| "The approver is me, so it's fine" | No reviewer approves their own proposal—even if they own the domain. |

## References

- `references/proposal-template.md` — Proposed-changes template.
- `references/risk-assessment.md` — Risk matrix + blast radius + rollback.