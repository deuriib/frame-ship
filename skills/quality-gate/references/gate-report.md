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

## C3 — CONDITIONAL/waiver review record (surgical, security-owned)

> Every CONDITIONAL/waiver justification is challenged against the normative
> three-block bar in `references/waiver-template.md` (`Accepted-risk` +
> `Compensating-controls + owner` + `Expiry/Re-review date-or-condition +
> owner`). Missing block = FAIL, no promotion.

| Waiver (every CONDITIONAL — one row per waiver; rows = CONDITIONALs; sample-of-one never satisfies) | Accepted-risk | Compensating-controls + owner | Expiry + re-review owner | Verdict |
|---------------|---------------|-------------------------------|--------------------------|---------|
| [waiver link] | pass / fail | pass / fail | pass / fail | PASS / FAIL |

**Residual-risk:** [risk + owner, or explicit `none + owner` — silent APPROVE+conditions = FAIL]

Substance backstop (COND-K1/SEC1/Q4-shared): presence ≠ substance — a vacuous box-tick (`Accepted-risk: low because low`, owner `someone`, `Expiry: later`) FAILs via a recorded reviewer-judgment reason, never passes silently. Demo: `docs/specs/40_workspace/security/SAMPLE-grilling-C3-thin-FAIL.md` (3-waiver fixture: thin FAIL, missing-block FAIL, full PASS — every waiver gets a row).

Full re-review banned — C3 reviews every waiver against this bar only
(every CONDITIONAL gets a row; rows = CONDITIONALs — sample-of-one never satisfies),
never re-runs the routing table. CLOSED stays CLOSED without recorded
`domain-owners + orchestrator` sign-off. Retry N=2 → escalate orchestrator.
Expiry default: 90 days or next release, whichever first
(orchestrator-confirmed; re-review owner mandatory).

### PII checkpoint (REQ-SEC-003/004 + REQ-P-006 co-sign)

Zero PII/secrets/tokens/credentials/sessions in waiver text, grill
questions/answers/prompts/logs/examples/exports. Every prompt/adapter/event/log/
export is a declared PII checkpoint (mask/tokenize + allowlist); allowlisted
evidence only; Ley 172-13 minimization (purpose + TTL + deletion declared).
Wide/cross-tenant disclosure = finding. No-freelance-fix: findings report
`severity + location + evidence`, owner remediates — never rotate keys/patch
prod/widen perms. Proof-or-refuted: finding without `diff/scan/log` = REFUTED;
Critical/High with proof surfaces same session.

### Tone (REQ-P-003/006 co-sign, people owner verifies at gate)

Warm and direct — one waiver at a time; say `exit/salir` / pause anytime, no penalty.
Exit-terminal (COND-P5-shared): `exit/salir` mid-C3 = pause + recorded `grill: exited` + escalate; uncleared waivers stay CONDITIONAL, no silent promote.
Masking reminder rides every export.

## Load Evidence (HARD STOP — missing = CLOSED)

- [ ] Stage skill loaded: `skill(<stage>)` cited (name + trigger match)
- [ ] Domain owner/specialist role understood: domain role cited (dispatched role only)
- [ ] Execution mode declared: `subagents` (max 2, read orders in prompt)
- [ ] Packet intact: `SPEC:<path>#REQ / HARD:<mode+constraints> / GATE:<verdicts> / DOMAINS:<list>` — no full-context paste
- Any unchecked above → gate CLOSED, return to stage with findings (retry N=2 → escalate orchestrator).

## Escalations

[Conflicting verdicts escalated to domain owners + orchestrator here]

## Sign-off

- [ ] All reviewers pass or conditions met
- [ ] Gate Keeper: owning domain owner
- [ ] Final authority (if waived): domain owners + orchestrator
