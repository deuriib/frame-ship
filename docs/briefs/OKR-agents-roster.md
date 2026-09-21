# OKRs: Canonical Agents Roster in /agents (Unified Domain Specialists)

**Period:** Q3 2026
**Owner:** orchestrator

## Objective 1: Establecer la arquitectura canónica, unificada y versionada en `/agents`

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-1.1 | 0 agentes locales en `/agents` | 100% de los roles núcleo definidos (1 Orchestrator + 8 Owners + 8 Especialistas Fused + Revisores Metodológicos) | Conteo de archivos `.md` validados en `/agents` |
| KR-1.2 | Roles de craft hiper-fragmentados (70+ micro-agentes) | 8 Especialistas de Dominio integrales (1 por dominio) consolidando el espectro de craft | 100% de cobertura de capacidades previas sin duplicidad de roles |

## Objective 2: Garantizar Mínimo Privilegio en herramientas y trazabilidad de guardrails

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-2.1 | Sin control explícito de herramientas por rol | 100% de agentes con `tools:` explícito en frontmatter y directivas según su nivel jerárquico | Cero herramientas de escritura/bash en roles de liderazgo y revisión |
| KR-2.2 | Guardrails globales sin especialización contextual | 100% de los agentes con sus secciones correspondientes de `rules/frame-ship.md` inyectadas | Trazabilidad completa guardrail-a-rol documentada |
