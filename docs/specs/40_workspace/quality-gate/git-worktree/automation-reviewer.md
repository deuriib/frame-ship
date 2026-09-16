# Automation Review (RE-CHECK N=1): SPEC-git-worktree-automation

**Reviewer:** automation-reviewer (+ ops lens, automation owner + engineering owner mechanics)
**Date:** 2026-09-16
**Verdict:** pass
**Skill:** skill(frame-ship:quality-gate) + `skills/quality-gate/references/domains/automation-review.md` + `skills/quality-gate/references/domains/ops-review.md` (lens)
**Packet (by reference only):** SPEC `skills/git-worktree/references/pwsh-flow.md` post-fix (mutex bound + TTL co-sign) + `skills/git-worktree/SKILL.md` §5 post-fix + `docs/specs/40_workspace/engineering/TEST_MATRIX-git-worktree-automation.md` post-fix (Condition Evidence §, T-002..T-005 pathed) + `docs/specs/40_workspace/engineering/DRILL-git-worktree-2spec.md` + prior verdict `docs/specs/40_workspace/quality-gate/git-worktree/automation-reviewer.md` (conditional AUT-001/AUT-002/AUT-003) / HARD: execution_mode=multi-subagents, win32/pwsh, finding w/o proof = REFUTED / GATE: CONDITIONAL → re-check AUT-001/002/003 / DOMAINS: [engineering, automation/ops, security, people] — this review covers automation/ops
**Role note:** I understand the automation-reviewer role first — workflow logic plus ops run mechanics; I never approve my own work (wrote no git-worktree content). Fix loop N=1, retry 1 of 2.
**Path note:** packet cites `vasquez/` paths; actual matrix + drill verified at `docs/specs/40_workspace/engineering/TEST_MATRIX-git-worktree-automation.md` + `docs/specs/40_workspace/engineering/DRILL-git-worktree-2spec.md`. Content verified regardless; orchestrator to correct the path alias.

## Checklist (per `automation-review.md`)

