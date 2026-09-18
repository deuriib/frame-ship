# Implementation Plan: single-demo lane (canonical singleton slot)

**Owner:** general (administrative owner, single-demo lane) | **Date:** 2026-09-18
**Skill:** `D:\GitHub\frame-ship\skills\execute-spec\SKILL.md` (single mode, direct)

## Consolidation Record

| Source variant | Archived to | SHA256 (source pre-move) | Disposition |
|----------------|-------------|--------------------------|-------------|
| `docs/specs/40_workspace/single-demo/implementation-plan.md` (lowercase) | `docs/specs/50_archive/implementation-plan-single-demo.md` | C583727AEB9F0615CE4A2D58F144419D5E0F29B4FB3021FA0233A51D7BCF7EBF | moved byte-identical (copy → hash-verify → delete); content preserved below (canonical casing fix) |

Created from lowercase variant. Singleton slot established by SPEC-singleton-consolidation-single-demo (2026-09-18). Future plans update this file in place, never a suffixed/cased variant.

## Plan (this unit)

1. Create `RELEASE_NOTES.md` / `IMPLEMENTATION_PLAN.md` (this file) / `TEST_MATRIX.md` from the 3 variants (content-preserve + record header).
2. Create `DRILL.md` / `ARCHITECTURE.md` / `API_CONTRACT.md` new (no prior variant).
3. Append consolidation records to `ARCHITECTURE_REVIEW.md` / `HANDOFF.md` / `PROPOSED_CHANGES.md` (this file's proposal section already written).
4. Copy → SHA256-verify → delete the 3 originals into `50_archive/` with `-single-demo` infix.
5. Min-gate 4/4 (readability + risk + refuter + QA) via TEST_MATRIX AC table, then handoff + in-lane ship. Rollback per record tables, ETA < 10 min.

---

# Implementation Plan: SPEC-single-demo-docs-fix (preserved docs-fix plan)

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
