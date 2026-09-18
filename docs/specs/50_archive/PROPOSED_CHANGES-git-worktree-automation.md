# Proposed Changes: automation specialist (automation owner + engineering for ops mechanics)

**Spec Reference:** docs/specs/20_backlog/SPEC-git-worktree-automation.md#REQ-AUTO-001..007
**Architecture Reference:** docs/specs/10_design/ARCHITECTURE-git-worktree.md (INV-002, INV-003, INV-007)
**Sibling Spec:** docs/specs/20_backlog/SPEC-git-worktree-engineering.md (skill mechanics — consumed by reference, not modified here)
**Agent:** automation specialist (automation owner + engineering for ops mechanics)
**Date:** 2026-09-16
**Execution_Mode:** multi-subagents
**Domains-Touched:** [automation/ops]

## Summary

Propose the automation/ops mechanics for git-worktree isolation: a pwsh-native runbook contribution to `skills/git-worktree/references/pwsh-flow.md` (serialized `mise` setup, max-2 live-worktree guard, `mise run typecheck` baseline gate) plus runbook/capacity/cleanup workflow controls (create → verify → setup → baseline → remove, orchestrator-serialized installer mutex, per-worktree cleanup TTL with `remove` + `prune` terminal state). Chain order, plugin runtime, and the 8-domain catalogue are untouched; skill prose shape itself is owned by the engineering spec and only consumed here by reference.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `skills/git-worktree/references/pwsh-flow.md` | file-create | Automation/ops-owned runbook section: pwsh-native create → verify → setup → baseline → remove commands (`git check-ignore -q .worktrees`, `git worktree add .worktrees/<spec-id> -b <branch>`, `git status --porcelain` clean check, `Resolve-Path`-safe joins, zero POSIX `$(...)`), serialized `mise` setup sequence (`mise trust` → `mise install` → `mise run install`, max 1 installer at a time), per-worktree `mise run typecheck` green gate before `execute-spec`, live-count guard (`git worktree list` ≤ 2). Covers REQ-AUTO-001, REQ-AUTO-002, REQ-AUTO-003, REQ-AUTO-006. |
| `workflows/git-worktree-runbook.md` | workflow-update | Canonical ops runbook: ordered create / verify / setup (serialized) / baseline / remove phases with pwsh command blocks, exit-code evidence per phase (`check-ignore` exit 0, `worktree list` snapshot, per-worktree setup timestamps proving no install overlap, typecheck output path, post-cleanup `worktree list`). Covers REQ-AUTO-001, REQ-AUTO-002, REQ-AUTO-003, REQ-AUTO-006. |
| `workflows/git-worktree-capacity.md` | workflow-update | Capacity controls: max 2 parallel active worktrees (third dispatch waits or escalates to orchestrator, no sideways creation), orchestrator installer mutex/queue (serialized `mise install` / `npm install`), `.worktrees/` git-ignored + fail-closed (no worktree contents committed), no secrets/PII in paths/logs/evidence (allowlisted evidence only). Covers REQ-AUTO-004, REQ-AUTO-007. |
| `workflows/git-worktree-cleanup.md` | workflow-update | Cleanup TTL workflow: every worktree declares TTL + owner (default automation + security); terminal state `git worktree remove --force .worktrees/<spec-id>` → `git worktree prune` → verify `git worktree list` shows no residue and `.worktrees/` empty-or-absent. Covers REQ-AUTO-005. |

Change types per `skills/propose-changes/references/proposal-template.md`. No implementation files modified in this phase; engineering skill prose (`SKILL.md`, `worktree-lifecycle.md`, `guards.md`) and `.gitignore` entry are owned by the sibling engineering/security specs and referenced only.

## Rationale

- REQ-AUTO-001 → `pwsh-flow.md` file-create + runbook workflow pin the per-Task isolated worktree (`.worktrees/<spec-id>`, own branch) behind the fail-closed `git check-ignore` pre-check (AC-001/AC-002: `git worktree list` + exit code).
- REQ-AUTO-002 → serialized setup sequence in `pwsh-flow.md` + capacity workflow mutex prevents parallel-installer lock flake while reusing `mise.toml` node 22 (AC-003: timestamped per-worktree setup logs with no install overlap).
- REQ-AUTO-003 → `mise run typecheck` green-in-worktree gate before any implementation starts; red baseline blocks impl (override path owned by engineering) (AC-004: typecheck output per worktree).
- REQ-AUTO-004 → max-2 enforcement in capacity workflow: live `git worktree list` count guard, third request refused/queued with orchestrator log (AC-005).
- REQ-AUTO-005 → cleanup workflow declares TTL + owner per worktree and pins the `remove` + `prune` + residue-verify terminal state (AC-006: post-cleanup `git worktree list`).
- REQ-AUTO-006 → pwsh-native-only runbook (no POSIX `$(...)`, `Resolve-Path`-safe joins, `git status --porcelain` clean check) for create/verify/setup/baseline/remove (AC-007: pwsh transcript path).
- REQ-AUTO-007 → capacity workflow keeps `.worktrees/` ignored + fail-closed and bans secrets/PII in paths/logs/evidence (AC-002/AC-006: `.gitignore` check + evidence allowlist; Ley 172-13 minimization).

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Parallel `mise install` / `npm install` across worktrees for speed | Reintroduces lock contention flake the spec exists to remove; SPEC §4 mandates orchestrator-serialized installers (max 1 at a time). |
| No declared TTL — cleanup on best effort | Orphaned worktree entries break the max-2 count guard and attribution; TTL + owner + `remove`/`prune` verify is the AC-006 contract. |
| POSIX-ism-tolerant runbook (`$(...)`, `/` joins) | Breaks win32/pwsh HARD constraint; ARCH INV-007 requires pwsh-native throughout with transcript evidence. |
| Track `.worktrees/` contents for auditability | Violates fail-closed ignore (INV-002) and risks committing worktree state/secrets; audit rides allowlisted evidence, never tracked worktree contents. |

