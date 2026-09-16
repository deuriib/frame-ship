# Requirements Index: Residual cleanup (Engineering)

**Owner:** vasquez (CTO) — domain chain owner, engineering
**Brief Reference:** BRIEF-residual-cleanup
**Domains-Touched:** [engineering]
**Spec:** docs/specs/40_workspace/vasquez/SPEC-residual-cleanup-engineering.md
**Execution_Mode:** single
**Note on IDs:** REQ-IDs match the spec exactly (REQ-001..003 + REQ-NF-001..003).

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-001 | `README.md:97` sin paréntesis tool-mapping | P0 | BRIEF Scope In | SPEC-residual-cleanup-engineering | engineering | review + diff |
| REQ-002 | `README.md:236` sin tool-mapping, item sigue `[ ]` | P0 | BRIEF Scope In | SPEC-residual-cleanup-engineering | engineering | review + diff |
| REQ-003 | grep `tool-mapping` en README = 0; repo-wide solo historial + traza | P0 | OKR KR-1.1 | SPEC-residual-cleanup-engineering | engineering | grep counts |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | Sin secretos/PII (Ley 172-13) | Security / Privacy | scan = 0 |
| REQ-NF-002 | Alcance congelado: 1 archivo, 2 líneas | Consistency | diff stat |
| REQ-NF-003 | Rollback `git revert`, ETA < 2 min | Operability | plan + HANDOFF |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| engineering | Prosa descriptiva; roadmap no se marca hecho; sin arch/API/contracts | vasquez |
| security | Docs-only N/A | barrera |

## Traceability Anchor

| Layer | Files | REQ-IDs |
|-------|-------|---------|
| Front-door | `README.md` (L97, L236) | REQ-001..003, NF |
| Spec/REQ | `40_workspace/vasquez/SPEC-residual-cleanup-engineering.md`, `15_requirements/REQ-residual-cleanup-engineering.md` | REQ-001..003 + NF |
