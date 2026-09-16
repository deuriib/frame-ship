# ADR-002: Portable Agent Templates (Harness-Agnostic Contract)

**Date:** 2026-09-16
**Deciders:** vasquez (CTO, executing user directive); gates: review-readability, review-risk, review-refuter, qa
**Status:** accepted (gate OPEN)

## Context

ADR-001 vendored 68 agents with opencode `mode`/`permission` preserved as a
meta block inside each template. That kept templates opencode-only: foreign
harnesses (Claude Code, Cursor, generic subagents) cannot honor `mode`,
`permission.task/bash`, `temperature`, `@dispatch`, or `SPEC:/HARD:/GATE:`
packets, so the craft was unreachable outside opencode.

## Decision

Rewrite all 68 templates to a portable contract, craft untouched:

1. Generic frontmatter (`name`, `description` only).
2. `Capabilities` (read/write/run/search/route needs in harness-neutral
   verbs) derived from the old permission blocks, tightened where role
   constraints forbid (reviewers read-only, no suite-running outside qa).
3. `Working agreement` (inputs/outputs by reference, evidence rule,
   no-secrets + personal-data minimization).
4. `Delegation` in plain language (harness subagent mechanism, never
   sideways, flag-don't-grab, never self-approve).
5. `Frame-Ship adapter (when run inside frame-ship)` — terminal, 3 lines,
   the only harness-conditional section. Chain compatibility preserved as
   adapter, not identity.

## Consequences

### Positive

- Templates load as-is on any harness; frame-ship keeps working via adapter.
- Least-privilege now stated per role in plain language (reviewers
  read-only verified 12/12; implementers scoped; orchestrators route-only).
- Spanish execute-footer + packet jargon gone; espinoza Spanish persona kept
  as craft (language ≠ lock-in).

### Negative

- Vendored-vs-global drift note in ADR-001 still applies; globals remain
  deprecated mirror.
- Two chain docs now stale w.r.t. template meta (`skills/AGENTS.md:26`,
  `using-frame-ship/references/tool-mapping.md:11`) — follow-up, not this unit.

## Supersedes / Superseded By

Partially supersedes ADR-001 §Decision sentence 3 ("agent `mode`/`permission`
stored as meta block inside template") — meta blocks removed, needs live in
`Capabilities`. All else in ADR-001 stands.
