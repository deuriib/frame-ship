# ADR-007: Grilling-style challenge plug-in folded into four existing stages, not new stage/dir/reviewer

**Date:** 2026-09-18
**Deciders:** engineering owner (vasquez, with architect input), people owner, security owner
**Status:** accepted

## Context

Frame-ship gates have rigor (STRIDE verdicts, ADR invariants, gate refuter, debugging Iron Law) but soft challenge early and late: `frame-intent` nod-along, `propose-changes` self-graded blast radius, `quality-gate` thin CONDITIONALs/waivers, `verify-handoff` attestation-grade evidence links. BRIEF-grilling-integration (Framing 2, approved 2026-09-18) selects a full C1–C4 opt-in challenge plug-in. A new `skills/grilling/` dir / stage / reviewer was rejected in the brief (Framing 3, YAGNI — duplicates refuter + ADR adversarial core, risks verdict-less bypass). Precedent: ADR-006 folded brainstorming into `frame-intent` in place rather than adding a stage.

## Decision

Fold the grilling plug-in into four existing stages as skill-text-only deltas, reusing existing reviewers/templates, zero new deps:

- C1 (`skills/frame-intent/SKILL.md`): opt-in classification-scaled challenger — spike 1 / bounded cap 3 / architectural cap 5 + falsifiable-bet over 2–3 framings recorded in `Framings-Considered`, one-at-a-time, one-way ratchet (never downgrade).
- C2 (`skills/propose-changes/SKILL.md` + proposal/risk refs): pre-approval grill trigger (auth/data/API/PII, multi-domain, blast-radius customers/regulators/revenue, approver request) + one-pass budget, terminal approve/reject, repo untouched during grill.
- C3 (`skills/quality-gate/SKILL.md` + waiver/gate-report refs): surgical lane only — refuter-amplification + CONDITIONAL/waiver interrogation against three-block bar (Accepted-risk / Compensating-controls+owner / Expiry+owner); full re-review banned; CLOSED stays CLOSED without domain-owners + orchestrator sign-off.
- C4 (`skills/verify-handoff/SKILL.md` + dod-checklist refs): REQ→evidence-link presence check (missing = FAIL); re-litigation of settled verdicts banned (return to `execute-spec`).
- Cross-cutting: opt-in + exit hatch, one-at-a-time, warmth (relentless-family lexicon banned), masking/allowlist on every export (Ley 172-13), reference-only packets, N=2 → escalate throughout.

No `ARCHITECTURE.md` / `API_CONTRACTS.md` change (no endpoints/adapters/boundaries/payloads; no config-surface change).

## Consequences

### Positive

- Chain order and gate authority preserved; no new stage/dir/reviewer to maintain; single-file zero-dep runtime untouched (INV-001 holds).
- Challenge arrives where thin work originates (C1/C2) and where it launders through (C3/C4); classification scaling + one-pass/surgical/presence-only budgets contain the brief-accepted F2 review-load risk.
- People + security bars ride by reference (tone/attention/opt-in; waiver/residual/masking) without forking their cores.

### Negative

- Four skill surfaces to keep word-aligned (mitigated by canonical wording in people SPEC §4 + security three-block template, gate grep checks).
- C1 budget caps (1 / cap 3 / cap 5) and waiver TTL default (90d or next release) remain proposed defaults needing people co-sign and orchestrator confirmation respectively — accepted review-load/residual risk carried explicitly to gate.
- Review load rises vs pre-grill baseline (brief-accepted F2); contained but not eliminated.

## Supersedes / Superseded By

None. Relates: ADR-006 (fold-in precedent); brief Framing 2 decision (intent, read-only).
