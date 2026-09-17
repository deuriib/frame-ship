# Product Brief: Integración de Supporting Skills al Workflow (git-worktree, debugging, pull-request)

**ID:** BRIEF-integrate-supporting-skills
**Initiator:** orchestrator
**Date:** 2026-09-16
**Status:** approved
**Execution_Mode:** single
**Domains-Touched:** [engineering]
**Classification:** architectural-initiative
**Framings-Considered:**
- Framing 1 (Superficial): Documentar solo en `skills/AGENTS.md` como texto informativo. Rechazado: no garantiza contratos de activación ni handoffs formales.
- Framing 2 (Cadena Rígida): Convertir las 3 en etapas lineales fijas obligatorias. Rechazado (corte YAGNI): añade fricción artificial obligando a worktrees y triage de bugs donde no existen.
- Framing 3 (Recomendado - Supporting Skills Transversales Formales): Mantener el eje troncal de 9 etapas intacto, registrar formalmente las 3 habilidades como supporting skills con tabla de activación en `skills/AGENTS.md` y `using-frame-ship`, y explicitar los puntos de acople en las etapas padre (`debugging` → `propose-changes`, `execute-spec` ↔ `git-worktree`, `execute-spec` → `pull-request` → `quality-gate`).
**Approval:** file-approval — user approved on 2026-09-16

## Problem Statement

El repositorio cuenta con 13 carpetas de habilidades en `skills/`: las 10 de la cadena troncal (bootstrap `using-frame-ship` + 9 etapas) y 3 habilidades operativas añadidas recientemente (`git-worktree`, `debugging`, `pull-request`). Sin embargo:
1. `skills/AGENTS.md` y el `AGENTS.md` raíz continúan declarando "10 dirs (bootstrap + 9 stages)", omitiendo la existencia y el catálogo de las 3 habilidades de soporte.
2. `using-frame-ship/SKILL.md` no lista sus disparadores en la tabla de enrutamiento (`Route by trigger`).
3. Los contratos de las etapas clave (`propose-changes`, `execute-spec`, `quality-gate`) no tienen formalizadas las referencias cruzadas de entrada/salida para el acople de estas 3 herramientas, lo que genera ambigüedad en los agentes sobre cuándo y cómo utilizarlas.

## Desired Outcome

Un sistema unificado y explícito donde:
1. Las 3 habilidades estén formalmente catalogadas como **Supporting Skills transversales**.
2. La tabla de enrutamiento en `using-frame-ship` y `skills/AGENTS.md` indique con precisión sus disparadores operativos.
3. Los contratos de cadena en las etapas correspondientes señalen los acoples oficiales sin alterar la rigidez del pipeline troncal.

## Scope

### In Scope

- [engineering] Actualizar `skills/AGENTS.md` reflejando el total de 13 directorios (10 troncales + 3 supporting) y añadiendo la tabla/sección canónica de Supporting Skills.
- [engineering] Actualizar `skills/using-frame-ship/SKILL.md` (y su checklist si aplica) para incluir los triggers de `debugging`, `git-worktree` y `pull-request` en el proceso de enrutamiento.
- [engineering] Conectar los contratos de entrada/salida en:
  - `skills/propose-changes/SKILL.md`: recepción formal de handoffs de RCA desde `debugging`.
  - `skills/execute-spec/SKILL.md`: activación de `git-worktree` en modo `multi-subagents` y paso hacia `pull-request`.
  - `skills/quality-gate/SKILL.md`: reconocimiento del PR estructurado por `pull-request` como insumo auditable del gate.
- [engineering] Actualizar `AGENTS.md` raíz en la descripción de estructura para mantener alineación del conteo y roles.

### Out of Scope

- Modificar la lógica interna o el código de `.opencode/plugins/frame-ship.ts`.
- Crear nuevas habilidades o renombrar las existentes.
- Añadir etapas lineales obligatorias que rompan la secuencia de 9 etapas troncales.

## Stakeholders

| Role | Agent | Involvement |
|------|-------|-------------|
| Sponsor | orchestrator | Decisión y aprobación del brief |
| Owner | engineering owner | Definición técnica y actualización de contratos |
| Touched | security owner | Validación de que las reglas de masking en `debugging` y PR budget permanezcan intactas |

## Constraints

- Budget: Cero dependencias externas adicionales.
- Timeline: Implementación inmediata en un solo ciclo de SPEC (`single mode`).
- Consistency: Respetar la regla de oro: `Frontmatter exacto (name/description)`, cita de credo en cada SKILL, y formato de contratos `Purpose / Chain Contract / 2b Role Binding / Process / Won't do / References`.

## Open Questions

- Ninguna. Alcance y modo congelados con el usuario.
