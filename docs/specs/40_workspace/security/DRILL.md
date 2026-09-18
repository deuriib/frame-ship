# Drill: Security Lane Rollback

**Owner:** barrera (CISO)
**Date:** 2026-09-18
**Status:** created by singleton consolidation (no prior source)

## Rollback Drill (consolidation undo, ETA < 15 min)

1. Read the Consolidation Record table in each of the 9 canonicals (source → archive path).
2. Move each archived original from `docs/specs/50_archive/` back to `docs/specs/40_workspace/security/` under its original filename.
3. Delete the created canonicals that have no source (`ARCHITECTURE.md`, `API_CONTRACT.md`, `DRILL.md`, `RELEASE_NOTES.md`) — or keep per new brief.
4. Verify: lane glob back to 14 files; `git status` clean of residue.

Precedent data point: git-worktree lane recorded `git submodule status` empty + `Test-Path .gitmodules` False (none-needed) — no submodule handling in this drill.

## Consolidation Record

Created by `SPEC-singleton-consolidation-security` — no source; no archive path.
