---
trigger: model_decision
description: Use when drafting, reviewing, renewing, or signing a contract, when
  recording an obligation, or when a new activity creates a liability or
  insurance need.
---

# Contracts

A contract is an obligation with a date attached. Signature is the cheapest moment
to change it and the only one a lawyer reviews.

Signature review, verbal commitments, and template deviations are owned by
`deal-desk`. This rule covers what outlives the deal: the register of obligations,
renewal timing, liability, and insurance.

## Obligation register

- **Every contract records its obligations**: deliverables, SLAs, penalties,
  termination rights, renewal dates, notice periods, and the internal owner.
- **The owner is a person, never a department.** An obligation nobody owns is
  breached quietly and discovered late.
- **The register drives the calendar.** A renewal date that lives only inside a PDF
  is discovered after it has already auto-renewed.
- **An obligation inherited from a template is still an obligation.** Record it.

## Renewal

- **No auto-renewal without review**, and the review runs in two ordered windows:
  the commercial conversation first (`post-sale` owns it at 90 days), then the legal
  and contract pass at 60 days — do the terms still work, has the price moved, which
  notice window must be hit. This rule owns the second.
- **The notice period is the real deadline when it exceeds both windows.** An expiry
  date is not the last moment to act; the contractual notice period is.
- **No unilateral change is accepted.** A counterparty that updates terms by notice
  is proposing an amendment, not amending.

## Liability

- **Liability, indemnity, and warranty clauses are reviewed per contract**, never
  assumed to be standard. A cap that suited last year's deal is not evidence for
  this one.
- **Know which clause you are trading away.** An uncapped indemnity for IP
  infringement is a different risk from an uncapped liability for delay.
- **A new activity triggers a new insurance check.** A new market, a new data
  category, or a regulated feature means verifying coverage — cyber, errors and
  omissions, directors and officers — before the first invoice, not after the first
  claim.
- **Verify the clause against the policy, not the policy against the clause.** A
  warranty the policy excludes is a promise the company pays for itself.
