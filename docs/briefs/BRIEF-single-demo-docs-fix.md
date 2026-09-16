# Product Brief: Single-demo docs fix (AGENTS.md staleness)

**ID:** BRIEF-single-demo-docs-fix
**Initiator:** montilla (CEO)
**Date:** 2026-09-16
**Status:** approved
**Execution_Mode:** single
**Domains-Touched:** [engineering]

## Problem Statement

`AGENTS.md` es source of truth del plugin pero contiene notas obsoletas: dice `not a git repo` cuando sí es repo git, dice `docs/briefs|specs/* no existe` cuando ya existe `docs/briefs/BRIEF-agent-templates.md` y `docs/specs/`, y el gap de case `RELEASE_NOTES.md` vs `release-notes.md` no tiene guía de uso. Quien entra a sesión hereda contexto erróneo.

## Desired Outcome

`AGENTS.md` describe el repo tal como es hoy, en <15 líneas cambiadas, un solo archivo, reversible con `git revert`. La sesión single deja evidencia viva aislada sin tocar artefactos reales.

## Scope

### In Scope

- Corregir 3 notas obsoletas en `AGENTS.md` [engineering]
- Aclarar uso de `RELEASE_NOTES.md` vs template `release-notes.md` [engineering]
- Evidencia aislada en `docs/specs/40_workspace/single-demo/` [engineering]

### Out of Scope

- Cambiar runtime `frame-ship.ts`, skills, frontmatter loader
- Cambiar specs reales, releases reales, `30_delivery/RELEASE_NOTES.md`
- Rotar keys, deploys prod, widen permissions

## Stakeholders

| Role | Agent | Involvement |
|------|-------|-------------|
| Sponsor | montilla | Decision authority + gate synthesis demo |
| Owner | vasquez | Delivery ownership, docs-engineering |
| Touched | barrera | Veredicto seguridad N/A (sin auth/data/API) |

## Constraints

- Budget: none (docs-only)
- Timeline: single session, reversible
- Regulatory: Ley 172-13 minimización — sin PII/secretos en evidencia
- Brand/GTM: N/A
- People/change: N/A, cambio aislado demo

## Open Questions

- [x] ¿Modo? `single` directo, sin `task`, min gate — congelado aquí
- [ ] ¿Slug archivo? `single-demo-docs-fix` confirmado por usuario 2026-09-16

---

# OKRs: single-demo-docs-fix

**Period:** Q3 2026
**Owner:** montilla (CEO)

## Objective 1: Verdad operativa en una página

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-1.1 AGENTS.md sin notas falsas | 3 notas obsoletas | 0 notas obsoletas | lectura `AGENTS.md` vs `git status` + `docs/` listing |

## Objective 2: Cadena single demostrada end-to-end

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-2.1 Trazabilidad REQ→evidencia→gate | 0 | 3 REQs trazados a diff + GATE OPEN | `test-matrix.md` + `GATE_REPORT.md` OPEN |
