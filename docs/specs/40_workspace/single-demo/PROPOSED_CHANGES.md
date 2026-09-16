# Proposed Changes: backend docs fix (single-demo)

**Spec Reference:** SPEC-single-demo-docs-fix
**Agent:** backend (docs-engineering, single)
**Date:** 2026-09-16
**Execution_Mode:** single
**Domains-Touched:** [engineering]

## Summary

Corregir 3 líneas obsoletas en `AGENTS.md` sin tocar runtime, skills ni releases reales. Cambio docs-only, un archivo, reversible. Repo intacto en esta fase — verificado vía `git diff --stat -- AGENTS.md` vacío.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `AGENTS.md:3-5` | file-modify | REQ-001: header `Generated/Commit/Branch` → refleja repo git real (`git rev-parse --short HEAD`, rama actual), elimina `n/a (not a git repo)` |
| `AGENTS.md:17` | file-modify | REQ-002: `docs/briefs\|specs/* does NOT exist` → existe; cita `docs/briefs/BRIEF-agent-templates.md` + `docs/specs/40_workspace/` |
| `AGENTS.md:56` | file-modify | REQ-003: case gap — regla `template skills/ship-release/references/release-notes.md (minúsculas) → artefacto RELEASE_NOTES.md (MAYÚSCULAS); no renombrar sin actualizar SKILL §5` |

Change types: `file-*` (engineering docs). No `document-create/campaign/contract/policy/workflow` en esta demo.

## Rationale

Cada cambio satisface 1 REQ con evidencia de lectura/diff (ver `test-matrix.md` T-001..T-003). Sin PII, sin secretos, sin auth/data/API, sin contrato público → `review-security` N/A con evidencia, `review-architecture` sin ADR.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Reescribir `AGENTS.md` completo | Sobredimensión; viola <15 líneas reversible |
| Renombrar `release-notes.md` → `RELEASE_NOTES.md` | Rompe `SKILL §5 References` + plugin pointers; prohibido sin grep previo |
| Tocar `30_delivery/RELEASE_NOTES.md` real | Contamina release real; demo exige carpeta aislada |

## Approval Required From

- [ ] Owning C-level: vasquez (engineering docs)
- [ ] vasquez (CTO, cross-cutting: AGENTS.md es source of truth del plugin)
- [ ] barrera (CISO, N/A — sin auth/data/API/PII; veredicto registrado en SECURITY_REVIEW.md)

> **Rule:** No repository file modifications during proposal phase. Verificado: `git diff --stat -- AGENTS.md` vacío al momento de esta propuesta. Solo archivos nuevos demo fuera del target (`docs/briefs/BRIEF-single-demo-docs-fix.md`, `docs/specs/40_workspace/single-demo/SPEC-*`).

---

# Risk Assessment: SPEC-single-demo-docs-fix

**Proposer:** backend (single)
**Date:** 2026-09-16
**Domains-Touched:** [engineering]

## Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | `AGENTS.md` erróneo confunde sesiones futuras (source of truth) | Med | Med | Diff mínimo 3 líneas, gate + refuter obligatorios, rollback inmediato |
| R-002 | Edición accidental fuera de líneas aprobadas | Low | Med | Change-list exacta + `git diff` verificado en execute + gate readability |
| R-003 | Precedente de carpeta `single-demo/` vs convención `<agent>` | Low | Low | Documentado como excepción demo en brief/spec/proposal; no toca `vasquez/` real |

## Blast Radius

Engineering (docs-contexto de todas las sesiones); sin servicios, sin datos, sin clientes, sin reguladores, sin revenue. Teams: solo sesión demo. Falla = contexto levemente erróneo, reversible en 1 comando.

## Rollback Plan

`git checkout -- AGENTS.md` o `git revert <sha>` — owner vasquez, ETA <2 min. Archivos demo se borran con `Remove-Item -Recurse docs/specs/40_workspace/single-demo` + brief demo si se decide descartar.

## Security Considerations

Sin auth, sin data stores, sin external APIs, sin PII (Ley 172-13 N/A — no hay flujo fuente→store→log→tercero). `rg -i "token|secret|password|api[_-]?key"` debe dar 0 en diff. barrera confirma N/A.

## Domain Considerations

Engineering docs-only. Finance/legal/marketing/people/revenue/automation: N/A — se eliminan, no se fuerzan contratos.
