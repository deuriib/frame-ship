# Release Notes: Canonical Agents Roster in /agents (v0.8.0)

**Date:** 2026-09-21
**Release Version:** v0.8.0
**Release Manager:** orchestrator / vasquez (engineering owner) & santana (people owner)
**Specs Included:** SPEC-agents-roster-engineering, SPEC-agents-roster-people
**Domains-Touched:** [engineering, security, finance, legal, marketing, people, revenue, automation]
**Ship Type:** minor release (canonical agent architecture, standardized frontmatter modes, universal file editing, and quality-assurance rename)

## Highlights

- **Canonical Repository-Local Agents Subsystem:** Established `/agents` containing 31 version-controlled agent definitions structured into 4 distinct architectural tiers:
  1. **Tier 1 (1 Orchestrator):** `orchestrator.md` (`montilla`) — Primary entry point (`mainAgent: true`), brief author, sole dispatcher, and cross-domain synthesizer.
  2. **Tier 2 (8 Domain Owners):** `vasquez.md` (Engineering), `barrera.md` (Security), `dauhajre.md` (Finance), `subero.md` (Legal), `vera.md` (Marketing), `santana.md` (People), `montero.md` (Revenue), `espinoza.md` (Automation/Ops) — Dual-capable (`mainAgent: true`, `subagent: true`).
  3. **Tier 3 (8 Fused Domain Specialists):** Consolidated previous 70+ fragmented micro-roles into 1 authoritative fused specialist per canonical domain (`subagent: true`).
  4. **Tier 4 (14 Quality Gate Reviewers):** Dedicated independent gate auditors for the engineering wave (`review-readability`, `review-reliability`, `review-resilience`, `review-risk`, `review-refuter`, `quality-assurance`, `review-data`) and all 7 non-engineering domain gates (`subagent: true`).
- **Standardized Agent Frontmatter Modes:** Replaced legacy `mode: all`, `mode: subagent`, and `mode: primary` with explicit boolean flags: `mainAgent: true` and `subagent: true`.
- **Universal File Authoring:** All 31 agents in `agents/` are equipped with `write_to_file` and `replace_file_content` to author specifications, audit findings, test summaries, and reports directly. Command execution (`run_command`) remains strictly constrained to execution specialists (`engineering-specialist`, `automation-specialist`, `quality-assurance`).
- **Renamed QA to Quality Assurance:** Fully standardized `quality-assurance` across `agents/quality-assurance.md`, `skills/quality-gate/references/engineering/quality-assurance-review.md`, and all skill routing tables.
- **Domain Guardrails & Cultural Grounding:** Injected the eternal Creed (*"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*), Active Mentorship, Dominican Human Warmth, and domain-specific technical guardrails from [`rules/frame-ship.md`](file:///mnt/DATA/GitHub/frame-ship/rules/frame-ship.md) into 100% of agent definitions.
- **ADR-010 Formulated:** Formally recorded architectural decision `ADR-010-canonical-agents-roster.md` in `docs/specs/12_adr/`.
- **Architecture Contract v1.1:** Updated `docs/specs/10_design/ARCHITECTURE.md` establishing invariants INV-009 through INV-012.

## Verification & Quality Gates

- **Quality Gate:** Consolidated report `GATE_REPORT.md` evaluated 14/14 reviewer verdicts with unanimous **OPEN** status.
- **Security Audit:** STRIDE threat model passed; zero hardcoded secrets or PII (Ley 172-13 compliant). Least-privilege command execution strictly bounded.
- **DoD Verification:** 100% acceptance criteria and REQ-to-evidence links verified across both engineering and people lanes.
- **Type Safety & Version Lockstep:** `mise run typecheck` passes 0 errors; `npm run version:check` reports 100% lockstep at v0.8.0.

## Rollback / Undo

- **Code Revert:** `git rm -r agents/` or `git revert` of release commits cleanly reverts the roster without touching runtime plugins.
- **Owner:** vasquez (engineering owner) / santana (people owner).
