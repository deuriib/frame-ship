# OKRs: Agents Into Plugin Config

**Period:** Q3 2026
**Owner:** montilla (CEO)

## Objective 1: One install brings the full team

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-1.1 | 0 agents registered | full previous-plugin roster registered via config hook | `config.agents` keys count post-init |
| KR-1.2 | prompts missing | real bodies + descriptions, no raw frontmatter | spot-check 5 agents (montilla, vasquez, backend, qa, scout) |

## Objective 2: Zero regression on runtime contract

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-2.1 | single-file 154 lines, zero deps | still single-file, zero deps, tsc clean | `mise run typecheck` passes |
| KR-2.2 | idempotent skills.paths | idempotent agents + skills, never clobbers | double-init diff shows no duplicates |
