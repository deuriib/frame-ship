# Refuter Review: version-sync-0.6.0

**Reviewer:** review-refuter (adversarial)
**Date:** 2026-09-17
**Verdict:** pass ("could not falsify")

## Packet

SPEC:`docs/specs/40_workspace/engineering/PROPOSED_CHANGES-version-sync-0.6.0.md` / HARD:single; text-edits only / GATE:none-yet → this verdict / DOMAINS:[engineering]

## Mission

Attempt to **falsify** the implementation. Success = finding a counterexample.

## Attack Vectors Tried

| ID | Hypothesis | Attempt | Result |
|----|-----------|---------|--------|
| RF-001 | A live version marker still reads pre-0.6.0 | Grep `frame-ship v0` repo-wide + stale-grep `0.5.0\|0.2.0` on each edited file | Confirmed — all live markers read v0.6.0; remaining old markers are frozen audit trail (CHANGELOG history, archive, gate records, proposal before-state) or rollback-semantics prose (`ARCHITECTURE.md:38` "restores v0.5.0 runtime" describes revert behavior, correctly) |
| RF-002 | Hook fixture replay breaks on the VERSION change | Grep `hooks/` for `0.5.0\|0.6.0\|VERSION\|version` | Confirmed — hits only in `context-inject.ts:24-26`; `fixtures/` carry no marker, replay vectors unaffected |
| RF-003 | README replaceAll hit an unintended string | Full `git diff` read: README shows exactly 3 changed lines (`:62,:209,:227`) | Confirmed — no collateral edits |
| RF-004 | `AGENTS.md:9` "403 lines" claim is wrong | `.opencode/plugins/AGENTS.md:4` reads 403 lines; `frame-ship.ts` reads as 403-line file | Confirmed — count accurate |
| RF-005 | Diff smuggles non-version content or secrets | Full diff read (11+/9-): version literals + lockstep sentence only | Confirmed — version literals + lockstep sentence only; no secrets, no logic changes, no scope creep |

## Counterexamples Found

| ID | Counterexample | Impact | Reproduction |
|----|---------------|--------|--------------|
| — | None | — | — |

Advisory (not a counterexample): `ARCHITECTURE-agy-plugin.md:12,57` era-pins the v0.4.0 marker text in the INV-008 description — scope-frozen design history, recorded as residual in `risk-review.md`.

## Verdict Rationale

- pass = attempted falsification, no counterexamples found. Five attack vectors tried, all confirmed. Gate stays OPEN.
