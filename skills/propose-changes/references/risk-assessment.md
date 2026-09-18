# Risk Assessment: SPEC-XXX

**Proposer:** [Agent]
**Date:** YYYY-MM-DD
**Domains-Touched:** [per proposal]

## Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | [description] | Low/Med/High | Low/Med/High | [action] |

## Blast Radius

[What systems/teams/customers/regulators/revenue are affected if this change fails? Split by domain when multi-domain: engineering (services/data), finance (budget/controls), legal (exposure), marketing (brand/GTM), people (team/culture), revenue (pipeline/targets), automation/ops (runbooks/capacity).]

## Rollback Plan

[How to revert if issues arise — code revert AND non-code undo: retract comms, void filing, reverse close entry, disable workflow, with owner + ETA.]

## Security Considerations

[Auth, data exposure, input validation — security owner to confirm]

## Domain Considerations

[Finance: budget/controls — finance owner. Legal: IP/regulatory/liability — legal owner. Marketing: brand/GTM — marketing owner. People: workload/culture/change plan — people owner. Revenue: pipeline/quota — revenue owner. Automation/ops: runbook/capacity/flags — automation owner + engineering owner. Delete non-touched domains.]

## C2 budget note (REQ-002 — additive)

One-pass budget: a triggered challenge round runs exactly once, then terminal
approve/reject; no second pass without approver request. Blast-radius trigger
pointer: any blast-radius line mentioning customers/regulators/revenue fires
the C2 round. Rollback/approve-reject terminal preserved — the round challenges
the plan, it never rewrites it.
