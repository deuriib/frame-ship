# Proposed Changes: Vasquez (Engineering Owner) & Engineering Specialist

**Spec Reference:** SPEC-agents-roster-engineering
**Agent:** vasquez (engineering owner) & engineering-specialist
**Date:** 2026-09-21
**Execution_Mode:** subagents (inherited from spec)
**Domains-Touched:** [engineering, security, automation]

## Summary

This proposal establishes the technical structure and tool permission matrix for the canonical repository-local agent subsystem in `/agents`. It defines the YAML frontmatter schemas, explicit least-privilege tool profiles (`tools: [...]`), and technical execution guardrails (TDD, Type Safety, SOLID) across 1 Orchestrator, 8 Domain Owners, 8 Fused Domain Specialists, and 14 Quality Gate Reviewers without modifying any runtime plugin code.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `agents/` | directory-create | Establish root canonical directory for version-controlled agent definitions |
| `agents/orchestrator.md` | file-create | Define Orchestrator (`montilla`) with `mode: primary`, restricted to dispatch and inspection tools |
| `agents/vasquez.md` | file-create | Define Engineering Owner (`mode: all`) for engineering chain coordination and quality gates |
| `agents/barrera.md` | file-create | Define Security Owner (`mode: all`) for security chain coordination, IAM, and STRIDE review |
| `agents/dauhajre.md` | file-create | Define Finance Owner (`mode: all`) for budget, unit economics, and fiscal gates |
| `agents/subero.md` | file-create | Define Legal Owner (`mode: all`) for regulatory compliance, licensing, and legal gates |
| `agents/vera.md` | file-create | Define Marketing Owner (`mode: all`) for brand integrity, messaging, and GTM gates |
| `agents/santana.md` | file-create | Define People Owner (`mode: all`) for organizational health, agent rules, and culture gates |
| `agents/montero.md` | file-create | Define Revenue Owner (`mode: all`) for pipeline, pricing, and revenue gates |
| `agents/espinoza.md` | file-create | Define Automation/Ops Owner (`mode: all`) for operational mechanics, tooling, and ops gates |
| `agents/engineering-specialist.md` | file-create | Define Fused Engineering Specialist (Architect + Backend + Frontend + Data + DevOps) with full craft tools and TDD |
| `agents/security-specialist.md` | file-create | Define Fused Security Specialist (OWASP + IAM + Privacy + Incident + GRC) with audit tools |
| `agents/finance-specialist.md` | file-create | Define Fused Finance Specialist (Financial Analyst + FP&A + Cost + Accountant + Tax) with analytical tools |
| `agents/legal-specialist.md` | file-create | Define Fused Legal Specialist (Compliance + Contracts + Privacy + IP Counsel) with legal review tools |
| `agents/marketing-specialist.md` | file-create | Define Fused Marketing Specialist (Brand + Content + Copywriter + SEO + Analytics) with authoring tools |
| `agents/people-specialist.md` | file-create | Define Fused People Specialist (People Ops + Payroll + Performance + Mediation) with policy tools |
| `agents/revenue-specialist.md` | file-create | Define Fused Revenue Specialist (Pricing + Funnel + RevOps + Closing) with metrics tools |
| `agents/automation-specialist.md` | file-create | Define Fused Automation Specialist (Automation Engineer + DevOps + Workflow Integrator) with ops tools |
| `agents/review-readability.md` | file-create | Define Engineering Quality Reviewer (readability, simplicity, naming) — strictly read-only tools |
| `agents/review-reliability.md` | file-create | Define Engineering Quality Reviewer (stability, idempotency, failure modes) — strictly read-only tools |
| `agents/review-resilience.md` | file-create | Define Engineering Quality Reviewer (timeouts, circuit breakers, degradation) — strictly read-only tools |
| `agents/review-risk.md` | file-create | Define Engineering Quality Reviewer (blast radius, regressions, auth/data diff) — strictly read-only tools |
| `agents/review-refuter.md` | file-create | Define Adversarial Pre-QA Reviewer (falsification, edge cases, assumption breaker) — strictly read-only tools |
| `agents/qa.md` | file-create | Define Test Suite Verification Agent (test execution, suite runner, coverage) — test execution tools |
| `agents/review-data.md` | file-create | Define Cross-Cutting Data Reviewer (schema evolution, migrations, PII checkpoints) — strictly read-only tools |
| `agents/security-reviewer.md` | file-create | Define Security Gate Reviewer (OWASP Top 10, STRIDE, token masking) — strictly read-only tools |
| `agents/finance-reviewer.md` | file-create | Define Finance Gate Reviewer (cost budget, cloud spend audit) — strictly read-only tools |
| `agents/legal-reviewer.md` | file-create | Define Legal Gate Reviewer (license compatibility, Ley 172-13 compliance) — strictly read-only tools |
| `agents/brand-reviewer.md` | file-create | Define Marketing Gate Reviewer (voice, brand standards, tone) — strictly read-only tools |
| `agents/people-reviewer.md` | file-create | Define People Gate Reviewer (agent rules, communication warmth, blameless posture) — strictly read-only tools |
| `agents/revenue-reviewer.md` | file-create | Define Revenue Gate Reviewer (monetization, conversion impact) — strictly read-only tools |
| `agents/automation-reviewer.md` | file-create | Define Automation Gate Reviewer (IaC verification, runbook completeness) — strictly read-only tools |

