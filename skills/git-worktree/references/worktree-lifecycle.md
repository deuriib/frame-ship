# Worktree Lifecycle — Create to Verify to Remove

Covers SPEC REQ-005, REQ-006 plus ARCH Data Flow. All commands are
win32/pwsh-native. POSIX dollar-paren command substitution is banned in
every block below — use plain pwsh variables and `Join-Path`. Max 2 live
worktrees. Single writer per file — `guards.md`, `pwsh-flow.md`, and
`announce-template.md` are owned by parallel lanes and referenced here,
never duplicated.

## 0. Conventions

- Worktree root is repo-local `.worktrees/<spec-id>`, one worktree per SPEC-ID, branch-per-SPEC.
- Path joins use `Join-Path` and resolve via `Resolve-Path -LiteralPath`; never hand-concatenate separators.
- Evidence travels by reference-only `SPEC:<path>#REQ / HARD:<mode> / GATE:<verdict> / DOMAINS:<list>` packets — never paste file bodies into lane prompts.
- Retry N=2 differently, then escalate to orchestrator — no third loop.

## 1. Create — consent plus announce, then fail-closed gates

1. Capture consent-before-create in the session transcript — silent creation is forbidden. Emit exactly one warm announce line stating donde plus rama plus por que plus limpieza, using the people-lane template verbatim by reference at `announce-template.md`.
2. Confirm clean baseline before any add:

```powershell
git status --porcelain
```

Empty output means clean and creation may proceed. Non-empty output means REFUSE `git worktree add` unless an explicit session-recorded override exists — record the override text and owner in the transcript. Submodule repos hit the guard owned by the security lane in `guards.md` before this point.

3. Run the fail-closed ignore gate before the first add — trailing-slash form so the gate tests the pattern itself, green whether or not the directory exists yet on a fresh clone:

```powershell
git check-ignore -q .worktrees/
```

Exit 0 means the `.gitignore` entry is active and creation may proceed. Nonzero exit means STOP with no override on this gate — fix `.gitignore` first. Bare form without the slash only matches when the directory already exists on disk, so the slash form is canonical here. Full gate detail is owned by the security lane in `guards.md`.

4. Create one worktree per SPEC-ID:

```powershell
$worktreeRoot = Join-Path ".worktrees" "<spec-id>"
git worktree add $worktreeRoot -b "<branch>"
git worktree list
```

Confirm live count from `git worktree list` is at or below 2. A third dispatch waits or escalates to orchestrator — never exceed 2.

## 2. Verify — baseline green before execute-spec

1. Re-run clean-baseline and count checks inside the new worktree:

```powershell
git status --porcelain
git worktree list
```

2. Run the per-worktree baseline gate serialized — one installer at a time, never parallel installers:

```powershell
mise run typecheck
```

Baseline must be green before `execute-spec` starts. Red baseline means STOP, fix forward, re-run green — never hand red to implementation. Serialized setup detail is owned by the automation lane in `pwsh-flow.md`.

3. Confirm the lane prompt carries only the reference-only packet `SPEC:<path>#REQ / HARD:<mode> / GATE:<verdict> / DOMAINS:<list>` with proposal-before-code satisfied for its SPEC.

## 3. Remove — cleanup plus residue check

1. After gate evidence is attributed per `<spec-id>`, remove and prune:

```powershell
$worktreeRoot = Join-Path ".worktrees" "<spec-id>"
git worktree remove $worktreeRoot --force
git worktree prune
git worktree list
```

2. Confirm `git worktree list` shows the entry gone and live count back within budget. Announce removal once using the people-lane template. Orphaned entries are removed the same way with declared cleanup TTL and owner — failed setup never blocks `main`.

## 4. Fallbacks

- Dirty baseline: refuse path by default; override path requires explicit session record with owner and reason.
- Submodule guard or repo-local refusal: sandbox fallback under `Temp\opencode` only when repo-local is refused — TTL plus owner declared, automation plus security co-sign, never silently permanent. Detail in `guards.md`.
