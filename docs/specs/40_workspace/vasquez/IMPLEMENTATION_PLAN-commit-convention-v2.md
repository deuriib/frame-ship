# Implementation Plan: SPEC-commit-convention-v2

**Agent:** vasquez (CTO)
**Date:** 2026-09-16
**Approved By:** montilla (CEO) — single mode, documentation only
**Domains-Touched:** [engineering]

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Rewrite commit-convention.md with work-unit scope syntax, splitting/batching rules, updated table + examples | `skills/using-frame-ship/references/commit-convention.md` | file content | 30 min |
| 2 | Verify all 9 stage SKILL.md §5 References still cite the file correctly (no path change) | `skills/*/SKILL.md` (read-only check) | grep output | 5 min |

Each step maps to one work-unit commit unless the plan explicitly groups them (see `../../using-frame-ship/references/commit-convention.md`).

## Order of Operations

1. Rewrite the file (step 1) — single atomic change
2. Verify cross-references (step 2) — read-only, no commit needed

## Rollback Points

- After step 1: `git checkout -- skills/using-frame-ship/references/commit-convention.md` reverts to previous version. No downstream files depend on the content (only on the path).

## Quality Gates

- [x] Engineering: Documentation-only, no lint/tests/type-checks applicable
- [ ] Verify SKILL.md §5 references still valid after change (step 2)