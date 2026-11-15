# Automation & Operations Review: SPEC-XXX

**Review Lens:** Automation & Operations (`automation/ops`)
**Date:** YYYY-MM-DD
**Verdict:** pass | conditional | fail

## Checklist

- [ ] Pipeline is reproducible, deterministic, and codified in repository
- [ ] No manual production steps or console changes required (rule: `deny-hard-gates`)
- [ ] Automated rollback path tested and documented in runbook
- [ ] Deployment strategy defined (canary, blue-green, rolling) with health checks
- [ ] Infrastructure as Code (IaC) is modular, tagged, and syntax-validated
- [ ] CI/CD secrets injected via secure vault/OIDC, never hardcoded
- [ ] SLOs, alerting thresholds, and escalation policies updated
- [ ] Operational runbook accessible and up-to-date

## Findings

| ID | Severity | Finding | Mitigation |
|----|----------|---------|------------|
| OPS-001 | High | [issue] | [action] |

## Verdict Rationale

[Why this verdict]
