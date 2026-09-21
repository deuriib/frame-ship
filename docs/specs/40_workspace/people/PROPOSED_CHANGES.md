# Proposed Changes: People Specialist (santana)

**Spec Reference:** [SPEC-subagents-naming-people](../../20_backlog/SPEC-subagents-naming-people.md)  
**Agent:** santana (people owner) / people-specialist  
**Date:** 2026-09-20  
**Execution_Mode:** subagents (inherited from SPEC-subagents-naming-people, frozen at frame-intent)  
**Domains-Touched:** [people]  
**Canonical Contract:** `W-SUBAGENTS`  

> _"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."_

---

## 1. Summary

Esta propuesta formaliza la estandarización canónica de la nomenclatura de ejecución hacia **`subagents`** en todas las superficies normativas bajo la propiedad del dominio **People** (liderado por Santana), en estricto cumplimiento de `BRIEF-subagents-naming` y `SPEC-subagents-naming-people`. 

Se elimina de forma definitiva el término compuesto redundante `multi-subagents` en las reglas de onboarding y orden de carga (`skills/using-frame-ship/SKILL.md §3`), en el checklist de inicio de sesión (`skills/using-frame-ship/references/bootstrap-checklist.md`), en el pre-flight y congelamiento de iniciativa (`skills/frame-intent/SKILL.md §3`), en la plantilla de Product Brief (`skills/frame-intent/references/product-brief.md`), en las reglas persistentes del framework (`rules/frame-ship.md`), en el mirror de descubrimiento de Antigravity (`.agents/rules/frame-ship.md`) y en los criterios de revisión del People Reviewer (`skills/quality-gate/references/domains/people-review.md`).

Se establece la cláusula canónica **`W-SUBAGENTS`** con paridad exacta de 0 bytes entre todas las superficies activas, preservando la inmutabilidad histórica de auditorías previas (Opción A) y garantizando cero afectación en el runtime TypeScript (`mise run typecheck` limpio).

---

## 2. Changes

| Target | Change Type | REQ-ID | Description |
|--------|-------------|--------|-------------|
| `skills/using-frame-ship/SKILL.md` | `file-modify` | REQ-F-001, REQ-F-007 | Reemplazar `multi-subagents` por `subagents` en orden de carga (§3.0), comprensión de roles (§3.0.3), mapeo de lanes (§3.2) e insertar la cláusula `W-SUBAGENTS` verbatim en §3.3. |
| `skills/using-frame-ship/references/bootstrap-checklist.md` | `file-modify` | REQ-F-002, REQ-F-007 | Estandarizar `subagents full-wave` en checklist de roles y declarar `W-SUBAGENTS` + `W-SEQ` verbatim en la línea de ejecución declarada. |
| `skills/frame-intent/SKILL.md` | `file-modify` | REQ-F-003, REQ-F-007 | Actualizar pre-flight (§3.0) a `(subagents only)` y freeze (§3.3) con la directiva canónica `W-INTENT-STEP3` sin pregunta de modo. |
| `skills/frame-intent/references/product-brief.md` | `file-modify` | REQ-F-004, REQ-F-007 | Sustituir la línea `Execution_Mode:` por la formulación canónica `W-BRIEF-MODE`. |
| `rules/frame-ship.md` | `file-modify` | REQ-F-005, REQ-F-007 | Incorporar la sección canónica `## Execution mode` con la directiva `W-RULES-EXEC` (`W-SUBAGENTS`). |
| `.agents/rules/frame-ship.md` | `file-create` | REQ-F-006, REQ-F-007 | Crear el mirror Always-On para descubrimiento en Antigravity sincronizado al 100% (lockstep mirror) con `rules/frame-ship.md`. |
| `skills/quality-gate/references/domains/people-review.md` | `file-modify` | REQ-F-008, REQ-F-007 | Actualizar el checklist del revisor People con `W-PPL-GATE` y estandarizar la evidencia de verificación de `W-SUBAGENTS`. |

---

## 3. Canonical Contracts & Verbatim Text

A continuación se consagran las cláusulas normativas de People que deben replicarse con fidelidad absoluta (`diff = 0`):

