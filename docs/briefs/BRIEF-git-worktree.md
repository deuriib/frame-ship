# Product Brief: Git-Worktree Isolation for frame-ship

**ID:** BRIEF-git-worktree
**Initiator:** montilla (CEO)
**Date:** 2026-09-16
**Status:** draft
**Execution_Mode:** multi-subagents (frozen at frame-intent; all specs follow unless overridden per SPEC with CEO waiver)
**Domains-Touched:** engineering, automation/ops, security, people

## Problem Statement

frame-ship runs `multi-subagents` (max 2 parallel) but has no isolated-workspace contract. Parallel SPECs risk dirtying the current workspace: mixed edits, `node_modules`/lock contention, and gate evidence that can't tell which SPEC produced which failure. Adapted from `obra/superpowers:using-git-worktrees` (by reference only), this initiative adds a `git-worktree` supporting skill so each parallel Task runs on a clean baseline without contaminating `main`.

## Desired Outcome

Two SPECs in parallel, zero residue:

1. Each dispatched Task gets an isolated worktree at `.worktrees/<spec-id>` with clean baseline verified before implementation starts.
2. Proposal-before-code and reference-only packets ride into every worktree — no cross-worktree pasting, no phantom state.
3. `.worktrees/` is git-ignored and fail-closed: no accidental commits of worktree contents, no secrets/PII in logs or shares.
4. Windows/pwsh-native flow: consent + warm announce line, setup via `mise`, baseline `typecheck` green.

## Scope

### In Scope

- New supporting skill `skills/git-worktree/SKILL.md` (+ references) — orchestrator habit + `execute-spec` isolation, chain order unchanged [engineering]
- Directory contract: default `.worktrees/` under repo root, verified via `git check-ignore` fail-closed before first `git worktree add` [engineering, security]
- Win32/pwsh adaptations: no POSIX `$(...)`, `Resolve-Path`-safe joins, `git status --porcelain` clean check, max 2 parallel per `execution_mode` [engineering, automation/ops]
- `mise.toml` toolchain reuse + per-worktree baseline (`mise run typecheck`) with serialized setup to avoid lock flake [automation/ops]
- Consent-before-create + announce line (dónde + rama + por qué + limpieza) on every creation [people, security]
- Trust-boundary map: worktree paths/ports/logs as PII checkpoints, mask/tokenize by default, allowlisted evidence only [security]
- Submodule guard + sandbox fallback + dirty-baseline refuse/override path [security, people]

### Out of Scope

- Changing chain order (`frame-intent → translate-to-spec → ... → ship-release`) or inserting a new stage — `git-worktree` is supporting, not a stage
- Changing `.opencode/plugins/frame-ship.ts` runtime (stays single-file zero-dep) or 8-domain catalogue
- Rotating keys, patching prod, widening perms (no freelance fixes — owner remediates)
- Copying upstream code without license/attribution check (reference only)

## Stakeholders

| Role | Agent | Involvement |
|------|-------|-------------|
| Sponsor | montilla | Decision authority + multi-domain gate synthesis |
| Owner | vasquez (engineering) | Skill mechanics, pwsh flow, ADR if contract changes |
| Owner | automation owner + engineering (ops) | mise setup, baseline, parallel discipline |
| Touched | barrera (security) | Trust boundaries, `.gitignore` gate, secrets/PII |
| Touched | santana (people) | Consent + announce wording, DX/change fatigue |

## Constraints

- Budget: none (docs/skill-only change, no infra)
- Timeline: single session for BRIEF → SPEC; reversible (text + `git worktree remove`, `git revert` points)
- Regulatory: Ley 172-13 minimization — no PII/secrets in worktree paths, logs, gate evidence; every PII store declares purpose + TTL + deletion
- Brand/GTM: none
- People/change: consent + announce required; uniform wording to avoid fatigue [people]

## Open Questions

- [ ] Default root final: repo-local `.worktrees/` vs `Temp\opencode` sandbox — who owns cleanup TTL? (owner: automation + security)
- [ ] Announce-line uniform template vs per-owner tone (owner: santana/people)
- [ ] Promotion rule: `40_workspace/<domain>/` scratch maps to which worktree promotes to `10→30` lifecycle? (owner: vasquez/engineering)

## References

- `docs/briefs/OKR-git-worktree.md` — OKRs for this initiative
- Upstream reference (by reference only): `https://github.com/obra/superpowers/blob/main/skills/using-git-worktrees/SKILL.md`
