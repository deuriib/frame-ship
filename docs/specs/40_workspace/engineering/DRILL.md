# Drill: Engineering Lane (Singleton Canonical)

**Owner:** vasquez (CTO) — engineering owner
**Date:** 2026-09-18

## Standing Drill

Rollback drill for this lane: given the consolidation record tables, restore any archived original with `Copy-Item -LiteralPath "docs\specs\50_archive\<name>" -Destination "docs\specs\40_workspace\engineering\<name>"` and verify hash. Drill target: any single file restored < 5 min; full-lane rollback < 15 min (REQ-NF-002).

## Consolidation Record

| Source (moved to `50_archive/`) | Subject |
|----------------------------------|---------|
| `DRILL-git-worktree-2spec.md` | git-worktree 2-spec drill |
