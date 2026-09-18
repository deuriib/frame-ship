# DRILL Note: 2-SPEC git-worktree dry run (automation mechanics, people wording by reference)

**Skill:** `skill(frame-ship:execute-spec)` — automation specialist (automation/ops mechanics)
**Date:** 2026-09-16
**Execution Mode:** multi-subagents (disposable drill, max 2 live worktrees)
**Packet (by reference only):**
- SPEC: `skills/git-worktree/` (SKILL + 4 refs) + `skills/git-worktree/references/announce-template.md` + `docs/specs/40_workspace/santana/TEST_MATRIX-git-worktree-people.md` (excerpt slots unfilled) + `docs/specs/40_workspace/quality-gate/git-worktree/GATE_REPORT.md#COND-003`
- HARD: execution_mode=multi-subagents, max 2 live worktrees, win32/pwsh, disposable drill branches (delete after), reference-only, ORCHESTRATOR OVERRIDE RECORDED for COND-004
- GATE: CONDITIONAL — COND-003 (2-SPEC dry run unexecuted, excerpt paths + counts unfilled, C-006 not closed)
- DOMAINS: [engineering, automation/ops, security, people] — drill owned by automation mechanics, people wording verified by reference
- Single-writer rule: did NOT edit `docs/specs/40_workspace/santana/TEST_MATRIX-git-worktree-people.md`; excerpt paths + counts recorded here for orchestrator aggregation.

## 1. Pre-checks

- `git check-ignore -q .worktrees/` → exit 0 (ignored, PASS)
- `git worktree list` (initial) → 1 entry (main only):
  - `D:/GitHub/frame-ship 923a16f [main]`
- `git status --porcelain -- .worktrees/` → empty (PASS, no tracked residue in drill dir)
- Dirty-baseline disposition (COND-004 override recorded by orchestrator — proceed documented):
  - `M .gitignore` = in-scope own lane, not touched by this drill
  - `M AGENTS.md`, `M README.md` = out-of-scope, never touched, never included in diff-stat
  - Additional dirty at drill time (informational, untouched): `M docs/specs/40_workspace/barrera/TEST_MATRIX-git-worktree-security.md`, `M docs/specs/40_workspace/vasquez/TEST_MATRIX-git-worktree-engineering.md`, `M skills/git-worktree/SKILL.md`, `M skills/git-worktree/references/guards.md`
  - Override record: `override: orchestrator 2026-09-16 COND-004-proceed-documented-dirty-baseline`

## 2. Create announces (exactly-once each, per announce-template.md §1, slot order donde+rama+porque+limpieza)

ANNOUNCE-001:
```text
Voy a crear el worktree en .worktrees/DRILL-001 con rama drill/dry-run-001 para COND-003 drill dry-run 2-SPEC lane 1/2; al terminar ejecuto git worktree remove .worktrees/DRILL-001 --force y te confirmo. ¿Procedo? [sí/no]
```

ANNOUNCE-002:
```text
Voy a crear el worktree en .worktrees/DRILL-002 con rama drill/dry-run-002 para COND-003 drill dry-run 2-SPEC lane 2/2; al terminar ejecuto git worktree remove .worktrees/DRILL-002 --force y te confirmo. ¿Procedo? [sí/no]
```

- Count: 2/2 create-announces, each emitted exactly once. No per-setup repeats. No remove-announces emitted in this note (removals verified via command snapshots below; people remove-line count contribution: 0 lines in transcript, removals proven by `worktree list` back to main-only).
- Uniformity: slot-only variance vs template (`donde`/`rama`/`porque`/`limpieza` differ; no other wording change → no REQ-PPL-002 waiver needed).

## 3. List snapshots

- After DRILL-001: 2 total incl main (drill lanes 1 ≤ 2, PASS):
  - `D:/GitHub/frame-ship 923a16f [main]`
  - `D:/GitHub/frame-ship/.worktrees/DRILL-001 923a16f [drill/dry-run-001]`
- After DRILL-002: 3 total incl main (drill lanes 2 ≤ 2, PASS):
  - `D:/GitHub/frame-ship 923a16f [main]`
  - `D:/GitHub/frame-ship/.worktrees/DRILL-001 923a16f [drill/dry-run-001]`
  - `D:/GitHub/frame-ship/.worktrees/DRILL-002 923a16f [drill/dry-run-002]`
- Post-cleanup snapshot: recorded in §4 (filled after cleanup commands run).

## 4. Cleanup (executed 2026-09-16, verified)

- `git worktree remove .worktrees/DRILL-001 --force` → ok (exit 0)
- `git worktree remove .worktrees/DRILL-002 --force` → ok (exit 0)
- `git worktree prune` → ok (exit 0)
- Final `git worktree list` → main only (1 entry: `D:/GitHub/frame-ship 923a16f [main]`)
- `git branch -D drill/dry-run-001 drill/dry-run-002` → ok (both deleted, exit 0)
- Residue check → `Test-Path .worktrees/DRILL-001` False, `Test-Path .worktrees/DRILL-002` False, `git status --porcelain -- .worktrees/` empty, `git branch --list "drill/*"` empty → residue-free CONFIRMED.

## 5. For orchestrator aggregation (people lane fills its matrix at re-gate)

- Excerpt paths (paths only, no bodies — C-006 scoped excerpts):
  - `session transcript excerpt (create consent Q+A x2): docs/specs/40_workspace/vasquez/DRILL-git-worktree-2spec.md §2 (ANNOUNCE-001, ANNOUNCE-002)`
  - `removal verify excerpt: docs/specs/40_workspace/vasquez/DRILL-git-worktree-2spec.md §4 (list back to main-only)`
  - `dirty-baseline drill log: docs/specs/40_workspace/vasquez/DRILL-git-worktree-2spec.md §1`
  - `override record: override: orchestrator 2026-09-16 COND-004-proceed-documented-dirty-baseline (this note §1)`
- Counts: create-announces 2/2 exactly-once; remove-announces 0 in transcript (removals command-verified); live-worktree max 2 ≤ 2.
- No PII/secrets attestation: paths + branch names + template prose only; zero credentials/sessions/tokens.

## 6. Risks / Assumptions

- Risks: drill branches share base commit with dirty working tree — no commits made in drill lanes, so no cross-contamination; `--force` remove used because drill lanes never diverge (safe for disposable drill, never for real lanes).
- Assumptions: orchestrator COND-004 override covers the dirty baseline observed in §1; people-reviewer accepts command-snapshot removal proof in lieu of remove-announce lines for this automation-owned drill.
