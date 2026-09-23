# ARCHIVE-RECORD: SPEC-repo-hygiene

**Spec:** docs/specs/50_archive/SPEC-repo-hygiene/SPEC-repo-hygiene.md
**Date:** 2026-09-23
**Gate verdict:** OPEN (7/7 reviewer pass; COND-001..004 cleared; waivers W1/W2 recorded)
**Commit(s):** implementation `fe62314…3065440` (26 commits, wave-1 + wave-2 + gate + handoff); release commit = the commit carrying this record (tagged `v0.12.0`)
**Tag:** v0.12.0
**Ship type:** rollout

## Promoted (survive in 50_archive/SPEC-repo-hygiene/)

- [x] SPEC-repo-hygiene.md        — moved via git mv (R rename, source gone from 20_backlog/)
- [x] GATE_REPORT.md              — from 40_workspace/quality-gate/SPEC-repo-hygiene/
- [x] HANDOFF.md                  — from 40_workspace/engineering/
- [ ] ADR-###-<slug>.md           — none: this spec created/amended no ADR (zero-dep + split-lane contracts held; no new invariant/component/cross-domain contract)

## Purged (allowlist only, this SPEC-repo-hygiene)

- 40_workspace/engineering/PROPOSED_CHANGES.md
- 40_workspace/engineering/IMPLEMENTATION_PLAN.md
- 40_workspace/engineering/TEST_MATRIX.md
- 40_workspace/engineering/HANDOFF.md
- 40_workspace/quality-gate/SPEC-repo-hygiene/   (readability.md, reliability.md, refuter.md, resilience.md, risk.md, quality-assurance.md, automation-reviewer.md; GATE_REPORT.md promoted first)

## Rollback plan

- **CI removal:** `git revert a83347b` then `git revert feb9014` (lone `feb9014` revert conflicts post-`a83347b`; two-SHA path merge-tree-verified) or delete `.github/workflows/ci.yml`.
- **Tag retract:** `git tag -d v0.12.0` (+ remote delete if pushed).
- **Per-unit:** revert `8548efe` (tests), `7efa7f7`+`2de0839` (lockfile), `1640510`/`fdda81a` (REQ-007), doc commits individually.
- **ETA:** < 5 min per unit. **Owner:** engineering owner (workflow mechanics: automation owner). No data migration, no external comms (no filings/comms/campaigns in this ship).

## Notes

- Other SPEC lanes active during this archive: **none** — `40_workspace/engineering/` contained only this spec's 4 singletons; backlog keeps `SPEC-grilling-integration-security.md` + `SPEC-multi-default-people.md` untouched; all other `40_workspace/quality-gate/<spec>/` dirs (20+) untouched — purge ran exact-path only.
- Residual risk / open conditions: **W1** first-CI-green at push (expiry: first push of `v0.12.0`, re-review owner: engineering owner); **W2** plan-permission live-host confirmation (expiry: first `plan` use, re-review owner: engineering owner); backlog Lows RL-003/risk-4 (unpinned TS), RL-004 (malformed fixture), RL-005 (`timeout-minutes`), R-001/R-002 — owner: engineering owner, non-blocking per severity ladder. Full detail: promoted `GATE_REPORT.md` §C3 + §Sign-off.
- PII: zero secrets/PII in this record (Ley 172-13) — owners by role, evidence by path/commit.
