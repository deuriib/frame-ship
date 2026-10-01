---
name: verification-before-release
description: Use when about to claim security work is complete, fixed, or shippable, before committing, merging, or releasing - requires evidence before assertions
---

# Verification Before Release

## Overview

**Evidence before assertions. Always.** "Secure" without a command output is a wish.

## When to Use

- Before claiming a vuln is fixed
- Before merging or releasing anything security-sensitive
- Before closing a security ticket or answering an audit question

## The Gate

Run these and paste real output. No output = not done.

1. **Security tests:** full suite green, negative tests included. Command + result required.
2. **Diff audit:** `git diff` reviewed line by line for secrets, PII, auth gaps, debug leftovers.
3. **Secrets scan:** no keys/tokens in diff, history, fixtures, or logs. If your repo has a scanner, run it; if not, grep for `BEGIN .*PRIVATE KEY`, `sk-`, `ghp_`, `AKIA`, `password\s*=\s*["'][^"']`.
4. **Dependency check:** no new unpinned/unreviewed deps; advisories checked for touched packages.
5. **Behavior proof:** for vuln fixes, show the PoC failing before / passing after.
6. **Evidence pack (G5):** scan outputs + threat model link + fix/SLA log. Auto-Critical items (exploitable/breach/suspected compromise) must show notify + contain + remediate — never silently closed.

## Forbidden Phrases (without attached evidence)

- "Fixed and tested" → attach command + output
- "No secrets in the diff" → attach scan command + output
- "Minor change, low risk" → risk is proven, not felt
- "Should be fine now" → run the gate again

## Red Flags

- Claiming done with red tests → stop, fix, re-verify
- "CI will catch it" → CI is a backstop, you are the gate
- Screenshots of green without the command → rerun and paste both

## Verification

- [ ] Commands + outputs recorded (not summarized from memory)
- [ ] PoC before/after shown for fixes
- [ ] Diff + secrets scan clean
- [ ] Only then: commit, merge, or release
