---
trigger: model_decision
description: Use when deleting or archiving records, when a litigation or
  investigation notice arrives, or when versioning a legal document.
---

# Records and Holds

Deletion is a privacy obligation and a legal hazard at the same time. Which one
wins depends on whether a hold exists.

## Litigation hold

- **A hold freezes deletion immediately**, from the moment notice arrives — a
  subpoena, a complaint, an investigation, a credible threat. Not from the moment
  legal confirms it.
- **The hold overrides the retention schedule.** `data-minimization` says expire by
  default; a hold is the explicit, scoped, written exception.
- **Scope broadly first.** Everything plausibly relevant: email, chat, tickets,
  commits, logs, backups. Narrowing later is safe; reconstructing a deleted record
  is not.
- **Never delete, edit, or tidy a record under hold** — including a message that
  looks embarrassing. That single act turns a dispute into an offence.
- **A hold is lifted in writing**, by its owner, when the matter closes.

## Retention

- **The schedule is enforced by a job, not by intention.** The mechanism is in
  `data-minimization`; the legal input is here — which class of record, for how
  long, and why that period.
- **Every retention period has a legal reason.** "Forever" is not a period. If a
  record must be kept indefinitely, name the obligation that requires it.
- **Deletion after the period is the default**, except under hold or a named legal
  exception.
- **An archive is not an excuse.** A record moved to cold storage is still a record
  you must produce and must delete.

## Legal documents

- **Every legal document is versioned.** Contract, DPA, policy, notice — the version
  that was signed is the one that binds, so it has to be retrievable years later.
- **A hold reaches the audit trail too.** It is append-only by construction
  (`detection-and-response`), which is exactly what makes it evidence rather than a
  reconstruction.
- **A redline is not the agreement.** Only the executed version counts, and only the
  executed version is worth quoting.
- **A superseded version is retained, not overwritten.** The amendment history is
  often the thing that decides what the clause meant.
