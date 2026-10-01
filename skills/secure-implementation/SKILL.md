---
name: secure-implementation
description: Use when writing or changing product code, dependencies, or configuration - implements approved plans with security tests first
---

# Secure Implementation

## Overview

**Security test first, then code. No exceptions.** The test proves the abuse case fails; the code makes it pass.

## When to Use

- Implementing any task from a security plan
- Changing auth, input handling, crypto, sessions, uploads, webhooks, deps
- Touching config, CI, Docker, infra-as-code

## RED-GREEN-REFACTOR (Security)

1. **RED — write the failing security test first:**
   - Negative test per abuse case: unauthenticated access denied, IDOR across tenants blocked, injection neutralized, oversized/malformed input rejected.
   - Watch it FAIL (proves the hole exists or the guard is missing).
2. **GREEN — minimal code to pass:**
   - Validate at the boundary (allowlist, type, length, range).
   - Authorize at the object level (not just the route): owner/tenant/role check on every read/write.
   - Parameterize queries; encode output; no string-built commands.
   - No secrets in code/logs/errors. No stack traces to clients.
3. **REFACTOR — harden without breaking the test:**
   - Centralize checks (middleware/guards), remove duplication.
   - Re-run the full suite. Green stays green.

## Non-Negotiables

| Rule | Why |
|------|-----|
| Object-level auth on every read/write | IDOR/BOLA is OWASP #1 |
| Allowlist validation at boundary | Blocklists always miss one encoding |
| Parameterized queries / ORM safe usage | Injection is forever |
| Secrets via env/secret manager only | Leaked keys = full compromise |
| Auth failures → generic 401/403/404 | User enumeration via error text |
| File uploads: type, size, re-encode, no exec bit | Stored XSS / RCE via upload |
| SSRF: allowlist egress, no raw user URLs server-side | Cloud metadata theft |
| Crypto: platform primitives only, never custom | Custom crypto always breaks |

## Dependency Discipline

- New dependency = attack surface. Justify it in the task: why not stdlib?
- Pin versions, review install scripts, check advisories before adding.
- No `curl | bash`, no unverified binaries in CI/Docker.

## Red Flags — STOP and restart the task

- Code before test → delete, start over
- "Just an internal endpoint" → internal gets hit too
- "Frontend validates it" → client validation is UX, not security
- "I'll add the negative test after" → after proves nothing
- Copy-pasted auth logic → centralize it

## Verification

- [ ] Negative test written first, watched failing
- [ ] Suite green after minimal code
- [ ] No secrets/tokens/PII in diff, logs, or fixtures
- [ ] `git diff` reviewed for auth + validation before commit
