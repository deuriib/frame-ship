# Risk Review: SPEC-commit-convention-v2

**Reviewer:** review-risk (fast gate)
**Date:** 2026-09-16
**Verdict:** pass

## Risk Checklist

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Agents continue using old flat scope syntax | Med | Low | Guidance only; new examples in convention file + stage SKILL.md examples will drift naturally |
| R-002 | Scope syntax too verbose for small changes | Low | Low | `<stage>/<work-unit>` is 2 tokens; subject stays ≤72 chars |
| R-003 | Confusion between stage name and work-unit id | Low | Low | Work Unit Definition table maps each stage to its identifier |

## Blast Radius

Documentation-only change to a single reference file. No systems, teams, customers, regulators, or revenue affected. All 9 stage SKILL.md files reference the file by path — path unchanged, no broken references.

## Rollback Plan

`git checkout -- skills/using-frame-ship/references/commit-convention.md` reverts instantly. No downstream dependencies on content.

## Security Considerations

No auth, data, external API, or PII impact. N/A.

## Domain Considerations

Engineering only. No finance/legal/marketing/people/revenue/automation impact.