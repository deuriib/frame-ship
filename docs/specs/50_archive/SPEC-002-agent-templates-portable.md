# Spec: Agent Templates Portable Rewrite (Harness-Agnostic)

**ID:** SPEC-002-agent-templates-portable
**Owner:** vasquez (CTO)
**Brief Reference:** BRIEF-agent-templates + user directive 2026-09-16 (portable rewrite)
**Status:** approved (user directive = approval to execute)
**Priority:** P0
**Execution_Mode:** multi-subagents (full engineering review wave)

## 1. Context

SPEC-001 vendored 68 agents with opencode lock-in baked into every file
(`mode`/`permission`/`temperature` frontmatter-as-meta, `@agent` dispatch,
`SPEC:`/`HARD:`/`GATE:` packets, Spanish execute footer, mandatory
doc resolve→query flow, hardcoded workspace allow-paths). The templates only
work on opencode. Goal: identical craft, portable to any harness.

## 2. Requirements

- REQ-P1: All 68 files get generic frontmatter (`name`, `description` only);
  opencode keys removed (→ `Capabilities` needs section).
- REQ-P2: `@agent` dispatch → plain `` `agent` `` references; packet jargon →
  plain words; Spanish footer → English `Delegation` + optional adapter.
- REQ-P3: Every file carries Capabilities / Working agreement
  (inputs/outputs by reference, evidence, no-secrets + minimization) /
  Delegation (plain language) / `Frame-Ship adapter (when run inside
  frame-ship)` as terminal optional section (not core identity).
- REQ-P4: Zero craft loss — role, responsibilities, workflow, output shape,
  quality bar, domain principles preserved (adversarially verified).
- REQ-P5: Count 68 + README, no renames; plugin `frame-ship.ts` untouched
  (single-file zero-dep); no secrets/PII; OWASP + minimization hold.
- REQ-P6: Gate opens only on readability APPROVE + risk APPROVE +
  refuter APPROVE + qa PASS, no Critical/High open.

## 3. Acceptance Criteria

- [ ] AC-P1: 68 + README portable per schema; contract sections 68/68.
- [ ] AC-P2: Case-sensitive residue zero in agent files (dispatch, packets,
  meta, footer, temperature, workspace paths, doc-mandatory-flow).
- [ ] AC-P3: Refuter HOLDS craft-preserved on samples across all 9 domains.
- [ ] AC-P4: Gate verdicts recorded; plugin diff empty; HANDOFF with DoD.

## 4. Contracts & Interfaces

- Template schema: frontmatter → H1 + portable note → Capabilities →
  Working agreement → preserved craft → Delegation → Frame-Ship adapter.
- Partially supersedes ADR-001 (meta-block decision) — see ADR-002.
- Skill `§5` path cites unchanged (no renames).

## 5. Out of Scope

- Chain skill edits (`skills/AGENTS.md:26`, `tool-mapping.md:11` now stale
  w.r.t. template meta — flagged follow-up, not this unit).
- Repo-local executable agent mirrors; runtime parsing of templates.

## 6. Traceability

| Requirement | Acceptance Criterion | Gate |
|-------------|---------------------|------|
| REQ-P1 | AC-P1 | qa checks 1,2,4 + readability |
| REQ-P2 | AC-P2 | qa check 3 + refuter CLAIM 2 |
| REQ-P3 | AC-P1 | qa check 4 + refuter CLAIM 3 |
| REQ-P4 | AC-P3 | refuter CLAIM 1 + readability |
| REQ-P5 | AC-P4 | qa checks 1,5 + refuter CLAIM 4 |
| REQ-P6 | AC-P4 | HANDOFF-002-portable DoD |
