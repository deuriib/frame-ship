# Spec: Estandarización de Nomenclatura — "subagents" (people)

**ID:** SPEC-subagents-naming-people  
**Owner:** santana (people owner — agent rules, core onboarding, culture & communication clarity)  
**Domains-Touched:** [people, engineering]  
**Brief Reference:** docs/briefs/BRIEF-subagents-naming.md#OKRs + docs/briefs/OKR-subagents-naming.md  
**Status:** review  
**Priority:** P0 (bloquea la estandarización canónica en reglas de agentes, iniciación y core onboarding)  
**Execution_Mode:** subagents (inherited from BRIEF-subagents-naming §Execution_Mode, frozen at frame-intent; trivial <15 lines goes by CEO fast-path checkpoint-only, outside methodology)  

## 1. Context

Tras la adopción del despacho distribuido como proceso natural del framework (ADR-008), el término compuesto `multi-subagents` permaneció como un resabio léxico de la antigua bifurcación `single | multi-subagents`. Dicha denominación presenta redundancia conceptual (el plural en inglés "subagents" ya denota inequívocamente multiplicidad), desalineación frente a las convenciones estándar de la industria (OpenCode, Antigravity, LLM harness frameworks) y fricción innecesaria en la cognición y onboarding de agentes y colaboradores humanos.

El BRIEF aprobado `BRIEF-subagents-naming` mandata la adopción de `subagents` como la única denominación canónica para el modo de ejecución metodológico en todo el repositorio, preservando la inmutabilidad histórica de auditorías y releases anteriores (Opción A).

Mientras Vasquez (engineering owner) gestiona en paralelo la mecánica de skills de ejecución/gate, templates de ingeniería y el registro de arquitectura `ADR-009` en `docs/specs/12_adr/`, este SPEC norma la **dimensión People**:
1. Reglas de onboarding y bootstrap de agentes en `skills/using-frame-ship/SKILL.md §3` y `references/bootstrap-checklist.md`.
2. Reglas de iniciación estratégica y freeze de modo en `skills/frame-intent/SKILL.md §3` y `references/product-brief.md`.
3. Reglas persistentes de agentes en `rules/frame-ship.md` y `.agents/rules/frame-ship.md`.
4. Contrato normativo uniforme `W-SUBAGENTS` y su verificación en los criterios de calidad de `people-review.md`.

