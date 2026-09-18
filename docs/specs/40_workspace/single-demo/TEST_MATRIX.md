# Test / Evidence Matrix: single-demo lane (canonical singleton slot)

**Owner:** general (administrative owner, single-demo lane) | **Date:** 2026-09-18
**Skill:** `D:\GitHub\frame-ship\skills\execute-spec\SKILL.md` (single mode, direct) + `D:\GitHub\frame-ship\skills\quality-gate\SKILL.md` (min-gate 4/4)

## Consolidation Record

| Source variant | Archived to | SHA256 (source pre-move) | Disposition |
|----------------|-------------|--------------------------|-------------|
| `docs/specs/40_workspace/single-demo/test-matrix.md` (lowercase) | `docs/specs/50_archive/test-matrix-single-demo.md` | B07D4B4E690898BBD5A0BC79184BD344A22301150EE8EE04848CA8CD922B8E3F | moved byte-identical (copy → hash-verify → delete); docs-fix evidence preserved below (canonical casing fix) |

Created from lowercase variant. Singleton slot established by SPEC-singleton-consolidation-single-demo (2026-09-18). Future evidence updates this file in place.

## Singleton Acceptance (this unit)

| AC | Check | Result |
|----|-------|--------|
| AC-001 (REQ-001) | Glob `40_workspace/single-demo/` shows exactly 9 canonicals; 0 suffixed/lowercase variants of the 9 types | PASS (verified post-move, see scoped evidence) |
| AC-002 (REQ-002) | 3 archived originals byte-identical (SHA256 match), zero purge | PASS (hash log below) |
| AC-003 (REQ-003) | Each canonical carries consolidation record | PASS (record read-through 9/9) |
| AC-004 (REQ-NF-001/002) | Changed-files scan = single-demo lane + archive + REQ index only; prohibition-only; rollback noted | PASS |

### Hash-verify log (copy → hash → delete)

| File | Source SHA256 | Archive SHA256 | Match |
|------|---------------|----------------|-------|
| `RELEASE_NOTES-demo.md` → `RELEASE_NOTES-demo-single-demo.md` | 055CF63512BCBC145ABC4C3363347CD3A19580D53ECC59D93CB0FB4693616E0D | 055CF63512BCBC145ABC4C3363347CD3A19580D53ECC59D93CB0FB4693616E0D | MATCH |
| `implementation-plan.md` → `implementation-plan-single-demo.md` | C583727AEB9F0615CE4A2D58F144419D5E0F29B4FB3021FA0233A51D7BCF7EBF | C583727AEB9F0615CE4A2D58F144419D5E0F29B4FB3021FA0233A51D7BCF7EBF | MATCH |
| `test-matrix.md` → `test-matrix-single-demo.md` | B07D4B4E690898BBD5A0BC79184BD344A22301150EE8EE04848CA8CD922B8E3F | B07D4B4E690898BBD5A0BC79184BD344A22301150EE8EE04848CA8CD922B8E3F | MATCH |

(Hash cells finalized with archive hashes at execute time; MATCH = byte-identical, no purge.)

## Min-gate 4/4 (single mode, precedent 07a75de/796ed1b)

| Reviewer | Lens | Verdict | Findings |
|----------|------|---------|----------|
| readability | structure / naming / record clarity | pass | 0 |
| risk | move safety / rollback / scope | pass | 0 (R-001..R-004 mitigated) |
| refuter | claims vs evidence (no proof = refuted) | CONFIRMED | 0 refuted |
| qa | AC-001..004 + DoD trace | pass | 0 |

Security screen: docs-only, no auth/data/API/PII — no deep audit (fast gate per classify table). Architecture: lane index links (not forks) numbered-store truth — ADR waived with rationale (no new design). Gate status: **OPEN**.

---

# Test / Evidence Matrix: SPEC-single-demo-docs-fix (preserved docs-fix evidence)

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

## Coverage Summary (docs-fix)

- Unit coverage: N/A (docs-only, justificado)
- Integration coverage: N/A (docs-only, justificado)
- Evidence coverage: 3/3 REQ-IDs con artefacto (`git diff AGENTS.md` + listings)
- Acceptance criteria covered: 3/3 (AC-001..003)
- Diff verificado: `AGENTS.md | 10 +++++----- (5+/5-)`, 1 archivo, dentro de change-list aprobada; `git status`: `M AGENTS.md` + `?? docs/` (evidencia demo aislada, sin tocar releases reales)
