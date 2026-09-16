# Reliability Review: SPEC-git-worktree

**Reviewer:** review-reliability (engineering lane)
**Date:** 2026-09-16
**Verdict:** pass

## Checklist

- [x] Error paths handled explicitly
- [x] No swallowed exceptions
- [x] Input validation at boundaries
- [x] Deterministic behavior (no hidden state)
- [x] Edge cases tested (empty, null, max, boundary)
- [x] Idempotency where required
- [ ] Timeouts on external calls — see RL-001 (Low, hygiene; serialized mutex + STOP-on-red cover failure, no wall-clock bound declared)

## Failure Modes Analyzed

| ID | Failure Mode | Expected Behavior | Handled? |
|----|--------------|-------------------|----------|
| FM-001 | Dirty baseline at create | REFUSE `git worktree add` unless session-recorded override with owner + reason | yes — `worktree-lifecycle.md` §1.2, `pwsh-flow.md` §1.1 |
| FM-002 | Ignore gate nonzero (`git check-ignore -q .worktrees/`) | STOP, no override; fix `.gitignore`, re-probe green, retry add | yes — `worktree-lifecycle.md` §1.3, `pwsh-flow.md` §1.2, `guards.md` §2 |
| FM-003 | Red baseline (`mise run typecheck`) | STOP, fix forward, re-run green; never hand red to `execute-spec` | yes — `worktree-lifecycle.md` §2.2, `pwsh-flow.md` §4 |
| FM-004 | Third dispatch / live count > 2 | Refuse or queue with orchestrator log; never create sideways | yes — `worktree-lifecycle.md` §§1.4/2.1, `pwsh-flow.md` §§1.3/6, `SKILL.md` §3.4 |
| FM-005 | Failed setup / orphaned entry | Same remove path with declared TTL + owner; never blocks `main` | yes — `worktree-lifecycle.md` §§3.2/4, `pwsh-flow.md` §5 |
| FM-006 | Phantom state across lanes | Reference-only `SPEC/HARD/GATE/DOMAINS` packets; branch-per-SPEC; single writer per file | yes — `SKILL.md` §§3.5/4, `worktree-lifecycle.md` §§0/2.3 |

## Findings

| ID | Severity | Location | Finding |
|----|----------|----------|---------|
| RL-001 | Low | `skills/git-worktree/references/pwsh-flow.md` §§3–4 | No wall-clock timeout declared on external calls (`git worktree add`, `mise install`, `mise run typecheck`). Overlap is prevented by the serialized installer mutex and failure by STOP-and-fix-forward, but a hung installer has no stated kill bound. Hygiene only; rides the gate, no handoff block. |

## Verdict Rationale

PASS with one Low hygiene finding. Every reliability-relevant error path is explicit and fail-closed: dirty-baseline refuse (FM-001), ignore-gate nonzero STOP with no override (FM-002), red-baseline STOP (FM-003), max-2 refuse-or-queue (FM-004), orphan cleanup with TTL + owner (FM-005), and no phantom state via reference-only packets plus single-writer rule (FM-006). Retry N=2-then-escalate is pinned in `SKILL.md` §3.6 and `worktree-lifecycle.md` §§0/4 — no third loop, no sideways dispatch. No silent failures: every STOP names its re-probe or fix-forward step, and removal ends in a `git worktree list` residue check plus a removal announce.

Live proof (session shell, 2026-09-16): `git check-ignore -q .worktrees/` exit 0 (gate green); `.gitignore` diff shows the canonical trailing-slash `.worktrees/` entry with REQ-002/C-001 comment (+3/−0); `git ls-files .worktrees/` empty and `git status --porcelain -- .worktrees/` empty (zero tracked worktree paths); `git worktree list` shows 1 live entry (main only, ≤ 2, no residue). Working-tree dirty files (`M .gitignore`, `M AGENTS.md`, `M README.md`) sit outside `.worktrees/` — the next `add` must therefore take the refuse-or-override path per FM-001, which is the specified behavior, not a defect. Baseline-green-before-handoff is enforced by `pwsh-flow.md` §4 with the override path owned by engineering; per-worktree typecheck logs ride the gate packet by reference. RL-001 (missing timeout bound) is hygiene and does not block handoff. No waiver needed; gate input from this reviewer is PASS.
