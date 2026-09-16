# Requirements Index: Git-Worktree Isolation (Automation / Ops)

**Owner:** automation owner + engineering owner (ops mechanics)
**Brief Reference:** BRIEF-git-worktree
**Domains-Touched:** [automation/ops, engineering] (full initiative: engineering, automation/ops, security, people)
**Spec:** docs/specs/20_backlog/SPEC-git-worktree-automation.md
**Execution_Mode:** multi-subagents
**Note on IDs:** REQ-IDs match the spec exactly (REQ-AUTO-001..007 + REQ-NF-001..003) so the SPEC/HARD/GATE/DOMAINS packet and the evidence chain stay traceable; the template's `REQ-F-` prefix is folded into the Functional table below.

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-AUTO-001 | Isolated worktree per parallel Task at repo-local `.worktrees/<spec-id>` on its own branch; `.worktrees/` verified via `git check-ignore` fail-closed before first add | P0 | BRIEF-git-worktree (Desired Outcome.1, Scope) | SPEC-git-worktree-automation | automation/ops | test (`git worktree list` + check-ignore exit code) |
| REQ-AUTO-002 | Per-worktree toolchain setup reuses `mise.toml` (node 22), serialized — never parallel `mise install`/`npm install` across worktrees | P0 | BRIEF-git-worktree (Scope) | SPEC-git-worktree-automation | automation/ops | test (serialized setup logs, non-overlapping timestamps) |
| REQ-AUTO-003 | Baseline `mise run typecheck` green inside each new worktree before implementation; red baseline blocks impl (refuse/override owned by engineering) | P0 | BRIEF-git-worktree (Desired Outcome.4) | SPEC-git-worktree-automation | automation/ops | test (typecheck output per worktree) |
| REQ-AUTO-004 | Max 2 parallel active worktrees per `execution_mode`; third dispatch waits or escalates to orchestrator, no sideways creation | P0 | BRIEF-git-worktree (`execution_mode` frozen) | SPEC-git-worktree-automation | automation/ops | attestation (orchestrator dispatch/refusal log) |
| REQ-AUTO-005 | Cleanup TTL + owner declared per worktree (default automation + security); terminal state `git worktree remove` + `prune`, verified residue-free via `git worktree list` | P0 | BRIEF-git-worktree (Open Questions: TTL owner) | SPEC-git-worktree-automation | automation/ops | test (post-cleanup `git worktree list`) |
| REQ-AUTO-006 | pwsh-native runbook only (no POSIX `$(...)`, `Resolve-Path`-safe joins, `git status --porcelain` clean check) for create/verify/setup/baseline/remove | P0 | BRIEF-git-worktree (Scope) | SPEC-git-worktree-automation | automation/ops | test (pwsh runbook transcript) |
| REQ-AUTO-007 | Capacity controls: `.worktrees/` git-ignored fail-closed, no worktree contents committed; no secrets/PII in paths, logs, or gate evidence (allowlisted evidence only) | P0 | BRIEF-git-worktree (Desired Outcome.3, Regulatory) | SPEC-git-worktree-automation | automation/ops | review (`.gitignore` check + evidence allowlist) |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | Serialized setup avoids lock flake; add + baseline completes within a single session turn-batch | Performance | Setup logs show non-overlapping install phases; 0 lock-contention retries |
| REQ-NF-002 | No secrets/PII in runbook, paths, logs, or gate shares (Ley 172-13 minimization); every PII store declares purpose + TTL + deletion | Security / Privacy | Secret/PII scan = 0 findings; TTL declarations present |
| REQ-NF-003 | Failed worktree setup never blocks `main`; remove + prune restores clean state | Availability / Operability | `main` committable throughout; post-failure `git worktree list` clean |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| automation/ops | Runbook + capacity controls owned here: serialized `mise` setup, baseline gate, max-2 enforcement, TTL + prune verification | automation owner + engineering owner |
| engineering | Ops mechanics + baseline override confirmed; branch-per-SPEC convention; `mise.toml` node 22 reuse | vasquez |
| security | `.gitignore`/trust-boundary items co-gated (linked, not duplicated); sandbox TTL co-signed | barrera |
| people | Baseline/consent messaging surface reviewed for DX; announce wording consumed verbatim | santana |

## Traceability Anchor

| Layer | Files | REQ-IDs |
|-------|-------|---------|
| Isolation + ignore | `git worktree list` snapshots, check-ignore logs, `.gitignore` | REQ-AUTO-001, REQ-AUTO-007, REQ-NF-002 |
| Toolchain + baseline | `mise.toml`, per-worktree setup + typecheck logs | REQ-AUTO-002, REQ-AUTO-003, REQ-NF-001 |
| Capacity + cleanup | orchestrator dispatch/refusal log, post-cleanup `git worktree list` | REQ-AUTO-004, REQ-AUTO-005, REQ-NF-003 |
| Runbook | pwsh runbook transcript, `ARCHITECTURE-git-worktree.md` Data Flow + INV-003/007 | REQ-AUTO-006 |
