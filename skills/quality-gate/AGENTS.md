# QUALITY-GATE — multi-domain router

## OVERVIEW
Only stage whose reviewers the orchestrator dispatches in parallel; merges verdicts.
Only stage with a waiver path; all other stages block without override.

## WHERE TO LOOK
| Domain | Reviewers | Template dir |
|--------|-----------|--------------|
| engineering | readability, reliability, refuter, resilience, risk, qa (+data lens) | `references/engineering/` (5) |
| security/finance/legal/brand/people/revenue/automation | single reviewer each (+ ops lens for automation) | `references/domains/` (9: finance, legal, marketing, people, security, data, revenue, automation, ops) |
| consolidated | gate keeper (owning domain owner) | `references/gate-report.md` |
| override | domain owners + orchestrator only | `references/waiver-template.md` |

## CONVENTIONS
- Gate states: `OPEN` (all pass) / `CONDITIONAL` (conditions must clear) / `CLOSED` (any fail).
- Per-reviewer files: `docs/specs/40_workspace/quality-gate/<spec-id>/<reviewer>.md`.
- Multi-domain specs need ALL touched-domain sign-offs.
- Verdict row shape: `| Domain | Reviewer | Verdict | Findings | Artifact |` (`gate-report.md:9-18`).
- Waiver requires domain owners + orchestrator sign-off block; `CONDITIONAL` needs `COND-00x` checklist cleared.
- Engineering refs: `readability/reliability/refuter/resilience/qa-review.md`; domains: `finance/legal/marketing/people/security/data/revenue/automation-review.md` + `ops-review.md` lens.

## NOTES
- Largest skill dir (18 files: SKILL + AGENTS + gate-report + waiver + 5 engineering + 9 domains); only one with `engineering/` + `domains/` split — don't flatten.

## ANTI-PATTERNS
- Opening gate with any fail verdict — only waiver record overrides.
- Handoff with unverified `CONDITIONAL` conditions.
- Overriding a verdict as gate keeper — escalate to `orchestrator` instead.
- Flattening `engineering/` + `domains/` into one dir — routing table depends on split.
