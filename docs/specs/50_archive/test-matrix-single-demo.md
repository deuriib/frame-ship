# Test / Evidence Matrix: SPEC-single-demo-docs-fix

**Agent:** backend (single)
**Date:** 2026-09-16
**Domains-Touched:** [engineering]

| REQ-ID | Evidence ID | Description | Type | Status |
|--------|-------------|-------------|------|--------|
| REQ-001 | T-001 | Header git real: `19532cd` + `main` verificados vía `git rev-parse --short HEAD` + `git branch --show-current` | Review | pass |
| REQ-002 | T-002 | Docs existen: `docs/briefs/BRIEF-agent-templates.md` + `docs/specs/{10_design,20_backlog,30_delivery,40_workspace,50_archive}/` listados vía `Read docs/` | Review | pass |
| REQ-003 | T-003 | Regla case sin renames: `git status` sin renames, solo `M AGENTS.md` + `?? docs/` demo | Review | pass |
| REQ-001..003 | E-SEC | `rg -i token|secret|password|api_key|session` sin valores credenciales (solo descriptivos) | Attestation | pass |

Types: docs-only → `Review/Attestation` (código N/A con justificación — REQ-ID trace obligatorio cumplido).

## Coverage Summary

- Unit coverage: N/A (docs-only, justificado)
- Integration coverage: N/A (docs-only, justificado)
- Evidence coverage: 3/3 REQ-IDs con artefacto (`git diff AGENTS.md` + listings)
- Acceptance criteria covered: 3/3 (AC-001..003)
- Diff verificado: `AGENTS.md | 10 +++++----- (5+/5-)`, 1 archivo, dentro de change-list aprobada; `git status`: `M AGENTS.md` + `?? docs/` (evidencia demo aislada, sin tocar releases reales)
