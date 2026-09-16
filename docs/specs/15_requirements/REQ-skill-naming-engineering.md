# Requirements Index: Skill-naming convention (Engineering)

**Owner:** engineering owner
**Brief Reference:** BRIEF-skill-naming (extends BRIEF-skill-refs-normalization, residual-only)
**Domains-Touched:** [engineering] (automation/ops conditional — plugin strings recorded only)
**Spec:** docs/specs/40_workspace/vasquez/SPEC-skill-naming-engineering.md
**Execution_Mode:** single
**Note on IDs:** REQ-IDs match the spec exactly (REQ-001..005 + REQ-NF-001..003).

## Functional Requirements

| ID | Requirement | Priority | Source | Spec | Domain | Evidence Type |
|----|-------------|----------|--------|------|--------|---------------|
| REQ-001 | Canonical navigation form: inter-skill cites use `frame-ship:{skill-name}` | P0 | BRIEF OKR KR-1.1 | SPEC-skill-naming-engineering | engineering | review + grep `frame-ship:` |
| REQ-002 | Carve-out table frozen: frontmatter `name:` / filesystem paths / native `skill()` tool args stay bare with rationale | P0 | BRIEF Desired Outcome | SPEC-skill-naming-engineering | engineering | review (table §4) |
| REQ-003 | All 15 bare `skill(...)` cites in `skills/` dispositioned: canonicalize or carve-out row; 0 unmapped | P0 | BRIEF OKR KR-1.2 | SPEC-skill-naming-engineering | engineering | grep `skill\(` before/after + table |
| REQ-004 | Chain/dir strings mapped per surface (AGENTS.md, skills/AGENTS.md, README.md, bootstrap-checklist, plugin CHAIN/cards); plugin runtime deferred to automation follow-up | P0 | BRIEF OKR KR-2.1, Scope [automation/ops] | SPEC-skill-naming-engineering | engineering | review + surface map |
| REQ-005 | Residual-only guard: no intentional-bare touch, no renames, no runtime code; revertible | P0 | BRIEF Out of Scope | SPEC-skill-naming-engineering | engineering | `git status` + diff stat |

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| REQ-NF-001 | No secrets/PII in spec, REQ index, or cite edits (Ley 172-13) | Security / Privacy | scan = 0 |
| REQ-NF-002 | Grep-verifiable: `skill\(` + `frame-ship:` counts reproducible by gate | Consistency | counts logged |
| REQ-NF-003 | Rollback via `git revert`; docs-only | Operability | ETA < 5 min, plan + HANDOFF |

## Domain Controls (only touched domains)

| Domain | Control | Owner |
|--------|---------|-------|
| engineering | Docs-prose cites only; loader contract intact; no arch/API/contracts surface | engineering owner |
| automation/ops | Plugin `CHAIN`/card strings recorded as follow-up, not edited here | automation owner (conditional) |
| security | Docs-only, no auth/data/API surface; N/A review at gate | security owner |

## Traceability Anchor

| Layer | Files | REQ-IDs |
|-------|-------|---------|
| Brief | `docs/briefs/BRIEF-skill-naming.md#OKRs` (extends `BRIEF-skill-refs-normalization.md`) | REQ-001..005, NF |
| Spec/REQ | `40_workspace/vasquez/SPEC-skill-naming-engineering.md`, `15_requirements/REQ-skill-naming-engineering.md` | REQ-001..005 + NF |
| Skills surface | 10 `SKILL.md` §0/§3 + `quality-gate/references/gate-report.md:34` (15 cites); chains in `AGENTS.md`, `skills/AGENTS.md`, `README.md`, `bootstrap-checklist.md:8`; plugin `frame-ship.ts:4,13-14,16,20,29` | REQ-003, REQ-004 |
