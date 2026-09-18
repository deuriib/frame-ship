# Test / Evidence Matrix: Antigravity Discovery-Path Fix — Engineering Lane

**Agent:** vasquez (CTO) — engineering owner
**Date:** 2026-09-18
**Domains-Touched:** [engineering]
**Mode:** single — docs/config-only unit; evidence = diffs, listings, JSON validation (no code tests apply)

> **Singleton note:** canonical `40_workspace/engineering/TEST_MATRIX.md` slot (update-in-place, never suffix). Prior consolidation matrix superseded, recoverable from git history.

| REQ-ID        | Evidence ID | Description                                                                                                                               | Type   | Status | Commit          |
| ------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | --------------- |
| Mirror step   | V-001       | Mirror body byte-identical to `rules/frame-ship.md` (frontmatter stripped before diff)                                                    | Review | pass   | (working tree)  |
| Mirror step   | V-002       | Rule active as Always On (`alwaysApply: true` + `description:` trigger present) + footer `[frame-ship v0.6.1]` intact                     | Review | pass   | (working tree)  |
| Hooks step    | V-003       | `.agents/hooks.json` byte-identical to removed root twin, JSON-valid; single source resolves (root absent, canonical present)             | Review | pass   | (working tree)  |
| Surfaces step | V-004       | `plugin.json` valid per v1 `$schema`, left byte-identical (`git diff --name-only` clean) — conditional edit NOT elected, no ADR trigger   | Review | pass   | n/a (untouched) |
| Bridge step   | V-005       | `AGENTS.md` one-line bridge resolves to `.agents/rules/frame-ship.md` (pointer only, no pasted context)                                   | Review | pass   | (working tree)  |
| Constraint    | V-006       | Runtimes untouched: `git status` clean for `.opencode/plugins/frame-ship.ts`, `hooks/context-inject.ts`, `rules/frame-ship.md`, `skills/` | Review | pass   | n/a (untouched) |
| review-risk   | V-007       | Fast-gate screen: same hook commands/timeouts, no new permissions/scope/PII → **not triggered**, no findings                              | Review | pass   | n/a             |

## Coverage Summary

- Unit coverage: N/A (config/docs-only, no code paths — justification: mirror + move + pointer, zero behavior change to either runtime)
- Integration coverage: N/A (same justification)
- Evidence coverage: 7/7 checks with linked artifact or command output
- Acceptance criteria covered: 5/5 verify-runbook checks (V-001…V-005)

## review-risk fast-gate screen (per proposal §Approval)

Same three hook commands (`bun ./hooks/context-inject.ts`, `safety-gate.ts`, `format-note.ts`), same matchers, same timeout 10 — no new permissions, scope, trust boundary, or PII surface. Verdict: **no-trigger**, no findings. Architect/ADR: **not triggered** (plugin.json edit not elected). Security deep audit: **not triggered** (no new trust boundary).
