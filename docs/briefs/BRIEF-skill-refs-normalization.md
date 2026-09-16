# Product Brief: Normalización de referencias cruzadas entre skills (frame-ship:{skill-name})

**ID:** BRIEF-skill-refs-normalization
**Initiator:** montilla (CEO)
**Date:** 2026-09-16
**Status:** approved
**Execution_Mode:** single
**Domains-Touched:** [engineering]

## Problem Statement

Las 10 skills (`using-frame-ship` + 9 stages) se citan entre ellas con formatos dispares (rutas relativas, nombres sueltos, mayúsculas inconsistentes). Quien entra a sesión hereda navegación rota del chain y riesgo de saltar stages. Importa ahora porque el chain es contrato vivo y la próxima demo single lo recorre end-to-end.

## Desired Outcome

Las 10 `SKILL.md` citan a sus vecinas con el template `frame-ship:{skill-name}` (ej: `frame-ship:translate-to-spec`), sin referencias viejas ni rotas, chain navegable de `frame-intent` a `ship-release` pasando por `using-frame-ship`.

## Scope

### In Scope

- Auditar refs cruzadas en 10 `SKILL.md` (9 stages + `using-frame-ship`) [engineering]
- Normalizar a `frame-ship:{skill-name}` y actualizar `§5 References` donde apunte entre skills [engineering]
- Evidencia de antes/después + matriz de trazabilidad [engineering]

### Out of Scope

- Cambiar runtime `frame-ship.ts`, frontmatter loader, contratos de arquitectura
- Crear/eliminar skills, cambiar proceso de stages, tocar releases reales
- Rotar keys, deploys prod, widen permissions

## Stakeholders

| Role | Agent | Involvement |
|------|-------|-------------|
| Sponsor | montilla | Decision authority |
| Owner | vasquez | Delivery ownership, docs-engineering |
| Touched | barrera | Veredicto seguridad N/A (sin auth/data/API) |

## Constraints

- Budget: none (docs-only)
- Timeline: single session, reversible con `git revert`
- Regulatory: Ley 172-13 minimización — sin PII/secretos en evidencia
- Brand/GTM: N/A
- People/change: N/A, cambio docs aislado

## Open Questions

- [x] ¿Modo? `single` directo, sin fan-out, min gate — congelado aquí 2026-09-16
- [x] ¿Alcance? 9 stages + `using-frame-ship` (10 total) — confirmado por usuario 2026-09-16
- [ ] ¿Slug archivo? `skill-refs-normalization` confirmado por usuario 2026-09-16

---

# OKRs: skill-refs-normalization

**Period:** Q3 2026
**Owner:** montilla (CEO)

## Objective 1: Chain navegable con un solo formato

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-1.1 Skills con refs normalizadas | 0/10 | 10/10 `SKILL.md` usan `frame-ship:{skill-name}` | grep `frame-ship:` vs formatos viejos en `skills/*/SKILL.md` |
| KR-1.2 Cero refs rotas/viejas | desconocido | 0 rotas | auditoría antes/después + `§5 References` consistente |

## Objective 2: Trazabilidad single demostrada

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-2.1 REQ→evidencia→gate | 0 | REQs trazados a diff + GATE OPEN | `test-matrix.md` + `GATE_REPORT.md` OPEN + `HANDOFF.md` |
