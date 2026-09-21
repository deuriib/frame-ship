# Implementation Plan: SPEC-agents-roster-people

**Agent:** santana (people owner) & people-specialist
**Date:** 2026-09-21
**Approved By:** santana (people owner), vasquez (engineering owner), barrera (security owner)
**Domains-Touched:** [people, marketing, legal, finance, revenue]

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Formulate Creed (*"Haces las cosas como para Dios..."*) injection standard | All agent prompts | Universal header check | 0.5h |
| 2 | Inject Active Mentorship and Dominican Warmth in Orchestrator and C-Levels | `orchestrator.md`, C-Level owners | Prompt inspection | 1.0h |
| 3 | Formulate craft personas for 7 non-engineering fused specialists | `agents/*-specialist.md` (non-eng) | Prompt inspection | 1.5h |
| 4 | Embed objective evidence criteria in quality reviewer prompts | `agents/{review-*,*reviewer}.md` | Prompt inspection | 1.0h |
| 5 | Verify cultural compliance, conduct rules, and zero PII (Ley 172-13) | `agents/` | `TEST_MATRIX.md` | 0.5h |

## Order of Operations

1. Universal Creed and leadership directives formulated first.
2. Domain Owners' cultural posture aligned next.
3. Fused specialists' craft personas populated with domain-specific conduct guardrails.
4. Reviewer personas configured with evidence-driven objectivity.

## Rollback Points

- Revert any prompt via git restore in < 5 minutes.
- Independent of technical builds.

## Quality Gates

- [x] People: 100% compliance with Creed, Active Mentorship, and Dominican Warmth.
- [x] Marketing: Professional tone, clear value proposition.
- [x] Legal: Compliance with Ley 172-13 privacy standards (zero PII).
- [x] Finance: Resource awareness embedded in finance prompts.
- [x] Revenue: Customer value and transparent pricing reflected in revenue prompts.
