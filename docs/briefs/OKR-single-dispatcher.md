# OKRs: Single Dispatcher — CEO-only Delegation Contract

**Period:** Q3 2026
**Owner:** montilla (CEO)

## Objective 1: One dispatcher — only montilla delegates, to the entire team

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-1.1 | 68 templates carry "no sub-delegation" but with informal flag wording | 68/68 templates carry the no-delegation + formal Cross-domain request wording | Grep count of new wording = 68; old flag wording ("flag it in your return", "suggested owner") = 0 outside allowed mechanism descriptions |
| KR-1.2 | Dispatch authority scattered across agents/, skills/, plugin, AGENTS.md | Contract reads identically in all 4 layers; plugin states "CEO dispatches entire team" | Grep for old verbs ("fan out", "flag don't grab", "route onward") = 0; plugin WORKFLOW_CARD contains "entire team" |
| KR-1.3 | ADR-003 referenced but file missing from `10_design` | ADR filed in `docs/specs/10_design/` with decision + rationale + rollback | File exists; cites decision, scope, and rollback |

## Objective 2: Cross-domain needs flow to the CEO as formal briefs

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-2.1 | Cross-domain mechanism = informal flag in return | Every c-level/specialist template defines the Cross-domain request section | Grep count of "Cross-domain request" = 68 templates |
| KR-2.2 | tool-mapping.md documents flag-don't-grab | tool-mapping.md documents the brief-back flow: CEO receives brief → delegates to right agent or resolves | Read-through: flow present, no old wording |
| KR-2.3 | Skills describe "C-level returns, never dispatches" | Skills describe "CEO dispatches entire team; c-levels/specialists do the work or brief back" | Grep of updated skills = 9/9 stage skills + using-frame-ship consistent |