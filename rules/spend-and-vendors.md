---
trigger: model_decision
description: Use when committing company money — raising a purchase order,
  onboarding a vendor, expensing a purchase, or renewing a subscription.
---

# Spend and Vendors

Money leaves through four doors: a purchase order, a vendor, an expense claim, and a
subscription nobody remembers. Each has the same failure mode — a regular payment
with no owner.

## Budget and purchase orders

- **Every cost centre has a named budget owner.** A cost centre with no owner is a
  cost centre nobody defends.
- **No spend without a budget line and the owner's approval.** "It is small" is how
  a budget becomes a surprise.
- **A purchase order above threshold, always.** No verbal POs, no "start now,
  paperwork later" — the paperwork is what makes the commitment a commitment.
- **No splitting an order to stay below the PO threshold.**
- **Commit the whole cost, not the first month.** An annual contract approved as a
  monthly line understates the obligation by a factor of twelve.

## Vendors

- **Vendor onboarding requires legal, security, and finance review** before the first
  invoice — the same gate whether the vendor is a law firm or a SaaS trial.
- **The data-protection review is separate and precedes access** — see
  `governance-and-rights`.
- **Bank details are verified out of band** on first registration and on every
  change. This is the control that defeats invoice fraud, and it only works if the
  callback number comes from a source other than the invoice.
- **No duplicate vendor.** Two records for one supplier is how a payment is made
  twice and reconciled once.
- **No ghost vendor.** A supplier that cannot be matched to a contract, a delivery,
  or a person who requested it is an exception to investigate, not a row to keep.

## Expenses

- **A receipt for every expense**, without exception. A reimbursement without a
  receipt is a cash transfer with a story attached.
- **No personal expense on a company account**, and no company expense paid
  personally and quietly.
- **Approved by someone other than the claimant**, per the threshold matrix in
  `controls-and-approvals`.
- **Expense policy updated before it is enforced**, not after a rejected claim.

## Subscriptions

- **Maintain a SaaS inventory**: vendor, owner, cost, renewal date, seat count, and
  the system it serves.
- **Renewals are reviewed before they charge**, not after. An auto-renewing tool is a
  budget line that outlives the reason it was bought.
- **No orphaned subscription.** A tool whose owner has left is a tool nobody can
  justify and nobody cancels.
- **Seat counts are true.** Paying for forty seats used by eight is the most common
  silent overspend in a growing company.
