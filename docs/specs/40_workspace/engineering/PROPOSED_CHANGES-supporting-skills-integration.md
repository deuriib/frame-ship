# Proposed Changes: Supporting Skills Workflow Integration

**Spec Reference:** docs/specs/20_backlog/SPEC-supporting-skills-integration.md
**REQ Index:** docs/specs/15_requirements/REQ-supporting-skills-integration.md
**Agent:** engineering specialist
**Date:** 2026-09-16
**Execution_Mode:** single
**Domains-Touched:** [engineering]

## Summary

Formalizar la integración de las 3 supporting skills (`git-worktree`, `debugging`, `pull-request`) en la documentación y contratos del sistema Frame→Ship. Esto actualiza el recuento total a 13 directorios de habilidades en `skills/AGENTS.md` y `AGENTS.md` raíz, incorpora sus disparadores de activación en `skills/using-frame-ship/SKILL.md`, y explicita las rutas condicionales de entrada/salida (`Previous`, `Next`, `Supporting`) en los Chain Contracts de `propose-changes`, `execute-spec` y `quality-gate`.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `skills/AGENTS.md` | file-modify | Actualizar recuento a 13 dirs (bootstrap + 9 stages + 3 supporting) y agregar tabla canónica de Supporting Skills (Triggers, Entradas, Salidas y Acoples). |
| `AGENTS.md` | file-modify | Actualizar recuento de habilidades a 13 directorios y clarificar clasificación entre etapas troncales y supporting skills. |
| `skills/using-frame-ship/SKILL.md` | file-modify | Incorporar los disparadores de `debugging`, `git-worktree` y `pull-request` en `§3 Process (2. Route by trigger)`. |
| `skills/propose-changes/SKILL.md` | file-modify | Actualizar `§2 Chain Contract` con `Previous: frame-ship:translate-to-spec \| (optional defect triage) frame-ship:debugging`. |
| `skills/execute-spec/SKILL.md` | file-modify | Actualizar `§2 Chain Contract` con `Supporting: (optional / multi-subagents) frame-ship:git-worktree` y `Next: frame-ship:quality-gate \| (optional before review) frame-ship:pull-request`. |
| `skills/quality-gate/SKILL.md` | file-modify | Actualizar `§2 Chain Contract` con `Previous: frame-ship:execute-spec \| (optional branch PR) frame-ship:pull-request` y loop de fallo `(on failure/bug) frame-ship:debugging → frame-ship:propose-changes`. |

## Detailed Modifications Planned

### 1. `skills/AGENTS.md`
- Actualizar `## OVERVIEW`: "13 dirs (bootstrap `using-frame-ship` + 9 stages + 3 supporting skills): process source of truth."
- Añadir sección `## SUPPORTING SKILLS (transversal / opt-in)`:
  - `debugging`: Defect investigation pre-proposal / pre-execute. Output: RCA Fases 1-4 + failing reproduction test. Acople: handoff hacia `propose-changes`.
  - `git-worktree`: Repo-local worktrees for max 2 parallel SPEC lanes on win32/pwsh. Output: `.worktrees/<spec-id>`. Acople: supporting en `execute-spec`.
  - `pull-request`: Small traceable PRs (≤400 lines) and branch discipline. Output: PR review-ready. Acople: previo a `quality-gate`.

### 2. `AGENTS.md` (raíz)
- En `## OVERVIEW`: "frame-ship: local opencode plugin + 9-skill Frame→Ship chain (+ bootstrap + 3 supporting skills)."
- En `## STRUCTURE`: "skills/<stage>/SKILL.md + references/*.md  # 13 dirs (bootstrap + 9 stages + 3 supporting)..."

### 3. `skills/using-frame-ship/SKILL.md`
- En `§3 Process`, punto 2:
  - `defect investigation / failed test / unexpected behavior → frame-ship:debugging`
  - `parallel execution lanes setup (multi-subagents) → frame-ship:git-worktree`
  - `prepare branch / open PR / ready for review → frame-ship:pull-request`

### 4. `skills/propose-changes/SKILL.md`
- En `§2 Chain Contract`:
  - `Previous: frame-ship:translate-to-spec | (optional defect triage) frame-ship:debugging`

### 5. `skills/execute-spec/SKILL.md`
- En `§2 Chain Contract`:
  - `Previous: frame-ship:propose-changes (+ frame-ship:review-security / frame-ship:review-architecture approvals)`
  - `Supporting: (optional / multi-subagents) frame-ship:git-worktree`
  - `Next: frame-ship:quality-gate | (optional before review) frame-ship:pull-request`

### 6. `skills/quality-gate/SKILL.md`
- En `§2 Chain Contract`:
  - `Previous: frame-ship:execute-spec | (optional branch PR) frame-ship:pull-request`
  - `Next: frame-ship:verify-handoff (only on OPEN gate) | (on failure/bug) frame-ship:debugging → frame-ship:propose-changes`

## Risk Assessment & Blast Radius

- **Systems**: Documentación y contratos de habilidades en markdown. Cero impacto en el runtime ejecutable de TypeScript (`.opencode/plugins/frame-ship.ts`).
- **Teams / Workflow**: Impacto positivo; elimina la ambigüedad en los agentes sobre cuándo activar `git-worktree`, `debugging` y `pull-request`.
- **Regulators / Customers / Revenue**: N/A (herramientas internas de desarrollo).
- **Rollback Plan**: Revertir el commit de `execute-spec` restaura los contratos anteriores sin efectos secundarios.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Documentar solo en `skills/AGENTS.md` sin tocar los `SKILL.md` de las etapas | Rechazado: los agentes en ejecución no consultan el AGENTS.md central para su salto de etapa, solo consultan el `## 2. Chain Contract` de la etapa activa. |
| Forzar las 3 herramientas como etapas obligatorias lineales | Rechazado: agrega fricción innecesaria (violación YAGNI) a flujos atómicos simples. |

## Approval Required From

- [x] Owning domain owner: engineering owner (diseño validado)
- [ ] Orchestrator / User (aprobación final requerida antes de entrar a `execute-spec`)

> **Rule:** No repository file modifications during proposal phase. All files remain untouched until approval.
