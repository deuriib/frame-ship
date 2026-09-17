# Implementation Plan: SPEC-brainstorm-frame-intent-engineering

**Agent:** engineering owner (skill execute-spec)
**Date:** 2026-09-16
**Approved By:** engineering owner (arch Approved ADR-006); people-owner tone check carried, not blocking
**Domains-Touched:** [engineering, people]

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Rewrite §3 with classify-first + HARD-GATE + one-at-a-time + framings/YAGNI + decompose + sectioned approval + self-review + Red Flags | skills/frame-intent/SKILL.md | TEST_MATRIX-brainstorm-frame-intent | 1h |
| 2 | Add Classification / Framings-considered / Approval placeholders | skills/frame-intent/references/product-brief.md | TEST_MATRIX-brainstorm-frame-intent | 0.5h |
| 3 | Verify okr-template (no drift → explicit no-change note) + frontmatter/shape/security self-check | skills/frame-intent/ | TEST_MATRIX-brainstorm-frame-intent | 0.5h |

## Order of Operations

SKILL first (gates define template fields), then product-brief fields, then verification — template depends on skill wording.

## Rollback Points

Revert execute commit(s); delete added brief fields. Owner engineering owner.

## Quality Gates

- [x] Engineering: frontmatter/body-shape/security-conditions check passing
- [x] People: people-owner tone check on Red Flags + elicitation wording
