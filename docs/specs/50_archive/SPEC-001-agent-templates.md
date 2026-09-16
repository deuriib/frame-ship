# Spec: Agent Templates Migration

**ID:** SPEC-001-agent-templates
**Owner:** vasquez (CTO)
**Brief Reference:** BRIEF-agent-templates
**Status:** approved
**Priority:** P0
**Execution_Mode:** multi-subagents

## 1. Context

Migrate 68 global agents into `skills/templates/agents/` vendored templates so frame-ship chain remains the sole dispatcher. Reference-only: skills cite templates by path, never paste bodies. Plugin `frame-ship.ts` untouched.

## 2. Requirements

- REQ-001: All 68 agents vendored to `skills/templates/agents/<domain>/<agent>.md` with `mode/permission` preserved as meta block, skill frontmatter untouched
- REQ-002: Brief/spec/proposal templates carry `execution_mode: single | multi-subagents` chosen at frame-intent
- REQ-003: `execute-spec` dispatches single (one leaf + min gate) vs multi-subagents (fan-out + full review wave) per mode, both enforce CLOSED=no-handoff
- REQ-004: `quality-gate` routing table + `tool-mapping.md` document real `subagent_type` names, no parallel reviewer universe
- REQ-005: No secrets/PII in templates; OWASP + minimization checks pass; plugin `tsc --noEmit` clean

## 3. Acceptance Criteria

- [ ] AC-001: 68 templates exist, count verified, pilot 14 engineering slice traceable
- [ ] AC-002: `execution_mode` present in brief/spec/proposal and propagated via packets
- [ ] AC-003: Both modes produce OPEN gate only when all required reviewers sign
- [ ] AC-004: `tsc --noEmit` clean, bootstrap + compaction intact

## 4. Contracts & Interfaces

- Template header: `Template-For: <stage>`, `Execution: single|multi|both`, `Source: <global path>`, `Version-Pinned: 2026-09-15`
- Packet shape: `SPEC:<path>#REQ-IDs / HARD:<mode+constraints> / GATE:<verdicts>`
- Skill frontmatter: `name/description` only

## 5. Out of Scope

- Parsing agent `permission/mode` in plugin runtime; embedding bodies into SKILL.md; repo-local `.opencode/agents/` executable mirror

## 6. Dependencies

- Upstream: BRIEF-agent-templates (approved)
- External: global agents at `C:\Users\deuri\.config\opencode\agents\` as vendoring source

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change |
|-------------|---------------------|-----------------|
| REQ-001 | AC-001 | docs/specs/40_workspace/vasquez/PROPOSED_CHANGES.md |
| REQ-002 | AC-002 | docs/specs/40_workspace/vasquez/PROPOSED_CHANGES.md |
| REQ-003 | AC-003 | docs/specs/40_workspace/vasquez/PROPOSED_CHANGES.md |
| REQ-004 | AC-003 | docs/specs/40_workspace/vasquez/PROPOSED_CHANGES.md |
| REQ-005 | AC-004 | docs/specs/40_workspace/vasquez/PROPOSED_CHANGES.md |
