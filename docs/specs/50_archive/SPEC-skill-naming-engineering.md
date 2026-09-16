# Archive: skill-naming-convention (policy-enable rollout)

**Released:** 2026-09-16 as skill-naming-convention policy-enable rollout (no version tag — see release mechanics note)
**Gate:** OPEN (`docs/specs/40_workspace/quality-gate/skill-naming/GATE_REPORT.md`, 4/4 pass, no conditions, no waiver)
**Handoff:** DoD PASS (`docs/specs/40_workspace/vasquez/HANDOFF.md` @ `850c337`)
**Released by:** orchestrator + engineering owner (release mechanics delegated to owning domain owner) — zero-change verification unit, no code changes
**Ship type:** rollout (policy-enable — naming-convention freeze: canonical `frame-ship:{skill-name}` navigation, C-1/C-2/C-3 carve-out frozen, 15 cites KEEP bare under C-3, zero file changes)

## What shipped

- Naming-convention freeze: canonical navigation rule (REQ-001) + normative 3-row carve-out table C-1/C-2/C-3 (REQ-002) + 15-cite disposition D-01..D-15 all KEEP bare under C-3 (REQ-003) + chain/dir surface map S-01..S-06 with plugin runtime RECORDED as automation-owner follow-up S-05 (REQ-004), residual-only guard holds by construction — zero repository file modifications (REQ-005).
- Release notes appended (this release, prior v0.3.3 + close-out entries untouched); changelog N/A with justification (internal-only non-code verification unit, zero file changes, no user-facing impact — see below); shipped-record prose kept as audit trail.
- Commits: brief `71bbe0e` → spec `692ae76` → proposal `ee218c7` → gate `e7e8836` → handoff `850c337` → this release. No execute-spec file commit (zero-change unit: execute reproduced greps + scans, no edits proposed or made).

## Canonical pointers (reference-only — bodies live at these paths, not copied here)

- Spec: `docs/specs/40_workspace/vasquez/SPEC-skill-naming-engineering.md` @ `692ae76` (REQ-001..005 + REQ-NF-001..003, canonical rule + carve-out table §4)
- REQ index: `docs/specs/15_requirements/REQ-skill-naming-engineering.md` @ `692ae76`
- Proposal: `docs/specs/40_workspace/vasquez/PROPOSED_CHANGES.md` @ `ee218c7` (D-01..D-15 disposition + S-01..S-06 surface map + R-001..R-004 risk matrix)
- Gate (OPEN): `docs/specs/40_workspace/quality-gate/skill-naming/GATE_REPORT.md` @ `e7e8836`
- Reviews (4×pass): `docs/specs/40_workspace/quality-gate/skill-naming/qa-review.md`, `readability-review.md`, `refuter-review.md`, `risk-review.md` @ `e7e8836`
- Handoff (DoD PASS): `docs/specs/40_workspace/vasquez/HANDOFF.md` @ `850c337`
- Release notes: `docs/specs/30_delivery/RELEASE_NOTES.md` (skill-naming-convention entry appended; prior entries untouched)
- Changelog: `CHANGELOG.md` — N/A with justification: docs-only verification/record unit with zero repository file modifications and no user-facing surface (convention freeze only); no Added/Changed/Fixed/Removed entry warranted. Owner sign-off: engineering owner via HANDOFF DoD checklist @ `850c337`.

## Rollback record

- Zero-change release — nothing to revert in the live tree. Release commit itself: `git revert <release-sha>` (docs-only, ETA < 5 min). Prior unit commits revert independently with no live-tree effect: `ee218c7` (proposal) / `e7e8836` (gate) / `850c337` (handoff). Not executed (ship is forward; path declared in proposal rollback plan, carried via gate and release notes). Owner: engineering owner, ETA: immediate (< 5 min).

## Caveats carried forward

- S-05 (owner: automation owner): plugin `CHAIN`/card injection strings (`frame-ship.ts:4,13-14,16,20,29`) RECORDED only, not edited in this unit (runtime risk); follow-up needs automation owner + `mise run typecheck`. Informational, not a gate condition.
- R-001/R-002 retained: future editors must keep `skill()` tool args + frontmatter `name:` bare (C-1/C-3) and write new navigation cites in `frame-ship:`-form (REQ-001); gate re-greps `skill\(` vs `frame-ship:` on any future naming unit.
- R-004 noted: shared `PROPOSED_CHANGES.md` / `HANDOFF.md` paths in `vasquez/` were retargeted to this spec (prior revisions preserved in git history); follow-up proposals use per-spec suffix (`PROPOSED_CHANGES-skill-naming.md`).
- Commit format note: `skills/using-frame-ship/references/commit-convention.md` is deleted per orchestrator order, so no convention file is cited. This chain uses sensible work-unit format (e.g. `docs(release-skill-naming): ...`), stated per archive precedent (`commit-convention-purge.md`).
- Lessons live in the stage HANDOFFs per chain contract (no extra lesson file): risk matrix in `vasquez/PROPOSED_CHANGES.md`, gate notes in `skill-naming/GATE_REPORT.md`, DoD trace in `vasquez/HANDOFF.md`.
