# Implementation Plan: SPEC-ceo-only-dispatch

**Agent:** engineering implementer (dispatched by vasquez, CEO-only dispatch per ADR-003)
**Date:** 2026-09-16
**Approved By:** vasquez (CTO) — arch APPROVED with conditions C1–C3 (docs/specs/40_workspace/vasquez/ARCHITECTURE_REVIEW-ceo-only-dispatch.md:5,34-39); barrera waiver-with-reason (docs/specs/40_workspace/vasquez/PROPOSED_CHANGES.md:57,93); ADR-003 accepted (docs/specs/10_design/ADR-003-ceo-only-dispatch.md:4-7)
**Domains-Touched:** [engineering]

> Skill: `skills/execute-spec/SKILL.md` (§3 process, loaded via skill tool). Craft: `agents/c-level/vasquez.md` + `agents/shared/writer.md` (read full, cited).

## Steps

| Step | Description | Target / Files | Evidence Location | Est. Effort |
|------|-------------|----------------|-------------------|-------------|
| 1 | Create 4 portable implementer prompts (brief path + 1-line fit + interfaces/rulings + report path + <15-line return + no-subagents contract) | `skills/templates/implementers/engineering-implementer.md`, `engineering-reviewer.md`, `engineering-qa-verifier.md`, `generic-implementer.md` (new) | files exist + NF-001 review pass in TEST_MATRIX | 2h |
| 2 | C2: one-line convention update acknowledging `skills/templates/implementers/` as scoped implementer-prompt location | `skills/AGENTS.md` (L24) | file diff | 0.2h |
| 3 | Rewrite `tool-mapping.md` to CEO-only dispatch + harness adapter rows (opencode `task(general)`, Codex `spawn_agent`/`followup_task`/`wait_agent`, generic fallback to single) + no-subagents contract line | `skills/using-frame-ship/references/tool-mapping.md` | file diff + grep | 1h |
| 4 | Strip Route L19 + dispatch companions (execute-spec L32, Delegation, adapter) in 7 non-CEO C-level templates; annotate montilla as sole dispatcher (KEEP Route) | `agents/c-level/{vasquez,barrera,dauhajre,subero,vera,santana,montero}.md` + `agents/c-level/montilla.md` | file diffs + AC-002 read-through | 1.5h |
| 5 | Rewrite multi-dispatch lines to CEO-dispatch wording in 5 SKILLs | `skills/{translate-to-spec,propose-changes,execute-spec,quality-gate,using-frame-ship}/SKILL.md` | file diffs | 1h |
| 6 | C1 audit: reword mechanism lines that name a C-level as task caller (frame-intent:34 = no change needed; review-architecture:28, review-security:28, verify-handoff:27, ship-release:30 = reword to CEO-dispatches) | `skills/{frame-intent,review-architecture,review-security,verify-handoff,ship-release}/SKILL.md` | dispatch-authorizing grep in TEST_MATRIX | 0.5h |
| 7 | Domain checks + evidence: AC-001 grep (dispatch-authorizing = 0 outside montilla/tool-mapping), AC-002 read-through, AC-003 single+multi dry-runs, AC-004 `tsc --noEmit`, NF-001 PII/secrets scan | repo-wide (read-only) | `TEST_MATRIX-ceo-only-dispatch.md` | 1h |

Each step maps to one work-unit commit unless the plan explicitly groups them (see Order of Operations — grouping stated per commit).
Steps 1+2 grouped into commit 1 (same REQ-005 + C2); steps 5+6 grouped into commit 4 (same REQ-001/AC-007 + C1).

## Order of Operations

1. **Plan first** (this file) — approval trail intact before any edit.
2. **Implementer prompts before tool-mapping** — tool-mapping cites the implementer contract fields; prompts define the contract shape (compile-time dependency).
3. **tool-mapping before C-level strips** — the CEO-only dispatch rule is the source all strips converge on; rewording reference avoids double-maintenance.
4. **C-level strips after tool-mapping** — strips reference the canonical sentence ("CEO dispatches max 2; C-level returns deliverable, never dispatches") recorded verbatim in ADR-003 §Decision.1.
5. **SKILL rewrites + C1 audit last** — they cite both tool-mapping and the canonical sentence, and C1 requires the strip state to already exist for the grep to be meaningful.
6. **Gates last** — AC-001/AC-002/AC-003/AC-004/NF-001 run over the final tree state.

## Rollback Points

Each commit is independently revertible; rollback per `PROPOSED_CHANGES.md:89` (owner vasquez, ETA <15 min):

- **After commit 1** (prompts + AGENTS.md): delete `skills/templates/implementers/` (`git rm -r`) + revert `skills/AGENTS.md:24`.
- **After commit 2** (tool-mapping): `git revert` restores L13/L26 block.
- **After commit 3** (C-level strips): `git revert` restores Route L19 + dispatch lines in all 8 templates (montilla annotation included).
- **After commit 4** (SKILL rewrites + C1): `git revert` restores all 9 SKILL lines.
- **After commit 5** (plan + matrix): delete the 2 evidence files.
- No data migration, no external undo. Plugin `.opencode/plugins/frame-ship.ts` untouched (verified via `git diff` provenance — pre-existing concurrent modification from skill-refs-normalization unit, not this unit).

## Quality Gates

Domain checks (engineering — all non-code/documentation tasks):

- [x] REQ-ID → test → artifact trace (non-code = attestations/reviews) — TEST_MATRIX-ceo-only-dispatch.md
- [x] AC-001 dispatch-authorizing grep = 0 outside montilla/tool-mapping (C1)
- [x] AC-002 standalone read-through of 1 stripped template
- [x] AC-003 single + multi dry-runs per harness
- [x] AC-004 `tsc --noEmit` on plugin (run from `.opencode/` per repo AGENTS.md)
- [x] NF-001 PII/secrets review over the 4 new prompt files
- [x] Plugin untouched (HARD packet; SPEC §5)