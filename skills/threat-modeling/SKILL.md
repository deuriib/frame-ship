---
name: threat-modeling
description: Use when designing any new feature, endpoint, auth change, data flow, or integration before implementation - explores abuse cases and security requirements
---

# Threat Modeling

## Overview

**No design is approved without an attacker reading it first.** Turn ideas into designs that name what can go wrong, not just what gets built.

## When to Use

- New feature, endpoint, page, API, webhook, integration
- Auth/authz change: login, session, token, role, permission
- Data flow change: PII, secrets, payments, uploads, third-party sharing
- "Is this safe?" / "Can we...?" questions

When NOT to use: pure refactor with zero behavior or data-flow change.

## Process

**Spike** (feasibility question, throwaway output): present the attack question + probe in 2-3 sentences, get a nod, investigate cheaply. Report as recommendation.

**Bounded** (scoped change to an existing flow you can read): explore context, ask the questions that matter one at a time, present a short threat-note IN CHAT (assets, trust boundaries, top 3 abuse cases, mitigations), STOP and wait for explicit yes. No spec file.

**Architectural** (new system, new subsystem, interface others depend on): full process below.

### Architectural Steps

1. **Explore context** — files, docs, data flows, recent commits. Read-only is always allowed.
2. **Discover intent** — outcome, who it's for, what success looks like. Write it back in 3-5 lines and invite correction.
3. **Map the attack surface:**
   - Assets (data, keys, sessions, money-movement)
   - Trust boundaries (client/server, service/service, tenant/tenant)
   - Entry points (params, headers, files, webhooks, IDs)
4. **Abuse cases** — minimum 3 per architectural design, written as "An attacker can...". Cover: auth bypass, IDOR/BOLA, injection, SSRF, secret leak, privilege escalation. Pick what fits the surface.
5. **Propose 2-3 approaches** — with security trade-offs and your recommendation.
6. **Present design in sections** — get approval per section. Each section carries its mitigations (validate, authorize, log) and cites guardrails G1 (deny by default) + G2 (AppSec per boundary). Every privileged path gets its own abuse case.
7. **Write design doc** — save to `docs/security/specs/YYYY-MM-DD-<topic>-design.md` and commit. Must contain: assets, boundaries, abuse cases, mitigations, logging/alerting, rollback.
8. **Spec self-review** — no placeholders, no contradictions, every abuse case has a mitigation or an accepted-risk sign-off.
9. **User reviews written spec** — ask them to review the file before proceeding.
10. **Transition** — invoke security:writing-secure-plans.

<HARD-GATE>
Before implementation, scaffolding, installing product dependencies, or creating an external project, the required approval must exist: spike = question approved, bounded = in-chat design approved, architectural = written spec + plan approved. One approval never skips later stages.
</HARD-GATE>

## STRIDE-Lite Checklist

| Area | Ask |
|------|-----|
| Spoofing | Who can fake identity here? |
| Tampering | What input/state can be modified in transit or at rest? |
| Repudiation | Will logs prove who did what? |
| Info disclosure | What leaks in errors, responses, logs, URLs? |
| DoS | What can an unauthenticated caller exhaust? |
| Elevation | What turns a low-privilege caller into a higher one? |

## Red Flags

- "Too simple to need threat modeling" → simple auth bugs cause breaches
- "Trusted client / internal only" → internal callers get compromised too
- "We'll add auth later" → later never ships; gate now
- Skipping abuse cases because "no PII" → integrity and availability count

## Verification

- [ ] Assets + trust boundaries written down
- [ ] 3+ abuse cases with a mitigation or accepted-risk each
- [ ] Logging covers who-did-what for every state change
- [ ] Required approval obtained before implementation
