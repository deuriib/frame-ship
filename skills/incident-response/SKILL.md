---
name: incident-response
description: Use when facing an active security incident, alert, breach suspicion, or exploited vulnerability - contains, eradicates, and learns
---

# Incident Response

## Overview

**Contain first, investigate second, blame never.** Speed protects users; notes protect the future.

## When to Use

- Active alert, anomaly, suspected compromise, leaked secret, exploited vuln
- Bug-bounty critical with live exploit evidence
- Anyone says "I think we're breached"

If it's a non-exploited finding in code, use security:vulnerability-debugging instead.

## Process

1. **Declare (5 min):** what happened, what's exposed, who's leading. Start a timestamped log immediately.
2. **Contain:** revoke/rotate exposed keys, block abusive actor/IP, disable dangerous endpoint or feature flag, snapshot evidence (logs, configs) before wiping anything. Prefer reversible containment.
3. **Assess exposure:** what data/systems were reachable, for how long. Assume the worst until logs prove otherwise.
4. **Eradicate + recover:** patch root cause (see security:vulnerability-debugging), rotate all in-scope credentials, redeploy clean, verify with security tests green.
5. **Notify:** users/regulators per policy. Never hide a breach that affects others.
6. **Learn:** blameless postmortem within 48h — timeline, root cause, why it wasn't caught, 3 concrete gates added (test, review checklist, alert).

## Rules

- Don't destroy evidence (logs, images) before snapshotting.
- Don't probe attacker infrastructure from corp network beyond what's needed.
- Don't keep incident discussion in DMs — one channel, timestamped.
- Never pay, never promise attribution, never speculate publicly.

## Red Flags

- "Let's just patch quietly" → if users are affected, notify
- "Rotate later" → rotate now, while contained
- Skipping the postmortem because "we fixed it" → the next one is already forming
- Assigning blame → kills future reporting

## Verification

- [ ] Containment timestamped and reversible actions noted
- [ ] Exposure assessment written (or "unknown, assuming worst" + plan to determine)
- [ ] Root-cause fix + regression test merged
- [ ] Credentials rotated, deploys verified green
- [ ] Postmortem scheduled with owner + date
