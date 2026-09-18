# Handoff: SPEC-pull-request

**Spec:** `docs/specs/20_backlog/SPEC-pull-request.md`
**Gate:** OPEN (`docs/specs/40_workspace/quality-gate/pull-request/GATE_REPORT.md`)
**Date:** 2026-09-16
**Execution_Mode:** single

## Deliverables

- `skills/pull-request/SKILL.md` (frontmatter `name: pull-request`, full body)
- `skills/pull-request/references/pr-body-template.md`
- `skills/pull-request/references/branch-commit-guide.md`
- Trace: BRIEF-pull-request → SPEC-pull-request → PROPOSED_CHANGES-pull-request → GATE_REPORT (OPEN)

## DoD

- [x] All REQ-001–REQ-007 satisfied (AC-001 file exists, AC-002 grep verified)
- [x] Min gate green (readability/risk/refuter/qa ✅, no conditions)
- [x] `mise run typecheck` EXIT 0 (plugin untouched, baseline green)
- [x] No secrets/PII in skill or examples
- [x] review-security / review-architecture waived with recorded rationale (no auth/data/API/PII; no public API change)

## Risks (retained)

None material. Follow-up candidates (not blockers): repo-specific PR template file (`.github/PULL_REQUEST_TEMPLATE.md`), label automation — both declared out of scope.

## Next

Route to `frame-ship:ship-release` with `SPEC:docs/specs/20_backlog/SPEC-pull-request.md#REQ-001–REQ-007 / HARD:single+docs-only / GATE:OPEN / DOMAINS:engineering,automation/ops`.
