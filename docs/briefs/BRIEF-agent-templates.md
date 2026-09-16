# Product Brief: Agent Templates for Frame-Ship

**ID:** BRIEF-agent-templates
**Initiator:** montilla (CEO)
**Date:** 2026-09-15
**Status:** approved
**Execution_Mode:** multi-subagents
**Requested_By:** user decision at frame-intent (single | multi-subagents, default multi-subagents)

## Problem Statement

Opencode agents (68 globals in `~/.config/opencode/agents/`) and frame-ship skills (9 stages in `skills/`) define overlapping behavior in two places. Reviewers, C-levels, and leaf specialists drift: two definitions of good review, two dispatch contracts (`tool-mapping.md` vs `permission.task`), global paths that don't travel with the repo.

## Desired Outcome

Single chain truth (skills = order+gates), referenced craft templates (agents = how). User picks `single` vs `multi-subagents` once per initiative at frame-intent; all specs follow that mode unless overridden per SPEC with CEO waiver.

## Scope

### In Scope

- Vendor 68 agents to `skills/templates/agents/` as reference-only templates (central, no duplicate bodies)
- Add `execution_mode` to brief/spec/proposal templates and propagate via SPEC/HARD/GATE packets
- Update `execute-spec` dispatcher + `quality-gate` routing + `tool-mapping.md` for both modes
- Pilot engineering slice (~14) first, then bulk 68

### Out of Scope

- Plugin runtime parsing of agent schemas (stays single-file zero-dep)
- Changing skill frontmatter loader contract (`name/description` only)
- Rotating keys, prod deploys, permission widening

## Stakeholders

| Role | Agent | Involvement |
|------|-------|-------------|
| Sponsor | montilla | Decision authority + multi-domain gate synthesis |
| Owner | vasquez | Delivery ownership, ARCHITECTURE + arch verdicts |
| Security | barrera | Security verdicts, no freelance fixes |
| Reviewers | qa, review-* | Domain gates |

## Constraints

- Budget: none (docs-only migration)
- Timeline: single session, reversible (delete pointer lines to rollback)
- Regulatory: Ley 172-13 minimization — no PII/secrets in templates; OWASP screen on new boundaries

## Open Questions

- [x] Scope all 68? Yes, phased pilot-then-bulk
- [x] Template form? Vendored copies central
- [x] Choice point? At frame-intent per brief
