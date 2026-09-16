# Spec: debugging skill — systematic root-cause before fixes

**ID:** SPEC-debugging-engineering
**Owner:** engineering owner
**Domains-Touched:** [engineering, automation/ops]
**Brief Reference:** BRIEF-debugging
**Status:** draft
**Priority:** P1
**Execution_Mode:** single (inherited from brief)

## 1. Context

Adapt obra `systematic-debugging` (pinned b36e082) into native `skills/debugging/` named `debugging`. Enforce Iron Law (no fixes without Phase-1 investigation) and route all bug work through frame-ship chain instead of sideways fixes.

## 2. Requirements

- REQ-001: SKILL frontmatter exact `name: debugging` + 1-sentence description with `Use when/Triggered by` (bug/test failure/unexpected behavior, before fixes); no extra keys.
- REQ-002: Body shape Purpose / Chain / 2b Role / Process / Won't do / References + creed quote; chain declares Prev (propose-changes/execute-spec callers) / Next (propose-changes) without breaking fixed chain order.
- REQ-003: Iron Law + 4 phases (Root-Cause → Pattern → Hypothesis → Implementation) with Phase-1 evidence gates (error read, reproduce, recent-changes, boundary instrumentation, data-flow trace).
- REQ-004: Red-flags + 3-failure rule: stop after 3 failed fixes, question architecture, escalate to orchestrator/human — never Fix #4 silently.
- REQ-005: Reference-only packets + REQ→test→artifact→verdict trace; supporting techniques kept as `references/` (root-cause-tracing, defense-in-depth, condition-based-waiting) or explicitly dropped with reason.

## 3. Acceptance Criteria

- [ ] AC-001: `skills/debugging/SKILL.md` passes frontmatter + body-shape check.
- [ ] AC-002: Iron Law + 4 phases + red flags + 3-failure rule present and worded as gates, not advice.
- [ ] AC-003: Chain binding states when debugging runs (pre-proposal / pre-execute) and hands off via PROPOSED_CHANGES, never direct code.
- [ ] AC-004: No vendored TDD/verification skills; referenced by name only.
- [ ] AC-005: Guardrails 1-14 hold: no secrets in examples, least-privilege evidence logging, PII minimization at boundaries.

## 4. Contracts & Interfaces

- Output targets: `skills/debugging/SKILL.md`, `skills/debugging/references/root-cause-tracing.md`, `skills/debugging/references/defense-in-depth.md`, `skills/debugging/references/condition-based-waiting.md`.
- Sign-off contracts: engineering owner (process fidelity), automation owner (evidence/runbook note), security owner (example hygiene per guardrails 1-4).

## 5. Out of Scope

Runtime/plugin changes; existing stage edits; vendoring external skills.

## 6. Dependencies

BRIEF-debugging; source SKILL.md @ b36e082 (reference only); skills/AGENTS.md conventions.

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001 | PROPOSED_CHANGES.md | frontmatter check |
| REQ-002 | AC-001, AC-003 | PROPOSED_CHANGES.md | body-shape diff |
| REQ-003 | AC-002 | PROPOSED_CHANGES.md | phase-gate text |
| REQ-004 | AC-002 | PROPOSED_CHANGES.md | 3-failure rule text |
| REQ-005 | AC-003, AC-004 | PROPOSED_CHANGES.md | packet + trace statement |
