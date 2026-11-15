---
trigger: model_decision
description: Use when a feature involves high-risk processing, a processor or a
  cross-border transfer, a data subject request, or a suspected breach, to
  produce the artifact and defer the legal decision.
---

# Governance and Rights

Privacy work is largely paperwork that prevents incidents. An agent's job is to
produce the artifact, not to sign it — who signs, and by when, is in
`detection-and-response`.

## High-risk processing

- **A DPIA comes before the feature, not after it.** High risk means profiling,
  large-scale sensitive data, systematic monitoring, automated decisions with legal
  effect, or a new category of person.
- **Privacy by design and by default.** The default is the least data and the
  shortest retention, never the most and the longest.
- **The DPIA names the risk, the mitigation, and the residual risk with an owner.**
  An assessment that concludes "low risk" without listing anything is a form.

## Inventory

- **A record of processing activities is maintained**, one row per activity:
  purpose, categories of data and of people, recipients, retention, transfers, and
  an owner.
- **An activity with no owner is an activity nobody will answer for.** The name in
  that column is a person or a team, never a department.
- **A new processing activity adds its row before it ships.** Retrofitting the
  inventory is how gaps become invisible.

## Processors and transfers

- **No processor touches personal data before a DPA is signed.** Not a trial, not a
  proof of concept, not a free tier.
- **Cross-border transfer goes to an approved jurisdiction only**, with adequate
  protection and a documented basis. "The region was cheaper" is not a basis.
- **Never route data to an unapproved region to make a test pass**, and never let a
  fallback region be the one nobody reviewed.
- **A processor's sub-processors are part of the decision**, not a footnote to it.

## Data subject rights

- **Access, rectification, erasure, and objection each have a procedure with a
  deadline, an owner, and an evidence trail.** A route the person cannot find is a
  right they do not have.
- **Erasure reaches every copy** — the replica, the warehouse, the export, and the
  processor. A row deleted from one table and three systems was never deleted.
- **The deadline is the law's, not the team's.** Track it from receipt; a request
  answered late is a request denied.
- **A refusal is documented with its legal ground.** Silence is not a decision.

## Breach

- **Escalate a suspected breach immediately** — investigation does not pause the
  notification clock. The escalation path and its owner are in
  `detection-and-response`.
- **Do not cite a deadline the law does not set.** Ley 172-13, the Dominican
  framework this rule set references, has **no statutory breach-notification duty**
  and therefore no statutory deadline. The 72-hour figure is GDPR, not Ley 172-13.
- **Apply the shortest clock that actually reaches you:**

  | Regime | Notification |
  | --- | --- |
  | GDPR — EU data subjects or an EU establishment | 72 hours to the authority |
  | Ley 172-13 | No statutory duty; general security obligation only |
  | Sector rules — banking under the Superintendencia de Bancos, health, telecoms | Often stricter than the general law |
  | Contract — a DPA clause | Frequently 24 hours, and it binds you |

- **You do not decide which regime applies.** Identify the candidates, state them,
  and escalate.
- **Write the timeline while it is happening** — what was known, when, and by whom.
  An incident report written three days later is a reconstruction.
