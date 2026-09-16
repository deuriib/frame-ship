# ADR-004: git-worktree isolation — supporting skill, repo-local default

**Date:** 2026-09-16
**Deciders:** engineering owner (vasquez), automation owner, security owner (barrera), people owner (santana)
**Status:** accepted

## Context

`multi-subagents` parallel dispatch (max 2 lanes) needed isolation without touching chain order, plugin runtime, or the 8-domain catalogue. Four domain specs cover the surface: `docs/specs/20_backlog/SPEC-git-worktree-engineering.md` (REQ-001..008), `SPEC-git-worktree-automation.md` (REQ-AUTO-001..007), `SPEC-git-worktree-security.md` (REQ-SEC-001..008), `SPEC-git-worktree-people.md` (REQ-PPL-001..005), consolidated in `docs/specs/10_design/ARCHITECTURE-git-worktree.md` (INV-001..009). Four proposals now validate against that contract (see architecture review `docs/specs/40_workspace/vasquez/ARCHITECTURE_REVIEW-git-worktree.md`).

## Decision

1. **Supporting skill, not a stage.** `skills/git-worktree/` (`SKILL.md` + `references/worktree-lifecycle.md`, `pwsh-flow.md`, `guards.md`) is an orchestrator habit + `execute-spec` isolation contract. Chain `frame-intent → … → ship-release` unchanged (INV-001); plugin stays single-file zero-dep, 8-domain catalogue unchanged (INV-005).
2. **Repo-local `.worktrees/<spec-id>` default.** Branch-per-SPEC (`git worktree add .worktrees/<spec-id> -b <branch>`), per-`<spec-id>` gate evidence attribution. Sandbox `Temp\opencode` is fallback only, TTL-bound with declared owner (automation + security co-sign).
3. **Fail-closed ignore gate.** `.gitignore` appends `.worktrees/`; `git check-ignore -q .worktrees` must pass before first `add` (nonzero = STOP, no override on the ignore gate). No `.worktrees/` path ever tracked (INV-002).
4. **Max 2 parallel lanes.** Live `git worktree list` count never exceeds 2; third dispatch waits or escalates to orchestrator. Serialized `mise` setup (max 1 installer), per-worktree `mise run typecheck` green gate before `execute-spec` (INV-003).
5. **pwsh-native throughout.** Zero POSIX `$(...)`, `Resolve-Path`-safe joins, `git status --porcelain` clean-baseline verify; dirty baseline REFUSEs `add` unless explicit session-recorded override (INV-004, INV-007).
6. **Consent + uniform announce.** Consent-before-create (transcript Q+A, silent creation forbidden) plus exactly-once warm announce per create/remove (dónde + rama + por qué + limpieza); removal announces once. Uniform template owned by people owner; per-owner variants only via people-owner + orchestrator waiver (INV-008). Proposal-before-code and reference-only `SPEC/HARD/GATE/DOMAINS` packets ride every lane (INV-006, INV-009).

## Consequences

### Positive

- Parallel lanes isolated with attributable evidence; `main` stays clean and committable; failed setup never blocks `main` (remove + prune restores).
- Single fail-closed gate (`check-ignore`) + serialized setup removes lock-flake and commit-leak classes before implementation spend.
- Consent + uniform wording keeps the isolation habit adoptable (exactly-once, no re-prompts, readable refusal).
- Deny-default boundaries + allowlisted evidence satisfy Ley 172-13 minimization end-to-end.

### Negative

- Throughput capped at 2 lanes; third SPEC waits — orchestrator queue depth bounds parallel delivery.
- Serialized `mise` setup trades speed for reliability; per-worktree typecheck adds baseline latency each lane.
- Repo-local default accumulates residue on failure unless TTL + `remove`/`prune` discipline holds; sandbox fallback needs explicit TTL ownership or it drifts permanent.
- Uniform announce forbids per-owner tone without waiver — expressiveness traded for fatigue control.

## Supersedes / Superseded By

Supersedes: none. Not superseded at filing time.