### W-SUBAGENTS — Contrato Canónico de Ejecución Metodológica
```text
Execution is subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.
```

### W-SEQ — Contrato de Degradación Secuencial
```text
Sequential degradation, same contract: harnesses without task run lanes sequentially in the same thread — same packet, same reviewers, same full-wave gate. No min-gate, no silent downgrade.
```

### W-BRIEF-MODE — Declaración en Plantilla de Product Brief
```text
**Execution_Mode:** subagents (frozen at frame-intent; trivial <15 lines goes by CEO fast-path checkpoint-only, outside methodology)
```

### W-INTENT-STEP3 — Directiva de Congelamiento en Frame-Intent §3 Paso 3
```text
Freeze execution as subagents only (no mode question): orchestrator dispatches, owners do the work or brief back; sequential same-thread degradation where the harness lacks task. Trivial <15-line reversible work is CEO fast-path, outside methodology. Freeze as execution_mode in brief; all specs follow it unless overridden per SPEC with orchestrator waiver.
```

### W-RULES-EXEC — Sección en Reglas Persistentes (rules/frame-ship.md y .agents/rules/frame-ship.md)
```markdown
## Execution mode

Execution is subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.
```

### W-PPL-GATE — Checklist para Revisor People (people-review.md)
```markdown
- [ ] Uniform subagents wording verified (W-SUBAGENTS + W-SEQ grep evidence attached)
- [ ] No min-gate path invoked; full-wave + refuter before qa
- [ ] Rule-change impact communicated (all roles aligned with subagents nomenclature and natural process)
```

---

## 4. Proposed Diffs Detail

### 4.1 Target: `skills/using-frame-ship/SKILL.md` (REQ-F-001)

```diff
--- a/skills/using-frame-ship/SKILL.md
+++ b/skills/using-frame-ship/SKILL.md
@@ -38,7 +38,7 @@
-0. MANDATORY LOAD ORDER — HARD STOP (multi-subagents only — the natural process):
+0. MANDATORY LOAD ORDER — HARD STOP (subagents only — the natural process):
    1. `using-frame-ship` is already loaded in context (bootstrap) — NEVER re-load it via the skill tool.
    2. Load the target `<stage>` skill via the native `skill` tool ONCE when entering that stage, BEFORE acting for that stage. (Do NOT re-load on every individual tool call, edit, or bash). No skill = STOP.
-   3. Domain owner/specialist role understood — skill + role per stage, multi-subagents full-wave. Path cited in output.
+   3. Domain owner/specialist role understood — skill + role per stage, subagents full-wave. Path cited in output.
    4. Pre-flight: stage skill loaded? `SPEC/HARD/GATE/DOMAINS` packet ready? Any NO → STOP, load stage skill first. FAIL → retry N=2 differently → escalate to orchestrator. Never third loop, never sideways.
 1. Check for relevant skills before any task — mandatory workflows, not
    suggestions. Load the named stage skill via the native `skill` tool before
@@ -57,3 +57,3 @@
-   - parallel execution lanes setup (multi-subagents) → `frame-ship:git-worktree`
+   - parallel execution lanes setup (subagents) → `frame-ship:git-worktree`
    - branch / pull request / ready-for-review → `frame-ship:pull-request`
 3. Enforce the hard rules on every step (see `references/bootstrap-checklist.md`):
@@ -65,3 +65,3 @@
-   Execution is multi-subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.
+   Execution is subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.
    Sequential degradation, same contract: harnesses without task run lanes sequentially in the same thread — same packet, same reviewers, same full-wave gate. No min-gate, no silent downgrade.
```

### 4.2 Target: `skills/using-frame-ship/references/bootstrap-checklist.md` (REQ-F-002)

```diff
--- a/skills/using-frame-ship/references/bootstrap-checklist.md
+++ b/skills/using-frame-ship/references/bootstrap-checklist.md
@@ -10,3 +10,3 @@
-- [ ] Domain owner/specialist role understood — skill + role per stage, multi-subagents full-wave. Path cited in output.
-- [ ] Execution declared: Execution is multi-subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch. Sequential degradation, same contract: harnesses without task run lanes sequentially in the same thread — same packet, same reviewers, same full-wave gate. No min-gate, no silent downgrade.
+- [ ] Domain owner/specialist role understood — skill + role per stage, subagents full-wave. Path cited in output.
+- [ ] Execution declared: Execution is subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch. Sequential degradation, same contract: harnesses without task run lanes sequentially in the same thread — same packet, same reviewers, same full-wave gate. No min-gate, no silent downgrade.
 - [ ] Hard rules acknowledged:
```

