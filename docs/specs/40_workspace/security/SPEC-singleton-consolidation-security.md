# Spec: Per-Lane Singleton Consolidation — Security Lane

**ID:** SPEC-singleton-consolidation-security
**Owner:** barrera (CISO) — domain chain owner, security
**Domains-Touched:** [security]
**Brief Reference:** bounded singleton brief approved 2026-09-18 (per-lane singleton rule)
**Status:** approved (bounded brief is the approval; single mode, direct)
**Priority:** P0
**Execution_Mode:** single (direct, no further task dispatch, min gate)

## 1. Context

The bounded brief (approved 2026-09-18) imposes a per-lane singleton rule: max one file per type per `docs/specs/40_workspace/<lane>/` for 9 UPPER_SNAKE-canonical types — `RELEASE_NOTES.md`, `ARCHITECTURE_REVIEW.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `PROPOSED_CHANGES.md`, `TEST_MATRIX.md`, `ARCHITECTURE.md`, `API_CONTRACT.md` — create if missing else update in place, never suffix. Existing suffixed variants consolidate into the canonical and originals move to `50_archive/` (no purge, no repo-wide lock). Precedent: engineering lane shipped commit `07a75de`.

The security lane is the breach: 14 files at spec time, of which 13 are suffixed variants or non-singleton security types, and 0 of the 9 canonicals exist. Scope is per-lane: security lane only. Engineering lane (shipped) and all other lanes are out of scope — not touched, no sideways.

## 2. Requirements

- **REQ-001 (F, P0):** For each of the 9 canonical types, exactly one file exists in `docs/specs/40_workspace/security/` after consolidation: create if missing, update in place if present, never with a suffix. Canonical filename is UPPER_SNAKE exactly as briefed.
- **REQ-002 (F, P0):** Every suffixed variant in the security lane is consolidated (substance carried forward by index + reference, not full paste) into its canonical file, and the original moved to `docs/specs/50_archive/` under its original filename. Zero deletions. Lane `SPEC-*.md` (this spec) is out of scope — SPEC is not one of the 9 singleton types.
- **REQ-003 (F, P0):** Security-type strays map into the 9 as follows and archive after indexing: `SECURITY_REVIEW.md` + 5× `SECURITY_REVIEW-*.md` → `ARCHITECTURE_REVIEW.md` (security review index); 4× `THREAT_MODEL*.md` / `THREAT-MODEL-*.md` → `ARCHITECTURE_REVIEW.md` (threat-model index section). No `SECURITY_REVIEW*` / `THREAT*` file remains in the lane.
- **REQ-004 (F, P1):** Each canonical file carries a consolidation record (source → archive path table) so history stays traceable after the move.
- **REQ-NF-001 (NF, P0):** No purge (every move is copy-then-hash-verify-then-delete-original, archive holds the original bytes), no repo-wide lock (only `40_workspace/security/` + `50_archive/` touched), no secrets/PII in consolidation indexes.
- **REQ-NF-002 (NF, P1):** Rollback = move archived originals back per the consolidation record; ETA < 15 min; owner barrera.

## 3. Acceptance Criteria

- [ ] AC-001 (REQ-001): Glob of `40_workspace/security/` shows exactly the 9 canonical files for the 9 types (plus out-of-scope `SPEC-singleton-consolidation-security.md`, untouched); no suffixed variant and no `SECURITY_REVIEW*` / `THREAT*` stray remains.
- [ ] AC-002 (REQ-002/003): Every archived original exists in `50_archive/` byte-identical (SHA256 match on all 14); zero deletions without archive (no purge).
- [ ] AC-003 (REQ-003): `ARCHITECTURE_REVIEW.md` indexes all 6 security reviews (verdicts + dates) and all 4 threat models (methodology + scope refs).
- [ ] AC-004 (REQ-004): Each canonical file contains its consolidation record table.
- [ ] AC-005 (REQ-NF-001/002): Changed-files scan shows prohibition clauses only; rollback note in HANDOFF.

## 4. Contracts & Interfaces

- Canonical set (exact): `RELEASE_NOTES.md`, `ARCHITECTURE_REVIEW.md`, `DRILL.md`, `HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `PROPOSED_CHANGES.md`, `TEST_MATRIX.md`, `ARCHITECTURE.md`, `API_CONTRACT.md` in `docs/specs/40_workspace/security/`.
- Source → canonical mapping (exact, 14 sources):
  | Source(s) | Canonical |
  |-----------|-----------|
  | `HANDOFF-git-worktree.md` | `HANDOFF.md` |
  | `IMPLEMENTATION_PLAN-git-worktree-security.md` | `IMPLEMENTATION_PLAN.md` |
  | `PROPOSED_CHANGES-git-worktree-security.md` | `PROPOSED_CHANGES.md` |
  | `TEST_MATRIX-git-worktree-security.md` | `TEST_MATRIX.md` |
  | `SECURITY_REVIEW.md` + `SECURITY_REVIEW-agents-into-plugin.md` + `SECURITY_REVIEW-agy-plugin.md` + `SECURITY_REVIEW-debugging.md` + `SECURITY_REVIEW-git-worktree.md` + `SECURITY_REVIEW-single-dispatcher.md` | `ARCHITECTURE_REVIEW.md` (§Security review index) |
  | `THREAT_MODEL-agents-into-plugin.md` + `THREAT_MODEL-agy-plugin.md` + `THREAT_MODEL-git-worktree.md` + `THREAT-MODEL-debugging.md` | `ARCHITECTURE_REVIEW.md` (§Threat-model index) |
  | (none — created) | `ARCHITECTURE.md`, `API_CONTRACT.md`, `DRILL.md`, `RELEASE_NOTES.md` |
- Lane-level `ARCHITECTURE.md` / `API_CONTRACT.md` link to the numbered-store truth (`docs/specs/10_design/ARCHITECTURE.md`, `API_CONTRACTS.md`) — index, not fork. Security lane holds no separate architecture authority.
- Packet: `SPEC:docs/specs/40_workspace/security/SPEC-singleton-consolidation-security.md#REQ-001..004+NF / HARD:single+per-lane+archive-no-purge / GATE:none-yet / DOMAINS:[security]`.
- Data lens: N/A — docs-only move/index; no schema, lineage, or PII-store impact.

## 5. Out of Scope

- Other lanes (engineering shipped `07a75de`, people, automation, single-demo, quality-gate/*) — not touched; any cross-lane need goes as a formal Cross-domain request to montilla (none required).
- Renaming numbered-store or archive files; plugin/skill edits; key rotation/prod changes (Guardrail 4).
- Resolving content conflicts between suffixed variants beyond index + latest-wins note — deep merges need per-variant specs.
- `SPEC-*.md` in the security lane — not a singleton type; trace anchor stays.

## 6. Dependencies

| Dependency | Status | Effect |
|------------|--------|--------|
| Bounded brief approval 2026-09-18 | present | Scope + singleton set + HARD constraints |
| Engineering precedent `07a75de` | shipped | Mapping + min-gate shape reused |
| `50_archive/` writable | present | Archive target for moved originals |

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001 | PROPOSED_CHANGES.md | glob counts per type |
| REQ-002 | AC-002 | PROPOSED_CHANGES.md | archive listing + SHA256 verify log |
| REQ-003 | AC-003 | PROPOSED_CHANGES.md | review/model index in ARCHITECTURE_REVIEW.md |
| REQ-004 | AC-004 | PROPOSED_CHANGES.md | record tables in canonicals |
| REQ-NF-001/002 | AC-005 | PROPOSED_CHANGES.md | scan output + HANDOFF rollback note |
