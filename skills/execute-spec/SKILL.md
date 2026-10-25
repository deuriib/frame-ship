---
name: execute-spec
description: Use when a proposal is approved and the specialist is cleared to write code.
---

# Execute Spec — Specialist Implementation

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Implement strictly within the approved proposal boundaries with `REQ-ID → test → artifact` traceability. Scope expansion requires a new proposal.

## Chain Contract

- **Previous:** `frame-ship:propose-changes` (+ `review-security` / `review-architecture` approvals)
- **Supporting:** (subagents) `references/worktree-annex.md` — isolated parallel lanes at `.worktrees/<spec-id>`
- **Next:** `frame-ship:quality-gate` | (optional before review) `frame-ship:pull-request`

## Role Binding

Bound to the **owning domain owner + domain specialists** for all 8 business domains. Orchestrator dispatches with reference-only packets. Domain owners/specialists do the work or brief back—cross-domain need → formal Cross-domain request brief to orchestrator. **Specialists never self-dispatch.**

## Process

0. **Pre-flight load — HARD STOP.** `skill(execute-spec)` loaded? Domain owner/specialist role understood? Approvals + `execution_mode` + `DOMAINS` confirmed? Any NO → STOP. Execution is subagents only. Trivial <15-line reversible work is CEO fast-path, outside methodology.
1. **Confirm all required approvals** are recorded and read `execution_mode` (`subagents`, frozen at frame-intent; overridden per SPEC only with CEO waiver) + `DOMAINS` from spec/proposal.
2. **Create implementation plan** via `references/implementation-plan.md` (steps may be file changes OR document/campaign/contract/policy/workflow actions with evidence locations). **Singleton:** single `IMPLEMENTATION_PLAN.md` per lane—create-if-missing else update-in-place, never suffixed.
3. **Parallel lanes (max 2, `subagents`):** create isolated worktrees first per `references/worktree-annex.md` (consent + clean-baseline + ignore-gate + green `mise run typecheck` before any code). Run each SPEC lane inside `.worktrees/<spec-id>`. Remove + prune after gate evidence is attributed.
4. **Dispatch:** orchestrator dispatches entire team; domain owners/specialists do the work or brief back. Each prompt orders the specialist to understand their domain role BEFORE acting. Cross-domain need → formal Cross-domain request brief. No sideways dispatch. Sequential degradation, same contract: same packet, same reviewers, same full-wave gate. No min-gate.
5. **Execute only targets in the approved change list** (files AND non-code targets—no external sends/filings/launches beyond approval).
6. **Produce test/evidence matrix** via `references/test-matrix.md` aligned with `references/testing-template.md` (tests for code, reviews/sign-offs/attestations for non-code). `REQ-ID` trace mandatory for all. **Singleton:** single `TEST_MATRIX.md` per lane.
7. **Run domain quality checks**—engineering: lint, types, tests, security; other domains: peer review, owner sign-off, controls check per plan.
8. **Commit one commit per approved task/REQ-ID** (never batch unrelated REQ-IDs). Body links `REQ-ID → test → artifact`. Examples: `feat(auth-001): add session store with REQ-001 test trace`, `fix(auth-002): enforce TTL per REQ-002`.
9. **Hand off** to `quality-gate` with `SPEC/HARD/GATE/DOMAINS` packet intact.

## What I Won't Do

- Exceed spec scope without a new proposal.
- Skip tests/evidence for P0 requirements (tests for code, sign-off/attestation for non-code).
- Modify targets outside the approved change list (files or non-code deliverables).

## Red Flags

| Thought | Reality |
|---|---|
| "Small scope creep while I'm here" | Scope expansion requires a new proposal. Stop and propose. |
| "Tests can come after the gate" | Test/evidence matrix per REQ-ID is required before handoff. P0 without tests = no handoff. |
| "I'll batch these commits" | One commit per approved REQ-ID. Unrelated REQ-IDs never share a commit. |
| "Two lanes means two agents in one thread" | Parallel = isolated worktrees per `worktree-annex.md`. Sequential same-thread is the degradation path. |
| "Sequential harness = weaker gate" | Same packet, same reviewers, same full-wave gate. No silent downgrade. |

## References

- `references/implementation-plan.md` — Steps + order + rollback points.
- `references/test-matrix.md` — REQ-ID to test traceability.
- `references/testing-template.md` — Test types, standard paths, coverage floors, and Frame→Ship stage fit.
- `references/worktree-annex.md` — Isolated parallel lanes (max 2): create/verify/remove, security guards, pwsh flow, announce wording.