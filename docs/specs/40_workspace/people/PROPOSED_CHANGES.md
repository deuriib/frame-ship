# Proposed Changes: Santana (People Owner) & People Specialist

**Spec Reference:** SPEC-agents-roster-people
**Agent:** santana (people owner) & people-specialist
**Date:** 2026-09-21
**Execution_Mode:** subagents (inherited from spec)
**Domains-Touched:** [people, marketing, legal, finance, revenue]

## Summary

This proposal establishes the organizational governance, persona craft definitions, communication protocols, and cultural guardrails for the canonical agent roster in `/agents`. It injects the foundational Creed (*"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*), Active Mentorship, and Dominican Human Warmth alongside rigorous conduct rules across all agent prompts.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `agents/orchestrator.md` | document-update | Inject Active Mentorship, Dominican Warmth, single-dispatcher contract, and synthesis directives |
| `agents/santana.md` | document-update | Establish People Owner prompt with agent rules governance, mediation, and cultural gate authority |
| `agents/dauhajre.md` | document-update | Establish Finance Owner prompt with cost awareness, budget governance, and fiscal gate authority |
| `agents/subero.md` | document-update | Establish Legal Owner prompt with regulatory compliance, Ley 172-13 privacy, and legal gate authority |
| `agents/vera.md` | document-update | Establish Marketing Owner prompt with brand integrity, voice standards, and GTM gate authority |
| `agents/montero.md` | document-update | Establish Revenue Owner prompt with customer value, conversion clarity, and revenue gate authority |
| `agents/security-specialist.md` | document-create | Formulate craft persona for Fused Security Specialist (deny by default, proof-based findings) |
| `agents/finance-specialist.md` | document-create | Formulate craft persona for Fused Finance Specialist (unit economics, budget modeling, ROI) |
| `agents/legal-specialist.md` | document-create | Formulate craft persona for Fused Legal Specialist (contract analysis, licensing audit, regulatory) |
| `agents/marketing-specialist.md` | document-create | Formulate craft persona for Fused Marketing Specialist (high-signal copy, positioning, messaging) |
| `agents/people-specialist.md` | document-create | Formulate craft persona for Fused People Specialist (friction mediation, cultural health, team policies) |
| `agents/revenue-specialist.md` | document-create | Formulate craft persona for Fused Revenue Specialist (transparent pricing, funnel health, metrics) |
| `agents/automation-specialist.md` | document-create | Formulate craft persona for Fused Automation Specialist (toil reduction, deterministic IaC, parity) |
| `agents/people-reviewer.md` | document-create | Formulate objective gate criteria for People Quality Reviewer (conduct, creed, and tone audit) |

## Rationale

Without deliberate cultural grounding and persona boundaries, multi-agent systems devolve into robotic dissonance or conflicting communication styles. Embedding the universal Creed, Active Mentorship, Dominican Human Warmth, and objective conduct guardrails ensures that every agent operates with technical excellence, clarity, and genuine human respect.

## Alternatives Considered

| Alternative | Reason Rejected |
|---|---|
| Generic sterile prompts without creed or cultural warmth | Strips the methodology of its identity and mentor-first leadership, increasing bureaucratic rigidity |
| Purely informal / chatty personas | Degrades professional stature, clutters prompt tokens, and risks drifting away from rigorous technical execution |
| Implicit unwritten conduct expectations | Leads to silent failures, defensive excuses, and circular retries instead of clean N=2 escalations |

## Approval Required From

- [x] Owning domain owner: santana (people owner)
- [ ] engineering owner (architecture consistency): vasquez
- [ ] security owner (privacy & tone screen): barrera

---

## Risk Assessment: SPEC-agents-roster-people

**Proposer:** santana (people owner)
**Date:** 2026-09-21
**Domains-Touched:** [people, marketing, legal, finance, revenue]

### Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Inconsistent tone across domain agents | Low | Med | Enforce universal prompt header standard with Creed and standardized section structure |
| R-002 | Ambiguous role boundaries leading to cross-talk | Low | High | Enforce single-dispatcher rule: specialists report to Domain Owners, who report to Orchestrator |
| R-003 | Leakage of mock PII in persona examples | Low | High | Full Ley 172-13 screen: zero personal names, emails, or phone numbers in examples |

### Blast Radius

- **People & Culture:** Establishes positive baseline for all future agent interactions in the workspace.
- **Workflow Integrity:** Prevents sideways dispatch loops and enforces clean N=2 escalation.

### Rollback Plan

All persona prompts are self-contained markdown documents. In case of tone drift or role adjustments:
1. Individual prompt text can be refined or reverted cleanly via `git revert` in < 5 minutes.
2. Reversion produces zero collateral impact on technical builds or test suites.

### Security Considerations

- Absolute compliance with Ley 172-13: Prompts are abstract and role-focused, carrying zero real or synthetic PII.
- Conduct guardrails mandate that any security concern bypasses normal queue and escalates immediately to Barrera in the same session.
