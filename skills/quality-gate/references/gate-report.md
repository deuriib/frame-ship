# Quality Gate Report: SPEC-XXX

**Date:** YYYY-MM-DD
**Gate Status:** OPEN | CONDITIONAL | CLOSED
**Domains Touched:** [subset of 8: engineering, security, finance, legal, marketing/brand, people, revenue, automation/ops + data lens if applicable]

## Reviewer Verdicts

| Domain          | Reviewer (actual agent) | Verdict     | Findings | Artifact                                                                           |
| --------------- | ----------------------- | ----------- | -------- | ---------------------------------------------------------------------------------- |
| engineering     | review-readability      | pass        | 0        | `engineering/readability-review.md`                                                |
| engineering     | review-reliability      | conditional | 2        | `engineering/reliability-review.md`                                                |
| engineering     | review-refuter          | pass        | 0        | `engineering/refuter-review.md`                                                    |
| engineering     | review-resilience       | pass        | 0        | `engineering/resilience-review.md`                                                 |
| engineering     | review-risk             | pass        | 0        | fast gate note                                                                     |
| engineering     | qa                      | pass        | 0        | `engineering/qa-review.md`                                                         |
| engineering     | review-data             | pass        | 0        | `domains/data-review.md`                                                           |
| security        | security-reviewer       | pass        | 0        | `domains/security-review.md`                                                       |
| finance         | finance-reviewer        | pass        | 0        | `domains/finance-review.md`                                                        |
| legal           | legal-reviewer          | pass        | 0        | `domains/legal-review.md`                                                          |
| marketing/brand | brand-reviewer          | pass        | 0        | `domains/marketing-review.md`                                                      |
| people          | people-reviewer         | pass        | 0        | `domains/people-review.md`                                                         |
| revenue         | revenue-reviewer        | pass        | 0        | `domains/revenue-review.md`                                                        |
| automation/ops  | automation-reviewer     | pass        | 0        | `domains/automation-review.md` (+ `domains/ops-review.md` lens when infra-touched) |

Delete non-touched domain rows before sign-off; multi-domain specs keep ALL touched rows.

## Conditions for Opening

- [ ] COND-001: [condition from conditional reviewer]

## Load Evidence (HARD STOP — missing = CLOSED)

- [ ] Stage skill loaded: `skill(<stage>)` cited (name + trigger match)
- [ ] Domain owner/specialist role understood: domain role cited (dispatched role only)
- [ ] Execution mode declared: `single` (direct, no task) or `multi-subagents` (max 2, read orders in prompt)
- [ ] Packet intact: `SPEC:<path>#REQ / HARD:<mode+constraints> / GATE:<verdicts> / DOMAINS:<list>` — no full-context paste
- Any unchecked above → gate CLOSED, return to stage with findings (retry N=2 → escalate orchestrator).

## Escalations

[Conflicting verdicts escalated to domain owners + orchestrator here]

## Sign-off

- [ ] All reviewers pass or conditions met
- [ ] Gate Keeper: owning domain owner
- [ ] Final authority (if waived): domain owners + orchestrator
