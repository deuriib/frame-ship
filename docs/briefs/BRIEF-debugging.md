# Product Brief: debugging — systematic-debugging adapted to frame-ship

**ID:** BRIEF-debugging
**Initiator:** orchestrator
**Date:** 2026-09-16
**Status:** draft
**Execution_Mode:** single (small fully-specified unit: one new skill dir `skills/debugging/`; override to multi-subagents with orchestrator waiver if scope expands)
**Domains-Touched:** [engineering, automation/ops]

## Problem Statement

Agents fixing bugs under pressure guess at fixes, bundle changes, and skip root-cause work — causing rework and regressions. Obra `systematic-debugging` (4 phases + Iron Law) solves this, but it is not bound to frame-ship: no chain contract, no reference-only packets, no gate trace, wrong naming/frontmatter shape for this repo.

## Desired Outcome

A native `skills/debugging/SKILL.md` named `debugging` (trigger: any bug/test failure/unexpected behavior before fixes) that enforces Iron Law + 4 phases, fits frame-ship body shape and frontmatter convention, and routes fixes through propose→review→execute→gate→handoff.

## Scope

### In Scope

- New `skills/debugging/SKILL.md` + `references/` adapted from source (Iron Law, 4 phases, red flags, 3-failure→architecture rule) [engineering]
- Frame-ship bindings: chain prev/next, role, packets, gate trace REQ→test→verdict [engineering]
- Ops note: evidence gathering at component boundaries, no arbitrary timeouts [automation/ops]

### Out of Scope

- Modifying existing chain stages or plugin runtime
- External TDD/verification skills (reference by name only)

## Stakeholders

| Role | Agent | Involvement |
|------|-------|-------------|
| Sponsor | orchestrator | Decision authority |
| Owner | engineering owner | Delivery ownership |
| Touched | automation owner | Review / sign-off |

## Constraints

- Budget: none (docs-only)
- Timeline: single session
- Regulatory: n/a
- Brand/GTM: skill `name/description` only, no extra frontmatter keys
- People/change: new trigger phrase must not shadow existing stages

## Open Questions

- [ ] Execution mode confirm: single vs multi-subagents? [orchestrator]
- [ ] Keep supporting techniques (root-cause-tracing, defense-in-depth, condition-based-waiting) as references? [engineering owner]
