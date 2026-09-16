# QA Review: SPEC-git-worktree

**Reviewer:** qa (final, after refuter per multi-subagents order)
**Date:** 2026-09-16
**Verdict:** conditional
**Skill:** skill(frame-ship:quality-gate) + `skills/quality-gate/references/engineering/qa-review.md`
**Packet (by reference only):** SPEC `skills/git-worktree/` (5 files) + `.gitignore` + 4 TEST_MATRIX (`vasquez/*-engineering.md`, `vasquez/*-automation.md`, `santana/*-people.md`, `barrera/*-security.md`, 28 rows claimed pass) + 8 prior gate verdicts (`quality-gate/git-worktree/`: readability-conditional, reliability-pass, refuter-conditional, resilience-pass, risk-conditional, security-conditional, automation-conditional, people-conditional)
**HARD:** execution_mode=multi-subagents, REQ-ID trace mandatory, no handoff with unverified conditions
**GATE:** arch-Approved, sec-Conditional
**DOMAINS:** [engineering, automation/ops, security, people] — final QA lens; I never approve my own work (wrote no git-worktree content)

## Checklist (per `qa-review.md`)

- [x] All acceptance criteria have tests — 28/28 ACs map to a row in-table (eng AC-001..008 via T-001..E-003; auto AC-001..007 via T-001..T-007; people AC-001..005 via E-001..E-005; sec AC-SEC-001..008 via T-001..T-008). Design trace complete; execution proof pending Q-002/Q-003.
- [x] All REQ-IDs traceable to test IDs — 28/28 REQ-IDs have exactly one evidence row, no orphan evidence, no orphan row (verified by read of all 4 matrices). See Traceability.
- [ ] Unit + integration + e2e coverage as appropriate — N/A with justification accepted (non-code skill-shape/runbook/policy/wording surface; Review/Attestation/Sign-off per `execute-spec` matrix contract). Cross-lane integration rides gate diff-stat + parallel-lane evidence by reference.
- [ ] Regression suite updated — not evidenced: no baseline suite path or regression-run log cited in any lane matrix; commits all `pending — orchestrator owns commits` / `n/a`. Rides Q-002.
- [ ] No flaky tests introduced — N/A (no executable tests); attestation rows themselves are unrepeatable without log paths (Q-002).
- [ ] Coverage threshold met — in-table 28/28, verified-proven lower: §5 drift (Q-001), unpathed lane logs + stale T-002 (Q-002), unexecuted dry run (Q-003), missing override-or-clean record (Q-004) block OPEN. Gate stays CONDITIONAL.
- [ ] Manual exploratory testing done — partial: independent live probes by reliability/resilience/security/automation reviewers confirm slash-ignore green, count 1 ≤ 2, 0-hit scans (see Rationale); orchestrator-aggregated 2-SPEC dry run not executed (Q-003).

## Traceability

