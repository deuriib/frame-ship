---
name: using-frame-ship
description: Use when a session starts, after compaction, or when asking what frame-ship does.
---

# Using Frame-Ship — Bootstrap and Chain Contract

*"Do things as if for God—that's why you work with excellence and dedication."*

## Overview

Bootstrap skill: teaches that skills trigger automatically, states the authoritative stage order, and routes to the stage skill that owns each kind of work. Produces no briefs, specs, or code.

## Chain Contract

- **Previous:** none (bootstrap loads before chain entry)
- **Next:** `frame-ship:frame-intent` (chain entry for new initiatives)

```text
using-frame-ship → frame-intent → translate-to-spec → propose-changes
  → review-security / review-architecture → execute-spec → quality-gate
  → verify-handoff → ship-release
```

## Role Binding

Bound to **every agent in session**—this skill binds behavior, not a role. Single-primary-owner rule applies per stage: orchestrator owns briefs + multi-domain gates + releases; engineering owner owns architecture verdicts; security owner owns security verdicts. Specialists never self-dispatch, never approve their own proposal.

## Process

### Load Order — HARD STOP (subagents)

1. `using-frame-ship` is already loaded—NEVER re-load via the skill tool.
2. Load the target `<stage>` skill via the native `skill` tool **once** when entering that stage, BEFORE acting. Do NOT re-load on every tool call, edit, or bash. No skill = STOP.
3. External skills (complement, not chain): load at most 1–2 after the stage skill when a trigger matches. Chain wins on conflict. Cite by path + anchor.
4. Domain owner/specialist role understood—skill + role per stage.
5. Pre-flight: stage skill loaded? `SPEC/HARD/GATE/DOMAINS` packet ready? Any NO → STOP. FAIL → retry N=2 differently → escalate. Never third loop.

### Routing — by trigger, never by guess

| Trigger | Stage skill |
|---|---|
| New initiative / OKRs / strategic planning | `frame-ship:frame-intent` |
| Brief approved / new domain spec | `frame-ship:translate-to-spec` |
| Ready to implement / pre-approval | `frame-ship:propose-changes` |
| Auth/data/external API | `frame-ship:review-security` |
| Public API / data model / cross-cutting | `frame-ship:review-architecture` |
| Approved spec | `frame-ship:execute-spec` |
| Implementation ready for review | `frame-ship:quality-gate` |
| Work complete, pre-ship review | `frame-ship:verify-handoff` |
| Verified, ready to ship | `frame-ship:ship-release` |
| Bug report / failed test / unexpected behavior | `frame-ship:debugging` |
| Parallel lanes (subagents, max 2) | `frame-ship:execute-spec` + `references/worktree-annex.md` |
| Branch / PR / ready-for-review | `frame-ship:pull-request` |

### Hard Rules — every step

- **Proposal before code** (or external send/filing/launch for non-code).
- **Security review** for auth/data/API.
- **ADR** for contract changes.
- **No handoff** on CLOSED gate without domain owners + orchestrator waiver.
- **`REQ-ID → test/evidence → artifact → gate verdict`** trace.
- **`HANDOFF.md` before ship.**
- **Reference-only packets** between stages (`SPEC/HARD/GATE/DOMAINS`).
- Execution is **subagents only**. Sequential degradation, same contract: same packet, same reviewers, same full-wave gate. No min-gate, no silent downgrade.
- **Trivial reversible work (<15 lines)** lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.

### After Compaction

Re-load this skill first, then resume at the recorded stage with trace and gate verdicts intact.

## What I Won't Do

- Write briefs, specs, proposals, code, or releases (→ stage skills).
- Skip stages or approve my own work.
- Paste full context between stages—reference-only packets.

## Red Flags

| Thought | Reality |
|---|---|
| "I know the stage, skip loading" | No skill loaded = STOP. Load once, then act. |
| "Re-load the bootstrap before each step" | NEVER re-load `using-frame-ship`. It's already in context. |
| "This is too small for a stage skill" | Trivial (<15 lines, reversible) is CEO fast-path only—outside the chain. Everything else loads its stage skill. |
| "Route by what feels right" | Route by trigger table. Guessing causes skipped stages. |

## References

- `references/bootstrap-checklist.md` — Session-start and post-compaction checks.
- `references/challenge-round.md` — Shared C1–C4 opt-in challenge mechanics.