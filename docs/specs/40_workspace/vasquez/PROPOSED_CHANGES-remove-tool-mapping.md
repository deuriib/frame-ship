# Proposed Changes: vasquez (engineering owner)

**Spec Reference:** SPEC-remove-tool-mapping-engineering
**Agent:** vasquez (CTO) — domain chain owner, engineering
**Date:** 2026-09-16
**Execution_Mode:** single (inherited from spec, frozen at frame-intent)
**Domains-Touched:** [engineering]

## Summary

Elimino `skills/using-frame-ship/references/tool-mapping.md` y dejo `using-frame-ship/SKILL.md` autocontenido: reescribo §3.1 (L45) y §5 (L75-77) sin citar el archivo. Cero cambios semánticos al contrato CEO-only; solo se quita la duplicación. Ningún archivo de implementación se toca en esta fase.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `skills/using-frame-ship/references/tool-mapping.md` | file-delete | Borrar archivo (38 líneas: regla CEO-only + filas opencode/Codex/generic + Rules). REQ-001 |
| `skills/using-frame-ship/SKILL.md §3.1 (L43-45)` | file-modify | Old: `acting (see \`references/tool-mapping.md\`).` → New: `acting — skill + domain role before any task/edit/bash/dispatch (see \`references/bootstrap-checklist.md\`).` REQ-002 |
| `skills/using-frame-ship/SKILL.md §5 (L75-77)` | file-modify | Old: dos bullets (`bootstrap-checklist.md` + `tool-mapping.md — Action phrases…`). → New: un bullet `references/bootstrap-checklist.md — Session-start and post-compaction checks (incl. skill + role load order).` REQ-003 |
| (verificación, sin archivo) | config-update | Grep `tool-mapping` = 0 en `skills/`, `.opencode/`, `AGENTS.md` raíz; `docs/` histórico excluido por diseño. REQ-004 |

## Rationale

REQ-001..003 eliminan la doble fuente manteniendo el load order obligatorio descrito en el propio SKILL + checklist; REQ-004 lo hace verificable (KR-1.2). Frontmatter y shape del SKILL quedan intactos; la semántica de despacho no cambia, por lo que no se requiere ADR ni revisión de arquitectura.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Fusionar tool-mapping dentro del SKILL | Infla el bootstrap; el checklist ya cubre el load order sin duplicar adapter rows por harness |
| Mantener y marcar deprecated | Perpetúa dos fuentes y el riesgo de drift que el brief quiere cerrar |
| Limpiar también las 91 menciones en `docs/` | Reescribe historia (anti-pattern de archive); el brief lo excluye explícitamente |

## Approval Required From

- [ ] Owning domain owner: vasquez (engineering) — mandatory
- [ ] engineering owner (arch impact): vasquez — N/A verificado (docs-only, sin componentes/flujos; sin `ARCHITECTURE.md` nuevo)
- [ ] security owner (auth/data/API/PII): barrera — N/A (docs-only, sin superficie; scan REQ-NF-001 en ejecución)

> **Rule:** No repository file modifications during proposal phase. For non-code domains, no external sends/filings/launches during proposal phase either.

---

# Risk Assessment: SPEC-remove-tool-mapping-engineering

**Proposer:** vasquez
**Date:** 2026-09-16
**Domains-Touched:** [engineering]

## Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Sesión/harness cita `tool-mapping.md` desde memoria o link externo y choca con su ausencia | Low | Low | El SKILL reescrito es autocontenido + checklist cubre load order; grep de verificación en ejecución |
| R-002 | Queda un puntero vivo no detectado en `skills/` o `.opencode/` | Low | Med | REQ-004 exige grep 0 por capa + `glob` 1:1 en §5 antes del gate; CLOSED bloquea handoff sin waiver |
| R-003 | Edición accidental de historial en `docs/` durante la ejecución | Low | Med | Alcance cerrado a 2 rutas vivas; `git status` verificado en AC-006; revert revierte todo |

## Blast Radius

Engineering (proceso bootstrap del chain: todos los agentes cargan `using-frame-ship` al abrir sesión). Teams: todos los roles heredan el SKILL reescrito — cambio de lectura, sin conducta nueva. Customers/regulators/revenue: ninguno (docs internos, sin PII, sin superficie auth/data/API).

## Rollback Plan

`git revert <commit-ejecución>`: restaura `tool-mapping.md` + 2 líneas del SKILL en un paso. Docs-only, sin migración ni undo externo. Owner: vasquez. ETA < 5 min.

## Security Considerations

Sin auth, sin data stores, sin endpoints, sin inputs. Scan de los archivos del diff = solo cláusulas de proceso; 0 secretos/PII (REQ-NF-001). barrera confirma N/A al gate.

## Domain Considerations

Engineering: frontmatter intacto, shape SKILL intacto, semántica CEO-only intacta — vasquez. Otros dominios: N/A (alcance [engineering] cerrado).
