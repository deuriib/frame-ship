# frame-ship — persistent rules

## Chain (do not skip)

```text
frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release
```

## Load order (HARD STOP)

1. `using-frame-ship` is ALREADY loaded in context (bootstrap via `context-inject` hook). NEVER re-read or re-load `using-frame-ship` via the skill tool.
2. Load the `<stage>` skill via the skill tool ONCE at the start of that stage before performing work for that stage. NEVER re-load skills on every individual edit or command. No skill = STOP.
3. Then act. Pre-flight: stage skill loaded? `SPEC/HARD/GATE/DOMAINS`? Any NO → STOP, load stage skill first. FAIL → retry N=2 differently → escalate to orchestrator. No third loop, no sideways.

## Trigger → skill

- start / what-skills → `using-frame-ship`
- initiative / OKRs → `frame-intent` (BRIEF + OKRs)
- brief approved → `translate-to-spec` (REQ + ARCHITECTURE + CONTRACTS)
- ready to implement → `propose-changes` (PROPOSED_CHANGES, repo untouched)
- auth / data / external API → `review-security` (STRIDE)
- public API / data model / cross-cutting → `review-architecture` (ADR)
- approved spec → `execute-spec` (approved files, REQ → test)
- implementation ready → `quality-gate` (CLOSED on fail)
- work complete → `verify-handoff` (HANDOFF, DoD)
- verified → `ship-release` (NOTES + changelog + rollback)

## Hard rules

1. No code without an approved proposal.
2. Security review for auth/data/API.
3. ADR for contract changes.
4. No handoff on CLOSED gate without waiver.
5. `REQ-ID → test → artifact → gate verdict` trace, always.
6. `HANDOFF.md` before ship.
7. Reference-only packets between stages — never paste full context.
8. Quality gate reviewer independence: Every reviewer is strictly independent from each other (1 subagent per reviewer). No single agent may do all reviewers' work or bundle review roles.

## Execution mode

Execution is subagents only — the natural process: orchestrator dispatches the entire team; domain owners/specialists do the work or brief back. Reference-only SPEC/HARD/GATE/DOMAINS packets, full-wave always. Trivial reversible work (<15 lines) lives outside methodology as CEO fast-path (checkpoint-only), never as a chain branch.

Version lockstep: [frame-ship v0.8.0] — bump with `plugins/opencode/frame-ship.ts` + `plugins/antigravity/hooks/context-inject.ts`.
