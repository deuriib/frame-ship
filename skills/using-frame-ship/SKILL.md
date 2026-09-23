---
name: using-frame-ship
description: Introduction to the Frame→Ship skills system and chain contract. Use when a session starts, after compaction, or when asking what frame-ship does. Triggered by "what are your skills", "how does frame-ship work", or session bootstrap.
---

# Using-Frame-Ship — Bootstrap and Chain Contract

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## 1. Purpose

Make the Frame→Ship chain live from the first message. This skill is the
bootstrap: it teaches the agent that skills trigger automatically, states the
authoritative stage order, and points to the stage skill that owns each kind
of work. No briefs, specs, or code are produced here.

## 2. Chain Contract

- Previous: none (bootstrap loads before chain entry)
- Next: frame-ship:frame-intent (chain entry for new initiatives)

```text
frame-ship:using-frame-ship (bootstrap) → frame-ship:frame-intent → frame-ship:translate-to-spec → frame-ship:propose-changes
  → frame-ship:review-security / frame-ship:review-architecture → frame-ship:execute-spec → frame-ship:quality-gate
  → frame-ship:verify-handoff → frame-ship:ship-release
```

## 2b. Role Binding (Org)

- **Bound to:** every agent in session — this skill binds behavior, not a role.
- Single-primary-owner rule still applies per stage: orchestrator owns briefs +
  multi-domain gates + releases; engineering owner owns architecture verdicts;
  security owner owns security verdicts. Specialists never self-dispatch, never
  approve their own proposal.

## 3. Process

0. MANDATORY LOAD ORDER — HARD STOP (subagents only — the natural process):
   1. `using-frame-ship` is already loaded in context (bootstrap) — NEVER re-load it via the skill tool.
   2. Load the target `<stage>` skill via the native `skill` tool ONCE when entering that stage, BEFORE acting for that stage. (Do NOT re-load on every individual tool call, edit, or bash). No skill = STOP.
   External skills (complement, not chain): AFTER the stage skill is loaded, load at most 1-2 external skills when a trigger matches (language, platform, tool). Chain wins on conflict — external skills never waive hard rules, gates, or load order. Cite by path + anchor (reference-only).
   3. Domain owner/specialist role understood — skill + role per stage, subagents full-wave. Path cited in output.
   4. Pre-flight: stage skill loaded? `SPEC/HARD/GATE/DOMAINS` packet ready? Any NO → STOP, load stage skill first. FAIL → retry N=2 differently → escalate to orchestrator. Never third loop, never sideways.
1. Check for relevant skills before any task — mandatory workflows, not
   suggestions. Load the named stage skill via the native `skill` tool before
   acting.
2. Route by trigger, never by guess:
   - new initiative / OKRs / strategic planning → `frame-ship:frame-intent`
   - brief approved / new domain spec → `frame-ship:translate-to-spec`
   - ready to implement / needs pre-approval → `frame-ship:propose-changes`
   - touches auth/data/external API → `frame-ship:review-security`
   - modifies public API / data model / cross-cutting → `frame-ship:review-architecture`
   - approved spec → `frame-ship:execute-spec`
   - implementation ready for review → `frame-ship:quality-gate`
   - work complete, needs review before ship → `frame-ship:verify-handoff`
   - verified, ready to ship → `frame-ship:ship-release`
   - bug report / failed test / unexpected behavior (pre-proposal triage) → `frame-ship:debugging`
   - parallel execution lanes setup (subagents, max 2) → `frame-ship:execute-spec` + its `references/worktree-annex.md`
   - branch / pull request / ready-for-review → `frame-ship:pull-request`
3. Enforce the hard rules on every step (see `references/bootstrap-checklist.md`):
   proposal before code (or before external send/filing/launch for non-code),
   security review for auth/data/API, ADR for contract
   changes, no handoff on CLOSED gate without domain owners + orchestrator waiver,
   `REQ-ID → test/evidence → artifact → gate verdict` trace, `HANDOFF.md` before ship,
   `SPEC/HARD/GATE/DOMAINS` reference-only packets between stages (DOMAINS from 8-domain catalogue in `../AGENTS.md`).
   Execution is subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.
   Sequential degradation, same contract: harnesses without task run lanes sequentially in the same thread — same packet, same reviewers, same full-wave gate. No min-gate, no silent downgrade.
   Orchestrator dispatches entire team; domain owners/specialists do the work or brief back. Each prompt MUST order: understand domain role BEFORE acting; accept packet by reference; return deliverable + risks + assumptions + scoped evidence. Cross-domain need → formal **Cross-domain request** brief to orchestrator, who delegates or resolves.
4. After compaction, re-load this skill first, then resume at the recorded
   stage with trace and gate verdicts intact.

## 4. What I won't do

- Write briefs, specs, proposals, code, or releases (→ stage skills).
- Skip stages or approve my own work.
- Paste full context between stages — reference-only packets.

## 5. References

- `references/bootstrap-checklist.md` — Session-start and post-compaction checks (incl. skill + role load order).
- `references/challenge-round.md` — Shared C1–C4 opt-in challenge mechanics (glossary, opener, human contract, budgets) — cited by `frame-intent`, `propose-changes`, `quality-gate`, `verify-handoff`.
