---
name: propose-changes
description: Produce a structured PROPOSED_CHANGES.md for a spec without modifying repository files. Use when a specialist is ready to implement or a change needs pre-approval.
---

# Propose-Changes — Proposal Without Code

> _"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."_

## 1. Purpose

Force design-before-code. The proposal is reviewable; the repo is untouched.

## 2. Chain Contract

- Previous: frame-ship:translate-to-spec | (optional defect triage) frame-ship:debugging
- Next: frame-ship:review-security / frame-ship:review-architecture (as required), then frame-ship:execute-spec

## 2b. Role Binding (Org)

- **Bound to:** orchestrator dispatches; owning domain owner + domain specialists return proposals for all 8 business domains
  (see `../AGENTS.md` catalogue): engineering, security, finance, legal, marketing/brand, people, revenue, automation/ops.
  Orchestrator dispatches entire team; domain owners/specialists do the work or brief back.
- Specialists never self-dispatch, never approve their own proposal.

## 3. Process

0. Pre-flight LOAD — HARD STOP: `skill(propose-changes)` loaded? Agent template read for proposing specialist + owning domain owner? Any NO → STOP. Single = direct, no task; multi = orchestrator dispatches ordered to read skill; orchestrator dispatches entire team; domain owners/specialists do the work or brief back — the domain owner returns its proposal to the orchestrator.
1. Read the target spec (`docs/specs/20_backlog/SPEC-###-<slug>.md`) including `execution_mode` and `Domains-touched`.
2. Produce `docs/specs/40_workspace/<domain>/PROPOSED_CHANGES.md` via `references/proposal-template.md` carrying `execution_mode` + `DOMAINS` forward. Singleton: create-if-missing else update-in-place, never suffix — one UPPER_SNAKE canonical per lane (only `PROPOSED_CHANGES.md`, never `PROPOSED_CHANGES-*.md`).
3. Include risk assessment via `references/risk-assessment.md` (blast radius covers systems + teams + customers + regulators + revenue).
4. Identify approvers by domain (owning domain owner mandatory; engineering owner for architecture impact; security owner for auth/data/API/PII) and block until approval.
5. Hand off to `frame-ship:review-security` / `frame-ship:review-architecture` as required with `SPEC/HARD/GATE/DOMAINS` packet intact.
6. Close with a commit (the proposal doc itself is committed, impl files stay untouched). Example: `docs(proposal-003): add PROPOSED_CHANGES for auth with blast radius`.

### C2 — Pre-approval challenge trigger + one-pass budget (REQ-002)

- Mechanics (glossary, opener/exit, one-at-a-time, warmth, masking, N+1, stall breaker): `../using-frame-ship/references/challenge-round.md` §1–§2 — never redefined here.
- Trigger (any): auth/data/API/PII surface; multi-domain scope; blast radius mentioning customers/regulators/revenue (synonym scan fires even when prose says "internal only"); approver request.
- Budget: exactly one pass of ≤3 questions (question 4 = FAIL); approver-requested re-grill ≤1 extra pass (≤2 total). Untouched rule: repo files AND external sends/filings/launches stay untouched during the round.
- Exit terminal (pre-decision): exit before approve/reject = pause + recorded `grill: exited` + escalate; proposal stays unapproved (no silent promote). Then terminal approve/reject.

## 4. What I won't do

- Modify implementation files during proposal phase (only `docs/specs/40_workspace/<domain>/PROPOSED_CHANGES.md` + risk assessment are produced and committed).
- Skip risk assessment for auth, data, or external-API changes.
- Approve my own proposal (specialists never self-approve).

## 5. References

- `references/proposal-template.md` — Proposed-changes template.
- `references/risk-assessment.md` — Risk matrix + blast radius + rollback.
