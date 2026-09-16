# Requirements Index: Remove tool-mapping reference (Engineering)

**Owner:** vasquez (CTO) — domain chain owner, engineering
**Brief Reference:** BRIEF-remove-tool-mapping
**Domains-Touched:** [engineering]
**Spec:** docs/specs/40_workspace/vasquez/SPEC-remove-tool-mapping-engineering.md
**Execution_Mode:** single
**Note on IDs:** REQ-IDs match the spec exactly (REQ-001..004 + REQ-NF-001..003) so the SPEC/HARD/GATE/DOMAINS packet and the evidence chain stay traceable.

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-001 | Eliminar `skills/using-frame-ship/references/tool-mapping.md` del árbol vivo | P0 | BRIEF Scope In | SPEC-remove-tool-mapping-engineering | engineering | Test-Path + git status |
| REQ-002 | Reescribir `SKILL.md §3.1 (L45)` sin citar tool-mapping; load order autocontenido | P0 | BRIEF Desired Outcome | SPEC-remove-tool-mapping-engineering | engineering | review + diff |
| REQ-003 | Reescribir `SKILL.md §5 (L75-77)` sin la línea tool-mapping; refs coinciden con disco | P0 | BRIEF Desired Outcome | SPEC-remove-tool-mapping-engineering | engineering | review + diff + glob |
| REQ-004 | Cero dangling en vivo: grep `tool-mapping` = 0 en skills/ + .opencode/ + AGENTS.md raíz | P0 | OKR KR-1.2 | SPEC-remove-tool-mapping-engineering | engineering | grep counts |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | Sin secretos/PII en diff (Ley 172-13) | Security / Privacy | scan archivos cambiados = 0 hallazgos |
| REQ-NF-002 | Historial intacto: 0 ediciones en 40_workspace/ 50_archive/ 10_design/ briefs pasados | Consistency | git status solo lista archivos vivos |
| REQ-NF-003 | Rollback por `git revert`, ETA < 5 min | Operability | tabla en plan + nota en HANDOFF |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| engineering | Frontmatter intacto (name/description only); shape SKILL intacto; semántica CEO-only sin cambios; sin ARCHITECTURE/API_CONTRACTS nuevos | vasquez |
| security | Docs-only, sin auth/data/API; veredicto N/A al gate | barrera |

## Traceability Anchor

| Layer | Files | REQ-IDs |
|-------|-------|---------|
| Skills vivo | `skills/using-frame-ship/references/tool-mapping.md` (delete), `skills/using-frame-ship/SKILL.md` (§3 + §5) | REQ-001..004, REQ-NF-001..003 |
| Spec/REQ | `40_workspace/vasquez/SPEC-remove-tool-mapping-engineering.md`, `15_requirements/REQ-remove-tool-mapping-engineering.md` | REQ-001..004 + NF |
