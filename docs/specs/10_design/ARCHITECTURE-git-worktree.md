# Architecture Contract: git-worktree isolation

**Owner:** engineering owner (vasquez, consolidating; automation/security/people link their domain contracts here)
**Version:** v1 (finalized consolidation — draft invariants kept, no new stage)
**Last Updated:** 2026-09-16
**Domains-Touched:** engineering, automation/ops, security, people
**Covered Specs:** `docs/specs/20_backlog/SPEC-git-worktree-engineering.md` (REQ-001..008) · `SPEC-git-worktree-automation.md` (REQ-AUTO-001..007) · `SPEC-git-worktree-security.md` (REQ-SEC-001..008) · `SPEC-git-worktree-people.md` (REQ-PPL-001..005)
**Brief Reference:** BRIEF-git-worktree (read-only; not modified)

## Overview

Supporting (non-stage) isolation layer for `multi-subagents`: the orchestrator dispatches at most 2 parallel Tasks, each bound to one repo-local worktree at `.worktrees/<spec-id>` verified from a clean `main` baseline. The `skills/git-worktree/` skill owns the pwsh-native lifecycle (consent → check-ignore → add → verify → baseline → remove); chain order, plugin runtime, and domain catalogue are untouched.

No new API surface: engineering contracts are pwsh command contracts + file-shape contracts; non-engineering specs link their domain contracts here instead of forcing API shapes (per `translate-to-spec` §3.4).

## Components

| Component | Responsibility | Interface |
|-----------|---------------|-----------|
| `skills/git-worktree/SKILL.md` | Orchestrator habit + `execute-spec` isolation contract (supporting skill, not a stage) | `skill(git-worktree)` load; §3 pwsh process + §5 `references/*.md` |
| `references/worktree-lifecycle.md` | Canonical create → verify → remove sequence with branch-per-SPEC convention | pwsh commands: `git worktree add/list/remove`, `git status --porcelain` |
| `references/pwsh-flow.md` | Win32-native flow: `Resolve-Path`-safe joins, serialized `mise` setup, max-2 discipline | `mise run typecheck` baseline gate; `git worktree list` count guard |
| `references/guards.md` | Fail-closed gates: `check-ignore`, submodule guard, sandbox fallback, dirty-baseline refuse/override | `git check-ignore -q .worktrees` (nonzero = STOP); override recorded in session |
| `.gitignore` (`.worktrees/`) | Guarantees worktree contents are never tracked or committed | Verified via `git check-ignore`; confirmed by `git status` showing zero tracked `.worktrees/` files |
| Orchestrator dispatch | Owns entire-team dispatch; binds each Task to one `<spec-id>` worktree via reference-only packet | `SPEC:<path>#REQ / HARD:<mode> / GATE:<verdict> / DOMAINS:<list>` — never pasted bodies |

## Data Flow

Worktree lifecycle (one lane per SPEC, max 2 lanes):

```text
main (clean: git status --porcelain == empty)
  → consent + announce (dónde + rama + por qué + limpieza)
  → git check-ignore -q .worktrees        [fail-closed; STOP on nonzero]
  → git worktree add .worktrees/<spec-id> -b <branch>
  → verify: git worktree list (count <= 2) + baseline mise run typecheck (serialized, green)
  → execute-spec inside .worktrees/<spec-id> (proposal-before-code, reference-only packet)
  → gate evidence attributed per <spec-id>
  → git worktree remove .worktrees/<spec-id> --force + residue check (git worktree list pruned)
```

Dirty-baseline branch: `status --porcelain` non-empty → REFUSE `add` unless explicit session-recorded override. Submodule branch: guard triggers → sandbox fallback (`Temp\opencode`, TTL owned by automation + security) or orchestrator escalation. Retry N=2 differently, then escalate — no third loop.

## Domain Contracts (linked, not forced)

| Domain | Contract location | Engineering consolidation note |
|--------|-------------------|-------------------------------|
| engineering | `SPEC-git-worktree-engineering.md` §4 (skill file shape + pwsh command contracts + `.gitignore` contract) | Canonical — file shape, lifecycle, max-2, reference-only packets |
| automation/ops | `SPEC-git-worktree-automation.md` §4 (create/setup/baseline/remove runbook + sign-off split) | Adopted verbatim — serialized `mise` setup, baseline gate, TTL + prune |
| security | `SPEC-git-worktree-security.md` §4 (boundary table + `.gitignore` gate + sign-off; barrera approves) | Adopted verbatim — deny-default, allowlisted evidence, no freelance fixes |
| people | `SPEC-git-worktree-people.md` §4 (announce template + refusal script + consent/override contracts) | Adopted verbatim — uniform wording, exactly-once announce, readable refusal |

No `API_CONTRACTS.md` file is minted: there is no HTTP/RPC surface. The pwsh command contracts in engineering §4 plus the linked domain contracts above are the complete contract surface.

## Invariants

- INV-001: Chain unchanged — `git-worktree` is supporting; no new stage, no reorder of `frame-intent → … → ship-release`.
- INV-002: `.worktrees/` is ignored — `git check-ignore -q .worktrees` passes before first add and no `.worktrees/` path is ever tracked.
- INV-003: Max 2 parallel — `git worktree list` live count never exceeds 2 under `multi-subagents`; a third dispatch waits or escalates.
- INV-004: Clean baseline — no implementation starts with non-empty `git status --porcelain` unless an override is recorded in-session.
- INV-005: Runtime untouched — `.opencode/plugins/frame-ship.ts` stays single-file zero-dep; 8-domain catalogue unchanged.
- INV-006: Reference-only — full file bodies never cross worktree boundaries; only `SPEC/HARD/GATE/DOMAINS` references travel.
- INV-007: pwsh-native — zero POSIX `$(...)`, `Resolve-Path`-safe joins, `mise run typecheck` as baseline gate; serialized setup, no parallel installers.
- INV-008: Consent + announce — every create has consent-before-create plus one warm announce line (dónde + rama + por qué + limpieza); removal announces once; uniform wording, no per-owner variants without waiver.
- INV-009: Proposal-before-code rides — no code (or external send/filing/launch) inside any worktree without an approved `PROPOSED_CHANGES.md` for its SPEC.

## Non-Functional Requirements

- Performance: worktree add + baseline typecheck completes within a single session turn-batch; serialized `mise` setup avoids lock-flake retries.
- Availability: `main` stays clean and committable throughout; failed worktree setup never blocks `main` (remove + prune restores).
- Security: trust boundaries at worktree paths/ports/logs (security owner confirms map); mask/tokenize by default, allowlisted evidence only; no secrets/PII in paths, logs, or gate shares (Ley 172-13 minimization); no freelance fixes.
- Operability: cleanup TTL + owner declared per worktree; terminal state is `remove` + `prune` verified by `git worktree list`; sandbox fallback (`Temp\opencode`) never silently permanent.
- Usability: refusal and guard messages human-readable (people-owner wording); consent recorded in transcript; retry N=2 differently then escalate, no third loop.

## Open Questions (surfaced — decided downstream, not here)

- Default-root TTL owner (automation + security) — proposed: repo-local default, `Temp\opencode` fallback with explicit TTL; orchestrator confirms.
- Announce uniform template vs per-owner tone (people) — proposed: uniform template default; waiver only via people-owner + orchestrator.
- `40_workspace/<owner>/` promotion rule (engineering) — proposed in `propose-changes`; gate confirms.
