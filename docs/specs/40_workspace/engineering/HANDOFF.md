# Handoff: Engineering & People Lanes (SPEC-subagents-naming)

**Spec Reference:** SPEC-subagents-naming-engineering & SPEC-subagents-naming-people
**Agent:** orchestrator (synthesizing vasquez & santana)
**Date:** 2026-09-20
**Status:** complete
**Domains-Touched:** [engineering, people, security]

## Deliverables

| Artifact | Location / Evidence | Status |
|----------|---------------------|--------|
| Skills standardized to `subagents` | `skills/` (using-frame-ship, frame-intent, translate-to-spec, execute-spec, quality-gate, git-worktree) | done |
| Templates updated to `subagents` | `skills/*/references/` (product-brief, spec-template, proposal-template, gate-report, dod-checklist) | done |
| Catalogs & Knowledge Base | `skills/AGENTS.md`, `docs/AGENTS.md`, `docs/specs/AGENTS.md`, `AGENTS.md` | done |
| Architecture Decision Record | `docs/specs/12_adr/ADR-009-subagents-naming.md` | done |
| Canonical Architecture Contract | `docs/specs/10_design/ARCHITECTURE.md` | done |
| Quality Gate Report | `docs/specs/40_workspace/quality-gate/subagents-naming/GATE_REPORT.md` (OPEN) | done |

## Definition of Done Checklist

- [x] Acceptance criteria satisfied (all domains: engineering, people, security)
- [x] Tests/evidence linked per REQ-ID (100% trace in engineering & people TEST_MATRIX.md)
- [x] Load evidence present (skill + template paths + mode + packet)
- [x] Domain checks passing (`mise run typecheck` exits 0, grep residue = 0)
- [x] Security checks passing (unconditional signoff, Ley 172-13 compliant)
- [x] Documentation & ADR updated

## Blockers / Open Questions

None. All criteria fulfilled.

## Next Agent

`ship-release`: Orchestrate release shipping, update CHANGELOG.md, produce release notes, and finalize deployment/git state.