Role binding: `skills/AGENTS.md` catálogo de 8 dominios (dominio #6 People → people owner); `skills/translate-to-spec/SKILL.md §2b` bound to owning domain owners; `skills/using-frame-ship/SKILL.md §3.0.3` domain role understood before acting.

## 2. Requirements

### Functional

- **REQ-F-001 (Core Onboarding & Load Order):** Actualizar `skills/using-frame-ship/SKILL.md §3` para reemplazar toda mención de `multi-subagents` por la designación canónica `subagents` en el orden de carga (paso 0), comprensión de roles (paso 0.3), mapeo de lanes paralelas (paso 2) y reglas duras (paso 3), incorporando la cláusula `W-SUBAGENTS` verbatim. [people]
- **REQ-F-002 (Bootstrap Checklist Onboarding):** Actualizar `skills/using-frame-ship/references/bootstrap-checklist.md` sustituyendo `multi-subagents` por `subagents` en el checklist de comprensión de roles y en la declaración formal de ejecución (`Execution declared`), vinculando `W-SUBAGENTS` y la nota de degradación secuencial `W-SEQ`. [people]
- **REQ-F-003 (Initiation Pre-flight & Freeze):** Actualizar `skills/frame-intent/SKILL.md §3` en el pre-flight hard-stop (paso 0) y en el paso de congelamiento de modo (paso 3) para normar `subagents only` sin pregunta de modo, eliminando menciones de `multi-subagents`. [people]
- **REQ-F-004 (Product Brief Initiation Template):** Actualizar `skills/frame-intent/references/product-brief.md` línea `Execution_Mode:` para reflejar canónicamente `subagents (frozen at frame-intent; trivial <15 lines goes by CEO fast-path checkpoint-only, outside methodology)`. [people]
- **REQ-F-005 (Persistent Chain Rules):** Actualizar `rules/frame-ship.md` para estandarizar la directiva de ejecución persistente como `subagents only` e incorporar la cláusula contractual canónica `W-SUBAGENTS`, garantizando 0 ocurrencias de `multi-subagents`. [people]
- **REQ-F-006 (Antigravity Discovery Mirror):** Asegurar que `.agents/rules/frame-ship.md` exista y se mantenga en sincronización estricta (lockstep mirror) con `rules/frame-ship.md`, declarando `W-SUBAGENTS` y `subagents` de forma idéntica. [people]
- **REQ-F-007 (Canonical Contract String W-SUBAGENTS):** Definir y aplicar la cadena canónica `W-SUBAGENTS` de manera uniforme y exacta en todas las superficies bajo alcance de people (contratos §4). [people]
- **REQ-F-008 (People Gate Review Criteria):** Actualizar los criterios de revisión y checklist del people-reviewer en `skills/quality-gate/references/domains/people-review.md` para verificar la uniformidad de `W-SUBAGENTS`, la ausencia de residuos de `multi-subagents` y la correcta asimilación cultural del cambio de regla por los agentes. [people]

### Non-Functional

- **REQ-NF-001 (Zero Residue - KR-1.1 & KR-1.3):** 0 ocurrencias de `multi-subagents` en las superficies people activas (`skills/using-frame-ship/`, `skills/frame-intent/SKILL.md §3`, `skills/frame-intent/references/product-brief.md`, `rules/frame-ship.md`, `.agents/rules/frame-ship.md`, y `skills/quality-gate/references/domains/people-review.md`). [people]
- **REQ-NF-002 (String Uniformity & Byte Consistency - KR-1.2):** La cláusula `W-SUBAGENTS` debe ser estrictamente idéntica a nivel de bytes (`diff = 0`) en todos los puntos de inserción contractuales en el framework. [people]
- **REQ-NF-003 (Historical Integrity - Opción A):** Cero mutaciones o alteraciones retroactivas en artefactos históricos completados (`docs/specs/40_workspace/`, `docs/specs/50_archive/`, briefs archivados o changelogs pasados). [people]
- **REQ-NF-004 (Privacy & Ethical AI - Ley 172-13):** Todas las especificaciones, propuestas y evidencias mantendrán cero PII, credenciales o secretos; todo log o export de evidencia será enmascarado conforme a la Ley 172-13. [people]
- **REQ-NF-005 (Reversibility & Zero Regressions):** Cambios estrictamente limitados a documentación, contratos normativos y reglas de agentes; 0 alteraciones no autorizadas en TypeScript runtime; `mise run typecheck` debe permanecer limpio. [people]
- **REQ-NF-006 (End-to-End Traceability):** Trazabilidad completa y bidireccional `REQ-ID → AC → PROPOSED_CHANGES.md → Evidence → Gate Verdict` sin omisiones ni saltos lógicos. [people]

## 3. Acceptance Criteria

- [ ] **AC-REQ-F-001:** `skills/using-frame-ship/SKILL.md §3` contiene la denominación `subagents only` en el paso 0, `subagents full-wave` en el paso 0.3, `parallel execution lanes setup (subagents)` en el paso 2, y la cláusula `W-SUBAGENTS` verbatim en el paso 3; `grep -n "multi-subagents" skills/using-frame-ship/SKILL.md` retorna 0 matches.
- [ ] **AC-REQ-F-002:** `skills/using-frame-ship/references/bootstrap-checklist.md` contiene `subagents full-wave` en la verificación de roles, y la cláusula `W-SUBAGENTS` + `W-SEQ` verbatim en la línea `Execution declared`; `grep -n "multi-subagents" skills/using-frame-ship/references/bootstrap-checklist.md` retorna 0 matches.
- [ ] **AC-REQ-F-003:** `skills/frame-intent/SKILL.md §3` contiene `(subagents only)` en el paso 0 y `Freeze execution as subagents only (no mode question)` en el paso 3; `grep -n "multi-subagents" skills/frame-intent/SKILL.md` retorna 0 matches.
- [ ] **AC-REQ-F-004:** `skills/frame-intent/references/product-brief.md` contiene exactamente la línea `Execution_Mode:` definida en `W-BRIEF-MODE`; `grep -n "multi-subagents" skills/frame-intent/references/product-brief.md` retorna 0 matches.
- [ ] **AC-REQ-F-005:** `rules/frame-ship.md` contiene la directiva de ejecución canónica `Execution: subagents only` y la cláusula `W-SUBAGENTS` en sus reglas persistentes; `grep -n "multi-subagents" rules/frame-ship.md` retorna 0 matches.
- [ ] **AC-REQ-F-006:** `.agents/rules/frame-ship.md` existe en el repositorio y es idéntico a `rules/frame-ship.md` (o refleja fielmente su sección de reglas persistentes con `W-SUBAGENTS`); `grep -n "multi-subagents" .agents/rules/frame-ship.md` retorna 0 matches.
- [ ] **AC-REQ-F-007:** Extracción y comparación automatizada de la cadena `W-SUBAGENTS` a través de todas las superficies people genera `diff = 0`.
- [ ] **AC-REQ-F-008:** `skills/quality-gate/references/domains/people-review.md` actualiza sus ítems de checklist y rationale exigiendo evidencia de verificación de `W-SUBAGENTS` y ausencia de residuos de `multi-subagents`.
- [ ] **AC-REQ-NF-001:** Ejecución de `grep -rn "multi-subagents" skills/using-frame-ship/ skills/frame-intent/SKILL.md skills/frame-intent/references/product-brief.md rules/frame-ship.md .agents/rules/frame-ship.md skills/quality-gate/references/domains/people-review.md` resulta en 0 matches.
- [ ] **AC-REQ-NF-002:** Verificación cruzada mediante hash/diff de `W-SUBAGENTS` en las superficies designadas produce coincidencia exacta al 100%.
- [ ] **AC-REQ-NF-003:** Inspección de `git diff --name-only` confirma que ningún archivo bajo `docs/specs/40_workspace/`, `docs/specs/50_archive/` o briefs históricos previos ha sido modificado.
- [ ] **AC-REQ-NF-004:** Attestation de seguridad y privacidad en el gate report confirmando 0 tokens, credenciales, o PII según la Ley 172-13.
- [ ] **AC-REQ-NF-005:** `mise run typecheck` pasa exitosamente sin errores de compilación TypeScript.
- [ ] **AC-REQ-NF-006:** Tabla de trazabilidad (§7) completamente poblada con mapeo 1:1 entre requisitos, criterios, propuesta y evidencia.

## 4. Contracts & Interfaces

Wording normativo canónico para las superficies People y reglas de agentes:

### W-SUBAGENTS — Contrato Canónico de Ejecución Metodológica

```text
Execution is subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.
```

### W-SEQ — Contrato de Degradación Secuencial

```text
Sequential degradation, same contract: harnesses without task run lanes sequentially in the same thread — same packet, same reviewers, same full-wave gate. No min-gate, no silent downgrade.
```

### W-BRIEF-MODE — Declaración Canónica en Product Brief

```text
**Execution_Mode:** subagents (frozen at frame-intent; trivial <15 lines goes by CEO fast-path checkpoint-only, outside methodology)
```

### W-INTENT-STEP3 — Freeze en Frame-Intent §3 Paso 3

```text
Freeze execution as subagents only (no mode question): orchestrator dispatches, owners do the work or brief back; sequential same-thread degradation where the harness lacks task. Trivial <15-line reversible work is CEO fast-path, outside methodology. Freeze as execution_mode in brief; all specs follow it unless overridden per SPEC with orchestrator waiver.
```

### W-RULES-EXEC — Directiva para Reglas Persistentes de Agentes (rules/frame-ship.md y .agents/rules/frame-ship.md)

```markdown
## Execution mode

Execution is subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.
```

### W-PPL-GATE — Checklist para people-review.md

```markdown
- [ ] Uniform subagents wording verified (W-SUBAGENTS + W-SEQ grep evidence attached)
- [ ] No min-gate path invoked; full-wave + refuter before qa
- [ ] Rule-change impact communicated (all roles aligned with subagents nomenclature and natural process)
```

*Contrato No-Code:* Este entregable rige la coherencia humana y de agentes, las pautas de interacción, incorporación (onboarding) y reglas operativas; no impone esquemas de API de código ni tipos de datos de backend.

## 5. Out of Scope

- Modificación de la mecánica de skills y templates de ingeniería asignados a Vasquez (engineering owner): `skills/translate-to-spec/SKILL.md`, `skills/execute-spec/SKILL.md`, `skills/quality-gate/SKILL.md`, `skills/git-worktree/SKILL.md`, `spec-template.md`, `proposal-template.md`, `gate-report.md`, `dod-checklist.md`.
- Redacción y registro del documento de arquitectura `docs/specs/12_adr/ADR-009-subagents-naming.md` (propiedad de engineering).
- Modificación de artefactos históricos (`docs/specs/40_workspace/`, `docs/specs/50_archive/`, notas de versión o briefs antiguos) protegidos por inmutabilidad de auditoría.
- Modificación del catálogo canónico de 8 dominios, del orden de etapas de la cadena Frame→Ship o del comportamiento del plugin runtime (`.opencode/plugins/` o `.agents/hooks.json`).
- Potestad del fast-path CEO (<15 líneas), la cual permanece intacta y fuera de la metodología.

## 6. Dependencies

- **DEP-001 (Engineering Cross-Lane Coordination):** Coordinación estrecha con Vasquez (engineering owner) para asegurar que el contrato canónico `W-SUBAGENTS` se replique con fidelidad de 0 bytes en los templates y skills de ingeniería.
- **DEP-002 (Security Sign-off):** Revisión de seguridad y confidencialidad por Barrera (security owner) sobre las reglas de agentes y ausencia de PII/credenciales (Ley 172-13).
- **DEP-003 (Sponsor Alignment):** Ratificación de Montilla (orchestrator / sponsor) sobre la estandarización final sin divergencias léxicas.

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-F-001 | AC-REQ-F-001 | `skills/using-frame-ship/SKILL.md §3` con `W-SUBAGENTS` | `grep -n "multi-subagents" skills/using-frame-ship/SKILL.md` (0 matches) |
| REQ-F-002 | AC-REQ-F-002 | `skills/using-frame-ship/references/bootstrap-checklist.md` con `W-SUBAGENTS` + `W-SEQ` | `grep -n "multi-subagents" skills/using-frame-ship/references/bootstrap-checklist.md` (0 matches) |
| REQ-F-003 | AC-REQ-F-003 | `skills/frame-intent/SKILL.md §3` pasos 0 y 3 con `subagents only` | `grep -n "multi-subagents" skills/frame-intent/SKILL.md` (0 matches) |
| REQ-F-004 | AC-REQ-F-004 | `skills/frame-intent/references/product-brief.md` con `W-BRIEF-MODE` | `grep -n "multi-subagents" skills/frame-intent/references/product-brief.md` (0 matches) |
| REQ-F-005 | AC-REQ-F-005 | `rules/frame-ship.md` con `W-RULES-EXEC` | `grep -n "multi-subagents" rules/frame-ship.md` (0 matches) |
| REQ-F-006 | AC-REQ-F-006 | `.agents/rules/frame-ship.md` sincronizado con `rules/frame-ship.md` | `grep -n "multi-subagents" .agents/rules/frame-ship.md` (0 matches) |
| REQ-F-007 | AC-REQ-F-007 | Inserción canónica de `W-SUBAGENTS` en 4 superficies people | `diff` automatizado entre instancias = 0 bytes |
| REQ-F-008 | AC-REQ-F-008 | `skills/quality-gate/references/domains/people-review.md` con `W-PPL-GATE` | Inspección de `people-review.md` |
| REQ-NF-001 | AC-REQ-NF-001 | Eliminación total de residuos en superficies activas people | `grep -rn "multi-subagents"` en rutas people = 0 |
| REQ-NF-002 | AC-REQ-NF-002 | Uniformidad byte a byte de `W-SUBAGENTS` | Reporte diff de PROPOSED_CHANGES = 0 |
| REQ-NF-003 | AC-REQ-NF-003 | Protección de registros históricos | `git diff --name-only` no incluye historial |
| REQ-NF-004 | AC-REQ-NF-004 | Cumplimiento Ley 172-13 (privacidad) | Attestation de seguridad en GATE_REPORT |
| REQ-NF-005 | AC-REQ-NF-005 | Validación estática y tipado | `mise run typecheck` limpio |
| REQ-NF-006 | AC-REQ-NF-006 | Trazabilidad completa REQ → AC → Gate | GATE_REPORT con 14/14 criterios verificados |

Singleton: per lane, create-if-missing else update-in-place, never suffix — one UPPER_SNAKE canonical per type (only `PROPOSED_CHANGES.md`, never `PROPOSED_CHANGES-*.md`).

**Packet:** SPEC:docs/specs/20_backlog/SPEC-subagents-naming-people.md#REQ-F-001..008+REQ-NF-001..006 / HARD:subagents+docs-only,reversible,Ley172-13-masked,history-intact / GATE:none-yet / DOMAINS:[people, engineering]
