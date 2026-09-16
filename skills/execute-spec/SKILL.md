---
name: execute-spec
description: Execute an approved spec through structured implementation with test traceability. Use when a proposal is approved and the specialist is cleared to write code. Triggered by "implement this spec" or "execute SPEC-XXX".
---

# Execute-Spec — Specialist Implementation

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## 1. Purpose

Implement strictly within the approved proposal boundaries with REQ-ID →
test → artifact traceability. Scope expansion requires a new proposal.

## 2. Chain Contract

- Previous: frame-ship:propose-changes (+ frame-ship:review-security / frame-ship:review-architecture approvals)
- Next: frame-ship:quality-gate

## 2b. Role Binding (Org)

- **Bound to:** owning C-level + domain specialists for all 8 business domains — engineering leafs (`backend`, `frontend`, `devops`, `data-engineer` under `vasquez`) plus domain executors (finance/legal/marketing/people/revenue/automation specialists under `dauhajre/subero/vera/santana/montero/espinoza`).
- The CEO dispatches with reference-only packets (`SPEC:<path>#REQ / HARD:<execution_mode+constraints> / GATE:<verdicts> / DOMAINS:<list>`) via `task(subagent_type="general")` max 2 parallel, whose prompt orders the subagent to read this skill + its `agents/<domain>/<agent>.md` template first; CEO dispatches entire team; c-levels/specialists do the work or brief back — cross-domain need → formal Cross-domain request brief to the CEO, who delegates or resolves; specialists never self-dispatch.
- Craft templates: `agents/engineering/<agent>.md` and `agents/c-level/vasquez.md` for engineering, `agents/<domain>/<agent>.md` for other domains — the dispatched ONE is read fully, others cited by path.

## 3. Process

0. Pre-flight LOAD — HARD STOP: `skill(execute-spec)` loaded? `read(agents/<domain>/<agent>.md)` for dispatched specialist + owning C-level template done? Approvals + `execution_mode` + `DOMAINS` confirmed? Any NO → STOP. Single = direct, no task; multi = CEO `task(general)` max 2 parallel, each ordered to read skill + template first.
1. Confirm all required approvals are recorded and read `execution_mode` + `DOMAINS` from spec/proposal (`single` or `multi-subagents`).
2. Create implementation plan via `references/implementation-plan.md` (steps may be file changes OR document/campaign/contract/policy/workflow actions with evidence locations).
3. Dispatch by mode:
   - `single`: one specialist owns execution end-to-end (code or non-code) DIRECTLY, no `task`; still produces test/evidence matrix and runs domain checks. Output cites `skill(execute-spec)` + template path.
   - `multi-subagents` (default): CEO dispatches entire team; c-levels/specialists do the work or brief back — montilla (CEO) calls `task(subagent_type="general")` max 2 parallel per vasquez classify table (architect → design, leaf → impl, reviewers as subagents); each prompt orders read of this skill + `agents/<domain>/<agent>.md` first; cross-domain need → formal Cross-domain request brief to the CEO, who delegates to the right agent or resolves; no sideways dispatch.
4. Execute only targets in the approved change list (files AND non-code targets — no external sends/filings/launches beyond approval).
5. Produce test/evidence matrix via `references/test-matrix.md` (tests for code, reviews/sign-offs/attestations for non-code, REQ-ID trace mandatory for all).
6. Run domain quality checks (engineering: lint, types, tests, security; other domains: peer review, owner sign-off, controls check per plan).
7. Commit one work-unit commit per approved task/REQ-ID per `../using-frame-ship/references/commit-convention.md` (guidance only; never batch unrelated REQ-IDs). Body links `REQ-ID → test → artifact`. Examples: `feat(auth-001): add session store with REQ-001 test trace`, `fix(auth-002): enforce TTL per REQ-002`.
8. Hand off to `frame-ship:quality-gate` with `SPEC/HARD/GATE/DOMAINS` packet intact.

## 4. What I won't do

- Exceed spec scope without a new proposal.
- Skip tests/evidence for P0 requirements (tests for code, sign-off/attestation for non-code).
- Modify targets outside the approved change list (files or non-code deliverables).

## 5. References

- `references/implementation-plan.md` — Steps + order + rollback points.
- `references/test-matrix.md` — REQ-ID to test traceability.
- `../../agents/README.md` — Execution modes + template index.
- `../using-frame-ship/references/commit-convention.md` — Commit format + per-task rule + examples (guidance only; see `frame-ship:using-frame-ship`).
