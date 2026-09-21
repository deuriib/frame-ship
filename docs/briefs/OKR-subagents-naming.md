# OKRs: Estandarización de Nomenclatura — "subagents"

**Period:** Q3 2026
**Owner:** orchestrator

## Objective 1: Unificar la terminología operativa activa eliminando la redundancia léxica

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-1.1 | 22 ocurrencias de `multi-subagents` en `skills/` | 0 ocurrencias de `multi-subagents` en `skills/` | `grep -rn "multi-subagents" skills/` |
| KR-1.2 | 100% de los templates activos (`brief`, `spec`, `proposal`, `gate`, `dod`) usan `multi-subagents` | 100% de los templates activos usan `subagents` como `Execution_Mode` | Inspección de templates en `skills/*/references/` |
| KR-1.3 | Reglas de agentes y AGENTS.md mencionan `multi-subagents` | Reglas y catálogo actualizados con `subagents` | `grep -rn "multi-subagents" AGENTS.md rules/ .agents/` |

## Objective 2: Garantizar continuidad contractual y cero regresiones

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-2.1 | 0 ADRs documentando la simplificación a `subagents` | 1 ADR (`ADR-009`) registrado en `docs/specs/12_adr/` | Existencia y aprobación de `ADR-009` |
| KR-2.2 | Typecheck y validación de harness limpios | 0 errores de validación de sintaxis o tests | `mise run typecheck` |
