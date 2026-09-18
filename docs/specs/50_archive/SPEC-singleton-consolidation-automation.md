# Spec: Per-Lane Singleton Consolidation - Automation Lane

**ID:** SPEC-singleton-consolidation-automation
**Owner:** espinoza (Senior Automation Consultant) - domain chain owner, automation/ops
**Domains-Touched:** [automation/ops]
**Brief Reference:** bounded singleton brief approved 2026-09-18 (per-lane singleton rule)
**Status:** approved (brief is the approval; single mode, direct)
**Priority:** P0
**Execution_Mode:** single (direct, no further dispatch, min gate)

## 1. Context

The approved brief (2026-09-18) imposes a per-lane singleton rule: max one file per type per `docs/specs/40_workspace/<lane>/` for 9 UPPER_SNAKE-canonical types — `RELEASE_NOTES.md`, `ARCHITECTURE_REVIEW.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `PROPOSED_CHANGES.md`, `TEST_MATRIX.md`, `ARCHITECTURE.md`, `API_CONTRACT.md` — create-if-missing / update-in-place / never-suffix. Suffixed variants consolidate into the canonical; originals move to `50_archive/` byte-identical (copy → hash-verify → delete, no purge, no repo-wide lock).

The automation lane is a minimal breach: 1 file at spec time, 1 suffixed variant of the 9 singleton types (`HANDOFF-git-worktree.md`, 4506 bytes, 2026-09-16 automation owner gate for SPEC-git-worktree-automation). Zero canonicals exist. Precedent: engineering lane shipped commit `07a75de` (58 moves, 9 canonicals, min-gate 4/4). Scope is per-lane: automation lane only. All other lanes belong to their owners — flagged as Cross-domain request to montilla (orchestrator), never touched here (no sideways).

## 2. Requirements

- **REQ-001 (F, P0):** For each of the 9 canonical types, exactly one file exists in `docs/specs/40_workspace/automation/` after consolidation: create-if-missing, update-in-place if present, never with a suffix. Canonical filename is UPPER_SNAKE exactly as briefed.
- **REQ-002 (F, P0):** The suffixed variant `HANDOFF-git-worktree.md` is consolidated (substance carried forward by index + reference, not full paste) into canonical `HANDOFF.md`, and the original moved to `docs/specs/50_archive/HANDOFF-git-worktree-automation.md` under a collision-safe archived name (bare `HANDOFF-git-worktree.md` lineage is automation's; archived name records lane provenance). Zero deletions. `SPEC-*.md` files are out of scope — SPEC is not one of the 9 singleton types (this SPEC stays in-lane as trace anchor).
- **REQ-003 (F, P1):** Each canonical file carries a consolidation record (source → archive path table) so history stays traceable after the move. For the 8 types with no prior variant, the record notes "created new — no prior variant; singleton slot established."
- **REQ-NF-001 (NF, P0):** No purge (move is copy → hash-verify → delete-original, archive holds the original bytes), no repo-wide lock (only `40_workspace/automation/` + `50_archive/` touched), no secrets/PII in consolidation indexes.
- **REQ-NF-002 (NF, P1):** Rollback = move archived original back per the consolidation record + delete the 8 newly created canonicals if full revert ordered (this SPEC + PROPOSED_CHANGES stay as audit trail); ETA < 10 min (1-file move); owner espinoza.

## ROI Contract (mandatory per automation gate)

| Field | Value |
|-------|-------|
| Before metric | 1 suffixed variant, 0 canonicals — lane lookup requires knowing the `-git-worktree` suffix; every future write risks a new suffix |
| After metric | 9 canonicals + 0 suffixed variants — single predictable path per type |
| Expected saving | Eliminates suffix-guessing on every future automation write (~5 min/search × all future units); 1-file move costs < 10 min once |
| Validation method | `Get-ChildItem automation/` glob counts (9 canonicals, 0 suffixed) + archive hash-verify log + TEST_MATRIX AC table |

## 3. Acceptance Criteria

- [ ] AC-001 (REQ-001): Glob of `40_workspace/automation/` shows exactly 9 canonical files for the 9 types (plus this SPEC, out-of-scope class, untouched); no suffixed variant of the 9 types remains.
- [ ] AC-002 (REQ-002): Archived original exists in `50_archive/` byte-identical (hash match); zero deletions-without-archive (no purge).
- [ ] AC-003 (REQ-003): Each canonical file contains its consolidation record table/line.
- [ ] AC-004 (REQ-NF-001/002): Changed-files scan shows automation lane + archive only; prohibition-only content; rollback note in HANDOFF.

## 4. Contracts & Interfaces

- Canonical set (exact): `RELEASE_NOTES.md`, `ARCHITECTURE_REVIEW.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `PROPOSED_CHANGES.md`, `TEST_MATRIX.md`, `ARCHITECTURE.md`, `API_CONTRACT.md` in `docs/specs/40_workspace/automation/`.
- Lane-level `ARCHITECTURE.md` / `API_CONTRACT.md` link to the numbered-store truth (`docs/specs/10_design/ARCHITECTURE.md`, `API_CONTRACTS.md`) — index, not fork. Automation ops mechanics (worktree runbook) stay referenced in `DRILL.md`/`HANDOFF.md` by path, not pasted.
- Packet: `SPEC:docs/specs/40_workspace/automation/SPEC-singleton-consolidation-automation.md#REQ-001..003+NF / HARD:single+per-lane+archive-no-purge / GATE:min-gate-4/4-precedent / DOMAINS:[automation]`.
- Data lens: N/A — docs-only move/index; no schema, lineage, or PII-store impact.

## 5. Out of Scope

- Other lanes (engineering, security, people, single-demo, quality-gate/*) — Cross-domain request to montilla; their owners consolidate their own lanes.
- `SPEC-*.md` in any lane — not a singleton type; trace anchors stay.
- Renaming numbered-store or archive files; plugin/skill edits; key rotation/prod changes (Guardrail 4).
- Resolving content substance beyond index + reference — deep merges need per-variant specs.

## 6. Dependencies

| Dependency | Status | Effect |
|------------|--------|--------|
| Brief approval 2026-09-18 | present | Scope + singleton set + HARD constraints |
| `50_archive/` writable | present | Archive target for moved original |
| Engineering precedent commit `07a75de` | shipped | Shape + min-gate 4/4 pattern reused |
| Other-lane owners | pending | Cross-domain request via montilla |

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001 | PROPOSED_CHANGES.md | glob counts per type |
| REQ-002 | AC-002 | PROPOSED_CHANGES.md | archive listing + hash match |
| REQ-003 | AC-003 | PROPOSED_CHANGES.md | record tables in canonicals |
| REQ-NF-001/002 | AC-004 | PROPOSED_CHANGES.md | scan output + HANDOFF rollback note |
