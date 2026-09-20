# ADR-001: Vendored Agent Templates + Execution Mode at Frame-Intent

**Date:** 2026-09-15
**Deciders:** vasquez (CTO), montilla (CEO)
**Status:** accepted

## Context

68 global agents duplicate craft already referenced by 9 skills. Two dispatch truths exist. Need portable templates supporting single vs multi-subagents chosen once per initiative.

## Decision

Central `skills/templates/agents/<domain>/<agent>.md` vendored copies, reference-only. `execution_mode: single | multi-subagents` frozen at `frame-intent` in brief, propagated via SPEC/HARD/GATE packets. Plugin `frame-ship.ts` does not parse agent schemas. Skill frontmatter stays `name/description` only; agent `mode/permission` stored as meta block inside template.

Single = one leaf + min gate (`readability+risk+refuter+qa`). Multi = fan-out + full wave. Both: CLOSED = no handoff without c-levels+CEO waiver.

## Consequences

### Positive

- One chain truth, one craft truth, portable repo
- Per-initiative execution control, reversible (delete pointers)
- Stronger gates, no parallel reviewer universe

### Negative

- Vendored drift risk vs globals — mitigated by declaring vendored authoritative + sync-check note
- 68-file bulk needs phased review — mitigated by pilot-14-first

## Supersedes / Superseded By

None. First ADR for frame-ship templates.
