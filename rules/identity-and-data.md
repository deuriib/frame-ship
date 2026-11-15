---
trigger: model_decision
description: Use when provisioning a credential, key, role, or service identity,
  or when storing, classifying, or encrypting data at rest.
---

# Identity and Data

Least privilege and data classification are decided at design time. Everything
here is cheaper before the data exists than after. Human access policy — MFA,
SSO, reviews, break-glass — is in `detection-and-response`.

## Least privilege

- **One credential per interface, purpose, and environment.** No shared key
  across services, and no production key in a development config.
- **The narrowest scope that works.** Read-only when reading, one bucket not the
  account, one table not the schema, one verb not `*`.
- **Short-lived over long-lived.** Instance identity, OIDC federation, or a
  token broker instead of a static key on disk.
- **One service identity per workload.** Running two services under one
  principal makes the audit trail unreadable and the blast radius shared.
- **Rotation is automated or it does not happen.** A documented manual rotation
  is a rotation that will be skipped.
- **Grant to a role, never to a person.** The person holds the role temporarily.
- **State what a key can reach in the PR.** "It worked" is not a scope review.

## Encryption

- **Encryption in transit is not optional, including inside the perimeter.** A
  private network is not a substitute for TLS.
- **Encrypt sensitive data at rest** — database, object storage, queue, and
  backup, not only the primary store.
- **Manage keys in a KMS/HSM** with rotation, an access policy, and an audit
  trail. A key in an env var beside the data it protects is not key management.
- **Encrypt before data leaves the trust zone**, not merely at the storage
  layer.
- **A backup is data too**: encrypted, access-controlled, and actually
  restorable.

## Classification

- **Classify every field before it is stored** — public, internal, confidential,
  restricted. The class decides encryption, retention, logging, and who may
  read it.
- **Derive handling from the class, not from the table a field happens to sit
  in.** The same email in a marketing list and an auth record is not the same
  data.
- **Minimize at the schema.** A column you never added is not a liability to
  classify, encrypt, retain, and delete.
- **Retention has an owner and a job.** A stated retention period with nothing
  enforcing it is a wish.
