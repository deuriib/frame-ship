# Requirements Index: Per-Lane Singleton Consolidation (Automation)

**Owner:** espinoza (Senior Automation Consultant) - domain chain owner, automation/ops
**Brief Reference:** bounded singleton brief approved 2026-09-18 (per-lane singleton rule)
**Domains-Touched:** [automation/ops]
**Spec:** docs/specs/40_workspace/automation/SPEC-singleton-consolidation-automation.md
**Execution_Mode:** single

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-001 | One canonical file per each of the 9 UPPER_SNAKE types in `40_workspace/automation/` - create if missing, update in place, never suffix | P0 | Brief 2026-09-18 | SPEC-singleton-consolidation-automation | automation/ops | review + glob counts |
| REQ-002 | Suffixed variant `HANDOFF-git-worktree.md` consolidated into canonical `HANDOFF.md`; original moved to `50_archive/` byte-identical; zero deletions; `SPEC-*.md` untouched | P0 | Brief HARD (no purge) | SPEC-singleton-consolidation-automation | automation/ops | review + archive listing + hash match |
| REQ-003 | Each canonical carries a consolidation record (source → archive path); 8 types with no prior variant record "created new - no prior variant" | P1 | Brief (traceability) | SPEC-singleton-consolidation-automation | automation/ops | review |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | No purge, no repo-wide lock (only automation lane + archive touched), no secrets/PII in indexes | Security / Operability | Move log + pattern scan = prohibition clauses only |
| REQ-NF-002 | Rollback: archived original moves back per consolidation record; ETA < 10 min | Operability | Rollback note in HANDOFF |

## ROI Contract

| Field | Value |
|-------|-------|
| Before | 1 suffixed variant, 0 canonicals - lookup needs suffix knowledge |
| After | 9 canonicals, 0 suffixed - single predictable path per type |
| Saving | ~5 min/search saved on every future automation write; one-time cost < 10 min |
| Validation | glob counts + hash-verify + TEST_MATRIX AC-001..004 |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| automation/ops | Lane-level ARCHITECTURE.md/API_CONTRACT.md link (not fork) the numbered-store truth; runbook substance stays referenced by path | espinoza |

## Traceability Anchor

| Layer | Files | REQ-IDs |
|-------|-------|---------|
| Workspace lane | `docs/specs/40_workspace/automation/` (9 canonicals + this SPEC) | REQ-001..003 |
| Archive | `docs/specs/50_archive/HANDOFF-git-worktree-automation.md` (moved original) | REQ-002 |
| Requirements | this index | all |
