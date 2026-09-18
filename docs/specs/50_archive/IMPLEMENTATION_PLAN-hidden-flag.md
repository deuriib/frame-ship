# IMPLEMENTATION_PLAN — hidden flag (single)

**SPEC/HARD/GATE/DOMAINS:** SPEC-hidden-flag-engineering#REQ-001..004+NF / single+optional-only+backward-compatible+exact-shape / ARCH-APPROVED (ADR waived) / [engineering]
**Mode:** single — vasquez executes directly, no task dispatch.

## Steps

1. Edit `frame-ship.ts:242-246` — add `hidden?: boolean;` to `AgentManifestEntry`. (REQ-001)
2. Edit 8 C-level lines — append `, hidden: true`. montilla + subagents untouched. (REQ-002/003)
3. Edit mirror Record types + both `??=` inserts with conditional spread. (REQ-004)
4. Update `ARCHITECTURE.md:18` INV-004 overlay sentence. (contract doc touch)
5. Verify: `mise run typecheck` + grep counts + secret scan → TEST_MATRIX-hidden-flag.md.
6. Commit impl (single commit, REQ trace in body).

## Rollback

`git revert` / `git checkout -- .opencode/plugins/frame-ship.ts docs/specs/10_design/ARCHITECTURE.md` — single-file, ETA < 5 min.
