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

---

# Release Notes: remove-tool-mapping (internal close)

**Date:** 2026-09-16
**Release Manager:** montilla (CEO)
**Specs Included:** SPEC-remove-tool-mapping-engineering
**Domains-Touched:** [engineering]
**Ship Type:** close (internal close-out; no deploy, filing, launch, or workflow enablement)

## Highlights

- `tool-mapping.md` removed from the live tree: the CEO-only dispatch contract now has a single source — `using-frame-ship/SKILL.md §3` + `bootstrap-checklist.md` + `skills/AGENTS.md` + plugin strings. Full chain run in `single` mode: brief → spec → proposal → exec → min-gate (4/4 pass) → DoD PASS → this close.
- `SKILL.md` left self-contained: §3.1 ends at `acting.` (user amendment stripped the intermediate checklist clause; full load order lives in §3.0), §5 lists only `bootstrap-checklist.md` — refs 1:1 with disk.

## Changes

### Features

- N/A (close-out only — no new behavior)

### Fixes

- N/A (no defect; duplication removal)

### Removed

- `skills/using-frame-ship/references/tool-mapping.md` (38 lines: CEO-only rule + opencode/Codex/generic adapter rows + Rules) — SPEC-remove-tool-mapping-engineering, engineering
- `SKILL.md §5` tool-mapping bullet; `§3.1` tool-mapping pointer (then checklist clause per amendment) — same spec

### Breaking Changes

- None — session-load prose only; no runtime, no API, no contract semantics changed. External memory/links citing the old path will miss; recorded as accepted Low residual.

## Known Issues

- `README.md:97,236` prose still mentions tool-mapping (descriptive, non-load-bearing) — CEO follow-up, not a defect.
- `commit-convention.md` pointer dangling across stage skills (pre-existing, flagged at frame-intent) — CEO follow-up.

## Rollback / Undo

`git revert ea2733c` then `git revert 8d2e58b` — in that order (amendment first, exec second); restores the deleted file plus both SKILL lines. Evidence commits (`0fd68b5`, `70044a4`, gate `b037033`, handoff `deb242f`) revert independently with no live-tree effect. No external sends/filings/launches/deploys to undo. Owner: vasquez, ETA: immediate (< 5 min).

---

# Release Notes: residual-cleanup (internal close)

**Date:** 2026-09-16
**Release Manager:** montilla (CEO)
**Specs Included:** SPEC-residual-cleanup-engineering
**Domains-Touched:** [engineering]
**Ship Type:** close (internal close-out; no deploy, filing, launch, or workflow enablement)

## Highlights

- Front-door exact: the last two `tool-mapping` prose mentions outside history are gone — `README.md:97` descriptor without parenthetical, `:236` roadmap item without the harness clause (still `[ ]`, honestly pending).
- The second retained risk (dangling `commit-convention.md` pointers) was formally REFUTED with disk proof (`grep commit-convention skills/` = 0; purge `f859726` + its gate verified it) — closed without spending a commit.
- Full chain in `single` mode: brief → spec → proposal → exec → min-gate (4/4 pass) → DoD PASS → this close.

## Changes

### Features

- N/A (close-out only — no new behavior)

### Fixes

- N/A (no defect; stale-prose removal)

### Removed

- `README.md:97` parenthetical `(includes tool-mapping reference)` — SPEC-residual-cleanup-engineering, engineering
- `README.md:236` clause `+ tool-mapping per harness` — same spec

### Breaking Changes

- None — descriptive prose only; no loader, runtime, skill, or harness consumes the README as a contract.

## Known Issues

- None. Remaining `tool-mapping` strings repo-wide are `docs/` history + trace artifacts (by design, they reference the removed name as evidence, not as pointers).

## Rollback / Undo

`git revert e73eee0` — restores both README lines in one step. Evidence commits (`f1aa7a3`, gate `62a3667`, handoff `4707b79`) revert independently with no live-tree effect. No external sends/filings/launches/deploys to undo. Owner: vasquez, ETA: immediate (< 2 min).