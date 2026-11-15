---
trigger: model_decision
description: Use when writing domain logic that moves money or must be
  auditable, to record who changed what and make financial operations
  idempotent.
---

# Domain and Auditing

- **Record an audit trail.** Persist who, what, and when for changes that must be traceable. Use audit tables or event sourcing for regulated and financial flows; a change with no trail is a liability.
- **Idempotency for financial operations.** In payment or calculation flows, use an idempotency key so a retry cannot produce a duplicate charge or adjustment. The key travels with the request and is checked before the side effect.
- **The audit event is part of the domain, not an afterthought.** Raise it from the aggregate or use case as the change happens, so the audit reflects intent, not a later reconstruction.
- **Immutable and append-only.** Audit records are not updated or deleted; corrections are new entries. An editable audit log is not an audit log.
- **Reference identity, not secrets, in the trail.** Store the actor's identifier and role; never credentials or tokens in audit data.
