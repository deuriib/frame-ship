---
name: translate-to-spec
description: Translate an approved Product Brief into domain specs, architecture contracts, and testable requirements. Use after a brief is approved or when a new domain needs spec coverage.
---

# Translate-to-Spec — Brief to Domain Specs

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## 1. Purpose

The orchestrator routes the brief to the owning domain owners by reference; they produce testable REQ-IDs plus the
canonical architecture contract. The brief is read-only here.

## 2. Chain Contract

- Previous: frame-ship:frame-intent
- Next: frame-ship:propose-changes

## 2b. Role Binding (Org)

- **Bound to:** owning domain owners — engineering, security, finance, legal, marketing, people, revenue, automation (8-domain catalogue).
- Engineering owner consolidates `ARCHITECTURE.md` + `API_CONTRACTS.md`.

## 3. Process

0. Pre-flight LOAD — HARD STOP (single AND multi): `skill(translate-to-spec)` loaded? Owning domain owner identified? Packet `SPEC:<brief-path>#OKRs / HARD:<mode> / GATE:<none-yet> / DOMAINS:<list>` ready? Any NO → STOP. Single = direct, no task; multi = orchestrator dispatches, each ordered to understand domain role first; domain owners do the work or brief back.
1. Read `docs/briefs/BRIEF-<slug>.md` (reference only, never paste full context) including `execution_mode` and `Domains-touched`.
2. The orchestrator dispatches the owning domain owners by domains touched (8-domain catalogue in `../AGENTS.md`). Each dispatched domain owner understands their domain's practices and returns its spec to the orchestrator.
3. Each dispatched domain owner produces a spec using `references/spec-template.md` carrying `execution_mode` + `DOMAINS` forward; every spec declares `Domains-touched` + owning domain owner. Orchestrator dispatches entire team; domain owners do the work or brief back — the domain owner returns its deliverable to the orchestrator (max 2 parallel).
4. Engineering owner consolidates `docs/specs/10_design/ARCHITECTURE.md` and `API_CONTRACTS.md` (engineering contracts; non-engineering specs link domain contracts instead of forcing API shapes).
5. Index requirements in `docs/specs/15_requirements/` via `references/requirements-template.md` (functional + non-functional + domain controls).
6. Hand off to `frame-ship:propose-changes` as `SPEC:<spec-path>#REQ-IDs / HARD:<execution_mode+constraints> / GATE:<none-yet> / DOMAINS:<list>`.
7. Close with a commit. Example: `feat(spec-003): add REQ-IDs and ARCHITECTURE contract for auth`.

## 4. What I won't do

- Approve specs without security domain owner review for security-relevant domains.
- Modify the brief (escalate to `frame-ship:frame-intent`).
- Bypass the canonical architecture contract.

## 5. References

- `references/spec-template.md` — Spec with Context/REQ/AC/Contracts/Out-of-scope (includes `execution_mode` + packet).
- `references/architecture-template.md` — Architecture contract.
- `references/requirements-template.md` — Requirements index.