### 4.3 Target: `skills/frame-intent/SKILL.md` (REQ-F-003)

```diff
--- a/skills/frame-intent/SKILL.md
+++ b/skills/frame-intent/SKILL.md
@@ -32,3 +32,3 @@
-0. Pre-flight LOAD — HARD STOP (multi-subagents only): `skill(frame-intent)` loaded? Domain ownership identified? `execution_mode` about to be frozen? Any NO → STOP, load first. FAIL → retry N=2 → escalate. Output cites skill.
+0. Pre-flight LOAD — HARD STOP (subagents only): `skill(frame-intent)` loaded? Domain ownership identified? `execution_mode` about to be frozen? Any NO → STOP, load first. FAIL → retry N=2 → escalate. Output cites skill.
 1. Explore context first — files, docs, recent commits, and load any relevant sideways or external skills (even outside frame-ship scope) that can assist with discovery, planning, domain context, or task decomposition — before detailed questions. If the request describes multiple independent subsystems, flag this immediately and decompose into sub-initiatives (own BRIEF→SPEC cycle each); brainstorm the first through the normal flow.
@@ -39,3 +39,3 @@
-3. Freeze execution as multi-subagents only (no mode question): orchestrator dispatches, owners do the work or brief back; sequential same-thread degradation where the harness lacks task. Trivial <15-line reversible work is CEO fast-path, outside methodology. Freeze as execution_mode in brief; all specs follow it unless overridden per SPEC with orchestrator waiver.
+3. Freeze execution as subagents only (no mode question): orchestrator dispatches, owners do the work or brief back; sequential same-thread degradation where the harness lacks task. Trivial <15-line reversible work is CEO fast-path, outside methodology. Freeze as execution_mode in brief; all specs follow it unless overridden per SPEC with orchestrator waiver.
```

### 4.4 Target: `skills/frame-intent/references/product-brief.md` (REQ-F-004)

```diff
--- a/skills/frame-intent/references/product-brief.md
+++ b/skills/frame-intent/references/product-brief.md
@@ -7,3 +7,3 @@
-**Execution_Mode:** multi-subagents (frozen at frame-intent; trivial <15 lines goes by CEO fast-path checkpoint-only, outside methodology)
+**Execution_Mode:** subagents (frozen at frame-intent; trivial <15 lines goes by CEO fast-path checkpoint-only, outside methodology)
```

### 4.5 Target: `rules/frame-ship.md` (REQ-F-005)

```diff
--- a/rules/frame-ship.md
+++ b/rules/frame-ship.md
@@ -36,2 +36,8 @@
 7. Reference-only packets between stages — never paste full context.
+
+## Execution mode
+
+Execution is subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.
```

### 4.6 Target: `.agents/rules/frame-ship.md` (REQ-F-006)

