---
name: verify-handoff
description: Verify completed implementation meets Definition of Done and produce a structured handoff. Use when a specialist declares work complete and it needs review before shipping.
---

# Verify-Handoff — Definition of Done Verification

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## 1. Purpose

Run the full DoD checklist against spec + test matrix + open gate report, then
produce HANDOFF.md routing to the next agent. No gate OPEN, no handoff.

## 2. Chain Contract

- Previous: frame-ship:quality-gate (must be OPEN)
- Next: frame-ship:ship-release (on complete) or frame-ship:execute-spec (on findings)

## 2b. Role Binding (Org)

- **Bound to:** owning C-level gate (`vasquez` / `barrera` / domain owner) with
  `montilla` synthesizing cross-domain handoffs.

## 3. Process

0. Pre-flight LOAD — HARD STOP: `skill(verify-handoff)` loaded? Owning C-level template read? `SPEC/HARD/GATE/DOMAINS` packet + `GATE_REPORT.md` in hand? Any NO → STOP. Single = direct verify; multi = CEO dispatches `task(subagent_type="general")` ordered to read skill + template first. No OPEN gate = no handoff (waiver only c-levels + CEO).
1. Read spec + test/evidence matrix + `GATE_REPORT.md` with `SPEC/HARD/GATE/DOMAINS` packet intact.
2. Run DoD via `references/dod-checklist.md` — Common section for all, Domain appendix only for touched domains.
3. Produce `docs/specs/40_workspace/<agent>/HANDOFF.md` via `references/handoff-template.md` (deliverables may be files, documents, filings, campaigns, closes, workflows — with evidence links).
4. All gates pass → hand off to `frame-ship:ship-release`.
5. Gates fail → return to `frame-ship:execute-spec` with specific findings.
6. Close with work-unit commit per `../using-frame-ship/references/commit-convention.md` (guidance only). Example: `docs(handoff-003): verify DoD and route SPEC-003 to ship`.

## 4. What I won't do

- Approve without the full DoD checklist.
- Skip security verification for security-relevant specs.
- Allow shipping without doc updates.

## 5. References

- `references/handoff-template.md` — Deliverables + DoD + next agent.
- `references/dod-checklist.md` — Functional/quality/security/docs gates.
- `../using-frame-ship/references/commit-convention.md` — Commit format + per-stage examples (guidance only; see `frame-ship:using-frame-ship`).
