# Requirements Index: Per-Lane Singleton Consolidation (Security)

**Owner:** barrera (CISO) — domain chain owner, security
**Brief Reference:** bounded singleton brief approved 2026-09-18 (per-lane singleton rule)
**Domains-Touched:** [security]
**Spec:** docs/specs/40_workspace/security/SPEC-singleton-consolidation-security.md
**Execution_Mode:** single

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-001 | One canonical file per each of the 9 UPPER_SNAKE types in `40_workspace/security/` — create if missing, update in place, never suffix | P0 | Bounded brief 2026-09-18 | SPEC-singleton-consolidation-security | security | review + glob counts |
| REQ-002 | Suffixed variants consolidated into canonicals; originals moved to `50_archive/` byte-identical (SHA256); zero deletions; lane `SPEC-*.md` untouched | P0 | Brief HARD (no purge) | SPEC-singleton-consolidation-security | security | review + archive listing + hash log |
| REQ-003 | Security-type strays mapped into the 9: 6× `SECURITY_REVIEW*` → `ARCHITECTURE_REVIEW.md` review index; 4× `THREAT*` → `ARCHITECTURE_REVIEW.md` model index; none remain in lane | P0 | Singleton rule itself | SPEC-singleton-consolidation-security | security | review + index |
| REQ-004 | Each canonical carries a consolidation record (source → archive path) | P1 | Brief (traceability) | SPEC-singleton-consolidation-security | security | review |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | No purge, no repo-wide lock (only security lane + archive touched), no secrets/PII in indexes | Security / Operability | Move log + pattern scan = prohibition clauses only |
| REQ-NF-002 | Rollback: archived originals move back per consolidation record; ETA < 15 min | Operability | Rollback note in HANDOFF |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| security | STRIDE-indexed review record preserved by reference (verdicts + dates + archive paths, no PII/secret values) | barrera |

## Traceability Anchor

| Layer | Files | REQ-IDs |
|-------|-------|---------|
| Workspace lane | `docs/specs/40_workspace/security/` (9 canonicals + SPEC anchor) | REQ-001..004 |
| Archive | `docs/specs/50_archive/` (moved originals) | REQ-002, REQ-003 |
| Requirements | this index | all |
