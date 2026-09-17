# ADR-006: brainstorming rigor folded into frame-intent, not new stage

**Date:** 2026-09-16
**Deciders:** engineering owner, people owner
**Status:** accepted

## Context

`frame-intent` froze intent with 3 flat questions and no gate, causing under-scoped briefs. Obra brainstorming (classify-first, HARD-GATE, framings, decompose, self-review) fixes elicitation but targets foreign outputs (`docs/superpowers/`, `writing-plans`). A new stage would break the fixed 9-stage chain.

## Decision

Fold brainstorming into `skills/frame-intent/` in place: classify-first (spike / bounded / architectural-initiative) + HARD-GATE + one-question-at-a-time + 2–3 framings with recommendation + YAGNI + decompose rule + sectioned approval + self-review + user review gate. Outputs stay BRIEF + OKRs with `SPEC/HARD/GATE/DOMAINS` handoff to `translate-to-spec`. No visual-companion, no writing-plans, no new gate or reorder.

## Consequences

### Positive

- Chain order preserved; thin-brief rework blocked at entry.
- Ratchet upgrades hidden complexity early; Spike path keeps tiny intents cheap.

### Negative

- Agents must learn classification + gate (mitigated by announce + Red Flags table).
- Brief authoring slightly heavier for architectural initiatives (mitigated by scaled ceremony).

## Supersedes / Superseded By

None.
