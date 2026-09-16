# Proposed Changes: engineering owner — debugging skill

**Spec Reference:** SPEC-debugging-engineering
**Agent:** engineering owner
**Date:** 2026-09-16
**Execution_Mode:** single
**Domains-Touched:** [engineering, automation/ops]

## Summary

Create native `skills/debugging/` (`SKILL.md` + 3 references) adapting obra systematic-debugging b36e082 to frame-ship shape. No runtime or existing-stage edits; impl files untouched until approval.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `skills/debugging/SKILL.md` | file-create | Iron Law + 4 phases + red flags + 3-failure rule, frame-ship body shape, chain prev/next, packets |
| `skills/debugging/references/root-cause-tracing.md` | file-create | Backward trace technique adapted, sanitized examples |
| `skills/debugging/references/defense-in-depth.md` | file-create | Post-fix layered validation |
| `skills/debugging/references/condition-based-waiting.md` | file-create | Condition polling over arbitrary sleeps |

## Rationale

Satisfies REQ-001→REQ-005: correct name/shape, gated phases, escalation rule, packet trace, no vendoring. Keeps all 3 supporting techniques (explicit keep decision closes open question).

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| New top-level chain stage | Breaks fixed 9-stage order; debugging is pre-proposal lens, not gate |
| Vendor TDD/verification skills inline | Scope creep + duplication; reference by name |

## Approval Required From

- [ ] Owning domain owner: engineering owner
- [ ] engineering owner (architecture/cross-cutting impact — same)
- [ ] security owner (example/log hygiene per guardrails 1-4)

> **Rule:** No repository file modifications during proposal phase.

---
# Risk Assessment: SPEC-debugging-engineering

**Proposer:** engineering owner
**Date:** 2026-09-16
**Domains-Touched:** [engineering, automation/ops]

## Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Trigger overlaps execute-spec (agents skip or double-run) | Med | Med | Explicit prev/next: debugging runs pre-proposal/pre-execute, hands off via PROPOSED_CHANGES |
| R-002 | Examples leak secrets/PII (keychain/env dumps in source) | Med | High | Sanitize all examples; security owner must confirm; guardrails 1-8 |
| R-003 | Teams treat phases as advice, keep guess-fixing | Med | Med | Word gates as MUST/STOP; gate trace REQ→evidence→verdict |

## Blast Radius

Engineering (new skill dir only; no service/data impact). Automation/ops (guidance text only; no runbook change). No customer/regulator/revenue impact.

## Rollback Plan

Delete `skills/debugging/` dir; revert proposal commit. Owner: engineering owner, ETA <15 min.

## Security Considerations

No auth/data/API changes. Examples must not contain tokens/creds; boundary logging least-privilege, allowlisted evidence only.

## Domain Considerations

Automation/ops: bounded logging + condition polling, no arbitrary timeouts — automation owner.
