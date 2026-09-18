# Sample: C3 thin-waiver FAIL demo (substance backstop + multi-waiver every-not-sample)

**Agent:** barrera (CISO) — security lane
**Date:** 2026-09-18
**Purpose:** prove presence ≠ substance at C3 + prove every CONDITIONAL gets a row (COND-R4/K1/Q4/SEC2 + COND-K1/SEC1/Q4-shared)
**Skill:** `skills/execute-spec/SKILL.md` via `frame-ship:execute-spec`
**Bar:** `skills/quality-gate/references/waiver-template.md` three-block bar + `skills/quality-gate/references/gate-report.md` C3 record
**PII:** zero PII/secrets/tokens/credentials/sessions in this fixture (masking reminder rides every export; Ley 172-13 minimization)

## Fixture: 3 CONDITIONALs, 3 rows (rows = CONDITIONALs)

| Waiver | Accepted-risk | Compensating-controls + owner | Expiry + re-review owner | Verdict |
|--------|---------------|-------------------------------|--------------------------|---------|
| W-A (thin, all blocks present) | fail (substance) — `low because low` states no risk | fail (substance) — `will be careful (owner: someone)` names no control, no evidence-ref | fail (substance) — `later` names no date/condition, no re-review owner | **FAIL** (reviewer-judgment reason recorded below) |
| W-B (missing block) | pass — `stale waiver ships weak justification past review` | fail (presence) — block absent | pass — `2026-12-17 + re-review owner: barrera` | **FAIL** (missing block = FAIL, no promotion) |
| W-C (full) | pass — `review-load delay on 20-REQ round, accepted for one cycle because caps + pause/exit bound fatigue` | pass — `batch + pause/exit per batch (owner: engineering owner, evidence-ref: gate-report C3 record)` | pass — `90 days or next release, whichever first + re-review owner: barrera` | **PASS** |

**Residual-risk:** W-A ships no justification worth the name (owner: barrera); W-B ships an open expiry without a compensating control (owner: barrera); W-C residual `none + owner: barrera` — fatigue watch continues via C2 cap work owned by engineering owner.

## Reviewer-judgment reasons (recorded, never silent)

- W-A FAIL: every presence check returns PASS on vocabulary alone (`Accepted-risk`, `Compensating-controls`, `Expiry`, `Sign-off`, `Residual-risk` all present) — substance review rejects it anyway. Box-tick without substance FAILs loudly per the C3 substance backstop.
- W-B FAIL: missing block = FAIL, no promotion (normative bar).
- W-C PASS: all three blocks present with substance + owner + evidence-ref + expiry with re-review owner.

## What this proves

1. Every-not-sample: a sample-of-one (W-C alone) would read PASS while W-A/W-B ship unexamined — the C3 record requires all 3 rows.
2. Substance backstop: W-A passes every machine-checkable presence predicate and still FAILs — reviewer judgment is explicit, not implicit.
3. No PII in the fixture; no freelance fix (report severity + location + evidence; owner remediates).
