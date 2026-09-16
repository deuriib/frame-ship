# Pwsh Flow — automation/ops runbook section

**Owner:** automation owner + engineering owner (ops mechanics)
**Spec:** `docs/specs/20_backlog/SPEC-git-worktree-automation.md#REQ-AUTO-001..007`
**Architecture:** `docs/specs/10_design/ARCHITECTURE-git-worktree.md` (INV-002, INV-003, INV-007)
**Status:** pwsh-only — POSIX dollar-paren command substitution is banned in every block below.
**Scope note:** this file owns automation/ops mechanics only — create, verify,
serialized setup, baseline gate, remove plus TTL, capacity guard. Skill shape,
lifecycle order, fail-closed ignore gate detail, submodule guard, and
announce-line wording live with the sibling engineering, security, and people
lanes — complement, never duplicate. Cross-domain need goes to the
orchestrator as a formal Cross-domain request.

## 0. Conventions

- One worktree per SPEC-ID at repo-local `.worktrees/<spec-id>`, each on its
  own branch (`-b <branch>`, branch-per-SPEC).
- All path joins use `Join-Path`; resolution uses `Resolve-Path -LiteralPath`
  guarded by `Test-Path -LiteralPath`. Never hand-concatenate separators,
  never use POSIX-style slashes in joins.
- All commands are win32/pwsh-native. Plain pwsh variables only.
- Live count from `git worktree list` MUST stay at or below 2. A third
  dispatch waits or escalates to the orchestrator — no sideways creation.
- Evidence travels by reference-only packet
  `SPEC:<path>#REQ / HARD:<mode> / GATE:<verdict> / DOMAINS:<list>` —
  never pasted bodies.

## 1. Create — clean check, then one add per SPEC-ID

1. Confirm clean baseline on the base before any add:

```powershell
git status --porcelain
```

Empty output means clean and creation may proceed. Non-empty output means
REFUSE `git worktree add` unless an explicit session-recorded override exists
with owner and reason. Override path is owned by engineering.

2. The fail-closed ignore gate runs before the first add (trailing-slash
form, green on fresh clones with no directory yet). Gate detail is owned by
the security lane in `guards.md` and consumed here by reference:

```powershell
git check-ignore -q .worktrees/
```

Exit 0 means proceed. Nonzero means STOP with no override — fix `.gitignore`
first.

3. Create exactly one worktree per SPEC-ID with `Resolve-Path`-safe joins:

```powershell
$root = Join-Path ".worktrees" "<spec-id>"
$branch = "<branch>"
git worktree add $root -b $branch
if (Test-Path -LiteralPath $root) { Resolve-Path -LiteralPath $root }
git worktree list
```

Confirm live count from `git worktree list` is at or below 2 before handing
the lane to `execute-spec`. A third request is refused or queued with an
orchestrator log entry — never created sideways.

## 2. Verify — count plus baseline state

```powershell
git status --porcelain
git worktree list
```

Re-run inside the new worktree: clean-baseline check plus live-count guard.
Both must hold before setup starts.

## 3. Setup — serialized, one installer at a time

Reuse `mise.toml` (node 22). The orchestrator serializes setup across
worktrees with a mutex or queue — max 1 installer at a time, never parallel
`mise install` or `npm install` across worktrees. Per-worktree timestamps
must show no overlap of the install phase.

```powershell
mise trust
mise install
mise run install
```

Installer-mutex note: the orchestrator holds the mutex for the whole
`mise install` plus `mise run install` sequence per worktree and releases it
only after that worktree logs completion. A lane that arrives while the mutex
is held waits — it never starts its own installer concurrently. Lock-flake
retries are evidence the mutex was violated; the fix is serialization, not
parallel retry.

Confirm toolchain active per worktree (`mise current` or `mise ls`) and record
the setup log path per worktree for gate evidence.

## 4. Baseline — green gate before execute-spec

Run inside the worktree root (forwarded to `.opencode` per `mise.toml`
`[tasks.typecheck]`), serialized per the mutex above:

```powershell
mise run typecheck
```

Green is required before `execute-spec` starts. Red baseline blocks
implementation — refuse and fix forward, re-run green. The refusal and
override path is owned by engineering and recorded in-session. Attach the
typecheck output per worktree by reference in the gate packet.

## 5. Remove — TTL plus remove, prune, verify

Every worktree declares a cleanup TTL and an owner before creation. Default
owner is automation plus security. Record three fields per worktree: purpose
plus TTL plus deletion owner. TTL expiry or lane completion triggers the
terminal state below — only after work is merged or archived:

```powershell
$root = Join-Path ".worktrees" "<spec-id>"
git worktree remove $root --force
git worktree prune
git worktree list
```

Verify `git worktree list` shows the entry gone and `.worktrees/` empty or
absent. Orphaned entries from failed runs are removed the same way with
their declared TTL and owner — failed setup never blocks `main`.

## 6. Capacity guard — max 2 live

```powershell
git worktree list
```

Live count MUST be at or below 2 at every phase: after create, before
baseline, and after remove. Count evidence is a `git worktree list` snapshot
referenced in the gate packet (see TEST_MATRIX C-003). `.worktrees/` stays
git-ignored and fail-closed — no worktree contents committed, no
secrets or PII in worktree paths, logs, or gate evidence (allowlisted
evidence only, Ley 172-13 minimization).

## 7. Evidence checklist per worktree

- `git check-ignore -q .worktrees/` exit code (exit 0 pre-add).
- Post-add `git worktree list` snapshot showing count at or below 2.
- Per-worktree setup log with timestamps proving no install overlap.
- `mise current` or `mise ls` showing node 22 active.
- `mise run typecheck` output path, green before implementation.
- Per-worktree TTL plus owner statement (purpose plus TTL plus deletion owner).
- Post-cleanup `git worktree list` snapshot showing no residue.
- Pwsh transcript path for the create, verify, setup, baseline, remove run.
