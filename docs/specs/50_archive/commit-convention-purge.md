# Archive: commit-convention-purge (internal close)

**Released:** 2026-09-16 as commit-convention-purge internal close (no version tag — see release mechanics note)
**Gate:** OPEN (`docs/specs/40_workspace/quality-gate/commit-convention-purge/GATE_REPORT.md`, 4/4 pass, COND-001 cleared in-work-unit, no waiver)
**Handoff:** DoD PASS (`docs/specs/40_workspace/engineering/HANDOFF.md` @ `0b81dbd`)
**Released by:** operations function + engineering owner (dispatched by orchestrator Montilla CEO) — release mechanics only, no code changes
**Ship type:** close (internal close-out; no deploy, filing, launch, or workflow enablement)

## What shipped

- Commit-convention purge: 14 deletions (convention template + 8 historical commit-convention-v2 artifacts + 5 gate v2 reviews) + 14 edits (13 files, 23 citation lines + COND-001 count fix) via `f859726` + `f5ef7ad`; proposal `a17c7d8`, handoff `0b81dbd`.
- Release notes appended (this release, prior v0.3.3 entries untouched); changelog N/A with justification (internal-only non-code purge, no user-facing impact — see below); §C history prose kept per orchestrator ruling.

## Canonical pointers (reference-only — bodies live at these paths, not copied here)

- Proposal: `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` @ `a17c7d8` (REQ-001..REQ-004, R-001..R-003, §C open decision)
- Gate (OPEN): `docs/specs/40_workspace/quality-gate/commit-convention-purge/GATE_REPORT.md` @ `f5ef7ad`
- Reviews (4×pass): `docs/specs/40_workspace/quality-gate/commit-convention-purge/qa-review.md`, `readability-review.md`, `refuter-review.md`, `risk-review.md` @ `f5ef7ad`
- Handoff (DoD PASS): `docs/specs/40_workspace/engineering/HANDOFF.md` @ `0b81dbd`
- Implementation: `f859726` (14 deletions + 13 edits) + `f5ef7ad` (COND-001 fix + gate reviews)
- Release notes: `docs/specs/30_delivery/RELEASE_NOTES.md` (commit-convention-purge entry appended; v0.3.3 entries untouched)
- Changelog: `CHANGELOG.md` — N/A with justification: internal process-doc purge, no user-facing impact; shipped-record prose (§C: CHANGELOG 2 lines, RELEASE_NOTES 3 lines) intentionally kept for audit-trail integrity. Owner sign-off: engineering owner via HANDOFF DoD checklist @ `0b81dbd`.

## Rollback record

- `git revert f859726` then `git revert f5ef7ad` — in that order (impl first, gate fix second). Owner: engineering owner, ETA: immediate (< 5 min). Not executed (ship is forward; path declared in proposal rollback plan, carried via gate and release notes).

## Caveats carried forward

- R-003 retained: §C prose kept per orchestrator ruling ("full purge incl. history" = delete all 8 work-product artifacts; shipped/archived prose stays). A future full-prose scrub (rewrite CHANGELOG + RELEASE_NOTES + archive entries) would be a separate follow-up work unit — not this release.
- Proposal prose staleness ("21 live citation lines" vs 23-row §B table): implementation follows the table exactly (23/23); recorded at gate (CE-002), no action.
- Commit format note: `skills/using-frame-ship/references/commit-convention.md` is deleted per orchestrator order, so no convention file is cited. This chain uses sensible work-unit format (e.g. `docs(release-commit-convention-purge): ...`), stated per dispatch orders.
- Lessons live in the stage HANDOFFs per chain contract (no extra lesson file): proposal rationale + risk matrix in `engineering/PROPOSED_CHANGES.md`, gate notes in `commit-convention-purge/GATE_REPORT.md`, DoD trace in `engineering/HANDOFF.md`.
