# Quality Gate Waiver: SPEC-agy-plugin-engineering

**Issued By:** orchestrator (montilla, CEO) + engineering owner (vasquez lens) + security owner (barrera lens)
**Date:** 2026-09-17
**Gate Status at Waiver:** CONDITIONAL (COND-001 outstanding by environment)

## Reviewer(s) Overridden

| Reviewer | Verdict | Reason for Override |
|----------|---------|---------------------|
| security-reviewer | conditional (COND-001) | Staged-path verify needs an `agy` host; none in this env. Overridden to OPEN under accepted risk + compensating controls + expiration below. |

## Accepted Risk

R-001: `bun ./hooks/*.ts` relative-cwd assumption unproven after `agy plugin install` staging (Med/Med). Owner: engineering owner. If the assumption is wrong, hooks fail loudly at install-verify (not silently in prod), and the absolute-path fallback is documented in README + proposal R-001.

## Compensating Controls

- README pins the relative-path assumption + verify step (`agy plugin list`, `/hooks`) before first use.
- Absolute fallback `bun "<plugin-dir>/hooks/*.ts"` documented; one-line `hooks.json` change, no code change.
- Rollback < 10 min (`disable` → `uninstall` → `git revert`).
- All other conditions (C-002..C-006) cleared with replay/scan evidence in TEST_MATRIX-agy-plugin.md.

## Expiration

Valid until first install-verify on an agy host succeeds (then COND-001 clears permanently), or 30 days — whichever comes first. On expiry without verify, gate returns to CONDITIONAL and re-blocks handoff of follow-ups.

## Sign-off

- [x] orchestrator (montilla, CEO) — 2026-09-17
- [x] engineering owner (vasquez lens) — 2026-09-17
- [x] security owner (barrera lens) — 2026-09-17
