# Spec: pull-request skill (frame-ship-specific port)

**ID:** SPEC-pull-request
**Owner:** engineering owner
**Domains-Touched:** [engineering, automation/ops]
**Brief Reference:** BRIEF-pull-request
**Status:** approved
**Priority:** P1
**Execution_Mode:** single (inherited from brief)

## 1. Context

Port Gentle AI `branch-pr v2.0` discipline to a frame-ship skill named `pull-request`: small traceable PRs with branch naming, PR body, budget, and conventional commits, mapped to the frame-ship toolchain.

## 2. Requirements

- REQ-001: Skill dir `skills/pull-request/SKILL.md` exists with frontmatter `name: pull-request` + 1-sentence `description` with Use when/Triggered by, no extra keys.
- REQ-002: Body shape Purpose / Chain / 2b Role / Process / Won't do / References + creed quote, no code written outside skill docs.
- REQ-003: Branch naming pattern + examples (frame-ship types) documented.
- REQ-004: PR body template (linked issue/spec, summary, changes table, test plan, checklist) documented.
- REQ-005: 400-line review budget + exception rationale documented.
- REQ-006: Conventional Commits pattern + examples + breaking-change rule documented.
- REQ-007: Local checks mapped to frame-ship (`mise run typecheck`); no Go/E2E-Docker requirement.

## 3. Acceptance Criteria

- [ ] AC-001: `skills/pull-request/SKILL.md` exists, frontmatter exact (REQ-001).
- [ ] AC-002: Grep shows branch pattern, PR template sections, 400-line rule, commit pattern, `mise run typecheck` (REQ-003–REQ-007).

## 4. Contracts & Interfaces

Skill-only change. No API/data schema/event changes. No plugin edits.

## 5. Out of Scope

CI workflows, label automation, plugin runtime changes, renaming existing skills.

## 6. Dependencies

BRIEF-pull-request (approved). No external services.

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001–REQ-007 | AC-001–AC-002 | PROPOSED_CHANGES.md | grep + file existence |
