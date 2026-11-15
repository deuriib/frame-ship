---
trigger: model_decision
description: Use when mapping a feature, processing activity, or obligation to a
  legal regime or basis, or when a question is legal rather than technical.
---

# Compliance and Escalation

The compliance map is how an organisation knows which regimes reach it. Escalation
is how it avoids the failure of guessing at an answer.

## The compliance register

- **Every applicable regime is listed with an owner and a contact**: data protection
  (Ley 172-13, plus GDPR where EU data subjects are involved), labour, tax,
  sector-specific regulation, and consumer protection.
- **Every processing activity maps to a legal basis.** The record of processing
  activities lives in `privacy/governance-and-rights`; the mapping to a basis is what
  makes it defensible rather than merely documented.
- **A new market, product line, or data category reopens the map.** A regulation that
  did not reach you last quarter can reach you this one.
- **Assume the strictest applicable regime governs.** Which sector regulators reach
  a given data category is mapped in `governance-and-rights`; the general point is
  that the stricter rule wins until someone qualified says otherwise.

## Escalation

- **Do not give legal advice.** Interpreting a contract, a statute, or a regulator's
  expectation is a lawyer's job, and the failure mode is confident and wrong. This is
  the single most useful habit in this rule set.
- **Route to legal with the artifact prepared.** A question carrying the contract, the
  clause, and the decision you need gets answered in hours; "is this allowed?" gets
  answered in weeks.
- **Never present your own reading as the legal position.** State what the document
  says, then say plainly that interpreting it is not your call.
- **Statutory and contractual clocks are escalated, never calculated.** Name the
  obligation and the owner; do not estimate the deadline.
- **An open legal question does not stall the whole task.** Ship the part that does
  not depend on the answer, and name precisely which part is waiting for it.
