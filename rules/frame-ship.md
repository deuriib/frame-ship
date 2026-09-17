# frame-ship — persistent rules for agy

> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

## Chain (do not skip)

```text
frame-intent → translate-to-spec → propose-changes → review-security/review-architecture → execute-spec → quality-gate → verify-handoff → ship-release
```

## Load order (HARD STOP)

1. `using-frame-ship` skill (bootstrap — already in context via `frame-ship-context` hook; do not skip).
2. The `<stage>` skill before acting for that stage. No skill = STOP.
3. Then act. Pre-flight: skill? `SPEC/HARD/GATE/DOMAINS`? Any NO → STOP, load first. FAIL → retry N=2 differently → escalate to orchestrator. No third loop, no sideways.

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

## Guardrails (BEFORE dispatch, AFTER verify; full text: AGENTS.md)

- **Security:** deny default; no secret/token/credential/session in code/config/logs/examples/events; finding without proof (diff/scan/log) = REFUTED. OWASP screen: injection, broken authN/Z, data exposure, insecure deps, missing access; new endpoints/adapters/boundaries/payloads are trust boundaries. Least privilege per interface/key/role/automation. No freelance fixes — report severity + location, owner remediates.
- **Privacy (Ley 172-13):** minimization; every port/adapter/event/log/prompt is a PII checkpoint (mask/tokenize, allowlists); every PII store declares purpose + TTL + deletion; PASS exports carry allowlisted evidence only.
- **Severity:** Critical (exploitable/prod/loss), High (probable), Medium (conditional), Low (hygiene). Critical/High surface same session with severity + evidence + owner. Residual risk explicit — no silent PASS.
- **Conduct:** no sugarcoating; no busywork theater; respect attention (one point per paragraph; state assumptions on irreversible calls). FAIL → retry N=2 differently → escalate. No third loop, no sideways.
