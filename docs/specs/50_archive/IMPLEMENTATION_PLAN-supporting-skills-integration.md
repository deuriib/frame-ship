# Implementation Plan: SPEC-supporting-skills-integration

**Agent:** engineering specialist (skill execute-spec)
**Date:** 2026-09-16
**Approved By:** orchestrator / engineering owner (via BRIEF & PROPOSED_CHANGES approval)
**Domains-Touched:** [engineering]

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Actualizar `skills/AGENTS.md` a 13 directorios y registrar tabla de Supporting Skills (REQ-SSI-001) | `skills/AGENTS.md` | git diff | 15m |
| 2 | Actualizar `AGENTS.md` raíz a 13 directorios (REQ-SSI-002) | `AGENTS.md` | git diff | 10m |
| 3 | Agregar triggers de opt-in a `using-frame-ship/SKILL.md` (REQ-SSI-003) | `skills/using-frame-ship/SKILL.md` | git diff | 10m |
| 4 | Actualizar Chain Contract en `propose-changes/SKILL.md` (REQ-SSI-004) | `skills/propose-changes/SKILL.md` | git diff | 5m |
| 5 | Actualizar Chain Contract en `execute-spec/SKILL.md` (REQ-SSI-005) | `skills/execute-spec/SKILL.md` | git diff | 5m |
| 6 | Actualizar Chain Contract en `quality-gate/SKILL.md` (REQ-SSI-006) | `skills/quality-gate/SKILL.md` | git diff | 5m |
| 7 | Generar matriz de trazabilidad y verificación | `docs/specs/40_workspace/engineering/test-matrix-supporting-skills-integration.md` | file create | 10m |

## Order of Operations

1. Actualizar la gobernanza general (`skills/AGENTS.md` y `AGENTS.md` raíz).
2. Actualizar el bootstrap enrutador (`using-frame-ship`).
3. Actualizar los contratos de las etapas clave (`propose-changes`, `execute-spec`, `quality-gate`).
4. Generar la matriz de trazabilidad.

## Rollback Points

Revertir commits de implementación devuelve los archivos al estado validado previo sin dañar la integridad del repositorio.

## Quality Gates

- [x] Engineering: Verificación de sintaxis markdown, exactitud de frontmatters y preservación del credo.
