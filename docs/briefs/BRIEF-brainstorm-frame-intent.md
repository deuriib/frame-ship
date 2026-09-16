# Product Brief: brainstorm → frame-intent improvement

**ID:** BRIEF-brainstorm-frame-intent
**Initiator:** orchestrator
**Date:** 2026-09-16
**Status:** draft
**Execution_Mode:** single (small fully-specified unit: improve `skills/frame-intent/SKILL.md` + refs in place; override to multi-subagents with orchestrator waiver if scope expands to other stages)
**Domains-Touched:** [engineering, people]

## Problem Statement

Current `frame-intent` freezes intent too fast: 3 generic questions (problem / who / success) with no classification, no decomposition, and no approval gate before `translate-to-spec`. Result: under-scoped briefs, hidden complexity discovered downstream, rework in propose/review/execute. Obra `brainstorming` (Spike / Bounded / Architectural + HARD-GATE + per-section approval + self-review) solves elicitation, but is not bound to frame-ship: wrong output (`docs/superpowers/specs/` + `writing-plans`), no chain contract, no reference-only packets, no execution_mode, no Domains-touched.

## Desired Outcome

A native improved `skills/frame-intent/` that keeps its contract (BRIEF + OKRs only, no specs/code/budgets) while adopting brainstorming rigor: classify first, ask one-at-a-time, propose 2–3 framings with trade-offs + recommendation, YAGNI, decompose oversized initiatives, sectioned brief review, self-review + user approval gate before handoff to `translate-to-spec`.

## Scope

### In Scope

- Upgrade `skills/frame-intent/SKILL.md` §3 with: classify (spike-equivalent / bounded-initiative / architectural-initiative) + announce + one-way ratchet; one-question-at-a-time elicitation; 2–3 framings with recommendation; decomposition rule; per-section brief approval [engineering, people]
- Upgrade `references/product-brief.md` + `references/okr-template.md` only if placeholders needed for new fields (classification, framings considered, approval) [engineering]
- Frame-ship bindings preserved: chain prev/next, role (orchestrator owns brief), packets `SPEC/HARD/GATE/DOMAINS`, `execution_mode` freeze [engineering]

### Out of Scope

- Modifying `translate-to-spec`, `propose-changes`, plugin runtime
- Adopting `visual-companion.md` browser mode, `writing-plans` invocation, or `docs/superpowers/` output paths
- External style skills (reference by name only)

## Stakeholders

| Role | Agent | Involvement |
|------|-------|-------------|
| Sponsor | orchestrator | Decision authority |
| Owner | engineering owner | Delivery ownership |
| Touched | people owner | Elicitation / collaboration review |

## Constraints

- Budget: none (docs-only)
- Timeline: single session
- Regulatory: n/a
- Brand/GTM: skill `name/description` only, no extra frontmatter keys
- People/change: new questions must not shadow existing stage triggers; approval gate scales with size, never skipped

## Open Questions

- [ ] Map brainstorm Spike → answer-only (no BRIEF) or mini-BRIEF? [orchestrator]
- [ ] Keep Red Flags table verbatim or frame-ship rewrite? [people owner]
