# Spec: Multi-subagents por defecto — proceso natural (people)

**ID:** SPEC-multi-default-people
**Owner:** santana (people owner — agent-rules; wording único + people-reviewer gate)
**Domains-Touched:** [people]
**Brief Reference:** docs/briefs/BRIEF-multi-default.md#OKRs + docs/briefs/OKR-multi-default.md
**Status:** implemented
**Priority:** P0 (bloquea wording uniforme; open question #2 del BRIEF owned by santana)
**Execution_Mode:** multi-subagents (inherited from BRIEF-multi-default §Execution_Mode, frozen at frame-intent; not overridden)

## 1. Context

El chain mantiene doble-vía `single | multi-subagents` en `using-frame-ship §3`, `frame-intent §3`, `translate-to-spec`, `execute-spec`, `quality-gate`, `skills/AGENTS.md` y templates. Con harnesses que despachan en paralelo sin costo, la rama `single` es residuo conceptual: dos mental models, dos gates, paquetes con bifurcación. El BRIEF pide un solo camino metodológico `multi-subagents` como proceso natural; lo trivial vive fuera de la metodología en fast-path CEO (<15 líneas, reversible, checkpoint-only — potestad del CEO, no rama del chain).

Vasquez (engineering) corre en paralelo la mecánica skills/templates/ADR (BRIEF §Scope [engineering]); este SPEC posee el **wording de reglas de agentes en superficies people**: `using-frame-ship/SKILL.md §3` + `references/bootstrap-checklist.md`, `frame-intent/SKILL.md §3` + `references/product-brief.md`, contrato uniforme multi-único + degradación secuencial, y criterios del people-reviewer. Sin implementación en este stage (eso es propose-changes/execute-spec tras aprobación).

Role binding: `skills/AGENTS.md` dominio #6 people → people owner; `skills/translate-to-spec/SKILL.md §2b` bound to owning domain owners; `skills/using-frame-ship/SKILL.md §3.0.3` domain role understood before acting.

## 2. Requirements

### Functional

- REQ-F-001: Reescribir `skills/using-frame-ship/SKILL.md §3` a multi-único — eliminar rama `single` como modo metodológico; `multi-subagents` sin apellido "default". [people]
- REQ-F-002: Reescribir `skills/using-frame-ship/references/bootstrap-checklist.md` — línea `Execution mode declared` → contrato multi-único + nota de degradación secuencial; checklist session-start y post-compaction sin bifurcación. [people]
- REQ-F-003: Reescribir `skills/frame-intent/SKILL.md §3 paso 3` — `Ask execution mode once (single|multi)` → congelar multi-único sin pregunta; ratchet y clasificación intactos. [people]
- REQ-F-004: Reescribir `skills/frame-intent/references/product-brief.md` línea `Execution_Mode` — `single | multi-subagents (chosen at frame-intent…)` → multi-único frozen con mención fast-path CEO fuera de metodología. [people]
- REQ-F-005: Definir y aplicar contrato uniforme multi-único W-MULTI idéntico en las 4 superficies people (contratos §4). [people]
- REQ-F-006: Definir y aplicar wording de degradación secuencial W-SEQ idéntico en `using-frame-ship §3` + `bootstrap-checklist` — harness sin `task`: secuencial mismo hilo, mismo contrato, sin min-gate. [people]
- REQ-F-007: Actualizar criterios people-reviewer en `skills/quality-gate/references/domains/people-review.md` — verificar wording uniforme + impacto de cambio de regla en todos los roles + gate único full-wave (sin min-gate). [people]

### Non-Functional

- REQ-NF-001 (Zero residue, KR-1.1): `single` como modo metodológico = 0 menciones vivas en las 4 superficies people + `people-review.md`; fast-path CEO mencionado solo como fuera-de-metodología. [people]
- REQ-NF-002 (Consistency, KR-1.2): W-MULTI y W-SEQ leen byte-idénticos en todas las superficies people donde aparecen (diff = 0). [people]
- REQ-NF-003 (History intact): cero ediciones en `docs/specs/50_archive/`, ADRs viejos, BRIEFs pasados. [people]
- REQ-NF-004 (Privacy, Ley 172-13): cambio solo wording — cero PII/secretos/tokens/credenciales en spec, propuestas y evidencias; todo export enmascarado. [people]
- REQ-NF-005 (Docs-only, reversible): diff set people = 5 archivos (2 SKILL §3 + 2 references + 1 people-review); sin runtime, sin catálogo 8 dominios, sin deps; revertible por commit. [people]
- REQ-NF-006 (Trace): cada REQ-F/NF traza `REQ-ID → AC → PROPOSED_CHANGES.md → gate verdict` sin saltos. [people]

## 3. Acceptance Criteria

- [x] AC-REQ-F-001: `using-frame-ship/SKILL.md §3` no contiene rama `single:` como modo; contiene W-MULTI + W-SEQ verbatim; `grep -n "single" skills/using-frame-ship/SKILL.md` = 0 fuera de nota histórica/fast-path si la hay.
- [x] AC-REQ-F-002: `bootstrap-checklist.md` línea de modo contiene W-MULTI + puntero W-SEQ; `grep -n "single.*direct.*no task" skills/using-frame-ship/references/bootstrap-checklist.md` = 0.
- [x] AC-REQ-F-003: `frame-intent/SKILL.md §3 paso 3` no pregunta modo; contiene "congela multi-único" + W-MULTI; `grep -n "Ask execution mode once" skills/frame-intent/SKILL.md` = 0.
- [x] AC-REQ-F-004: `product-brief.md` línea `Execution_Mode` = `multi-subagents (frozen at frame-intent; trivial <15 líneas va por fast-path CEO checkpoint-only, fuera de metodología)`; `grep -n "single | multi" skills/frame-intent/references/product-brief.md` = 0.
- [x] AC-REQ-F-005: extracción de W-MULTI en 4 superficies + people-review → `diff` = 0 bytes.
- [x] AC-REQ-F-006: extracción de W-SEQ en `using-frame-ship §3` + `bootstrap-checklist` → `diff` = 0 bytes; contiene "mismo hilo, mismo contrato".
- [x] AC-REQ-F-007: `people-review.md` contiene checklist "wording uniforme multi-único verificado" + "sin vía min-gate" + "cambio de regla comunicado"; verdict rationale exige grep-evidencia.
- [x] AC-REQ-NF-001: `grep -rn "\bsingle\b" skills/using-frame-ship/ skills/frame-intent/SKILL.md skills/frame-intent/references/product-brief.md skills/quality-gate/references/domains/people-review.md` = 0 salvo línea fast-path permitida (`fast-path CEO` co-ocurre en la misma línea).
- [x] AC-REQ-NF-002: diff cruzado W-MULTI/W-SEQ = 0 (evidencia: extracto diff en PROPOSED_CHANGES.md).
- [x] AC-REQ-NF-003: `git diff --name-only` no lista `50_archive/` ni `docs/briefs/BRIEF-*.md` pasados.
- [x] AC-REQ-NF-004: revisión estática del diff: 0 patrones credencial/secreto/PII; attestation barrera en gate.
- [x] AC-REQ-NF-005: `git diff --name-only` lane people = 5 archivos listados en §6 DEP-1; sin `*.ts`, sin `package.json`, sin frontmatter extra.
- [x] AC-REQ-NF-006: tabla §7 completa 13/13 filas sin huecos.

## 4. Contracts & Interfaces

Wording canónico people (strings exactas; open question #2 del BRIEF resuelto aquí para lane people):

### W-MULTI — contrato uniforme multi-único (4 superficies people + people-review)

```text
Execution is multi-subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.
```

### W-SEQ — degradación secuencial, mismo contrato (using-frame-ship §3 + bootstrap-checklist)

```text
Sequential degradation, same contract: harnesses without task run lanes sequentially in the same thread — same packet, same reviewers, same full-wave gate. No min-gate, no silent downgrade.
```

### W-BRIEF-MODE — línea Execution_Mode en product-brief.md (reemplaza `single | multi-subagents…`)

```text
**Execution_Mode:** multi-subagents (frozen at frame-intent; trivial <15 lines goes by CEO fast-path checkpoint-only, outside methodology)
```

### W-INTENT-STEP3 — reemplazo de `Ask execution mode once…` en frame-intent §3 paso 3

```text
Freeze execution as multi-subagents only (no mode question): orchestrator dispatches, owners do the work or brief back; sequential same-thread degradation where the harness lacks task. Trivial <15-line reversible work is CEO fast-path, outside methodology.
```

### W-PPL-GATE — inserts en people-review.md Checklist (añaden, no sustituyen higiene existente)

```text
- [ ] Uniform multi-only wording verified (W-MULTI + W-SEQ grep evidence attached)
- [ ] No min-gate path invoked; full-wave + refuter before qa
- [ ] Rule-change impact communicated (all roles affected by single-process wording)
```

Non-code contract: targets = 5 documentos listados; sign-off = people-reviewer + barrera (wording review). Sin forzar forma API.

## 5. Out of Scope

- Mecánica engineering (`translate-to-spec`, `execute-spec`, `quality-gate` SKILLs + `spec-template.md`, `proposal-template.md`, `gate-report.md`, `dod-checklist.md`, `git-worktree`, `skills/AGENTS.md`, `docs/AGENTS.md`, ADR en `10_design/`) → vasquez lane.
- Historia (`50_archive/`, ADRs viejos, BRIEFs pasados) — intacta.
- Catálogo 8 dominios, orden de stages, loader `name/description`, max-2 lanes, llaves, deploys, permisos, deps del plugin, runtime.
- Fast-path CEO (<15 líneas) como potestad — no se diseña ni se toca.
- Cualquier edición de archivos — eso es propose-changes/execute-spec tras aprobación.

## 6. Dependencies

- DEP-1 (lane split): vasquez engineering SPEC — superficies `translate/execute/quality-gate/git-worktree/AGENTS/ADR`; wording W-MULTI/W-SEQ debe leer idéntico cross-lane (diff 0 en contratos compartidos); este SPEC fija la fuente people.
- DEP-2 (gate): barrera wording review (sin auth/data/API — solo revisión de texto); people-reviewer corre el gate people.
- DEP-3 (decisión): montilla (CEO) — waiver solo si algún SPEC necesita override de `execution_mode`; fast-path (<15 líneas) es potestad CEO fuera de metodología.
- DEP-4 (pregunta abierta BRIEF): slug ADR (completar vs nuevo) → vasquez; wording uniforme de degradación → resuelto aquí como W-SEQ (pendiente ratificación gate).

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-F-001 | AC-REQ-F-001 | PROPOSED_CHANGES.md §W-MULTI/W-SEQ en using-frame-ship §3 | grep using-frame-ship/SKILL.md |
| REQ-F-002 | AC-REQ-F-002 | PROPOSED_CHANGES.md §bootstrap-checklist | grep bootstrap-checklist.md |
| REQ-F-003 | AC-REQ-F-003 | PROPOSED_CHANGES.md §frame-intent §3 | grep frame-intent/SKILL.md |
| REQ-F-004 | AC-REQ-F-004 | PROPOSED_CHANGES.md §W-BRIEF-MODE | grep product-brief.md |
| REQ-F-005 | AC-REQ-F-005 | PROPOSED_CHANGES.md §W-MULTI | diff 4 superficies = 0 |
| REQ-F-006 | AC-REQ-F-006 | PROPOSED_CHANGES.md §W-SEQ | diff 2 superficies = 0 |
| REQ-F-007 | AC-REQ-F-007 | PROPOSED_CHANGES.md §W-PPL-GATE | review people-review.md |
| REQ-NF-001 | AC-REQ-NF-001 | PROPOSED_CHANGES.md | grep single = 0 |
| REQ-NF-002 | AC-REQ-NF-002 | PROPOSED_CHANGES.md | diff = 0 |
| REQ-NF-003 | AC-REQ-NF-003 | — (freeze) | git diff --name-only |
| REQ-NF-004 | AC-REQ-NF-004 | PROPOSED_CHANGES.md | attestation barrera |
| REQ-NF-005 | AC-REQ-NF-005 | PROPOSED_CHANGES.md | git diff --name-only 5 files |
| REQ-NF-006 | AC-REQ-NF-006 | GATE_REPORT | verdict trace 13/13 |

Packet: SPEC:docs/specs/20_backlog/SPEC-multi-default-people.md#REQ-F-001..007+REQ-NF-001..006 / HARD:execution_mode=multi-subagents+docs-only,reversible,Ley172-13-masked,history-intact,max-2-lanes / GATE:none-yet / DOMAINS:[people] (engineering lane parallel via vasquez).
