# Release Notes: single-demo lane (canonical singleton slot)

**Owner:** general (administrative owner, single-demo lane) | **Date:** 2026-09-18
**Skill:** `D:\GitHub\frame-ship\skills\execute-spec\SKILL.md` (single mode, direct)

## Consolidation Record

| Source variant | Archived to | SHA256 (source pre-move) | Disposition |
|----------------|-------------|--------------------------|-------------|
| `docs/specs/40_workspace/single-demo/RELEASE_NOTES-demo.md` | `docs/specs/50_archive/RELEASE_NOTES-demo-single-demo.md` | 055CF63512BCBC145ABC4C3363347CD3A19580D53ECC59D93CB0FB4693616E0D | moved byte-identical (copy → hash-verify → delete); content preserved below |

Created from suffixed variant (not created-new; not updated-in-place — no prior canonical existed). Singleton slot established by SPEC-singleton-consolidation-single-demo (2026-09-18). Future notes update this file in place, never a suffixed note.

## Ship Record (this unit)

Singleton consolidation: 3 variants → canonicals, 3 created-new, 3 updated in place. No behavior change, docs-only. Rollback: move archived originals back per record tables (owner general, ETA < 10 min). `30_delivery/RELEASE_NOTES.md` untouched per HARD per-lane scope.

---

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
