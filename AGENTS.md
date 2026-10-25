# AGENTS.md

## Overview

This repository contains a collection of specialized AI agents designed to operate within the **Frame→Ship** methodology. These agents are not just chat bots; they are task-oriented entities with specific **Skills**, **Rules**, and **Personas** that allow them to execute complex, high-stakes workflows with precision and excellence.

## Agent Architecture

Every agent in this ecosystem is defined by three pillars:

1. **Persona (`agents/`):** The character, expertise, and behavioral constraints of the agent. It defines *who* the agent is and *how* it interacts.
2. **Skills (`skills/`):** The actionable tools and methodologies available to the agent. Skills are composed of a `SKILL.md` (instruction set) and `references/` (templates and checklists).
3. **Rules (`rules/`):** The domain-specific constraints and guidelines that the agent must respect during execution (e.g., `SEC.md` for security, `ENG.md` for engineering).

## Core Agent Personas

The following agents are available in this workspace:

### 🛡️ Reviewers (Guardians of Quality)

These agents are specialized in auditing work against specific domain standards.

| Agent | Focus Area | Key Skill |
| ------- | ------------ | ----------- |
| `automation-reviewer` | Automation & CI/CD | `quality-gate` |
| `brand-reviewer` | Marketing & Brand Alignment | `brand-audit` |
| `finance-reviewer` | Financial Compliance & Accuracy | `finance-audit` |
| `legal-reviewer` | Legal & Regulatory Compliance | `legal-audit` |
| `marketing-reviewer` | Marketing Strategy & Impact | `mkt-audit` |
| `people-reviewer` | HR & Organizational Alignment | `people-audit` |
| `quality-assurance` | Testing & Reliability | `verify-handoff` |
| `revenue-reviewer` | Business Model & Revenue Impact | `rev-audit` |
| `security-reviewer` | Security & Vulnerability Assessment | `review-security` |

### ⚙️ Specialists (Execution & Implementation)

These agents are designed for deep-dive technical or strategic tasks.

| Agent | Focus Area | Role |
| ------- | ------------ | ------ |
| `engineering-specialist` | Software Engineering | High-level architecture and implementation. |
| `legal-specialist` | Legal Execution | Drafting and analyzing legal documents. |
| `marketing-specialist` | Marketing Execution | Campaign building and content strategy. |
| `people-specialist` | HR Execution | People operations and organizational design. |
| `revenue-specialist` | Revenue Operations | Sales and growth engine optimization. |
| `security-specialist` | Security Operations | Threat modeling and defense implementation. |

## How to Interact with Agents

When working with an agent from this repository, follow these guidelines to ensure maximum effectiveness:

1. **Initialize with Intent:** Start by providing a clear `frame-intent`. Tell the agent what the goal is, who it affects, and what success looks like.
2. **Invoke Skills Explicitly:** If you need a specific type of review or output, name the skill (e.g., *"Use the `review-architecture` skill to audit this proposal"*).
3. **Respect the Rules:** Agents are bound by the files in `rules/`. If an agent refuses a task, it is likely because the task violates one of its core operational rules (e.g., `DENY.md`).
4. **Iterate via Feedback:** Use the `propose-changes` skill to refine outputs. Don't just ask for "better"; ask for "more alignment with [specific rule/reference]".

## Deployment & Integration

These agents are designed to be injected into your workflow via:

- **Antigravity CLI (`agy`)**: For local workspace orchestration.
- **Opencode Plugin**: For seamless integration within agentic IDE environments.

---
*“Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación.”*
