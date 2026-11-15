---
trigger: model_decision
description: Use when adding a field, table, store, log line, event, export, or
  integration that carries personal data, to justify the collection and make its
  expiry automatic.
---

# Data Minimization

Personal data is a liability with a legal expiry date. Collecting it is a decision
someone must be able to defend later, and keeping it is a decision that has to
expire on its own.

The absolute prohibition is in `deny-hard-gates`. This rule is what happens
before that prohibition becomes relevant.

## Before you collect

- **Justify per field, not per feature.** For each field: what purpose, what lawful
  basis, who reads it, how long it is kept. A field that cannot answer all four is
  not collected.
- **Purpose limitation is binding.** Data collected for billing is not reused for
  marketing, and data collected to support a customer is not reused to train a
  model.
- **Prefer the derived value to the raw one**: an age band over a birthdate, a
  country over a street address, a hash over an identifier you never need to read.

## Every boundary is a checkpoint

A port, an adapter, an event, a log line, a prompt, an export, a form, a campaign,
an invoice, an HR record. Each is a place personal data enters or leaves, and each
gets the same treatment.

- **Allowlist what crosses.** Name the fields that may pass, not the fields that
  must not — a blocklist is always one field behind.
- **Mask or tokenize at the boundary**, not at each call site. One place that strips
  a field is auditable; thirty callers that each remember are not.
- **Tokenize when you need correlation without identity.** A stable pseudonymous id
  gives you the join and removes the exposure.
- **Never put personal data in a key, a filename, a URL parameter, an event name, or
  a metric label.** These end up in analytics, screenshots, and shared links.

## Retention

- **Every store declares its purpose, its retention period, and its deletion
  procedure** — in the repository, next to the schema, where a reviewer will see it.
- **The deletion is automated.** A stated retention with nothing enforcing it is a
  wish, and the oldest data in any system is always the data nobody planned for.
- **Deletion means deleted**: the row, the replica, the backup window, the search
  index, the cache, and the warehouse.
- **Expiry is the default.** You opt in to keeping, never opt in to deleting.

## Sensitive categories

Medical, biometric, and other special-category data is a different regime, not a
stricter setting.

- **Explicit consent, or a legal basis that does not require it** — never implied by
  accepting general terms.
- **Strict need-to-know, enforced per role** rather than by convention.
- **Legal review before the feature ships**, not before the first incident.
- **Never in a general file store or a shared drive.** A spreadsheet is not a system
  of record for a diagnosis.

Fixtures and test data are covered by `testing-discipline`, encryption and
classification by `identity-and-data`, and audience data by
`consent-and-audience`.
