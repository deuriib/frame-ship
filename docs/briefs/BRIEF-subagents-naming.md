# Product Brief: Estandarización de Nomenclatura — "subagents"

**ID:** BRIEF-subagents-naming
**Initiator:** orchestrator
**Date:** 2026-09-20
**Status:** approved
**Execution_Mode:** subagents (frozen at frame-intent; trivial <15 lines goes by CEO fast-path checkpoint-only, outside methodology)
**Domains-Touched:** [engineering, people]
**Classification:** architectural-initiative (full BRIEF file — standardizes foundational orchestration nomenclature and contract strings across chain skills and templates)
**Framings-Considered:** [1) Estandarización canónica canjeando activos (Recomendada - Opción A): Renombrar `multi-subagents` a `subagents` en todos los skills vivos, templates activos y reglas de orquestación, preservando la inmutabilidad histórica de gates y briefs pasados. 2) Doble soporte / alias suave: Permitir ambos términos indistintamente; descartada porque reintroduce ambigüedad y diluye el principio de 'defaults over hedging'. 3) Restructuración operacional profunda: Reorganizar el dispatch y mecánicas de harnesses; descartada por YAGNI (mezcla nomenclatura con cambio de comportamiento).]
**Approval:** [gate type: file-approval — approved by user 2026-09-20]

## Problem Statement

Tras la unificación del Frame→Ship chain en el proceso natural de despacho distribuido (ADR-008), el término compuesto `multi-subagents` quedó como una denominación heredada de la antigua bifurcación `single | multi-subagents`. 

En la práctica actual, `multi-subagents` presenta redundancia léxica (el plural "subagents" ya denota multiplicidad), se desvía del estándar de la industria (OpenCode, Antigravity y LLM harness frameworks emplean universalmente `subagents`), y añade fricción innecesaria en los contratos normativos (`W-MULTI`), directivas de ejecución (`Execution_Mode:`) y firmas de paquetes (`HARD:multi-subagents+...`). Simplificar el término a `subagents` clarifica la intención comunicativa y proyecta un diseño maduro y directo.

## Desired Outcome

Establecer `subagents` como la única denominación canónica para el modo de ejecución metodológico en todo el framework:

1. **Claridad conceptual:** Sustituir `multi-subagents` por `subagents` en todas las referencias normativas vivas.
2. **Contrato canónico actualizado (`W-SUBAGENTS`):**
   > *"Execution is subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch."*
3. **Paquetes limpios:** Estandarizar la firma en `HARD:subagents+<constraints>`.
4. **Integridad histórica (Opción A):** La historia previa (`docs/specs/40_workspace/`, `CHANGELOG.md` pasado, briefs y ADRs archivados) permanece intacta como registro inmutable; los skills y templates activos quedan 100% consistentes con `subagents`.

## Scope

### In Scope

- **Skills vivas (`skills/*/SKILL.md`):** Actualizar `using-frame-ship`, `frame-intent`, `translate-to-spec`, `execute-spec`, `quality-gate`, `git-worktree` [engineering, people].
- **Templates de referencia (`skills/*/references/*`):** Actualizar `bootstrap-checklist.md`, `product-brief.md`, `spec-template.md`, `proposal-template.md`, `gate-report.md`, `dod-checklist.md` [engineering].
- **Catálogo y reglas transversales:** Actualizar `skills/AGENTS.md`, `docs/AGENTS.md`, `rules/frame-ship.md` y `.agents/rules/frame-ship.md` [people, engineering].
- **Decisión de arquitectura:** Registrar `docs/specs/12_adr/ADR-009-subagents-naming.md` documentando la simplificación léxica de `multi-subagents` a `subagents` [engineering].

### Out of Scope

- Artefactos históricos en `docs/specs/40_workspace/` (evaluaciones de gates previas), `docs/briefs/` históricos, y notas de release previas (preservación de auditoría histórica).
- Runtime de plugins (`.opencode/plugins/` ya opera desacoplado de la cadena léxica).
- Catálogo de 8 dominios, orden de etapas de la cadena Frame→Ship y regla de fast-path CEO (<15 líneas).

## Stakeholders

| Role | Agent | Involvement |
|------|-------|-------------|
| Sponsor | orchestrator / montilla | Autoridad de decisión y aprobación del Brief |
| Owner (Engineering) | vasquez (engineering) | Ejecución de cambios en templates, skills y ADR-009 |
| Owner (People) | santana (people) | Coherencia de tono, reglas de agentes y claridad de comunicación |
| Touched | barrera (security) | Verificación de que ningún invariante de seguridad o manejo de auth es alterado |

## Constraints

- **Budget:** Cero costo (refactor de documentación, contratos y templates).
- **Timeline:** Ejecutable en un único ciclo SPEC bajo `subagents`.
- **Integridad:** Cero regresión en TypeScript (`mise run typecheck`), cero ambigüedad en búsquedas grep en `skills/`.
- **Auditoría:** Los registros históricos completados no se mutan retroactivamente.

## Open Questions

- Ninguna. Alcance congelado bajo Opción A acordada con el usuario.

## References

- `docs/briefs/OKR-subagents-naming.md` — OKRs de la iniciativa
- `docs/specs/12_adr/ADR-008-multi-default.md` — Precedente de consolidación de proceso natural
