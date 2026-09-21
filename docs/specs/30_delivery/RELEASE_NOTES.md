# Release Notes: Canonical Agents Roster in /agents

**Date:** 2026-09-21
**Release Manager:** orchestrator / vasquez (engineering owner) & santana (people owner)
**Specs Included:** SPEC-agents-roster-engineering, SPEC-agents-roster-people
**Domains-Touched:** [engineering, security, finance, legal, marketing, people, revenue, automation]
**Ship Type:** rollout (repository-local canonical agent architecture, tool matrix, and guardrail bindings)

## Highlights

- **Canonical Repository-Local Agents Subsystem:** Established `/agents` containing 31 version-controlled agent definitions structured into 4 distinct architectural tiers:
  1. **Tier 1 (1 Orchestrator):** `orchestrator.md` (`montilla`) — Primary entry point, brief author, sole dispatcher, and cross-domain synthesizer.
  2. **Tier 2 (8 Domain Owners):** `vasquez.md` (Engineering), `barrera.md` (Security), `dauhajre.md` (Finance), `subero.md` (Legal), `vera.md` (Marketing), `santana.md` (People), `montero.md` (Revenue), `espinoza.md` (Automation/Ops).
  3. **Tier 3 (8 Fused Domain Specialists):** Consolidated previous 70+ fragmented micro-roles into 1 authoritative fused specialist per canonical domain (`engineering-specialist.md`, `security-specialist.md`, `finance-specialist.md`, `legal-specialist.md`, `marketing-specialist.md`, `people-specialist.md`, `revenue-specialist.md`, `automation-specialist.md`).
  4. **Tier 4 (14 Quality Gate Reviewers):** Dedicated independent gate auditors for the engineering wave (`review-readability`, `review-reliability`, `review-resilience`, `review-risk`, `review-refuter`, `qa`, `review-data`) and all 7 non-engineering domain gates.
- **Mathematical Least Privilege:** Enforced explicit tool access profiles (`tools: [...]`) in YAML frontmatter and body directives. Reviewers and Leadership agents are 100% read-only, eliminating the hazard of unintended code edits or command execution.
- **Domain Guardrails & Cultural Grounding:** Injected the eternal Creed (*"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*), Active Mentorship, Dominican Human Warmth, and domain-specific technical guardrails from [`rules/frame-ship.md`](file:///mnt/DATA/GitHub/frame-ship/rules/frame-ship.md) into 100% of agent definitions.
- **ADR-010 Formulated:** Formally recorded architectural decision `ADR-010-canonical-agents-roster.md` in `docs/specs/12_adr/`.
- **Architecture Contract v1.1:** Updated `docs/specs/10_design/ARCHITECTURE.md` establishing invariants INV-009 through INV-012.

## Verification & Quality Gates

- **Quality Gate:** Consolidated report `GATE_REPORT.md` evaluated 14/14 reviewer verdicts with unanimous **OPEN** status.
- **Security Audit:** STRIDE threat model passed; zero hardcoded secrets or PII (Ley 172-13 compliant). Zero write/command permissions in leadership or review tiers.
- **DoD Verification:** 100% acceptance criteria and REQ-to-evidence links verified across both engineering and people lanes.

## Rollback / Undo

- **Code Revert:** `git rm -r agents/` or `git revert` of release commits cleanly reverts the roster without touching runtime plugins.
- **Owner:** vasquez (engineering owner) / santana (people owner).
