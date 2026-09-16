# Archive Record: pull-request skill (frame-ship-specific port)

**ID:** SPEC-pull-request
**Owner:** engineering owner
**Brief Reference:** docs/briefs/BRIEF-pull-request.md (read-only, not modified)
**Status:** shipped (terminal — read-only, never edit in place; supersede with a new ID)
**Priority:** P1
**Execution_Mode:** single (frozen at frame-intent)
**Gate:** OPEN 4/4 min gate — docs/specs/40_workspace/quality-gate/pull-request/GATE_REPORT.md (no waiver; review-security / review-architecture waived with recorded rationale: no auth/data/API/PII, no public API change)
**DoD:** verified — docs/specs/40_workspace/engineering/HANDOFF-pull-request.md

## 1. Superseding Summary (what shipped)

Supporting skill `skills/pull-request/` — Gentle AI `branch-pr v2.0`
discipline ported frame-ship-specific. Chain
`frame-intent → … → ship-release` unchanged; plugin single-file zero-dep
untouched; 8-domain catalogue unchanged.

| Shipped | Path |
|---------|------|
| Skill contract | `skills/pull-request/SKILL.md` (frontmatter exact `name: pull-request`, body Purpose/Chain/2b/Process/Won't do/References + creed) |
| PR body template | `skills/pull-request/references/pr-body-template.md` (linked unit, summary, changes, test plan, checklist) |
| Branch + commit guide | `skills/pull-request/references/branch-commit-guide.md` (naming pattern, Conventional Commits, breaking-change rule) |

Frame-ship adaptations: local checks mapped to `mise run typecheck`
(no Go/E2E-Docker); label automation (`type:*`/`status:approved`)
replaced by single-intent + linked issue-or-spec rule; 400-line review
budget + exception rationale retained.

## 2. Trace

BRIEF-pull-request (+ OKR-pull-request) → SPEC-pull-request
(`docs/specs/20_backlog/`) → REQ-pull-request
(`docs/specs/15_requirements/`) → PROPOSED_CHANGES-pull-request
(`docs/specs/40_workspace/engineering/`) → GATE_REPORT (OPEN)
→ HANDOFF-pull-request → release commit `cfe273a`.
