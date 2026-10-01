---
name: secure-code-review
description: Use when reviewing code before merging - hunts authorization, injection, secret, and data-exposure flaws with verification
---

# Secure Code Review

## Overview

**Review like an attacker with the diff.** Approval means "I'd sign the breach report for this code."

## When to Use

- Before every merge, no matter how small the diff
- After receiving review feedback that looks questionable (verify, don't blindly apply)
- Before bumping auth, crypto, deps, CI, or infra config

## Review Passes (in order)

1. **Auth pass:** every read/write has object-level authorization. No route-only checks. No client-supplied role/tenant trusted.
2. **Input pass:** all entry points validated allowlist-style. Queries parameterized. Output encoded. Uploads constrained. URLs not fetched raw.
3. **Secret pass:** no keys/tokens/passwords in diff, no PII in logs/errors, no stack traces to clients, no secrets in tests/fixtures.
4. **Logic pass:** TOCTOU, race conditions, mass assignment, open redirects, CORS/CSRF, webhook signature verification.
5. **Supply-chain + evidence pass (G5):** new deps pinned/justified/advisory-checked; SBOM or dep list updated; exception tickets exist for anything waived.

## How to Deliver Findings

- Severity per finding: Critical / High / Medium / Low + exploit sketch (2 lines max).
- Quote the exact lines. Propose the fix, don't just name the flaw.
- Findings block merge unless downgraded with evidence, not opinion.

## Receiving Review (feedback on your code)

- Verify every suggestion technically before applying — a wrong "fix" can open a hole.
- If feedback is unclear or smells wrong: reproduce, check docs/source, push back with evidence.
- Never apply crypto/auth changes blindly from review comments.

## Red Flags

- "LGTM, small diff" → small diffs hide IDORs
- "Tests pass so it's safe" → functional tests don't prove security
- "We trust this caller" → verify anyway
- Approving with unresolved Critical/High →mu never; fix or formally accept risk with expiry

## Verification

- [ ] All 5 passes completed on the actual diff
- [ ] Every Critical/High has a fix or signed accepted-risk
- [ ] Negative tests exist for boundary changes
- [ ] Reviewer would sign the breach report — then approve
