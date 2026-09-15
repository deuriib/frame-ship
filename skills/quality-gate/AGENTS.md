# QUALITY-GATE — multi-domain router

## OVERVIEW
Owns the fan-out: only stage that dispatches parallel reviewers and merges verdicts.
Only stage with a waiver path; all other stages block without override.

## WHERE TO LOOK
| Domain | Reviewers | Template dir |
|--------|-----------|--------------|
| engineering | readability, reliability, refuter, resilience, risk, qa (+data) | `references/engineering/` (5) |
| security/people/finance/legal/brand/revenue/data | single reviewer each | `references/domains/` (7) |
| consolidated | gate keeper (owning C-level) | `references/gate-report.md` |
| override | c-levels + CEO only | `references/waiver-template.md` |

## CONVENTIONS
- Gate states: `OPEN` (all pass) / `CONDITIONAL` (conditions must clear) / `CLOSED` (any fail).
- Per-reviewer files: `docs/specs/40_workspace/quality-gate/<spec-id>/<reviewer>.md`.
- Multi-domain specs need ALL touched-domain sign-offs.
- Verdict row shape: `| Domain | Reviewer | Verdict | Findings | Artifact |` (`gate-report.md:9-18`).
- Waiver requires c-levels + CEO sign-off block; `CONDITIONAL` needs `COND-00x` checklist cleared.
- Engineering refs: `readability/reliability/refuter/resilience/qa-review.md`; domains: `finance/legal/marketing/people/security/data/ops-review.md`.

## NOTES
- Largest skill dir (15 files); only one with `engineering/` + `domains/` split — don't flatten.

## ANTI-PATTERNS
- Opening gate with any fail verdict — only waiver record overrides.
- Handoff with unverified `CONDITIONAL` conditions.
- Overriding a verdict as gate keeper — escalate to `montilla` instead.
- Flattening `engineering/` + `domains/` into one dir — routing table depends on split.
