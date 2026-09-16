---
name: translate-to-spec
description: Translate an approved Product Brief into domain specs, architecture contracts, and testable requirements. Use after a brief is approved or when a new domain needs spec coverage.
---

# Translate-to-Spec — Brief to Domain Specs

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## 1. Purpose

Route the brief to the owning C-levels and produce testable REQ-IDs plus the
canonical architecture contract. The brief is read-only here.

## 2. Chain Contract

- Previous: frame-intent
- Next: propose-changes

## 2b. Role Binding (Org)

- **Bound to:** owning C-levels — `vasquez` (engineering), `barrera` (security),
  `dauhajre` (finance), `subero` (legal), `vera` (marketing), `santana` (people),
  `montero` (revenue), `espinoza` (automation consult).
- `vasquez` consolidates `ARCHITECTURE.md` + `API_CONTRACTS.md`.

## 3. Process

1. Read `docs/briefs/BRIEF-<slug>.md` (reference only, never paste full context) including `execution_mode` and `Domains-touched`.
2. Route to C-levels by domains touched (8-domain catalogue in `../AGENTS.md`); cite `agents/c-level/<owner>.md` craft by path when relevant.
3. Each produces a spec using `references/spec-template.md` carrying `execution_mode` + `DOMAINS` forward; every spec declares `Domains-touched` + owning C-level.
4. `vasquez` consolidates `docs/specs/10_design/ARCHITECTURE.md` and `API_CONTRACTS.md` (engineering contracts; non-engineering specs link domain contracts instead of forcing API shapes).
5. Index requirements in `docs/specs/15_requirements/` via `references/requirements-template.md` (functional + non-functional + domain controls).
6. Hand off to `propose-changes` as `SPEC:<spec-path>#REQ-IDs / HARD:<execution_mode+constraints> / GATE:<none-yet> / DOMAINS:<list>`.

## 4. What I won't do

- Approve specs without `barrera` review for security-relevant domains.
- Modify the brief (escalate to `frame-intent`).
- Bypass the canonical architecture contract.

## 5. References

- `references/spec-template.md` — Spec with Context/REQ/AC/Contracts/Out-of-scope (includes `execution_mode` + packet).
- `references/architecture-template.md` — Architecture contract.
- `references/requirements-template.md` — Requirements index.
- `../../agents/README.md` — Vendored templates index.
