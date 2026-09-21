# Spec: Canonical Agents Roster in /agents (Engineering Lane)

**ID:** SPEC-agents-roster-engineering
**Owner:** vasquez (engineering owner)
**Domains-Touched:** [engineering, security, automation]
**Brief Reference:** docs/briefs/BRIEF-agents-roster.md#OKRs + docs/briefs/OKR-agents-roster.md
**Status:** review
**Priority:** P0 (foundational agent subsystem and tool permission governance)
**Execution_Mode:** subagents (inherited from BRIEF-agents-roster §Execution_Mode, frozen at frame-intent; overridden per SPEC only with CEO waiver)

---

## 1. Context

Currently, the Frame→Ship framework relies on agent definitions located in global machine paths (`~/.config/opencode/agents/`) or implicit harness configurations. This creates portability hurdles, lacks explicit tool access enforcement (`tools: [...]`), and prevents version-controlled synchronization of the domain guardrails formalized in [`rules/frame-ship.md`](file:///mnt/DATA/GitHub/frame-ship/rules/frame-ship.md).

`BRIEF-agents-roster.md` established the architectural mandate to create a canonical `/agents` directory in the repository root containing:
1. One central Orchestrator (`orchestrator.md` / `montilla`).
2. Eight Domain Owners (`vasquez.md`, `barrera.md`, `dauhajre.md`, `subero.md`, `vera.md`, `santana.md`, `montero.md`, `espinoza.md`).
3. Eight Fused Domain Specialists (`*-specialist.md`), consolidating fragmented craft roles into one high-capability practitioner per domain.
4. Independent Methodological Quality Gate Reviewers (`review-*`, `qa`, `*-reviewer`).

This specification governs the **Engineering domain lane**, defining the file system architecture, YAML frontmatter schemas, the tool permission matrix (least privilege), and the technical execution guardrails. The People domain lane is specified concurrently in `SPEC-agents-roster-people.md` by Santana.

---

## 2. Requirements

### Functional Requirements

- **REQ-ENG-001 (Directory Structure):** Create the canonical `agents/` directory at repository root to store all agent definitions in standard markdown format with YAML frontmatter. [engineering]
- **REQ-ENG-002 (Orchestrator Definition):** Define `agents/orchestrator.md` (`montilla`) with `mode: primary`, assigned only coordination, inspection, and user interaction tools (`invoke_subagent`, `manage_subagents`, `send_message`, `view_file`, `list_dir`, `find_by_name`, `grep_search`, `ask_question`). Explicitly deny code editing and command execution tools. [engineering]
- **REQ-ENG-003 (Domain Owners Definitions):** Define the 8 Domain Owners with `mode: all` (chain owner):
  - `agents/vasquez.md` (Engineering)
  - `agents/barrera.md` (Security)
  - `agents/dauhajre.md` (Finance)
  - `agents/subero.md` (Legal)
  - `agents/vera.md` (Marketing)
  - `agents/santana.md` (People)
  - `agents/montero.md` (Revenue)
  - `agents/espinoza.md` (Automation/Ops)
  Tool permissions restricted to domain coordination, reading, and gate synthesis. Code craft execution strictly prohibited. [engineering]
- **REQ-ENG-004 (Fused Domain Specialists Definitions):** Define the 8 unified domain specialists with `mode: subagent`:
  - `agents/engineering-specialist.md`: Fusing Architect + Backend + Frontend + Data + DevOps. Tools: `write_to_file`, `replace_file_content`, `run_command`, `view_file`, `grep_search`, `find_by_name`, `list_dir`.
  - `agents/security-specialist.md`: Fusing Pentest + IAM + Privacy + Incident + GRC. Scoped audit tools.
  - `agents/finance-specialist.md`: Fusing Financial Analyst + FP&A + Cost + Accountant. Scoped analytical tools.
  - `agents/legal-specialist.md`: Fusing Compliance + Contracts + IP + Labor + Privacy Counsel. Scoped inspection tools.
  - `agents/marketing-specialist.md`: Fusing Brand + Content + Copywriter + SEO + Analytics. Scoped authoring tools.
  - `agents/people-specialist.md`: Fusing People Ops + Payroll + Performance + Mediation. Scoped policy tools.
  - `agents/revenue-specialist.md`: Fusing Pricing + Funnel + RevOps + Deal Closer. Scoped metrics tools.
  - `agents/automation-specialist.md`: Fusing Automation Engineer + DevOps + Integrations. Tools: `run_command`, `write_to_file`, `replace_file_content`, `view_file`, `grep_search`, `list_dir`. [engineering]
- **REQ-ENG-005 (Quality Gate Reviewers Definitions):** Define the methodological gate reviewers with `mode: subagent` and strictly read-only tools (`view_file`, `grep_search`, `find_by_name`, `list_dir`):
  - Engineering wave: `agents/review-readability.md`, `agents/review-reliability.md`, `agents/review-resilience.md`, `agents/review-risk.md`, `agents/review-refuter.md`, `agents/qa.md`, `agents/review-data.md`.
  - Domain gate reviewers: `agents/security-reviewer.md`, `agents/finance-reviewer.md`, `agents/legal-reviewer.md`, `agents/brand-reviewer.md`, `agents/people-reviewer.md`, `agents/revenue-reviewer.md`, `agents/automation-reviewer.md`. [engineering]
- **REQ-ENG-006 (Tool Enforcement Matrix):** Every agent file MUST declare explicit `tools: [...]` in YAML frontmatter and reinforce allowed/disallowed boundaries within the markdown body under an `## Allowed Tools` and `## Disallowed Tools` section. [engineering, security]
- **REQ-ENG-007 (Engineering Guardrails Injection):** Embed non-negotiable software development guardrails directly into `engineering-specialist.md` and `vasquez.md`:
  - Type Safety: Zero `any`, strict types, generics, no unsafe casts without proof.
  - TDD Discipline: Red-Green-Refactor, no production code without failing test first.
  - Code Structure: SOLID, Hexagonal architecture, pure functions, composition over inheritance.
  - Error Handling: Fail fast, fail closed, no empty catch, Result/Either patterns.
  - Concurrency & Security: Timeouts everywhere, parameterized queries, secret scans. [engineering]
- **REQ-ENG-008 (Architecture Contract Update):** Update `docs/specs/10_design/ARCHITECTURE.md` to document the 4-tier agent architecture, the canonical roster in `agents/`, and the tool permission model. [engineering]

### Non-Functional Requirements

- **REQ-NF-ENG-001 (Least Privilege Integrity):** 100% of leadership and reviewer agents are mathematically isolated from file modification (`write_to_file`, `replace_file_content`) and terminal command execution (`run_command`). [security, engineering]
- **REQ-NF-ENG-002 (Privacy & Secrets Immunity):** Zero hardcoded credentials, API keys, tokens, or PII in any agent file (compliance with Ley 172-13 and Guardrails 1-4). [security]
- **REQ-NF-ENG-003 (Schema Compliance):** All agent markdown files parse cleanly with valid YAML frontmatter containing `name`, `description`, `mode`, and `tools`. [engineering]
- **REQ-NF-ENG-004 (Atomic Reversibility):** Changes are packaged in traceable atomic commits with 100% reversibility via git. [engineering]

---

## 3. Acceptance Criteria

- [ ] AC-ENG-001: Directory `agents/` exists with 1 Orchestrator + 8 Domain Owners + 8 Fused Specialists + Methodological Reviewers.
- [ ] AC-ENG-002: Frontmatter of each agent file contains valid `name`, `description`, `mode`, and explicit `tools: [...]`.
- [ ] AC-ENG-003: Reviewers and Domain Owners have zero write/bash tools declared in their frontmatter.
- [ ] AC-ENG-004: `engineering-specialist.md` contains the full TDD, Type Safety, and SOLID guardrails from `rules/frame-ship.md`.
- [ ] AC-ENG-005: `docs/specs/10_design/ARCHITECTURE.md` updated in-place with the canonical agent subsystem architecture.

---

## 4. Contracts & Interfaces

### YAML Frontmatter Schema

```yaml
---
name: [agent-id]
description: "[Role title and concise description of scope and boundaries]"
mode: primary | all | subagent
tools:
  - [tool_name_1]
  - [tool_name_2]
---
```

### Tool Access Matrix

| Tier | Role Category | Allowed Tools | Disallowed Tools |
|---|---|---|---|
| **Tier 1** | Orchestrator | `invoke_subagent`, `manage_subagents`, `send_message`, `view_file`, `list_dir`, `find_by_name`, `grep_search`, `ask_question` | `write_to_file`, `replace_file_content`, `run_command` |
| **Tier 2** | Domain Owners | `invoke_subagent`, `manage_subagents`, `send_message`, `view_file`, `list_dir`, `find_by_name`, `grep_search` | `write_to_file`, `replace_file_content`, `run_command` |
| **Tier 3** | Fused Specialists | Craft specific: `write_to_file`, `replace_file_content`, `run_command` (where needed), `view_file`, `grep_search`, `find_by_name`, `list_dir` | Self-dispatch, cross-domain authority |
| **Tier 4** | Gate Reviewers | `view_file`, `grep_search`, `find_by_name`, `list_dir` | `write_to_file`, `replace_file_content`, `run_command`, `invoke_subagent` |

---

## 5. Out of Scope

- Modifying runtime plugins in `.opencode/plugins/` or `plugins/antigravity/` during this spec cycle.
- Generating individual micro-specialists (e.g. `backend` separate from `frontend` or `architect`).
- Granting terminal command execution to non-technical or non-operational specialists.

---

## 6. Dependencies

- Upstream: `docs/briefs/BRIEF-agents-roster.md` (Approved).
- Concurrent: `docs/specs/20_backlog/SPEC-agents-roster-people.md` (Santana).
- Sign-offs: `barrera` (security least-privilege audit), `vasquez` (engineering architecture).

---

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-ENG-001 | AC-ENG-001 | PROPOSED_CHANGES.md | `ls -la agents/` |
| REQ-ENG-002 | AC-ENG-002, AC-ENG-003 | PROPOSED_CHANGES.md | `view_file agents/orchestrator.md` |
| REQ-ENG-003 | AC-ENG-002, AC-ENG-003 | PROPOSED_CHANGES.md | `view_file agents/vasquez.md` |
| REQ-ENG-004 | AC-ENG-002 | PROPOSED_CHANGES.md | `view_file agents/engineering-specialist.md` |
| REQ-ENG-005 | AC-ENG-002, AC-ENG-003 | PROPOSED_CHANGES.md | `view_file agents/review-risk.md` |
| REQ-ENG-006 | AC-ENG-002, AC-ENG-003 | PROPOSED_CHANGES.md | Frontmatter audit script |
| REQ-ENG-007 | AC-ENG-004 | PROPOSED_CHANGES.md | Guardrail grep inspection |
| REQ-ENG-008 | AC-ENG-005 | PROPOSED_CHANGES.md | `docs/specs/10_design/ARCHITECTURE.md` diff |
