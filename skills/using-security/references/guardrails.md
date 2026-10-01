# Security Guardrails

Enforceable subset of the enterprise policy, adapted for agent execution.
Source: enterprise Security & Privacy Guardrails (7 blocks) → 5 agent-enforceable guardrails below.

## Default rule

**Block > warn.** A guardrail violation blocks the task. Downgrade to warn only with a signed accepted-risk:

```
Risk: <what> | Owner: <name> | Expires: <YYYY-MM-DD> | Compensating: <control>
```

No expiry = no acceptance. **No silent PASS** — every gate produces output or it didn't happen.

## G1 — Deny by default

- Object-level authorization on every read/write. Fail closed. No route-only checks.
- No backdoor flags, no shared accounts, no long-lived credentials in code.
- Privileged paths (admin, break-glass, export, key rotation) get their own abuse case + audit log.
- Agent demands as evidence (can't implement): MFA/SSO status, access-review note, offboarding SLA, JIT records. If the human can't show it, write it as an open risk, don't invent it.

## G2 — AppSec per boundary

Every endpoint/adapter/webhook/payload is a trust boundary. Per boundary:

- OWASP Top-10 screen: injection, broken access control, crypto failures, insecure design, misconfig, vulnerable components, auth failures, data/software integrity, logging failures, SSRF.
- Parameterized queries only. No string SQL, no `eval`, no shell-built commands, no path traversal, no unsafe deserialization, no XXE.
- Allowlist input (type, length, range), encode output for its context.
- Web: TLS everywhere, HSTS, CSP nonces, SRI, cookies `httpOnly`/`Secure`/`SameSite`, CSRF protection, no tokens in `localStorage`.
- SSRF: egress allowlist, no raw user-controlled URLs server-side.
- Passwords: argon2/bcrypt. Randomness: platform CSPRNG. Crypto: platform primitives only, never custom.

## G3 — Zero secrets, zero PII in artifacts

- No secrets/tokens/creds/sessions in code, config, logs, errors, prompts, tickets, fixtures, examples, events, or commits. Vault/env only.
- No PII in logs, prompts, exports, test data, or error messages. Synthetic fixtures only.
- Agent demands as evidence (can't implement): KMS/HSM + rotation status, backup/restore rehearsal, verified-deletion record, classification labels per asset.

## G4 — Detect, log, fix to SLA

- Scans: SAST/secrets/dep-scan in CI when it exists; when not, the repo-minimum grep in security:verification-before-release.
- Every state change logs who-did-what (repudiation coverage).
- Severity + SLA: Critical ≤24h / High ≤7d / Medium ≤30d / Low ≤90d.
- Auto-Critical: exploitable finding, active breach, suspected compromise → notify, contain, remediate. Never silently close.
- No EOL runtime/deps/containers. Patch the class, not the instance (same-pattern audit repo-wide).

## G5 — Supply chain, evidence, escalation

- New dependency = attack surface: pin version, justify vs stdlib, check advisories, review install scripts. No unmaintained libs, no `curl | bash`, no unverified binaries.
- SBOM or, minimum, a committed list of added/removed deps with versions.
- Vendor/DPA/pentest items are human evidence — the agent asks, records the answer, never fabricates it.
- Evidence pack per release: scan outputs + threat model + fix/SLA log + exception tickets.
- No freelance fixes: every fix cites severity + location + owner. Report, don't hide.

## Where each guardrail is enforced

| Guardrail | Primary skill |
|-----------|---------------|
| G1, G2 | security:threat-modeling (design), security:secure-code-review pass 1–2 |
| G2, G3 | security:secure-implementation (code), review pass 2–3 |
| G4 | security:vulnerability-debugging (triage), security:verification-before-release (proof) |
| G5 | security:secure-code-review pass 5, security:verification-before-release (pack) |
| All | security:incident-response (containment overrides normal priority) |