```diff
--- /dev/null
+++ b/.agents/rules/frame-ship.md
@@ -0,0 +1,345 @@
+# frame-ship — persistent rules
+
+## Chain (do not skip)
+
+```text
+frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release
+```
+
+## Load order (HARD STOP)
+
+1. `using-frame-ship` is ALREADY loaded in context (bootstrap via `context-inject` hook). NEVER re-read or re-load `using-frame-ship` via the skill tool.
+2. Load the `<stage>` skill via the skill tool ONCE at the start of that stage before performing work for that stage. NEVER re-load skills on every individual edit or command. No skill = STOP.
+3. Then act. Pre-flight: stage skill loaded? `SPEC/HARD/GATE/DOMAINS`? Any NO → STOP, load stage skill first. FAIL → retry N=2 differently → escalate to orchestrator. No third loop, no sideways.
+
+## Trigger → skill
+
+- start / what-skills → `using-frame-ship`
+- initiative / OKRs → `frame-intent` (BRIEF + OKRs)
+- brief approved → `translate-to-spec` (REQ + ARCHITECTURE + CONTRACTS)
+- ready to implement → `propose-changes` (PROPOSED_CHANGES, repo untouched)
+- auth / data / external API → `review-security` (STRIDE)
+- public API / data model / cross-cutting → `review-architecture` (ADR)
+- approved spec → `execute-spec` (approved files, REQ → test)
+- implementation ready → `quality-gate` (CLOSED on fail)
+- work complete → `verify-handoff` (HANDOFF, DoD)
+- verified → `ship-release` (NOTES + changelog + rollback)
+
+## Hard rules
+
+1. No code without an approved proposal.
+2. Security review for auth/data/API.
+3. ADR for contract changes.
+4. No handoff on CLOSED gate without waiver.
+5. `REQ-ID → test → artifact → gate verdict` trace, always.
+6. `HANDOFF.md` before ship.
+7. Reference-only packets between stages — never paste full context.
+
+## Execution mode
+
+Execution is subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.
+
+## Guardrails for Software Development and Beyond (BEFORE dispatch, AFTER verify; full text: AGENTS.md)
+[... idéntico byte por byte a rules/frame-ship.md ...]
```

### 4.7 Target: `skills/quality-gate/references/domains/people-review.md` (REQ-F-008)

```diff
--- a/skills/quality-gate/references/domains/people-review.md
+++ b/skills/quality-gate/references/domains/people-review.md
@@ -15,3 +15,3 @@
-- [ ] Uniform multi-only wording verified (W-MULTI + W-SEQ grep evidence attached)
+- [ ] Uniform subagents wording verified (W-SUBAGENTS + W-SEQ grep evidence attached)
 - [ ] No min-gate path invoked; full-wave + refuter before qa
-- [ ] Rule-change impact communicated (all roles affected by single-process wording)
+- [ ] Rule-change impact communicated (all roles aligned with subagents nomenclature and natural process)
@@ -29,2 +29,2 @@
-Attach W-MULTI/W-SEQ grep evidence + single-residue grep (NF-001 pattern); rationale cites diff=0.
+Attach W-SUBAGENTS/W-SEQ grep evidence + multi-subagents residue grep (NF-001 pattern); rationale cites diff=0.
```

---

## 5. Rationale

1. **Eliminación de Redundancia y Deuda Léxica:** El término "subagents" en idioma inglés es gramaticalmente plural y denota inherentemente concurrencia y multiplicidad. El prefijo "multi-" surgió como distinción temporal durante la vigencia del modo "single" (eliminado en ADR-008). Mantenerlo añade peso cognitivo y desalinea el repositorio respecto a las directivas de Antigravity y OpenCode.
2. **Onboarding Coherente y Transparente:** La claridad en las reglas de agentes (`skills/using-frame-ship/SKILL.md` y `rules/frame-ship.md`) evita alucinaciones o confusiones de modo en los LLMs durante el bootstrap y tras operaciones de compactación de sesión.
3. **Lockstep y Descubrimiento en Antigravity:** La creación de `.agents/rules/frame-ship.md` garantiza que los agentes que descubren reglas en la ruta nativa de Antigravity reciban las mismas directivas inmutables consagradas en la raíz del repositorio, preservando la sincronización estricta documentada en `AGENTS.md`.
4. **Preservación Histórica (Opción A):** No se tocan artefactos pasados en `docs/specs/40_workspace/` ni `docs/specs/50_archive/`, garantizando que auditorías pasadas mantengan su validez y trazabilidad legal.
5. **Alineación con el Dominio de Ingeniería:** Esta propuesta empalma de manera exacta con el trabajo de Vasquez (engineering owner) en `SPEC-subagents-naming-engineering` y `ADR-009-subagents-naming.md`.

---

## 6. Alternatives Considered

| Alternativa | Razón de Rechazo |
|-------------|------------------|
| **Mantener `multi-subagents` (Status Quo)** | Perpetúa deuda léxica y contradice el mandato estratégico aprobado en `BRIEF-subagents-naming`. |
| **Bifurcación léxica (`subagent` en singular para 1 tarea, `subagents` para varias)** | Reintroduce la confusión conceptual del antiguo modo dual (`single | multi`), rompiendo el principio del "proceso natural" donde el orquestador despacha siempre a todo el equipo. |
| **Reescritura retroactiva global (Opción B)** | Destruiría la inmutabilidad histórica de auditorías y releases anteriores (`docs/specs/50_archive/`), violando el principio de trazabilidad y gobernanza de datos. |

