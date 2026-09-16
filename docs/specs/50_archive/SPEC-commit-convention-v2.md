# Spec: Commit Convention v2 — Work-Unit Scope Syntax

**ID:** SPEC-commit-convention-v2
**Owner:** vasquez (CTO)
**Domains-Touched:** [engineering]
**Brief Reference:** BRIEF-commit-convention-v2
**Status:** draft
**Priority:** P2
**Execution_Mode:** single

## 1. Context

The commit convention (`skills/using-frame-ship/references/commit-convention.md`) guides per-stage commit format across all 9 frame-ship stages. Current gaps: rigid 1-commit-per-stage defaults, flat scope syntax that doesn't encode work units, and inconsistent splitting guidance (only `execute-spec` mandates per-task commits). This spec defines a work-unit scope syntax and explicit splitting rules so agents produce atomic, traceable commits.

## 2. Requirements

- REQ-001: Define a work-unit scope syntax of the form `type(<stage>/<work-unit>): subject` where `<stage>` is the frame-ship stage and `<work-unit>` is the unit identifier (brief slug, spec ID, REQ-ID, ADR number, release version).
- REQ-002: Mandate multiple commits when work units are distinct — different REQ-IDs, different briefs, different specs, or different concerns (code vs. docs) each get their own commit.
- REQ-003: Define explicit splitting criteria (when to split) and batching criteria (when grouping is allowed) for all 9 stages.
- REQ-004: Update the scope-per-stage table to use the new work-unit syntax with per-stage work-unit identifiers.
- REQ-005: Update all examples to use the new scope syntax.
- REQ-006: Preserve the "guidance only" status — commit format never fails quality-gate or blocks verify-handoff.

## 3. Acceptance Criteria

- [ ] AC-001: `commit-convention.md` documents the `type(<stage>/<work-unit>): subject` syntax with a definition of "work unit" per stage.
- [ ] AC-002: Splitting rules state that distinct work units require separate commits, with concrete examples.
- [ ] AC-003: Batching rules state when grouping is allowed (same work unit, plan explicitly groups, same stage).
- [ ] AC-004: Scope-per-stage table uses `<stage>/<work-unit>` syntax for all 9 stages.
- [ ] AC-005: All examples use the new syntax; no stale `docs(brief-auth)` style examples remain.
- [ ] AC-006: "Guidance only" clause remains explicit in the file.

## 4. Contracts & Interfaces

No API/data contracts. File contract: `skills/using-frame-ship/references/commit-convention.md` remains the single source of truth; all 9 stage SKILL.md files reference it by path (unchanged).

## 5. Out of Scope

- Changing the commit header format (type + scope + subject stays).
- Modifying stage SKILL.md files.
- Adding gate enforcement.
- Rewriting git history.

## 6. Dependencies

- BRIEF-commit-convention-v2 (approved)
- Existing `commit-convention.md` (current content read)

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001 | PROPOSED_CHANGES.md | commit-convention.md §Format |
| REQ-002 | AC-002 | PROPOSED_CHANGES.md | commit-convention.md §Splitting |
| REQ-003 | AC-002, AC-003 | PROPOSED_CHANGES.md | commit-convention.md §Splitting/§Batching |
| REQ-004 | AC-004 | PROPOSED_CHANGES.md | commit-convention.md §Scope table |
| REQ-005 | AC-005 | PROPOSED_CHANGES.md | commit-convention.md §Examples |
| REQ-006 | AC-006 | PROPOSED_CHANGES.md | commit-convention.md §Format |