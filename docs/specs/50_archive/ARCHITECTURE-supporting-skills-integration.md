# Architecture Contract: Supporting Skills Integration

**Owner:** engineering owner
**Version:** v1
**Last Updated:** 2026-09-16
**Domains-Touched:** [engineering]

## Overview

El sistema de habilidades de Frame→Ship se compone de un eje troncal secuencial de 9 etapas (más el bootstrap de inicio) y habilidades transversales de soporte operativo (*Supporting Skills*). Este contrato formaliza la coexistencia desacoplada entre el eje cronológico de entrega y las habilidades que se acoplan bajo condiciones específicas (triage de defectos, concurrencia en subagentes y disciplina de Pull Request).

## Components

| Component | Responsibility | Interface / Acople |
|-----------|---------------|--------------------|
| `skills/using-frame-ship` | Bootstrap del sistema y enrutador maestro | Mapea disparadores hacia las 9 etapas troncales y las 3 supporting skills en `Process §3.2`. |
| `skills/debugging` | Triage metódico de causa raíz (RCA Fases 1–4) y generación de prueba de reproducción fallida | Entrada: bug report o fallo en `execute-spec`/`quality-gate`. Salida: handoff hacia `propose-changes`. |
| `skills/git-worktree` | Aislamiento repo-local para lanes concurrentes (`.worktrees/<spec-id>`) | Invocado por orquestador antes de `execute-spec` bajo `multi-subagents`. Liberado tras recolectar evidencia. |
| `skills/pull-request` | Empaquetado de diffs bajo presupuesto (≤400 líneas) y convención de ramas | Activado al concluir `execute-spec`, presentando el PR auditado hacia `quality-gate`. |
| Etapas Troncales (`propose-changes`, `execute-spec`, `quality-gate`) | Eje del ciclo de vida | Explicitan en sus `## 2. Chain Contract` las opciones de entrada/salida para estas herramientas. |

## Data Flow & Coupling

1. **Defecto / Regresión**:
   - `[Bug report o Fallo en Gate/Execute]` → `debugging` (RCA Fases 1–4) → `propose-changes` (`Previous: ... | frame-ship:debugging`).
2. **Paralelismo Seguro**:
   - `propose-changes` → `execute-spec` (`Supporting: ... frame-ship:git-worktree` en `.worktrees/<spec-id>`) → implementación aislada.
3. **Revisión Auditable**:
   - `execute-spec` → `pull-request` (`Next: ... | frame-ship:pull-request`) → `quality-gate` (`Previous: ... | frame-ship:pull-request`).

## Invariants

- INV-SSI-001: Las 3 supporting skills no alteran la rigidez ni la obligatoriedad del eje troncal para iniciativas estándar.
- INV-SSI-002: Ninguna supporting skill puede auto-aprobar cambios de código ni saltarse las compuertas de seguridad o arquitectura si tocan auth/datos/APIs.
- INV-SSI-003: Todo archivo `SKILL.md` debe mantener frontmatter exacto (`name`, `description`) y el credo intacto.

## Non-Functional Requirements

- Maintainability: Declaraciones explícitas de rutas condicionales en `Previous`, `Next` y `Supporting` en el texto de los Chain Contracts.
- Auditability: Trazabilidad completa desde `REQ-SSI-*` hasta los diffs en el repositorio.
