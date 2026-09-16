# Release Notes: v0.3.3

**Date:** 2026-09-16
**Release Manager:** montilla (CEO)
**Specs Included:** SPEC-commit-convention-v2
**Domains-Touched:** [engineering]
**Ship Type:** policy-enable

## Highlights

- Commit convention upgraded to work-unit scope syntax: `type(<stage>/<work-unit>): subject`. Every commit now self-describes its stage and work unit, making history traceable to briefs, specs, REQ-IDs, ADRs, and releases.
- Multiple commits are now mandated when work units are distinct — no more 1-commit-per-stage rigidity. Splitting and batching rules give agents a clear decision procedure.

## Changes

### Features

- Work-unit scope syntax `type(<stage>/<work-unit>): subject` for all 9 stages (SPEC-commit-convention-v2, engineering)
- Work Unit Definition table mapping each stage to its unit identifier
- Splitting rules: mandatory split per distinct work unit + split when concerns differ (code vs. docs, impl vs. test, feature vs. config)
- Batching rules: allowed only when plan explicitly groups, tightly coupled, or same stage/work-unit/concern; never batch different REQ-IDs

### Fixes

- Rigid "1 per stage" defaults replaced with work-unit-based commit counts
- Flat scope syntax (`brief-auth`, `spec-003`) replaced with stage-qualified scopes (`frame-intent/brief-auth`, `translate-to-spec/spec-003`)

### Breaking Changes

- Commit scope format changes from `type(scope)` to `type(<stage>/<work-unit>)` — guidance only, existing history untouched, no enforcement

## Known Issues

- Stage SKILL.md one-line examples still show old flat syntax; they drift naturally as stages execute (reference file is authoritative)

## Rollback / Undo

`git checkout -- skills/using-frame-ship/references/commit-convention.md` reverts the convention file. No downstream dependencies on content — all 9 SKILL.md files reference by path only. Owner: vasquez, ETA: immediate.

---

# Release Notes: commit-convention-purge (internal close)

**Date:** 2026-09-16
**Release Manager:** operations function + engineering owner (dispatched by orchestrator Montilla CEO)
**Specs Included:** commit-convention purge (`docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` @ `a17c7d8`)
**Domains-Touched:** [engineering]
**Ship Type:** close (internal close-out; no deploy, filing, launch, or workflow enablement)

## Highlights

- Commit convention fully purged from the repo: convention template deleted plus all 8 historical commit-convention-v2 work products and their 5 gate review files — 14 deletions total via `f859726`.
- All live citations updated: 14 edits (13 files, 23 lines — 9 stage SKILL close lines + `skills/AGENTS.md` + `implementation-plan.md` + `using-frame-ship` §5 + `docs/specs/AGENTS.md` index rows) plus the COND-001 count fix via `f5ef7ad`. `rg "commit-convention" skills/` returns zero matches.
- Shipped-record prose kept as history (§C keep-as-history per orchestrator ruling): prior v0.3.3 entries above untouched — append only, audit trail intact.

## Changes

### Features

- N/A (close-out only — no new behavior)

### Fixes

- COND-001: `skills/AGENTS.md:24` file-count prose corrected (`using-frame-ship` 3 files, `translate-to-spec` 4) via `f5ef7ad` (commit-convention purge, engineering)

### Removed

- `skills/using-frame-ship/references/commit-convention.md` + 8 historical commit-convention-v2 artifacts + 5 gate v2 reviews (commit-convention purge, engineering)

### Breaking Changes

- None — guidance only per prior v0.3.3 entry (existing history untouched, no enforcement ever existed).

## Known Issues

- None. Residual `commit-convention` strings repo-wide are exactly the §C keep-as-history set (CHANGELOG 2 lines, RELEASE_NOTES v0.3.3 lines above, plugin-001 archive 1 line, vasquez handoff 1 line) plus the purge proposal/gate self-descriptions; zero live pointers.

## Rollback / Undo

`git revert f859726` then `git revert f5ef7ad` — in that order (impl first, gate fix second); single-work-unit reverts restore all 14 deleted files and all citation edits. No external sends/filings/launches/deploys to undo. Owner: engineering owner, ETA: immediate (< 5 min).