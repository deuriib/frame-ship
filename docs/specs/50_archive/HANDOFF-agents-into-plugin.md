# Handoff: vasquez (Engineering Owner, Owning-Domain DoD Gate)

**Spec Reference:** `docs/specs/40_workspace/engineering/SPEC-agents-into-plugin-engineering.md` (REQ-001..004 + NF-001..004)
**Agent:** vasquez (CTO, engineering owner, domain chain owner — single-domain direct verify per `skills/verify-handoff/SKILL.md` §2b)
**Date:** 2026-09-17
**Status:** complete
**Domains-Touched:** [engineering] (data lens N/A — no schemas/lineage/stores, file bodies only)

## Deliverables

| Artifact | Location / Evidence | Status |
|----------|---------------------|--------|
| Runtime (roster port) | `.opencode/plugins/frame-ship.ts` v0.6.0 (403 lines; header+VERSION+MARKER triple + manifest quadruple) | done |
| Plugin ref docs | `.opencode/plugins/AGENTS.md` (cells re-verified @ `2966f15`) + root `package.json` → 0.6.0 | done |
| Proposal (untouched-impl boundary) | `docs/specs/40_workspace/engineering/PROPOSED_CHANGES.md` | done |
| Tests / Evidence | `docs/specs/40_workspace/engineering/TEST_MATRIX-agents-into-plugin.md` (C-001..C-005 + T-001..T-007, bun+node lanes) | done |
| Gate verdict | `docs/specs/40_workspace/quality-gate/agents-into-plugin/GATE_REPORT.md` — **OPEN**, 6/6 PASS, 0 open conditions, 0 waivers (@ `4098fd7`) | done |
| Prior gates | security **Approved** (0 findings) + architecture **Approved** (no-ADR, additive within v1 contracts) | done |
| Changelog / release notes | routed to ship-release (manifest already 0.6.0; notes + changelog + rollback record are ship scope) | pending → ship-release |

## Definition of Done Checklist

- [x] Acceptance criteria satisfied — AC-001 (74 keys + montilla/2) via T-001/C-002 · AC-002 (5-agent spot-check d=158/216/246/200/154 + adversarial BOM/fence) via C-003 · AC-003 (triple + zero-dep + `mise run typecheck` EXIT 0, re-verified this session) via T-004/T-005 · AC-004 (double-init byte-stable + preseed survives) via T-003/T-006 · AC-005 (secret scan 0 findings) via T-007; qa 8/8 live checks green both lanes
- [x] Tests/evidence linked per REQ-ID — 9/9 runnable REQ-IDs traced in matrix (REQ-001..004 + NF-001..003); NF-004 rollback proven as process (revert range `9f8328b..220e2b4`, skills lane intact, ETA < 15 min, gate §Rollback)
- [x] Load evidence present — `skill(verify-handoff)` (`skills/verify-handoff/SKILL.md` §2b owning-domain-owner gate) + `dod-checklist.md` + `handoff-template.md` read; mode `multi-subagents` declared (frozen at frame-intent; this verify runs direct as owning domain owner, single-domain, no cross-domain synthesis owed); packet intact by reference — SPEC/HARD/GATE/DOMAINS as accepted
- [x] Domain checks passing (Common + engineering appendix) — lint N/A (no linter configured; `mise` tasks are typecheck/install only; static gate is `tsc` clean) · typecheck EXIT 0 · coverage via hook-replay equivalence (no unit harness by design, `tests/` empty; every REQ exercised bun+node) · TODO/FIXME grep over plugin = 0
- [x] Security checks passing — prior security gate Approved; scan T-007 = 0; single static `import type` only, no static `node:` import (dynamic `node:fs/promises` fallback); no secrets/tokens/PII in range
- [x] Documentation updated as applicable — `.opencode/plugins/AGENTS.md` 4 line-ref cells aligned + count 350→403 + version cells (@ `2966f15`); API-contract docs unchanged by design (no ADR — explicitly waived by architecture verdict); changelog/notes routed to ship-release with manifest pre-aligned

