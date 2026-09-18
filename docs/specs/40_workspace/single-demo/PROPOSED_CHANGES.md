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

---

# Proposed Changes: general (administrative owner) — Per-Lane Singleton Consolidation (single-demo)

**Spec Reference:** SPEC-singleton-consolidation-single-demo (`docs/specs/40_workspace/single-demo/SPEC-singleton-consolidation-single-demo.md`)
**Agent:** general (administrative owner, single-demo lane)
**Date:** 2026-09-18
**Execution_Mode:** single (direct, no task dispatch, min gate)
**Domains-Touched:** [administrative]
**Skill:** `D:\GitHub\frame-ship\skills\propose-changes\SKILL.md`
**Precedents:** 07a75de, 7cfa9b6, 796ed1b

## Summary (singleton unit)

Consolidate `docs/specs/40_workspace/single-demo/` to the 9-type singleton: exactly one canonical UPPER_SNAKE file per type. The 3 variants merge into canonicals (content preserved + consolidation record prepended); originals move to `docs/specs/50_archive/` byte-identical (copy → hash-verify → delete-original, no purge). Archived names carry the `-single-demo` lane infix for provenance. The 3 existing canonicals update in place (record appended, prior docs-fix substance preserved). The 3 missing canonicals are created new. `SPEC-*.md` + non-singleton demo evidence (`SECURITY_REVIEW.md`, `GATE_REPORT.md`, `ARCHIVE-RECORD.md`, `CHANGELOG-DEMO.md`, `quality-gate/`) untouched. No `30_delivery/` touch (HARD per-lane scope). Docs-only. Above docs-fix proposal (§§1-73) preserved as audit trail — this section supersedes the slot, it does not delete history.

## Changes (singleton unit)

| Target | Change Type | Description |
|--------|-------------|-------------|
| `RELEASE_NOTES.md` (new canonical) | document-create | From `RELEASE_NOTES-demo.md` (2026-09-16 demo notes): full content preserved + consolidation record header; supersedes suffixed variant |
| `IMPLEMENTATION_PLAN.md` (new canonical) | document-create | From `implementation-plan.md` (lowercase): full content preserved + consolidation record header; canonical casing fix |
| `TEST_MATRIX.md` (new canonical) | document-create | From `test-matrix.md` (lowercase): full docs-fix evidence preserved + singleton AC-001..004 table + SHA256 log appended |
| `DRILL.md` (new canonical) | document-create | Created new — no prior `DRILL-*.md` variant; demo drill-by-reference (docs-fix was docs-only, no live drill) + record |
| `ARCHITECTURE.md` (new canonical) | document-create | Created new — lane index linking numbered-store truth, not a fork + record |
| `API_CONTRACT.md` (new canonical) | document-create | Created new — lane file-contract (singleton rule) + pointer to `10_design/API_CONTRACTS.md` + record |
| `ARCHITECTURE_REVIEW.md` (existing canonical) | file-modify | Append consolidation record (prior docs-fix review preserved) |
| `HANDOFF.md` (existing canonical) | file-modify | Append singleton unit handoff section + rollback note (prior docs-fix handoff preserved) |
| `PROPOSED_CHANGES.md` (this file) | file-modify | This section — update in place, prior proposal preserved above |
| `50_archive/RELEASE_NOTES-demo-single-demo.md` | file-move | Original `RELEASE_NOTES-demo.md` moved byte-identical (SHA256 055CF635…) |
| `50_archive/implementation-plan-single-demo.md` | file-move | Original `implementation-plan.md` moved byte-identical (SHA256 C583727A…) |
| `50_archive/test-matrix-single-demo.md` | file-move | Original `test-matrix.md` moved byte-identical (SHA256 B07D4B4E…) |
| `15_requirements/REQ-singleton-consolidation-single-demo.md` | document-create | Requirements index (written at spec stage, carried forward) |

No other files touched. Other lanes untouched (Cross-domain request to montilla).

## Rationale

