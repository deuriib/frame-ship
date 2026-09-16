# Product Brief: Remove tool-mapping reference (using-frame-ship)

**ID:** BRIEF-remove-tool-mapping
**Initiator:** montilla (CEO)
**Date:** 2026-09-16
**Status:** approved
**Execution_Mode:** single
**Domains-Touched:** [engineering]

## Problem Statement

`skills/using-frame-ship/references/tool-mapping.md` duplica el contrato de despacho (CEO-only + adapter rows opencode/Codex/generic) que ya vive como canónico en `using-frame-ship/SKILL.md §3`, `bootstrap-checklist.md`, `skills/AGENTS.md` y plugin `frame-ship.ts`. Quien entra a sesión lee dos fuentes para una sola regla y corre riesgo de drift. Importa ahora porque el chain es contrato vivo y cada stage cita `SPEC/HARD/GATE/DOMAINS` por referencia — una fuente menos, cero ambigüedad.

## Desired Outcome

`tool-mapping.md` fuera del árbol vivo, `using-frame-ship/SKILL.md §3.1 (L45)` y `§5 References (L75-77)` reescritos sin puntero colgando, y cero menciones vivas en `skills/`, `.opencode/` y `AGENTS.md` raíz. Historial en `docs/` (`40_workspace/`, `50_archive/`, briefs/OKRs pasados) queda intacto como evidencia — no se reescribe historia.

## Scope

### In Scope

- Eliminar `skills/using-frame-ship/references/tool-mapping.md` [engineering]
- Actualizar `skills/using-frame-ship/SKILL.md §3.1` y `§5 References` para no citar el archivo [engineering]
- Verificación grep: 0 hits vivos fuera de `docs/` histórico + matriz de trazabilidad [engineering]

### Out of Scope

- Reescribir historial en `docs/specs/40_workspace/`, `50_archive/`, `README.md` histórico, ADRs cerrados
- Cambiar semántica del contrato CEO-only dispatch, orden del chain, frontmatter loader
- Tocar runtime `frame-ship.ts` salvo que el grep pruebe puntero vivo (hoy: 0 hits)
- Rotar keys, deploys prod, widen permissions

## Stakeholders

| Role | Agent | Involvement |
|------|-------|-------------|
| Sponsor | montilla | Decision authority |
| Owner | vasquez | Delivery ownership, docs-engineering |
| Touched | barrera | Veredicto seguridad N/A (sin auth/data/API, docs-only) |

## Constraints

- Budget: none (docs-only)
- Timeline: single session, reversible con `git revert`
- Regulatory: Ley 172-13 minimización — sin PII/secretos en evidencia
- Brand/GTM: N/A
- People/change: N/A, cambio docs aislado

## Open Questions

- [x] ¿Modo? `single` directo, sin fan-out, min gate — congelado aquí 2026-09-16
- [x] ¿Alcance? Solo `tool-mapping.md` + 2 citas vivas en `SKILL.md` — confirmado por usuario 2026-09-16
- [x] ¿Éxito? Cero dangling en vivo; `docs/` histórico intacto — confirmado por usuario 2026-09-16

---

# OKRs: remove-tool-mapping

**Period:** Q3 2026
**Owner:** montilla (CEO)

## Objective 1: Una sola fuente para el contrato de despacho

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-1.1 Archivo eliminado del árbol vivo | 1 vivo en `using-frame-ship/references/` | 0 archivos | `Test-Path` False + `git status` muestra delete |
| KR-1.2 Cero punteros colgando en vivo | 2 citas (`SKILL.md:45,77`) | 0 hits en `skills/` + `.opencode/` + `AGENTS.md` raíz | grep `tool-mapping` = 0 fuera de `docs/` |

## Objective 2: Trazabilidad single demostrada

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-2.1 REQ→evidencia→gate | 0 | REQs trazados a diff + GATE OPEN | `test-matrix.md` + `GATE_REPORT.md` OPEN + `HANDOFF.md` |
