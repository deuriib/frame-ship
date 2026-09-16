# OKRs: pull-request

**Period:** Q3 2026
**Owner:** orchestrator

## Objective 1: Repeatable frame-ship PR path

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-1.1 Skill exists | 0 (no PR skill) | `skills/pull-request/SKILL.md` merged | file exists with valid frontmatter |
| KR-1.2 Frame-ship checks mapped | Go-only source | `mise run typecheck` local-check contract | grep skill for mise, no `go test` requirement |

## Objective 2: Small traceable PRs

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-2.1 Budget enforced | ad hoc sizes | 400-line budget + exception rationale | skill states budget rule |
| KR-2.2 Trace enforced | ad hoc bodies | branch naming + Conventional Commits + PR body template | skill states all three |
