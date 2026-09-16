# Implementation Plan: SPEC-git-worktree-automation (automation lane)

**Agent:** automation specialist, automation owner + engineering for ops — skill(frame-ship:execute-spec)
**Date:** 2026-09-16
**Approved By:** engineering owner ARCH Approved; security owner SEC Conditional C-001..C-006 (this lane implements C-005 plus C-003 ops parts, others by reference)
**Domains-Touched:** [automation/ops]
**Execution_Mode:** multi-subagents, win32/pwsh only, single writer per file
**Packet:** SPEC:docs/specs/20_backlog/SPEC-git-worktree-automation.md#REQ-AUTO-001..007 / HARD:multi-subagents+win32-pwsh+serialized-mise+max-2+reference-only / GATE:arch-Approved+sec-Conditional-C-001..C-006 / DOMAINS:[engineering, automation/ops, security, people]

Scope: automation-owned files only. Parallel lanes own `SKILL.md`,
`worktree-lifecycle.md`, `guards.md`, `announce-template.md`, and the
`.gitignore` entry — never touched here; consumed by reference. `mise.toml`
semantics unchanged (read-only). Chain, plugin runtime, catalogue unchanged.
No commits from this lane — orchestrator owns commits.

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Create pwsh-native runbook section: clean check, one add per SPEC-ID with Resolve-Path-safe joins, live-count guard at or below 2, serialized mise setup with installer mutex, typecheck baseline gate, TTL plus remove-prune-verify terminal state — REQ-AUTO-001..007 | `skills/git-worktree/references/pwsh-flow.md` — file-create | TEST_MATRIX-git-worktree-automation.md T-001..T-007 plus C-003 list snapshot ref and C-005 TTL statement | 0.75h |
| 2 | Write this implementation plan with order, rollback, and gates | `docs/specs/40_workspace/vasquez/IMPLEMENTATION_PLAN-git-worktree-automation.md` — file-create | This file; packet intact | 0.25h |
| 3 | Write test matrix REQ-AUTO-001..007 trace with C-005 TTL plus owner evidence, C-003 list snapshot ref, C-002 scan 0 over lane files, and run domain checks with zero POSIX hits and mise semantics unchanged | `docs/specs/40_workspace/vasquez/TEST_MATRIX-git-worktree-automation.md` — file-create | Test matrix file; domain-check logs referenced therein; no commit — orchestrator owns commits | 0.5h |

Each step maps to one work-unit commit owned by the orchestrator — no commits from this lane.

## Order of Operations

Step 1 first because it is the only implementation deliverable — the runbook
section all REQ-AUTO evidence attaches to. The create-verify-setup-baseline
order inside `pwsh-flow.md` mirrors the lifecycle: clean check and
check-ignore before the first add (fail-closed), one add per SPEC-ID with
count guard, serialized setup under the installer mutex, green baseline
before `execute-spec`, TTL-bound remove plus prune with residue verify.
Steps 2 and 3 last as evidence wrappers — plan records order and rollback,
matrix records the REQ trace plus C-002, C-003, C-005 snapshots. No step
depends on parallel-lane files; skill prose, guards, ignore entry, and
announce wording are consumed by reference only.

## Rollback Points

- Safe stop after any step — all outputs are uncommitted workspace files; no
  toolchain, ignore, or skill-shape changes.
- File revert pre-commit: `Remove-Item -LiteralPath` on
  `skills/git-worktree/references/pwsh-flow.md` plus the two
  `40_workspace/vasquez/*-git-worktree-automation.md` docs restores the tree;
  confirm `git status --porcelain` shows no residue.
- Worktree residue: `git worktree list` must show count at or below 2; any
  live drill worktree removed via `git worktree remove --force` then
  `git worktree prune`, confirmed by a second `git worktree list`.
- Owner: automation owner (runbook, capacity, TTL) plus engineering owner
  (ops mechanics verify). ETA within one session turn-batch. No prod,
  customer, or data effects — workspace-only revert.
- C-001, C-002, C-004, C-006 relevant parts owned by other lanes or the
  orchestrator — this lane rolls back only its three files, by reference for
  the rest.

## Quality Gates

Domain checks — automation lane keeps Automation/ops, all other domains by reference:

- [ ] Automation/ops: automation owner plus engineering owner runbook, flags, capacity check — pwsh-only flow with Resolve-Path-safe joins, status clean check, one add per SPEC-ID, live count at or below 2, serialized mise setup with installer mutex, typecheck baseline gate, TTL plus remove-prune-verify — pass; POSIX dollar-paren scan over lane files returns 0 hits — pass; `mise.toml` semantics unchanged (read-only, diff empty) — pass; `git worktree list` live count at or below 2 — pass; C-002 assignment scan over lane files returns 0 hits — pass
- [ ] Engineering: ops-mechanics interface plus baseline override path — by reference to engineering lane and ARCH INV-003, INV-007
- [ ] Security: ignore gate, trust boundaries, evidence allowlist — by reference to security lane and guards.md; C-001, C-004, C-006 not modified here
- [ ] People: consent plus announce wording — by reference to people lane, consumed verbatim
