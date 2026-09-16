# Product Brief: Centralize skill naming reference convention to frame-ship:{skill-name}

**ID:** BRIEF-skill-naming
**Initiator:** orchestrator
**Date:** 2026-09-16
**Status:** draft
**Execution_Mode:** single (frozen at frame-intent; all specs follow unless overridden per SPEC with orchestrator waiver)
**Domains-Touched:** [engineering, automation/ops]

## Problem Statement

Skill names are cited in at least three forms across the repo: canonical `frame-ship:{skill-name}` navigation cites (Previous/Next/handoff lines in all 10 `SKILL.md`, already normalized per `BRIEF-skill-refs-normalization`), bare tool-invocation cites `` `skill(<bare>)` `` in `§0` pre-flights, and bare chain/dir strings in the plugin `CHAIN` const, `AGENTS.md` files, and `README.md`. A newcomer guessing which form to copy can cite a stage that resolves in one surface (filesystem) but not in another (skill tool / chain navigation). It matters now because the chain is a live contract and the next spec/proposal wave copies these cites verbatim.

## Desired Outcome

One written convention — navigation cites use `` `frame-ship:{skill-name}` ``, with an explicit carve-out table for surfaces that must stay bare (skill frontmatter `name:`, filesystem paths, native `skill()` tool args where the harness resolves bare names) — recorded in a single brief, grep-verifiable, so every future `SKILL.md`, `AGENTS.md`, `README.md`, and plugin string cites the same form or cites the carve-out.

## Scope

### In Scope

- Audit cross-surface skill-name cites across `skills/*/SKILL.md`, `skills/AGENTS.md`, `AGENTS.md`, `README.md`, `.opencode/plugins/frame-ship.ts`, `docs/briefs/BRIEF-*.md` [engineering]
- Freeze the canonical form `frame-ship:{skill-name}` + carve-out table (frontmatter / paths / tool args) [engineering]
- Record plugin injection strings (`CHAIN`, `WORKFLOW_CARD`, `POINTERS`, `COMPACTION_REMINDER`) as in-scope or explicit follow-up [automation/ops]

### Out of Scope

- Rewriting specs, proposals, or runtime code (→ `frame-ship:translate-to-spec` and later stages)
- Renaming skills, directories, or frontmatter loader contract (`name`/`description` only)
- Rotating keys, prod deploys, permission widening

## Stakeholders

| Role | Agent | Involvement |
|------|-------|-------------|
| Sponsor | orchestrator | Decision authority |
| Owner | engineering owner | Delivery ownership, naming audit |
| Touched | automation owner | Review of plugin injection strings (only if runtime touched) |

## Constraints

- Budget: none (docs-only brief)
- Timeline: single session work unit, reversible via `git revert`
- Regulatory: Ley 172-13 minimization — scoped evidence only (paths + line refs), no PII/secrets in brief
- Brand/GTM: N/A
- People/change: N/A, naming-only change

## Open Questions

- [x] Mode? `single` direct, no fan-out — frozen here 2026-09-16 (small fully-specified naming unit)
- [ ] Plugin `CHAIN`/card strings: normalize to `frame-ship:`-prefixed chain now or defer as automation follow-up? (owner: automation owner)
- [ ] Relation to approved `BRIEF-skill-refs-normalization`: extend (residual bare forms) vs supersede? (owner: orchestrator — assumed extend, see Assumptions)

---

# OKRs: skill-naming

**Period:** Q3 2026
**Owner:** orchestrator

## Objective 1: One canonical skill-name form, written down

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-1.1 Navigation cites canonical | partial (10/10 `SKILL.md` Previous/Next already `frame-ship:`, bare forms remain elsewhere) | 100% of navigation cites use `` `frame-ship:{skill-name}` `` or a recorded carve-out | grep `frame-ship:` vs bare backticked stage names in `skills/*/SKILL.md` |
| KR-1.2 Tool-invocation cites disambiguated | 15 bare `` `skill(<bare>)` `` cites (see brief evidence) | every `` `skill(...)` `` cite either canonicalized or listed in carve-out table | grep `skill\(` in `skills/` + carve-out table in spec |

## Objective 2: Chain strings resolve without guesswork

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-2.1 Chain/dir strings mapped | bare chains in plugin `CHAIN`, `AGENTS.md`, `README.md` unmapped | convention states which surfaces carry `frame-ship:` prefix and which stay bare (paths/frontmatter) | spec carve-out table + grep of chain strings |
| KR-2.2 Handoff intact | none-yet (frame-intent entry) | brief handed to `translate-to-spec` as `SPEC/HARD/GATE/DOMAINS` packet | handoff reference cited by next stage |
