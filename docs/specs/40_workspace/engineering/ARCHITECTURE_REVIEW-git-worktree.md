# Architecture Review: SPEC-git-worktree (engineering + automation + security + people)

**Reviewer:** engineering owner (vasquez) — with architect + automation/ops owner independent review
**Date:** 2026-09-16
**Verdict:** Approved

## Contract Compliance

| Invariant | Status | Notes |
|-----------|--------|-------|
| INV-001 (chain unchanged, supporting not a stage) | pass | All 4 proposals declare supporting skill; no stage reorder; `SKILL.md` §2 Chain Contract pins it |
| INV-002 (`.worktrees/` ignored, fail-closed) | pass | `.gitignore` + `git check-ignore -q .worktrees` pre-add gate in engineering + security + automation proposals; nonzero = STOP |
| INV-003 (max 2 parallel) | pass | `git worktree list` count guard + serialized `mise` setup in engineering `pwsh-flow.md` + automation capacity workflow |
| INV-004 (clean baseline) | pass | `git status --porcelain` verify; REFUSE `add` unless session-recorded override; people refusal script consumes verbatim |
| INV-005 (runtime untouched, catalogue unchanged) | pass | Zero lines in `.opencode/plugins/frame-ship.ts`; 8-domain catalogue untouched; scope guard via `git diff --stat` |
| INV-006 (reference-only packets) | pass | `SPEC/HARD/GATE/DOMAINS` by reference in every lane; security scoped-export allowlist; no pasted bodies |
| INV-007 (pwsh-native) | pass | Zero POSIX `$(...)`, `Resolve-Path`-safe joins, `mise run typecheck` baseline gate; serialized installers |
| INV-008 (consent + announce) | pass | Consent-before-create + exactly-once uniform announce (dónde + rama + por qué + limpieza); template owned by people owner, waiver path recorded |
| INV-009 (proposal-before-code rides) | pass | No impl file mods in any proposal; no code inside worktrees without approved `PROPOSED_CHANGES.md` for its SPEC |

## ADR Required?

- [x] Yes — ADR-004 created (`docs/specs/10_design/ADR-004-git-worktree.md`)
- [ ] No — change is within existing contracts

## Conditions for Approval

None — 9/9 invariants pass, no invariant break, no conditions. Security conditions (if any) owned by security owner — see `docs/specs/40_workspace/barrera/PROPOSED_CHANGES-git-worktree-security.md` and downstream `review-security` (STRIDE) verdict by reference; this review does not override them.

## Sign-off

- [x] engineering owner (vasquez) — architecture verdict Approved 2026-09-16
