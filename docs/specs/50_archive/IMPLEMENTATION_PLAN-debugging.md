# Implementation Plan: SPEC-debugging-engineering

**Agent:** engineering owner (skill execute-spec)
**Date:** 2026-09-16
**Approved By:** engineering owner (arch Approved) + security owner (Conditional S-001/S-002 carried)
**Domains-Touched:** [engineering, automation/ops]

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Create SKILL.md with Iron Law + 4 phases + sanitized examples | skills/debugging/SKILL.md | TEST_MATRIX-debugging | 1h |
| 2 | Create 3 references (tracing, defense-in-depth, condition-waiting) | skills/debugging/references/ | TEST_MATRIX-debugging | 1h |
| 3 | Frontmatter + body-shape + security-conditions self-check | skills/debugging/ | TEST_MATRIX-debugging | 0.5h |

## Order of Operations

SKILL first (gates define refs), then refs, then verification — refs depend on skill wording.

## Rollback Points

Delete `skills/debugging/`; revert execute commit. Owner engineering owner.

## Quality Gates

- [x] Engineering: frontmatter/body-shape/security-conditions check passing
- [x] Automation/ops: automation owner runbook note (bounded logging, no arbitrary timeouts)
