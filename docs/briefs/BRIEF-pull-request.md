# Product Brief: Adapt pull-request skill to frame-ship (frame-ship-specific)

**ID:** BRIEF-pull-request
**Initiator:** orchestrator
**Date:** 2026-09-16
**Status:** approved
**Execution_Mode:** single (frozen at frame-intent per initiator instruction 2026-09-16; all specs follow unless overridden per SPEC with orchestrator waiver)
**Domains-Touched:** [engineering, automation/ops]

## Problem Statement

frame-ship has no standardized branch + PR workflow skill. Contributors and agents open PRs ad hoc, with no branch naming, PR body, budget, or local-check contract. The Gentle AI `branch-pr v2.0` skill solves this (issue-first, single type label, 400-line budget, Conventional Commits) but targets Go + its repo. It matters now because frame-ship needs a repeatable, frame-ship-specific PR path.

## Desired Outcome

One new skill `skills/pull-request/SKILL.md` (name `pull-request`) that ports the Gentle AI discipline to frame-ship: branch naming, PR body template, review budget, conventional commits, and frame-ship local checks (`mise run typecheck`) — so every PR is small, traceable, and gate-ready.

## Scope

### In Scope

- New `skills/pull-request/SKILL.md` with frame-ship frontmatter (`name`/`description` only) + fixed body shape [engineering]
- Branch naming + PR body + 400-line budget + Conventional Commits adapted to frame-ship [engineering]
- Local checks mapped to frame-ship toolchain (`mise run typecheck`, no Go/E2E Docker) [automation/ops]

### Out of Scope

- Runtime/plugin code changes (no `.opencode/plugins/` edits)
- CI workflow files, GitHub label automation
- Renaming existing skills

## Stakeholders

| Role | Agent | Involvement |
|------|-------|-------------|
| Sponsor | orchestrator | Decision authority |
| Owner | engineering owner | Delivery ownership |
| Touched | automation owner | Toolchain check mapping |

## Constraints

- Budget: none (docs-only skill)
- Timeline: single session work unit, reversible via `git revert`
- Regulatory: Ley 172-13 minimization — no PII/secrets in skill or examples
- Brand/GTM: N/A
- People/change: N/A

## Open Questions

- [x] Mode? `single` direct — frozen per initiator 2026-09-16
- [x] Scope? frame-ship-specific — frozen per initiator 2026-09-16
