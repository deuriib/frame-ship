# OKRs: Integración de Supporting Skills al Workflow

**Period:** Q3 2026
**Owner:** orchestrator

## Objective 1: Unificar la documentación y catálogo del sistema de habilidades

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-1.1 | `skills/AGENTS.md` y `AGENTS.md` dicen "10 dirs" | Actualizado a "13 dirs (10 chain + 3 supporting)" con catálogo explícito de supporting skills | Verificación de texto en ambos archivos |
| KR-1.2 | `using-frame-ship/SKILL.md` no tiene rutas para opt-in | Disparadores de `debugging`, `git-worktree` y `pull-request` incorporados en `Route by trigger` | Inspección de `using-frame-ship/SKILL.md` |

## Objective 2: Establecer contratos bidireccionales en las etapas padre

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-2.1 | `propose-changes`, `execute-spec` y `quality-gate` operan aisladas de las opt-in | Contratos de cadena actualizados reflejando puntos de conexión con `debugging`, `git-worktree` y `pull-request` | Inspección de `SKILL.md` en cada una de las 3 etapas |
| KR-2.2 | Incompatibilidad o ambigüedad en el pase de paquetes | 100% de consistencia en el paquete de referencia `SPEC/HARD/GATE/DOMAINS` | Verificación de `mise run typecheck` y consistencia de referencias |
