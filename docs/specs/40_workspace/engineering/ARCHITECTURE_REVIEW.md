# Architecture Review: SPEC-subagents-naming-engineering & SPEC-subagents-naming-people

**Reviewer:** Vasquez (Engineering Owner)  
**Date:** 2026-09-20  
**Verdict:** Approved  

## Contract Compliance

| Invariant | Status | Notes |
|-----------|--------|-------|
| INV-001 (Singular Methodological Mode) | pass | Both engineering and people proposals adopt `subagents` as the sole canonical execution mode; `multi-subagents` and legacy mode references are completely retired across all 20 active surfaces. |
| INV-002 (Envelope Purity — Reference-Only) | pass | All inter-stage transitions strictly adhere to 4-tuple reference-only packet envelopes (`SPEC/HARD/GATE/DOMAINS`); no raw file content or full specs are pasted. |
| INV-003 (HARD Prefix Discipline) | pass | Packet envelopes strictly enforce the `HARD:subagents` prefix discipline (`HARD:subagents+<constraints>`); zero untracked overrides. |
| INV-004 (Sequential Equivalence) | pass | Contract `W-SEQ` is embedded verbatim across both proposals; harnesses lacking background task capabilities degrade sequentially in the same thread with identical reviewers, identical packets, and full-wave gates. |
| INV-005 (Fast-Path Containment) | pass | Trivial reversible work (<15 lines) is strictly bounded to the CEO fast-path checkpoint-only outside the methodology; no pseudo-stages or chain branching introduced. |
| INV-006 (Parallel Worktree Bound) | pass | `skills/git-worktree/SKILL.md` enforces a hard upper bound of max 2 live parallel lanes under repo-local `.worktrees/<spec-id>` with branch-per-SPEC. |
| INV-007 (Historical Immutability) | pass | Strict adherence to Option A: zero modifications to `docs/specs/50_archive/`, prior `BRIEF-*.md` files, archived ADRs (`ADR-001..008`), past release notes, or completed gate evaluations. |
| INV-008 (Singleton Working File Discipline) | pass | Canonical working files (`PROPOSED_CHANGES.md`, `ARCHITECTURE_REVIEW.md`, `GATE_REPORT.md`, `HANDOFF.md`) strictly maintained as singletons without suffixing. |

## ADR Required?

- [x] Yes — ADR-009 created (`docs/specs/12_adr/ADR-009-subagents-naming.md`)
- [ ] No — change is within existing contracts

## Conditions for Approval

None. The proposals in `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` and `docs/specs/40_workspace/people/PROPOSED_CHANGES.md` fully satisfy the canonical architecture contract established in `docs/specs/10_design/ARCHITECTURE.md`. All 20 target surfaces are precisely bounded, shared contracts `W-SUBAGENTS` and `W-SEQ` are byte-identical across both lanes, and historical immutability (Option A) is rigorously maintained.

The initiative is cleared to proceed to execution under `frame-ship:execute-spec` upon standard gate dispatch.

## Sign-off

- [x] Vasquez (Engineering Owner)
