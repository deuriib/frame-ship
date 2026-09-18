# Spec: Per-Lane Singleton Consolidation - Single-Demo Lane

**ID:** SPEC-singleton-consolidation-single-demo
**Owner:** general (administrative owner, single-demo lane)
**Domains-Touched:** [administrative]
**Brief Reference:** bounded singleton brief approved 2026-09-18 (per-lane singleton rule)
**Status:** approved (brief is the approval; single mode, direct)
**Priority:** P0
**Execution_Mode:** single (direct, no further dispatch, min gate)
**Packet:** SPEC:docs/specs/40_workspace/single-demo/SPEC-singleton-consolidation-single-demo.md#REQ-001..003+NF / HARD:single+per-lane+archive-no-purge / GATE:min-gate-4/4-precedent / DOMAINS:[administrative]
**Skill:** `D:\GitHub\frame-ship\skills\translate-to-spec\SKILL.md`
**Precedents:** 07a75de (engineering, 58 moves), 7cfa9b6 (security), 796ed1b (automation), 4753f55 (skill hardening), 5d2c897 (drill wording)

## 1. Context

The approved brief (2026-09-18) imposes a per-lane singleton rule: max one file per type per `docs/specs/40_workspace/<lane>/` for 9 UPPER_SNAKE-canonical types — `RELEASE_NOTES.md`, `ARCHITECTURE_REVIEW.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `PROPOSED_CHANGES.md`, `TEST_MATRIX.md`, `ARCHITECTURE.md`, `API_CONTRACT.md` — create-if-missing / update-in-place / never-suffix. Suffixed variants consolidate into the canonical; originals move to `50_archive/` byte-identical (copy → hash-verify → delete, no purge, no repo-wide lock).

The single-demo lane breach at spec time (12 entries): 3 suffixed/lowercase variants of singleton types (`RELEASE_NOTES-demo.md`, `implementation-plan.md`, `test-matrix.md`), 3 existing canonicals (`ARCHITECTURE_REVIEW.md`, `HANDOFF.md`, `PROPOSED_CHANGES.md`), 3 missing canonicals (`DRILL.md`, `ARCHITECTURE.md`, `API_CONTRACT.md`). Non-singleton files out of scope, untouched: `SPEC-single-demo-docs-fix.md` (trace anchor, SPEC not a singleton type), `SECURITY_REVIEW.md`, `GATE_REPORT.md`, `ARCHIVE-RECORD.md`, `CHANGELOG-DEMO.md`, `quality-gate/` (4 reviews). Scope is per-lane: single-demo only. All other lanes belong to their owners — flagged as Cross-domain request to montilla (orchestrator), never touched here (no sideways).

Source hashes (SHA256, pre-move): `RELEASE_NOTES-demo.md` 055CF635…, `implementation-plan.md` C583727A…, `test-matrix.md` B07D4B4E… (full hashes logged in TEST_MATRIX.md).

## 2. Requirements

- **REQ-001 (F, P0):** For each of the 9 canonical types, exactly one file exists in `docs/specs/40_workspace/single-demo/` after consolidation: create-if-missing, update-in-place if present, never with a suffix. Canonical filename is UPPER_SNAKE exactly as briefed.
- **REQ-002 (F, P0):** The 3 variants are consolidated (substance carried forward by index + reference for the docs-fix demo, plus full content preserved in the new canonicals) into `RELEASE_NOTES.md`, `IMPLEMENTATION_PLAN.md`, `TEST_MATRIX.md`, and the originals moved to `docs/specs/50_archive/` under collision-safe archived names (`RELEASE_NOTES-demo-single-demo.md`, `implementation-plan-single-demo.md`, `test-matrix-single-demo.md`; `-single-demo` infix records lane provenance). Zero deletions. `SPEC-*.md` and non-singleton demo evidence untouched.
- **REQ-003 (F, P1):** Each canonical file carries a consolidation record (source → archive path table). For the 3 types with no prior variant (`DRILL.md`, `ARCHITECTURE.md`, `API_CONTRACT.md`), the record notes "created new — no prior variant; singleton slot established." For the 3 updated in place, the record notes prior canonical preserved + evolved.
- **REQ-NF-001 (NF, P0):** No purge (move is copy → hash-verify → delete-original, archive holds the original bytes), no repo-wide lock (only `40_workspace/single-demo/` + `50_archive/` touched), no secrets/PII in consolidation indexes. No `30_delivery/RELEASE_NOTES.md` touch (per-lane HARD scope) — in-lane `RELEASE_NOTES.md` only.
- **REQ-NF-002 (NF, P1):** Rollback = move archived originals back per the consolidation record + delete the 3 newly created canonicals if full revert ordered (this SPEC + PROPOSED_CHANGES stay as audit trail); ETA < 10 min (3-file move); owner general.

## 3. Acceptance Criteria

- [ ] AC-001 (REQ-001): Glob of `40_workspace/single-demo/` shows exactly 9 canonical files for the 9 types (plus SPECs + non-singleton demo evidence, out-of-scope classes, untouched); no suffixed/lowercase variant of the 9 types remains.
- [ ] AC-002 (REQ-002): Archived originals exist in `50_archive/` byte-identical (SHA256 match); zero deletions-without-archive (no purge).
- [ ] AC-003 (REQ-003): Each canonical file contains its consolidation record table/line.
- [ ] AC-004 (REQ-NF-001/002): Changed-files scan shows single-demo lane + archive + REQ index only; prohibition-only content; rollback note in HANDOFF.

## 4. Contracts & Interfaces

- Canonical set (exact): `RELEASE_NOTES.md`, `ARCHITECTURE_REVIEW.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `PROPOSED_CHANGES.md`, `TEST_MATRIX.md`, `ARCHITECTURE.md`, `API_CONTRACT.md` in `docs/specs/40_workspace/single-demo/`.
- Lane-level `ARCHITECTURE.md` / `API_CONTRACT.md` link to the numbered-store truth (`docs/specs/10_design/ARCHITECTURE.md`, `API_CONTRACTS.md`) — index, not fork. Docs-fix demo substance (`SPEC-single-demo-docs-fix.md`, `AGENTS.md` diff) stays referenced by path, not pasted.
- Packet: `SPEC:docs/specs/40_workspace/single-demo/SPEC-singleton-consolidation-single-demo.md#REQ-001..003+NF / HARD:single+per-lane+archive-no-purge / GATE:min-gate-4/4 / DOMAINS:[administrative]`.
- Data lens: N/A — docs-only move/index; no schema, lineage, or PII-store impact.