## Rationale

This setup enforces mathematical least privilege: reviewers and leaders cannot edit code or run arbitrary bash commands. Fusing previous hyper-fragmented micro-specialists into one authoritative specialist per domain reduces context switching, eliminates file sprawl, and mirrors the canonical 8-domain structure of Frame→Ship.

## Alternatives Considered

| Alternative | Reason Rejected |
|---|---|
| Maintain individual micro-specialists (architect, backend, frontend separate) | High cognitive overhead, fragmented handoffs, and unnecessary dispatch hops within a single domain lane |
| Dynamic in-memory subagents without persistent files | Zero local reproducibility, inability to version-control prompts, and harness drift across environments |
| Global unrestricted tools for all agents | Violates security guardrails (least privilege); introduces risk of leadership or reviewers modifying code accidentally |

## Approval Required From

- [x] Owning domain owner: vasquez (engineering owner)
- [x] engineering owner (architecture impact): vasquez
- [ ] security owner (tool permissions & least privilege): barrera

---

## Risk Assessment: SPEC-agents-roster-engineering

**Proposer:** vasquez (engineering owner)
**Date:** 2026-09-21
**Domains-Touched:** [engineering, security, automation]

### Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Tool permission mismatch in agent execution harness | Low | Med | Declare explicit `tools: [...]` in YAML frontmatter matching native tool naming conventions |
| R-002 | Overly broad permissions in specialists | Low | High | Restrict write/command tools strictly to `engineering-specialist` and `automation-specialist` |
| R-003 | Accidental code generation during proposal stage | Low | High | Strict compliance with Hard Rule 1: No implementation files created until proposal is approved |

### Blast Radius

- **Engineering:** Changes are entirely additive in a new directory (`agents/`). Zero impact on existing build or plugin scripts (`mise run typecheck` unaffected).
- **Security:** Positively restricts permissions; denies destructive tools to 23 of the 25 agent definitions.
- **Automation/Ops:** Future agent harnesses will resolve agent definitions directly from the local repo rather than user-global paths.

### Rollback Plan

All changes are additive in `agents/`. If issues arise:
1. Code revert: `git rm -r agents/` returns the repository to its exact previous state in < 1 minute.
2. No database migrations, external state, or runtime dependencies are touched.

### Security Considerations

- Strict least privilege: Reviewers and Domain Owners are 100% read-only.
- Privacy (Ley 172-13): Prompts contain zero PII, zero credentials, and zero mock API keys.
- OWASP Top 10 Screen: No external network calls or untrusted data deserialization introduced.
