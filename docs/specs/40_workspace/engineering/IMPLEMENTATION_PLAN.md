# Implementation Plan: SPEC-agents-roster-engineering

**Agent:** vasquez (engineering owner) & engineering-specialist
**Date:** 2026-09-21
**Approved By:** vasquez (engineering owner), barrera (security owner)
**Domains-Touched:** [engineering, security, automation]

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Create `agents/` directory structure and `orchestrator.md` | `agents/orchestrator.md` | `agents/orchestrator.md` | 0.5h |
| 2 | Create 8 Domain Owners with least privilege coordination tools | `agents/{vasquez,barrera,dauhajre,subero,vera,santana,montero,espinoza}.md` | `agents/*.md` | 1.5h |
| 3 | Create 8 Fused Domain Specialists with scoped craft tools | `agents/*-specialist.md` | `agents/*-specialist.md` | 2.0h |
| 4 | Create 14 Quality Gate Reviewers with strictly read-only tools | `agents/{review-*,qa,*reviewer}.md` | `agents/*.md` | 1.5h |
| 5 | Verify YAML frontmatter parsing and tool isolation across all files | `agents/` | `TEST_MATRIX.md` | 0.5h |

## Order of Operations

1. Establish directory layout and Orchestrator tier first to anchor leadership.
2. Define Domain Owners tier next to establish domain governance and delegation boundaries.
3. Define Fused Domain Specialists to equip each domain with its authoritative execution craft.
4. Define Quality Gate Reviewers to ensure independent gate evaluation.
5. Audit all frontmatter and tool permissions against least-privilege invariants (INV-009, INV-010).

## Rollback Points

- Safe rollback point after any step: `git checkout HEAD -- agents/` or `git rm -r agents/`.
- Zero database or runtime dependencies affected.

## Quality Gates

- [x] Engineering: YAML frontmatter clean, strict tool matrix matching spec, no syntax errors.
- [x] Security: Zero write/bash tools in reviewers/leaders, no hardcoded secrets or PII (Ley 172-13).
- [x] Automation/Ops: Files standard markdown, compatible with agent harnesses.
