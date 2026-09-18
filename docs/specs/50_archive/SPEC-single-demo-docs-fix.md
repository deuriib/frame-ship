# Spec: AGENTS.md staleness fix (single-demo)

**ID:** SPEC-single-demo-docs-fix
**Owner:** vasquez (CTO)
**Domains-Touched:** [engineering]
**Brief Reference:** BRIEF-single-demo-docs-fix
**Status:** approved
**Priority:** P2
**Execution_Mode:** single
**Packet:** SPEC:docs/specs/40_workspace/single-demo/SPEC-single-demo-docs-fix.md#REQ-001-REQ-003 / HARD:single+docs-only-reversible-single-file / GATE:none-yet / DOMAINS:[engineering]

## 1. Context

`AGENTS.md` es leído como source of truth por el plugin (`skills/AGENTS.md` + `AGENTS.md` raíz). Tres líneas mienten hoy y contaminan cada sesión: estado git, existencia de `docs/briefs|specs/`, y guía de case `RELEASE_NOTES.md` vs `release-notes.md`. Fix docs-only, sin runtime, sin frontmatter, sin deps.

## 2. Requirements

- REQ-001: Corregir header `Generated/Commit/Branch` para reflejar repo git real (no `n/a not a git repo`).
- REQ-002: Corregir línea `docs/briefs|specs/* does NOT exist` → existe; listar rutas reales `docs/briefs/` + `docs/specs/`.
- REQ-003: Aclarar case gap `ship-release/references/release-notes.md` (template) vs `RELEASE_NOTES.md` (artefacto) con regla de uso en una línea, sin renombrar archivos.

## 3. Acceptance Criteria

- [ ] AC-001: `AGENTS.md` header ya no dice `not a git repo`; dice repo git + rama verificable vía `git status` — evidencia: `git diff AGENTS.md` + `test-matrix.md`.
- [ ] AC-002: `AGENTS.md` ya no dice `does NOT exist`; cita `docs/briefs/BRIEF-agent-templates.md` y `docs/specs/40_workspace/` — evidencia: diff + `Read docs/` listing.
- [ ] AC-003: Nota de case gap con regla `template minúsculas → artefacto MAYÚSCULAS, no renombrar sin actualizar SKILL §5` — evidencia: diff, sin renames (`git status` sin renames).

## 4. Contracts & Interfaces

N/A código. Contrato docs: no cambiar frontmatter loader (`name/description` only), no cambiar `frame-ship.ts`, no tocar `30_delivery/RELEASE_NOTES.md` real. Rollback: `git checkout -- AGENTS.md` o `git revert`.

## 5. Out of Scope

Runtime plugin, skills `references/` renames, specs reales, releases reales, PII/secretos, auth/data/API, cambios arquitectura (sin ADR requerido — se registra N/A en review-architecture).

## 6. Dependencies

Upstream: `docs/briefs/BRIEF-single-demo-docs-fix.md`. Downstream: `PROPOSED_CHANGES.md` en misma carpeta aislada. Sin servicios externos. `barrera` solo veredicto N/A.

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001 | PROPOSED_CHANGES.md §Cambio 1 | test-matrix.md T-001 + git diff |
| REQ-002 | AC-002 | PROPOSED_CHANGES.md §Cambio 2 | test-matrix.md T-002 + docs listing |
| REQ-003 | AC-003 | PROPOSED_CHANGES.md §Cambio 3 | test-matrix.md T-003 + git status sin renames |
