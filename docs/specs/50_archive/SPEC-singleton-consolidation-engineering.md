# Spec: Per-Lane Singleton Consolidation — Engineering Lane

**ID:** SPEC-singleton-consolidation-engineering
**Owner:** vasquez (CTO) — domain chain owner, engineering
**Domains-Touched:** [engineering]
**Brief Reference:** bounded chat-brief approved 2026-09-18 (per-lane singleton rule)
**Status:** approved (chat-brief is the approval; single mode, direct)
**Priority:** P0
**Execution_Mode:** single (direct, no further task dispatch, min gate)

## 1. Context

The chat-brief (approved 2026-09-18) imposes a per-lane singleton rule: max one file per type per `docs/specs/40_workspace/<lane>/` for 9 UPPER_SNAKE-canonical types — `RELEASE_NOTES.md`, `ARCHITECTURE_REVIEW.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `PROPOSED_CHANGES.md`, `TEST_MATRIX.md`, `ARCHITECTURE.md`, `API_CONTRACT.md` — create if missing else update in place, never suffix. Existing suffixed variants consolidate into the canonical and originals move to `50_archive/` (no purge, no repo-wide lock).

The engineering lane is the breach: 63 files at spec time, of which ~57 are suffixed variants of the 9 singleton types (6× ARCHITECTURE_REVIEW-*, 1× DRILL-*, 14× HANDOFF-*, 11× IMPLEMENTATION_PLAN-*, 15× PROPOSED_CHANGES-*, 10× TEST_MATRIX-*). Only `PROPOSED_CHANGES.md` exists in canonical form (holding hidden-flag content, which must itself be archived-by-reference before reuse). Scope is per-lane: engineering lane only. Security/people/automation/single-demo/quality-gate lanes are other owners' lanes — flagged as a Cross-domain request to the orchestrator (montilla), not touched.

## 2. Requirements

- **REQ-001 (F, P0):** For each of the 9 canonical types, exactly one file exists in `docs/specs/40_workspace/engineering/` after consolidation: create if missing, update in place if present, never with a suffix. Canonical filename is UPPER_SNAKE exactly as briefed.
- **REQ-002 (F, P0):** Every suffixed variant of a singleton type in the engineering lane is consolidated (substance carried forward by index + reference, not full paste) into its canonical file, and the original moved to `docs/specs/50_archive/` under its original filename. Zero deletions. `SPEC-*.md` files (3) are out of scope — SPEC is not one of the 9 singleton types.
- **REQ-003 (F, P0):** The pre-existing canonical `PROPOSED_CHANGES.md` (hidden-flag content, 2026-09-17) is preserved by copy to `50_archive/PROPOSED_CHANGES-hidden-flag.md` before the canonical is reused for this lane's proposal; the new canonical references the archived prior.
- **REQ-004 (F, P1):** Each canonical file carries a consolidation record (source → archive path table) so history stays traceable after the move.
- **REQ-NF-001 (NF, P0):** No purge (every move is copy-then-verify-then-delete-original, archive holds the original bytes), no repo-wide lock (only `40_workspace/engineering/` + `50_archive/` touched), no secrets/PII in consolidation indexes.
- **REQ-NF-002 (NF, P1):** Rollback = move archived originals back per the consolidation record; ETA < 15 min; owner vasquez.

## 3. Acceptance Criteria

- [ ] AC-001 (REQ-001): Glob of `40_workspace/engineering/` shows exactly 9 canonical files for the 9 types (plus out-of-scope `SPEC-*.md` trio, untouched); no suffixed variant of the 9 types remains.
- [ ] AC-002 (REQ-002): Every archived original exists in `50_archive/` byte-identical (spot-check ≥3); zero `git deleted`-without-archive (no purge).
- [ ] AC-003 (REQ-003): `50_archive/PROPOSED_CHANGES-hidden-flag.md` exists with the prior content; new canonical `PROPOSED_CHANGES.md` references it.
- [ ] AC-004 (REQ-004): Each canonical file contains its consolidation record table.
- [ ] AC-005 (REQ-NF-001/002): Changed-files scan shows prohibition clauses only; rollback note in HANDOFF.

## 4. Contracts & Interfaces

- Canonical set (exact): `RELEASE_NOTES.md`, `ARCHITECTURE_REVIEW.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `PROPOSED_CHANGES.md`, `TEST_MATRIX.md`, `ARCHITECTURE.md`, `API_CONTRACT.md` in `docs/specs/40_workspace/engineering/`.
- Lane-level `ARCHITECTURE.md` / `API_CONTRACT.md` link to the numbered-store truth (`docs/specs/10_design/ARCHITECTURE.md`, `API_CONTRACTS.md`) — index, not fork.
- Packet: `SPEC:docs/specs/40_workspace/engineering/SPEC-singleton-consolidation-engineering.md#REQ-001..004+NF / HARD:single+per-lane+archive-no-purge / GATE:none-yet / DOMAINS:[engineering]`.
- Data lens: N/A — docs-only move/index; no schema, lineage, or PII-store impact.

## 5. Out of Scope

- Other lanes (security, people, automation, single-demo, quality-gate/*) — Cross-domain request to montilla; their owners consolidate their own lanes.
- `SPEC-*.md` trio in the engineering lane — not a singleton type; trace anchors stay.
- Renaming numbered-store or archive files; plugin/skill edits; key rotation/prod changes (Guardrail 4).
- Resolving content conflicts between suffixed variants beyond index + latest-wins note — deep merges need per-variant specs.

## 6. Dependencies

| Dependency | Status | Effect |
|------------|--------|--------|
| Chat-brief approval 2026-09-18 | present | Scope + singleton set + HARD constraints |
| `50_archive/` writable | present | Archive target for moved originals |
| Other-lane owners | pending | Cross-domain request via montilla for non-engineering lanes |

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001 | PROPOSED_CHANGES.md | glob counts per type |
| REQ-002 | AC-002 | PROPOSED_CHANGES.md | archive listing + spot-check diffs |
| REQ-003 | AC-003 | PROPOSED_CHANGES.md | archived prior + reference line |
| REQ-004 | AC-004 | PROPOSED_CHANGES.md | record tables in canonicals |
| REQ-NF-001/002 | AC-005 | PROPOSED_CHANGES.md | scan output + HANDOFF rollback note |