REQ-001/002 demand one canonical per type with history preserved — content-preserve + record satisfies both without pasting context across lanes (reference-only packets). REQ-003's record-per-canonical keeps created-new vs updated-in-place honest. Update-in-place for the 3 existing canonicals (append, not replace) preserves the docs-fix audit trail that precedents overwrote — stricter than precedent, justified because single-demo is a live demo record.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Replace the 3 existing canonicals wholesale | Destroys docs-fix demo audit trail (HANDOFF DoD, proposal); append preserves both |
| Index-only (reference without content preserve) for the 3 variants | Loses demo evidence inline lookup; content is small (1-2KB each), preserve is cheap |
| Delete variants after indexing | Purge — forbidden by HARD |
| Touch `30_delivery/RELEASE_NOTES.md` | Violates HARD per-lane scope (single-demo lane only); delivery untouched, noted as assumption |
| Consolidate other lanes in this unit | Sideways — forbidden; Cross-domain to montilla |

## Approval Required From

- [x] Owning domain owner: general (administrative) — self as proposer cannot self-approve substance; approval recorded at min-gate below
- [ ] Security screen: docs-only, no auth/data/API/PII — screen only, no deep audit
- [ ] Architecture impact: lane index links (not forks) numbered-store truth — no ADR (no new design; waived with rationale at gate)

> **Rule:** No repository file modifications during proposal phase (singleton unit). Only this section (+ SPEC + REQ index, already done) produced pre-execution.

## Risk Assessment (singleton unit)

**Proposer:** general (administrative) | **Date:** 2026-09-18 | **Domains-Touched:** [administrative]

### Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Move loses bytes (copy/delete asymmetry) | Low | High | Copy → SHA256-verify → delete-original; 3 files, hashes logged in TEST_MATRIX |
| R-002 | Case collision on win32 (`implementation-plan.md` vs `IMPLEMENTATION_PLAN.md`) | Low | Med | Create canonical first, verify both exist, then move original; glob-verify post-move |
| R-003 | Prior docs-fix trace breaks (proposal slot reused) | Med | Low | Prior §§1-73 preserved above; record tables map source → archive path |
| R-004 | Scope creep into other lanes / delivery | Low | Med | HARD per-lane scope; other lanes → Cross-domain request to montilla |

### Blast Radius

Systems: `40_workspace/single-demo/` + `50_archive/` (3 files) + `15_requirements/` (1 index) only. Teams: administrative owner only. Customers/regulators/revenue: none (docs-only, no PII/auth/API). Numbered store, plugin, skills, delivery: untouched.

### Rollback Plan

Move archived originals back per consolidation record tables; delete the 3 newly created missing canonicals (`DRILL/ARCHITECTURE/API_CONTRACT`) + 3 converted canonicals revert to pre-unit bytes via archived originals if full revert ordered (this proposal section + SPEC stay as audit trail); ETA < 10 min; owner general.

### Security Considerations

Docs surface only — no secret/token/credential/session in code/config/logs (Guardrails 1-4); indexes carry filename + one-line substance note, never pasted secrets (none present). Privacy: no PII mapped or exported (Ley 172-13 minimization holds).

### Domain Considerations

Administrative only. Non-touched domains carry no considerations.

## Assumptions (singleton unit)

1. `SPEC-*.md` + `SECURITY_REVIEW/GATE_REPORT/ARCHIVE-RECORD/CHANGELOG-DEMO/quality-gate/` are out of scope (not singleton types) — untouched.
2. `-single-demo` infix on archived copies is provenance, not a new in-lane suffix.
3. Security screen + ADR waiver (docs-only, link-not-fork) confirmed at min-gate; no separate review dispatch in single mode per precedent.
4. `30_delivery/RELEASE_NOTES.md` untouched per HARD scope — in-lane `RELEASE_NOTES.md` is the ship record for this unit.

## Trace

SPEC-singleton-consolidation-single-demo REQ-001..003 + NF → this proposal section → execute-spec (3 moves + 6 creates/updates) → min-gate (risk screen + refuter + readability + QA) → verify-handoff → ship-release (in-lane notes only).

## Scoped Evidence (proposal phase)

- Lane inventory: `40_workspace/single-demo/` = 12 entries (3 variants, 3 canonicals present, 3 missing, 6 out-of-scope evidence + 1 prior SPEC); 0 suffixed variants outside the 3 listed.
- Numbered-store truth linked (not forked): `docs/specs/10_design/ARCHITECTURE.md`, `docs/specs/10_design/API_CONTRACTS.md` (exist — verified via automation precedent).
- Precedents: 07a75de / 7cfa9b6 / 796ed1b shipped with min-gate 4/4.
