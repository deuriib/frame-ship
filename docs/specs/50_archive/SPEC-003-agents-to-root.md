# Archive: SPEC-003 agents/ to repo root

**Released:** 2026-09-16 as v0.3.1-agents-to-root
**Gate:** OPEN (architect Approved + readability/risk/refuter PASS + qa GREEN)
**Released by:** devops under vasquez (CTO) — release mechanics only, no code changes

## What shipped

- Repo-root `agents/` (69 files, 9 subdirs); `skills/templates/` removed; 7 live-pointer files rewritten.

## Canonical pointers (reference-only — bodies live at these paths, not copied here)

- Handoff: `docs/specs/40_workspace/vasquez/HANDOFF-003-agents-to-root.md`
- Proposal: `docs/specs/40_workspace/vasquez/PROPOSED_CHANGES-003-agents-to-root.md`
- ADR: `docs/specs/10_design/ADR-002-agents-to-root.md` (accepted, supplements ADR-001)
- Release notes: `docs/specs/30_delivery/RELEASE_NOTES.md` (v0.3.1-agents-to-root entry; v0.3.0 entry untouched)
- Changelog: `CHANGELOG.md` (repo root, v0.3.1 section)

## Caveats carried forward

- Mixed baseline (10 tracked `M` = SPEC-002 + SPEC-003 layered) — committer verifies at commit time.
- Untracked-tree move — `git log --follow` continuity starts at next commit.
- Rollback: `git mv agents skills/templates/agents` + revert 7 pointer files + revert notes/changelog (verified plausible, not executed).

## Lessons (from HANDOFF, captured on PASS)

- Resolution-check relative §5 links, don't eyeball them.
- Declare one cite base in the proposal.
- Snapshot SHA256 pre-move for vendored-tree moves.
- Re-read HANDOFF + ADR-002 before any future `agents/` refactor.
