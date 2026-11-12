# AGENTS.md

## Overview

This repository contains a collection of specialized AI agents designed to operate within the **Frame→Ship** methodology. These agents are task-oriented entities with specific **Skills**, **Rules**, and **Personas** that allow them to execute complex, high-stakes workflows with precision and excellence.

> Single source of truth for the roster is `agents/*.md` (frontmatter `name:`). This file is a human-readable index generated from it — if it disagrees with `agents/`, the file wins.

## Agent Architecture

Every agent in this ecosystem is defined by three pillars:

1. **Persona (`agents/`):** The character, expertise, and behavioral constraints of the agent. It defines *who* the agent is and *how* it interacts.
2. **Skills (`skills/`):** The actionable tools and methodologies available to the agent. Skills are composed of a `SKILL.md` (instruction set) and `references/` (templates and checklists).
3. **Rules (`rules/`):** The domain-specific constraints and guidelines that the agent must respect during execution. `always_on` rules (foundation) are injected on every context build; `model_decision` rules load on demand when their domain activates.

## Agent Roster

### 👑 Domain Owners (dispatch + verdict authority)

| Agent | Name | Domain |
|-------|------|--------|
| `montilla` | Montilla | CEO & Orchestrator — classifies intent, owns the Brief, dispatches to owners |
| `vasquez` | Vasquez | Engineering Owner (CTO) — specs, ADRs, review wave, technical handoffs |
| `barrera` | Barrera | Security Owner (CISO) — cybersecurity, IAM, STRIDE, security gate |
| `subero` | Subero | Legal Owner (CLO) — compliance, licensing, IP, Ley 172-13 |
| `dauhajre` | Dauhajre | Finance Owner (CFO) — unit economics, budget, finance gate |
| `vera` | Vera | Marketing Owner (CMO) — brand, positioning, developer relations voice |
| `montero` | Montero | Revenue Owner (CRO) — pricing, funnels, revenue gate |
| `santana` | Santana | People Owner (CHRO/CPO) — culture, Creed, collaboration, people gate |
| `espinoza` | Espinoza | Automation & Ops Owner (COO) — IaC, CI/CD, runbooks, automation gate |

### ⚙️ Specialists (execution; never self-dispatch, never self-approve)

| Agent | Fused disciplines | Reports to |
|-------|-------------------|-----------|
| `engineering-specialist` | Architect, Backend, Frontend, Data, DevOps | Vasquez |
| `security-specialist` | Pentest/OWASP, IAM, Privacy, IR, GRC | Barrera |
| `legal-specialist` | Compliance, Contracts, Privacy, IP, Research | Subero |
| `marketing-specialist` | Brand, Content, Copywriting, SEO, GTM | Vera |
| `finance-specialist` | FP&A, Cost, Accounting, Tax | Dauhajre |
| `revenue-specialist` | Pricing, Funnel, RevOps, Deal structuring | Montero |
| `people-specialist` | People Ops, Agent Rules, Performance, Mediation | Santana |
| `automation-specialist` | Automation, DevOps, Workflow integration | Espinoza |

### 🛡️ Reviewers (independent; strictly 1 subagent per reviewer)

| Agent | Domain | Verdict tokens |
|-------|--------|----------------|
| `security-reviewer` | Security | `PASS` / `CONDITIONAL` / `FAIL` |
| `finance-reviewer` | Finance | `PASS` / `CONDITIONAL` / `FAIL` |
| `legal-reviewer` | Legal & regulatory | `PASS` / `CONDITIONAL` / `FAIL` (draft — a licensed human attorney approves) |
| `brand-reviewer` | Marketing & brand | `PASS` / `CONDITIONAL` / `FAIL` |
| `people-reviewer` | People & culture | `PASS` / `CONDITIONAL` / `FAIL` |
| `revenue-reviewer` | Revenue | `PASS` / `CONDITIONAL` / `FAIL` |
| `automation-reviewer` | Automation & ops | `PASS` / `CONDITIONAL` / `FAIL` |
| `review-data` | Data lens & schema (cross-cutting) | `PASS` / `CONDITIONAL` / `FAIL` |

### 🧪 Engineering Reviewers + QA (full wave)

| Agent | Focus |
|-------|-------|
| `review-readability` | Readability, cognitive load, onboarding cost |
| `review-reliability` | Correctness, determinism, graceful failure |
| `review-refuter` | Adversarial stress-test of assumptions (before QA) |
| `review-observability` | Logs, metrics, traces, diagnosability |
| `review-resilience` | Degradation, recovery, self-healing |
| `review-risk` | Change-level risk across technical/ops/business |
| `quality-assurance` | Runs the suite, coverage, REQ→test traceability |

## How to Interact with Agents

1. **Initialize with intent** (`frame-intent`): state the goal, who it affects, and what success looks like.
2. **Invoke skills explicitly**: name the stage skill (e.g., `review-architecture` for an ADR, `review-security` for auth/data/API).
3. **Respect the rules**: agents are bound by `rules/`. A refusal means the task violates a hard rule (e.g., `DENY.md`).
4. **Iterate via `propose-changes`**: refine outputs against a specific rule/reference, not "better".

## Deployment & Integration

- **Opencode Plugin**: `.opencode/plugins/` (skills, agents, guardrails, commands lanes).
- **Antigravity CLI (`agy`)**: root-drop plugin (`plugin.json`, `hooks.json`, `scripts/context-inject.ts`).
- **Pi**: `package.json` `pi` block (`skills/`, `.pi/extensions/`, `.pi/prompts/`).
- **Claude Code**: `.claude-plugin/`.

---
*"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## Folder Structure

| Folder | Purpose |
|--------|---------|
| `docs/frame-ship/briefs/` | Product Briefs (`BRIEF-XXX.md`) |
| `docs/frame-ship/research/` | Discovery findings + `RESEARCH_FINDINGS` |
| `docs/frame-ship/design/` | Architecture (`ARCHITECTURE.md`) |
| `docs/frame-ship/adr/` | Architecture Decision Records (`ADR-XXX.md`) |
| `docs/frame-ship/requirements/` | Requirements Index (`REQ-XXX.md`) |
| `docs/frame-ship/backlog/` | Implementation Specs (`SPEC-XXX.md`) |
| `docs/frame-ship/delivery/` | Release notes, handoffs, `OPERATE_REPORT.md` |
| `docs/frame-ship/workspace/` | Implementation artifacts, proposals, gate reports |
| `docs/frame-ship/archive/` | Archived specs + promoted evidence |
