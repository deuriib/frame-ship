# Test / Evidence Matrix: SPEC-remove-tool-mapping-engineering

**Agent:** vasquez (CTO) — domain chain owner, engineering
**Date:** 2026-09-16
**Domains-Touched:** [engineering]

| REQ-ID | Evidence ID | Description | Type | Status | Commit |
|--------|-------------|-------------|------|--------|--------|
| REQ-001 | E-001 | `Test-Path skills/using-frame-ship/references/tool-mapping.md` = False; `git status` shows `D` | Attestation | pass | 8d2e58b |
| REQ-002 | E-002 | Read-through `SKILL.md §3.1`: line ends at `acting.` — clean, no tool-mapping mention, no dangling pointer (user amendment ea2733c stripped the intermediate checklist clause; full load order still lives in §3.0 + checklist) | Review | pass | ea2733c |
| REQ-003 | E-003 | `SKILL.md §5` single bullet; `glob skills/using-frame-ship/references/*` = 1 file (`bootstrap-checklist.md`), 1:1 match | Review | pass | 8d2e58b |
| REQ-004 | E-004 | Grep `tool-mapping`: `skills/` = 0, `.opencode/` = 0, all `AGENTS.md` = 0; remaining hits only in `docs/` history + this unit's own trace artifacts (by design) | Attestation | pass | 8d2e58b |
| REQ-NF-001 | E-005 | Secrets/PII scan over changed SKILL.md (`secret\|token\|password\|credential\|api_key\|session_id`) = 0; deleted file was process prose, read fully pre-delete | Attestation | pass | 8d2e58b |
| REQ-NF-002 | E-006 | `git status --short` at exec: only `M SKILL.md` + `D tool-mapping.md` (+ untracked trace artifacts outside `skills/`); 0 files in `40_workspace/ 50_archive/ 10_design/` | Attestation | pass | 8d2e58b |
| REQ-NF-003 | E-007 | Rollback table in `IMPLEMENTATION_PLAN-remove-tool-mapping.md` (1 exec point + 1 evidence point, ETAs < 5 min); replicated in HANDOFF at verify stage | Review | pass | this commit |

Types: `Unit | Integration | E2E | Review | Sign-off | Attestation | Launch-check | Filing-proof`. Code REQs use tests; non-code REQs use review/sign-off/attestation with artifact path — REQ-ID trace mandatory for all 8 domains.

## Coverage Summary

- Unit coverage: N/A (docs-only, no code — justification: zero implementation files; domain checks are grep/glob/read-through)
- Integration coverage: N/A (same justification)
- Evidence coverage: 7/7 REQ-IDs with linked artifact or attestation
- Acceptance criteria covered: 7/7 (AC-001..007)

## Known Residual (not a failure — CEO follow-up)

- `README.md:97,236` still describe tool-mapping in prose (contents line + unchecked harness checkbox). Not functional pointers (nothing breaks at runtime/session-load); out of brief scope (scope froze live tree to `skills/ + .opencode/ + AGENTS.md`). Default: leave untouched; CEO decides keep/purge in a follow-up unit.
