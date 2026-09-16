# Refuter Review: SPEC-git-worktree — RE-CHECK (fix loop N=1, retry 1 of 2)

**Reviewer:** review-refuter (adversarial, engineering)
**Date:** 2026-09-16
**Verdict:** pass (could not falsify)
**Skill:** skill(frame-ship:quality-gate) + `skills/quality-gate/references/engineering/refuter-review.md`
**Prior verdict:** conditional (RF-001..RF-006) — this re-check re-probes each with fresh proof

## Mission

Attempt to **falsify** the post-fix claims. Success = a counterexample with proof. Per HARD, a finding without proof (diff/scan/log ref) is REFUTED — every row below carries fresh proof from this session.

## Re-check: Refuted / Confirmed per RF-00x

| ID | Prior claim | Fresh probe (2026-09-16) | Result |
|----|-------------|--------------------------|--------|
| RF-001 | SKILL §5 drift (§5 listed 1/4) | Read `skills/git-worktree/SKILL.md:45-50` — §5 now lists 4/4 lines (`worktree-lifecycle.md`, `guards.md`, `pwsh-flow.md`, `announce-template.md`); lane diff-stat confirms `SKILL.md \| 3 +++` (the 3 added lines) | **Cleared — CONFIRMED fixed** |
| RF-002 | Bare-form `check-ignore` in guards contradicts slash canonical | Read `skills/git-worktree/references/guards.md:32-34` — gate block now slash-canonical `git check-ignore -q .worktrees/`; §2 lines 44-47 explicitly demote bare form to dir-existence variant, never the probe. Live probe: slash exit 0; bare exit 0 only because empty `.worktrees/` dir now exists on disk (`Test-Path True`, `Get-ChildItem` empty) — variant behavior, not gate-probe drift. Lane diff confirms `guards.md \| 12 ++++++++----` | **Cleared — CONFIRMED fixed** |
| RF-003 | Dirty baseline, override-or-clean required (COND-004) | `git status --porcelain` still non-empty (`M .gitignore, M AGENTS.md, M README.md` + parallel-lane edits). Override recorded: `override: orchestrator 2026-09-16 COND-004-proceed-documented-dirty-baseline` in `docs/specs/40_workspace/engineering/DRILL-git-worktree-2spec.md §1`. Scope proof: lane diff `--name-only -- skills/git-worktree/ .gitignore` = `SKILL.md, guards.md, pwsh-flow.md, .gitignore` only; `git diff -- AGENTS.md README.md` shows unrelated parallel wording/roadmap hunks (per-domain workspace line, adapter roadmap line) — out-of-scope files untouched by this lane | **Cleared — override recorded + scope verified** |
| RF-004 | Claims without citable logs (C-001/C-003/C-002 unpathed) | `Select-String "session shell log"` over all 4 matrices → 0 hits (no unpathed cites remain). Eng matrix §§C-001/C-003/C-002 now pathed (exit codes, `ls-files`/`porcelain` empties, `.gitignore:55-56`, `worktree list` 1-entry snapshot, 0-hit scans with commands). Auto matrix §§C-005/C-003/C-002/T-002/T-003 now pathed (rg-exit 1, `Select-String Count 0`, `git diff -- mise.toml` 0 lines, check-ignore exit 0) | **Cleared — CONFIRMED pathed** |
| RF-005 | People dry run unexecuted (excerpt slots `<path-or-session-ref>`) | Drill note exists at `docs/specs/40_workspace/engineering/DRILL-git-worktree-2spec.md` (packet-cited `vasquez/` path is stale — file lives under `engineering/`). §2 ANNOUNCE-001/002 exactly-once 2/2 with donde+rama+porque+limpieza slots; §3 list snapshots (2 incl main → 3 incl main); §4 cleanup executed 2026-09-16 (remove x2 exit 0, prune, list back to main-only `923a16f [main]`, branches deleted, `Test-Path` False x2, `porcelain -- .worktrees/` empty, `branch --list "drill/*"` empty). People matrix §C-006 now fills excerpt paths + counts pointing at DRILL §§1/2/4 + override record | **Cleared — CONFIRMED executed** |
| RF-006 | Stale sec observation (53 lines / exit 1) | Sec matrix T-002 re-attested 2026-09-16: 56 lines, entry `:55-56`, slash exit 0, bare exit 1 annotated as variant. Fresh probes: `(Get-Content .gitignore).Count` = 56; `Select-String worktree .gitignore` = `:55` comment + `:56` `.worktrees/`; `git check-ignore -q .worktrees/` exit 0; `git status --porcelain -- .worktrees/` empty; `git ls-files -- .worktrees/` 0 lines | **Cleared — CONFIRMED refreshed** |

Cleared: 6 of 6. Persisting: 0.

## Findings (current state)

No new counterexamples. Residual notes (not findings, no severity):

- Packet path staleness: re-check brief cited `docs/specs/40_workspace/vasquez/DRILL-git-worktree-2spec.md`; the file lives at `docs/specs/40_workspace/engineering/DRILL-git-worktree-2spec.md`. Content is complete — path alias only, orchestrator to correct the reference at re-gate.
- Bare-form `check-ignore` now exits 0 (empty `.worktrees/` dir on disk post-drill) vs the `exit 1` noted in guards §2 prose. Behavior is consistent with the documented variant semantics (dir-existence check, never the gate probe); slash-canonical gate unaffected (exit 0 either way). No action.
- Baseline remains dirty (parallel work in flight); COND-004 override covers lane creation. No sideways `add` attempted by this reviewer.

Fresh falsification attempts this session (all held): POSIX `$(` scan over all 5 `skills/git-worktree/**` lane files → 0 hits; `git worktree list` → main-only (1 ≤ 2); `.worktrees/` zero tracked paths + empty porcelain; lane diff-stat scope = 4 files, 28 insertions, 4 deletions, no out-of-scope touch.

## Verdict Rationale

- Prior conditional required RF-001 (§5) cleared, RF-004 log attachments, RF-005 dry run, RF-006 re-attestation, plus RF-002 slash hygiene and RF-003 override record. All six verify cleared with diff/scan/log proof above — including the load-bearing T-001 (§5 now 4/4) and the C-006 dry run (executed with residue-free snapshots).
- Adversarial re-probes found no counterexample that breaks the lifecycle, the fail-closed ignore gate, the max-2 capacity guard, or the scan posture. `pass (could not falsify)`.
