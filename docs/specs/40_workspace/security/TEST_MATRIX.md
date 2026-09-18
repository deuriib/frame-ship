# Test / Evidence Matrix: SPEC-singleton-consolidation-security

**Agent:** barrera (CISO) — domain chain owner, security
**Date:** 2026-09-18
**Domains-Touched:** [security]
**Skill:** `skills/execute-spec/SKILL.md`

| REQ-ID | Evidence ID | Description | Type | Status |
|--------|-------------|-------------|------|--------|
| REQ-001 | T-001 | Lane glob shows exactly the 9 canonicals + SPEC anchor; 0 suffixed variants; 0 `SECURITY_REVIEW*`/`THREAT*` strays (glob counts below) | Review | pass |
| REQ-002 | T-002 | 14/14 originals in `50_archive/` SHA256-identical to pre-move hashes; `git status` shows moves only, zero deletions-without-archive | Attestation | pass |
| REQ-003 | T-003 | `ARCHITECTURE_REVIEW.md` indexes 6/6 reviews (1 Approved + 5 Conditional) and 4/4 threat models with date + archive path each | Review | pass |
| REQ-004 | T-004 | 9/9 canonicals contain a Consolidation Record table (4 created = "created, no source") | Review | pass |
| REQ-NF-001 | T-005 | Secret/PII-shape scan over new/edited lane content = prohibition clauses only; changed-files scan = security lane + archive only | Review | pass |

## Evidence

- T-001: `Get-ChildItem 40_workspace/security` → 10 files (9 canonical + SPEC); `*-*` suffix glob → 0 hits; `SECURITY_REVIEW*`/`THREAT*` glob → 0 hits.
- T-002: SHA256 pre/post log (14 rows, all match) — recorded at execute commit.
- T-005: tight credential-shape + SSN/email-shape scans → 0 real values; `git status --porcelain` → only `40_workspace/security/` + `50_archive/` + `15_requirements/` paths.

## Consolidation Record

| Source → Archive path |
|-----------------------|
| `TEST_MATRIX-git-worktree-security.md` → `docs/specs/50_archive/TEST_MATRIX-git-worktree-security.md` (8/8 REQ-SEC T-001..T-008 pass, by reference) |
