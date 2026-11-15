# AGENTS.md

## Overview

This repository implements the **Frame→Ship** delivery methodology — from strategic intent (`frame-intent`) through specification, pre-approval proposal, security and architecture review, implementation, multi-domain quality gate, handoff verification, and release archival (`ship-release`).

## Architecture Pillars

Frame→Ship is built on two pillars:

1. **Skills (`skills/`):** Composable stage workflows and methodologies. Each skill consists of a `SKILL.md` (instruction set) and `references/` (templates, checklists, and rubrics).
2. **Rules (`rules/`):** Domain-specific constraints and guardrails enforced across execution:
   - `always_on` foundation rules (`Frame-ship.md`, `coding-standards.md`, `commit-conventions.md`, `deny-hard-gates.md`, `docs-upkeep.md`, `foundation-conduct.md`, `minimal-code.md`, `testing-discipline.md`) are injected on every context build and compaction.
   - `model_decision` domain rules (`architecture.md`, `devops.md`, `engineering-standards.md`, `trust-boundaries.md`, `data-minimization.md`, etc.) load on demand when their domain activates.

## Functional Domains & Specialized Review Skills

Work in Frame→Ship is organized across 8 functional domains (plus a cross-cutting data lens), each backed by dedicated specialized review skills:

| Domain | Scope | Specialized Review Skill(s) | Verdicts |
|--------|-------|-----------------------------|----------|
| `engineering` | Architecture, readability, reliability, refuter, observability, resilience, risk, QA | `review-architecture`, `review-readability`, `review-reliability`, `review-refuter`, `review-observability`, `review-resilience`, `review-risk`, `review-quality-assurance` | `PASS` / `CONDITIONAL` / `FAIL` |
| `security` | Cybersecurity, IAM, STRIDE threat modeling, OWASP Top 10, privacy | `review-security` | `PASS` / `CONDITIONAL` / `FAIL` |
| `legal` | Regulatory compliance, contracts, licensing, IP, Ley 172-13 | `review-legal` (licensed human attorney approves) | `PASS` / `CONDITIONAL` / `FAIL` |
| `finance` | Unit economics, FP&A, accounting controls, tax, treasury | `review-finance` | `PASS` / `CONDITIONAL` / `FAIL` |
| `marketing/brand` | Brand positioning, content production, claims substantiation, channel operations | `review-marketing` | `PASS` / `CONDITIONAL` / `FAIL` |
| `revenue` | Pricing, deal desk, pipeline forecasting, billing recognition, post-sale | `review-revenue` | `PASS` / `CONDITIONAL` / `FAIL` |
| `people` | Culture, Creed alignment, compensation, collaboration, change impact | `review-people` | `PASS` / `CONDITIONAL` / `FAIL` |
| `automation/ops` | IaC, CI/CD pipelines, runbooks, SLOs, rollback readiness | `review-automation` | `PASS` / `CONDITIONAL` / `FAIL` |
| `data` (cross-cutting) | Schema design, migrations, lineage, retention, PII minimization | `review-data` | `PASS` / `CONDITIONAL` / `FAIL` |

## How to Work with Frame→Ship

1. **Initialize with intent** (`frame-intent`): state the goal, who it affects, and what success looks like.
2. **Invoke skills explicitly**: load the stage skill (`review-architecture` for an ADR, `review-security` for auth/data/API, `execute-spec` for implementation, `quality-gate` for verification).
3. **Respect the rules**: execution is bound by `rules/`. A refusal means the task violates a hard gate (e.g., `rules/deny-hard-gates.md`).
4. **Iterate via `propose-changes`**: refine outputs against a specific rule or reference, never write implementation code before proposal approval.

## Deployment & Integration

- **OpenCode Plugin**: `.opencode/plugins/` (`skills`, `guardrails`, and `commands` lanes + `frame-ship.ts` composed entry).
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
| `docs/frame-ship/delivery/` | Release notes (`RELEASE_NOTES.md`), `OPERATE_REPORT.md` |
| `.frame-ship/` | Ephemeral workspace (gitignored): proposals, plans, test matrices, gate reports, handoffs |
| `docs/frame-ship/archive/` | Archived specs + promoted final artifacts (`GATE_REPORT.md`, `HANDOFF.md`, `ARCHIVE-RECORD.md`) |
