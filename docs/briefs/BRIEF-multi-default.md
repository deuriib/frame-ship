# Product Brief: Multi-subagents por defecto — proceso natural

**ID:** BRIEF-multi-default
**Initiator:** montilla (CEO)
**Date:** 2026-09-20
**Status:** draft
**Execution_Mode:** multi-subagents (frozen at frame-intent; all specs follow unless overridden per SPEC with CEO waiver)
**Domains-Touched:** [engineering, people]
**Classification:** architectural-initiative (full BRIEF file — restructures orchestration contract across skills)
**Framings-Considered:** [1) remoción total — recomendada: borrar rama `single`, un solo camino multi; mata si aparece caso mínimo donde single gane sin cobertura fast-path — acordado: trivial <15 líneas va por fast-path CEO checkpoint-only, fuera de metodología. 2) default suave — multi default + single como waiver; descartada: deja doble-vía viva. 3) solo re-etiquetar — descartada: no cumple pedido. YAGNI cut: sin tocar runtime, catálogo 8 dominios, ni deps.]
**Approval:** [gate type: file-approval — pending user approval 2026-09-20]
**Grill:** completed 5/5 (architectural cap 4 core + 1 frontier); no exit; Ley 172-13 masked

## Problem Statement

El chain mantiene doble-vía `single | multi-subagents` en `using-frame-ship`, `frame-intent`, `translate-to-spec`, `execute-spec`, `quality-gate`, `AGENTS.md` y templates (brief/spec/proposal/gate/dod). Con harnesses actuales que despachan en paralelo sin costo, la rama `single` es residuo conceptual: dos mental models, dos gates, paquetes con bifurcación. Lo natural es un solo proceso multi.

## Desired Outcome

Un solo camino metodológico `multi-subagents` como proceso natural: orquestador despacha, dueños hacen el trabajo o devuelven brief, paquetes por referencia, full-wave siempre. Lo trivial vive fuera de la metodología, en fast-path CEO (potestad del CEO, no rama del chain).

1. Cero mención viva de rama `single` como modo metodológico; `multi-subagents` sin apellido "default".
2. Degradación definida para harnesses sin `task`: secuencial mismo hilo, mismo contrato.
3. Gate único: full-wave + refuter antes de qa; sin min-gate.
4. Historia intacta; vivo grep-verificado.

## Scope

### In Scope

- Reescribir modos en `skills/using-frame-ship/SKILL.md §3` + `references/bootstrap-checklist.md` [people, engineering]
- Reescribir `skills/frame-intent/SKILL.md §3` (preguntar modo → congelar multi-único) + `references/product-brief.md` [people]
- Reescribir `skills/translate-to-spec`, `execute-spec`, `quality-gate` (min-gate fuera, full-wave único) + `references/spec-template.md`, `proposal-template.md`, `gate-report.md`, `dod-checklist.md` [engineering]
- Ajustar `skills/git-worktree` (lanes multi como norma) + `skills/AGENTS.md`, `docs/AGENTS.md` [engineering]
- ADR de la decisión en `docs/specs/10_design/` [engineering]

### Out of Scope

- Historia (`50_archive/`, ADRs viejos, BRIEFs pasados) — intacta
- Catálogo 8 dominios, orden de stages, loader `name/description`
- Fast-path CEO (<15 líneas, reversible, checkpoint-only) — potestad CEO, no se toca
- Max-2 lanes, llaves, deploys, permisos, deps del plugin

## Stakeholders

| Role | Agent | Involvement |
|------|-------|-------------|
| Sponsor | montilla | Decision authority + multi-domain gate synthesis |
| Owner | santana (people) | Agent-rules: wording único, people-reviewer gate |
| Owner | vasquez (engineering) | Mecánica skills/templates/ADR, arch verdicts |
| Touched | barrera (security) | Wording review, sin auth/data/API |

## Constraints

- Budget: none (docs/config-only)
- Timeline: single session per SPEC, reversible (git revert por commit)
- Regulatory: Ley 172-13 minimización — sin PII/secretos en skills ni evidencias
- Brand/GTM: N/A
- People/change: santana — cambio de regla afecta todos los roles; wording uniforme

## Open Questions

- [ ] Slug ADR: completar vs nuevo (owner: vasquez)
- [ ] Wording uniforme exacto de "degradación secuencial mismo contrato" (owner: santana)

## References

- `docs/briefs/OKR-multi-default.md` — OKRs for this initiative
