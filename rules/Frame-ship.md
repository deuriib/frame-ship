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

## External skills (complement the chain)

1. Load the `<stage>` skill FIRST (rules above), then — only if a task trigger matches (language, platform, tool) — load at most 1-2 external skills.
2. Chain wins on conflict: no external skill may waive a hard rule, gate, or the load order above.
3. Cite external skills by path + anchor (reference-only). Never paste full external bodies into stage packets or subagent briefs.
