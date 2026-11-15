---
trigger: model_decision
description: Use when recording a journal entry or adjustment, running the
  month-end close, or reconciling an account.
---

# Recording and Close

The books are not a report of what happened; they are the record a stranger can
reconstruct. Anything that only exists in someone's memory is unrecorded.

## Entries

- **No manual journal entry without support and a second review.** Support is the
  document that explains it; the review is the person who did not write it.
- **No off-books cash and no unrecorded liability.** An obligation that exists but is
  not recorded is a future surprise booked as a past mistake.
- **No spreadsheet as a source of truth.** A spreadsheet may prepare a number; the
  system of record must hold it. A spreadsheet that is the only copy is a control
  failure waiting for a version conflict.
- **Double-entry, accrual, always.** Cash-basis thinking inside an accrual ledger is
  how timing errors become permanent.
- **Every adjustment carries a reason code.** An adjustment with no reason is a
  number someone will be asked about a year later by someone who cannot answer.

## Reconciliation

- **Every balance-sheet account is reconciled monthly**, with the reconciling items
  listed rather than netted.
- **A reconciled account has an owner and a sign-off.** An unreconciled account is an
  open question nobody is asking.
- **Reconcile to the source, not to the previous reconciliation.** Repeating last
  month's differences forward is how an error becomes permanent.

## Close

- **A written close checklist, with an owner per step.** The close is a sequence, and
  a sequence without a list is a memory test.
- **The close is signed off**, by name, before the period is locked.
- **A locked period is not reopened quietly.** A reopening is a decision with a
  reason and an approver.
- **Every adjustment leaves a trace that cannot be rewritten**, including the ones
  booked in the last hour of the close. `detection-and-response` owns how that trail
  is kept and why it survives the system it audits.

## Anomalies

- **Monitor for the patterns fraud actually produces**: duplicate payments, round
  amounts just under a threshold, new vendors with no trading history, payments at
  unusual hours, and a bank change followed quickly by a payment.
- **Review the anomaly list, do not just generate it.** A report nobody reads detects
  nothing.
- **Investigate, then document the conclusion** — including "explained". An
  unexplained anomaly that gets closed silently is the same as one never found.