## Blockers / Open Questions

**No DoD blockers. Two ship-blockers ruled below — neither stops this handoff; (2) is closed, (1) routes to ship-release/orchestrator.**

### Ruling (1): `agents/` untracked — SHIP PLUGIN-ONLY with roster-pending condition (default)

- **Fact:** `agents/` is fully untracked (`?? agents/`, 77 files = 74 roster + `AGENTS.md` + `README.md` + `delegation-contract.md`; 0 tracked). Runtime proven WITH roster present (qa replays + refuter 74/74 disk scan + matrix C-001..C-005).
- **Ruling:** DoD PASSES; ship plugin-only, and ship-release must resolve roster packaging BEFORE cutting the release: either track `agents/` (after a dedicated secret/PII scan — untracked files were never covered by T-007) or document an external roster source. Rationale: bulk-tracking 77 files here would freelance a release-scope decision inside a handoff commit (handoff commits handoff only), and miss-lanes degrade gracefully (proven C-002/C-004). Break condition: if the release contract requires install-alone-brings-roster with zero external fetch, tracking becomes a hard ship-blocker owned by orchestrator.
- **Owner:** orchestrator at ship-release. Retained risk #4 below carries it.

### Ruling (2): root `AGENTS.md` / `README.md` uncommitted reformatting — NOT OURS, NOT A BLOCKER, DO NOT TOUCH

- **Fact (verified via `git log`, not claimed):** last committed touch on both files is `d896a25` (release 0.5.0), predating the spec impl range (`a91a486..4098fd7`); working-copy diff is pure formatter reflow (`*`→`_`, table padding), zero spec content.
- **Ruling:** leave unstaged and uncommitted; excluded from this handoff commit and must be excluded from the release commit. Closed — no owner, no follow-up except ship-release not sweeping them in.

## Retained Risks (carried from OPEN gate + verify; owner: vasquez unless noted)

1. Pre-seed edge: custom-only roster + skipped lane can still receive `default_agent: "montilla"` via `??=` (explicit user defaults always preserved). User-owned config; narrow, recorded.
2. Bare-fence debris: bare `---` w/o trailing newline → plain-trim prompt (cosmetic, no metadata leak); empty-`description` files still register.
3. All-hung bound ≈ 148s worst case (bounded, self-DoS only, local trusted FS).
4. **Roster-packaging (→ orchestrator/ship-release):** release cut from git ships a roster-less runtime unless (1) is resolved — graceful miss lanes apply, but fresh-clone installs would run degraded. Must rule before tag.
5. Silent-fallback advisory stands (RS-003): partial roster loss invisible at runtime; contents-free numeric skip-count is safe future hardening.
6. `loadBootstrapBody` keeps reject-only single-read (out of COND scope by design; lower exposure than the 74-chain).
7. Out-of-scope live `0.5.0` refs outside touched files (`README.md` snippets, `hooks/context-inject.ts` parity marker, `CHANGELOG.md`) remain for a later spec — not freelanced here.

## Lesson Capture (PASS)

- Remediation-by-delta works: 5 COND families cleared with code-diff proof + matrix replay in one retry (N=1), no third loop — because each COND named its exact proof (diff + replay row).
- Gate honesty compounds: explicit residuals (7 items, all owned) let verify pass in one session with zero re-opens. Keep residuals explicit and owned on every gate.
- Recall before next refactor dispatch: handoff record shows formatter-noise files (`AGENTS.md`/`README.md`) pre-date this spec — future lanes must `git status` FIRST and refuse to stage unrelated noise.

## Next Agent

`orchestrator` in `frame-ship:ship-release`: resolve roster-packaging ruling (1) with owner sign-off, then cut `RELEASE_NOTES.md` + changelog + rollback record from the plugin-only tree (unrelated `AGENTS.md`/`README.md` noise excluded). Rollback: `git revert 9f8328b..220e2b4` restores v0.5.0 runtime (< 15 min, engineering owner).
