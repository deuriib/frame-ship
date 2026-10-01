---
name: receiving-release-review
description: Use when handling review feedback on infra, pipelines or releases - verify technically before implementing, push back with evidence
---

# Receiving Release Review

Review feedback is a hypothesis until verified. Check it, then act — blind implementation and blind dismissal both cause incidents.

## Overview

For every review comment: reproduce or verify the concern, decide (accept / push back / clarify), implement in priority order, re-verify with the TDI chain.

## The Response Pattern

1. **Understand:** restate the concern in one line. If ambiguous, ask one focused question before touching code.
2. **Verify:** reproduce the claimed issue (`plan`, `diff`, policy run, doc link). Severity first: data loss / prod-down risk outranks style.
3. **Decide:** accept (fix it), push back (evidence it can't happen), or clarify (need input). One decision per comment, stated out loud.
4. **Implement + re-verify:** fix, re-run full TDI chain + verifying-releases gate, paste new evidence on the thread.

## Forbidden Responses

- Merging without answering open threads on prod-touching changes.
- "Fixed" with no new plan/diff output.
- Rewriting history (force-push) to hide the discussion on shared release branches.
- Taking reviewer silence as prod approval.

## Handling Unclear Feedback

Ask for the failure scenario: "What breaks, in which env, with what input?" If they can't name one, treat as style — fix cheaply or defer explicitly, never as a gate blocker.

## Source-Specific Handling

### From your human partner

Partner overrides on direction; you own the safety mechanics. If they say "merge anyway", confirm explicitly ("merging to prd with check X red — confirm?"), record the decision, ensure rollback pointer exists.

### From External Reviewers / CI bots

Bot findings (checkov, conftest, actionlint, Argo diff): reproduce locally, fix or suppress with justification comment + expiry. Human reviewer findings: verify technically, never dismiss by rank ("they don't know our setup" needs a doc link, not attitude).

## YAGNI Check for "Hardened" Suggestions

"While you're here, add multi-region / service mesh / full GitOps migration" — if it's outside the approved spec, note it as follow-up, don't bundle it into this release. One release, one blast radius.

## Implementation Order

Safety first: state/destroy risks → policy violations → correctness → gates/observability → style/naming. Style never blocks a hotfix rollout; missing rollback always does.

## When To Push Back

Push back with evidence when: the suggestion widens blast radius, contradicts the approved spec, breaks another env, or the failure scenario doesn't reproduce (`plan` clean + policy green + diff attached as proof). Keep it technical, one paragraph, with output.
