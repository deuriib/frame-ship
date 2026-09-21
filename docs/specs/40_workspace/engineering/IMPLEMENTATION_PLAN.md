# Implementation Plan: SPEC-subagents-naming-engineering

**Agent:** vasquez-specialist (engineering specialist under Vasquez)
**Date:** 2026-09-20
**Approved By:** vasquez (engineering owner), santana (people owner), barrera (security owner), montilla (orchestrator)
**Domains-Touched:** [engineering]

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Update `translate-to-spec` SKILL and template to `subagents` (REQ-ENG-001) | `skills/translate-to-spec/SKILL.md`, `skills/translate-to-spec/references/spec-template.md` | `docs/specs/40_workspace/engineering/TEST_MATRIX.md#T-ENG-001` | 0.25h |
| 2 | Update `execute-spec` SKILL chain contract and pre-flight to `subagents` (REQ-ENG-002) | `skills/execute-spec/SKILL.md` | `docs/specs/40_workspace/engineering/TEST_MATRIX.md#T-ENG-002` | 0.25h |
| 3 | Update `quality-gate` SKILL and gate report template to `subagents` (REQ-ENG-003) | `skills/quality-gate/SKILL.md`, `skills/quality-gate/references/gate-report.md` | `docs/specs/40_workspace/engineering/TEST_MATRIX.md#T-ENG-003` | 0.25h |
| 4 | Update proposal template and DoD checklist template to `subagents` (REQ-ENG-004) | `skills/propose-changes/references/proposal-template.md`, `skills/verify-handoff/references/dod-checklist.md` | `docs/specs/40_workspace/engineering/TEST_MATRIX.md#T-ENG-004` | 0.25h |
| 5 | Update `git-worktree` SKILL purpose and process to `subagents` (REQ-ENG-005 / REQ-ENG-004) | `skills/git-worktree/SKILL.md` | `docs/specs/40_workspace/engineering/TEST_MATRIX.md#T-ENG-005` | 0.25h |
| 6 | Update catalog and documentation files to `subagents` and index ADR-009 (REQ-ENG-006) | `skills/AGENTS.md`, `docs/AGENTS.md`, `docs/specs/AGENTS.md`, `AGENTS.md` | `docs/specs/40_workspace/engineering/TEST_MATRIX.md#T-ENG-006` | 0.50h |
| 7 | Generate test evidence matrix and verify zero typecheck errors (REQ-NF-001..005) | `docs/specs/40_workspace/engineering/TEST_MATRIX.md` | `docs/specs/40_workspace/engineering/TEST_MATRIX.md` | 0.25h |

Each step maps to one commit with strict REQ-ID trace in commit subject and body.

## Order of Operations

1. **Stage Skills & Linked References First (Steps 1–5):** Core operational skills define the normative pre-flight and execution contracts (`W-SUBAGENTS`, `W-SEQ`). Updating skills and their paired templates guarantees normative alignment across the Frame→Ship chain stages.
2. **Catalogs and Global Knowledge Bases (Step 6):** Supporting catalogs (`skills/AGENTS.md`, `docs/AGENTS.md`, `docs/specs/AGENTS.md`, `AGENTS.md`) reference stage mechanics and must reflect the unified `subagents` nomenclature and `ADR-001..009` registry after skills are aligned.
3. **Verification and Matrix (Step 7):** Comprehensive verification of zero `multi-subagents` residue across all active engineering files, static check of immutability in `50_archive/`, and execution of `mise run typecheck` to prove zero regressions.

## Rollback Points

- All changes are text and documentation in Git.
- Each step is committed as an isolated, atomic commit linked to its REQ-ID.
- Rollback can be executed immediately via `git revert <commit-sha>` or `git revert HEAD~N..HEAD` in ≤15 minutes by engineering owner (vasquez).
- Non-code undo: No external services, APIs, databases, or third-party platforms touched.

## Quality Gates

Domain checks:

- [x] Engineering: Zero typecheck errors (`mise run typecheck`), zero residue of `multi-subagents` in active engineering files, strict REQ-ID traceability.
- [x] Security: Zero secrets/PII introduced (Ley 172-13 compliance), historical audit immutability preserved.
- [x] People: Shared contracts (`W-SUBAGENTS`, `W-SEQ`) match people lane byte-for-byte.
