# Requirements Index: Per-Lane Singleton Consolidation (Engineering)

**Owner:** vasquez (CTO) — domain chain owner, engineering
**Brief Reference:** bounded chat-brief approved 2026-09-18 (per-lane singleton rule)
**Domains-Touched:** [engineering]
**Spec:** docs/specs/40_workspace/engineering/SPEC-singleton-consolidation-engineering.md
**Execution_Mode:** single

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-001 | One canonical file per each of the 9 UPPER_SNAKE types in `40_workspace/engineering/` — create if missing, update in place, never suffix | P0 | Chat-brief 2026-09-18 | SPEC-singleton-consolidation-engineering | engineering | review + glob counts |
| REQ-002 | Suffixed variants consolidated into canonicals; originals moved to `50_archive/` byte-identical; zero deletions; `SPEC-*.md` trio untouched | P0 | Chat-brief HARD (no purge) | SPEC-singleton-consolidation-engineering | engineering | review + archive listing + spot diffs |
| REQ-003 | Pre-existing canonical `PROPOSED_CHANGES.md` (hidden-flag) preserved by copy to `50_archive/PROPOSED_CHANGES-hidden-flag.md` before reuse, referenced from new canonical | P0 | Singleton rule itself | SPEC-singleton-consolidation-engineering | engineering | filing-proof + review |
| REQ-004 | Each canonical carries a consolidation record (source → archive path) | P1 | Chat-brief (traceability) | SPEC-singleton-consolidation-engineering | engineering | review |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | No purge, no repo-wide lock (only engineering lane + archive touched), no secrets/PII in indexes | Security / Operability | Move log + pattern scan = prohibition clauses only |
| REQ-NF-002 | Rollback: archived originals move back per consolidation record; ETA < 15 min | Operability | Rollback note in HANDOFF |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| engineering | Lane-level ARCHITECTURE.md/API_CONTRACT.md link (not fork) the numbered-store truth (`10_design/ARCHITECTURE.md`, `API_CONTRACTS.md`) | vasquez |

## Traceability Anchor

| Layer | Files | REQ-IDs |
|-------|-------|---------|
| Workspace lane | `docs/specs/40_workspace/engineering/` (9 canonicals) | REQ-001..004 |
| Archive | `docs/specs/50_archive/` (moved originals) | REQ-002, REQ-003 |
| Requirements | this index | all |
