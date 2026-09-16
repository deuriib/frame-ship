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