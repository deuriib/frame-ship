# Quality Gate Report: SPEC-XXX

**Date:** YYYY-MM-DD
**Gate Status:** OPEN | CONDITIONAL | CLOSED
**Domains Touched:** [subset of 8: engineering, security, finance, legal, marketing/brand, people, revenue, automation/ops + data lens if applicable]

## Reviewer Verdicts

| Domain | Reviewer (actual agent) | Verdict | Findings | Artifact |
|--------|-------------------------|---------|----------|----------|
| engineering | review-readability | pass | 0 | `engineering/readability-review.md` |
| engineering | review-reliability | conditional | 2 | `engineering/reliability-review.md` |
| engineering | review-refuter | pass | 0 | `engineering/refuter-review.md` |
| engineering | review-resilience | pass | 0 | `engineering/resilience-review.md` |
| engineering | review-risk | pass | 0 | fast gate note |
| engineering | qa | pass | 0 | `engineering/qa-review.md` |
| engineering | review-data | pass | 0 | `domains/data-review.md` |
| security | security-reviewer | pass | 0 | `domains/security-review.md` |
| finance | finance-reviewer | pass | 0 | `domains/finance-review.md` |
| legal | legal-reviewer | pass | 0 | `domains/legal-review.md` |
| marketing/brand | brand-reviewer | pass | 0 | `domains/marketing-review.md` |
| people | people-reviewer | pass | 0 | `domains/people-review.md` |
| revenue | revenue-reviewer | pass | 0 | `domains/revenue-review.md` |
| automation/ops | automation-reviewer | pass | 0 | `domains/automation-review.md` (+ `domains/ops-review.md` lens when infra-touched) |

Delete non-touched domain rows before sign-off; multi-domain specs keep ALL touched rows.

## Conditions for Opening

- [ ] COND-001: [condition from conditional reviewer]

## Escalations

[Conflicting verdicts escalated to c-levels + montilla here]

## Sign-off

- [ ] All reviewers pass or conditions met
- [ ] Gate Keeper: owning C-level
- [ ] Final authority (if waived): c-levels + montilla
