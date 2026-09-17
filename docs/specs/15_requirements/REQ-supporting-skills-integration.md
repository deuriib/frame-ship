# Requirements Index: Integración de Supporting Skills al Workflow

**Owner:** engineering owner
**Brief Reference:** BRIEF-integrate-supporting-skills
**Domains-Touched:** [engineering]

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-SSI-001 | Actualizar `skills/AGENTS.md` a 13 dirs y catálogo de Supporting Skills | P0 | BRIEF-integrate-supporting-skills | SPEC-supporting-skills-integration | engineering | review |
| REQ-SSI-002 | Actualizar `AGENTS.md` raíz a 13 dirs y orientación de Supporting Skills | P0 | BRIEF-integrate-supporting-skills | SPEC-supporting-skills-integration | engineering | review |
| REQ-SSI-003 | Enrutar por disparador `debugging`, `git-worktree` y `pull-request` en `using-frame-ship/SKILL.md` | P0 | BRIEF-integrate-supporting-skills | SPEC-supporting-skills-integration | engineering | review |
| REQ-SSI-004 | Conectar `Previous` condicional desde `debugging` en `propose-changes/SKILL.md` | P0 | BRIEF-integrate-supporting-skills | SPEC-supporting-skills-integration | engineering | review |
| REQ-SSI-005 | Conectar `Supporting` (`git-worktree`) y `Next` (`pull-request`) en `execute-spec/SKILL.md` | P0 | BRIEF-integrate-supporting-skills | SPEC-supporting-skills-integration | engineering | review |
| REQ-SSI-006 | Conectar `Previous` (`pull-request`) y retorno por fallo (`debugging`) en `quality-gate/SKILL.md` | P0 | BRIEF-integrate-supporting-skills | SPEC-supporting-skills-integration | engineering | review |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-SSI-001 | Respetar frontmatter exacto (`name`, `description`) y creed en cada SKILL modificado | Maintainability | 100% compliance |
| REQ-NF-SSI-002 | Mantener la cadena troncal intacta sin introducir pasos bloqueantes forzados | Usability | Inalterabilidad del pipeline |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| engineering | Coherencia arquitectónica de habilidades y contratos de workflow | engineering owner |
