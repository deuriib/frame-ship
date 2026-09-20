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
- Supporting: (multi-subagents) frame-ship:git-worktree
- Next: frame-ship:quality-gate | (optional before review) frame-ship:pull-request

## 2b. Role Binding (Org)

- **Bound to:** owning domain owner + domain specialists for all 8 business domains — engineering specialists plus domain executors (finance/legal/marketing/people/revenue/automation).
- Orchestrator dispatches with reference-only packets (`SPEC:<path>#REQ / HARD:<execution_mode+constraints> / GATE:<verdicts> / DOMAINS:<list>`). Domain owners/specialists do the work or brief back — cross-domain need → formal Cross-domain request brief to orchestrator, who delegates or resolves; specialists never self-dispatch.
- Domain expertise: each domain owner/specialist understands their domain's practices and review criteria.

## 3. Process

0. Pre-flight LOAD — HARD STOP: `skill(execute-spec)` loaded? Domain owner/specialist role understood? Approvals + `execution_mode` + `DOMAINS` confirmed? Any NO → STOP. Execution is multi-subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.
1. Confirm all required approvals are recorded and read `execution_mode` (`multi-subagents`, frozen at frame-intent; overridden per SPEC only with CEO waiver) + `DOMAINS` from spec/proposal.
2. Create implementation plan via `references/implementation-plan.md` (steps may be file changes OR document/campaign/contract/policy/workflow actions with evidence locations). Singleton: the single `IMPLEMENTATION_PLAN.md` per lane — create-if-missing else update-in-place, never `IMPLEMENTATION_PLAN-*.md`.
3. Dispatch: orchestrator dispatches entire team; domain owners/specialists do the work or brief back — each prompt orders the specialist to understand their domain role BEFORE acting; cross-domain need → formal Cross-domain request brief to orchestrator, who delegates or resolves; no sideways dispatch. Sequential degradation, same contract: harnesses without task run lanes sequentially in the same thread — same packet, same reviewers, same full-wave gate. No min-gate, no silent downgrade.
4. Execute only targets in the approved change list (files AND non-code targets — no external sends/filings/launches beyond approval).
5. Produce test/evidence matrix via `references/test-matrix.md` (tests for code, reviews/sign-offs/attestations for non-code, REQ-ID trace mandatory for all). Singleton: the single `TEST_MATRIX.md` per lane — create-if-missing else update-in-place, never `TEST_MATRIX-*.md`.
6. Run domain quality checks (engineering: lint, types, tests, security; other domains: peer review, owner sign-off, controls check per plan).
7. Commit one commit per approved task/REQ-ID (never batch unrelated REQ-IDs). Body links `REQ-ID → test → artifact`. Examples: `feat(auth-001): add session store with REQ-001 test trace`, `fix(auth-002): enforce TTL per REQ-002`.
8. Hand off to `frame-ship:quality-gate` with `SPEC/HARD/GATE/DOMAINS` packet intact.

## 4. What I won't do

- Exceed spec scope without a new proposal.
- Skip tests/evidence for P0 requirements (tests for code, sign-off/attestation for non-code).
- Modify targets outside the approved change list (files or non-code deliverables).

## 5. References

- `references/implementation-plan.md` — Steps + order + rollback points.
- `references/test-matrix.md` — REQ-ID to test traceability.
