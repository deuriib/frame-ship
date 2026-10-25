---
name: translate-to-spec
description: Use after a brief is approved or when a new domain needs spec coverage.
---

# Translate to Spec — Brief to Domain Specs

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

The orchestrator routes the brief to the owning domain owners by reference; they produce testable REQ-IDs plus the canonical architecture contract. The brief is read-only here.

## Chain Contract

- **Previous:** `frame-ship:frame-intent`
- **Next:** `frame-ship:propose-changes`

## Role Binding

Bound to **owning domain owners**—engineering, security, finance, legal, marketing, people, revenue, automation (8-domain catalogue). Engineering owner consolidates `ARCHITECTURE.md` (interfaces/API shapes in its Components table; no separate `API_CONTRACTS.md`).

## Process

0. **Pre-flight load — HARD STOP.** `skill(translate-to-spec)` loaded? Owning domain owner identified? Packet ready (`SPEC:<brief-path>#OKRs / HARD:<mode> / GATE:<none-yet> / DOMAINS:<list>`)? Any NO → STOP. Execution is subagents only. Trivial <15-line reversible work is CEO fast-path, outside methodology.
1. Read `docs/briefs/BRIEF-<slug>.md` (reference only, never paste full context) including `execution_mode` and `Domains-touched`.
2. **Orchestrator dispatches** the owning domain owners by domains touched. Each returns its spec to the orchestrator.
3. Each domain owner produces `docs/specs/20_backlog/SPEC-###-<slug>.md` via `references/spec-template.md`, carrying `execution_mode` + `DOMAINS` forward. Every spec declares `Domains-touched` + owning domain owner. Max 2 parallel lanes. Sequential degradation, same contract.
4. **Engineering owner consolidates** `docs/specs/10_design/ARCHITECTURE.md` via `../review-architecture/references/architecture-template.md`. Singleton: create-if-missing else update-in-place, never suffixed.
5. **Index requirements** in `docs/specs/15_requirements/` via `references/requirements-template.md` (functional + non-functional + domain controls).
6. **Hand off** to `propose-changes` as `SPEC:docs/specs/20_backlog/SPEC-###-<slug>.md#REQ-IDs / HARD:<execution_mode+constraints> / GATE:<none-yet> / DOMAINS:<list>`.
7. **Close with a commit.** Example: `feat(spec-003): add spec to 20_backlog with REQ-IDs and ARCHITECTURE contract`.

## What I Won't Do

- Approve specs without security domain owner review for security-relevant domains.
- Modify the brief (escalate to `frame-intent`).
- Bypass the canonical architecture contract.

## Red Flags

| Thought | Reality |
|---|---|
| "One SPEC covers everything" | Multiple independent subsystems → decompose. One SPEC cycle per scope. |
| "Architecture is obvious—skip the template" | `ARCHITECTURE.md` format is owned by `review-architecture`. Produce from it. |
| "REQ-IDs can be added later" | Every SPEC declares testable REQ-IDs + owning domain owner. No REQ-IDs = no SPEC. |
| "Engineering can spec for every domain" | Each domain owner specs its own domain. Engineering consolidates architecture only. |

## References

- `references/spec-template.md` — Spec with Context/REQ/AC/Contracts/Out-of-scope (includes `execution_mode` + packet).
- `references/requirements-template.md` — Requirements index.
- `../review-architecture/references/architecture-template.md` — Architecture contract format (owned by `review-architecture`, cited as producer).