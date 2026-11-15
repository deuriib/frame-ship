---
trigger: model_decision
description: Use when designing an approval flow, granting a role that can move
  money, or deciding who signs off on spend, payment, refund, or write-off.
---

# Controls and Approvals

Every finance control is one question: **can one person do this alone?** If the
answer is yes, the control is a hope.

## Segregation of duties

- **No single person initiates, approves, and reconciles.** Three acts, three
  people, or the fourth act — the fraud — is not detectable by the process.
- **Enforce it in the system, not in the org chart.** A role that technically
  permits both steps is a permission that will eventually be exercised.
- **The person who can pay cannot be the person who reconciles the payment**, and
  neither should be the one who created the vendor.
- **Access reviews are how segregation stays true.** People change teams; the
  permissions do not.
- **A small team is not an exception it can decide.** If there are not enough
  people for three roles, the compensating control is an external review, named and
  scheduled — not a silent gap.

## Thresholds

- **Every financial action has a documented threshold**: spend, payment, refund,
  discount, write-off, credit note, and journal entry.
- **Above the threshold, dual approval.** Two people, named, recorded.
- **The thresholds live in one place**, so a reader cannot find two different
  numbers for the same action. That failure is exactly what the contradiction check
  in `eval` looks for, and it still needs a human to keep the source singular.
- **No splitting to stay under a threshold.** Three payments of 9,000 to avoid a
  10,000 approval is the same act with extra steps, and it is the first thing an
  auditor looks for.
- **Discount approvals are `deal-desk`.** This rule owns the other financial
  actions.

## Approval is a record

- **An approval carries a name, a timestamp, and what was approved.** A Slack
  thumbs-up is a social signal, not an approval.
- **Approval cannot be retroactive.** An expense approved after it was paid is a
  notification.
- **Delegation is explicit and time-bound.** An approver on leave does not make
  their entire team approvers.
