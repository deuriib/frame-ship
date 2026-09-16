# Test / Evidence Matrix: SPEC-git-worktree-automation (automation lane)

**Agent:** automation specialist, automation owner + engineering for ops — skill(frame-ship:execute-spec)
**Date:** 2026-09-16
**Domains-Touched:** [automation/ops]
**Approvals:** ARCH Approved; SEC Conditional C-001..C-006 — this lane implements C-005 plus C-003 ops parts, others by reference
**Execution_Mode:** multi-subagents, win32/pwsh only

| REQ-ID | Evidence ID | Description | Type | Status | Commit |
|--------|-------------|-------------|------|--------|--------|
| REQ-AUTO-001 | T-001 | One worktree per SPEC-ID at `.worktrees/<spec-id>` on its own branch with check-ignore fail-closed pre-check and clean-baseline check; artifact `skills/git-worktree/references/pwsh-flow.md` §1 | Review | pass | pending — orchestrator owns commits |
| REQ-AUTO-002 | T-002 | Serialized per-worktree setup reusing mise node 22 with installer mutex, max 1 installer at a time, timestamped logs proving no overlap; artifact `pwsh-flow.md` §3 | Attestation | pass | pending — orchestrator owns commits |
| REQ-AUTO-003 | T-003 | `mise run typecheck` green-in-worktree gate before execute-spec, red blocks impl with engineering-owned override path; artifact `pwsh-flow.md` §4 | Attestation | pass | pending — orchestrator owns commits |
| REQ-AUTO-004 | T-004 | Max 2 parallel active worktrees, live-count guard at or below 2, third dispatch waits or escalates; artifact `pwsh-flow.md` §6 — C-003 ops part | Review | pass | pending — orchestrator owns commits |
| REQ-AUTO-005 | T-005 | Per-worktree TTL plus owner with remove plus prune terminal state verified by list showing no residue; artifact `pwsh-flow.md` §5 — C-005 | Attestation | pass | pending — orchestrator owns commits |
| REQ-AUTO-006 | T-006 | Pwsh-native runbook only with Resolve-Path-safe joins and clean check for create, verify, setup, baseline, remove; POSIX scan 0 hits; artifact `pwsh-flow.md` §§0-5 | Review | pass | pending — orchestrator owns commits |
| REQ-AUTO-007 | T-007 | Capacity controls: `.worktrees/` ignored and fail-closed, no worktree contents committed, no secrets or PII in paths, logs, or evidence, allowlisted evidence only; artifact `pwsh-flow.md` §§6-7 | Attestation | pass | pending — orchestrator owns commits |

Types per `skills/execute-spec/references/test-matrix.md`. Non-code REQs use Review and Attestation with artifact path — REQ-ID trace mandatory.

## Condition Evidence — C-005, C-003, C-002 (lane parts)

- C-005 TTL plus owner: every worktree declares purpose plus TTL plus deletion owner before creation, default owner automation plus security; terminal state is `git worktree remove --force` for the SPEC-ID root, then `git worktree prune`, then `git worktree list` residue verify showing the entry gone and `.worktrees/` empty or absent — pass. Statement lives in `skills/git-worktree/references/pwsh-flow.md` §5; verify steps in §§5 and 7. Sandbox fallback TTL (if repo-local refused) by reference to security lane guards.md.
- C-003 live-count snapshot: `git worktree list` live count at or below 2 at lane close — pass. Snapshot path: session shell log for this lane. Guard pinned in `skills/git-worktree/references/pwsh-flow.md` §§1, 2, 6 with the third-dispatch refusal rule. Canonical count contract by reference to ARCH INV-003.
- C-002 scan: high-signal secret-assignment scan over lane files — `skills/git-worktree/references/pwsh-flow.md`, `docs/specs/40_workspace/vasquez/IMPLEMENTATION_PLAN-git-worktree-automation.md`, `docs/specs/40_workspace/vasquez/TEST_MATRIX-git-worktree-automation.md` — returns 0 hits — pass. Deny-default prose mentions of secret and credential words are policy statements, not embedded values. Full trust-boundary map and remaining C-002, C-001, C-004, C-006 parts by reference to security lane and orchestrator.
- C-001, C-004, C-006: by reference — ignore-gate detail, PII checkpoints, and sandbox fallback owned by parallel lanes plus orchestrator; this lane changes no ignore entries, ports, adapters, or announce tone.

## Coverage Summary

- Unit coverage: N/A — non-code runbook change with justification per template; verification via Review and Attestation with artifact paths.
- Integration coverage: N/A — same justification; cross-lane integration rides the gate diff-stat plus parallel-lane evidence by reference.
- Evidence coverage: 7/7 REQ-IDs with linked artifact — T-001..T-005 plus T-006/T-007.
- Acceptance criteria covered: AC-001 via T-001, AC-002 via T-001 plus T-007, AC-003 via T-002, AC-004 via T-003, AC-005 via T-004, AC-006 via T-005 plus T-007, AC-007 via T-006 — 7/7.
