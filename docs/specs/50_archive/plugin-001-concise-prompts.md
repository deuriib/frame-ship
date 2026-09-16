# Archive: plugin-001 concise-plugin-prompts

**Released:** 2026-09-16 as v0.3.2-plugin-001-concise-prompts
**Gate:** OPEN (`docs/specs/40_workspace/quality-gate/plugin-001-concise-prompts/GATE_REPORT.md`, 4/4 pass, no waiver)
**Handoff:** DoD PASS (`docs/specs/40_workspace/vasquez/HANDOFF.md`)
**Released by:** vasquez (CTO) coordinating ship-release mechanics with devops lens — release mechanics only, no code changes
**Ship type:** rollout (internal plugin, restart required)

## What shipped

- `.opencode/plugins/frame-ship.ts` 223→156 lines (−31.3%, 11,098→7,620 chars) via `1a805bc`; string literals + header only, logic byte-identical (REQ-001..REQ-006).
- Release notes + changelog + rollback plan (this release); restart required to take effect.

## Canonical pointers (reference-only — bodies live at these paths, not copied here)

- Handoff (DoD PASS): `docs/specs/40_workspace/vasquez/HANDOFF.md`
- Gate (OPEN): `docs/specs/40_workspace/quality-gate/plugin-001-concise-prompts/GATE_REPORT.md`
- Reviews (4×pass): `docs/specs/40_workspace/quality-gate/plugin-001-concise-prompts/review-readability.md`, `review-risk.md`, `review-refuter.md`, `qa-review.md`
- Proposal: `docs/specs/40_workspace/vasquez/PROPOSED_CHANGES.md` (REQ-001..REQ-006, R-001..R-005)
- Security review: `docs/specs/40_workspace/barrera/SECURITY_REVIEW.md` (Conditional, C-1..C-6 verified at gate)
- Implementation: `.opencode/plugins/frame-ship.ts` @ `1a805bc` (+ gate `6513dad` + handoff `8c360b9`)
- Release notes: `docs/specs/30_delivery/RELEASE_NOTES.md` (v0.3.2-plugin-001-concise-prompts entry; prior entries untouched)
- Changelog: `CHANGELOG.md` (repo root, v0.3.2 section; Unreleased block untouched)

## Rollback record

- `git revert <release-commit>` (single file) + quit + restart opencode, <15 min, owner vasquez. Not executed (ship is forward; path declared in proposal R-005, carried via gate F-1).

## Caveats carried forward

- F-1 (owner: vasquez): init/compact smoke on first opencode restart post-ship — confirm single injection, no duplication on retry.
- F-2 (owner: vasquez, watcher: barrera): orientation watch on first sessions — compact card + live bootstrap keep sessions constrained (RR-1/RR-2).
- Working tree at ship time carried unrelated uncommitted baseline work (SPEC-002 commit-convention `M` files + untracked `docs/` tree); release commit must scope ONLY to release files (see commit command below) — committer verifies at commit time.

## Lessons (from HANDOFF, captured on PASS)

- Compact-pointer plugin form works: live bootstrap carries full detail, hardcoded card stays enforcement-posture-only without losing gate teeth (refuter RF-007).
- Single `CHAIN` const kills the 4x-literal drift vector; future chain-order changes touch one line.
- Short-form guardrails stay enforceable only if every number remains greppable — the 1:1 numbered checklist is the property to preserve in future trims.
