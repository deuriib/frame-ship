# Challenge Round (C1–C4) — single source

> Opt-in challenge mechanics shared by four stages. Stage SKILLs cite this file and keep ONLY their stage-specific trigger + budget. Never re-define the glossary, opener, or human contract inline in a stage.

**Owner:** people owner (tone/masking) + security owner (waiver/residual bar) + engineering owner (budgets). **Stages:** C1 `frame-intent`, C2 `propose-changes`, C3 `quality-gate`, C4 `verify-handoff`.

## 1. Glossary (never redefined elsewhere)

- `challenge` = the budgeted round. `grill` = informal collective noun for C1–C4 rounds only. `ronda` = Spanish alias for `challenge` in openers.

## 2. Shared shape (every C1–C4 round)

- Opt-in, never mandatory, never a reason to skip any HARD-GATE.
- Opener (exit alias `exit/salir`): "¿Quieres una ronda de desafío opt-in (máx N preguntas, una a la vez)? Di sí para empezar o `exit/salir` en cualquier momento para parar sin penalidad."
- One question at a time: "Hago una sola pregunta, espero tu respuesta, luego sigo."
- Disagreement invite on every recommended answer: "Mi respuesta recomendada es X — ¿dónde puede estar mal?"
- Warmth on every round: "Reto cálido y directo: desafío firme, nunca dureza. Si el tono aprieta, dilo y pausamos."
- Masking on every round: "Por tu privacidad: no compartas PII/secretos/tokens en esta ronda; enmascaramos todo export (Ley 172-13)."
- N+1 enforcement: question beyond the stage budget = FAIL (blocked, must stop). Budgets are agent discipline + gate review.
- Pause/exit: after the round, offer pause/exit before continuing. Exit terminal: pre-decision exit = pause + recorded `grill: exited` + escalate; no silent promote, no re-ask in same stage, no penalty.
- Stall breaker: Retry N=2 differently → escalate orchestrator. No-answer after 2 reminders → recorded `grill: stalled` + escalate (stage pauses, no silent hang).

## 3. Stage-specific triggers + budgets (the ONLY per-stage text)

| Stage | Trigger | Budget |
|---|---|---|
| C1 `frame-intent` | opt-in at classification | spike 1 / bounded cap 3 / architectural cap 5 (4 core + 1 frontier-empty); unclassified → heaviest path |
| C2 `propose-changes` | auth/data/API/PII; multi-domain; blast radius mentions customers/regulators/revenue (synonym scan — prose saying "internal only" does not suppress); approver request | exactly 1 pass of ≤3 questions; approver-requested re-grill ≤1 extra pass (≤2 total) |
| C3 `quality-gate` | every CONDITIONAL/waiver (rows = CONDITIONALs — sample-of-one never satisfies) | interrogation against the three-block bar ONLY (`references/waiver-template.md`): `Accepted-risk` + `Compensating-controls+owner` + `Expiry/Re-review date-or-condition+owner`. Missing block = FAIL. Full re-review banned; CLOSED stays CLOSED without domain-owners + orchestrator sign-off. Expiry default 90d or next release, whichever first |
| C4 `verify-handoff` | every REQ evidence link | presence check: link present AND resolves AND relevant; missing/dead/irrelevant = FAIL with recorded reviewer-judgment reason; attestation-alone = FAIL. Re-litigating settled gate verdicts banned → findings return to `execute-spec` |

- Every C3/C4 FAIL lists `residual-risk + owner` (or explicit `none + owner`); silent APPROVE+conditions = FAIL.
- Proof-or-refuted: a finding without `diff/scan/log` = REFUTED; Critical/High with proof surfaces same session.
- No-freelance-fix: findings report `severity + location + evidence` (owner remediates — never rotate keys/patch prod/widen perms).
- Record per round: `grill: accepted | declined | exited | stalled` in the stage's output.

## 4. Anti-patterns

- Re-defining the glossary/opener/human contract inside a stage SKILL (cite this file).
- Turning the round mandatory, or using it to skip a gate.
- C2 re-grill without approver request; C3 re-running the routing table; C4 re-opening settled verdicts.
- Question N+1 after the budget — blocked, never "one more question".
