# Spec: Integración de Supporting Skills al Workflow

**ID:** SPEC-supporting-skills-integration
**Owner:** engineering owner
**Domains-Touched:** [engineering]
**Brief Reference:** BRIEF-integrate-supporting-skills
**Status:** approved
**Priority:** P0
**Execution_Mode:** single

## 1. Context

El repositorio cuenta con 13 carpetas en `skills/`, compuestas por la cadena troncal (bootstrap `using-frame-ship` + 9 etapas) y 3 habilidades de soporte operativo transversal (`git-worktree`, `debugging`, `pull-request`). Actualmente, los archivos de gobernanza (`skills/AGENTS.md` y `AGENTS.md`) mantienen la cifra desactualizada de "10 dirs" y no catalogan las habilidades de soporte. Asimismo, `using-frame-ship/SKILL.md` carece de disparadores para enrutarlas, y las etapas padre (`propose-changes`, `execute-spec`, `quality-gate`) omiten en sus Chain Contracts los puntos de entrada/salida opcionales para acoplar estas herramientas. Esta especificación formaliza las 3 supporting skills en la documentación y explicita las rutas condicionales `Previous`, `Next` y `Supporting` en los contratos.

## 2. Requirements

- REQ-SSI-001: Actualizar `skills/AGENTS.md` reflejando 13 directorios en total (bootstrap + 9 etapas troncales + 3 supporting skills) e incorporar la tabla canónica de Supporting Skills con Trigger, Habilidad, Salida y Punto de Acople.
- REQ-SSI-002: Actualizar `AGENTS.md` (raíz) reflejando la estructura de 13 directorios de habilidades y sus categorías.
- REQ-SSI-003: Actualizar `skills/using-frame-ship/SKILL.md` incorporando en `§3 Process (2. Route by trigger)` las reglas de activación de `debugging`, `git-worktree` y `pull-request`.
- REQ-SSI-004: Actualizar `skills/propose-changes/SKILL.md` en `§2 Chain Contract` explicitando la procedencia opcional desde triage de defectos: `Previous: frame-ship:translate-to-spec | (optional defect triage) frame-ship:debugging`.
- REQ-SSI-005: Actualizar `skills/execute-spec/SKILL.md` en `§2 Chain Contract` explicitando el entorno de soporte paralelo y la salida opcional hacia PR: `Supporting: (optional / multi-subagents) frame-ship:git-worktree` y `Next: frame-ship:quality-gate | (optional before review) frame-ship:pull-request`.
- REQ-SSI-006: Actualizar `skills/quality-gate/SKILL.md` en `§2 Chain Contract` explicitando la entrada opcional desde PR y el loop de retorno ante fallos/bugs hacia debugging: `Previous: frame-ship:execute-spec | (optional branch PR) frame-ship:pull-request` y `Next: frame-ship:verify-handoff (only on OPEN gate) | (on failure/bug) frame-ship:debugging → frame-ship:propose-changes`.

## 3. Acceptance Criteria

- [ ] AC-001: `skills/AGENTS.md` contiene la mención explícita a 13 directorios y la tabla de las 3 supporting skills.
- [ ] AC-002: `AGENTS.md` raíz documenta 13 dirs y lista las supporting skills en la tabla de orientación.
- [ ] AC-003: `skills/using-frame-ship/SKILL.md` enruta por disparador a `debugging`, `git-worktree` y `pull-request`.
- [ ] AC-004: `skills/propose-changes/SKILL.md` contiene `frame-ship:debugging` en `Previous`.
- [ ] AC-005: `skills/execute-spec/SKILL.md` contiene `Supporting: ... git-worktree` y `Next: ... pull-request`.
- [ ] AC-006: `skills/quality-gate/SKILL.md` contiene `Previous: ... pull-request` y ruta de fallo hacia `debugging`.

## 4. Contracts & Interfaces

### Chain Contract Updates
1. `propose-changes/SKILL.md`:
   ```markdown
   ## 2. Chain Contract

   - Previous: frame-ship:translate-to-spec | (optional defect triage) frame-ship:debugging
   - Next: frame-ship:review-security / frame-ship:review-architecture (as required), then frame-ship:execute-spec
   ```
2. `execute-spec/SKILL.md`:
   ```markdown
   ## 2. Chain Contract

   - Previous: frame-ship:propose-changes (+ frame-ship:review-security / frame-ship:review-architecture approvals)
   - Supporting: (optional / multi-subagents) frame-ship:git-worktree
   - Next: frame-ship:quality-gate | (optional before review) frame-ship:pull-request
   ```
3. `quality-gate/SKILL.md`:
   ```markdown
   ## 2. Chain Contract

   - Previous: frame-ship:execute-spec | (optional branch PR) frame-ship:pull-request
   - Next: frame-ship:verify-handoff (only on OPEN gate) | (on failure/bug) frame-ship:debugging → frame-ship:propose-changes
   ```

## 5. Out of Scope

- Cambios de lógica en runtime `.opencode/plugins/frame-ship.ts`.
- Alterar la secuencia lineal de las 9 etapas maestras ni añadir compuertas de paso obligatorias que rompan iniciativas directas (`single`).

## 6. Dependencies

- Aprobación de `BRIEF-integrate-supporting-skills`.
- Mantenimiento estricto del formato canónico de frontmatter (`name`, `description` únicamente) y creed en cada SKILL.

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-SSI-001 | AC-001 | PROPOSED_CHANGES.md | git diff skills/AGENTS.md |
| REQ-SSI-002 | AC-002 | PROPOSED_CHANGES.md | git diff AGENTS.md |
| REQ-SSI-003 | AC-003 | PROPOSED_CHANGES.md | git diff skills/using-frame-ship/SKILL.md |
| REQ-SSI-004 | AC-004 | PROPOSED_CHANGES.md | git diff skills/propose-changes/SKILL.md |
| REQ-SSI-005 | AC-005 | PROPOSED_CHANGES.md | git diff skills/execute-spec/SKILL.md |
| REQ-SSI-006 | AC-006 | PROPOSED_CHANGES.md | git diff skills/quality-gate/SKILL.md |
