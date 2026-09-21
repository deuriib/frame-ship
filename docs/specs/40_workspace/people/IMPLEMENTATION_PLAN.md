# Implementation Plan: SPEC-subagents-naming-people

**Agent:** santana (people owner) / people-specialist  
**Date:** 2026-09-20  
**Approved By:** santana (people owner) + vasquez (engineering owner), barrera (security owner)  
**Domains-Touched:** [people, engineering]  

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Standardize onboarding load order, role understanding, and hard rules with W-SUBAGENTS | `skills/using-frame-ship/SKILL.md` | `docs/specs/40_workspace/people/TEST_MATRIX.md#REQ-F-001` | 0.5h |
| 2 | Standardize bootstrap checklist with W-SUBAGENTS and sequential degradation W-SEQ | `skills/using-frame-ship/references/bootstrap-checklist.md` | `docs/specs/40_workspace/people/TEST_MATRIX.md#REQ-F-002` | 0.5h |
| 3 | Update initiation pre-flight and mode freeze to subagents only (no mode question) | `skills/frame-intent/SKILL.md` | `docs/specs/40_workspace/people/TEST_MATRIX.md#REQ-F-003` | 0.5h |
| 4 | Update product brief template Execution_Mode to W-BRIEF-MODE | `skills/frame-intent/references/product-brief.md` | `docs/specs/40_workspace/people/TEST_MATRIX.md#REQ-F-004` | 0.5h |
| 5 | Restore persistent rules header, chain, hard rules, and add Execution mode (W-SUBAGENTS) | `rules/frame-ship.md` | `docs/specs/40_workspace/people/TEST_MATRIX.md#REQ-F-005` | 0.5h |
| 6 | Create Antigravity discovery mirror in exact byte lockstep with rules/frame-ship.md | `.agents/rules/frame-ship.md` | `docs/specs/40_workspace/people/TEST_MATRIX.md#REQ-F-006` | 0.5h |
| 7 | Update people gate review criteria with W-PPL-GATE checklist items and residue grep | `skills/quality-gate/references/domains/people-review.md` | `docs/specs/40_workspace/people/TEST_MATRIX.md#REQ-F-008` | 0.5h |
| 8 | Run full verification suite (W-SUBAGENTS diff=0, zero residue grep, typecheck, byte lockstep) | `docs/specs/40_workspace/people/TEST_MATRIX.md` | `docs/specs/40_workspace/people/TEST_MATRIX.md#REQ-F-007` | 0.5h |

Each step maps to one commit unless the plan explicitly groups them.

## Order of Operations

1. Step 1 & 2 establish core agent onboarding rules (`using-frame-ship` skill and its bootstrap checklist), ensuring any spawned subagents operate under the canonical `subagents` nomenclature.
2. Step 3 & 4 update the initiation stage (`frame-intent` skill and its product brief template) to freeze execution mode as `subagents` without questioning the mode.
3. Step 5 & 6 restore and establish the persistent rules and the Antigravity discovery mirror in exact byte lockstep (`diff = 0`), ensuring runtime and hook consistency.
4. Step 7 aligns the quality gate criteria in `people-review.md` so that the reviewer checklist verifies `W-SUBAGENTS` and residue absence.
5. Step 8 executes static analysis (`mise run typecheck`), zero-residue greps, lockstep diff checks, and compiles `TEST_MATRIX.md`.

## Rollback Points

- Git atomic rollback: Each step can be reverted cleanly via `git revert <sha>` without affecting other stages or code runtimes.
- Non-code documentation changes only: No database migrations, external network calls, or third-party dependencies are introduced.
- Pre-merge checkpoints: All checks are verified before handoff to `quality-gate`.

## Quality Gates

Domain checks (delete non-touched, keep evidence path):

- [x] Engineering: Lint / Tests / Security / Type checks passing (`mise run typecheck`, diff=0 verification)
- [x] People: people owner impact/change-plan sign-off (`skills/quality-gate/references/domains/people-review.md`)
