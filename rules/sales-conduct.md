---
trigger: model_decision
description: Use when interacting with a buyer, offering a gift or
  entertainment, representing the product or roadmap, or designing a trial or
  cancellation flow.
---

# Sales Conduct

The rules that decide whether a deal is one you could disclose to a regulator and
still be proud of.

## Representation

- **Never misrepresent capability, roadmap, or security posture.** A roadmap item
  is a possibility, not a commitment; a security posture is what an audit shows,
  not what the deck claims.
- **Only approved collateral is shared.** A slide someone built on Friday is not a
  company statement.
- **A sales claim is a marketing claim with a signature attached** — the
  substantiation rules are in `claims-and-evidence`.

## Buyer pressure

- **No pressure tactic that violates consumer protection or platform rules.**
  Urgency must be true: a deadline that resets tomorrow is a lie with a countdown.
- **No dark patterns in trials or cancellations.** Negative-option billing, a
  cancellation that only a phone call can complete, and a "free" trial that
  converts silently are the same defect. The catalogue is in
  `claims-and-evidence`.
- **A suppression request is honoured even when it costs the deal.** Someone who
  asked not to be contacted is not a lead to re-qualify.

## Integrity

- **No bribe, kickback, or improper gift to a buyer, in any amount or any form** —
  cash, gift card, travel, sponsorship, or a favour to a relative.
- **Gifts and hospitality go in the company register** — the record, its threshold,
  and its review are owned by `integrity-and-screening`, because the obligation runs
  wider than the sales team.
- **Conflicts of interest are disclosed before the deal**: a relationship with the
  buyer, a side business that would benefit, a family interest. Disclosed late, a
  conflict reads as a cover-up even when it was innocent.

## Customer data

- **No customer personal data in a sales tool beyond the allowlisted fields.** The
  prohibition is in `deny-hard-gates`; the allowlist discipline is in
  `consent-and-audience`.
- **A sales tool is not a data warehouse.** Sync the fields the process needs, not
  the whole record, and never a field "in case someone asks".