- [x] Workflow/port/adapter/event boundary mapped (PII checkpoint per guardrails) — unchanged from prior review; runbook owns automation/ops mechanics only (`pwsh-flow.md:7-12`); no ports/adapters/events added.
- [x] Least-privilege scopes verified (keys, roles, automation identities) — unchanged; no identities added; bounded-wait fix adds no privilege (notify-only, never kills another lane's installer).
- [x] Idempotency + retry budget defined (retry N=2, then escalate — no third loop) — mutex waiter now wall-clock bounded (10-min STOP + notify, `pwsh-flow.md:95-102`); third dispatch still waits-or-escalates, never sideways.
- [x] Deployment plan + rollback tested (see ops lens below) — plan unchanged; rollback now drill-executed (DRILL §4: remove x2 + prune + list-back-to-main-only + branch delete + residue check, all exit 0).
- [x] Monitoring/alerting + runbook updated — runbook updated (mutex bound + TTL co-sign); monitoring N/A with justification (local probes); evidence checklist (`pwsh-flow.md` §7) now has executed drill transcript backing it (DRILL §§1-4).
- [x] Capacity/scaling + feature flags reviewed (if needed) — drill proved max-2 live (list snapshots 1→2→3-incl-main→1, DRILL §§1/3/4); live re-probe this session: 1 entry (main only) ≤ 2; flags N/A.
- [x] No freelance fixes (no prod key rotation / permission widening by reviewer) — none instructed or executed; report only.

## Findings (current-state)

| ID | Severity | Location | Finding + Proof |
|----|----------|----------|-----------------|
| AUT-001 | — (cleared, was Medium) | `docs/specs/40_workspace/engineering/TEST_MATRIX-git-worktree-automation.md` Condition Evidence § + `docs/specs/40_workspace/engineering/DRILL-git-worktree-2spec.md` §§1-4 | CLEARED. T-002..T-005 now pathed: C-005 contract text `pwsh-flow.md` §5 + co-sign §3; C-003 `git worktree list` → 2 entries ≤ 2; C-002 `rg -c '\$\('` → exit 1 (0 hits), cross-checked this session (`rg-exit:1`); T-002 kill bound + `git diff -- mise.toml` → 0 lines; T-003 `git check-ignore -q .worktrees/` → exit 0. DRILL note supplies executed snapshots (pre-checks, 2 announces exactly-once, list 1→2→3→1, cleanup exit 0s, residue False/empty). Remaining T-002 timestamped-setup-log + T-003 typecheck-green-drill pendings are honestly marked conditional-pass in-matrix, not claimed pass — residual, not condition. |
| AUT-002 | — (cleared, was Medium) | `skills/git-worktree/SKILL.md:45-50` | CLEARED. §5 now lists all 4 references incl. `references/pwsh-flow.md` (verified `SKILL.md:49`). Runbook discoverable from skill entry; no drift. |
| AUT-003 | — (cleared, was Low) | `skills/git-worktree/references/pwsh-flow.md:95-107` + `docs/specs/40_workspace/engineering/DRILL-git-worktree-2spec.md` §1 | CLEARED. (a) Mutex waiter bound: `AddMinutes(10)` + `STOP: mutex wait exceeded, notify orchestrator` + 30s sleep loop, notify-only kill semantics (`pwsh-flow.md:95-102`, rg-verified this session). (b) Dirty-baseline override: `override: orchestrator 2026-09-16 COND-004-proceed-documented-dirty-baseline` recorded with dirty disposition (in-scope vs out-of-scope split, DRILL §1). Sandbox TTL co-sign present (`pwsh-flow.md:104-107`; security half rides S-GATE-005 by reference). |

No finding above lacks proof; any claim without diff/scan/log ref is REFUTED — none made here without one. No Critical/High findings. No new findings opened.

## Verdict Rationale

Pass: all three prior conditions cleared with proof — AUT-001 pathed logs + executed drill (T-002..T-005 verifiable by reference, live re-probes green), AUT-002 §5 lists the runbook, AUT-003 bound text + override record present. Per-AUT: AUT-001 cleared (pathed evidence + drill snapshots; residual setup-log/typecheck pendings explicitly marked, orchestrator-aggregated); AUT-002 cleared (4/4 refs listed); AUT-003 cleared (10-min notify-only bound + COND-004 override on record). Pass, not conditional: no remaining automation-owned condition blocks handoff; residuals ride the gate report, not this review.

Live re-probes (this session, 2026-09-16, pwsh):
- `git worktree list` → **1 entry** (`D:/GitHub/frame-ship 923a16f [main]`, post-drill clean) ≤ 2.
- `git check-ignore -q .worktrees/` → success (ignored, gate green).
- `git status --porcelain -- .worktrees/` → empty (zero tracked residue).
- `rg -c '\$\(' skills/git-worktree/references/pwsh-flow.md skills/git-worktree/SKILL.md` → exit **1** (0 POSIX hits, pwsh-native).
- `rg` for `AddMinutes(10)` / `STOP: mutex wait exceeded` / `references/pwsh-flow.md` (in SKILL) / `COND-004` → all hit (bound text, §5 listing, override record confirmed).

## Ops Lens (per `ops-review.md` — re-check)

- [x] Deployment plan defined — unchanged, `pwsh-flow.md` §§1-5.
- [x] Rollback tested — now EXECUTED, not just defined: DRILL §4 remove/prune/list/branch-delete/residue-check all exit 0, back to main-only. Live re-probe confirms clean (1 entry, empty `.worktrees/` status).
- [x] Monitoring/alerting updated — N/A (local probes); evidence checklist now drill-backed.
- [x] Runbook updated — post-fix runbook verified (§3 bound + co-sign, §5 TTL, §7 checklist).
- [x] On-call impact assessed — none; bounded wait keeps load finite.
- [x] Capacity/scaling reviewed — drill max 2 ≤ 2 proven; live count 1 ≤ 2.
- [x] Feature flags (if needed) — N/A.

Ops verdict: **pass** (no independent ops fail; AUT-001 rollback-execution gap closed by drill).