| REQ-ID | Test ID | Type | Status |
|--------|---------|------|--------|
| REQ-001 | T-001 (eng) | Review | conditional-pass — artifact linked (`SKILL.md`), defective per Q-001 (§5 1/4) |
| REQ-002 | T-002 (eng) | Attestation | conditional-pass — state holds per gate probes, lane log unpathed per Q-002 |
| REQ-003 | T-003 (eng) | Review | conditional-pass — same log gap per Q-002 |
| REQ-004 | T-004 (eng) | Attestation | conditional-pass — by reference to automation lane, no live setup log per Q-002 |
| REQ-005 | T-005 (eng) | Review | conditional-pass — wording by reference, dry-run count pending per Q-003 |
| REQ-006 | E-001 (eng) | Review | conditional-pass — lifecycle artifact linked, dirty-baseline path needs Q-004 record |
| REQ-007 | E-002 (eng) | Attestation | conditional-pass — invariants linked, commit unattributed per Q-002 |
| REQ-008 | E-003 (eng) | Review | conditional-pass — packets linked, no pasted bodies observed |
| REQ-AUTO-001 | T-001 (auto) | Review | conditional-pass — `pwsh-flow.md` §1 linked |
| REQ-AUTO-002 | T-002 (auto) | Attestation | conditional-pass — no live setup log exists yet per Q-002 |
| REQ-AUTO-003 | T-003 (auto) | Attestation | conditional-pass — gate text present, live red/green drill pending per Q-002 |
| REQ-AUTO-004 | T-004 (auto) | Review | conditional-pass — guard text present, snapshot unpathed per Q-002 |
| REQ-AUTO-005 | T-005 (auto) | Attestation | conditional-pass — TTL contract defined, no live remove/prune log per Q-002 |
| REQ-AUTO-006 | T-006 (auto) | Review | conditional-pass — pwsh-native verified by probe (0 POSIX hits), artifact linked |
| REQ-AUTO-007 | T-007 (auto) | Attestation | conditional-pass — scan cited 0 hits without log path per Q-002 |
| REQ-PPL-001 | E-001 (people) | Review | conditional-pass — template §1 linked, transcript excerpt path unfilled per Q-003 |
| REQ-PPL-002 | E-002 (people) | Review | conditional-pass — template §§1-2 linked, uniformity check pending per Q-003 |
| REQ-PPL-003 | E-003 (people) | Review | conditional-pass — template §3 linked, drill log + override record pending per Q-003/Q-004 |
| REQ-PPL-004 | E-004 (people) | Review | conditional-pass — template §4 linked, 2-SPEC count unobserved per Q-003 |
| REQ-PPL-005 | E-005 (people) | Sign-off | conditional-pass — brief-back line linked, brief path or none-needed pending per Q-003 |
| REQ-SEC-001 | T-001 (sec) | Review | pass — boundary table 4/4 linked (`guards.md` §1) |
| REQ-SEC-002 | T-002 (sec) | Attestation | conditional-pass — STALE observation per Q-002 (53 lines/exit 1 vs current 56 lines/entry `:55-56`/slash exit 0) |
| REQ-SEC-003 | T-003 (sec) | Review | conditional-pass — clause + count linked, snapshot unpathed per Q-002 |
| REQ-SEC-004 | T-004 (sec) | Review | conditional-pass — scan 0 real hits confirmed by spot-checks, lane log unpathed per Q-002 |
| REQ-SEC-005 | T-005 (sec) | Attestation | conditional-pass — none-needed statement holds, drill-log path unattached per Q-002 |
| REQ-SEC-006 | T-006 (sec) | Review | conditional-pass — fallback policy defined, never exercised (pre-execution by nature) |
| REQ-SEC-007 | T-007 (sec) | Review | pass — allowlist cited paths-only, zero bodies observed |
| REQ-SEC-008 | T-008 (sec) | Review | pass — prohibition clause linked, zero operative freelance instructions |

No orphan evidence: every Evidence ID maps to exactly one REQ-ID above; every REQ-ID has exactly one row. No finding below lacks proof; any claim without diff/scan/log ref is REFUTED — none made here without one.

## Coverage

- Line coverage: N/A (non-code skill-shape change with justification per lane matrices)
- Branch coverage: N/A (same justification)
- Evidence coverage: **28/28 rows present with linked artifact** (8 eng + 7 auto + 5 people + 8 sec, all marked `pass` in-table — verified by read); verified-proven for OPEN: lower — Q-001 blocks 1 row family, Q-002 blocks lane-log attestation rows, Q-003 blocks 4/5 people rows + C-006, Q-004 blocks next-`add` pre-condition
- Acceptance criteria coverage: **28/28 claimed in-table** (eng 8/8 + auto 7/7 + people 5/5 + sec 8/8); OPEN-ready 0/28 until Q-001..Q-004 clear — claiming OPEN now would be a silent PASS

## Findings

