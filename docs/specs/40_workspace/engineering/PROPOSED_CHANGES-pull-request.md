# Proposed Changes: engineering owner

**Spec Reference:** SPEC-pull-request
**Agent:** engineering owner
**Date:** 2026-09-16
**Execution_Mode:** single
**Domains-Touched:** [engineering, automation/ops]

## Summary

Create `skills/pull-request/SKILL.md` (+ `references/` templates) porting Gentle AI branch-pr v2.0 to frame-ship. Skill-only docs change; no runtime edits.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `skills/pull-request/SKILL.md` | file-create | New skill: naming, PR body, 400-line budget, commits, `mise run typecheck` checks |
| `skills/pull-request/references/pr-body-template.md` | file-create | PR body template (linked spec/issue, summary, changes, test plan, checklist) |
| `skills/pull-request/references/branch-commit-guide.md` | file-create | Branch naming + Conventional Commits guide |

## Rationale

Satisfies REQ-001–REQ-007: exact frontmatter + body shape, frame-ship toolchain mapping, budget and trace rules.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Generic (keep Go/E2E) | Rejected per initiator: frame-ship-specific frozen |
| Plugin/CI automation | Out of scope; docs skill only |

## Approval Required From

- [x] Owning domain owner: engineering owner (self-proposal, orchestrator approves at gate)
- [ ] engineering owner (no arch/API impact — review-architecture waived with rationale)
- [ ] security owner (no auth/data/API/PII — review-security waived with rationale)

> **Rule:** No repository file modifications during proposal phase. For non-code domains, no external sends/filings/launches during proposal phase either.

## Risk Assessment

Blast radius: docs-only skill; no systems/teams/customers/regulators/revenue impact. Rollback: `git revert` single commit. No secrets/PII in examples.
