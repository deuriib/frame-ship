---
name: propose-changes
description: Produce a structured PROPOSED_CHANGES.md for a spec without modifying repository files. Use when a specialist is ready to implement or a change needs pre-approval.
---

# Propose-Changes — Proposal Without Code

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## 1. Purpose

Force design-before-code. The proposal is reviewable; the repo is untouched.

## 2. Chain Contract

- Previous: translate-to-spec
- Next: review-security / review-architecture (as required), then execute-spec

## 2b. Role Binding (Org)

- **Bound to:** owning C-level + domain specialists for all 8 business domains
  (see `../AGENTS.md` catalogue): engineering (`backend`, `frontend`, `devops`,
  `data-engineer` under `vasquez`), security (`barrera`), finance (`dauhajre`),
  legal (`subero`), marketing/brand (`vera`), people (`santana`), revenue
  (`montero`), automation/ops (`espinoza` + `vasquez` mechanics).
- Specialists never self-dispatch, never approve their own proposal.

## 3. Process

1. Read the target spec (`docs/specs/20_backlog/` or individual spec file) including `execution_mode` and `Domains-touched`.
2. Produce `docs/specs/40_workspace/<agent>/PROPOSED_CHANGES.md` via `references/proposal-template.md` carrying `execution_mode` + `DOMAINS` forward.
3. Include risk assessment via `references/risk-assessment.md` (blast radius covers systems + teams + customers + regulators + revenue).
4. Identify approvers by domain (owning C-level mandatory; `vasquez` for engineering/architecture impact; `barrera` for auth/data/API/PII) and block until approval.
5. Hand off to `review-security` / `review-architecture` as required with `SPEC/HARD/GATE/DOMAINS` packet intact.

## 4. What I won't do

- Modify repository files during proposal phase.
- Skip risk assessment for auth, data, or external-API changes.
- Approve my own proposal.

## 5. References

- `references/proposal-template.md` — Proposed-changes template.
- `references/risk-assessment.md` — Risk matrix + blast radius + rollback.
