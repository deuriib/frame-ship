---
trigger: model_decision
description: Use when adding security-relevant logging or alerting, or when a
  task touches access provisioning, a third party, a security exception, or a
  disclosure — to produce the signal and defer the decision to a named owner.
---

# Detection and Response

Two duties. First, the system must emit the signal an incident needs. Second,
the decisions that belong to a human owner must reach that owner — with the
artifact that makes the decision possible, not as an open question.

## Signal

- **Log every security-relevant event:** authentication success and failure,
  authorization denial, privilege change, key rotation, configuration change,
  admin action, and access to restricted data.
- **Never log the payload.** Record the actor, the action, the object identifier,
  the outcome, and a correlation ID — never the body, the token, or the PII.
- **Denials are the interesting signal.** A spike in authorization failures is
  the earliest evidence of both an attack and a broken deploy.
- **Centralize it.** A log an operator cannot search mid-incident does not
  exist.
- **Every alert has an owner and a runbook.** An alert nobody owns is noise, and
  noise trains people to ignore the pager.
- **Alert on the symptom a user feels**, not on the mechanism behind it.
- **An audit trail is append-only** and survives the failure of the system it
  audits.

## Decisions that are not yours

These belong to a named human owner. The agent prepares and defers; it never
grants.

| Situation | Do this |
| --- | --- |
| Human access, MFA, SSO, shared or local accounts | Name the owner. Require MFA, SSO, and no shared account; never provision around it |
| Just-in-time or break-glass privileged access | Produce the request with scope and duration. Approval is human and audited |
| Periodic access review or offboarding | Produce the access matrix. A human signs it |
| A new third party with data access | Produce the security questionnaire and the data-flow list. A DPA and security addendum are signed before onboarding |
| A time-bound security exception | State the compensating control, the owner, and the expiry. Refuse an exception with no expiry |
| A vulnerability disclosure or bounty decision | Route it to the private channel in `SECURITY.md`. Never open a public issue or post the details |
| A breach, or a suspected one | Escalate immediately. Notification deadlines are legal and they are not yours to assess |

## Threat modeling

- **Model a new system, or a major change, before building it.** Assets, entry
  points, trust boundaries, what an attacker gains, and the control that stops
  it.
- **Write it down, short.** A one-page model with the top three risks beats a
  long intuition nobody can review.
- **Maintain the attack-surface inventory.** Every public endpoint, queue,
  webhook, and third-party integration, each with an owner. An integration you
  cannot list is one you cannot review.

## Non-negotiables when deferring

- **Name a real owner** — a role or a team, never "the team" or "someone".
- **Produce the artifact the decision needs**, not a question the owner has to
  research from scratch.
- **Never treat silence as approval.** An unanswered decision is a no.
- **Never break a gate to unblock yourself** while a decision is pending.