| ID | Severity | Location | Finding + Proof | Remediation + owner (COND) |
|----|----------|----------|-----------------|----------------------------|
| Q-001 | Medium | `skills/git-worktree/SKILL.md:45-47` vs `skills/git-worktree/references/` (4 files) + SKILL §3 steps 1/3/4 | §5 drift blocks OPEN: §5 lists 1/4 refs (`worktree-lifecycle.md` only); glob returns 4 files; §3 steps 1/3/4 normatively consume `announce-template.md`, `guards.md`, `pwsh-flow.md`. Proof confirms readability RD-001 / refuter RF-001 / risk RK-002 / automation AUT-002. Falsifies eng T-001 as cited. | COND-001: add 3 missing §5 lines. Owner: engineering owner. Required. |
| Q-002 | Medium | eng matrix §Condition Evidence + auto matrix §Condition Evidence + sec matrix `:10` | Lane log/snapshot citation gaps block verification: eng/auto C-001/C-003 cite unpathed "session shell log(s)", scans cite "returns 0 hits" with no log path, commits "pending — orchestrator owns commits" (refuter RF-004 / risk RK-001 / sec S-GATE-002 / auto AUT-001); sec T-002 stale — records 53-line `.gitignore` / absent entry / exit 1 vs current 56 lines + entry `:55-56` + slash exit 0 (refuter RF-006). States independently CONFIRMED by gate live probes, but rows read `pass` without attachable artifact. | COND-002: attach log paths + `worktree list` snapshots + rescan proof (or downgrade rows to `pending`); security lane re-attests T-002 (one line + probe code). Owners: engineering owner (C-001/C-003 logs) + automation owner (setup/TTL logs) + security owner (C-002/C-004 rescan + T-002). Required. |
| Q-003 | Medium | `santana/TEST_MATRIX-git-worktree-people.md:25` + §C-006 | 2-SPEC dry run unexecuted blocks C-006 and OPEN: excerpt slots `<path-or-session-ref>` unfilled; §C-006 self-states "carried, not closed here"; count "expect 2 create + ≤2 remove" stated, not observed. Proof confirms refuter RF-005 / risk RK-001 / sec S-GATE-001 / people P-001. In-table 5/5 `pass` ≠ proven. | COND-003: run orchestrator-aggregated 2-SPEC dry run; fill create-consent excerpt path + removal excerpt path + dirty-baseline drill log path + announce count (2 create + ≤2 remove). Owner: people owner (santana); security confirms Cross-domain touch only. Required. |
| Q-004 | Medium | repo baseline 2026-09-16 (`git status --porcelain` → `M .gitignore`, `M AGENTS.md`, `M README.md`, `?? quality-gate/git-worktree/`) | Dirty baseline blocks next `add` without record: per skill §3 step 2 + `worktree-lifecycle.md:20-26` + `pwsh-flow.md:30-38`, non-empty means REFUSE `git worktree add` without session-recorded `override: <who> <timestamp> <reason>`. Proof confirms refuter RF-003 / risk RK-003 / sec S-GATE-004 / auto AUT-003b. C-001 green currently rides uncommitted hunk. | COND-004: record `override: <who> <timestamp> <reason>` in session/matrix or land clean before any lane creates. Owner: orchestrator. Required. |
| Q-005 | Low | `guards.md:33` vs `worktree-lifecycle.md:31` + `pwsh-flow.md:45`; `guards.md:44-46` vs `.gitignore:55-56`; `pwsh-flow.md:88-93` | Hygiene rides gate, no handoff block: (a) bare `check-ignore -q .worktrees` vs canonical trailing-slash form — probe slash exit 0 / bare exit 1, copy-paste from guards STOPs on fresh clones (same as RD-003/RF-002/RK-004/AUT-003/S-GATE-003); (b) `guards.md:44-46` "entry absent, exit 1" stale vs landed entry (same as RF-006); (c) serialized mutex waiter has no wall-clock kill bound (same as RL-001/RS-009/RK-005). | COND-005: slash-form one-line fix + T-002 re-attestation line + TTL co-sign note. Owners: security owner (a–b) + automation owner (c). Recommended in same pass. |

No Critical/High findings — nothing surfaces same-session beyond this Conditional record per guardrails 9–11.

## Verdict Rationale

Conditional, not pass: trace is structurally complete (28/28 rows, 28/28 ACs, zero orphans) and the independently probeable mechanics hold (slash-ignore green, live count 1 ≤ 2, 0-hit scans, single-purpose snippets, fail-closed refuse/STOP rules, remove+prune restore — confirmed across reliability-pass, resilience-pass, and live probes in security/automation reviews). But HARD forbids handoff with unverified conditions, and four load-bearing gaps remain: Q-001 §5 drift falsifies T-001 and hides 3 lanes from skill entry; Q-002 leaves attestation rows citing unpathed logs with a stale T-002; Q-003 leaves C-006 dry run unexecuted by its own matrix's admission; Q-004 leaves the next `add` on a dirty baseline without an override-or-clean record. Gate cannot OPEN on this packet. Conditional, not fail: no counterexample breaks the lifecycle, ignore gate, capacity guard, or scan posture — every Medium has a defined mitigation with a named owner (COND-001..004), and Q-005 rides as Low hygiene. Re-check flips this review to pass when COND-001 §5 fix + COND-002 log/snapshot attachments and re-attestation + COND-003 dry-run excerpts and count + COND-004 override-or-clean record land. Gate recommendation: **CONDITIONAL** (no fail verdict across all 9 reviews → not CLOSED; conditionals present → not OPEN).
