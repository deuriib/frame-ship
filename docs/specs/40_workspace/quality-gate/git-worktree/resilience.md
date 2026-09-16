# Resilience Review: SPEC-git-worktree

**Reviewer:** review-resilience (engineering lane)
**Date:** 2026-09-16
**Verdict:** pass

Scope: resilience lens only for `multi-subagents` isolation layer. Role + charter: `skill(frame-ship:quality-gate)` routed via engineering reviewers; criteria from `skills/quality-gate/references/engineering/resilience-review.md`. Packet consumed by reference only (`SPEC: skills/git-worktree/` + `.gitignore` + `ARCH: docs/specs/10_design/ARCHITECTURE-git-worktree.md`); no pasted bodies. I never approve my own work — this lane wrote no `git-worktree` content.

## Checklist

- [x] Graceful degradation under partial failure — dirty-baseline REFUSE, ignore-gate STOP, red-baseline STOP, submodule REFUSE-or-pinned-verify, sandbox fallback; `main` never blocked.
- [x] Circuit breakers / retries with backoff — retry N=2 differently then escalate to orchestrator, no third loop; serialized installer mutex replaces parallel retry (no backoff interval applicable to local `git` ops; see RS-009 hygiene note).
- [x] Resource limits (memory, CPU, connections) — scoped as max-2 live worktrees + max-1 installer at a time; `git worktree list` count guard at every phase.
- [x] Recovery from crash / restart — terminal state `remove` + `prune` + `list` residue check; orphaned/failed-setup entries removed the same way with declared TTL + owner.
- [x] No single point of failure introduced — failed setup never blocks `main`; third dispatch waits or escalates, never sideways.
- [x] Observability (logs, metrics, traces) — per-worktree evidence checklist: `check-ignore` exit code, `worktree list` snapshots pre/post, setup log with timestamps, `mise current/ls`, typecheck output path, TTL + owner statement, pwsh transcript path.
- [x] Chaos scenarios tested (as defined drills) — dirty-baseline, ignore-gate nonzero, red-baseline, third-dispatch, submodule-present, and fallback drills are defined with probe commands and expected outputs; live drill logs ride the gate packet by reference at execution time.

## Stress Scenarios

| ID | Scenario | Expected | Observed (by reference) | Pass? |
|----|----------|----------|-------------------------|-------|
| RS-001 | Retry logic bounded | N=2 differently, then escalate; no third loop | `skills/git-worktree/SKILL.md` §3.6; `references/worktree-lifecycle.md` §§0/4 ("Retry N=2 differently, then escalate — no third loop"); `ARCHITECTURE-git-worktree.md` Data Flow §42 + NFR Usability §73 (same rule) | yes |
| RS-002 | Rollback points explicit | `remove --force` + `prune` + `list` residue check; failed setup restores `main` | `references/worktree-lifecycle.md` §3 (lines 67-76); `references/pwsh-flow.md` §5 (lines 119-124); `ARCHITECTURE-git-worktree.md` Data Flow §39 + NFR Availability §70 ("remove + prune restores") | yes |
| RS-003 | Sandbox fallback defined | ONLY `Temp\opencode`, with purpose + TTL + deletion owner, explicit cleanup, never silently permanent | `references/worktree-lifecycle.md` §4 ("sandbox fallback under `Temp\opencode` … TTL plus owner declared"); `references/guards.md` §6 (lines 102-117: only root, three fields, remove/prune/list verify); `ARCHITECTURE-git-worktree.md` NFR Operability §72 | yes |
| RS-004 | Submodule guard | Probe before `add`; refuse checkout by default or demand pinned-verify; unpinned/recursive without exception = finding | `references/guards.md` §5 (lines 82-100: `submodule status` + `.gitmodules` probe, 5-step drill, drill log to gate evidence); `references/worktree-lifecycle.md` §1.2 (line 26: submodule repos hit `guards.md` before this point) | yes |
| RS-005 | Dirty-baseline handling | `status --porcelain` empty = proceed; non-empty = REFUSE `add` unless explicit session-recorded override (owner + reason) | `references/worktree-lifecycle.md` §1.2 (lines 20-26); `references/pwsh-flow.md` §1.1 (lines 30-38); `SKILL.md` §3.2; `references/announce-template.md` §3 (refusal script + override contract); `ARCHITECTURE-git-worktree.md` INV-004 + Data Flow §42 | yes |
| RS-006 | TTL cleanup | Every worktree declares purpose + TTL + deletion owner before creation; expiry/completion triggers terminal remove; orphans removed same way | `references/pwsh-flow.md` §5 (lines 114-117: three fields per worktree) + §7 evidence checklist; `references/worktree-lifecycle.md` §3.2 (line 76: orphans with declared TTL + owner); `ARCHITECTURE-git-worktree.md` NFR Operability §72 (terminal state `remove` + `prune` verified by `list`) | yes |
| RS-007 | No unbounded loops | No code loops; only bounded retry (N=2) and bounded live count (≤2); serialized setup, no parallel installers | Full-file read: `worktree-lifecycle.md` (81 lines), `pwsh-flow.md` (152 lines), `guards.md` (149 lines) contain no `while/for` retry loops; bounds pinned in `worktree-lifecycle.md` §§0/1.4/2.1, `pwsh-flow.md` §§3/6, `SKILL.md` §§3.4/3.6 | yes |
| RS-008 | No sideways dispatch | Third dispatch waits or escalates; never create sideways; single writer per file; reference-only packets | `SKILL.md` §§3.4/3.6 ("never exceed 2", "no sideways dispatch"); `worktree-lifecycle.md` §1.4 (line 44: "never exceed 2"); `pwsh-flow.md` §1.3 (lines 61-63) + §6; `guards.md` §3 (lines 52-56: "third waits or escalates, no sideways") | yes |

## Findings

| ID | Severity | Location | Finding |
|----|----------|----------|---------|
| RS-009 | Low | `skills/git-worktree/references/pwsh-flow.md` §§3–4 (lines 88-93) | Installer-mutex waiter has no wall-clock timeout/kill bound: "A lane that arrives while the mutex is held waits." Overlap is prevented and failure is STOP-and-fix-forward, and escalation bounds the wait via RS-001/RS-008, but a hung holder has no stated kill bound. Consistent with reliability RL-001; hygiene only, rides the gate, no handoff block. |

No other findings. Every mandated check above carries a file:line proof; any claim without such proof is REFUTED per gate rule — none made here without one.

## Verdict Rationale

PASS with one Low hygiene observation (RS-009). All eight mandated resilience controls are defined and bounded by reference: N=2-then-escalate retry (RS-001), explicit remove + prune + list rollback (RS-002), `Temp\opencode`-only fallback with TTL + owner (RS-003), pre-checkout submodule drill (RS-004), fail-closed dirty-baseline refuse-or-recorded-override (RS-005), per-worktree TTL + owner with orphan path (RS-006), zero unbounded loops (RS-007), and wait-or-escalate with no sideways creation (RS-008). INV-002/INV-003/INV-004/INV-007 hold; `.gitignore` carries the canonical `.worktrees/` entry (line 56). RS-009 (missing mutex-wait timeout) does not degrade any scenario outcome — the waiter escalates rather than spins — so it rides the gate as hygiene. No waiver needed; gate input from this reviewer is PASS.
