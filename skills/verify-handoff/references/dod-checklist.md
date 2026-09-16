# Definition of Done: SPEC-XXX

**Verifier:** [agent]
**Date:** YYYY-MM-DD
**Domains-Touched:** [per spec]

## Common (all 8 domains)

- [ ] All acceptance criteria met
- [ ] All REQ-IDs have linked evidence (test OR review/sign-off/attestation)
- [ ] Edge cases / failure modes handled
- [ ] Gate OPEN (or CONDITIONAL conditions cleared + waiver recorded if applicable)
- [ ] Load evidence: stage skill + dispatched agent template cited (paths), execution_mode declared, packet intact — missing = FAIL, no handoff
- [ ] Docs/changelog updated for user-facing impact

## Engineering (vasquez — only if engineering-touched)

- [ ] Lint passes with zero warnings
- [ ] Type checks pass
- [ ] Test coverage meets threshold
- [ ] No TODO/FIXME left in code

## Security (barrera — only if security-touched)

- [ ] Security review conditions met
- [ ] No secrets in code/config/logs/examples
- [ ] Input validation at all boundaries

## Domain appendix (only touched domains)

- [ ] Finance (dauhajre): budget/controls/audit-trail signed
- [ ] Legal (subero): redline/IP/regulatory/liability signed, filing proof attached if applicable
- [ ] Marketing (vera): brand/copy/GTM sign-off, launch-readiness checked if external-facing
- [ ] People (santana): impact/skills/change-plan signed, comms sent if required
- [ ] Revenue (montero): pipeline/quota/forecast check signed, GTM handoff to vera confirmed
- [ ] Automation/ops (espinoza + vasquez): workflow tested, rollback/runbook/monitoring/flags checked
- [ ] Data lens (vasquez): lineage/schema/migration/backfill + PII handling signed if applicable

## Documentation

- [ ] API docs updated (engineering) OR domain artifact filed in agreed location
- [ ] Changelog entry added (or N/A with justification for internal-only non-code)
- [ ] ADR written if architecture contract changed
