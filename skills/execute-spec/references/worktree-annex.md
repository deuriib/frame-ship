# Worktree Annex — isolated parallel lanes inside execute-spec

> Former `git-worktree` supporting skill, merged here (2026-09-22): one annex instead of a skill dir + 4 refs. Chain order never changes; this is a supporting habit loaded alongside `execute-spec`. Skills are preserved by reference: security guards (barrera), pwsh/automation mechanics (automation+engineering owners), announce wording (people owner — verbatim, no variants).

## 0. Conventions

- One worktree per SPEC-ID at repo-local `.worktrees/<spec-id>`, branch-per-SPEC, max 2 live (third waits or escalates — no sideways).
- All joins via `Join-Path`, resolve via `Resolve-Path -LiteralPath` guarded by `Test-Path -LiteralPath`; win32/pwsh-native commands only (no POSIX dollar-paren substitution).
- Evidence travels by reference-only packet `SPEC:<path>#REQ / HARD:<mode> / GATE:<verdict> / DOMAINS:<list>` — never paste file bodies across worktrees.
- Retry N=2 differently → escalate orchestrator. No third loop, no sideways dispatch.

## 1. Create — consent, gates, add

1. Consent-before-create in the session transcript (silent creation forbidden). Exactly one warm announce line, slot order donde + rama + porque + limpieza, verbatim:

```text
Voy a crear el worktree en <donde: .worktrees/<spec-id>> con rama <rama> para <porque: SPEC-ID + motivo corto>; al terminar ejecuto <limpieza: git worktree remove ...> y te confirmo. ¿Procedo? [sí/no]
```

EN equivalent: "I will create the worktree at <donde> on branch <rama> for <porque>; on completion I run <limpieza> and confirm. Proceed? [yes/no]". Slot-only variance; other wording needs people-owner + orchestrator waiver. Announce fires once per create and once per remove — never per command.

2. Clean baseline gate:

```powershell
git status --porcelain   # empty = proceed; non-empty = REFUSE unless session-recorded override (owner + reason)
```

Refusal script (plain language): "No puedo crear el worktree todavía: tu workspace tiene cambios sin guardar (<n> archivos). Opciones: (1) `git stash` y reintento, (2) commit en tu rama actual, (3) override explícito — dime 'override registrado' y documento tu confirmación."

3. Fail-closed ignore gate (no override on this gate):

```powershell
git check-ignore -q .worktrees/   # exit 0 = .gitignore active, proceed; nonzero = STOP, fix .gitignore first
```

Trailing-slash form is canonical (green on fresh clones); bare form only matches when the dir exists. Submodule-bearing repos hit the submodule guard (§4) BEFORE the add.

4. Create:

```powershell
$worktreeRoot = Join-Path ".worktrees" "<spec-id>"
git worktree add $worktreeRoot -b "<branch>"
git worktree list   # live count MUST be ≤ 2
```

## 2. Verify — green baseline before execute-spec

```powershell
git status --porcelain        # re-check inside the worktree
git worktree list             # count ≤ 2
mise run typecheck            # serialized: ONE installer/typecheck at a time, never parallel
```

- Orchestrator holds an installer mutex across worktrees (max 1 installer); waiter bound 10 min then STOP with owner notify — never kills another lane's installer.
- Red baseline = STOP, fix forward, re-run green — never hand red to implementation. `mise trust && mise install && mise run install` per worktree under the mutex.
- Lane prompt carries only the reference packet + proposal-before-code satisfied for its SPEC.

## 3. Remove — after gate evidence attributed

```powershell
$worktreeRoot = Join-Path ".worktrees" "<spec-id>"
git worktree remove $worktreeRoot --force
git worktree prune
git worktree list   # entry gone, count back within budget
```

Announce removal once (§1 wording). Every worktree declares purpose + TTL + deletion owner (automation + security co-sign) before creation; TTL expiry or lane completion triggers removal — only after work is merged or archived. Orphaned entries removed the same way with declared TTL; failed setup never blocks `main`.

## 4. Security guards (security owner — deny-by-default)

- Trust boundaries before first add: worktree path (no PII/secrets in path segment — mask/refuse), prompt packet (reference-only, refuse paste), log/transmit line (scan before share, allowlisted excerpt), gate evidence (allowlisted paths only, refuse full dump). Finding without proof (`diff/scan/log`) = REFUTED.
- Submodule guard before `git worktree add`: `git submodule status` + `git config --file .gitmodules --list`; no submodules → record none-needed; submodules present → REFUSE by default unless pinned-verify (explicit SHA, no recursive/unpinned); unpinned/recursive without security-owner exception = finding, checkout stays refused. Drill log attaches to lane singleton `DRILL.md` (never `DRILL-*.md`).
- Least privilege: own branch, own `<spec-id>` dir, no shared credentials, no cross-worktree file access. Shared-secret file in a lane = High finding with owner.
- PII/secret scan (Ley 172-13): `Select-String -Pattern '(?i)(secret|token|api[_-]?key|passwd|credential|session)' -Path skills/execute-spec/** -Quiet` must read 0 hits before gate; any hit = mask + rescan with proof.
- Sandbox fallback (repo-local refused): ONLY `Temp\opencode`, records purpose + TTL + deletion owner (automation + security co-sign, orchestrator confirms) — never silently permanent; removal via the §3 commands.
- Export allowlist: command logs, `git worktree list` snapshots, redacted transcript excerpts (slots only). Never full dumps, never raw PII.
- No freelance fixes: this annex never rotates keys, patches prod, or widens perms — findings report severity + location + owner.

## 5. Evidence checklist per worktree

- `git check-ignore -q .worktrees/` exit 0 pre-add; consent + announce transcript line refs.
- Post-add and post-remove `git worktree list` snapshots (count ≤ 2, no residue).
- Setup log timestamps proving no install overlap; `mise current`; green `mise run typecheck` output ref.
- Purpose + TTL + deletion owner record; submodule drill log or none-needed statement.
- Secret/PII scan 0 hits. All attached to the lane singletons (`IMPLEMENTATION_PLAN.md` / `TEST_MATRIX.md`), never suffixed files.
