# Spec: Per-Lane Singleton Consolidation — People Lane

**ID:** SPEC-singleton-consolidation-people
**Owner:** santana (CHRO/CPO) — domain chain owner, people
**Domains-Touched:** [people]
**Brief Reference:** bounded singleton brief approved 2026-09-18 (per-lane singleton rule)
**Status:** approved (bounded brief is the approval; single mode, direct)
**Priority:** P0
**Execution_Mode:** single (direct, no further task dispatch, min gate)

## 1. Context

The bounded brief (approved 2026-09-18) imposes a per-lane singleton rule: max one file per type per `docs/specs/40_workspace/<lane>/` for 9 UPPER_SNAKE-canonical types — `RELEASE_NOTES.md`, `ARCHITECTURE_REVIEW.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `PROPOSED_CHANGES.md`, `TEST_MATRIX.md`, `ARCHITECTURE.md`, `API_CONTRACT.md` — create-if-missing / update-in-place / never-suffix. Suffixed variants consolidate into the canonical; originals move to `50_archive/` byte-identical (copy → hash-verify → delete, no purge, no repo-wide lock). Precedents: engineering `07a75de`, automation lane, security lane (`5d2c897` lineage).

The people lane is the breach: 8 files at spec time, of which 7 are suffixed variants of 4 singleton types (1× HANDOFF-*, 2× IMPLEMENTATION_PLAN-*, 2× PROPOSED_CHANGES-*, 2× TEST_MATRIX-*) and 0 of the 9 canonicals exist. The 8th file (`SPEC-single-dispatcher-people.md`) is out of scope — SPEC is not one of the 9 singleton types. Scope is per-lane: people lane only. All other lanes belong to their owners — flagged as Cross-domain request to montilla (orchestrator), never touched here (no sideways).

## 2. Requirements

- **REQ-001 (F, P0):** For each of the 9 canonical types, exactly one file exists in `docs/specs/40_workspace/people/` after consolidation: create-if-missing, update-in-place if present, never with a suffix. Canonical filename is UPPER_SNAKE exactly as briefed.
- **REQ-002 (F, P0):** Every suffixed variant in the people lane is consolidated (substance carried forward by index + reference, not full paste) into its canonical file, and the original moved to `docs/specs/50_archive/` byte-identical. Zero deletions. Lane `SPEC-*.md` files (this spec + `SPEC-single-dispatcher-people.md`) are out of scope — SPEC is not one of the 9 singleton types.
- **REQ-003 (F, P0):** Two-variant types resolve latest-wins + index-both: `IMPLEMENTATION_PLAN.md` indexes both sources (single-dispatcher = agent-rules outcome, git-worktree = announce-template outcome); `PROPOSED_CHANGES.md` (this consolidation's proposal) supersedes both prior proposals by reference; `TEST_MATRIX.md` carries forward both evidence maps (single-dispatcher grep suite + git-worktree E-001..E-005/C-006); `HANDOFF.md` supersedes `HANDOFF-git-worktree.md` by pointer table.
- **REQ-004 (F, P1):** Each canonical file carries a consolidation record (source → archive path table) so history stays traceable after the move. For the 5 types with no prior variant, the record notes "created new — no prior variant; singleton slot established."
- **REQ-NF-001 (NF, P0):** No purge (every move is copy → hash-verify → delete-original, archive holds the original bytes), no repo-wide lock (only `40_workspace/people/` + `50_archive/` touched), no secrets/PII in consolidation indexes.
- **REQ-NF-002 (NF, P1):** Rollback = move archived originals back per the consolidation record; ETA < 15 min (7-file move); owner santana.

## 3. Acceptance Criteria

- [ ] AC-001 (REQ-001): Glob of `40_workspace/people/` shows exactly the 9 canonical files for the 9 types (plus out-of-scope `SPEC-*.md` pair, untouched); no suffixed variant of the 9 types remains.
- [ ] AC-002 (REQ-002): Every archived original exists in `50_archive/` byte-identical (SHA256 match on all 7); zero deletions without archive (no purge).
- [ ] AC-003 (REQ-003): `IMPLEMENTATION_PLAN.md` / `PROPOSED_CHANGES.md` / `TEST_MATRIX.md` / `HANDOFF.md` each index both/all prior sources with verdicts + dates; no substance lost (pointer-complete).
- [ ] AC-004 (REQ-004): Each canonical file contains its consolidation record table/line.
- [ ] AC-005 (REQ-NF-001/002): Changed-files scan shows people lane + archive only; rollback note in HANDOFF.

## 4. Contracts & Interfaces

- Canonical set (exact): `RELEASE_NOTES.md`, `ARCHITECTURE_REVIEW.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `PROPOSED_CHANGES.md`, `TEST_MATRIX.md`, `ARCHITECTURE.md`, `API_CONTRACT.md` in `docs/specs/40_workspace/people/`.
- Source → canonical mapping (exact, 7 sources):
  | Source(s) | Canonical |
  |-----------|-----------|
  | `HANDOFF-git-worktree.md` | `HANDOFF.md` |
  | `IMPLEMENTATION_PLAN-git-worktree-people.md` + `IMPLEMENTATION_PLAN-single-dispatcher.md` | `IMPLEMENTATION_PLAN.md` |
  | `PROPOSED_CHANGES-git-worktree-people.md` + `PROPOSED_CHANGES-single-dispatcher.md` | `PROPOSED_CHANGES.md` (this unit's proposal supersedes both by reference) |
  | `TEST_MATRIX-git-worktree-people.md` + `TEST_MATRIX-single-dispatcher.md` | `TEST_MATRIX.md` |
  | (none — created) | `ARCHITECTURE.md`, `API_CONTRACT.md`, `DRILL.md`, `RELEASE_NOTES.md`, `ARCHITECTURE_REVIEW.md` |
- Archive names (collision-safe; bare names already taken in `50_archive/`):
  | Source | Archive path |
  |--------|--------------|
  | `HANDOFF-git-worktree.md` | `docs/specs/50_archive/HANDOFF-git-worktree-people.md` |
  | `IMPLEMENTATION_PLAN-git-worktree-people.md` | `docs/specs/50_archive/IMPLEMENTATION_PLAN-git-worktree-people.md` |
  | `IMPLEMENTATION_PLAN-single-dispatcher.md` | `docs/specs/50_archive/IMPLEMENTATION_PLAN-single-dispatcher-people.md` |
  | `PROPOSED_CHANGES-git-worktree-people.md` | `docs/specs/50_archive/PROPOSED_CHANGES-git-worktree-people.md` |
  | `PROPOSED_CHANGES-single-dispatcher.md` | `docs/specs/50_archive/PROPOSED_CHANGES-single-dispatcher-people.md` |
  | `TEST_MATRIX-git-worktree-people.md` | `docs/specs/50_archive/TEST_MATRIX-git-worktree-people.md` |
  | `TEST_MATRIX-single-dispatcher.md` | `docs/specs/50_archive/TEST_MATRIX-single-dispatcher-people.md` |
- Lane-level `ARCHITECTURE.md` / `API_CONTRACT.md` link to the numbered-store truth — index, not fork. People lane holds no separate architecture authority.
- Packet: `SPEC:docs/specs/40_workspace/people/SPEC-singleton-consolidation-people.md#REQ-001..004+NF / HARD:single+per-lane+archive-no-purge / GATE:none-yet / DOMAINS:[people]`.
- Data lens: N/A — docs-only move/index; no schema, lineage, or PII-store impact.

## 5. Out of Scope

- Other lanes (engineering shipped, automation shipped, security, single-demo, quality-gate/*) — Cross-domain request to montilla; their owners consolidate their own lanes.
- `SPEC-*.md` in the people lane — not a singleton type; trace anchors stay.
- Renaming numbered-store or archive files; plugin/skill edits; key rotation/prod changes (Guardrail 4).
- Resolving content conflicts between the two-variant pairs beyond index + latest-wins note — deep merges need per-variant specs.

## 6. Dependencies

| Dependency | Status | Effect |
|------------|--------|--------|
| Bounded brief approval 2026-09-18 | present | Scope + singleton set + HARD constraints |
| Engineering precedent `07a75de` + automation/security lanes | shipped | Mapping + min-gate 4/4 shape reused |
| `50_archive/` writable | present | Archive target for moved originals |

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001 | PROPOSED_CHANGES.md | glob counts per type |
| REQ-002 | AC-002 | PROPOSED_CHANGES.md | archive listing + SHA256 verify log |
| REQ-003 | AC-003 | PROPOSED_CHANGES.md | index tables in 4 merged canonicals |
| REQ-004 | AC-004 | PROPOSED_CHANGES.md | record tables in canonicals |
| REQ-NF-001/002 | AC-005 | PROPOSED_CHANGES.md | scan output + HANDOFF rollback note |
