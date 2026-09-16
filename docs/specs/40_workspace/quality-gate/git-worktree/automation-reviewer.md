# Automation Review: SPEC-git-worktree-automation

**Reviewer:** automation-reviewer (+ ops lens, automation owner + engineering owner mechanics)
**Date:** 2026-09-16
**Verdict:** conditional
**Skill:** skill(frame-ship:quality-gate) + `skills/quality-gate/references/domains/automation-review.md` + `skills/quality-gate/references/domains/ops-review.md` (lens)
**Packet (by reference only):** SPEC `skills/git-worktree/references/pwsh-flow.md` + `skills/git-worktree/references/worktree-lifecycle.md` + `docs/specs/40_workspace/vasquez/TEST_MATRIX-git-worktree-automation.md` (7/7) / HARD: execution_mode=multi-subagents, win32/pwsh, serialized mise setup, max 2, TTL+owner cleanup, runbook order / GATE: arch-Approved, sec-Conditional C-001..C-006 / DOMAINS: [engineering, automation/ops, security, people] — this review covers automation/ops
**Role note:** I understand the automation-reviewer role first — workflow logic plus ops run mechanics; I never approve my own work (wrote no git-worktree content).

## Checklist (per `automation-review.md`)

- [x] Workflow/port/adapter/event boundary mapped (PII checkpoint per guardrails) — runbook owns automation/ops mechanics only (`pwsh-flow.md:7-12` scope note); trust-boundary detail by reference to security lane `guards.md`; no ports/adapters/events added by this lane (matrix C-001/C-004/C-006 "by reference — this lane changes no ignore entries, ports, adapters, or announce tone").
- [x] Least-privilege scopes verified (keys, roles, automation identities) — no keys/roles widened; per-worktree isolation (own `<spec-id>` dir, own branch, max-1 installer mutex) in `pwsh-flow.md` §§1/3/6; zero credential values confirmed by security C-002 spot-check, confirmed here by scope: this lane adds no identities.
- [x] Idempotency + retry budget defined (retry N=2, then escalate — no third loop) — retry rule pinned in `worktree-lifecycle.md` §§0/4 + `pwsh-flow.md` §§3/6 (serialized mutex replaces parallel retry; lock-flake retry = mutex violation, `pwsh-flow.md:91-93`); third dispatch waits or escalates, never sideways (`pwsh-flow.md:22-23,61-63`).
- [x] Deployment plan + rollback tested (see ops lens below) — plan = create→verify→setup→baseline→remove runbook order (`pwsh-flow.md` §§1-5); rollback = `remove --force` + `prune` + `list` residue verify (`pwsh-flow.md:119-124`); **conditional** only because no live worktree has executed the runbook yet — attestation rows cite unpathed "session shell log" (see AUT-001).
- [ ] Monitoring/alerting + runbook updated — runbook updated (this lane's deliverable); monitoring N/A with justification (local `git`/`mise` probes, no service/alert surface); per-worktree evidence checklist defined (`pwsh-flow.md` §7: exit codes, `list` snapshots, setup logs with timestamps, `mise current/ls`, typecheck output path, TTL+owner statement, transcript path) but no executed transcript exists yet (see AUT-001).
- [x] Capacity/scaling + feature flags reviewed (if needed) — capacity guard max-2 live verified (see ops lens); feature flags N/A (no runtime behavior change).
- [x] No freelance fixes (no prod key rotation / permission widening by reviewer) — none instructed or executed; this review reports only, owner remediates.

## Findings

| ID | Severity | Location | Finding + Proof |
|----|----------|----------|-----------------|
| AUT-001 | Medium | `docs/specs/40_workspace/vasquez/TEST_MATRIX-git-worktree-automation.md` T-002..T-005 + §C-005/C-003/C-002 | Lane attestation rows lack citable logs. Proof: matrix cites "session shell log for this lane" with no path for C-003 snapshot, and "returns 0 hits" with no log path for C-002; T-002 requires "timestamped logs proving no overlap" but no worktree has been created so no setup log exists; commits "pending — orchestrator owns commits". Same gap as refuter RF-004 / risk RK-001 / security S-GATE-002, automation-lane instance. State independently CONFIRMED by this review's live probes (see Rationale), but rows read `pass` without attachable artifact — downgrade to `pending` or attach paths. |
| AUT-002 | Medium | `skills/git-worktree/SKILL.md:45-47` vs `skills/git-worktree/references/` (4 files) + SKILL §3 steps 1/3/4 | §5 drift hides the automation lane from skill entry. Proof: §5 lists only `worktree-lifecycle.md`; glob returns 4 files; SKILL §3 steps 1/3/4 normatively consume `guards.md`, `pwsh-flow.md`, `announce-template.md`. Confirms readability RD-001 / refuter RF-001 / risk RK-002 — automation-lane consequence: operators entering via SKILL cannot discover `pwsh-flow.md` runbook, risk skipping serialized setup / mutex / TTL steps. Fix: 3-line §5 addition (required). |
| AUT-003 | Low | `skills/git-worktree/references/pwsh-flow.md:88-93` + repo baseline 2026-09-16 | Ops hygiene carries: (a) mutex waiter has no wall-clock kill bound ("A lane that arrives while the mutex is held waits") — same as RL-001/RS-009/RK-005, escalation bounds the wait; (b) dirty baseline (`M .gitignore`, `M AGENTS.md`, `M README.md` per this-session `git status --porcelain`) means next `add` takes refuse-or-recorded-override path per `pwsh-flow.md:30-38` — same as RF-003/RK-003/S-GATE-004. Rides gate, no handoff block. |

No finding above lacks proof; any claim without diff/scan/log ref is REFUTED — none made here without one. No Critical/High findings.

## Verdict Rationale

Conditional, not pass: the automation mechanics verify live (see probes below), but the lane's own matrix claims execution-grade `pass` on attestation rows with no executable artifact yet (AUT-001), and the skill entry hides the runbook it attests (AUT-002). Conditional, not fail: every probeable automation state holds green — pwsh-native 0 POSIX hits, serialized mutex text present, baseline gate present, max-2 guard present, TTL+remove+prune present, runbook order present, live count 1 ≤ 2 with zero tracked paths — so no counterexample breaks the runbook; gaps are closable attachments plus a 3-line §5 fix.

Live probes (this session, 2026-09-16, pwsh):
- `Select-String -Pattern '\$\('` over `pwsh-flow.md` + `worktree-lifecycle.md` → **0 hits** (pwsh-native verified).
- `Join-Path` / `Resolve-Path -LiteralPath` / `Test-Path -LiteralPath` present (`pwsh-flow.md:18-19,54,57`); serialized mutex present (`pwsh-flow.md:77-93`, max-1 installer); `mise run typecheck` baseline gate present (`pwsh-flow.md:100-110`, green-required-before-execute-spec); TTL+owner + `remove --force`/`prune`/`list` present (`pwsh-flow.md:112-128`); max-2 guard present (`pwsh-flow.md:22-23,61-63,130-141`); runbook order create→verify→setup→baseline→remove matches §§1-5.
- `git check-ignore -q .worktrees/` exit **0** (gate green); `git worktree list` → **1 entry** (`D:/GitHub/frame-ship e7a6ba4 [main]`, count 1 ≤ 2); `git status --porcelain -- .worktrees/` empty + `git ls-files -- .worktrees/` empty (zero tracked worktree paths, capacity clean).

Required to flip this review to pass: AUT-001 log/snapshot attachments (or row downgrade to `pending` with orchestrator-owned follow-up) + AUT-002 §5 fix. AUT-003 rides as hygiene in the same pass.

## Ops Lens (per `ops-review.md` — automation owner spec, engineering owner mechanics)

- [x] Deployment plan defined — `pwsh-flow.md` §§1-5 runbook order (clean check → ignore gate → one add per SPEC-ID → verify → serialized setup → typecheck baseline → TTL remove/prune/verify).
- [x] Rollback tested (defined; execution pending) — `remove --force` + `prune` + `list` residue check (`pwsh-flow.md:119-124`); orphan/failed-setup same path with declared TTL+owner; failed setup never blocks `main`. Live rollback unexecuted (no worktree created) — covered by AUT-001.
- [x] Monitoring/alerting updated — N/A (local probes); per-worktree evidence checklist substitutes observability (`pwsh-flow.md` §7: 8-item checklist incl. transcript path).
- [x] Runbook updated — this lane IS the runbook update (`pwsh-flow.md`, 152 lines); lifecycle order complemented by reference, never duplicated (`pwsh-flow.md:7-12` scope note).
- [x] On-call impact assessed — none (no service, no prod touch); third-dispatch wait-or-escalate keeps load bounded.
- [x] Capacity/scaling reviewed — max-2 live + max-1 installer verified live (count 1 ≤ 2, zero tracked paths per probes above); `.worktrees/` ignored and fail-closed (`pwsh-flow.md` §§6-7).
- [x] Feature flags (if needed) — N/A, no runtime change.

Ops verdict: **conditional** (rides AUT-001/AUT-002; no independent ops fail).
