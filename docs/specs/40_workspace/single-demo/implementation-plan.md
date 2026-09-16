# Implementation Plan: SPEC-single-demo-docs-fix

**Agent:** backend (single directo)
**Date:** 2026-09-16
**Approved By:** barrera Approved N/A (SECURITY_REVIEW.md) + vasquez/architect Approved sin ADR (ARCHITECTURE_REVIEW.md)
**Domains-Touched:** [engineering]

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | REQ-001 header git real | `AGENTS.md:3-5` | `git diff AGENTS.md` + T-001 | 5 min |
| 2 | REQ-002 docs existen | `AGENTS.md:17` | `git diff` + `Read docs/` + T-002 | 5 min |
| 3 | REQ-003 regla case gap | `AGENTS.md:56` | `git diff` + `git status` sin renames + T-003 | 5 min |
| 4 | Matriz + checks dominio | `single-demo/test-matrix.md` | `rg` secretos 0 valores + `git diff --stat` 1 archivo | 10 min |

## Order of Operations

Header → existencia docs → case gap (orden de lectura del archivo, sin dependencias entre sí; cada uno mapea 1 REQ para trazabilidad limpia).

## Rollback Points

Tras cada step: `git diff AGENTS.md` reversible; rollback total `git checkout -- AGENTS.md` (owner vasquez, <2 min). Stop seguro antes del gate si cualquier T falla.

## Quality Gates

- [x] Engineering: lectura/diff checks + `rg` seguridad (sin lint/tests código — N/A docs con justificación)
- [ ] Finance: N/A (sin budget/controls)
- [ ] Legal: N/A (sin IP/regulatorio)
- [ ] Marketing: N/A
- [ ] People: N/A
- [ ] Revenue: N/A
- [ ] Automation/ops: N/A
