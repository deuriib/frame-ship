---
trigger: model_decision
description: Use when recognising revenue, preparing a financial statement for
  external release, provisioning for bad debt, or filing a tax return.
---

# Reporting and Tax

A statement is a claim made to someone outside the company. It gets reviewed, and
the tax position behind it gets filed on time or penalised.

When revenue is recognised is `billing-and-recognition`. This rule is the reporting
layer above it: the statement, the provisioning, and the tax position.

## Statements

- **Every external financial statement is reviewed by the CFO or controller** before
  it leaves the building. A number released without a named reviewer is a number the
  company cannot stand behind.
- **The review is of the statement, not of the spreadsheet behind it.** If the
  reviewer needs the model to interpret the statement, the statement is unclear.
- **A restatement is disclosed with its reason.** A quiet correction of a published
  number costs more than the error did.

## Revenue specifics

- **No recognition outside policy.** Premature, deferred, or reclassified revenue
  without a documented policy and an approver is the finding most likely to end an
  audit badly.
- **FX rates and their source are recorded per period**, so a restatement can be
  explained rather than discovered.
- **Intercompany and transfer-pricing arrangements are documented** before the
  transaction, not reconstructed at year end. An undocumented related-party price is
  a tax risk with a lag.
- **A multi-element contract is split per policy**, not per whichever allocation makes
  the quarter.

## Credit and receivables

- **Customer credit limits are set and enforced in the system.** A limit overridden
  per order is a limit that does not exist.
- **Dunning is documented and follows a schedule.** Chasing is a process, not a
  mood.
- **Bad-debt provisioning follows policy**, applied consistently over time. A
  provision that moves with the quarter's results is earnings management wearing an
  accounting word.

## Tax

- **Filings are submitted on time, by an owner who is named.** The penalty for a late
  filing is the cheapest part of a late filing.
- **No informal arrangements.** A verbal understanding with an authority is not a
  position you can defend.
- **Transfer-pricing documentation is maintained**, not assembled during an enquiry.
- **VAT and sales tax are applied per jurisdiction** of the customer and the supply,
  with the rule for each recorded.
- **Tax nexus is monitored.** Registering where you have created an obligation is
  cheaper than being told you did.
