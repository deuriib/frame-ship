# Product Brief: Agents Into Plugin Config — Single-File Roster

**ID:** BRIEF-agents-into-plugin
**Initiator:** montilla (CEO)
**Date:** 2026-09-17
**Status:** draft
**Execution_Mode:** multi-subagents (frozen at frame-intent; all specs follow unless overridden per SPEC with CEO waiver)
**Domains-Touched:** engineering
**Classification:** architectural-initiative (new subsystem + config contract change — full BRIEF file)
**Framings-Considered:** A single-file merge (Recommended, chosen) — port MANIFEST + loader into frame-ship.ts, zero-deps, idempotent; B two plugins side-by-side — less merge risk but duplicate resolvers + dual versioning (cut); C dynamic glob discovery — no manifest drift but non-deterministic modes + more I/O (cut). YAGNI: no remote compose ref, no new deps, no prompt rewrites, no secrets handling.
**Approval:** file-approval — pending (approver: user, date: 2026-09-17)

## Problem Statement

`frame-ship.ts` v0.5.0 registers only `skills.paths` — the agent definitions under `agents/` are invisible to the harness, so CEO/C-level dispatch has no roster to route to. A proven previous plugin (`frame-ship-agents`) already solved this with a static MANIFEST + file loader + `config.agents`/`config.agent` mirror + `default_agent` + `subagent_depth`, but it lives outside this repo's single-file runtime.

## Desired Outcome

Installing frame-ship alone brings the full roster: montilla primary + 8 C-levels (`all`) + specialists (`subagent`) with real prompts (frontmatter stripped) + descriptions from each file's own frontmatter, idempotent and never clobbering user overrides. Single file stays single-file, zero deps, `tsc` clean.

## Scope

### In Scope

- Port static MANIFEST (full roster from previous plugin — same names/files/modes, espinoza aliased to espinoza-specialist) into `.opencode/plugins/frame-ship.ts` [engineering]
- Port `resolveAgentsDir` + `readTextFile` (Bun.file first, dynamic node:fs fallback) + `parseAgentFile` (description + clean body) [engineering]
- Extend existing `config` hook to fill `config.agents` + `config.agent` mirror idempotently + `default_agent=montilla` + `subagent_depth=2` [engineering]
- Version bump triple: header comment + `VERSION` + `MARKER` together [engineering]

### Out of Scope

- Rewriting any agent body or description
- Renaming agents, files, or modes
- Restoring remote `frame-ship@git+...` self-compose ref (we are the repo)
- Adding npm deps or touching `~/.config/opencode/`
- Rotating keys, prod deploys, permission widening

## Stakeholders

| Role | Agent | Involvement |
|------|-------|-------------|
| Sponsor | montilla | Decision authority + chain entry |
| Owner | vasquez (engineering) | Delivery ownership + arch verdict |
| Touched | — | Single-domain, no cross-cutting review |

## Constraints

- Budget: none (config-only change)
- Timeline: single session, reversible (git revert)
- Regulatory: no secrets/tokens in code/config/logs (guardrails 1-4); agent prompts are bodies only
- Brand/GTM: none
- People/change: none (no RBAC change, roster additive only)

## Open Questions

- [ ] Full 70-roster vs subset — assumed full unless reviewer cuts (owner: vasquez)
- [ ] Keep `default_agent=montilla` + `subagent_depth=2` — assumed yes per previous plugin (owner: vasquez)

## References

- `docs/briefs/OKR-agents-into-plugin.md` — OKRs for this initiative
