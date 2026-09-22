---
name: git-worktree
description: Provide isolated repo-local worktrees for max-2 parallel SPEC lanes on win32/pwsh — Use when dispatching parallel execute-spec lanes, Triggered by orchestrator worktree setup.
---

# Git-Worktree — Isolated Parallel Lanes

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## 1. Purpose

Give the orchestrator one loadable habit for isolated parallel work under
`subagents`: each SPEC lane runs on a clean repo-local baseline at
`.worktrees/<spec-id>` with branch-per-SPEC, verified before
`execute-spec` starts and removed after gate evidence is attributed.
This skill is supporting, not a stage — chain order never changes.

## 2. Chain Contract

- Previous: none — supporting skill, loaded by orchestrator habit alongside `frame-ship:execute-spec`
- Next: `frame-ship:execute-spec` inside the created worktree, then `frame-ship:quality-gate` with per-`<spec-id>` evidence

## 2b. Role Binding (Org)

- **Bound to:** orchestrator as dispatcher plus owning domain owner and domain specialists working inside lanes for all 8 business domains (see `../AGENTS.md` catalogue): engineering, security, finance, legal, marketing/brand, people, revenue, automation/ops.
- Orchestrator owns dispatch of at most 2 lanes, consent capture, and cleanup TTL. Specialists never self-dispatch, never exceed 2 live worktrees, never approve their own lane.

## 3. Process

0. Pre-flight LOAD — HARD STOP: `skill(git-worktree)` loaded? `SPEC/HARD/GATE/DOMAINS` reference-only packet accepted, no pasted bodies? Clean-baseline state known? Any NO → STOP. Single writer per file; this skill never edits `guards.md`, `pwsh-flow.md`, or `announce-template.md` owned by parallel lanes.
1. Confirm consent-before-create plus the warm announce line covering donde + rama + por que + limpieza. Wording is owned by the people lane — consume `announce-template.md` verbatim via reference, no per-owner variants without people-owner plus orchestrator waiver. See `references/worktree-lifecycle.md` step 1.
2. Verify clean baseline via `git status --porcelain` — empty means clean, non-empty means REFUSE `git worktree add` unless an explicit session-recorded override exists. See `references/worktree-lifecycle.md` step 2.
3. Run the fail-closed ignore gate via `git check-ignore -q .worktrees/` before the first add — trailing-slash form, green on fresh clones with no directory yet — nonzero exit means STOP with no override on this gate. Backed by the `.worktrees/` entry in `.gitignore`. Detail owned by the security lane in `guards.md`, consumed here by reference.
4. Create exactly one worktree per SPEC-ID under repo-local `.worktrees/<spec-id>` with branch-per-SPEC, keeping live count at or below 2 per frozen `execution_mode` (`subagents` only — parallel lanes are the norm), verified via `git worktree list`. Win32 path discipline — `Join-Path` plus `Resolve-Path`-safe joins, serialized `mise run typecheck` baseline gate green before `execute-spec` — is owned by the automation lane in `pwsh-flow.md`, consumed here by reference. See `references/worktree-lifecycle.md` steps 3-4.
5. Work inside the lane with proposal-before-code and reference-only `SPEC:<path>#REQ / HARD:<mode> / GATE:<verdict> / DOMAINS:<list>` packets — never paste file bodies across worktrees, never carry phantom state.
6. Remove with `git worktree remove` plus `prune`, confirm via `git worktree list` residue check, and announce removal once. See `references/worktree-lifecycle.md` step 5. Retry N=2 differently, then escalate to orchestrator — no third loop, no sideways dispatch.

## 4. What I won't do

- Change chain order, add a stage, edit `plugins/opencode/*.ts` (skills/agents/shared lanes), or change the 8-domain catalogue.
- Create a worktree on a dirty baseline without a session-recorded override, or pass the ignore gate on nonzero exit.
- Exceed 2 live worktrees, run parallel installers, or hand a red baseline to `execute-spec`.
- Paste file bodies across worktrees or carry secrets, tokens, credentials, sessions, or PII in paths, examples, logs, or gate shares.

## 5. References

- `references/worktree-lifecycle.md` — Create to verify to remove sequence with pwsh command contracts.
- `references/guards.md` — Security controls, owned by security lane (fail-closed ignore gate, trust boundaries).
- `references/pwsh-flow.md` — Automation lane (win32/pwsh joins, serialized baseline gate, max-2 discipline).
- `references/announce-template.md` — People lane (consent-before-create plus warm announce wording).
