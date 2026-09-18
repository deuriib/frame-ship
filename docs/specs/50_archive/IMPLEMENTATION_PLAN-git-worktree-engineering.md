# Implementation Plan: SPEC-git-worktree-engineering (engineering lane)

**Agent:** engineering specialist, vasquez lens — skill(frame-ship:execute-spec)
**Date:** 2026-09-16
**Approved By:** engineering owner ARCH Approved via ADR-004 accepted 9/9; security owner SEC Conditional C-001..C-006
**Domains-Touched:** [engineering]
**Execution_Mode:** multi-subagents, win32/pwsh only, single writer per file
**Packet:** SPEC:docs/specs/20_backlog/SPEC-git-worktree-engineering.md#REQ-001..008 / HARD:multi-subagents+win32-pwsh / GATE:arch-Approved+sec-Conditional / DOMAINS:[engineering, automation/ops, security, people]

Scope: engineering-owned files only. Parallel lanes own `guards.md`, `pwsh-flow.md`, `announce-template.md` — never touched here. Chain, plugin, catalogue unchanged.

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Append fail-closed ignore entry so no worktree content is ever tracked — C-001 relevant part | `.gitignore` — append `.worktrees/` with comment | TEST_MATRIX-git-worktree-engineering.md T-002 plus `git check-ignore -q .worktrees` exit 0 and `git status --porcelain` zero-tracked snapshot | 0.25h |
| 2 | Create supporting skill with exact frontmatter and body shape, pwsh-native, max-2, consent plus announce by reference, check-ignore fail-closed by reference, reference-only packets | `skills/git-worktree/SKILL.md` — file-create | TEST_MATRIX-git-worktree-engineering.md T-001 plus frontmatter parse log | 0.5h |
| 3 | Create lifecycle reference create to verify to remove with pwsh command contracts and serialized baseline gate | `skills/git-worktree/references/worktree-lifecycle.md` — file-create | TEST_MATRIX-git-worktree-engineering.md T-005/T-006 plus command-contract checklist | 0.5h |
| 4 | Write this implementation plan with order, rollback, and gates | `docs/specs/40_workspace/vasquez/IMPLEMENTATION_PLAN-git-worktree-engineering.md` — file-create | This file; packet intact | 0.25h |
| 5 | Write test matrix REQ-001..008 trace with C-001/C-002/C-003 evidence and run domain checks with zero POSIX hits and check-ignore green | `docs/specs/40_workspace/vasquez/TEST_MATRIX-git-worktree-engineering.md` — file-create | Test matrix file; domain-check logs referenced therein; no commit — orchestrator owns commits | 0.5h |

Each step maps to one work-unit commit owned by the orchestrator — no commits from this lane.

## Order of Operations

Step 1 first so the fail-closed ignore gate is green before any worktree command is ever demonstrated — check-ignore must pass before first add per INV-002. Steps 2 and 3 follow in dependency order: `SKILL.md` §5 resolves only to the lifecycle file this lane owns, keeping AC-001 resolvable without waiting on parallel lanes. Steps 4 and 5 last as evidence wrappers — plan records order and rollback, matrix records REQ trace plus C-001/C-002/C-003 snapshots. No step depends on parallel-lane files; guards, pwsh-flow, and announce wording are consumed by reference only.

## Rollback Points

- Safe stop after any step — all outputs are uncommitted workspace files plus one `.gitignore` hunk.
- Code revert: `git checkout -- .gitignore` pre-commit restores the ignore hunk; `Remove-Item -Recurse -LiteralPath "skills/git-worktree"` deletes lane files; `Remove-Item -LiteralPath` on the two `40_workspace/vasquez/*-git-worktree-engineering.md` docs removes evidence wrappers.
- Worktree residue: `git worktree list` must show count at or below 2; any live test worktree removed via `git worktree remove --force` then `git worktree prune`, confirmed by a second `git worktree list`.
- Owner: engineering owner, vasquez lens. ETA within one session turn-batch. No prod, customer, or data effects — workspace-only revert. Confirm `git status --porcelain` clean on `main` after revert.
- C-002/C-004/C-005/C-006 relevant parts owned by other lanes or orchestrator — this lane rolls back only its four files plus the ignore hunk, by reference for the rest.

## Quality Gates

Domain checks — engineering lane keeps Engineering, all other domains by reference:

- [ ] Engineering: frontmatter parses with exactly `name`/`description` — pass; POSIX dollar-paren scan over lane files returns 0 hits — pass; `git check-ignore -q .worktrees` exit 0 after edit — pass; `git status --porcelain` shows zero tracked `.worktrees/` paths — pass; `git worktree list` live count at or below 2 — pass; secret-assignment scan over lane files returns 0 hits per C-002 — pass; `mise run typecheck` baseline untouched — no code surface, consumed serialized per automation lane by reference
