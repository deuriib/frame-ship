# Test Matrix: Per-Lane Singleton Consolidation — Engineering Lane

**Spec:** `SPEC-singleton-consolidation-engineering.md` | **Owner:** vasquez | **Date:** 2026-09-18
**Mode:** single — docs-only unit; evidence = globs, listings, hashes (no code tests apply)

| REQ | Check (AC) | Method | Result |
|-----|-----------|--------|--------|
| REQ-001 | AC-001: 9 canonicals, no suffixed variant of the 9 types remains | `Get-ChildItem engineering/` name match | PASS — lane lists 9 canonicals + 4 SPEC-*.md (out-of-scope class); 0 suffixed variants of the 9 types |
| REQ-002 | AC-002: all originals in `50_archive/` byte-identical; zero purge | archive listing + hash-verify per file at move time (58/58) | PASS — MOVED_OK=58/58, FAILURES empty; every move copy→hash→delete |
| REQ-003 | AC-003: `50_archive/PROPOSED_CHANGES-hidden-flag.md` exists, hash-verified; new canonical references it | hashes (done) + reference line | PASS (`7BD6AE17…` == source) |
| REQ-004 | AC-004: each canonical carries its consolidation record | read-through 9 files | PASS (written above) |
| REQ-NF-001/002 | AC-005: prohibition-only scan; rollback note in HANDOFF | pattern scan + HANDOFF §Rollback | PASS — scan found no secret/token/credential patterns (see gate); HANDOFF carries §Rollback |

## Consolidated Proposal Index (15 PROPOSED_CHANGES variants → this canonical)

| Source (moved to `50_archive/`) | Subject |
|----------------------------------|---------|
| `PROPOSED_CHANGES-002-portable.md` | 002-portable |
| `PROPOSED_CHANGES-003-agents-to-root.md` | 003-agents-to-root |
| `PROPOSED_CHANGES-agy-plugin.md` | agy-plugin |
| `PROPOSED_CHANGES-brainstorm-frame-intent.md` | brainstorm-frame-intent |
| `PROPOSED_CHANGES-commit-convention purge.md` | commit-convention purge |
| `PROPOSED_CHANGES-debugging.md` | debugging |
| `PROPOSED_CHANGES-git-worktree-automation.md` | git-worktree-automation |
| `PROPOSED_CHANGES-git-worktree-engineering.md` | git-worktree-engineering |
| `PROPOSED_CHANGES-hidden-flag.md` | hidden-flag (variant; distinct from the preserved prior canonical `PROPOSED_CHANGES-hidden-flag.md` — same filename collision: archived variant renamed `PROPOSED_CHANGES-hidden-flag-variant.md`) |
| `PROPOSED_CHANGES-pull-request.md` | pull-request |
| `PROPOSED_CHANGES-remove-tool-mapping.md` | remove-tool-mapping |
| `PROPOSED_CHANGES-residual-cleanup.md` | residual-cleanup |
| `PROPOSED_CHANGES-single-dispatcher.md` | single-dispatcher |
| `PROPOSED_CHANGES-supporting-skills-integration.md` | supporting-skills-integration |
| `PROPOSED_CHANGES-version-sync-0.6.0.md` | version-sync-0.6.0 |

## Consolidated Plan Index (11 IMPLEMENTATION_PLAN variants → IMPLEMENTATION_PLAN.md)

`IMPLEMENTATION_PLAN-agy-plugin.md`, `IMPLEMENTATION_PLAN-brainstorm-frame-intent.md`, `IMPLEMENTATION_PLAN-ceo-only-dispatch.md`, `IMPLEMENTATION_PLAN-debugging.md`, `IMPLEMENTATION_PLAN-git-worktree-automation.md`, `IMPLEMENTATION_PLAN-git-worktree-engineering.md`, `IMPLEMENTATION_PLAN-hidden-flag.md`, `IMPLEMENTATION_PLAN-remove-tool-mapping.md`, `IMPLEMENTATION_PLAN-residual-cleanup.md`, `IMPLEMENTATION_PLAN-single-dispatcher.md`, `IMPLEMENTATION_PLAN-supporting-skills-integration.md` — all moved to `50_archive/`.

## Consolidated Test-Matrix Index (11 TEST_MATRIX variants → this file)

`TEST_MATRIX-agy-plugin.md`, `TEST_MATRIX-brainstorm-frame-intent.md`, `TEST_MATRIX-ceo-only-dispatch.md`, `TEST_MATRIX-debugging.md`, `TEST_MATRIX-git-worktree-automation.md`, `TEST_MATRIX-git-worktree-engineering.md`, `TEST_MATRIX-hidden-flag.md`, `TEST_MATRIX-remove-tool-mapping.md`, `TEST_MATRIX-residual-cleanup.md`, `TEST_MATRIX-single-dispatcher.md`, `test-matrix-supporting-skills-integration.md` (lowercase) — all moved to `50_archive/`.
