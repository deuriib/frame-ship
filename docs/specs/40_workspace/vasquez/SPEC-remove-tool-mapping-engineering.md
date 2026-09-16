# Spec: Remove tool-mapping reference (Engineering Layer)

**ID:** SPEC-remove-tool-mapping-engineering
**Owner:** vasquez (CTO) — domain chain owner, engineering
**Domains-Touched:** [engineering]
**Brief Reference:** BRIEF-remove-tool-mapping
**Status:** draft
**Priority:** P1
**Execution_Mode:** single (inherited from BRIEF-remove-tool-mapping, frozen at frame-intent; not overridden)

## 1. Context

BRIEF-remove-tool-mapping (approved 2026-09-16) reduce el contrato de despacho a una sola fuente: `tool-mapping.md` sale del árbol vivo y `using-frame-ship/SKILL.md` queda sin punteros colgando. El archivo hoy documenta la regla CEO-only + filas adapter (opencode/Codex/generic) que ya viven como canónicas en `SKILL.md §3`, `bootstrap-checklist.md`, `skills/AGENTS.md` y plugin `frame-ship.ts`.

El trabajo se requiere porque hay 2 citas vivas (`SKILL.md:45,77`) que romperían al borrar sin reescritura, y 91 menciones totales donde la mayoría es historial en `docs/` que debe quedar intacto como evidencia. Sin spec, el borrado deja dangling pointers y viola el anti-pattern de `skills/AGENTS.md` (editar `references/` sin actualizar `SKILL.md §5`).

## 2. Requirements

- **REQ-001 (F, P0):** Eliminar `skills/using-frame-ship/references/tool-mapping.md` del árbol vivo. Evidencia: `Test-Path` False + `git status` muestra delete.
- **REQ-002 (F, P0):** Reescribir `skills/using-frame-ship/SKILL.md §3.1 (L45)` sin citar `references/tool-mapping.md`; el load order obligatorio sigue descrito en el propio SKILL (skill + rol antes de actuar). Evidencia: diff + lectura.
- **REQ-003 (F, P0):** Reescribir `skills/using-frame-ship/SKILL.md §5 References (L75-77)` sin la línea de `tool-mapping.md`; quedan `bootstrap-checklist.md` + puntero a stage skills. Evidencia: diff + lectura.
- **REQ-004 (F, P0):** Cero dangling en vivo: grep `tool-mapping` = 0 en `skills/`, `.opencode/` y `AGENTS.md` raíz. `docs/` histórico excluido por diseño (evidencia, no residuo). Evidencia: grep counts por capa.
- **REQ-NF-001 (NF, P0):** Sin secretos/PII en diff (Ley 172-13 minimización; cambio docs-only). Evidencia: scan de archivos cambiados = solo cláusulas de proceso.
- **REQ-NF-002 (NF, P0):** Historial intacto: nada editado en `docs/specs/40_workspace/`, `50_archive/`, briefs/OKRs pasados ni ADRs cerrados. Evidencia: `git status` solo lista los 3 archivos vivos.
- **REQ-NF-003 (NF, P1):** Rollback: `git revert` del commit de ejecución restaura archivo + 2 líneas; docs-only, ETA < 5 min. Evidencia: tabla de rollback en plan + nota en HANDOFF.

## 3. Acceptance Criteria

- [ ] AC-001 (REQ-001): `Test-Path skills/using-frame-ship/references/tool-mapping.md` = False; `git status --short` muestra `D` en esa ruta.
- [ ] AC-002 (REQ-002): `SKILL.md §3.1` describe load order sin mencionar `tool-mapping.md`; lectura confirma redacción autocontenida.
- [ ] AC-003 (REQ-003): `SKILL.md §5` lista solo referencias existentes en disco (`glob skills/using-frame-ship/references/*` coincide 1:1).
- [ ] AC-004 (REQ-004): `grep tool-mapping` en `skills/ .opencode/ AGENTS.md` raíz = 0 hits; hits en `docs/` solo históricos (listados, no editados).
- [ ] AC-005 (REQ-NF-001): scan de los 3 archivos cambiados = 0 secretos/PII.
- [ ] AC-006 (REQ-NF-002): `git status --short` solo toca: delete tool-mapping + modify SKILL.md (+ artefactos de traza fuera de `skills/`); 0 archivos en `40_workspace/ 50_archive/ 10_design/`.
- [ ] AC-007 (REQ-NF-003): plan trae tabla de rollback de 1 punto + ETA; HANDOFF la replica.

## 4. Contracts & Interfaces

Docs-only: sin firmas API, sin schemas, sin eventos. No se crea ni modifica `ARCHITECTURE.md` / `API_CONTRACTS.md` (no existen en repo y este cambio no introduce componentes ni flujos de datos). Invariantes: (1) frontmatter de skills intacto (`name`/`description` only); (2) shape de `SKILL.md` intacto (Purpose/Chain/2b/Process/Won't-do/References); (3) semántica CEO-only dispatch sin cambios — solo se elimina la duplicación. Packet: `SPEC:docs/specs/40_workspace/vasquez/SPEC-remove-tool-mapping-engineering.md#REQ-001..004 / HARD:single+docs-only,revertible,sin-PII / GATE:none-yet / DOMAINS:engineering`. Data lens: N/A.

## 5. Out of Scope

- Reescribir historial (`40_workspace/`, `50_archive/`, `README.md` histórico, ADRs, matrices viejas).
- Cambiar semántica del contrato de despacho, orden del chain o loader de frontmatter.
- Tocar `frame-ship.ts` (0 hits hoy) o agregar deps al plugin.
- Rotar keys, deploys prod, widen permissions.

## 6. Dependencies

| Dependency | Status at spec time | Effect |
|------------|---------------------|--------|
| BRIEF-remove-tool-mapping (approved) | presente | Fuente de alcance + constraints |
| OKRs inline en BRIEF | presente | KR-1.1/1.2/2.1 citados en ACs |
| `commit-convention.md` ausente (purgado) | gap conocido | commit sigue formato `docs(...)` por precedente de log; gap registrado como follow-up fuera de este spec |

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001 | PROPOSED_CHANGES-remove-tool-mapping.md | Test-Path + git status |
| REQ-002 | AC-002 | PROPOSED_CHANGES-remove-tool-mapping.md | diff SKILL.md §3 |
| REQ-003 | AC-003 | PROPOSED_CHANGES-remove-tool-mapping.md | diff SKILL.md §5 + glob |
| REQ-004 | AC-004 | PROPOSED_CHANGES-remove-tool-mapping.md | grep counts por capa |
| REQ-NF-001..003 | AC-005..007 | plan + handoff | scan + status + rollback table |
