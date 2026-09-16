# Implementation Plan: SPEC-XXX

**Agent:** [specialist name]
**Date:** YYYY-MM-DD
**Approved By:** owning domain owner + engineering owner, security owner (if engineering/security-relevant)
**Domains-Touched:** [per spec]

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | [step — file change OR document/campaign/contract/policy/workflow action] | [files or non-code target] | [artifact path or sign-off location] | [hours] |

Each step maps to one work-unit commit unless the plan explicitly groups them (see `../../using-frame-ship/references/commit-convention.md`).

## Order of Operations

[Why this order? What dependencies exist?]

## Rollback Points

[Where can we safely stop and revert? Code revert + non-code undo with owner.]

## Quality Gates

Domain checks (delete non-touched, keep evidence path):

- [ ] Engineering: Lint / Tests / Security / Type checks passing
- [ ] Finance: peer review + finance owner controls sign-off
- [ ] Legal: redline review + legal owner sign-off
- [ ] Marketing: brand review + marketing owner copy sign-off
- [ ] People: people owner impact/change-plan sign-off
- [ ] Revenue: revenue owner pipeline/quota check
- [ ] Automation/ops: automation owner + engineering owner runbook/flags/capacity check
