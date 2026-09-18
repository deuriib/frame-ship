# Requirements Index: Per-Lane Singleton Consolidation (Single-Demo)

**Owner:** general (administrative owner, single-demo lane)
**Brief Reference:** bounded singleton brief approved 2026-09-18 (per-lane singleton rule)
**Domains-Touched:** [administrative]
**Spec:** docs/specs/40_workspace/single-demo/SPEC-singleton-consolidation-single-demo.md
**Execution_Mode:** single
**Skill:** `D:\GitHub\frame-ship\skills\translate-to-spec\SKILL.md`

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-001 | One canonical file per each of the 9 UPPER_SNAKE types in `40_workspace/single-demo/` - create if missing, update in place, never suffix | P0 | Brief 2026-09-18 | SPEC-singleton-consolidation-single-demo | administrative | review + glob counts |
| REQ-002 | 3 variants (`RELEASE_NOTES-demo.md`, `implementation-plan.md`, `test-matrix.md`) consolidated into canonicals; originals moved to `50_archive/` byte-identical (`-single-demo` infix); zero deletions; SPECs + non-singleton evidence untouched | P0 | Brief HARD (no purge) | SPEC-singleton-consolidation-single-demo | administrative | review + archive listing + SHA256 match |
| REQ-003 | Each canonical carries a consolidation record (source → archive path); 3 created-new types record "no prior variant"; 3 updated-in-place record prior canonical preserved | P1 | Brief (traceability) | SPEC-singleton-consolidation-single-demo | administrative | review |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | No purge, no repo-wide lock (only single-demo lane + archive + this index touched), no secrets/PII in indexes; no `30_delivery/` touch per HARD per-lane scope | Security / Operability | Move log + pattern scan = prohibition clauses only |
| REQ-NF-002 | Rollback: archived originals move back per consolidation record; ETA < 10 min | Operability | Rollback note in HANDOFF |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| administrative | Lane-level ARCHITECTURE.md/API_CONTRACT.md link (not fork) the numbered-store truth; docs-fix demo substance referenced by path | general |

## Traceability Anchor

| Layer | Files | REQ-IDs |
|-------|-------|---------|
| Workspace lane | `docs/specs/40_workspace/single-demo/` (9 canonicals + 2 SPECs + non-singleton evidence) | REQ-001..003 |
| Archive | `docs/specs/50_archive/{RELEASE_NOTES-demo-single-demo,implementation-plan-single-demo,test-matrix-single-demo}.md` (moved originals) | REQ-002 |
| Requirements | this index | all |
