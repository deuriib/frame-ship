# Release Notes: single-demo-docs-fix (demo, no tag)

**Date:** 2026-09-16
**Release Manager:** montilla (CEO) + vasquez (engineering docs)
**Specs Included:** SPEC-single-demo-docs-fix
**Domains-Touched:** [engineering]
**Ship Type:** rollout (docs-only, interno)

## Highlights

- `AGENTS.md` vuelve a decir la verdad: repo git `19532cd/main`, `docs/briefs|specs/` existen, regla case `release-notes.md → RELEASE_NOTES.md`.

## Changes

### Fixes

- REQ-001 header git real (SPEC-single-demo-docs-fix, [engineering])
- REQ-002 docs existen con rutas reales (SPEC-single-demo-docs-fix, [engineering])
- REQ-003 regla case sin renames (SPEC-single-demo-docs-fix, [engineering])

### Domain Ships

- N/A (docs internos, sin filing/launch/close/workflow)

### Breaking Changes

Ninguno.

## Known Issues

- `AGENTS.md:54-55` aún dice `AGENTS.md absent before this run` — fuera de scope, candidato a próximo single.

## Rollback / Undo

`git checkout -- AGENTS.md` o `git revert <sha>` — owner vasquez, ETA <2 min. Evidencia demo se retira con `Remove-Item -Recurse docs/specs/40_workspace/single-demo` + `docs/briefs/BRIEF-single-demo-docs-fix.md` si se descarta.
