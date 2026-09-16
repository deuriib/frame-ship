# Product Brief: Single Dispatcher — CEO-only Delegation Contract

**ID:** BRIEF-single-dispatcher
**Initiator:** montilla (CEO)
**Date:** 2026-09-15
**Status:** approved
**Execution_Mode:** multi-subagents (frozen at frame-intent; all specs follow unless overridden per SPEC with CEO waiver)
**Domains-Touched:** engineering, people (+ all 8 domain template sets touched mechanically)

## Problem Statement

The delegation contract is ambiguous at the edges. ADR-003 (CEO-only dispatch) exists in workspace artifacts but the ADR file itself is missing from `docs/specs/10_design/`. C-level templates say "no sub-delegation — do the work yourself end to end; cross-domain needs flagged to montilla", but the mechanism is an informal flag ("need + reason + suggested owner") with no defined shape. Specialists/leaves already say "you do not dispatch subagents", yet the contract is scattered across 68 templates, 9 skills + references, the plugin `frame-ship.ts`, and three AGENTS.md files — with drift risk and no single, explicit statement that **montilla dispatches to the entire team** (C-levels AND specialists) and that cross-domain needs return as a **formal brief to the CEO**.

## Desired Outcome

One dispatcher, one contract, zero residue:

1. **Only montilla (CEO) delegates.** C-levels and specialists never dispatch — not to peers, not to leaves, not sideways.
2. **Montilla → entire team.** The CEO dispatches directly to any agent (C-level or specialist) via `task(general)`, max 2 parallel.
3. **Do it yourself, or brief back.** If the work is in scope, the c-level/specialist does it end to end. If it needs another domain/specialist, they return a formal **Cross-domain request** (brief) to the CEO, who delegates it to the right agent — or resolves it.
4. **Consistent everywhere.** The contract reads identically in `agents/` (68 templates), `skills/` (SKILL.md + references), plugin `frame-ship.ts`, and AGENTS.md files. Zero old-model residue (grep-verified).
5. **ADR filed.** The single-dispatcher decision is recorded in `docs/specs/10_design/` (complete ADR-003 or new ADR-004).

## Scope

### In Scope

- Rewrite `Delegation` section + `Capabilities` Route line + adapter wording in all 68 agent templates: no delegation; do the work yourself; cross-domain → formal brief to CEO [people, all 8 domains]
- Update skills with delegation/dispatch language: `using-frame-ship` (SKILL + tool-mapping + bootstrap-checklist), `frame-intent`, `translate-to-spec`, `propose-changes`, `review-security`, `review-architecture`, `execute-spec`, `quality-gate`, `verify-handoff`, `ship-release` [engineering]
- Update plugin `frame-ship.ts` WORKFLOW_CARD + MONTILLA_OWNERSHIP: "CEO dispatches entire team" + brief-back mechanism [engineering]
- Update `AGENTS.md` (root), `skills/AGENTS.md`, `.opencode/plugins/AGENTS.md` [engineering]
- File the ADR in `docs/specs/10_design/` (complete ADR-003 or new ADR-004) [engineering]

### Out of Scope

- Changing the 8-domain catalogue, stage order, or skill frontmatter loader contract (`name/description` only)
- Renaming agents, templates, or files
- Rotating keys, prod deploys, permission widening
- Adding npm deps to the plugin (stays single-file zero-dep)

## Stakeholders

| Role | Agent | Involvement |
|------|-------|-------------|
| Sponsor | montilla | Decision authority + multi-domain gate synthesis |
| Owner | santana (people) | Agent-rules contract: template wording, brief-back shape |
| Owner | vasquez (engineering) | Plugin/skills mechanics, ADR filing, arch verdicts |
| Touched | barrera (security) | Review of plugin diff + template wording (no auth/data/API; wording-only) |
| Touched | dauhajre, subero, vera, montero, espinoza | Template sets under their domains sign off at gate |

## Constraints

- Budget: none (docs/config-only change)
- Timeline: single session, reversible (text edits; git revert points per commit)
- Regulatory: Ley 172-13 minimization — no PII/secrets in templates or plugin strings
- People/change: santana — agent-rules change affects every role; uniform wording required

## Open Questions

- [ ] ADR-003 missing from `10_design` — complete ADR-003 vs new ADR-004 (owner: vasquez)
- [ ] Exact uniform wording of the Cross-domain request section across 68 templates (owner: santana)

## References

- `docs/briefs/OKR-single-dispatcher.md` — OKRs for this initiative
- `docs/specs/40_workspace/vasquez/TEST_MATRIX-ceo-only-dispatch.md` — prior ADR-003 evidence (workspace)