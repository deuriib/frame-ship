# Test / Evidence Matrix: SPEC-git-worktree-engineering (engineering lane)

**Agent:** engineering specialist, vasquez lens — skill(frame-ship:execute-spec)
**Date:** 2026-09-16
**Domains-Touched:** [engineering]
**Approvals:** ARCH Approved via ADR-004 accepted 9/9; SEC Conditional C-001..C-006 — this lane implements C-001 and C-003 relevant parts, others by reference
**Execution_Mode:** multi-subagents, win32/pwsh only

| REQ-ID | Evidence ID | Description | Type | Status | Commit |
|--------|-------------|-------------|------|--------|--------|
| REQ-001 | T-001 | SKILL.md exists with exact frontmatter and body shape; §5 lists all 4 existing reference files (COND-001 fix 2026-09-16) | Review | pass | pending — orchestrator owns commits |
| REQ-002 | T-002 | `.gitignore` contains `.worktrees/` entry; check-ignore fail-closed gate green before any add in trailing-slash form; zero tracked worktree paths — C-001 (pathed probes 2026-09-16) | Attestation | pass | pending — orchestrator owns commits |
| REQ-003 | T-003 | Flows pwsh-native with Resolve-Path-safe joins and max-2 discipline; POSIX dollar-paren scan 0 hits; live list at or below 2 — C-003 relevant part (pathed probes 2026-09-16) | Review | pass | pending — orchestrator owns commits |
| REQ-004 | T-004 | Per-worktree setup reuses mise toolchain with serialized baseline gate green before execute-spec — mechanics owned by automation lane, consumed verbatim by reference | Attestation | pass | pending — orchestrator owns commits |
| REQ-005 | T-005 | Consent-before-create plus warm announce covering donde plus rama plus por que plus limpieza, wording by reference to people-lane template | Review | pass | pending — orchestrator owns commits |
| REQ-006 | E-001 | Lifecycle covers create to verify to remove with clean-baseline verify, dirty-baseline refuse-or-override path, submodule guard and sandbox fallback by reference | Review | pass | pending — orchestrator owns commits |
| REQ-007 | E-002 | Chain and runtime invariants hold — no stage added, plugin single-file untouched, catalogue unchanged; diff-stat scope guard | Attestation | pass | pending — orchestrator owns commits |
| REQ-008 | E-003 | Proposal-before-code and reference-only packets ride every lane — no pasted bodies, no phantom state | Review | pass | pending — orchestrator owns commits |

Types per `skills/execute-spec/references/test-matrix.md`. Code REQs use tests; skill-shape REQs use Review and Attestation with artifact path — REQ-ID trace mandatory.

## Condition Evidence — C-001, C-002, C-003 relevant parts (pathed, fix loop N=1, 2026-09-16 — no unpathed session-shell cites)

- C-001 ignore gate (T-002, COND-002 part): `git check-ignore -q .worktrees/` → exit 0 observed 2026-09-16 (trailing-slash canonical form). `git status --porcelain -- .worktrees/` → empty (0 lines) observed 2026-09-16. `git ls-files -- .worktrees/` → empty (0 tracked paths) observed 2026-09-16. Backed by `.gitignore:55-56` entry `.worktrees/` (`# git-worktree isolation (SPEC-git-worktree-engineering REQ-002, C-001)`). Scope: this lane's evidence covers `skills/git-worktree/SKILL.md` §5 + this matrix + `.gitignore` hunk only. Dirty baseline note: full `git status --porcelain` on 2026-09-16 shows `M .gitignore, M AGENTS.md, M README.md` (plus lane/parallel-lane edits `M skills/git-worktree/SKILL.md` mine, `M skills/git-worktree/references/guards.md` security-lane parallel edit — not touched by me). `AGENTS.md`/`README.md` are OUTSIDE engineering lane — do not touch; recorded as orchestrator-override pending per COND-004. Next `git worktree add` requires session-recorded override or clean baseline per skill §3 step 2 — escalated to orchestrator, no sideways action.
- C-003 live-count + POSIX scan (T-003, COND-002 part): `git worktree list` → 1 entry (`D:/GitHub/frame-ship 923a16f [main]`, count 1 ≤ 2) observed 2026-09-16 — pass. `Select-String -Path "skills/git-worktree/**/*" -Pattern '\$\('` → 0 hits observed 2026-09-16 — pass. Max-2 discipline pinned in `skills/git-worktree/SKILL.md` §3 and `references/worktree-lifecycle.md` §§1-3. Reference-file existence (COND-001 proof): `Test-Path` 2026-09-16 → `worktree-lifecycle.md` True, `guards.md` True, `pwsh-flow.md` True, `announce-template.md` True (lengths 4049/6803/6066/3727); `SKILL.md` §5 now lists 4/4 lines — COND-001 cleared in this lane, gate to confirm.
- C-002 secret-pattern scan (COND-002 part, scoped to lane files + `.gitignore` hunk): `Select-String -Path "skills/git-worktree/SKILL.md","docs/specs/40_workspace/vasquez/TEST_MATRIX-git-worktree-engineering.md" -Pattern '(?i)(password|secret|api[_-]?key|token)\s*[:=]'` → 0 hits observed 2026-09-16 — pass. Deny-default prose mentions of secret/credential words are policy statements, not embedded values. Full trust-boundary map and remaining C-002/C-004/C-005/C-006 parts by reference to security lane and orchestrator — no PII in paths, logs, or shares.
- C-004/C-005/C-006: by reference — owned by parallel lanes plus orchestrator; this lane changes no ports, adapters, TTL ownership, or announce tone.

## Coverage Summary

- Unit coverage: N/A — non-code skill-shape change with justification per template; verification via Review and Attestation with artifact paths.
- Integration coverage: N/A — same justification; cross-lane integration rides the gate diff-stat plus parallel-lane evidence by reference.
- Evidence coverage: 8/8 REQ-IDs with linked artifact — T-001/T-002/T-003/T-004/T-005/E-001/E-002/E-003.
- Acceptance criteria covered: AC-001 via T-001, AC-002 via T-002, AC-003 via T-003, AC-004 via T-004 by reference, AC-005 via T-005, AC-006 via E-001, AC-007 via E-002, AC-008 via E-003 — 8/8.
