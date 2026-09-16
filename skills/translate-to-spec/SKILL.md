---
name: translate-to-spec
description: Translate an approved Product Brief into domain specs, architecture contracts, and testable requirements. Use after a brief is approved or when a new domain needs spec coverage.
---

# Translate-to-Spec — Brief to Domain Specs

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## 1. Purpose

The CEO routes the brief to the owning C-levels by reference; they produce testable REQ-IDs plus the
canonical architecture contract. The brief is read-only here.

## 2. Chain Contract

- Previous: frame-ship:frame-intent
- Next: frame-ship:propose-changes

## 2b. Role Binding (Org)

- **Bound to:** owning C-levels — `vasquez` (engineering), `barrera` (security),
  `dauhajre` (finance), `subero` (legal), `vera` (marketing), `santana` (people),
  `montero` (revenue), `espinoza` (automation consult).
- `vasquez` consolidates `ARCHITECTURE.md` + `API_CONTRACTS.md`.

## 3. Process

0. Pre-flight LOAD — HARD STOP (single AND multi): `skill(translate-to-spec)` loaded? `read(agents/c-level/<owner>.md)` for owning C-level done? Packet `SPEC:<brief-path>#OKRs / HARD:<mode> / GATE:<none-yet> / DOMAINS:<list>` ready? Any NO → STOP. Single = direct, no task; multi = CEO dispatches via `task(general)` max 2 parallel, each ordered to read skill + template first; C-level returns its spec, never dispatches.
1. Read `docs/briefs/BRIEF-<slug>.md` (reference only, never paste full context) including `execution_mode` and `Domains-touched`.
2. The CEO dispatches the owning C-levels by domains touched (8-domain catalogue in `../AGENTS.md`), max 2 parallel; each dispatched C-level reads its own template fully, cites other `agents/c-level/<owner>.md` craft by path, and returns its spec to the CEO.
3. Each dispatched C-level produces a spec using `references/spec-template.md` carrying `execution_mode` + `DOMAINS` forward; every spec declares `Domains-touched` + owning C-level. CEO dispatches max 2; C-level returns deliverable, never dispatches.
4. `vasquez` consolidates `docs/specs/10_design/ARCHITECTURE.md` and `API_CONTRACTS.md` (engineering contracts; non-engineering specs link domain contracts instead of forcing API shapes).
5. Index requirements in `docs/specs/15_requirements/` via `references/requirements-template.md` (functional + non-functional + domain controls).
6. Hand off to `frame-ship:propose-changes` as `SPEC:<spec-path>#REQ-IDs / HARD:<execution_mode+constraints> / GATE:<none-yet> / DOMAINS:<list>`.
7. Close with work-unit commit per `../using-frame-ship/references/commit-convention.md` (guidance only). Example: `feat(spec-003): add REQ-IDs and ARCHITECTURE contract for auth`.

## 4. What I won't do

- Approve specs without `barrera` review for security-relevant domains.
- Modify the brief (escalate to `frame-ship:frame-intent`).
- Bypass the canonical architecture contract.

## 5. References

- `references/spec-template.md` — Spec with Context/REQ/AC/Contracts/Out-of-scope (includes `execution_mode` + packet).
- `references/architecture-template.md` — Architecture contract.
- `references/requirements-template.md` — Requirements index.
- `../../agents/README.md` — Vendored templates index.
- `../using-frame-ship/references/commit-convention.md` — Commit format + per-stage examples (guidance only; see `frame-ship:using-frame-ship`).
