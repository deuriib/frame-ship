# Pre-Flight Contract — HARD STOP

Every stage opens with this gate before acting. **No stage skill loaded = STOP.**

## The checks (any NO → STOP)

1. **Stage skill loaded** via `skill(<stage>)` — once, at stage entry, never re-loaded on every edit/command.
2. **Owning role understood** — the domain owner / specialist template for this stage is read and cited.
3. **Packet intact** — `SPEC:<path>#REQ / HARD:<mode+constraints> / GATE:<verdicts> / DOMAINS:<list>` (reference-only, no full-context paste).
4. **Execution mode declared** — `subagents` only: orchestrator dispatches the team; specialists never self-dispatch, never self-approve.
5. **Stage-specific inputs in hand** — named by each stage's step 0.

## The retry rule

FAIL → retry N=2 differently → escalate orchestrator. Never a third loop, no sideways.

## Fast-path (outside the chain)

Trivial reversible work (<15 lines) is CEO fast-path — checkpoint-only, never a chain branch. Everything else loads its stage skill.
