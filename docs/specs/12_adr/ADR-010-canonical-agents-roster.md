# ADR-010: Canonical Repository-Local Agents Subsystem in /agents

**Date:** 2026-09-21  
**Deciders:** Vasquez (Engineering Owner), Santana (People Owner), Barrera (Security Owner), Montilla (Orchestrator)  
**Status:** accepted  

## Context

Prior to this decision, the Frame→Ship framework relied on agent definitions distributed across global user configuration paths (`~/.config/opencode/agents/`) or implicit harness configurations. This created operational limitations:
1. **Lack of Repository Portability:** Teams cloning the repository lacked immediate access to the authoritative roster of agents without manual external environment setups.
2. **Unbounded Tool Access:** Agents lacked explicit, declarative tool permission schemas (`tools: [...]`), creating the hazard of coordination or reviewer agents inadvertently executing code modification or bash tools.
3. **Role Fragmentation (Agent Sprawl):** Domain craft was fragmented across dozens of micro-agents (e.g., `architect`, `backend`, `frontend`, `data-engineer` as separate, disjointed files), forcing excessive dispatch hops for contiguous domain tasks.
4. **Desynchronized Guardrails:** The rigorous technical and conduct guardrails formalized in [`rules/frame-ship.md`](file:///mnt/DATA/GitHub/frame-ship/rules/frame-ship.md) were not directly bound into the operational prompts of individual specialists.

`BRIEF-agents-roster.md` mandated the creation of a canonical, repository-local `/agents` directory establishing a balanced roster governed by least privilege and domain specialist fusion.

## Decision

Establish the canonical, version-controlled `/agents` directory in the repository root organized into four architectural tiers:

1. **Tier 1: Central Orchestration (1 Agent):**
   - `agents/orchestrator.md` (`montilla`): Chain entry, brief owner, sole dispatcher to domain owners, and cross-domain synthesizer.
   - Restricted to dispatch and inspection tools (`invoke_subagent`, `manage_subagents`, `send_message`, `view_file`, `list_dir`, `find_by_name`, `grep_search`, `ask_question`). Strictly prohibited from modifying code or executing bash commands.

2. **Tier 2: Domain Owners (8 Agents — C-Level Chain Owners):**
   - `agents/vasquez.md` (Engineering), `agents/barrera.md` (Security), `agents/dauhajre.md` (Finance), `agents/subero.md` (Legal), `agents/vera.md` (Marketing), `agents/santana.md` (People), `agents/montero.md` (Revenue), `agents/espinoza.md` (Automation/Ops).
   - Responsible for domain chain execution, spec authoring, gate coordination, and handoffs. Tool permissions restricted to reading, workspace inspection, and subagent coordination. Craft code writing is strictly prohibited (INV-009).

3. **Tier 3: Fused Domain Specialists (8 Agents — 1 per Domain):**
   Consolidate previously fragmented micro-craft roles into one authoritative, high-capability specialist per canonical domain:
   - `agents/engineering-specialist.md`: Fusing Architect + Backend + Frontend + Data + DevOps. Authorized for scoped code modification (`write_to_file`, `replace_file_content`) and build/test execution (`run_command`).
   - `agents/security-specialist.md`: Fusing Pentest + IAM + Privacy + Incident Response + GRC.
   - `agents/finance-specialist.md`: Fusing Financial Analyst + FP&A + Cost Analyst + Accountant + Tax.
   - `agents/legal-specialist.md`: Fusing Compliance + Contracts + Privacy Counsel + IP Counsel.
   - `agents/marketing-specialist.md`: Fusing Brand + Content + Copywriting + SEO + Analytics.
   - `agents/people-specialist.md`: Fusing People Ops + Payroll + Performance + Friction Mediation.
   - `agents/revenue-specialist.md`: Fusing Pricing + Funnels + RevOps + Deal Closer.
   - `agents/automation-specialist.md`: Fusing Automation Engineer + DevOps + Workflow Integrator.

4. **Tier 4: Methodological Quality Gate Reviewers (14 Agents — Quality Gate):**
   - **Engineering Wave:** `agents/review-readability.md`, `agents/review-reliability.md`, `agents/review-resilience.md`, `agents/review-risk.md`, `agents/review-refuter.md` (adversarial), `agents/quality-assurance.md` (verification), `agents/review-data.md` (cross-cutting lens).
   - **Domain Reviewers:** `agents/security-reviewer.md`, `agents/finance-reviewer.md`, `agents/legal-reviewer.md`, `agents/brand-reviewer.md`, `agents/people-reviewer.md`, `agents/revenue-reviewer.md`, `agents/automation-reviewer.md`.
   - Strictly read-only tool profiles (`view_file`, `grep_search`, `find_by_name`, `list_dir`). Prohibited from modifying code or executing commands.

5. **Tool Access & Guardrails Enforcement:**
   - Every agent declares its permitted tools via YAML frontmatter `tools: [...]` and reinforces boundaries in markdown body sections (`## Allowed Tools` and `## Disallowed Tools`).
   - Every agent prompt embeds the universal Creed (*"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*), Active Mentorship, Dominican Warmth, and the specific technical guardrails of its domain extracted from `rules/frame-ship.md`.

## Invariants Formalized

- **INV-009 (Agent Least-Privilege Separation):** Reviewer and Leadership agents (Orchestrator and Domain Owners) are strictly prohibited from possessing code modification tools or terminal execution tools.
- **INV-010 (Domain Specialist Fusion):** Each of the 8 canonical domains possesses exactly one unified Fused Domain Specialist consolidating the domain's craft roles.
- **INV-011 (Universal Creed & Conduct Binding):** Every agent file in `agents/` must embed the foundational Creed and non-negotiable conduct rules from `rules/frame-ship.md`.
- **INV-012 (Single Dispatcher Discipline):** Only the Orchestrator dispatches tasks to the team; peer specialists never dispatch sideways.

## Consequences

### Positive
- Complete portability and reproducibility: The entire team roster is version-controlled with the codebase.
- Mathematical least privilege: Eliminates the possibility of accidental code modifications or command execution by reviewers or leadership agents.
- Drastic reduction in agent sprawl: Consolidates 70+ fragmented legacy roles into 31 highly focused, well-governed agents.
- Clear auditability and alignment with the canonical 8-domain model of Frame→Ship.

### Negative / Trade-offs
- Fused specialists possess broader capability scopes per prompt; mitigated by strict TDD and single-responsibility task assignments during execution.
