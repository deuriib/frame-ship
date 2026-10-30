---
trigger: model_decision
description: "Apply this guideliones for Security rules"
globs:
---

# Security Rules

- **SEC-01** deny by default; fail closed.
- **SEC-02** no secrets/tokens/credentials/sessions in any artifact (GEN-12); finding without proof = REFUTED.
- **SEC-03** OWASP Top 10 screen on every new endpoint, adapter, boundary, payload — each is a trust boundary.
- **SEC-04** parameterized queries only; no string SQL; no `eval`; no shell injection; no path traversal; no unsafe deserialization; XXE disabled.
- **SEC-05** validate input, encode output; secure defaults — TLS everywhere, HSTS, CSP with nonces, SRI, `httpOnly Secure SameSite` cookies; no tokens in `localStorage`.
- **SEC-06** CSRF protection; SSRF allowlists; secure random; argon2/bcrypt for passwords; no custom crypto; cert pinning where needed.
- **SEC-07** least privilege per interface, key, role, automation; short-lived credentials; MFA for all human access; SSO enforced; no shared accounts; no local accounts without exception.
- **SEC-08** JIT time-bound privileged access, audited; break-glass sealed and monitored; quarterly access reviews; offboarding within SLA.
- **SEC-09** encryption in transit and at rest; KMS/HSM key management with rotation; classification and handling rules per data class.
- **SEC-10** rate limiting, quotas, WAF per interface; idempotency keys on mutations; idempotent consumers.
- **SEC-11** SAST, DAST, SCA, secret, container, IaC scans in CI; findings triaged and tracked.
- **SEC-12** vulnerability SLA: Critical ≤24h, High ≤7d, Medium ≤30d, Low ≤90d; no EOL components; patch OS, runtime, deps, containers.
- **SEC-13** threat modeling for new systems and major changes; attack-surface inventory maintained; pentest annually or on major change.
- **SEC-14** centralized logging, SIEM, anomaly detection; every alert has owner + runbook; IR plan tested with tabletops; breach notification ready (72h).
- **SEC-15** vendor security review pre-onboarding; DPA + security addendum signed; annual re-review; third-party access time-bound, least privilege, audited.
- **SEC-16** supply chain pinned, signed, verified; no unmaintained deps; SBOM maintained; registry access controlled; no public push of internal artifacts.
- **SEC-17** bug bounty or disclosure program with safe harbor; triage within SLA.
- **SEC-18** security policy published; time-bound exceptions with compensating controls and owner; metrics tracked — MTTD, MTTR, open findings by severity, patch compliance, access-review completion.