## Approval Required From

- [ ] Owning domain owner: automation owner — mandatory (runbook + capacity + TTL controls)
- [ ] engineering owner (ops mechanics + baseline override path — REQ-AUTO-002/REQ-AUTO-003)
- [ ] security owner (`.gitignore` fail-closed gate + trust-boundary/evidence-allowlist items per SPEC §4 sign-off contracts; downstream `review-security` before gate PASS)

> **Rule:** No repository file modifications during proposal phase. Impl files stay untouched — verified via `git status`.

---

# Risk Assessment: SPEC-git-worktree-automation

**Proposer:** automation specialist (automation owner + engineering for ops mechanics)
**Date:** 2026-09-16
**Domains-Touched:** [automation/ops]

## Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Parallel installer lock flake (`mise install` / `npm install` overlap across worktrees) | Med | Med | Orchestrator-serialized setup (mutex/queue, max 1 installer); per-worktree timestamped setup logs prove no overlap (AC-003) |
| R-002 | Red baseline handed to `execute-spec` (typecheck skipped or ignored) | Med | High | `mise run typecheck` green-in-worktree gate blocks impl start; refusal/override path owned by engineering and recorded in-session |
| R-003 | Third worktree created sideways (max-2 violated, mixed edits / unattributable evidence) | Low | High | Live `git worktree list` count guard; third request waits or escalates to orchestrator — no sideways creation (AC-005) |
| R-004 | Worktree residue after failed run (orphaned entries, `.worktrees/` not empty) | Med | Med | Per-worktree TTL + owner; terminal `remove --force` + `prune` + `git worktree list` residue verify (AC-006) |
| R-005 | `.worktrees/` content committed or secrets/PII leak into paths/logs/evidence | Low | High | Fail-closed `git check-ignore -q .worktrees` before first add (security-owned gate); allowlisted evidence only; Ley 172-13 minimization |
| R-006 | POSIX-isms break win32/pwsh runbook end-to-end | Med | Med | pwsh-only command contracts in `pwsh-flow.md` + runbook; transcript evidence path in gate packet (AC-007) |
| R-007 | Orchestrator bypasses runbook order (setup before verify, remove before merge/archive) | Low | Med | Ordered create → verify → setup → baseline → remove phases with exit-code evidence per phase; gate re-checks packet trace |

## Blast Radius

- **automation/ops (modified here):** runbooks + capacity controls — `pwsh-flow.md` ops section + runbook/capacity/cleanup workflows. Failure mode: broken setup serialization (lock flake, R-001), unenforced max-2 (R-003), or residue accumulation (R-004) stalling parallel lanes. Contained by installer mutex, count guard, and TTL + `remove`/`prune` verify. Teams: orchestrator + specialists (max-2 lanes). No customer/regulator/revenue surface; no prod effects.
- **engineering (adjacent, not modified):** skill mechanics (`SKILL.md`, lifecycle, branch/promotion rule) consumed by reference from sibling spec — this proposal confirms the `pwsh-flow.md` interface only. Baseline-override semantics owned by engineering (R-002).
- **security (adjacent, not modified):** `.gitignore` fail-closed gate, trust boundaries, evidence allowlist reviewed downstream by security owner — surfaced here as R-005 mitigation. No freelance fixes (no key rotation / prod patching / perm widening).
- **people (adjacent, not modified):** consent + announce wording consumed verbatim from people spec; runbook hooks the announce point without rewording.

## Rollback Plan

- Runbook/workflow revert: proposal-phase — no workflows executed yet, so rollback is worktree-scoped only: `git worktree remove --force .worktrees/<spec-id>` for any drill worktree → `git worktree prune` → confirm clean via `git worktree list` and `.worktrees/` empty-or-absent; discard this proposal doc pre-commit (`Remove-Item -LiteralPath` the file) or revert its commit post-merge (`git revert`); confirm `git status --porcelain` empty on `main`.
- Owner: automation owner (runbook/capacity/TTL) + engineering owner (ops mechanics verify). ETA: within one session turn-batch; no customer, data, or revenue effects — workspace-only revert.

## Security Considerations

- Deny-default: no secrets/tokens/credentials/sessions in runbook commands, worktree paths, examples, logs, or gate evidence (finding without diff/scan/log proof = REFUTED).
- Trust boundaries at every new path/adapter/log line (worktree paths, `mise` output, gate shares) — boundary map confirmed by security owner downstream; mask/tokenize by default, allowlisted evidence only.
- Least privilege: worktree-scoped branches, minimum scope per interface/key/role; no key rotation / prod patching / perm widening (owner remediates; severity + location reported).
- Privacy (Ley 172-13): minimization — no PII in worktree paths, logs, or shares; every PII-adjacent store declares purpose + TTL + deletion; scoped export of allowlisted evidence only.

## Domain Considerations

- **Automation/ops (touched):** runbook order (create → verify → setup → baseline → remove), serialized `mise` setup with installer mutex, max-2 capacity guard, per-worktree TTL + owner with `remove` + `prune` terminal verify — automation owner. Residual risk after mitigations: Low — R-001/R-004 reduce to hygiene once serialized setup logs + post-cleanup `worktree list` are in the test matrix.
- **Engineering (adjacent):** ops-mechanics interface + baseline green gate + red-baseline override path — engineering owner confirms. No chain-order, plugin-runtime, or catalogue changes (ARCH INV-001/INV-005).
