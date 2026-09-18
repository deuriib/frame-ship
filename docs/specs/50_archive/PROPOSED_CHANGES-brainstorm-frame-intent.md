# Proposed Changes: engineering owner — brainstorm → frame-intent

**Spec Reference:** SPEC-brainstorm-frame-intent-engineering
**Agent:** engineering owner
**Date:** 2026-09-16
**Execution_Mode:** single
**Domains-Touched:** [engineering, people]

## Summary

Upgrade native `skills/frame-intent/` in place (§3 + product-brief fields) adapting obra brainstorming b36e082 to frame-ship shape. No runtime, chain-order, or other-stage edits; impl files untouched until approval.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `skills/frame-intent/SKILL.md` | file-modify | §3: classify-first (spike / bounded / architectural-initiative) + announce + override + one-way ratchet; HARD-GATE; one-question-at-a-time; 2–3 framings + recommendation + YAGNI; decompose rule; sectioned BRIEF approval; self-review (placeholder/consistency/scope/ambiguity) + user review gate; chain/role/packets/execution_mode preserved |
| `skills/frame-intent/references/product-brief.md` | file-modify | Add `Classification:`, `Framings-considered:`, `Approval:` placeholders only; keep existing ID/Initiator/Execution_Mode/Domains-Touched shape |
| `skills/frame-intent/references/okr-template.md` | file-modify | No content change expected; touch only if template drift found, else note explicitly dropped |

## Rationale

Satisfies REQ-001→REQ-007: classification + gate + framings + decompose + sectioned approval + packets + shape. Maps Spike→answer/mini-BRIEF, Bounded→short BRIEF + STOP, Architectural→full flow — all handing off via `SPEC/HARD/GATE/DOMAINS` to translate-to-spec, never sideways to writing-plans/superpowers paths.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| New top-level brainstorming stage | Breaks fixed 9-stage order; elicitation belongs in frame-intent entry |
| Adopt visual-companion browser mode | Token-heavy + ops cost; no frame-ship binding; reference by name only |
| Vendor writing-plans invocation | Sideways terminal state; ours is translate-to-spec |

## Approval Required From

- [ ] Owning domain owner: engineering owner
- [ ] engineering owner (architecture/cross-cutting impact — same)
- [ ] people owner (elicitation tone, Red Flags adaptation)

> **Rule:** No repository file modifications during proposal phase. For non-code domains, no external sends/filings/launches during proposal phase either.

---
# Risk Assessment: SPEC-brainstorm-frame-intent-engineering

**Proposer:** engineering owner
**Date:** 2026-09-16
**Domains-Touched:** [engineering, people]

## Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Over-ceremony: tiny initiatives drown in classify/framings/self-review | Med | Med | HARD-GATE scales ceremony, never approval; Spike path stays 2–3 sentences + nod |
| R-002 | Trigger overlap with translate-to-spec (agents brainstorm during spec) | Med | Med | Explicit prev/next: elicitation lives in frame-intent only; specs reference framings, never re-elicit |
| R-003 | Elicitation examples leak PII/secrets in briefs | Low | High | Minimize PII at prompt checkpoints; sanitize examples; guardrails 1-8 |
| R-004 | Teams treat new gates as advice, keep thin 3-question briefs | Med | Med | Word gates as MUST/STOP; gate trace REQ→evidence→verdict; Red Flags table |

## Blast Radius

Engineering (skill docs only; no service/data impact). People (question wording + collaboration tone; no policy change). No customer/regulator/revenue/finance/legal impact.

## Rollback Plan

Revert proposal commit; delete new fields if merged. Owner: engineering owner, ETA <15 min. No code revert needed (docs-only).

## Security Considerations

No auth/data/API changes. Elicitation prompts must not request tokens/creds; boundary logging least-privilege, allowlisted evidence only.

## Domain Considerations

People: collaborative tone, Red Flags correct without blame — people owner to confirm.
