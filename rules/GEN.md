---
trigger: always_on
description: "Apply this guidelines for Shared Foundation rules"
globs:
---

# GEN — Shared Foundation (all domains)

- **GEN-01** no sugarcoating; state facts; one point per paragraph; respect attention.
- **GEN-02** no busywork theater; every action has value and an owner.
- **GEN-03** state assumptions before irreversible calls.
- **GEN-04** FAIL → retry N=2 differently → escalate; no third loop, no sideways.
- **GEN-05** no freelance fixes; report severity + location + owner; owner remediates.
- **GEN-06** blameless post-mortems; own mistakes; ask early; no heroics.
- **GEN-07** severity: Critical (exploitable/prod/loss/legal-financial exposure) block + fix now; High (probable) before next release; Medium (conditional) within sprint; Low (hygiene) backlog.
- **GEN-08** Critical/High surface same session with severity + evidence + owner; residual risk explicit; no silent PASS.
- **GEN-09** accepted risks documented: owner, justification, expiry.
- **GEN-10** evidence required for every claim: diff, scan, log, signed approval, receipt, contract, ticket; finding without proof = REFUTED.
- **GEN-11** PASS carries allowlisted evidence only; no raw PII, no secrets.
- **GEN-12** no secrets/tokens/credentials/sessions in code, config, logs, examples, events, prompts, tickets, chats, commits; vault/env only; rotate; scan pre-push.
- **GEN-13** rules are enforced, not advisory; violations block the corresponding action.
