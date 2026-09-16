# Architecture Review: SPEC-single-demo-docs-fix

**Spec:** `docs/specs/40_workspace/single-demo/SPEC-single-demo-docs-fix.md`
**Reviewers:** vasquez (CTO) + architect (diseño)
**Date:** 2026-09-16
**Execution_Mode:** single
**Verdict:** Approved — sin ADR (no hay cambio de contrato)

## Contract Check

- `docs/specs/10_design/` contiene solo `ADR-001`, `ADR-002*` — no existe `ARCHITECTURE.md` / `API_CONTRACTS.md` canónico que romper.
- Cambio propuesto: 3 líneas docs en `AGENTS.md`, sin APIs públicas, sin modelos de datos, sin cross-cutting (sin puertos/adaptadores/eventos nuevos).
- Frontmatter loader (`name/description` only) intacto; plugin `frame-ship.ts` single-file intacto; sin deps nuevas.

## Options Considered (architect, 2-3 exigido)

| Opción | Pros | Contras | Decisión |
|--------|------|---------|----------|
| A. Fix mínimo 3 líneas (propuesto) | Reversible, <15 líneas, cero blast radius código | No resuelve deuda mayor docs | ✅ Elegida |
| B. Reescribir AGENTS.md + mover templates | Limpieza total | Viola YAGNI/KISS, riesgo alto, fuera de scope single | Rechazada |
| C. Renombrar `release-notes.md` → `RELEASE_NOTES.md` | Consistencia case | Rompe SKILL §5 + pointers; requiere grep + ADR | Rechazada — se deja regla de uso en una línea |

## ADR

Ningún ADR nuevo: sin decisión arquitectónica significativa (docs-only, sin invariantes). Se registra explícitamente `ADR: N/A` para trazabilidad REQ→gate.

## Sign-off

- vasquez: Approved — pasa a `execute-spec` solo archivos de change-list.
- architect: Sin trade-off de estructuras/patrones (N/A — KISS/YAGNI rispettati).
- No override a barrera: veredicto seguridad `Approved N/A` se respeta.
