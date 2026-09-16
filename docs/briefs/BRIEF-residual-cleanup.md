# Product Brief: Residual cleanup (README tool-mapping prose)

**ID:** BRIEF-residual-cleanup
**Initiator:** montilla (CEO)
**Date:** 2026-09-16
**Status:** approved
**Execution_Mode:** single
**Domains-Touched:** [engineering]

## Problem Statement

Del close de `tool-mapping` quedaron 2 líneas de prosa stale en `README.md` (L97 descriptor con paréntesis + L236 roadmap con item por harness). No rompen nada (no son punteros de carga), pero el front-door del repo describe un archivo que ya no existe y un plan que ya no aplica. Quien lee el README hereda mapa viejo. Importa ahora porque el chain cerró con "cero dangling en vivo" y estas 2 líneas son la excepción visible.

## Desired Outcome

`README.md` sin menciones a `tool-mapping`: L97 sin el paréntesis, L236 reescrita sin tool-mapping (item sigue sin marcar). Grep `tool-mapping` = 0 fuera de `docs/` histórico + artefactos de traza de esta y la unidad anterior (by design, referencian el nombre borrado como evidencia).

## Scope

### In Scope

- Reescribir `README.md:97` (quitar `(includes tool-mapping reference)`) [engineering]
- Reescribir `README.md:236` (quitar `+ tool-mapping per harness`, item sigue `[ ]`) [engineering]
- Verificación grep por capas + matriz de trazabilidad [engineering]

### Out of Scope

- Reescribir secciones What's Inside / Roadmap completas
- Tocar `docs/` histórico, ADRs, matrices y handoffs pasados (referencian el nombre como evidencia, no como puntero)
- Cambiar semántica del chain, frontmatter loader, runtime del plugin
- Rotar keys, deploys prod, widen permissions

## Stakeholders

| Role | Agent | Involvement |
|------|-------|-------------|
| Sponsor | montilla | Decision authority |
| Owner | vasquez | Delivery ownership, docs-engineering |
| Touched | barrera | Veredicto seguridad N/A (prosa docs-only, sin auth/data/API) |

## Constraints

- Budget: none (docs-only)
- Timeline: single session, reversible con `git revert`
- Regulatory: Ley 172-13 minimización — sin PII/secretos en evidencia
- Brand/GTM: N/A (README es front-door interno; cambio de exactitud, no de marca)
- People/change: N/A

## Open Questions

- [x] ¿Modo? `single` directo — congelado aquí 2026-09-16
- [x] ¿Alcance? 2 líneas README, resto intacto — confirmado por usuario 2026-09-16
- [x] ¿L236? reword, sigue `[ ]` — confirmado por usuario 2026-09-16
- [x] ¿Riesgo #2 (commit-convention)? REFUTADO — `grep commit-convention skills/` = 0 en disco (purge `f859726` + gate lo verificaron); el contenido stale del skill tool no es evidencia. Sin trabajo pendiente.

---

# OKRs: residual-cleanup

**Period:** Q3 2026
**Owner:** montilla (CEO)

## Objective 1: Front-door exacto

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-1.1 Líneas README actualizadas | 2 stale (L97, L236) | 0 menciones | grep `tool-mapping README.md` = 0 |
| KR-1.2 Cero carga funcional afectada | 0 punteros de carga en README | 0 | read-through: prosa descriptiva, nada que el runtime/session-load consuma |

## Objective 2: Trazabilidad single demostrada

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-2.1 REQ→evidencia→gate | 0 | REQs trazados a diff + GATE OPEN | `test-matrix.md` + `GATE_REPORT.md` OPEN + `HANDOFF.md` |