---

## 7. Traceability Matrix

| Requirement | Acceptance Criterion | Target File & Section | Proposed Verification Command |
|-------------|---------------------|-----------------------|-------------------------------|
| **REQ-F-001** | AC-REQ-F-001 | `skills/using-frame-ship/SKILL.md §3` | `grep -n "multi-subagents" skills/using-frame-ship/SKILL.md` (0 matches) |
| **REQ-F-002** | AC-REQ-F-002 | `skills/using-frame-ship/references/bootstrap-checklist.md` | `grep -n "multi-subagents" skills/using-frame-ship/references/bootstrap-checklist.md` (0 matches) |
| **REQ-F-003** | AC-REQ-F-003 | `skills/frame-intent/SKILL.md §3` | `grep -n "multi-subagents" skills/frame-intent/SKILL.md` (0 matches) |
| **REQ-F-004** | AC-REQ-F-004 | `skills/frame-intent/references/product-brief.md` | `grep -n "multi-subagents" skills/frame-intent/references/product-brief.md` (0 matches) |
| **REQ-F-005** | AC-REQ-F-005 | `rules/frame-ship.md` | `grep -n "multi-subagents" rules/frame-ship.md` (0 matches) |
| **REQ-F-006** | AC-REQ-F-006 | `.agents/rules/frame-ship.md` | `diff -u rules/frame-ship.md .agents/rules/frame-ship.md` (0 diff) |
| **REQ-F-007** | AC-REQ-F-007 | Superficies People (`W-SUBAGENTS`) | Comparación de hash/diff entre extracciones de `W-SUBAGENTS` = 0 |
| **REQ-F-008** | AC-REQ-F-008 | `skills/quality-gate/references/domains/people-review.md` | Verificación de checklist `W-PPL-GATE` en `people-review.md` |
| **REQ-NF-001** | AC-REQ-NF-001 | Superficies activas people | `grep -rn "multi-subagents" skills/using-frame-ship/ skills/frame-intent/SKILL.md skills/frame-intent/references/product-brief.md rules/frame-ship.md .agents/rules/frame-ship.md skills/quality-gate/references/domains/people-review.md` (0 matches) |
| **REQ-NF-002** | AC-REQ-NF-002 | Cláusula contractual `W-SUBAGENTS` | `diff` automatizado entre instancias contractuales = 0 bytes |
| **REQ-NF-003** | AC-REQ-NF-003 | Inmutabilidad de auditoría histórica | `git diff --name-only` no incluye `docs/specs/50_archive/` |
| **REQ-NF-004** | AC-REQ-NF-004 | Confidencialidad y Ley 172-13 | 0 PII, tokens o secretos en diffs o evidencia |
| **REQ-NF-005** | AC-REQ-NF-005 | Verificación estática TypeScript | `mise run typecheck` limpio |
| **REQ-NF-006** | AC-REQ-NF-006 | Trazabilidad integral | Mapeo exhaustivo 1:1 en GATE_REPORT |

---

## 8. Risk Assessment

### 8.1 Risk Matrix

| ID | Riesgo | Probabilidad | Impacto | Mitigación |
|----|--------|--------------|---------|------------|
| **R-001** | Desalineación léxica o drift entre People y Engineering en la cláusula `W-SUBAGENTS` | Baja | Alta | Contrato normativo fijado verbatim en §3; test de diff automatizado de 0 bytes antes de quality-gate. |
| **R-002** | Confusión temporal de subagentes preexistentes durante sesiones en vuelo | Media | Baja | Las sesiones en vuelo adoptan las reglas al iniciar nuevas etapas; se provee cláusula de degradación secuencial `W-SEQ` sin min-gate. |
| **R-003** | Pérdida de sincronización entre `rules/frame-ship.md` y el mirror `.agents/rules/frame-ship.md` | Baja | Media | Lockstep automation via `scripts/bump-version.mjs` y verificación mandatoria en quality gate. |
| **R-004** | Regresión accidental en runtime TypeScript al modificar archivos de skills | Muy Baja | Crítica | Alcance 100% no-code/documentación; ejecución obligatoria de `mise run typecheck` en pre-flight y gate. |
| **R-005** | Fuga accidental de credenciales o PII en logs de evidencia de verificación | Muy Baja | Alta | Cumplimiento irrestricto de Ley 172-13: grep pattern allowlisted, masking obligatorio de exports. |

