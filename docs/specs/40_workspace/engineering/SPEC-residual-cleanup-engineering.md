# Spec: Residual cleanup — README tool-mapping prose (Engineering Layer)

**ID:** SPEC-residual-cleanup-engineering
**Owner:** vasquez (CTO) — domain chain owner, engineering
**Domains-Touched:** [engineering]
**Brief Reference:** BRIEF-residual-cleanup
**Status:** draft
**Priority:** P2
**Execution_Mode:** single (inherited from BRIEF-residual-cleanup, frozen at frame-intent; not overridden)

## 1. Context

BRIEF-residual-cleanup (approved 2026-09-16) cierra el único riesgo retenido real del close de `tool-mapping`: 2 líneas de prosa stale en `README.md`. L97 describe `using-frame-ship` con un paréntesis que referencia un archivo borrado; L236 planea por harness algo con `tool-mapping` que ya no existe. Ambas son descriptivas — ningún loader, runtime o skill las consume — pero el front-door miente sobre el árbol.

El segundo riesgo retenido (punteros a `commit-convention.md`) quedó REFUTADO con prueba en disco (`grep commit-convention skills/` = 0; purge `f859726` + gate lo verificaron) y no genera trabajo en este spec.

## 2. Requirements

- **REQ-001 (F, P0):** Reescribir `README.md:97`: quitar ` (includes tool-mapping reference)`. Evidencia: diff + lectura.
- **REQ-002 (F, P0):** Reescribir `README.md:236`: quitar `+ tool-mapping per harness`, item sigue `[ ]`. Evidencia: diff + lectura.
- **REQ-003 (F, P0):** Cero menciones fuera de historial: grep `tool-mapping` en `README.md` = 0; repo-wide solo `docs/` histórico + artefactos de traza (by design). Evidencia: grep counts por capa.
- **REQ-NF-001 (NF, P0):** Sin secretos/PII en diff (Ley 172-13). Evidencia: scan = 0.
- **REQ-NF-002 (NF, P0):** Alcance congelado: solo 2 líneas; secciones intactas; 0 archivos fuera de `README.md` (+ traza fuera de alcance funcional). Evidencia: `git status` + diff stat.
- **REQ-NF-003 (NF, P1):** Rollback: `git revert` del commit de ejecución; docs-only, ETA < 2 min. Evidencia: tabla en plan + nota en HANDOFF.

## 3. Acceptance Criteria

- [ ] AC-001 (REQ-001): L97 lee `using-frame-ship` sin paréntesis; `grep tool-mapping README.md` = 0.
- [ ] AC-002 (REQ-002): L236 es item `[ ]` sin `tool-mapping`; resto de la línea intacto.
- [ ] AC-003 (REQ-003): grep repo-wide muestra solo `docs/` histórico + traza (listados, no editados).
- [ ] AC-004 (REQ-NF-001): scan = 0 secretos/PII.
- [ ] AC-005 (REQ-NF-002): diff stat = 1 archivo, 2 líneas cambiadas.
- [ ] AC-006 (REQ-NF-003): plan trae punto de rollback + ETA; HANDOFF lo replica.

## 4. Contracts & Interfaces

Docs-only: sin firmas API, sin schemas, sin eventos. Sin `ARCHITECTURE.md` / `API_CONTRACTS.md` (no existen y este cambio no crea componentes). Invariantes: (1) roadmap sigue `[ ]` (no se marca hecho lo no hecho); (2) resto del README byte-idéntico; (3) semántica del chain intacta. Packet: `SPEC:docs/specs/40_workspace/vasquez/SPEC-residual-cleanup-engineering.md#REQ-001..003 / HARD:single+docs-only,revertible,sin-PII / GATE:none-yet / DOMAINS:engineering`. Data lens: N/A.

## 5. Out of Scope

- Reescribir What's Inside / Roadmap; reordenar o marcar items del roadmap.
- Tocar `docs/` histórico, ADRs, matrices, handoffs (evidencia, no punteros).
- Cambiar chain, loader, plugin; keys, deploys, permisos.

## 6. Dependencies

| Dependency | Status at spec time | Effect |
|------------|---------------------|--------|
| BRIEF-residual-cleanup (approved) | presente | Alcance + constraints |
| README.md L97/L236 en disco | verificadas por lectura | Targets exactos |

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001 | PROPOSED_CHANGES-residual-cleanup.md | diff L97 |
| REQ-002 | AC-002 | PROPOSED_CHANGES-residual-cleanup.md | diff L236 |
| REQ-003 | AC-003 | PROPOSED_CHANGES-residual-cleanup.md | grep counts |
| REQ-NF-001..003 | AC-004..006 | plan + handoff | scan + status + rollback |