## 5. Out of Scope

- Other lanes (engineering, security, automation, people, quality-gate/*) — Cross-domain request to montilla; their owners consolidate their own lanes.
- `SPEC-*.md` in any lane — not a singleton type; trace anchors stay (both `SPEC-single-demo-docs-fix.md` and this SPEC stay in-lane).
- Non-singleton demo evidence (`SECURITY_REVIEW.md`, `GATE_REPORT.md`, `ARCHIVE-RECORD.md`, `CHANGELOG-DEMO.md`, `quality-gate/`) — untouched.
- Renaming numbered-store or archive files; plugin/skill edits; key rotation/prod changes (Guardrail 4).
- Resolving content substance beyond index + reference — deep merges need per-variant specs.

## 6. Dependencies

| Dependency | Status | Effect |
|------------|--------|--------|
| Brief approval 2026-09-18 | present | Scope + singleton set + HARD constraints |
| `50_archive/` writable | present | Archive target for 3 moved originals |
| Precedents 07a75de/7cfa9b6/796ed1b | shipped | Shape + min-gate 4/4 pattern reused |
| Other-lane owners | pending | Cross-domain request via montilla |

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001 | PROPOSED_CHANGES.md (singleton section) | glob counts per type |
| REQ-002 | AC-002 | PROPOSED_CHANGES.md | archive listing + SHA256 match |
| REQ-003 | AC-003 | PROPOSED_CHANGES.md | record tables in canonicals |
| REQ-NF-001/002 | AC-004 | PROPOSED_CHANGES.md | scan output + HANDOFF rollback note |
