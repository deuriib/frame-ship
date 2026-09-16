# Spec: Git-Worktree Automation / Ops

**ID:** SPEC-git-worktree-automation
**Owner:** automation owner + engineering owner (ops mechanics)
**Domains-Touched:** automation/ops, engineering
**Brief Reference:** BRIEF-git-worktree
**Status:** draft
**Priority:** P0
**Execution_Mode:** multi-subagents (inherited from BRIEF-git-worktree, frozen at frame-intent)

## 1. Context

Parallel `multi-subagents` execution (max 2) needs isolated workspaces so concurrent SPECs do not dirty `main` via mixed edits, `node_modules`/lock contention, or unattributable gate evidence. This spec owns the automation/ops mechanics: `.worktrees/` lifecycle, `mise` toolchain reuse with serialized setup, baseline `typecheck` gate, cleanup TTL, and runbook/capacity controls. Win32/pwsh-native throughout; chain order and plugin runtime unchanged.

## 2. Requirements

- REQ-AUTO-001: Each parallel Task gets an isolated worktree at repo-local `.worktrees/<spec-id>` on its own branch; default root `.worktrees/` verified via `git check-ignore` fail-closed before first `git worktree add`.
- REQ-AUTO-002: Per-worktree toolchain setup reuses `mise.toml` (node 22) and runs serialized — never parallel `mise install` / `npm install` across worktrees — to avoid lock flake.
- REQ-AUTO-003: Baseline `mise run typecheck` must be green inside each new worktree before implementation starts; red baseline blocks impl (refuse/override path owned by engineering).
- REQ-AUTO-004: Max 2 parallel active worktrees enforced per `execution_mode`; a third dispatch waits or escalates to orchestrator — no sideways creation.
- REQ-AUTO-005: Every worktree declares cleanup TTL and owner (default: automation + security); terminal state is `git worktree remove` + `git worktree prune`, verified by `git worktree list` showing no residue.
- REQ-AUTO-006: Runbook provides pwsh-native commands only (no POSIX `$(...)`, `Resolve-Path`-safe joins, `git status --porcelain` clean check) for create / verify / setup / baseline / remove.
- REQ-AUTO-007: Capacity controls: `.worktrees/` stays git-ignored and fail-closed (no worktree contents committed); no secrets/PII in worktree paths, logs, or gate evidence (allowlisted evidence only).

## 3. Acceptance Criteria

- [ ] AC-001: Two parallel worktrees created at `.worktrees/<spec-id-a>` and `.worktrees/<spec-id-b>` on distinct branches; evidence: `git worktree list` output captured in gate evidence.
- [ ] AC-002: `git check-ignore -q .worktrees` passes (exit 0) before creation; evidence: command exit code in runbook log.
- [ ] AC-003: Serialized per-worktree setup completes with node 22 active (`mise current` / `mise ls`); evidence: setup log per worktree, timestamps showing no overlap of install phase.
- [ ] AC-004: `mise run typecheck` green in each worktree before impl; evidence: typecheck output per worktree attached by reference.
- [ ] AC-005: With 2 active worktrees, a third create request is refused or queued; evidence: orchestrator log / refusal message.
- [ ] AC-006: After completion, `git worktree remove` + `prune` leaves `git worktree list` clean and `.worktrees/` empty-or-absent; evidence: post-cleanup `git worktree list` output.
- [ ] AC-007: Runbook create→verify→setup→baseline→remove runs end-to-end on win32/pwsh with no POSIX-isms; evidence: pwsh transcript path referenced in gate packet.

## 4. Contracts & Interfaces

Workflow targets (non-API; pwsh-native runbook):

- Create: `git check-ignore -q .worktrees` → `git worktree add .worktrees/<spec-id> -b <branch>` (after `git status --porcelain` clean check on base).
- Setup (serialized): `mise trust` (once per worktree as needed) → `mise install` → plugin deps per `mise run install`; orchestrator serializes across worktrees (mutex/queue, max 1 installer at a time).
- Baseline: `mise run typecheck` (dir = worktree root, forwarded to `.opencode` per `mise.toml` `[tasks.typecheck]`); green required before `execute-spec` starts.
- Remove: `git worktree remove --force .worktrees/<spec-id>` (only after work merged/archived) → `git worktree prune` → verify `git worktree list`.
- Sign-off contracts: automation owner owns runbook + capacity controls; engineering owner owns ops mechanics + baseline override; security owner gates `.gitignore`/trust-boundary items (linked, not duplicated here).

## 5. Out of Scope

- Changing chain order or adding a stage (`git-worktree` is supporting, not a stage).
- Changing `.opencode/plugins/frame-ship.ts` runtime (stays single-file zero-dep) or the 8-domain catalogue.
- Skill prose itself (`skills/git-worktree/SKILL.md` — owned by engineering spec); this spec constrains its ops mechanics only.
- Rotating keys, patching prod, widening perms; upstream code copying without license/attribution check.
- Announce-line wording and trust-boundary map content (owned by people and security specs respectively).

## 6. Dependencies

- Upstream: BRIEF-git-worktree (read-only) + `docs/briefs/OKR-git-worktree.md` OKRs (by reference).
- Toolchain: `mise.toml` (`[tools] node = "22"`, `[tasks.typecheck]`, `[tasks.install]`).
- Sibling specs: engineering spec (skill mechanics, branch/promotion rule for `40_workspace/<domain>/` → `10→30`), security spec (`.gitignore` gate, trust boundaries, submodule guard/sandbox fallback), people spec (consent + announce template).
- Downstream: `frame-ship:propose-changes` as `SPEC:docs/specs/20_backlog/SPEC-git-worktree-automation.md#REQ-AUTO-001..007 / HARD:multi-subagents+win32/pwsh / GATE:none-yet / DOMAINS:[engineering, automation/ops, security, people]`.

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-AUTO-001 | AC-001, AC-002 | PROPOSED_CHANGES.md | `git worktree list` + `git check-ignore` exit code |
| REQ-AUTO-002 | AC-003 | PROPOSED_CHANGES.md | serialized setup logs per worktree |
| REQ-AUTO-003 | AC-004 | PROPOSED_CHANGES.md | `mise run typecheck` output per worktree |
| REQ-AUTO-004 | AC-005 | PROPOSED_CHANGES.md | orchestrator dispatch/refusal log |
| REQ-AUTO-005 | AC-006 | PROPOSED_CHANGES.md | post-cleanup `git worktree list` |
| REQ-AUTO-006 | AC-007 | PROPOSED_CHANGES.md | pwsh runbook transcript path |
| REQ-AUTO-007 | AC-002, AC-006 | PROPOSED_CHANGES.md | `.gitignore` check + evidence allowlist |