### 8.2 Blast Radius

- **Systems:** Exclusivamente superficies de documentación, especificaciones, skills markdown y reglas persistentes (`rules/frame-ship.md`, `.agents/rules/frame-ship.md`). Cero modificación en motores de base de datos, APIs de red, endpoints HTTP o runtime TypeScript.
- **Teams:** Agentes LLM (claridad en orden de carga y dispatch) y colaboradores humanos (onboarding unificado sin términos redundantes).
- **Customers / Users:** Transparente; mejora la estabilidad y predictibilidad de las sesiones al eliminar dudas sobre modos de ejecución.
- **Regulators / Legal:** Cumplimiento estricto de la Ley 172-13 sobre protección de datos personales. No se tocan almacenes de datos ni información sujeta a retención.
- **Revenue:** Cero impacto negativo o riesgo financiero; incrementa la velocidad y eficiencia operativa de los equipos autónomos.

### 8.3 Rollback Plan

- **Mecanismo:** Reversión atómica mediante Git (`git revert <commit-hash>`).
- **Naturaleza del cambio:** Modificaciones puramente documentales y de configuración declarativa; no requiere migraciones de datos, cambios de esquema ni reconstrucción de binarios.
- **Responsable:** Santana (people owner).
- **ETA de recuperación:** < 2 minutos.

### 8.4 Security & Privacy Considerations

- **Ley 172-13:** Ninguna de las plantillas o reglas contiene PII, números de identificación personal ni datos sensibles. Toda evidencia generada para el Quality Gate será enmascarada y filtrada.
- **Secretos y Credenciales:** Cero tokens de acceso, API keys o variables de entorno expuestas en el repositorio o en los commits resultantes.
- **Superficie de Ataque:** No se introducen dependencias de terceros ni scripts ejecutables no auditados.

### 8.5 Domain Considerations

- **People Domain (santana):** Armonización cultural y de comunicación del equipo de agentes; comprensión clara del orden de carga y del despacho natural.
- **Engineering Domain (vasquez):** Verificación de compatibilidad con `ADR-009` y paridad con `SPEC-subagents-naming-engineering`.

### 8.6 C2 Challenge Hook & Budget Note

- **Trigger:** Esta propuesta abarca superficies transversales normativas y de reglas de agentes. El trigger C2 es evaluable pero no introduce lógica financiera, endpoints de autenticación ni modificaciones de PII.
- **Budget:** Presupuesto estricto de 1 ronda de desafío (máximo 3 preguntas, una a la vez). La pregunta 4 (N+1) constituye un fallo bloqueante.
- **Untouched Rule:** Ningún archivo de implementación del repositorio ha sido tocado durante la fase de propuesta; el presente documento reside exclusivamente en `docs/specs/40_workspace/people/PROPOSED_CHANGES.md`.

---

## 9. Approval Required From

- [ ] **Owning domain owner:** `santana` (people owner) — Aprobación técnica y metodológica de la dimensión People.
- [ ] **Engineering domain owner:** `vasquez` (engineering owner) — Verificación de paridad byte a byte con `ADR-009` y templates de ingeniería.
- [ ] **Security domain owner:** `barrera` (security owner) — Attestation de cumplimiento de Ley 172-13 y ausencia de PII/credenciales.
- [ ] **Orchestrator / Sponsor:** `montilla` (orchestrator) — Ratificación de alineación general y autorización de paso a `execute-spec`.

> **Regla de Oro:** Ningún archivo de implementación del repositorio es modificado durante la fase de propuesta (`propose-changes`). La ejecución real del cambio solo comenzará una vez aprobada la presente propuesta y despachado el especialista bajo `execute-spec`.
