# Proposed Changes: vasquez (engineering owner)

**Spec Reference:** SPEC-residual-cleanup-engineering
**Agent:** vasquez (CTO) — domain chain owner, engineering
**Date:** 2026-09-16
**Execution_Mode:** single (inherited from spec, frozen at frame-intent)
**Domains-Touched:** [engineering]

## Summary

Dos reescrituras de prosa en `README.md` (L97 y L236) para eliminar las últimas menciones a `tool-mapping` fuera del historial. Cero impacto funcional: el README no lo consume ningún loader ni runtime. Ningún archivo de implementación se toca en esta fase.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `README.md:97` | file-modify | Old: `- **using-frame-ship** — Chain contract + session-start/post-compaction checklist (includes tool-mapping reference)` → New: `- **using-frame-ship** — Chain contract + session-start/post-compaction checklist` REQ-001 |
| `README.md:236` | file-modify | Old: `- [ ] \`docs/README.<harness>.md\` per supported harness + tool-mapping per harness` → New: `- [ ] \`docs/README.<harness>.md\` per supported harness` (item sigue `[ ]`) REQ-002 |
| (verificación, sin archivo) | config-update | Grep `tool-mapping`: `README.md` = 0; repo-wide solo `docs/` histórico + traza (by design). REQ-003 |

## Rationale

REQ-001/002 quitan prosa stale sin tocar estructura ni estado del roadmap (no se marca hecho lo no hecho); REQ-003 lo hace verificable (KR-1.1). El README es descriptivo — ningún stage, plugin o harness lo lee como contrato.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Reescribir What's Inside / Roadmap completas | Scope creep; el brief congela 2 líneas |
| Marcar L236 como hecho `[x]` | Falso: el item (adapters por harness) sigue pendiente; solo su coletilla murió |
| Borrar las líneas en vez de reescribirlas | L97 es el descriptor del bootstrap y L236 un roadmap item vivo — ambos deben existir, exactos |

## Approval Required From

- [ ] Owning domain owner: vasquez (engineering) — mandatory
- [ ] engineering owner (arch impact): vasquez — N/A verificado (prosa, sin componentes/flujos)
- [ ] security owner (auth/data/API/PII): barrera — N/A (prosa, sin superficie; scan REQ-NF-001 en ejecución)

> **Rule:** No repository file modifications during proposal phase. For non-code domains, no external sends/filings/launches during proposal phase either.

---

# Risk Assessment: SPEC-residual-cleanup-engineering

**Proposer:** vasquez
**Date:** 2026-09-16
**Domains-Touched:** [engineering]

## Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Reword cambia el sentido del roadmap item | Low | Low | Diff de 1 línea por cambio; L236 conserva item + estado `[ ]`; read-through en ejecución |
| R-002 | Queda una mención no detectada en README | Low | Low | REQ-003 exige grep 0 en el archivo antes del gate; CLOSED bloquea handoff sin waiver |

## Blast Radius

Front-doorRepo prose (README): lectores humanos únicamente. Teams: ninguno (nadie consume el README como contrato). Customers/regulators/revenue: ninguno.

## Rollback Plan

`git revert <commit-ejecución>`: restaura las 2 líneas en un paso. Docs-only. Owner: vasquez. ETA < 2 min.

## Security Considerations

Sin auth, sin data stores, sin endpoints, sin inputs. Scan = 0 secretos/PII (REQ-NF-001). barrera N/A al gate.

## Domain Considerations

Engineering: prosa descriptiva — vasquez. Otros dominios: N/A (alcance [engineering] cerrado).
