# Test / Evidence Matrix: SPEC-git-worktree-engineering (engineering lane)

**Agent:** engineering specialist, vasquez lens — skill(frame-ship:execute-spec)
**Date:** 2026-09-16
**Domains-Touched:** [engineering]
**Approvals:** ARCH Approved via ADR-004 accepted 9/9; SEC Conditional C-001..C-006 — this lane implements C-001 and C-003 relevant parts, others by reference
**Execution_Mode:** multi-subagents, win32/pwsh only

| REQ-ID | Evidence ID | Description | Type | Status | Commit |
|--------|-------------|-------------|------|--------|--------|
| REQ-001 | T-001 | SKILL.md exists with exact frontmatter and body shape; §5 resolves to existing lifecycle file | Review | pass | pending — orchestrator owns commits |
| REQ-002 | T-002 | `.gitignore` contains `.worktrees/` entry; check-ignore fail-closed gate green before any add in trailing-slash form; zero tracked worktree paths — C-001 | Attestation | pass | pending — orchestrator owns commits |
| REQ-003 | T-003 | Flows pwsh-native with Resolve-Path-safe joins and max-2 discipline; POSIX dollar-paren scan 0 hits; live list at or below 2 — C-003 relevant part | Review | pass | pending — orchestrator owns commits |
| REQ-004 | T-004 | Per-worktree setup reuses mise toolchain with serialized baseline gate green before execute-spec — mechanics owned by automation lane, consumed verbatim by reference | Attestation | pass | pending — orchestrator owns commits |
| REQ-005 | T-005 | Consent-before-create plus warm announce covering donde plus rama plus por que plus limpieza, wording by reference to people-lane template | Review | pass | pending — orchestrator owns commits |
| REQ-006 | E-001 | Lifecycle covers create to verify to remove with clean-baseline verify, dirty-baseline refuse-or-override path, submodule guard and sandbox fallback by reference | Review | pass | pending — orchestrator owns commits |
| REQ-007 | E-002 | Chain and runtime invariants hold — no stage added, plugin single-file untouched, catalogue unchanged; diff-stat scope guard | Attestation | pass | pending — orchestrator owns commits |
| REQ-008 | E-003 | Proposal-before-code and reference-only packets ride every lane — no pasted bodies, no phantom state | Review | pass | pending — orchestrator owns commits |

Types per `skills/execute-spec/references/test-matrix.md`. Code REQs use tests; skill-shape REQs use Review and Attestation with artifact path — REQ-ID trace mandatory.

## Condition Evidence — C-001, C-002, C-003 relevant parts

- C-001 check-ignore log: `git check-ignore -q .worktrees/` exit 0 with and without the directory present, plus child path `.worktrees/foo` exit 0 — pass. Bare form without the slash exits 0 only when the directory exists on disk and 1 on a fresh clone with no directory yet, so the lifecycle pins the trailing-slash form as canonical — same pattern, same fail-closed semantics, green pre-add either way. Assumption stated in lane return; security lane owns the canonical guards text and can overrule. `git status --porcelain` snapshot shows zero tracked `.worktrees/` paths — pass. Backed by `.gitignore` entry `.worktrees/` with SPEC REQ-002 comment. Log excerpt paths: session shell logs for this lane, commands run post-edit.
- C-003 live-count snapshot: `git worktree list` live count at or below 2 at lane close — pass. Snapshot path: session shell log for this lane. Max-2 discipline pinned in `skills/git-worktree/SKILL.md` §3 and `references/worktree-lifecycle.md` §§1-3.
- C-002 secret-pattern scan: high-signal secret-assignment scan over lane files — `skills/git-worktree/SKILL.md`, `skills/git-worktree/references/worktree-lifecycle.md`, `.gitignore` hunk, both `40_workspace/vasquez/*-git-worktree-engineering.md` docs — returns 0 hits — pass. Deny-default prose mentions of secret and credential words are policy statements, not embedded values. Full trust-boundary map and remaining C-002/C-004/C-005/C-006 parts by reference to security lane and orchestrator.
- C-004/C-005/C-006: by reference — owned by parallel lanes plus orchestrator; this lane changes no ports, adapters, TTL ownership, or announce tone.

## Coverage Summary

- Unit coverage: N/A — non-code skill-shape change with justification per template; verification via Review and Attestation with artifact paths.
- Integration coverage: N/A — same justification; cross-lane integration rides the gate diff-stat plus parallel-lane evidence by reference.
- Evidence coverage: 8/8 REQ-IDs with linked artifact — T-001/T-002/T-003/T-004/T-005/E-001/E-002/E-003.
- Acceptance criteria covered: AC-001 via T-001, AC-002 via T-002, AC-003 via T-003, AC-004 via T-004 by reference, AC-005 via T-005, AC-006 via E-001, AC-007 via E-002, AC-008 via E-003 — 8/8.
